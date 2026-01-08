// src/app/api/etsy/reviews/route.ts
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const listingId = searchParams.get('listingId');

  if (!listingId) {
    return NextResponse.json({ error: 'Missing listingId' }, { status: 400 });
  }

  const ETSY_API_KEY = process.env.ETSY_API_KEY;

  if (!ETSY_API_KEY) {
    return NextResponse.json({ error: 'Missing Etsy API configuration' }, { status: 500 });
  }

  try {
    const response = await fetch(
      `https://openapi.etsy.com/v3/application/listings/${listingId}/reviews?limit=10`,
      {
        headers: {
          'x-api-key': ETSY_API_KEY,
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error(`Etsy API responded with status: ${response.status}`);
    }

    const data = await response.json();

    // Transform the reviews to a cleaner format
    const reviews = data.results?.map((review: { transaction_id: string; rating: number; review: string; created_timestamp: number; buyer_user_id?: string }) => ({
      id: review.transaction_id,
      rating: review.rating,
      review: review.review,
      createdAt: review.created_timestamp,
      buyerName: review.buyer_user_id ? 'Verified Buyer' : 'Anonymous', // Etsy doesn't return buyer names
    })) || [];

    return NextResponse.json({
      count: data.count || 0,
      reviews
    });
  } catch (error) {
    console.error('Error fetching Etsy reviews:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}
