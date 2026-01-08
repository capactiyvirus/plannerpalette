// app/api/create-checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-02-24.acacia',
  });
}

export async function POST(req: NextRequest) {
  try {
    const stripe = getStripe();
    const { items, promoCode } = await req.json();

    // Create line items for Stripe
    const lineItems = items.map((item: { priceId: string; quantity: number }) => ({
      price: item.priceId,
      quantity: item.quantity,
    }));

    // Create checkout session options
    const sessionOptions: Stripe.Checkout.SessionCreateParams = {
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/cart`,
    };

    // Add promo code if provided and valid
    if (promoCode && promoCode.toLowerCase() === 'writer10') {
      // Option 1: If you created the coupon in Stripe Dashboard
      sessionOptions.discounts = [{
        coupon: 'WRITER10' // Must match Stripe Dashboard coupon ID
      }];
      
      // Option 2: Or allow customer to enter any promo code
      // sessionOptions.allow_promotion_codes = true;
    }

    const session = await stripe.checkout.sessions.create(sessionOptions);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}