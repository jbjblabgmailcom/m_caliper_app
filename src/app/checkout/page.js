'use client';
import FreeCard from "@/components/PriceCards/freeCard";
import MonthlySubCard from "@/components/PriceCards/monthlySub";
import YearlySubCard from "@/components/PriceCards/yearlySub";
import SingleMonthCard from "@/components/PriceCards/singleMonth";
import classes from './page.module.css';


import { useState } from 'react';

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);

const handleCheckout = async (priceId) => {
  setLoading(true);
  try {
    const res = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId }),
    });

    const text = await res.text(); // first read raw text
    console.log('Raw response:', text);

    const data = JSON.parse(text); // then try to parse
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert('Checkout session failed');
    }
  } catch (err) {
    console.error('Checkout error:', err);
    alert('Something went wrong');
  }

  setLoading(false);
};

  return (
    <>
    <div className={classes.container}>
<div><h2 className={classes.pricingTitle}>Choose Your Plan</h2></div>

<div className={classes.pricingWrapper}>
      <FreeCard />
      <MonthlySubCard />
      <YearlySubCard />
      <SingleMonthCard />

</div></div>

    </>
  );
}