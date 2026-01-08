// src/app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { sendProductEmail } from '@/lib/email';
import { products } from '@/data/products';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature')!;

    let event: Stripe.Event;

    try {
      // Verify webhook signature
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      );
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      // Get customer email
      const customerEmail = session.customer_details?.email;
      const customerName = session.customer_details?.name || 'there';

      if (!customerEmail) {
        console.error('No customer email found in session');
        return NextResponse.json({ error: 'No customer email' }, { status: 400 });
      }

      // Retrieve line items from the session
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ['data.price.product'],
      });

      // Send email for each purchased product
      for (const item of lineItems.data) {
        const priceId = item.price?.id;

        // Find the product in our database by priceId
        const product = products.find((p) => p.priceId === priceId);

        if (product && product.downloadUrl) {
          try {
            await sendProductEmail({
              customerEmail,
              customerName,
              productTitle: product.title,
              downloadUrl: product.downloadUrl,
            });

            console.log(`Email sent to ${customerEmail} for product: ${product.title}`);
          } catch (emailError) {
            console.error('Failed to send email:', emailError);
            // Continue processing other items even if one email fails
          }
        } else {
          console.warn(`Product not found or missing downloadUrl for priceId: ${priceId}`);
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
