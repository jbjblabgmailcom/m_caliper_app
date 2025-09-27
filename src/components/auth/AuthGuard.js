'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import LoadingScreen from './LoadingScreen.jsx';
import { useRouter } from 'next/navigation';

export default function AuthGuard({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {

    if (status === 'unauthenticated') {
      router.push('/home');
    }

  }, [status, router]);

  if (status === 'loading') {
    return <LoadingScreen />; 
  }

  if (status === 'authenticated') {
    return children;
 
  }

  // while redirecting
  return null;
}