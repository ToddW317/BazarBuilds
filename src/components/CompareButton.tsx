'use client';

import { motion } from 'framer-motion';
import { Square2StackIcon } from '@heroicons/react/24/outline';
import { useCompareStore } from '@/store/compareStore';

interface CompareButtonProps {
  item: {
    id: string;
    type: 'item' | 'skill' | 'encounter';
    name: string;
    imageUrl?: string;
    attributes?: Record<string, any>;
    tooltips?: string[];
  };
}

export const CompareButton = ({ item }: CompareButtonProps) => {
  const { addItem, comparedItems } = useCompareStore();
  const isAlreadyCompared = comparedItems.some((i: { id: string }) => i.id === item.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(item);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`absolute bottom-2 right-2 p-2 rounded-full z-10
        ${isAlreadyCompared ? 'bg-blue-500' : 'bg-gray-200 hover:bg-gray-300'}
        transition-colors duration-200`}
      disabled={isAlreadyCompared}
    >
      <Square2StackIcon className="w-5 h-5" />
    </motion.button>
  );
}; 