// src/app/api/checkout/session/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { products } from '@/data/products';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing session_id' },
        { status: 400 }
      );
    }

    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items.data.price.product'],
    });

    // Verify payment was successful
    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      );
    }

    // Get customer email
    const customerEmail = session.customer_details?.email || '';

    // Get purchased products
    const lineItems = session.line_items?.data || [];
    const purchasedProducts = lineItems
      .map((item) => {
        const priceId = item.price?.id;
        const product = products.find((p) => p.priceId === priceId);

        if (product && product.downloadUrl) {
          return {
            title: product.title,
            downloadUrl: product.downloadUrl,
          };
        }
        return null;
      })
      .filter(Boolean);

    return NextResponse.json({
      customerEmail,
      products: purchasedProducts,
    });
  } catch (error) {
    console.error('Error retrieving session:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to retrieve session' },
      { status: 500 }
    );
  }
}
