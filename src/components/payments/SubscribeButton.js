'use client';

export default function SubscribeButton() {
  const handleClick = async () => {
    const res = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
    });
    const data = await res.json();
    window.location.href = data.url;
  };

  return <button onClick={handleClick}>Subscribe Now</button>;
}