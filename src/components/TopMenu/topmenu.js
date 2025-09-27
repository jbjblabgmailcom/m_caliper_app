'use client';


import classes from './topmenu.module.css';
import Link from 'next/link';
import { useSession } from 'next-auth/react';


export default function TopMenu() {

    const {data: session, status} = useSession();




return (
        <header className={classes.topmenu}>
            <div className={classes.topmenuContent}>
                <div className={classes.logo}>
                    <span className={classes.logotextSmart}>Smart</span>
                    <span className={classes.logotextCaliper}>CaliperApp</span>
                </div>
                <nav className={classes.navLinks}>
                    <Link className={classes.link} href="/home">Home</Link>
                    <Link className={classes.link} href="/demo">Demo</Link>
                    <Link className={classes.link} href="/pricing">Pricing</Link>
                    <Link className={classes.link} href="/instructions">How It Works</Link>
                    <Link className={classes.link} href="/contact">Contact</Link>
                </nav>
                {status === 'authenticated' ? (
                    <Link className={`${classes.link} ${classes.ctaButton}`} href="/">Measure now</Link>
                ) : (
                    <Link className={`${classes.link} ${classes.ctaButton}`} href="/auth">Login</Link>
                )}
            </div>
        </header>
    );
}