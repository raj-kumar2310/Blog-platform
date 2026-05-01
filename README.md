# 🚀 Blog Platform - Premium Blogging Application

A modern, production-ready blogging platform built with **Next.js 14**, **Express.js**, **MongoDB**, and **Framer Motion** animations. Designed to look like a real-world SaaS product with beautiful UI/UX and professional architecture.

## ✨ Features

### 🎨 Frontend (Next.js)
- **Beautiful UI** with glassmorphism, gradients, and animations
- **Dark/Light Mode** with smooth transitions
- **Fully Responsive** - Mobile, tablet, and desktop
- **Smooth Animations** using Framer Motion
- **Authentication** - Register, login, profile management
- **Blog Management** - Create, edit, delete posts
- **Rich Experience** - Reading progress bar, reading time estimates
- **Community Features** - Like, bookmark, comment on posts
- **Admin Dashboard** - User management, analytics, moderation

### 🔧 Backend (Express.js)
- **RESTful API** with proper error handling
- **JWT Authentication** - Secure user authentication
- **MVC Architecture** - Controllers, models, routes
- **MongoDB Integration** - Scalable database
- **Middleware** - Auth, error handling
- **Role-Based Access** - Admin and user roles
- **Validation** - Input validation and security

### 📊 Database (MongoDB)
- **User Schema** - Profile, authentication
- **Blog Posts** - Content, metadata, relationships
- **Comments** - Nested replies, moderation
- **Likes & Bookmarks** - User interactions

## 🏗️ Project Structure

```
Blog-Platform/
├── frontend/              # Next.js application
│   ├── src/
│   │   ├── app/          # App Router pages
│   │   ├── components/   # Reusable React components
│   │   ├── hooks/        # Custom hooks
│   │   ├── styles/       # Global styles
│   │   └── utils/        # Utilities, API client
│   ├── package.json
│   └── tailwind.config.ts
│
├── backend/              # Express.js server
│   ├── src/
│   │   ├── controllers/  # Business logic
│   │   ├── models/       # MongoDB schemas
│   │   ├── routes/       # API endpoints
│   │   ├── middleware/   # Auth, error handling
│   │   ├── utils/        # Helpers
│   │   └── index.ts      # Server entry
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm/yarn
- **MongoDB** (local or MongoDB Atlas)
- **Git**

### 1️⃣ Clone & Setup Backend

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your MongoDB URI
# MONGODB_URI=mongodb://localhost:27017/blog-platform
# JWT_SECRET=your_secret_key_here

# Start backend server
npm run dev
# Server runs on http://localhost:5000
```

### 2️⃣ Setup Frontend

```bash
# Navigate to frontend (in another terminal)
cd frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# .env.local should have:
# NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api

# Start dev server
npm run dev
# App runs on http://localhost:3000
```

### 3️⃣ Open Browser

Visit `http://localhost:3000` and start exploring! 🎉

## 🔐 Authentication Flow

1. **Register** - Create account with email, username, password
2. **Login** - Sign in to get JWT token
3. **Token Storage** - Token stored in localStorage
4. **Protected Routes** - Routes check for valid token
5. **Auto Logout** - Invalid/expired tokens redirect to login

## 📝 API Endpoints

### Authentication
```
POST   /api/auth/register     - Create new account
POST   /api/auth/login        - Login user
GET    /api/auth/profile      - Get current user
PUT    /api/auth/profile      - Update profile
```

### Blog Posts
```
GET    /api/posts             - List all posts (paginated)
GET    /api/posts/:slug       - Get single post
POST   /api/posts             - Create post (auth required)
PUT    /api/posts/:id         - Update post (auth required)
DELETE /api/posts/:id         - Delete post (auth required)
POST   /api/posts/:id/like    - Like post (auth required)
POST   /api/posts/:id/bookmark - Bookmark post (auth required)
```

### Comments
```
GET    /api/comments/:postId  - Get comments for post
POST   /api/comments/:postId  - Create comment (auth required)
PUT    /api/comments/:id      - Update comment (auth required)
DELETE /api/comments/:id      - Delete comment (auth required)
```

### Admin
```
GET    /api/admin/stats       - Dashboard statistics (admin only)
GET    /api/admin/users       - List all users (admin only)
DELETE /api/admin/users/:id   - Delete user (admin only)
PUT    /api/admin/users/:id/role - Change user role (admin only)
GET    /api/admin/posts       - All posts with status (admin only)
DELETE /api/admin/comments/:id - Delete inappropriate comment (admin only)
```

## 🎯 Key Technologies

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Zustand** - State management
- **Axios** - HTTP client

### Backend
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

## 🎨 Design Inspiration

The platform is inspired by modern SaaS applications:
- **Medium** - Clean article layout
- **Hashnode** - Community features
- **Dev.to** - Tag system
- **Linear.app** - Modern UI aesthetic
- **Vercel** - Design system

## 📚 Features Included

### Phase 1 (Completed)
✅ Project structure and setup  
✅ Backend API with all endpoints  
✅ Frontend components and pages  
✅ Authentication system  
✅ Blog post management  
✅ Responsive design  

### Phase 2 (Ready to Build)
- [ ] Rich text editor for posts
- [ ] Comment system with nested replies
- [ ] Advanced search and filtering
- [ ] Admin dashboard with analytics
- [ ] Image upload functionality
- [ ] Email notifications
- [ ] Social sharing
- [ ] User profiles
- [ ] Follow system

## 🔧 Available Scripts

### Frontend
```bash
npm run dev     # Start dev server
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run ESLint
```

### Backend
```bash
npm run dev     # Start with hot reload
npm run build   # Compile TypeScript
npm run start   # Run compiled code
npm run lint    # Run ESLint
```

## 📖 Development Guide

### Adding a New Feature

1. **Backend**
   - Create model in `src/models/`
   - Create controller in `src/controllers/`
   - Create routes in `src/routes/`
   - Test with API client (Postman, ThunderClient)

2. **Frontend**
   - Create components in `src/components/`
   - Create API calls in utilities
   - Create pages in `src/app/`
   - Style with Tailwind CSS
   - Add animations with Framer Motion

### Code Standards

- **TypeScript** - Strict mode enabled
- **Components** - Functional with hooks
- **Styling** - Tailwind CSS classes
- **Naming** - camelCase for variables, PascalCase for components
- **Comments** - Document complex logic

## 🐛 Troubleshooting

### Backend Connection Issues
```
Error: Cannot connect to MongoDB
→ Check MONGODB_URI in .env file
→ Ensure MongoDB is running
→ Check connection string syntax
```

### Frontend API Errors
```
Error: Failed to fetch from API
→ Check backend server is running
→ Verify API_BASE_URL in .env.local
→ Check browser console for CORS errors
```

### Port Already in Use
```
# Change ports in your .env files:
Backend: PORT=5001
Frontend: PORT=3001
```

## 🚀 Deployment

### Deploy Backend (Vercel, Railway, Heroku)
```bash
# Prepare for deployment
npm run build

# Set environment variables on platform
# Deploy
```

### Deploy Frontend (Vercel, Netlify)
```bash
# Push to GitHub
git push origin main

# Connect to Vercel/Netlify
# Auto deploys on push
```

## 📄 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blog-platform
JWT_SECRET=your_secret_key_change_this_in_production
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

## 🤝 Contributing

This is a portfolio project. Feel free to fork and customize!

## 📧 Support

For issues or questions, open an issue in the repository.

## 📝 License

This project is open source and available under the MIT License.

---

**Built with ❤️ by passionate developers**

Happy blogging! 🎉
