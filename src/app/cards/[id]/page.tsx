'use client';

import { useEffect } from 'react';
import { cards } from '@/data/cards';
import CardDetailsContent from '@/components/CardDetailsContent';
import BackToCardsButton from '@/components/BackToCardsButton';

export default function CardDetailsPage({ params }: { params: { id: string } }) {
  const card = cards.find(c => c.id === params.id);

  // Reset scroll position when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!card) {
    return (
      <div className="min-h-screen bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <BackToCardsButton />
          <div className="text-white">Card not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <CardDetailsContent card={card} />
      </div>
    </div>
  );
} 