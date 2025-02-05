// src/lib/etsy.ts

interface EtsyListing {
    listing_id: number;
    title: string;
    description: string;
    price: {
      amount: number;
      divisor: number;
      currency_code: string;
    };
    url: string;
  }
  
  export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    fileType: 'PDF' | 'EPUB';
    etsyUrl: string;
  }
  
  export async function fetchEtsyListings(): Promise<Product[]> {
    // These will be set in Cloudflare Pages environment variables
    const ETSY_API_KEY = process.env.ETSY_API_KEY;
    const SHOP_ID = process.env.ETSY_SHOP_ID;
  
    if (!ETSY_API_KEY || !SHOP_ID) {
      throw new Error('Missing Etsy API configuration');
    }
  
    try {
      const response = await fetch(
        `https://openapi.etsy.com/v3/application/shops/${SHOP_ID}/listings/active`,
        {
          headers: {
            'x-api-key': ETSY_API_KEY
          }
        }
      );
  
      if (!response.ok) {
        throw new Error(`Etsy API responded with status: ${response.status}`);
      }
  
      const data = await response.json();
      
      return data.results.map((listing: EtsyListing) => ({
        id: listing.listing_id.toString(),
        title: listing.title,
        description: listing.description,
        price: listing.price.amount / listing.price.divisor,
        fileType: determineFileType(listing.title),
        etsyUrl: listing.url
      }));
    } catch (error) {
      console.error('Error fetching Etsy listings:', error);
      throw error;
    }
  }
  
  function determineFileType(title: string): 'PDF' | 'EPUB' {
    return title.toLowerCase().includes('pdf') ? 'PDF' : 'EPUB';
  }