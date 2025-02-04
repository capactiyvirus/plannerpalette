// src/app/(public)/products/[id]/page.tsx
import { notFound, redirect } from 'next/navigation';
import { products } from '@/data/products'


// interface Product {
//   id: string;
//   title: string;
//   price: number;
//   etsyUrl: string;
// }



export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id
  }));
}

export const dynamicParams = false;
export type paramsType = Promise<{ id: string }>;
export default async function ProductPage(props: { params: paramsType }) {
  // Properly await the resolution of params
  //const { id } = await Promise.resolve(params);
  const { id } = await props.params;
  const product = products.find(p => p.id === id);

  if (!product) notFound();

  // Immediate server-side redirect
  redirect(product.etsyUrl);
}