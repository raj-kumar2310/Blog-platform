# 📋 BlogHub - Quick Reference Guide

## 🚀 Start the Platform (5 minutes)

### Terminal 1: Backend
```bash
cd backend
npm run dev
# Starts on http://localhost:5000
```

### Terminal 2: Frontend
```bash
cd frontend
npm run dev
# Starts on http://localhost:3000
```

### Open Browser
```
http://localhost:3000
```

---

## 👤 Create Test Account

1. Click **"Sign Up"**
2. Fill form:
   - Email: `test@example.com`
   - Username: `testuser`
   - Password: `password123`
   - Full Name: `Test User`
3. Click **"Create Account"**

---

## 📝 Create Your First Post

1. Go to **Dashboard**
2. Click **"Write New Article"**
3. Fill in:
   - Title: "My First Post"
   - Content: Write something
   - Category: Technology
   - Tags: tech, web
4. Click **"Publish"**

---

## 🔗 Important URLs

| Purpose | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000/api |
| API Health | http://localhost:5000/api/health |
| Blog Home | http://localhost:3000/blog |
| Dashboard | http://localhost:3000/dashboard |

---

## 📂 Key Files to Know

### Frontend
- `frontend/src/app/page.tsx` - Home page
- `frontend/src/app/blog/page.tsx` - Blog listing
- `frontend/src/app/login/page.tsx` - Login page
- `frontend/src/app/dashboard/page.tsx` - Dashboard
- `frontend/src/components/Navbar.tsx` - Navigation bar
- `frontend/src/utils/apiClient.ts` - API calls
- `frontend/tailwind.config.ts` - Theme config

### Backend
- `backend/src/index.ts` - Server entry point
- `backend/src/models/` - Database schemas
- `backend/src/controllers/` - Business logic
- `backend/src/routes/` - API endpoints
- `backend/.env` - Configuration

---

## 🎨 Customize

### Change App Name
Replace "BlogHub" in:
- `frontend/src/app/page.tsx` - Line with gradient-text
- `frontend/src/components/Navbar.tsx` - Logo section
- `frontend/src/app/layout.tsx` - Metadata title

### Change Colors
Edit `frontend/tailwind.config.ts`:
```typescript
colors: {
  primary: { /* ... */ }
}
```

### Change API URL
Edit `frontend/.env.local`:
```
NEXT_PUBLIC_API_BASE_URL=http://new-url:5000/api
```

---

## 📊 API Quick Test

### Get All Posts
```bash
curl http://localhost:5000/api/posts
```

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "username": "user",
    "password": "pass123",
    "fullName": "User Name"
  }'
```

### Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "pass123"
  }'
```

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend won't start | Check MongoDB connection in `.env` |
| Frontend won't start | Check port 3000 not in use |
| API errors | Verify backend is running on 5000 |
| Login fails | Check user exists in MongoDB |
| Dark mode not working | Refresh page, check browser console |

---

## 📚 File Structure Quick Map

```
Blog-Platform/
├── frontend/src/
│   ├── app/              # Pages
│   │   ├── page.tsx      # Home
│   │   ├── blog/
│   │   ├── login/
│   │   ├── register/
│   │   └── dashboard/
│   ├── components/       # UI Components
│   ├── hooks/            # Custom Hooks
│   ├── styles/           # Styles
│   └── utils/            # Utilities
│
├── backend/src/
│   ├── models/           # MongoDB Schemas
│   ├── controllers/      # Business Logic
│   ├── routes/           # API Routes
│   ├── middleware/       # Middleware
│   └── utils/            # Helpers
```

---

## 🌐 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blog-platform
JWT_SECRET=secret_key_here
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

---

## 🎯 Common Tasks

### Add New Route (Backend)
1. Create controller in `src/controllers/`
2. Create routes in `src/routes/`
3. Import in `src/index.ts`
4. Test with curl/Postman

### Add New Page (Frontend)
1. Create folder in `src/app/`
2. Create `page.tsx` inside
3. Use components from `src/components/`
4. Add to Navbar if needed

### Add New Component
1. Create file in `src/components/`
2. Make it `export default`
3. Use in pages with `import`

---

## 📱 Responsive Breakpoints

Using Tailwind CSS:
- `sm` - 640px (phones)
- `md` - 768px (tablets)
- `lg` - 1024px (desktops)
- `xl` - 1280px (large screens)

---

## 🎨 Color Palette

- **Primary Blue:** `#0ea5e9`
- **Purple:** `#9333ea`
- **Green (Success):** `#10b981`
- **Red (Error):** `#ef4444`
- **Gray (Text):** `#64748b`

---

## 📊 Database Collections

### Users Collection
```
{
  email: string,
  username: string,
  password: string (hashed),
  fullName: string,
  avatar?: string,
  bio?: string,
  role: 'user' | 'admin',
  createdAt: Date
}
```

### Blog Posts Collection
```
{
  title: string,
  slug: string,
  content: string,
  excerpt: string,
  author: ObjectId,
  category: string,
  tags: string[],
  status: 'draft' | 'published',
  likes: ObjectId[],
  views: number,
  readingTime: number
}
```

### Comments Collection
```
{
  content: string,
  author: ObjectId,
  post: ObjectId,
  parentComment?: ObjectId,
  replies: ObjectId[],
  createdAt: Date
}
```

---

## 🚀 Deploy Commands

### Build Frontend
```bash
cd frontend
npm run build
npm run start
```

### Build Backend
```bash
cd backend
npm run build
npm run start
```

---

## 🤝 Git Workflow (Optional)

```bash
# Initialize git (if not done)
git init

# Stage changes
git add .

# Commit
git commit -m "Build blog platform"

# Create .gitignore (before first commit)
# Add: .env, node_modules, .next, dist
```

---

## 📞 Support

### Check Logs
```bash
# Frontend: Check browser console (F12)
# Backend: Check terminal output
# Database: Check MongoDB Atlas dashboard
```

### Reset Everything
```bash
# Clear node modules and reinstall
cd backend
rm -rf node_modules
npm install

cd ../frontend
rm -rf node_modules
npm install
```

---

## ✅ Checklist Before Deploying

- [ ] All tests passing
- [ ] No console errors
- [ ] Environment variables set
- [ ] Database backups created
- [ ] JWT_SECRET changed
- [ ] CORS_ORIGIN updated
- [ ] API endpoints tested
- [ ] UI responsive on mobile
- [ ] Dark mode works
- [ ] Authentication tested

---

## 📖 Next Steps

1. **Explore the code** - Understand architecture
2. **Read documentation** - Check README.md
3. **Try features** - Create posts, comments
4. **Customize design** - Change colors, fonts
5. **Add features** - Use provided patterns
6. **Deploy** - Push to production

---

**Keep Building! 🚀**
