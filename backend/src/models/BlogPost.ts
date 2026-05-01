import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogPost extends Document {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  author: mongoose.Types.ObjectId;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  views: number;
  readingTime: number;
  likes: mongoose.Types.ObjectId[];
  bookmarkedBy: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
      maxlength: 300,
    },
    coverImage: {
      type: String,
      default: null,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Technology', 'Design', 'Business', 'Lifestyle', 'Science', 'Other'],
    },
    tags: {
      type: [String],
      default: [],
      maxlength: 10,
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    views: {
      type: Number,
      default: 0,
    },
    readingTime: {
      type: Number,
      default: 5,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
    bookmarkedBy: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Create index for slug
BlogPostSchema.index({ slug: 1 });
BlogPostSchema.index({ author: 1 });
BlogPostSchema.index({ category: 1 });
BlogPostSchema.index({ status: 1 });
BlogPostSchema.index({ tags: 1 });

export default mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
