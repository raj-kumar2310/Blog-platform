'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Zap, Globe, Users, BookOpen, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { useAuthStore } from '@/hooks/useAuth';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const features = [
    {
      icon: Code,
      title: 'Modern Tech Stack',
      description: 'Built with Next.js, TypeScript, and Tailwind CSS for optimal performance',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized for speed with server-side rendering and caching',
    },
    {
      icon: Globe,
      title: 'Fully Responsive',
      description: 'Perfect experience on all devices - mobile, tablet, and desktop',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Comment, discuss, and share your thoughts with the community',
    },
    {
      icon: BookOpen,
      title: 'Rich Content',
      description: 'Markdown support with beautiful formatting and syntax highlighting',
    },
    {
      icon: Sparkles,
      title: 'Dark Mode',
      description: 'Beautiful dark theme for comfortable reading any time of day',
    },
  ];

  const stats = [
    { label: 'Articles', value: '500+', icon: BookOpen },
    { label: 'Authors', value: '1000+', icon: Users },
    { label: 'Comments', value: '10K+', icon: Sparkles },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <motion.section
        className="relative px-4 sm:px-6 lg:px-8 py-20 md:py-32 overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"
            animate={{ x: [0, 50, 0], y: [0, 50, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10"
            animate={{ x: [0, -50, 0], y: [0, -50, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <div className="max-w-7xl mx-auto text-center">
          {/* Main Heading */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 gradient-text"
            variants={itemVariants}
          >
            Welcome to BlogHub
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            A premium, modern blogging platform where ideas meet technology. Share your stories,
            connect with readers, and build your audience.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            variants={itemVariants}
          >
            <Link href="/blog">
              <Button size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                Explore Blog
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="secondary" size="lg">
                Start Writing
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-4 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="glass dark:glass-light p-6 rounded-lg"
                whileHover={{ y: -5 }}
              >
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Powerful Features for Modern Bloggers
        </h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full p-8">
                <feature.icon className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Card className="p-12 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-500/20 dark:border-purple-500/20 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">Ready to Share Your Story?</h3>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
            Join our community of writers and readers today
          </p>
          <Link href="/register">
            <Button size="lg">Get Started Free</Button>
          </Link>
        </Card>
      </motion.section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-600 dark:text-slate-400">
          <p>© 2024 BlogHub. All rights reserved. | Built with ❤️ by passionate developers</p>
        </div>
      </footer>
    </div>
  );
}
