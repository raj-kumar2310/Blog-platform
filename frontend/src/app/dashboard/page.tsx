'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { BarChart3, Users, BookOpen, MessageCircle, Plus } from 'lucide-react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { useAuthStore } from '@/hooks/useAuth';
import Link from 'next/link';

export default function Dashboard() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const dashboardCards = [
    {
      icon: BookOpen,
      label: 'My Articles',
      value: '0',
      color: 'from-blue-500 to-blue-600',
      href: '/dashboard/posts',
    },
    {
      icon: MessageCircle,
      label: 'Comments',
      value: '0',
      color: 'from-purple-500 to-purple-600',
      href: '/dashboard/comments',
    },
    {
      icon: BarChart3,
      label: 'Total Views',
      value: '0',
      color: 'from-green-500 to-green-600',
      href: '/dashboard',
    },
  ];

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Welcome back, <span className="gradient-text">{user.fullName}</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Here's your dashboard overview. Keep writing amazing content! ✨
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <Link href="/dashboard/create">
            <Button size="lg" icon={<Plus className="w-5 h-5" />}>
              Write New Article
            </Button>
          </Link>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
        >
          {dashboardCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Link href={card.href}>
                <Card className="h-full p-8 cursor-pointer hover:shadow-lg transition-all">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center mb-4`}>
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                    {card.label}
                  </p>
                  <p className="text-3xl font-bold">{card.value}</p>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Profile Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                  Full Name
                </p>
                <p className="text-lg font-semibold">{user.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                  Username
                </p>
                <p className="text-lg font-semibold">@{user.username}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                  Email
                </p>
                <p className="text-lg font-semibold">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                  Role
                </p>
                <p className="text-lg font-semibold capitalize">{user.role}</p>
              </div>
            </div>
            <Link href="/dashboard/profile">
              <Button className="mt-6" variant="secondary">
                Edit Profile
              </Button>
            </Link>
          </Card>
        </motion.div>

        {/* Admin Section */}
        {user.role === 'admin' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 p-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg border border-amber-500/20 dark:border-amber-700/30"
          >
            <h3 className="text-xl font-bold mb-4">Admin Dashboard</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/admin">
                <Button variant="secondary" className="w-full">
                  Go to Admin Panel
                </Button>
              </Link>
              <Link href="/admin/users">
                <Button variant="secondary" className="w-full">
                  Manage Users
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
