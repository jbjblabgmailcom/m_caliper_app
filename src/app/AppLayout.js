'use client';

import { usePathname } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import AuthGuard from '@/components/auth/AuthGuard';
import AuthProvider from '@/components/auth/AuthProvider';
import LayoutProvider from '@/context/LayoutContext';
import LoginControler from '@/components/auth/LoginControler';
import Image from 'next/image';
import logoImg from '../../public/logo4.png';
import ProgramButton from "@/components/NewProgramButton/ProgramButton.js";
import Link from 'next/link';
import classes from "./page.module.css";

const publicRoutes = ['/auth', '/home', '/demo', '/pricing', '/instructions', '/contact',];

export default function AppLayout({ children }) {
  const pathname = usePathname();
  const isPublic = publicRoutes.includes(pathname);

  const content = (
    <div className={classes.wrappercontainer}>
      <LayoutProvider>
        <div className={classes.topside}>
          <div className={classes.loginControler}>
            <LoginControler /> 
          </div>
          <div>
            <Image src={logoImg} width="250" alt="logo image" className={classes.logo} />
          </div>
          <div className={classes.buttonContainer}>
            <Link href="/"><ProgramButton>Programs list</ProgramButton></Link>
            <Link href="/program"><ProgramButton>New program</ProgramButton></Link>
            <Link href="/reports"><ProgramButton>Reports</ProgramButton></Link>
          </div>
        </div>
        <div className={classes.content}>{children}</div>
      </LayoutProvider>
    </div>
  );

  return (
    <SessionProvider>
      <AuthProvider>
        {isPublic ? children : <AuthGuard>{content}</AuthGuard>}
      </AuthProvider>
    </SessionProvider>
  );
}
