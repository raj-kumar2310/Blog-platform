# 🚀 BlogHub - Installation & Setup Guide

Complete step-by-step guide to get the Blog Platform running locally.

## Prerequisites

Before you start, ensure you have:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** or **yarn** (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- **MongoDB** installed locally OR MongoDB Atlas account ([Create Free Account](https://www.mongodb.com/cloud/atlas))
- **A code editor** (VS Code recommended)

### Check Installation
```bash
node --version      # Should be v18+
npm --version       # Should be 8+
git --version       # Should be 2.x
```

---

## Step 1: MongoDB Setup

### Option A: MongoDB Atlas (Recommended for beginners)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new project (e.g., "BlogHub")
4. Create a new cluster (M0 free tier is enough)
5. Set up database user credentials
6. Get connection string (looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/blog-platform?retryWrites=true&w=majority`)
7. **Copy this connection string** - you'll need it later

### Option B: Local MongoDB

1. Download MongoDB ([Official Site](https://www.mongodb.com/try/download/community))
2. Install following the official guide for your OS
3. Verify installation:
   ```bash
   mongod --version
   ```
4. Your local connection string will be:
   ```
   mongodb://localhost:27017/blog-platform
   ```

---

## Step 2: Clone & Navigate

```bash
# Clone the repository (or extract if downloaded as ZIP)
cd "d:\New folder\intern\Thiranx\Blog platform"

# Verify structure
dir  # On Windows
ls   # On Mac/Linux
```

You should see:
- `frontend/` folder
- `backend/` folder
- `README.md`
- `API_DOCUMENTATION.md`

---

## Step 3: Backend Setup

### 3.1 Install Dependencies

```bash
# Navigate to backend
cd backend

# Install all dependencies
npm install

# This will install:
# - express
# - mongoose
# - jwt
# - bcryptjs
# - cors
# - dotenv
# - and more...

# Wait for installation to complete (2-5 minutes depending on internet)
```

### 3.2 Configure Environment

```bash
# Copy example env file
# On Windows
copy .env.example .env

# On Mac/Linux
cp .env.example .env
```

Now edit `.env` file (open in your code editor):

```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/blog-platform?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

**Important:** Replace values:
- `MONGODB_URI` - Use your MongoDB connection string
- `JWT_SECRET` - Change to a random secure string

### 3.3 Start Backend Server

```bash
# Start development server with hot reload
npm run dev

# You should see output like:
# ╔════════════════════════════════════════════╗
# ║   🚀 Blog Platform Backend Server Running   ║
# ║   📍 http://localhost:5000                  ║
# ║   🔌 Environment: development               ║
# ╚════════════════════════════════════════════╝
```

✅ Backend is running! Leave this terminal open.

---

## Step 4: Frontend Setup

### 4.1 Open New Terminal

Open a new terminal/command prompt in the same workspace root.

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Wait for installation (2-5 minutes)
```

### 4.2 Configure Environment

```bash
# Copy example env file
# On Windows
copy .env.example .env.local

# On Mac/Linux
cp .env.example .env.local
```

Edit `.env.local`:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

This tells the frontend where to find the backend API.

### 4.3 Start Frontend Server

```bash
# Start development server
npm run dev

# You should see output like:
# ▲ Next.js 14.0.0
# - Local: http://localhost:3000
# - Environments: .env.local
```

---

## Step 5: Access the Application

🎉 **Everything is running!**

Open your browser and visit:

### http://localhost:3000

You should see the beautiful BlogHub homepage!

---

## First Time Usage

### 1. Create an Account

1. Click **"Sign Up"** button
2. Fill in the registration form:
   - Full Name
   - Email
   - Username
   - Password (min 6 characters)
3. Click **"Create Account"**
4. You'll be logged in automatically!

### 2. Explore the Platform

- **Home Page** - See featured posts and categories
- **Blog** - Browse all published articles
- **Dashboard** - Your personal dashboard
- **Create Post** - Write a new article (from dashboard)
- **Dark Mode** - Toggle theme in navbar

### 3. Create Your First Post

1. Go to **Dashboard**
2. Click **"Write New Article"**
3. Fill in post details:
   - Title
   - Content (markdown supported)
   - Category
   - Tags
   - Cover image URL
4. Click **"Save as Draft"** or **"Publish"**

---

## Testing with API Client

To test backend endpoints directly, use [Postman](https://www.postman.com/downloads/) or [ThunderClient](https://www.thunderclient.com/):

### Test Registration
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "username": "testuser",
  "password": "password123",
  "fullName": "Test User"
}
```

### Test Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

---

## Troubleshooting

### Issue: Backend won't start

**Error:** `Cannot connect to MongoDB`

**Solution:**
```bash
# 1. Check MongoDB connection string in .env
# 2. Test connection:
#    - If using MongoDB Atlas: Check IP whitelist
#    - If using local: Start MongoDB daemon

# MongoDB Atlas: Whitelist your IP
# 1. Go to MongoDB Atlas
# 2. Click "Network Access"
# 3. Add your IP (or 0.0.0.0/0 for anywhere)

# Local MongoDB (Windows)
mongod

# Local MongoDB (Mac with Homebrew)
brew services start mongodb-community
```

### Issue: Frontend won't start

**Error:** `Port 3000 already in use`

**Solution:**
```bash
# Stop the process using port 3000
# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -i :3000
kill -9 <PID>

# Or change port in frontend:
# Open .env.local and add:
PORT=3001
```

### Issue: API connection errors

**Error:** `Failed to fetch from backend`

**Solution:**
1. Check backend is running: http://localhost:5000/api/health
2. Check frontend env: `NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api`
3. Check CORS_ORIGIN in backend .env matches frontend URL

### Issue: Login fails

**Error:** `Invalid email or password`

**Solution:**
1. Verify you registered correctly
2. Check MongoDB has your user data:
   ```bash
   # In MongoDB Atlas or local MongoDB:
   # Find users collection in blog-platform database
   ```
3. Make sure backend is connected to MongoDB

---

## Common Commands

### Backend

```bash
# Start dev server (with hot reload)
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Run linter
npm run lint
```

### Frontend

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production build
npm start

# Run linter
npm run lint
```

---

## File Structure Quick Reference

```
Blog-Platform/
├── frontend/
│   ├── src/
│   │   ├── app/              # Pages (/, /blog, /login, etc.)
│   │   ├── components/       # Reusable components
│   │   ├── hooks/            # Custom hooks
│   │   ├── styles/           # Global CSS
│   │   └── utils/            # API client, constants
│   ├── public/               # Static files
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   └── next.config.js
│
├── backend/
│   ├── src/
│   │   ├── models/           # MongoDB schemas
│   │   ├── controllers/      # Business logic
│   │   ├── routes/           # API endpoints
│   │   ├── middleware/       # Auth, error handling
│   │   ├── utils/            # Helpers
│   │   └── index.ts          # Server entry
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
├── README.md                 # Project overview
└── API_DOCUMENTATION.md      # API reference
```

---

## Next Steps

### After Setup

1. **Explore the code** - Understand the project structure
2. **Read API docs** - Check `API_DOCUMENTATION.md`
3. **Try features** - Create posts, comments, like content
4. **Customize** - Change colors, add features, personalize

### Common Customizations

1. **Change app name** - Replace "BlogHub" in code
2. **Change colors** - Edit `tailwind.config.ts`
3. **Add features** - Follow the MVC pattern
4. **Deploy** - Deploy backend to Vercel/Railway, frontend to Vercel

---

## Useful Links

- **Next.js Docs** - https://nextjs.org/docs
- **Express Docs** - https://expressjs.com/
- **MongoDB Docs** - https://docs.mongodb.com/
- **Tailwind CSS** - https://tailwindcss.com/docs
- **Framer Motion** - https://www.framer.com/motion/
- **Zustand** - https://github.com/pmndrs/zustand

---

## Getting Help

### Issues?

1. Check the troubleshooting section above
2. Review API_DOCUMENTATION.md
3. Check browser console for errors (F12)
4. Check terminal output for backend errors

### Development Tips

1. Use browser DevTools (F12) to debug
2. Check network tab to see API calls
3. Enable Next.js error overlay for frontend issues
4. Use MongoDB Atlas UI to view your data

---

## Performance Tips

- Clear browser cache if seeing old content: `Ctrl+Shift+Del`
- Restart both servers if having strange issues
- Check MongoDB quota if database operations fail

---

## Security Notes

⚠️ **For Development Only:**
- Keep `.env` files out of git (use `.gitignore`)
- Change `JWT_SECRET` to a strong random value
- Never commit `.env` files to version control
- Use environment variables for sensitive data

---

**You're all set! Happy blogging! 🎉**

For more info, check:
- `README.md` - Project overview
- `API_DOCUMENTATION.md` - API reference
- Code comments for implementation details
