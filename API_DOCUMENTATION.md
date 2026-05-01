# BlogHub API Documentation

Complete API reference for the Blog Platform backend.

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## 📊 Public Endpoints

### Get All Blog Posts

**GET** `/posts`

**Query Parameters:**
- `page` (integer, default: 1) - Page number
- `limit` (integer, default: 10) - Posts per page
- `category` (string, optional) - Filter by category
- `tag` (string, optional) - Filter by tag
- `search` (string, optional) - Search in title/excerpt

**Example Request:**
```bash
GET /posts?page=1&limit=9&category=Technology
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Getting Started with Next.js",
      "slug": "getting-started-with-nextjs",
      "excerpt": "Learn the basics of Next.js...",
      "coverImage": "https://...",
      "author": {
        "_id": "507f1f77bcf86cd799439012",
        "username": "johndoe",
        "fullName": "John Doe",
        "avatar": "https://..."
      },
      "category": "Technology",
      "tags": ["nextjs", "react", "web"],
      "views": 150,
      "likes": ["507f1f77bcf86cd799439013"],
      "readingTime": 5,
      "createdAt": "2024-01-15T10:30:00Z",
      "publishedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 9,
    "total": 45,
    "pages": 5
  }
}
```

### Get Single Blog Post

**GET** `/posts/:slug`

**Example Request:**
```bash
GET /posts/getting-started-with-nextjs
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Getting Started with Next.js",
    "slug": "getting-started-with-nextjs",
    "content": "# Introduction\n\nNext.js is a React framework...",
    "excerpt": "Learn the basics...",
    "coverImage": "https://...",
    "author": { ... },
    "category": "Technology",
    "tags": ["nextjs", "react", "web"],
    "views": 151,
    "likes": [],
    "bookmarkedBy": [],
    "readingTime": 5,
    "createdAt": "2024-01-15T10:30:00Z",
    "publishedAt": "2024-01-15T10:30:00Z"
  }
}
```

### Get Comments for Post

**GET** `/comments/:postId`

