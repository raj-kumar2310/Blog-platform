// API base URL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

// Auth storage key
export const AUTH_TOKEN_KEY = 'auth_token';
export const USER_KEY = 'user_data';

// Blog categories
export const BLOG_CATEGORIES = [
  'Technology',
  'Design',
  'Business',
  'Lifestyle',
  'Science',
  'Other',
];

// API endpoints
export const API_ENDPOINTS = {
  // Auth
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  PROFILE: '/auth/profile',
  UPDATE_PROFILE: '/auth/profile',

  // Blog Posts
  GET_POSTS: '/posts',
  GET_POST: (slug: string) => `/posts/${slug}`,
  CREATE_POST: '/posts',
  UPDATE_POST: (postId: string) => `/posts/${postId}`,
  DELETE_POST: (postId: string) => `/posts/${postId}`,
  LIKE_POST: (postId: string) => `/posts/${postId}/like`,
  BOOKMARK_POST: (postId: string) => `/posts/${postId}/bookmark`,

  // Comments
  GET_COMMENTS: (postId: string) => `/comments/${postId}`,
  CREATE_COMMENT: (postId: string) => `/comments/${postId}`,
  UPDATE_COMMENT: (commentId: string) => `/comments/${commentId}`,
  DELETE_COMMENT: (commentId: string) => `/comments/${commentId}`,

  // Admin
  DASHBOARD_STATS: '/admin/stats',
  GET_USERS: '/admin/users',
  DELETE_USER: (userId: string) => `/admin/users/${userId}`,
  UPDATE_USER_ROLE: (userId: string) => `/admin/users/${userId}/role`,
  GET_ALL_POSTS: '/admin/posts',
  DELETE_INAPPROPRIATE_COMMENT: (commentId: string) => `/admin/comments/${commentId}`,
};
