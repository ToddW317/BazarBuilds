import itemToImageMapping from '../data/itemToImageMapping';

type Hero = string;

const characterCodeMapping: Record<string, string> = {
  "Common": "COM",
  "Dooley": "DOO",
  "Stelle": "STE", 
  "Pygmalien": "PYG",
  "Mak": "MAK",
  "Jules": "JUL",
  "Vanessa": "VAN",
  "Adventurer": "ADV",
  "Neutral": "NEU",
  "Blacksmith": "BLK",
  "Nature": "NTR",
  "Steel": "STL",
  "Yellow": "YLW"
};

interface Item {
  InternalName: string;
  Size?: string;
  Heroes?: string[];
}

function getCharacterCode(heroes: Hero[]): string {
  if (!heroes || heroes.length === 0) return 'COM';
  const hero = heroes[0];
  return characterCodeMapping[hero] || 'UNK';
}

function getSizeCode(size: string): string {
  if (!size) return 'M';
  return size[0].toUpperCase();
}

function formatItemName(name: string): string {
  if (!name) return '';
  
  return name
    .replace(/[\[\]()]/g, '') // Remove brackets and parentheses
    .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove special chars except spaces and hyphens
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .replace(/-/g, '_') // Replace hyphens with underscores
    .replace(/_+/g, '_') // Replace multiple underscores with single
    .trim(); // Remove leading/trailing spaces
}

export function getItemImagePath(item: Item): string {
  try {
    // First try to get the image path from the mapping
    const mappedPath = itemToImageMapping[item.InternalName];
    if (mappedPath) {
      return mappedPath;
    }

    // If no mapping exists, generate the path
    const sizeCode = getSizeCode(item.Size || '');
    const characterCode = getCharacterCode(item.Heroes || []);
    const formattedName = formatItemName(item.InternalName);
    
    // Log problematic items in development
    if (process.env.NODE_ENV === 'development') {
      if (!item.Size || !item.Heroes || !item.InternalName) {
        console.warn('Missing required item properties:', {
          itemName: item.InternalName,
          size: item.Size,
          heroes: item.Heroes
        });
      }
      
      // Log when falling back to generated path
      console.debug(`No mapping found for ${item.InternalName}, using generated path`);
    }
    
    const generatedPath = `/items/CF_${sizeCode}_${characterCode}_${formattedName}_D.jpeg`;

    // Log the attempted paths in development
    if (process.env.NODE_ENV === 'development') {
      console.debug('Image path resolution:', {
        itemName: item.InternalName,
        mappedPath,
        generatedPath,
        usingGenerated: !mappedPath
      });
    }

    return generatedPath;
  } catch (error) {
    console.error('Error generating image path for item:', item.InternalName, error);
    return '/items/default-item.gif';
  }
}

// Helper function to check if an image exists
export async function checkImageExists(imagePath: string): Promise<boolean> {
  try {
    const response = await fetch(imagePath, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}