**Query Parameters:**
- `page` (integer, default: 1)
- `limit` (integer, default: 10)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "content": "Great article! Very helpful.",
      "author": {
        "_id": "507f1f77bcf86cd799439012",
        "username": "janedoe",
        "fullName": "Jane Doe",
        "avatar": "https://..."
      },
      "post": "507f1f77bcf86cd799439011",
      "parentComment": null,
      "replies": [],
      "createdAt": "2024-01-15T11:00:00Z",
      "updatedAt": "2024-01-15T11:00:00Z"
    }
  ],
  "pagination": { ... }
}
```

---

## 🔐 Auth Endpoints (Protected)

### Register New User

**POST** `/auth/register`

**Request Body:**
```json
{
  "email": "john@example.com",
  "username": "johndoe",
  "password": "securepassword123",
  "fullName": "John Doe"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439012",
      "email": "john@example.com",
      "username": "johndoe",
      "fullName": "John Doe",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Response (400):**
```json
{
  "success": false,
  "message": "Email or username already in use"
}
```

### Login User

**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439012",
      "email": "john@example.com",
      "username": "johndoe",
      "fullName": "John Doe",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Get Current User Profile

**GET** `/auth/profile`
**Requires Auth:** Yes

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "email": "john@example.com",
    "username": "johndoe",
    "fullName": "John Doe",
    "avatar": "https://...",
    "bio": "Passionate developer and writer",
    "role": "user",
    "isVerified": false,
    "createdAt": "2024-01-10T08:00:00Z",
    "updatedAt": "2024-01-15T10:00:00Z"
  }
}
```

### Update Profile

**PUT** `/auth/profile`
**Requires Auth:** Yes

**Request Body:**
```json
{
  "fullName": "John Doe Updated",
  "bio": "New bio here",
  "avatar": "https://..."
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": { ... }
}
```

---

## ✍️ Blog Post Endpoints (Protected)

### Create Blog Post

**POST** `/posts`
**Requires Auth:** Yes

**Request Body:**
```json
{
  "title": "My First Blog Post",
  "content": "# Introduction\n\nThis is my first post...",
  "category": "Technology",
  "tags": ["tech", "web"],
  "coverImage": "https://..."
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Blog post created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "title": "My First Blog Post",
    "slug": "my-first-blog-post",
    "content": "...",
    "excerpt": "This is my first post...",
    "author": "507f1f77bcf86cd799439012",
    "category": "Technology",
    "tags": ["tech", "web"],
    "status": "draft",
    "views": 0,
    "likes": [],
    "bookmarkedBy": [],
    "readingTime": 3,
    "createdAt": "2024-01-15T12:00:00Z",
    "updatedAt": "2024-01-15T12:00:00Z"
  }
}
```

### Update Blog Post

**PUT** `/posts/:postId`
**Requires Auth:** Yes (must be author or admin)

**Request Body:**
```json
{
  "title": "Updated Title",
  "content": "Updated content...",
  "category": "Technology",
  "status": "published"
}
```

### Delete Blog Post

**DELETE** `/posts/:postId`
**Requires Auth:** Yes (must be author or admin)

**Response (200):**
```json
{
  "success": true,
  "message": "Blog post deleted successfully"
}
```

### Like a Post

**POST** `/posts/:postId/like`
**Requires Auth:** Yes

**Response (200):**
```json
{
  "success": true,
  "message": "Post liked",
  "data": {
    "likes": 42,
    "liked": true
  }
}
```

### Bookmark a Post

**POST** `/posts/:postId/bookmark`
**Requires Auth:** Yes

**Response (200):**
```json
{
  "success": true,
  "message": "Post bookmarked",
  "data": {
    "bookmarked": true
  }
}
```

---

## 💬 Comment Endpoints (Protected)

### Create Comment

**POST** `/comments/:postId`
**Requires Auth:** Yes

**Request Body:**
```json
{
  "content": "Great article!",
  "parentCommentId": null  // For replies, set parent comment ID
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Comment created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439016",
    "content": "Great article!",
    "author": { ... },
    "post": "507f1f77bcf86cd799439011",
    "parentComment": null,
    "replies": [],
    "createdAt": "2024-01-15T13:00:00Z",
    "updatedAt": "2024-01-15T13:00:00Z"
  }
}
```

### Update Comment

**PUT** `/comments/:commentId`
**Requires Auth:** Yes (must be author)

**Request Body:**
```json
{
  "content": "Updated comment text"
}
```

### Delete Comment

**DELETE** `/comments/:commentId`
**Requires Auth:** Yes (must be author or admin)

**Response (200):**
```json
{
  "success": true,
  "message": "Comment deleted successfully"
}
```

---

## 👨‍💼 Admin Endpoints (Protected, Admin Only)

### Get Dashboard Statistics

**GET** `/admin/stats`
**Requires Auth:** Yes (Admin)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "stats": {
      "totalUsers": 150,
      "totalPosts": 245,
      "totalComments": 1200,
      "totalDrafts": 45
    },
    "postsByCategory": [
      { "_id": "Technology", "count": 120 },
      { "_id": "Design", "count": 85 }
    ],
    "topAuthors": [ ... ],
    "recentPosts": [ ... ]
  }
}
```

### Get All Users

**GET** `/admin/users`
**Requires Auth:** Yes (Admin)

**Query Parameters:**
- `page` (integer, default: 1)
- `limit` (integer, default: 10)

**Response (200):**
```json
{
  "success": true,
  "data": [ ... ],
  "pagination": { ... }
}
```

### Delete User

**DELETE** `/admin/users/:userId`
**Requires Auth:** Yes (Admin)

### Update User Role

**PUT** `/admin/users/:userId/role`
**Requires Auth:** Yes (Admin)

**Request Body:**
```json
{
  "role": "admin"
}
```

### Get All Posts (Admin)

**GET** `/admin/posts`
**Requires Auth:** Yes (Admin)

**Query Parameters:**
- `page` (integer, default: 1)
- `limit` (integer, default: 10)
- `status` (string, optional) - "draft" or "published"

### Delete Inappropriate Comment

**DELETE** `/admin/comments/:commentId`
**Requires Auth:** Yes (Admin)

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "You do not have permission to perform this action"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Categories

Available blog post categories:
- Technology
- Design
- Business
- Lifestyle
- Science
- Other

---

## Rate Limiting

Currently no rate limiting is implemented. Consider adding for production.

---

## Pagination

All list endpoints support pagination:
- Default page: 1
- Default limit: 10
- Returns: `total`, `page`, `limit`, `pages`

---

## Status Codes

- **200** - OK
- **201** - Created
- **400** - Bad Request
- **401** - Unauthorized
- **403** - Forbidden
- **404** - Not Found
- **500** - Server Error

---

**Last Updated:** January 2024
