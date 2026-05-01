'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Heart, Bookmark, Share2, Clock, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Skeleton from '@/components/Skeleton';
import { apiClient } from '@/utils/apiClient';
import { API_ENDPOINTS } from '@/utils/constants';
import toast from 'react-hot-toast';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  author: { _id: string; username: string; fullName: string; avatar?: string; bio?: string };
  category: string;
  tags: string[];
  views: number;
  likes: string[];
  bookmarkedBy: string[];
  createdAt: string;
  publishedAt: string;
  readingTime: number;
}

export default function BlogDetail() {
  const params = useParams();
  const slug = params.slug as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    fetchPost();

    // Track scroll progress
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = window.scrollY;
      setScrollProgress((scrolled / docHeight) * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug]);

  const fetchPost = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get(API_ENDPOINTS.GET_POST(slug));
      const postData = response.data.data;
      setPost(postData);
      // Check if current user has liked/bookmarked (requires auth store)
      setIsLiked(false);
      setIsBookmarked(false);
    } catch (error) {
      toast.error('Failed to load blog post');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async () => {
    if (!post) return;
    try {
      await apiClient.post(API_ENDPOINTS.LIKE_POST(post._id));
      setIsLiked(!isLiked);
      toast.success(isLiked ? 'Post unliked' : 'Post liked! ❤️');
    } catch (error) {
      toast.error('Failed to like post');
    }
  };

  const handleBookmark = async () => {
    if (!post) return;
    try {
      await apiClient.post(API_ENDPOINTS.BOOKMARK_POST(post._id));
      setIsBookmarked(!isBookmarked);
      toast.success(isBookmarked ? 'Bookmark removed' : 'Article bookmarked! 📚');
    } catch (error) {
      toast.error('Failed to bookmark post');
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <Skeleton height="h-96" className="mb-8" />
          <Skeleton height="h-8" className="mb-4 w-3/4" />
          <Skeleton height="h-4" count={5} />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-12 text-center">
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">
            Article not found
          </p>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 z-50"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block">
              ← Back to Blog
            </Link>

            {/* Category and Meta */}
            <div className="flex items-center gap-4 mb-4 text-sm text-slate-600 dark:text-slate-400">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full font-semibold">
                {post.category}
              </span>
              <span>{post.views} views</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Author & Meta Info */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 pb-8 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold text-lg">
                  {post.author.fullName.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{post.author.fullName}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    @{post.author.username}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.publishedAt)}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readingTime} min read
                </div>
              </div>
            </div>
          </motion.div>

          {/* Cover Image */}
          {post.coverImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-12 rounded-lg overflow-hidden"
            >
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-auto object-cover"
              />
            </motion.div>
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="prose dark:prose-invert max-w-none mb-12"
          >
            <div className="markdown-content">
              {post.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-12 pb-12 border-b border-slate-200 dark:border-slate-800"
            >
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${tag}`}
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              variant={isLiked ? 'primary' : 'secondary'}
              icon={<Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />}
              onClick={handleLike}
            >
              {isLiked ? 'Liked' : 'Like'} ({post.likes.length})
            </Button>

            <Button
              variant={isBookmarked ? 'primary' : 'secondary'}
              icon={<Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />}
              onClick={handleBookmark}
            >
              {isBookmarked ? 'Saved' : 'Bookmark'}
            </Button>

            <Button
              variant="secondary"
              icon={<Share2 className="w-5 h-5" />}
              onClick={() => {
                navigator.share?.({
                  title: post.title,
                  text: post.excerpt,
                  url: window.location.href,
                });
              }}
            >
              Share
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
