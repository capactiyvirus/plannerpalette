// src/app/(public)/products/[id]/page.tsx
import { notFound, redirect } from 'next/navigation';
import { products } from '@/data/products'

interface Product {
  id: string;
  title: string;
  price: number;
  etsyUrl: string;
}

// const products: Product[] = [
//   {
//     id: '1',
//     title: 'Novel Writing Masterclass',
//     price: 49.99,
//     etsyUrl: 'https://www.etsy.com/your-listing'
//   }
// ];

// Generate static paths at build time
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id
  }));
}

// Disable dynamic params for static-only generation
export const dynamicParams = false;

// Async page component
export default async function ProductPage({params}: {params: { id: string }}) {
  // Get product with artificial async delay
  const product = await getProduct((await params).id);
 //const product = products.find(p => p.id === params.id);

  //const product = await getProduct(params.id);

  if (!product) notFound();

  // Server action for Etsy redirect
  const handlePurchase = async () => {
    'use server';
    redirect(product.etsyUrl);
  };

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
//       <div className="mb-6">
//         <form action={handlePurchase}>
//           <button
//             type="submit"
//             className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
//           >
//             Purchase on Etsy - ${product.price}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// Simulated async product loader
async function getProduct(id: string): Promise<Product | undefined> {
  // Required minimal async operation
  await new Promise(resolve => setTimeout(resolve, 0));
  return products.find(p => p.id === id);
}}