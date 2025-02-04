import Link from 'next/link';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            Writer&apos;s Toolkit
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="p-2 text-gray-700 hover:text-gray-900">
              <ShoppingCartIcon className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}