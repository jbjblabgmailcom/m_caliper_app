'use client';

import { useState, useEffect } from 'react';
import { fetchUserData } from '@/db/db_server_side';
import { useSession, signIn, signOut } from 'next-auth/react';
import classes from './page.module.css';
import Link from 'next/link';


export default function Panel() {

  const { data: session } = useSession();
  const [usrData, setusrData] = useState({});


    useEffect(()=>{
    const userData = async () => {
      const result = await fetchUserData(session.user.email);
      setusrData(result);
    }

    userData();
  },[session])

  console.log(usrData);


    return (
        <>
        <div>
            <h2>Users account information.</h2>
            <h3>Current session info:</h3>
            <img src={session.user.image} />
            <p>Users name: {session.user.name}</p>
            <p>Users email: {session.user.email}</p>
            

            <h3>Premium user info:</h3>
            <table className={classes.subscriptionTable}>
  <thead className={classes.tableHead}>
    <tr>
      <th>Email</th>
      <th>Payment gate customer ID</th>
      <th>Subscription ID</th>
      <th>Plan</th>
      <th>Status</th>
      <th>Start</th>
      <th>Period End</th>
      <th>Cancel At</th>
      <th>Canceled At</th>
      <th>Created At</th>
    </tr>
  </thead>
  <tbody className={classes.tableBody}>
    <tr>
      <td>{usrData?.email || ''}</td>
      <td>{usrData?.stripe_customer_id || ''}</td>
      <td>{usrData?.stripe_subscription_id || ''}</td>
      <td>
  {usrData?.subscription_plan === process.env.NEXT_PUBLIC_PRICE_YEAR
    ? 'PREMIUM YEAR'
    : usrData?.subscription_plan === process.env.NEXT_PUBLIC_PRICE_MONTH
    ? 'PREMIUM MONTH'
    : <Link className={classes.linkprimary}href="/checkout">Upgrade</Link>}
</td>
      <td>{usrData?.subscription_status || ''}</td>
      <td>{usrData?.subscription_start ? new Date(usrData.subscription_start).toLocaleString() : ''}</td>
      <td>{usrData?.subscription_current_period_end ? new Date(usrData.subscription_current_period_end).toLocaleString() : ''}</td>
      <td>{usrData?.subscription_cancel_at ? new Date(usrData.subscription_cancel_at).toLocaleString() : ''}</td>
      <td>{usrData?.subscription_canceled_at ? new Date(usrData.subscription_canceled_at).toLocaleString() : ''}</td>
      <td>{usrData?.created_at ? new Date(usrData.created_at).toLocaleString(): ''}</td>
    </tr>
  </tbody>
</table>
        </div>

        </>
    );
}