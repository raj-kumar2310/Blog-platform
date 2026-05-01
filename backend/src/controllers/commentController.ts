import { Response } from 'express';
import Comment from '../models/Comment';
import BlogPost from '../models/BlogPost';
import { AuthenticatedRequest } from '../middleware/auth';

export const createComment = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { postId } = req.params;
    const { content, parentCommentId } = req.body;

    if (!content) {
      res.status(400).json({
        success: false,
        message: 'Comment content is required',
      });
      return;
    }

    // Verify post exists
    const post = await BlogPost.findById(postId);
    if (!post) {
      res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
      return;
    }

    const comment = new Comment({
      content,
      author: req.user?.id,
      post: postId,
      parentComment: parentCommentId || null,
    });

    await comment.save();

    // If this is a reply, add it to parent comment
    if (parentCommentId) {
      await Comment.findByIdAndUpdate(
        parentCommentId,
        { $push: { replies: comment._id } },
        { new: true }
      );
    }

    await comment.populate('author', 'username fullName avatar');

    res.status(201).json({
      success: true,
      message: 'Comment created successfully',
      data: comment,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to create comment',
      error: error.message,
    });
  }
};

export const getComments = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { postId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    const comments = await Comment.find({
      post: postId,
      parentComment: null,
    })
      .populate('author', 'username fullName avatar')
      .populate({
        path: 'replies',
        populate: {
          path: 'author',
          select: 'username fullName avatar',
        },
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Comment.countDocuments({
      post: postId,
      parentComment: null,
    });

    res.status(200).json({
      success: true,
      data: comments,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch comments',
      error: error.message,
    });
  }
};

export const updateComment = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    if (!content) {
      res.status(400).json({
        success: false,
        message: 'Comment content is required',
      });
      return;
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      res.status(404).json({
        success: false,
        message: 'Comment not found',
      });
      return;
    }

    if (comment.author.toString() !== req.user?.id) {
      res.status(403).json({
        success: false,
        message: 'You do not have permission to update this comment',
      });
      return;
    }

    comment.content = content;
    await comment.save();

    await comment.populate('author', 'username fullName avatar');

    res.status(200).json({
      success: true,
      message: 'Comment updated successfully',
      data: comment,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to update comment',
      error: error.message,
    });
  }
};

export const deleteComment = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      res.status(404).json({
        success: false,
        message: 'Comment not found',
      });
      return;
    }

    if (
      comment.author.toString() !== req.user?.id &&
      req.user?.role !== 'admin'
    ) {
      res.status(403).json({
        success: false,
        message: 'You do not have permission to delete this comment',
      });
      return;
    }

    // If this is a parent comment, remove it from replies
    if (comment.parentComment) {
      await Comment.findByIdAndUpdate(
        comment.parentComment,
        { $pull: { replies: commentId } }
      );
    }

    // Delete all replies if this is a parent comment
    if (comment.replies.length > 0) {
      await Comment.deleteMany({ _id: { $in: comment.replies } });
    }

    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({
      success: true,
      message: 'Comment deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete comment',
      error: error.message,
    });
  }
};
