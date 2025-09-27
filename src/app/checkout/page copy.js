'use client';
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
    <div style={{ padding: '2rem' }}>
      <h2>Choose your plan:</h2>

      <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
        <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
          <h3>Monthly Plan</h3>
          <p>EUR 10/month</p>
          <button
            onClick={() => handleCheckout(process.env.NEXT_PUBLIC_PRICE_MONTH)}
            disabled={loading}
          >
            Subscribe Monthly
          </button>
        </div>

        <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
          <h3>Yearly Plan</h3>
          <p>EUR 100/year</p>
          <button
            onClick={() => handleCheckout(process.env.NEXT_PUBLIC_PRICE_YEAR)}
            disabled={loading}
          >
            Subscribe Yearly
          </button>
        </div>
      </div>
    </div>
  );
}