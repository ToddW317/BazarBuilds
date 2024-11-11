// itemToImageMappingGenerator.js
const fs = require('fs');
const path = require('path');

// Paths to your files
const dataFilePath = path.resolve('data.js');
const itemsFilePath = path.resolve('data', 'items.txt');
const outputFilePath = path.resolve('data', 'itemToImageMapping.js');

// Function to parse the items file into an array of image filenames
function parseItemsFile() {
  const itemsData = fs.readFileSync(itemsFilePath, 'utf8');
  return itemsData
    .split(',')
    .map(item => item.trim().replace(/'|"/g, '').replace(/\s/g, ''))
    .filter(Boolean);
}

// Function to parse the data file and extract item names
function parseDataFile() {
  const data = fs.readFileSync(dataFilePath, 'utf8');
  const regex = /name:\s*['"](.+?)['"]/g;
  const items = new Set();
  let match;

  while ((match = regex.exec(data)) !== null) {
    items.add(match[1]);
  }
  return Array.from(items);
}

// Function to create the mapping
function createMapping(dataItems, imageFiles) {
  const mapping = {};
  const missingImages = [];

  dataItems.forEach(itemName => {
    // Convert itemName to match the format of image filenames
    const formattedName = itemName
      .replace(/\s+/g, '')
      .replace(/[^a-zA-Z0-9]/g, '');
      
    const matchedImage = imageFiles.find(img => img.includes(formattedName));

    if (matchedImage) {
      mapping[itemName] = `/items/${matchedImage}`;
    } else {
      missingImages.push(itemName);
    }
  });

  if (missingImages.length > 0) {
    console.log(`Warning: Missing images for ${missingImages.length} items.`);
    console.log(missingImages);
  }

  return mapping;
}

// Write the mapping to a file in the specified format
function writeMappingToFile(mapping) {
  const mappingEntries = Object.entries(mapping)
    .map(([key, value]) => `  "${key}": "${value}"`)
    .join(',\n');
    
  const mappingString = `const itemToImageMapping = {\n${mappingEntries}\n};\n\nmodule.exports = itemToImageMapping;`;
  fs.writeFileSync(outputFilePath, mappingString, 'utf8');
  console.log(`Mapping file created at ${outputFilePath}`);
}

// Main function
function generateItemToImageMapping() {
  const dataItems = parseDataFile();
  const imageFiles = parseItemsFile();
  const mapping = createMapping(dataItems, imageFiles);
  writeMappingToFile(mapping);
}

// Run the script
generateItemToImageMapping();
