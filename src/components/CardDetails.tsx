import { getItemEncounters, EncounterInfo } from '@/utils/encounterMapping';
import { Sparkles } from 'lucide-react';
import { CompareButton } from './CompareButton';

interface CardDetailsProps {
  card: {
    id: string;
    type: 'item' | 'skill' | 'encounter';
    name: string;
    imageUrl?: string;
    description?: string;
    rarity?: string;
  };
  itemId?: string;
}

export default function CardDetails({ card, itemId }: CardDetailsProps) {
  const itemEncounters = itemId ? getItemEncounters()[itemId] || [] : [];

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <div className="flex flex-col items-center">
        {card.imageUrl && (
          <img
            src={card.imageUrl}
            alt={card.name}
            className="w-32 h-32 object-contain"
          />
        )}
        <h2 className="text-xl font-bold mt-2">{card.name}</h2>
        {card.rarity && (
          <div className="flex items-center gap-1 mt-1">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span className="text-sm">{card.rarity}</span>
          </div>
        )}
        {card.description && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            {card.description}
          </p>
        )}
      </div>

      <CompareButton
        item={{
          id: card.id,
          type: card.type,
          name: card.name,
          imageUrl: card.imageUrl,
        }}
      />
    </div>
  );
} 