'use client';

import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import { useAuthStore } from '@/hooks/useAuth';

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: '#10b981',
              color: '#fff',
            },
          },
          error: {
            style: {
              background: '#ef4444',
              color: '#fff',
            },
          },
        }}
      />
    </>
  );
}
