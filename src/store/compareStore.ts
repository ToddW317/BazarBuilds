import { create } from 'zustand';

type ComparedItem = {
  id: string;
  type: 'item' | 'skill' | 'encounter';
  name: string;
  imageUrl?: string;
  attributes?: Record<string, any>;
  tooltips?: string[];
  size?: string;
  heroes?: string[];
  tags?: string[];
  enchantments?: Record<string, any>;
  tiers?: Record<string, any>;
  startingTier?: string;
};

interface CompareState {
  comparedItems: ComparedItem[];
  addItem: (item: ComparedItem) => void;
  removeItem: (id: string) => void;
  clearItems: () => void;
}

export const useCompareStore = create<CompareState>((set: any) => ({
  comparedItems: [],
  addItem: (item: ComparedItem) =>
    set((state: CompareState) => {
      if (state.comparedItems.find((i: ComparedItem) => i.id === item.id)) return state;
      return { comparedItems: [...state.comparedItems, item] };
    }),
  removeItem: (id: string) =>
    set((state: CompareState) => ({
      comparedItems: state.comparedItems.filter((item: ComparedItem) => item.id !== id),
    })),
  clearItems: () => set({ comparedItems: [] }),
})); 