export const runtime = 'nodejs'; // ✅ Required to access Node.js features like Buffer

import { stripe } from '@/lib/stripe';
import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Webhook is working!' });
}

async function getRawBody(readable) {
  const reader = readable.getReader();
  const chunks = [];
  let done, value;
  while (!done) {
    ({ done, value } = await reader.read());
    if (value) chunks.push(value);
  }
  return Buffer.concat(chunks);
}

export async function POST(req) {
  const sig = req.headers.get('stripe-signature');
  let rawBody;

  try {
    rawBody = await getRawBody(req.body);
  } catch (err) {
    console.error('Error reading raw body:', err);
    return NextResponse.json({ error: 'Raw body read error' }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature error:', err.message);
    return NextResponse.json({ error: 'Webhook signature mismatch' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const customerId = session.customer;
    const subscriptionId = session.subscription;

    try {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);

      const plan = subscription.items.data[0]?.price.id || null;
      const status = subscription.status;
      const start = new Date(subscription.start_date * 1000);
      const currentPeriodEnd = new Date(subscription.current_period_end * 1000);
      const cancelAt = subscription.cancel_at ? new Date(subscription.cancel_at * 1000) : null;
      const canceledAt = subscription.canceled_at ? new Date(subscription.canceled_at * 1000) : null;

      const userRes = await db.query(
        'SELECT * FROM users WHERE stripe_customer_id = $1',
        [customerId]
      );

      if (userRes.rowCount === 0) {
        console.warn(`No user found with stripe_customer_id: ${customerId}`);
      } else {
        await db.query(
          `UPDATE users SET
            stripe_subscription_id = $1,
            subscription_plan = $2,
            subscription_status = $3,
            subscription_start = $4,
            subscription_current_period_end = $5,
            subscription_cancel_at = $6,
            subscription_canceled_at = $7
          WHERE stripe_customer_id = $8`,
          [
            subscriptionId,
            plan,
            status,
            start,
            currentPeriodEnd,
            cancelAt,
            canceledAt,
            customerId,
          ]
        );

        console.log(`✅ Updated subscription info for customer ${customerId}`);
        
        console.log(subscriptionId,
            plan,
            status,
            start,
            currentPeriodEnd,
            cancelAt,
            canceledAt,
            customerId,);
            
      }
    } catch (err) {
      console.error('Database or Stripe error:', err);
      return NextResponse.json({ error: 'Failed to update user subscription' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}