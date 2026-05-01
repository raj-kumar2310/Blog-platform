import { Response } from 'express';
import BlogPost from '../models/BlogPost';
import { AuthenticatedRequest } from '../middleware/auth';
import {
  generateSlug,
  calculateReadingTime,
  generateExcerpt,
} from '../utils/helpers';
import mongoose from 'mongoose';

export const createPost = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { title, content, category, tags } = req.body;

    if (!title || !content || !category) {
      res.status(400).json({
        success: false,
        message: 'Title, content, and category are required',
      });
      return;
    }

    const slug = generateSlug(title);
    const readingTime = calculateReadingTime(content);
    const excerpt = generateExcerpt(content);

    const post = new BlogPost({
      title,
      content,
      excerpt,
      slug,
      category,
      tags: tags || [],
      author: req.user?.id,
      readingTime,
      status: 'draft',
    });

    await post.save();

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: post,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to create blog post',
      error: error.message,
    });
  }
};

export const updatePost = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { postId } = req.params;
    const { title, content, category, tags, status, coverImage } = req.body;

    const post = await BlogPost.findById(postId);

    if (!post) {
      res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
      return;
    }

    // Check authorization
    if (post.author.toString() !== req.user?.id && req.user?.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'You do not have permission to update this post',
      });
      return;
    }

    // Update fields
    if (title) {
      post.title = title;
      post.slug = generateSlug(title);
    }
    if (content) {
      post.content = content;
      post.excerpt = generateExcerpt(content);
      post.readingTime = calculateReadingTime(content);
    }
    if (category) post.category = category;
    if (tags) post.tags = tags;
    if (status) post.status = status;
    if (coverImage) post.coverImage = coverImage;

    if (status === 'published' && !post.publishedAt) {
      post.publishedAt = new Date();
    }

    await post.save();

    res.status(200).json({
      success: true,
      message: 'Blog post updated successfully',
      data: post,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to update blog post',
      error: error.message,
    });
  }
};

export const deletePost = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { postId } = req.params;

    const post = await BlogPost.findById(postId);

    if (!post) {
      res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
      return;
    }

    if (post.author.toString() !== req.user?.id && req.user?.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'You do not have permission to delete this post',
      });
      return;
    }

    await BlogPost.findByIdAndDelete(postId);

    res.status(200).json({
      success: true,
      message: 'Blog post deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete blog post',
      error: error.message,
    });
  }
};

export const getPost = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;

    const post = await BlogPost.findOne({ slug }).populate('author', 'username fullName avatar');

    if (!post) {
      res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
      return;
    }

    // Increment views
    post.views += 1;
    await post.save();

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog post',
      error: error.message,
    });
  }
};

export const getPosts = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10, category, tag, search } = req.query;

    const query: any = { status: 'published' };

    if (category) query.category = category;
    if (tag) query.tags = { $in: [tag] };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const posts = await BlogPost.find(query)
      .populate('author', 'username fullName avatar')
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await BlogPost.countDocuments(query);

    res.status(200).json({
      success: true,
      data: posts,
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
      message: 'Failed to fetch blog posts',
      error: error.message,
    });
  }
};

export const likePost = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { postId } = req.params;
    const userId = new mongoose.Types.ObjectId(req.user?.id);

    const post = await BlogPost.findById(postId);

    if (!post) {
      res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
      return;
    }

    const hasLiked = post.likes.some((id) => id.toString() === req.user?.id);

    if (hasLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== req.user?.id);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.status(200).json({
      success: true,
      message: hasLiked ? 'Post unliked' : 'Post liked',
      data: { likes: post.likes.length, liked: !hasLiked },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to like post',
      error: error.message,
    });
  }
};

export const bookmarkPost = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { postId } = req.params;
    const userId = new mongoose.Types.ObjectId(req.user?.id);

    const post = await BlogPost.findById(postId);

    if (!post) {
      res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
      return;
    }

    const hasBookmarked = post.bookmarkedBy.some((id) => id.toString() === req.user?.id);

    if (hasBookmarked) {
      post.bookmarkedBy = post.bookmarkedBy.filter((id) => id.toString() !== req.user?.id);
    } else {
      post.bookmarkedBy.push(userId);
    }

    await post.save();

    res.status(200).json({
      success: true,
      message: hasBookmarked ? 'Post unbookmarked' : 'Post bookmarked',
      data: { bookmarked: !hasBookmarked },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to bookmark post',
      error: error.message,
    });
  }
};
