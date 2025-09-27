'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import './LoginControler.css';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { fetchUserData } from '@/db/db_server_side';

export default function LoginControler() {
  
  
  const { data: session } = useSession();
  const [usrData, setusrData] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleAvatarClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  useEffect(()=>{
    const userData = async () => {
      const result = await fetchUserData(session.user.email);
      setusrData(result);
    
    }

    userData();
  },[session])

  if (session) {
    return (
      <div className="logincontainer">
        <div className="avatarwrapper">
          <img
            src={session.user.image}
            alt="User avatar"
            className="useravatar"
            onClick={handleAvatarClick}

          />
         
          <div className="avatarmenu">
          
            <div className="menuitem">User: {session.user.email}</div>
            <div className="menuitem">Your plan: {usrData?.subscription_plan === process.env.NEXT_PUBLIC_PRICE_YEAR
    ? 'PREMIUM YEARLY'
    : usrData?.subscription_plan === process.env.NEXT_PUBLIC_PRICE_MONTH
    ? 'PREMIUM MONTHLY'
    : 'FREE'}</div>
            
            <div className="menuitem">
            <span className="logout" onClick={() => signOut()}>Logout</span>
            </div>
            <div className="separator"></div>
            <div className="menuitem"><Link className="link" href="/panel">Manage account.</Link></div>
            <div className="menuitem"><Link className="link" href="/home">Home</Link></div>
            <div className="menuitem"><Link className="link" href="/pricing">Pricing</Link></div>
            <div className="menuitem"><Link className="link" href="/instructions">Instructions</Link></div>
            <div className="menuitem"><Link className="link" href="/contact">Contact</Link></div>
            
            
         
          </div>
       
        </div>
        
      </div>
    );
  }


}