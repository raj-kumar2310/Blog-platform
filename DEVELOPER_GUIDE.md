# 📚 BlogHub - Developer Guide

Complete guide for developing, extending, and maintaining the Blog Platform.

---

## 🎯 Table of Contents

1. [Project Structure](#project-structure)
2. [Development Workflow](#development-workflow)
3. [Code Conventions](#code-conventions)
4. [Adding Features](#adding-features)
5. [Debugging & Testing](#debugging--testing)
6. [Common Tasks](#common-tasks)
7. [Best Practices](#best-practices)

---

## Project Structure

### Full Directory Map

```
Blog-Platform/
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx                 # Home page
│   │   │   ├── layout.tsx               # Root layout wrapper
│   │   │   ├── auth/
│   │   │   │   ├── login/page.tsx
│   │   │   │   └── register/page.tsx
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx             # Blog listing
│   │   │   │   └── [slug]/page.tsx      # Blog detail
│   │   │   ├── dashboard/
│   │   │   │   ├── page.tsx             # User dashboard
│   │   │   │   └── create/page.tsx      # Create post
│   │   │   ├── admin/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── users/page.tsx
│   │   │   │   └── moderation/page.tsx
│   │   │   ├── [username]/page.tsx      # User profile (future)
│   │   │   └── error.tsx                # Error page
│   │   │
│   │   ├── components/
│   │   │   ├── Button.tsx               # Button component
│   │   │   ├── Input.tsx                # Input component
│   │   │   ├── Card.tsx                 # Card component
│   │   │   ├── Navbar.tsx               # Navigation bar
│   │   │   ├── Skeleton.tsx             # Loading placeholder
│   │   │   ├── LayoutProvider.tsx       # Client wrapper
│   │   │   └── CommentSection.tsx       # Comments (future)
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAuth.ts               # Auth store (Zustand)
│   │   │   └── useTheme.ts              # Theme management
│   │   │
│   │   ├── utils/
│   │   │   ├── apiClient.ts             # Axios instance with JWT
│   │   │   ├── constants.ts             # URLs & categories
│   │   │   └── helpers.ts               # Utility functions
│   │   │
│   │   └── styles/
│   │       └── globals.css              # Global styles & animations
│   │
│   ├── public/
│   │   └── favicon.ico
│   │
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── next.config.js
│   ├── postcss.config.js
│   ├── .env.example
│   └── .env.local                       # (create after setup)
│
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── User.ts                  # User schema
│   │   │   ├── BlogPost.ts              # Post schema
│   │   │   └── Comment.ts               # Comment schema
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.ts        # Auth logic
│   │   │   ├── blogController.ts        # Blog CRUD
│   │   │   ├── commentController.ts     # Comments
│   │   │   └── adminController.ts       # Admin operations
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.ts            # /api/auth/*
│   │   │   ├── blogRoutes.ts            # /api/posts/*
│   │   │   ├── commentRoutes.ts         # /api/comments/*
│   │   │   └── adminRoutes.ts           # /api/admin/*
│   │   │
│   │   ├── middleware/
│   │   │   ├── authMiddleware.ts        # JWT verification
│   │   │   ├── adminMiddleware.ts       # Admin check
│   │   │   └── errorHandler.ts          # Error handling
│   │   │
│   │   ├── utils/
│   │   │   ├── database.ts              # MongoDB connection
│   │   │   ├── tokens.ts                # JWT generation
│   │   │   ├── validation.ts            # Input validation
│   │   │   └── helpers.ts               # Utility functions
│   │   │
│   │   └── index.ts                     # Server entry point
│   │
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── .env                             # (create after setup)
│
├── README.md                            # Project overview
├── SETUP_GUIDE.md                       # Installation guide
├── API_DOCUMENTATION.md                 # API reference
├── QUICK_REFERENCE.md                   # Quick tips
├── TECH_STACK.md                        # Technology details
└── DEVELOPER_GUIDE.md                   # This file
```

### Key File Purposes

**Frontend Entry Points:**
- `page.tsx` in `app/` folders - Route components
- `layout.tsx` - Global layout wrapper
- `components/LayoutProvider.tsx` - Client-side wrapper

**Backend Entry Points:**
- `index.ts` - Server initialization
- `models/*.ts` - Database schemas
- `controllers/*.ts` - Business logic
- `routes/*.ts` - API endpoint definitions

---

## Development Workflow

### Starting Development

```bash
# Terminal 1: Backend
cd backend
npm run dev
# Server runs on http://localhost:5000

# Terminal 2: Frontend
cd frontend
npm run dev
# Server runs on http://localhost:3000

# Terminal 3 (Optional): Monitor logs
tail -f backend/logs/error.log
```

### Git Workflow (Recommended)

```bash
# Before starting work
git pull origin main

# Create feature branch
git checkout -b feature/new-feature

# Make changes
# ... edit files ...

# Stage and commit
git add .
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/new-feature

# Create Pull Request on GitHub
```

### Code Style Guide

**TypeScript:**
```typescript
// ✅ Good - Explicit types
const getUserPosts = async (userId: string): Promise<BlogPost[]> => {
  return await BlogPost.find({ author: userId });
};

// ❌ Avoid - Implicit types
const getPosts = async (id) => {
  return BlogPost.find({ author: id });
};
```

**File Naming:**
- Components: `PascalCase` (e.g., `UserCard.tsx`)
- Utilities: `camelCase` (e.g., `apiClient.ts`)
- Folders: `kebab-case` (e.g., `admin-panel/`)
- Exports: `export default` for components, `export` for utilities

---

## Code Conventions

### Backend Controller Pattern

```typescript
// controllers/featureController.ts

// ✅ Standard pattern
export const createFeature = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. Extract & validate input
    const { title, description } = req.body;
    if (!title || !description) {
      throw new ApiError(400, 'Missing required fields', 'VALIDATION_ERROR');
    }

    // 2. Business logic
    const feature = await Feature.create({
      title,
      description,
      author: req.user?.id
    });

    // 3. Populate references
    await feature.populate('author', 'username');

    // 4. Return response
    res.status(201).json({
      success: true,
      message: 'Feature created',
      data: feature
    });
  } catch (error) {
    next(error);  // Pass to error handler
  }
};
```

### Frontend Component Pattern

```typescript
// components/FeatureCard.tsx

'use client';  // Client component directive

import { FC } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

interface FeatureCardProps {
  title: string;
  description: string;
  onClick?: () => void;
}

const FeatureCard: FC<FeatureCardProps> = ({
  title,
  description,
  onClick
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card-base"
    >
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Button variant="primary" onClick={onClick}>
        Learn More
      </Button>
    </motion.div>
  );
};

export default FeatureCard;
```

### API Client Usage Pattern

```typescript
// Frontend component
'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/utils/apiClient';
import { API_ENDPOINTS } from '@/utils/constants';

export default function Component() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(API_ENDPOINTS.POSTS);
        setData(response.data.data);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Skeleton />;
  if (error) return <div>Error: {error}</div>;

  return <div>{/* Render data */}</div>;
}
```

---

## Adding Features

### Add New API Endpoint

**Step 1: Create Model (if needed)**
```typescript
// backend/src/models/Feature.ts
import mongoose from 'mongoose';

const featureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Feature', featureSchema);
```

**Step 2: Create Controller**
```typescript
// backend/src/controllers/featureController.ts
export const getFeatures = async (req, res, next) => {
  try {
    const features = await Feature.find()
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    
    res.json({ success: true, data: features });
  } catch (error) {
    next(error);
  }
};
```

**Step 3: Create Routes**
```typescript
// backend/src/routes/featureRoutes.ts
import express from 'express';
import * as featureController from '../controllers/featureController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', featureController.getFeatures);
router.post('/', authMiddleware, featureController.createFeature);

export default router;
```

**Step 4: Register Routes**
```typescript
// backend/src/index.ts
import featureRoutes from './routes/featureRoutes';

app.use('/api/features', featureRoutes);
```

**Step 5: Update API Endpoints**
```typescript
// frontend/src/utils/constants.ts
export const API_ENDPOINTS = {
  // ... existing
  FEATURES: '/features',
  FEATURES_CREATE: '/features',
};
```

**Step 6: Use in Frontend**
```typescript
// frontend/src/app/features/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/utils/apiClient';

export default function FeaturesPage() {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const load = async () => {
      const response = await apiClient.get(API_ENDPOINTS.FEATURES);
      setFeatures(response.data.data);
    };
    load();
  }, []);

  return (
    <div className="grid gap-4">
      {features.map(feature => (
        <FeatureCard key={feature._id} {...feature} />
      ))}
    </div>
  );
}
```

### Add New Page

**Step 1: Create Page Component**
```typescript
// frontend/src/app/newpage/page.tsx
import Navbar from '@/components/Navbar';

export default function NewPage() {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto">
        {/* Content */}
      </main>
    </div>
  );
}
```

**Step 2: Add Navigation**
```typescript
// frontend/src/components/Navbar.tsx
// Add link in navbar menu:
<Link href="/newpage">New Page</Link>
```

### Add New Component

**Step 1: Create Component File**
```typescript
// frontend/src/components/MyComponent.tsx
'use client';

import { FC } from 'react';

interface MyComponentProps {
  title: string;
  children?: React.ReactNode;
}

const MyComponent: FC<MyComponentProps> = ({ title, children }) => {
  return (
    <div className="my-component">
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default MyComponent;
```

**Step 2: Use in Pages**
```typescript
import MyComponent from '@/components/MyComponent';

export default function Page() {
  return <MyComponent title="Hello" />;
}
```

---

## Debugging & Testing

### Frontend Debugging

**Browser DevTools (F12):**
```javascript
// Console debugging
console.log('Variable:', variable);
console.error('Error:', error);
console.table(arrayData);  // Pretty print arrays

// Network tab
// - Check API requests
// - Verify request/response
// - Check status codes

// Application tab
// - Check localStorage
// - View cookies
// - Inspect IndexedDB
```

**React DevTools:**
```
1. Install React DevTools browser extension
2. Open DevTools → Components tab
3. Inspect component hierarchy
4. View props and state in real-time
```

**Next.js Debug Mode:**
```bash
NODE_OPTIONS='--inspect' npm run dev
# Opens debugger on port 9229
```

### Backend Debugging

**Console Logging:**
```typescript
// Good logging pattern
console.log('🚀 Server started');
console.error('❌ Error:', error.message);
console.warn('⚠️ Warning:', message);

// Structured logging
const log = {
  timestamp: new Date(),
  level: 'error',
  message: error.message,
  userId: req.user?.id,
  path: req.path
};
console.error(log);
```

**Debugger:**
```bash
# Start with debugger
node --inspect=0.0.0.0:9229 src/index.ts

# Connect from VS Code
# Add to launch.json:
{
  "type": "node",
  "request": "attach",
  "name": "Attach to Backend",
  "port": 9229,
  "skipFiles": ["<node_internals>/**"]
}
```

### Testing API Endpoints

**Using cURL:**
```bash
# Get request
curl http://localhost:5000/api/posts

# Post request
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'

# With authorization
curl -H "Authorization: Bearer TOKEN" \
  http://localhost:5000/api/posts
```

**Using Postman:**
1. Create request in Postman
2. Set method, URL, headers
3. Add JSON body if needed
4. Click Send
5. View response

**Using ThunderClient:**
Similar to Postman but built-in to VS Code

---

## Common Tasks

### Update Dependencies

**Frontend:**
```bash
cd frontend

# Check outdated packages
npm outdated

# Update all packages
npm update

# Update specific package
npm install package@latest

# Check for vulnerabilities
npm audit
npm audit fix
```

**Backend:**
```bash
cd backend
npm update
npm audit fix
```

### Create Database Backup

**MongoDB Atlas:**
1. Go to MongoDB Atlas dashboard
2. Click "Atlas" → "Backup"
3. Click "Create Snapshot"

**Local MongoDB:**
```bash
# Backup
mongodump --db blog-platform --out ./backup

# Restore
mongorestore ./backup
```

### Reset Database

**⚠️ WARNING: This deletes all data!**

```typescript
// Create a script: backend/scripts/reset-db.ts
import mongoose from 'mongoose';

async function resetDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    
    // Drop all collections
    await mongoose.connection.dropDatabase();
    console.log('✅ Database reset successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Reset failed:', error);
    process.exit(1);
  }
}

resetDatabase();
```

Run with:
```bash
npx ts-node scripts/reset-db.ts
```

### Monitor Logs

**Backend:**
```bash
# Real-time log monitoring
tail -f backend/logs/app.log

# Filter errors
grep "ERROR" backend/logs/app.log

# Watch MongoDB queries
# In MongoDB Atlas → Monitoring
```

### Performance Profiling

**Frontend:**
```bash
# Build analysis
npm run build
npm install -g @next/bundle-analyzer

# View bundle
npm run analyze
```

**Backend:**
```typescript
// Add timing middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} - ${duration}ms`);
  });
  next();
});
```

---

## Best Practices

### TypeScript Best Practices

```typescript
// ✅ Use strict types
interface User {
  id: string;
  name: string;
  email: string;
}

// ❌ Avoid any
const user: any = userData;

// ✅ Use union types
type Status = 'draft' | 'published' | 'archived';

// ✅ Use generics
const asyncHandler = async <T>(fn: () => Promise<T>): Promise<T> => {
  return fn();
};
```

### React Best Practices

```typescript
// ✅ Use functional components
const MyComponent = () => {
  const [state, setState] = useState(0);
  return <div>{state}</div>;
};

// ❌ Avoid class components
class MyComponent extends React.Component {
  // ...
}

// ✅ Memoize expensive components
const MemoComponent = React.memo(MyComponent);

// ✅ Use custom hooks for logic
const useCustomLogic = () => {
  const [state, setState] = useState();
  return { state, setState };
};
```

### MongoDB Best Practices

```typescript
// ✅ Use indexes for common queries
userSchema.index({ email: 1 }, { unique: true });
postSchema.index({ author: 1, createdAt: -1 });

// ✅ Lean queries for read-only
const posts = await BlogPost.find().lean();

// ✅ Pagination
const limit = 10;
const posts = await BlogPost.find()
  .skip((page - 1) * limit)
  .limit(limit);

// ❌ Avoid N+1 queries
// Use populate carefully:
const posts = await BlogPost.find().populate('author');
```

### Error Handling Best Practices

```typescript
// ✅ Descriptive error messages
throw new ApiError(404, 'Post with ID not found', 'POST_NOT_FOUND');

// ✅ Log errors properly
console.error('Error:', {
  message: error.message,
  code: error.code,
  timestamp: new Date()
});

// ✅ Handle errors gracefully in frontend
try {
  const response = await apiClient.get('/posts');
} catch (error) {
  if (error.response?.status === 401) {
    // Redirect to login
  } else if (error.response?.status === 404) {
    // Show not found message
  } else {
    // Generic error handler
  }
}
```

### Security Best Practices

```typescript
// ✅ Validate all inputs
const { title } = req.body;
if (!title || title.length < 1) {
  throw new ApiError(400, 'Title required', 'INVALID_TITLE');
}

// ✅ Never expose sensitive data
// ❌ res.json({ user, password: user.password });
// ✅ res.json({ user: { ...user, password: undefined } });

// ✅ Use environment variables
const secret = process.env.JWT_SECRET;

// ✅ Validate JWT
const decoded = jwt.verify(token, JWT_SECRET);

// ✅ Rate limiting (future)
// Consider using express-rate-limit
```

---

## Resources & Links

### Official Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Express Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

### Tools
- [Postman](https://www.postman.com/) - API testing
- [MongoDB Compass](https://www.mongodb.com/products/compass) - Database UI
- [VS Code](https://code.visualstudio.com/) - Code editor
- [Git](https://git-scm.com/) - Version control

### Learning Resources
- [Full Stack JavaScript](https://www.theodinproject.com/)
- [Next.js Tutorial](https://nextjs.org/learn)
- [MongoDB University](https://university.mongodb.com/)

---

**Happy Coding! 🚀**
