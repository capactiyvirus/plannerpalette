export const dynamic = 'force-dynamic';

import Stripe from 'stripe';

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export async function GET(req: Request) {
  const stripe = getStripe();
  const { searchParams } = new URL(req.url);
  const priceId = searchParams.get('id');

  const price = await stripe.prices.retrieve(priceId!);
  
  return Response.json({ 
    price: price.unit_amount! / 100 
  });
}