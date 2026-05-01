import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User';
import BlogPost from './models/BlogPost';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blog-platform';

const sampleUsers = [
  {
    email: 'john@example.com',
    username: 'john_tech',
    password: 'hashed_password',
    fullName: 'John Developer',
    bio: 'Full stack developer passionate about web technologies',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    role: 'user' as const,
    isVerified: true,
  },
  {
    email: 'sarah@example.com',
    username: 'sarah_design',
    password: 'hashed_password',
    fullName: 'Sarah Designer',
    bio: 'UI/UX designer and creative thinker',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    role: 'user' as const,
    isVerified: true,
  },
  {
    email: 'mike@example.com',
    username: 'mike_business',
    password: 'hashed_password',
    fullName: 'Mike Entrepreneur',
    bio: 'Startup founder and business strategist',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    role: 'user' as const,
    isVerified: true,
  },
];

const samplePosts = [
  {
    title: 'Getting Started with React Hooks',
    slug: 'getting-started-with-react-hooks',
    content: `React Hooks have revolutionized the way we write React components. In this comprehensive guide, we'll explore the fundamentals of Hooks and how they can simplify your React development workflow.

## What are React Hooks?

React Hooks are functions that let you "hook into" React state and lifecycle features from function components. They were introduced in React 16.8 and have become a game-changer for modern React development.

## Why Use Hooks?

1. **Simpler Code**: Hooks allow you to write cleaner, more maintainable code
2. **Reusability**: Extract and reuse logic between components
3. **Better Organization**: Group related logic together

## Common Hooks

- useState: Manage local state in functional components
- useEffect: Perform side effects in functional components
- useContext: Access context values
- useReducer: Complex state management

## Best Practices

Always follow the Rules of Hooks to ensure your application works correctly and maintain consistency across your codebase.`,
    excerpt:
      'Learn how to use React Hooks to write cleaner, more maintainable React components with this comprehensive guide.',
    category: 'Technology',
    tags: ['React', 'JavaScript', 'Web Development', 'Hooks'],
    status: 'published' as const,
    views: 1250,
    readingTime: 8,
    likes: [],
    bookmarkedBy: [],
  },
  {
    title: 'The Art of Minimalist Design',
    slug: 'the-art-of-minimalist-design',
    content: `Minimalism isn't just a design trend; it's a philosophy that emphasizes simplicity, clarity, and purpose. In this article, we explore how minimalist principles can elevate your design work.

## Core Principles of Minimalist Design

Minimalist design is built on several key principles that guide every decision:

### 1. Simplicity
Remove unnecessary elements and focus on what matters.

### 2. Whitespace
Use empty space strategically to create balance and focus.

### 3. Hierarchy
Establish clear visual hierarchy to guide user attention.

### 4. Color Restraint
Use a limited color palette for cohesion and impact.

## Practical Applications

- Web Design: Clean layouts with focus on content
- Product Design: Intuitive interfaces with minimal friction
- Branding: Memorable, timeless brand identities

## Real-World Examples

Companies like Apple, Google, and Airbnb have mastered minimalist design, creating products that are both beautiful and functional.`,
    excerpt:
      'Discover how minimalist design principles can transform your creative work and improve user experience.',
    category: 'Design',
    tags: ['Design', 'Minimalism', 'UX', 'UI'],
    status: 'published' as const,
    views: 890,
    readingTime: 6,
    likes: [],
    bookmarkedBy: [],
  },
  {
    title: 'Scaling Your Startup: 5 Critical Lessons',
    slug: 'scaling-your-startup-5-critical-lessons',
    content: `Scaling a startup is one of the most challenging yet rewarding experiences. In this guide, we share five critical lessons we've learned from successful founders.

## Lesson 1: Product-Market Fit First

Before scaling, ensure you have found product-market fit. Scaling without it will only amplify problems.

## Lesson 2: Build a Strong Team

Your team is your biggest asset. Hire slowly, fire quickly, and invest in company culture.

## Lesson 3: Focus on Unit Economics

Understand your business metrics deeply. Know your CAC, LTV, and burn rate.

## Lesson 4: Maintain Company Culture

As you grow, protecting your culture becomes increasingly important. Document values and hire accordingly.

## Lesson 5: Prepare for Challenges

Growth brings new challenges. Be ready to adapt your business model, technology, and processes.

## Final Thoughts

Scaling is a marathon, not a sprint. Stay focused on your mission and keep learning from every experience.`,
    excerpt:
      'Learn five essential lessons for scaling your startup successfully and avoiding common pitfalls.',
    category: 'Business',
    tags: ['Startup', 'Growth', 'Business', 'Entrepreneurship'],
    status: 'published' as const,
    views: 2100,
    readingTime: 10,
    likes: [],
    bookmarkedBy: [],
  },
  {
    title: 'Understanding Machine Learning Basics',
    slug: 'understanding-machine-learning-basics',
    content: `Machine Learning is transforming industries and creating new possibilities. This guide will help you understand the fundamentals of ML.

## What is Machine Learning?

Machine Learning is a subset of Artificial Intelligence that enables systems to learn and improve from experience without being explicitly programmed.

## Types of Machine Learning

### 1. Supervised Learning
Learning from labeled data. Examples: Classification, Regression

### 2. Unsupervised Learning
Learning from unlabeled data. Examples: Clustering, Dimensionality Reduction

### 3. Reinforcement Learning
Learning through interaction with an environment.

## Common Algorithms

- Linear Regression: For predicting continuous values
- Decision Trees: For classification tasks
- K-Means: For clustering data
- Neural Networks: For complex pattern recognition

## Getting Started

1. Learn Python and libraries like NumPy and Pandas
2. Understand statistics and linear algebra
3. Practice with datasets on Kaggle
4. Build projects to apply your knowledge`,
    excerpt:
      'A beginner-friendly introduction to Machine Learning concepts, algorithms, and how to get started.',
    category: 'Science',
    tags: ['Machine Learning', 'AI', 'Python', 'Data Science'],
    status: 'published' as const,
    views: 1650,
    readingTime: 9,
    likes: [],
    bookmarkedBy: [],
  },
  {
    title: 'The Ultimate Productivity Hacks for 2024',
    slug: 'the-ultimate-productivity-hacks-for-2024',
    content: `In our fast-paced world, productivity is key to success. Here are proven strategies to help you work smarter, not harder.

## Time Blocking

Divide your day into focused blocks of time for specific tasks. This technique helps maintain focus and prevent distractions.

## The Pomodoro Technique

Work in 25-minute focused sessions followed by 5-minute breaks. After four sessions, take a longer break.

## Eliminate Decision Fatigue

Make important decisions early in the day when your mind is fresh. Automate routine decisions.

## Master Your Tools

Invest time in learning keyboard shortcuts and advanced features of your tools. This small investment pays dividends.

## Delegate and Say No

Not everything needs your personal attention. Learn to delegate and say no to tasks that don't align with your goals.

## Regular Review

Schedule weekly reviews to assess your productivity and adjust your strategies.

## Conclusion

Productivity is a skill that can be developed. Experiment with different techniques and find what works best for you.`,
    excerpt: 'Master productivity with proven techniques and strategies designed for the modern professional.',
    category: 'Lifestyle',
    tags: ['Productivity', 'Time Management', 'Lifestyle', 'Self Improvement'],
    status: 'published' as const,
    views: 3200,
    readingTime: 7,
    likes: [],
    bookmarkedBy: [],
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await BlogPost.deleteMany({});
    console.log('Cleared existing data');

    // Create sample users
    const createdUsers = await User.insertMany(sampleUsers);
    console.log(`Created ${createdUsers.length} sample users`);

    // Create sample posts with authors
    const postsWithAuthors = samplePosts.map((post, index) => ({
      ...post,
      author: createdUsers[index % createdUsers.length]._id,
    }));

    const createdPosts = await BlogPost.insertMany(postsWithAuthors);
    console.log(`Created ${createdPosts.length} sample blog posts`);

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
