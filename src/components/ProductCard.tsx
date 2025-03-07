
import Link from 'next/link';
import { Product } from '@/data/products';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import colors from '@/components/colors';
export default function ProductCard({ product }: { product: Product }) {
  const formattedPrice = new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'CAD'
  }).format(product.price);
  const { theme } = useTheme();
  const bgColor = theme === 'dark' ? colors.darkMode.darkTeal : 'white';
  const titleColor = theme === 'dark' ? colors.darkMode.text : colors.primary;
  const textColor = theme === 'dark' ? colors.darkMode.text + '99' : colors.dark; // Slightly transparent for paragraph text
    // For the icon background, keep the same color but adjust opacity and use theme-appropriate icon color
  return (
    <div className="group relative bg-white p-6 shadow-sm rounded-lg hover:shadow-md transition-shadow"
      style={{ backgroundColor: bgColor }}
      >
      <div className="relative h-64 w-full" >
        <Image 
          src={product.imageUrl}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover rounded-t-lg"
          priority={false}
        />
      </div>
      <div className="p-6 flex-grow">
      <div className="h-13 mb-2">
      <h3 className="text-2xl transition-colors duration-300" style={{ 
        color: titleColor,
        fontFamily: '"Playfair Display", serif', 
        }}>
        <Link href={`/products/${product.id}`}>
          <span className="absolute inset-0" />
          {product.title}
        </Link>
      </h3>
      </div>
      <div className="h-12 mb-2">
      <p className="text-sm transition-colors duration-300 line-clamp-4" style={{ color: textColor }}>{product.description}</p>
      </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-gray-900 font-bold" style={{ color: titleColor }}>{formattedPrice}</span>
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
          {product.fileType}
        </span>
      </div>
    </div>
  );
}