'use client';

import { useEffect, useState } from 'react';
import { getProviders, signIn, signOut } from 'next-auth/react';
import classes from './page.module.css';
import Image from 'next/image';
import logoImg from '../../../public/logo4.png';
import TopMenu from '@/components/TopMenu/topmenu.js';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [providers, setProviders] = useState(null);
    const {data: status} = useSession();
    const router  = useRouter();

  useEffect(() => {
    getProviders().then(setProviders);
  }, []);

  if (!providers) return <p>Loading...</p>;

  return (
    <>
    <TopMenu />
    <div className={classes.container}>
      <div className={classes.card}>
        <Image src={logoImg} width="150" height="150" alt="logo image" className={classes.logo} />
        <h1 className={classes.title}>Sign in to your account</h1>
        <h2 className={classes.title2}>Or create new account by signing in.</h2>
        {status && 
        (
          <>
          <p>You are signed in.</p>  
             <button
            
            onClick={() => signOut()}
            className={classes.button}
          >
            Sign out
          </button>
          or
          <button
            
            onClick={() => router.push('/')}
            className={classes.button}
          >
            Go to app
          </button>
          </>)
          }

        {!status && Object.values(providers).map((provider) => (
          
          <button
            key={provider.name}
            onClick={() => signIn(provider.id, {callbackUrl: '/'})}
            className={classes.button}
          >
            Sign in with {provider.name}
          </button>
        ))}
      </div>
    </div>
    </>
  );
}