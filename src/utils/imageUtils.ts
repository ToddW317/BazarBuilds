import { Item } from '@/types/encounters';

// Helper function to normalize strings for comparison
function normalizeString(str: string): string {
  return str.toLowerCase()
    .replace(/[^a-z0-9]/g, '') // Remove special characters and spaces
    .trim();
}

// Helper function to find the closest matching image filename
function findClosestImageMatch(itemName: string, availableImages: string[]): string | null {
  const normalizedItemName = normalizeString(itemName);
  
  // First try exact match
  const exactMatch = availableImages.find(img => 
    normalizeString(img).includes(normalizedItemName)
  );
  if (exactMatch) return exactMatch;

  // Try partial matches
  const words = normalizedItemName.split(/\s+/);
  const partialMatch = availableImages.find(img => {
    const normalizedImg = normalizeString(img);
    return words.some(word => normalizedImg.includes(word));
  });
  
  return partialMatch || null;
}

const imageCache: Record<string, string> = {};

export function getItemImageUrl(item: Item): string {
  // If we already found this image, return from cache
  if (imageCache[item.InternalName]) {
    return imageCache[item.InternalName];
  }

  try {
    // Get list of available images from public/items directory
    const availableImages = require.context('/public/items', false, /\.(jpeg|jpg|png)$/).keys();
    
    // Try to find matching image
    let imageName: string | null = null;

    // First try using ArtKey if available
    if (item.ArtKey) {
      const artKeyMatch = findClosestImageMatch(item.ArtKey, availableImages);
      if (artKeyMatch) {
        imageName = artKeyMatch;
      }
    }

    // If no match found with ArtKey, try InternalName
    if (!imageName) {
      imageName = findClosestImageMatch(item.InternalName, availableImages);
    }

    // If we found a match, cache and return the URL
    if (imageName) {
      const imageUrl = `/items/${imageName}`;
      imageCache[item.InternalName] = imageUrl;
      return imageUrl;
    }

    // Fallback to a default image
    return '/items/default-item.png';
  } catch (error) {
    console.error('Error loading item image:', error);
    return '/items/default-item.png';
  }
}