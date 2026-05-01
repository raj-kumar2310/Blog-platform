'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Card from '@/components/Card';
import { apiClient } from '@/utils/apiClient';
import { API_ENDPOINTS, BLOG_CATEGORIES } from '@/utils/constants';
import { useAuthStore } from '@/hooks/useAuth';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface FormData {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string;
  coverImage: string;
}

export default function CreatePost() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    excerpt: '',
    category: 'Technology',
    tags: '',
    coverImage: '',
  });

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (formData.content.trim().length < 100)
      newErrors.content = 'Content must be at least 100 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const tagsArray = formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const response = await apiClient.post(API_ENDPOINTS.CREATE_POST, {
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt || formData.content.substring(0, 150),
        category: formData.category,
        tags: tagsArray,
        coverImage: formData.coverImage || null,
        status: 'draft',
      });

      toast.success('Blog post created successfully! ✨');
      router.push('/dashboard');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to create blog post';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/dashboard">
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
          </Link>
          <h1 className="text-4xl font-bold mb-2 gradient-text">Create New Article</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Share your thoughts and ideas with the world
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <Input
                  label="Article Title"
                  type="text"
                  placeholder="Enter an engaging title..."
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  error={errors.title}
                />
              </div>

              {/* Cover Image */}
              <div>
                <Input
                  label="Cover Image URL (Optional)"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={formData.coverImage}
                  onChange={(e) =>
                    setFormData({ ...formData, coverImage: e.target.value })
                  }
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {BLOG_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div>
                <Input
                  label="Tags (comma separated)"
                  type="text"
                  placeholder="React, JavaScript, Web Development"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Excerpt (Optional)
                </label>
                <textarea
                  placeholder="Brief summary of your article (will be auto-generated if empty)"
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none h-20"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Content
                </label>
                <textarea
                  placeholder="Write your article content here... (Minimum 100 characters)"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none h-80 ${
                    errors.content
                      ? 'ring-2 ring-red-500 border-red-500'
                      : 'border-slate-300 dark:border-slate-600'
                  }`}
                />
                {errors.content && (
                  <p className="text-sm text-red-500 mt-1">{errors.content}</p>
                )}
                <p className="text-xs text-slate-500 mt-1">
                  {formData.content.length} characters
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                <Link href="/dashboard" className="flex-1">
                  <button
                    type="button"
                    className="w-full px-6 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    Cancel
                  </button>
                </Link>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? 'Publishing...' : 'Publish Article'}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
