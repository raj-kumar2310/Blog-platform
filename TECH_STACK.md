# 🛠 BlogHub - Tech Stack & Architecture

Complete technical documentation of the Blog Platform architecture and technology choices.

---

## 📋 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Frontend Stack](#frontend-stack)
3. [Backend Stack](#backend-stack)
4. [Database Design](#database-design)
5. [API Architecture](#api-architecture)
6. [Security Implementation](#security-implementation)
7. [Performance Considerations](#performance-considerations)
8. [Deployment Ready](#deployment-ready)

---

## Architecture Overview

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │   Browser    │  │  Next.js 14  │  │  Tailwind    │           │
│  │  (User UI)   │  │  (SSR/SSG)   │  │  (Styling)   │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                      API Gateway (HTTP)
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                     SERVER LAYER                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Express.js + Node.js                        │   │
│  │                                                          │   │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐        │   │
│  │  │ Auth Routes│  │Blog Routes │  │Admin Routes│        │   │
│  │  └────────────┘  └────────────┘  └────────────┘        │   │
│  │         ↓             ↓                ↓                │   │
│  │  ┌────────────────────────────────────────────┐        │   │
│  │  │      Controllers & Business Logic          │        │   │
│  │  └────────────────────────────────────────────┘        │   │
│  │         ↓                                              │   │
│  │  ┌────────────────────────────────────────────┐        │   │
│  │  │  Middleware (Auth, Error Handling, CORS)   │        │   │
│  │  └────────────────────────────────────────────┘        │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                     DATA LAYER                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │           MongoDB + Mongoose ODM                         │   │
│  │                                                          │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │   │
│  │  │ Users Coll.  │  │ Posts Coll.  │  │Comments Coll.│  │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Communication Flow

```
User Action
    ↓
[Browser] → React Component
    ↓
[Next.js] → API Call via Axios
    ↓
[Express Server] → Authentication Middleware
    ↓
[Controller] → Business Logic
    ↓
[MongoDB] → Data Operations
    ↓
[Response] → JSON Response
    ↓
[Frontend] → Update State (Zustand)
    ↓
[UI] → Re-render with new data
```

---

## Frontend Stack

### Core Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 14.0+ | React framework with SSR, API routes, routing |
| **React** | 18.2+ | UI library and component system |
| **TypeScript** | 5.0+ | Type safety and developer experience |
| **Tailwind CSS** | 3.3+ | Utility-first CSS framework |
| **Framer Motion** | 10.16+ | Smooth animations and transitions |

### State Management

**Zustand** (4.4.0)
- Simple, lightweight state management
- Auth store with localStorage persistence
- User profile state
- Theme state

```typescript
// useAuth store
interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  setAuth: (user, token) => void;
  logout: () => void;
}
```

### HTTP Client

**Axios** (1.6.0)
- Request/response interceptors
- Automatic JWT injection
- Centralized error handling
- Base URL configuration

```typescript
// Auto-injects JWT token
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### UI Components

**Custom Component Library:**
- `Button` - Multiple variants (primary, secondary, ghost)
- `Input` - Form input with validation
- `Card` - Layout component with hover effects
- `Skeleton` - Loading placeholder
- `Navbar` - Navigation header

All components:
- ✅ Fully typed with TypeScript
- ✅ Support Framer Motion animations
- ✅ Responsive with Tailwind
- ✅ Accessible with ARIA labels

### Styling System

**Tailwind CSS Configuration:**
```typescript
// Custom utilities & theme
utilities: {
  btn-primary: 'px-4 py-2 bg-blue-500 rounded...',
  card-base: 'bg-white rounded-lg shadow...',
  glass: 'backdrop-blur-md bg-white/10...',
}

theme: {
  colors: {
    primary: '#0ea5e9',
    secondary: '#9333ea',
    success: '#10b981',
    error: '#ef4444',
  }
}
```

**Global Animations:**
- Fade-in animations
- Slide transitions
- Float effects
- Scale on hover
- Pulse on loading

### Pages Structure

```
Frontend/
├── app/
│   ├── page.tsx                    # Home (/)
│   ├── layout.tsx                  # Root layout
│   ├── auth/
│   │   ├── login/page.tsx          # Login
│   │   └── register/page.tsx       # Register
│   ├── blog/
│   │   ├── page.tsx                # Blog listing
│   │   └── [slug]/page.tsx         # Blog detail
│   ├── dashboard/
│   │   ├── page.tsx                # User dashboard
│   │   └── create/page.tsx         # Create post
│   └── admin/
│       ├── page.tsx                # Admin dashboard
│       ├── users/page.tsx          # User management
│       └── moderation/page.tsx     # Comment moderation
├── components/                      # Reusable UI
├── hooks/                           # Custom hooks
├── utils/                           # Helpers & API client
└── styles/                          # Global CSS
```

---

## Backend Stack

### Core Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | 18+ | JavaScript runtime |
| **Express.js** | 4.18+ | Web framework |
| **TypeScript** | 5.0+ | Type safety |
| **MongoDB** | 6.0+ | NoSQL database |
| **Mongoose** | 7.0+ | ODM for MongoDB |

### Authentication

**JWT (jsonwebtoken 9.1.0)**
```typescript
// Token structure
{
  id: string,           // User ID
  role: 'user' | 'admin',
  iat: number,          // Issued at
  exp: number           // Expires in 7 days
}
```

**Password Security (bcryptjs 2.4.3)**
```typescript
// Pre-save middleware
userSchema.pre('save', async (next) => {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
```

### Architecture Pattern

**MVC (Model-View-Controller)**

```
Models/
├── User.ts           # User schema & methods
├── BlogPost.ts       # Post schema & methods
└── Comment.ts        # Comment schema & methods

Controllers/
├── authController    # Auth logic
├── blogController    # Blog logic
├── commentController # Comments logic
└── adminController   # Admin operations

Routes/
├── authRoutes        # /api/auth/*
├── blogRoutes        # /api/posts/*
├── commentRoutes     # /api/comments/*
└── adminRoutes       # /api/admin/*
```

### Middleware Stack

```typescript
app.use(cors());                    // Cross-origin requests
app.use(express.json());            // JSON parsing
app.use(morgan('dev'));             // Request logging

// Route-specific middleware
app.use('/auth', authRoutes);       // No auth required
app.use('/posts', postsRoutes);     // Public read, auth write
app.use('/comments', authMiddleware, commentRoutes);
app.use('/admin', authMiddleware, adminMiddleware, adminRoutes);

app.use(errorHandler);              // Global error handler
```

### Controllers Example

```typescript
// blogController.ts
export const createPost = async (req, res) => {
  try {
    // 1. Validate input
    const { title, content, category } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    // 2. Create slug & excerpt
    const slug = generateSlug(title);
    const excerpt = generateExcerpt(content);

    // 3. Create document
    const post = await BlogPost.create({
      title,
      slug,
      content,
      excerpt,
      author: req.user.id,
      category
    });

    // 4. Populate references
    await post.populate('author', 'username fullName avatar');

    // 5. Return response
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    next(error);  // Pass to error handler
  }
};
```

---

## Database Design

### Collections & Relationships

#### Users Collection
```typescript
{
  _id: ObjectId,
  email: string,              // Unique
  username: string,           // Unique
  password: string,           // Hashed
  fullName: string,
  avatar?: string,
  bio?: string,
  role: 'user' | 'admin',
  isVerified: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `email` (unique)
- `username` (unique)
- `createdAt` (for sorting)

#### BlogPosts Collection
```typescript
{
  _id: ObjectId,
  title: string,
  slug: string,               // Unique
  content: string,
  excerpt: string,
  coverImage?: string,
  author: ObjectId,           // Ref to User
  category: string,           // Enum
  tags: string[],
  status: 'draft' | 'published',
  views: number,              // Default: 0
  likes: ObjectId[],          // Array of User IDs
  bookmarkedBy: ObjectId[],   // Array of User IDs
  readingTime: number,
  createdAt: Date,
  publishedAt?: Date,
  updatedAt: Date
}
```

**Indexes:**
- `slug` (unique)
- `author` (for filtering by author)
- `category` (for filtering)
- `status` (for draft/published filter)
- `tags` (for tag search)
- `createdAt` (for sorting)

#### Comments Collection
```typescript
{
  _id: ObjectId,
  content: string,
  author: ObjectId,           // Ref to User
  post: ObjectId,             // Ref to BlogPost
  parentComment?: ObjectId,   // For nested replies
  replies: ObjectId[],        // Array of Comment IDs
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `post` (to fetch post comments)
- `parentComment` (for finding replies)
- `author` (to find user's comments)

### Relationships

```
User
├── One-to-Many → BlogPosts (author field)
├── One-to-Many → Comments (author field)
└── Many-to-Many → Likes (in posts.likes array)

BlogPost
├── Many-to-One → User (author field)
├── One-to-Many → Comments (post field)
└── Many-to-Many → Users (likes array)

Comment
├── Many-to-One → User (author field)
├── Many-to-One → BlogPost (post field)
└── One-to-Many → Comments (replies via parentComment)
```

---

## API Architecture

### Request/Response Format

**Success Response:**
```json
{
  "success": true,
  "data": { /* ... */ },
  "message": "Operation successful"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "code": "ERROR_CODE"
}
```

### Endpoint Categories

**Public Endpoints (No Auth Required)**
- GET /posts
- GET /posts/:slug
- GET /comments/:postId

**Protected Endpoints (Auth Required)**
- All POST/PUT/DELETE operations
- User profile operations
- Dashboard access

**Admin Endpoints (Auth + Admin Role Required)**
- User management
- Moderation tools
- Statistics endpoints

### Error Handling

**ApiError Class:**
```typescript
class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code: string
  ) {
    super(message);
  }
}

// Usage
throw new ApiError(404, 'Post not found', 'POST_NOT_FOUND');
```

### Status Codes

| Code | Usage |
|------|-------|
| 200 | Successful GET/PUT/DELETE |
| 201 | Successful POST (Created) |
| 400 | Validation error |
| 401 | Unauthorized (invalid token) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Resource not found |
| 500 | Server error |

---

## Security Implementation

### Authentication Flow

```
1. Register
   └→ Hash password with bcryptjs (10 rounds)
   └→ Create user in database

2. Login
   └→ Find user by email
   └→ Compare hashed password
   └→ Generate JWT token (7 day expiration)
   └→ Return token to client

3. Protected Request
   └→ Client sends: Authorization: Bearer <token>
   └→ Server verifies token signature
   └→ Extract user ID from token
   └→ Attach user to req.user

4. Token Expiration
   └→ Client receives 401 response
   └→ Frontend clears auth state
   └→ Redirect to login
```

### Middleware Security

**Authentication Middleware:**
```typescript
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
```

**Authorization Middleware:**
```typescript
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};
```

### CORS Configuration

```typescript
app.use(cors({
  origin: process.env.CORS_ORIGIN,  // http://localhost:3000
  credentials: true,
  optionsSuccessStatus: 200
}));
```

### Input Validation

```typescript
// Example: Register validation
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (pwd) => pwd.length >= 6;

if (!validateEmail(email)) {
  throw new ApiError(400, 'Invalid email', 'INVALID_EMAIL');
}
```

---

## Performance Considerations

### Database Optimization

**Indexing Strategy:**
```typescript
// Users
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ username: 1 }, { unique: true });

// BlogPosts
db.posts.createIndex({ slug: 1 }, { unique: true });
db.posts.createIndex({ author: 1 });
db.posts.createIndex({ category: 1 });
db.posts.createIndex({ status: 1 });

// Comments
db.comments.createIndex({ post: 1 });
db.comments.createIndex({ author: 1 });
```

### Query Optimization

```typescript
// Pagination
const POSTS_PER_PAGE = 10;
const skip = (page - 1) * POSTS_PER_PAGE;
const posts = await BlogPost.find()
  .skip(skip)
  .limit(POSTS_PER_PAGE)
  .select('-content')  // Exclude large field
  .populate('author', 'username fullName avatar');

// Aggregation for stats
const stats = await BlogPost.aggregate([
  { $match: { status: 'published' } },
  { $group: {
      _id: '$category',
      count: { $sum: 1 },
      totalViews: { $sum: '$views' }
    }
  }
]);
```

### Frontend Optimization

**Code Splitting:**
```typescript
// Next.js automatic code splitting per route
// Each page loads only necessary code
```

**Image Optimization:**
```typescript
// Next.js Image component
import Image from 'next/image';
<Image 
  src={url}
  alt="post"
  width={800}
  height={600}
  priority={false}  // Lazy load
/>
```

**Caching Strategies:**
```typescript
// Browser caching via headers
// Zustand store caching in localStorage
// MongoDB indexes for query speed
```

---

## Deployment Ready

### Environment Configuration

**Development (.env)**
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blog-platform
JWT_SECRET=dev_secret_key_123
CORS_ORIGIN=http://localhost:3000
```

**Production**
```
NODE_ENV=production
PORT=process.env.PORT (from platform)
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/blog
JWT_SECRET=strong_random_key_generated
CORS_ORIGIN=https://yourdomain.com
```

### Build Commands

```bash
# Frontend
npm run build   # Builds Next.js app
npm run start   # Production server

# Backend
npm run build   # Compiles TypeScript
npm run start   # Production server
```

### Deployment Platforms

**Frontend:**
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify

**Backend:**
- Railway
- Render
- Heroku
- AWS EC2

**Database:**
- MongoDB Atlas (Recommended)
- AWS DocumentDB
- Self-hosted MongoDB

---

## Summary

| Aspect | Choice | Reason |
|--------|--------|--------|
| Frontend Framework | Next.js 14 | SSR, routing, performance |
| Styling | Tailwind CSS | Utility-first, responsive |
| Animations | Framer Motion | Smooth, performant animations |
| State Management | Zustand | Lightweight, simple |
| Backend | Express.js | Lightweight, flexible |
| Database | MongoDB | Flexible schema, scalable |
| Authentication | JWT | Stateless, secure |
| Password Hashing | bcryptjs | Industry standard |
| Deployment | Vercel/Railway | Easy, fast, reliable |

---

**Production-Ready Architecture ✅**
