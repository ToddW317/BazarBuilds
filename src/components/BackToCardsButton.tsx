import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function BackToCardsButton() {
  return (
    <Link 
      href="/cards" 
      className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
    >
      <ChevronLeft className="w-4 h-4" />
      Back to Cards
    </Link>
  );
} 