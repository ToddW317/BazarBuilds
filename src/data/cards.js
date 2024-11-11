import cardsData from './out.json'

// Character code mapping with all possible variants
const characterCodeMapping = {
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

// Helper function to get size code
function getSizeCode(size) {
  if (!size) return 'M';
  switch(size.toLowerCase()) {
    case 'small': return 'S';
    case 'medium': return 'M';
    case 'large': return 'L';
    default: return 'M';
  }
}

// Helper function to get character code from heroes array
function getCharacterCode(heroes) {
  if (!heroes || heroes.length === 0) return 'COM';
  
  const hero = heroes[0];
  return characterCodeMapping[hero] || 'COM';
}

// Helper function to format item name
function formatItemName(name) {
  if (!name) return '';
  
  return name
    .replace(/[\[\]()]/g, '') // Remove brackets and parentheses
    .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '_') // Replace spaces with single underscore
    .replace(/-/g, '_') // Replace hyphens with underscores
    .replace(/_+/g, '_') // Replace multiple underscores with single
    .trim(); // Remove leading/trailing spaces
}

// Helper function to generate image path
function generateImagePath(item) {
  try {
    const sizeCode = getSizeCode(item.Size);
    const charCode = getCharacterCode(item.Heroes);
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
    }
    
    return `CF_${sizeCode}_${charCode}_${formattedName}_D.jpeg`;
  } catch (error) {
    console.error('Error generating image path for item:', item.InternalName, error);
    return 'default-item.jpeg';
  }
}

// Export the cards array
export const cards = Object.entries(cardsData.items)
  .map(([id, item]) => {
    try {
      // Get the proper image key and internal name
      const imageKey = item.ArtKey || item.InternalName;
      const internalName = item.ArtKey 
        ? ((cardsData.items)[item.ArtKey]?.InternalName || item.InternalName)
        : item.InternalName;

      // Create the processed item
      const processedItem = {
        id,
        ...item,
        InternalName: internalName,
        Heroes: item.Heroes || ['Common'],
        Size: item.Size || 'Medium',
        Tags: item.Tags || [],
        StartingTier: item.StartingTier || 'Bronze',
        Tiers: item.Tiers || { Bronze: { Attributes: {} } }
      };

      // Generate and add the image path
      processedItem.image = generateImagePath({
        ...processedItem,
        InternalName: internalName
      });

      // Development logging for image path generation
      if (process.env.NODE_ENV === 'development') {
        console.debug(`Generated image path for ${internalName}:`, processedItem.image);
      }

      return processedItem;
    } catch (error) {
      console.error('Error processing item:', item, error);
      return null;
    }
  })
  .filter(card => 
    card && 
    !card.InternalName.includes('[DEBUG]') && 
    !card.InternalName.includes('[Community Team]')
  );

// Development validation of all cards
if (process.env.NODE_ENV === 'development') {
  console.log(`Processed ${cards.length} cards`);
  const missingProperties = cards.filter(card => 
    !card.image || !card.Size || !card.Heroes || !card.InternalName
  );
  if (missingProperties.length > 0) {
    console.warn('Cards with missing properties:', missingProperties);
  }
}