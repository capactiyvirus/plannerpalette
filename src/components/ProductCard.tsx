
import Link from 'next/link';
import { Product } from '@/data/products';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative bg-white p-6 shadow-sm rounded-lg hover:shadow-md transition-shadow">
      <div className="aspect-square bg-gray-100 rounded-lg mb-4" />
      <h3 className="text-lg font-semibold text-gray-900">
        <Link href={`/products/${product.id}`}>
          <span className="absolute inset-0" />
          {product.title}
        </Link>
      </h3>
      <p className="mt-2 text-gray-600 line-clamp-3">{product.description}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-gray-900 font-medium">${product.price}</span>
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
          {product.fileType}
        </span>
      </div>
    </div>
  );
}

// import Link from 'next/link';
// import { Product } from '@/data/products';

// export default function ProductCard({ product }: { product: Product }) {
//   return (
//     <div className="group relative bg-white p-6 shadow-sm rounded-lg hover:shadow-md transition-shadow">
//       <div className="aspect-square bg-gray-100 rounded-lg mb-4" />
//       <h3 className="text-lg font-semibold text-gray-900">
//         <Link href={`/products/${product.id}`}>
//           <span className="absolute inset-0" />
//           {product.title}
//         </Link>
//       </h3>
//       <p className="mt-2 text-gray-600 line-clamp-3">{product.description}</p>
//       <div className="mt-4 flex justify-between items-center">
//         <span className="text-gray-900 font-medium">${product.price}</span>
//         <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
//           {product.fileType}
//         </span>
//       </div>
//     </div>
//   );
// }