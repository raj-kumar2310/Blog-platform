'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useAuthStore } from '@/hooks/useAuth';

export default function RootLayoutClient({
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
    </>
  );
}
