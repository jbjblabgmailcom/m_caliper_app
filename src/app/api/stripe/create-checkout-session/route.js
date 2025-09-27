import { authlib } from '@/lib/authlib'; // adjust this if you store it elsewhere
import { stripe } from '@/lib/stripe';
import db from '@/lib/db';
import { NextResponse } from 'next/server';



 export async function GET() {
  const session = await authlib(); 
  const email = session.user.email;
  const name = session.user.name || 'No Name';


  return NextResponse.json({ message: 'API is working!', email, name });

}



export async function POST(request) {
  const session = await authlib(); 



  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const email = session.user.email;
  const name = session.user.name || 'No Name';

  const { priceId } = await request.json();

  if (!priceId) {
    return NextResponse.json({ error: 'Price ID is required' }, { status: 400 });
  }

  // Check if user exists
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  let user = result.rows[0];

  // Create user if doesn't exist
  if (!user) {
    const insertResult = await db.query(
      'INSERT INTO users (email) VALUES ($1) RETURNING *',
      [email]
    );
    user = insertResult.rows[0];
  }

  let customerId = user.stripe_customer_id;

  // Create Stripe customer if not yet created
  if (!customerId) {
    const customer = await stripe.customers.create({ email, name });
    customerId = customer.id;

    await db.query('UPDATE users SET stripe_customer_id = $1 WHERE email = $2', [
      customerId,
      email,
    ]);
  }

  const origin = request.headers.get('origin');

  const checkoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/checkout/success`,
    cancel_url: `${origin}/checkout/cancel`,
  });

  return NextResponse.json({ url: checkoutSession.url });
}
