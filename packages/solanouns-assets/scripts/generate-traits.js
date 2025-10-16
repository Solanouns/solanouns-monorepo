import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Solana-themed background colors
const SOLANA_BACKGROUNDS = [
  "9945FF", // Solana Purple
  "14F195", // Solana Green  
  "DC1FFF", // Solana Pink
  "00D4AA", // Solana Teal
  "FF6B35", // Solana Orange
  "1A1A2E", // Dark Purple
  "16213E", // Navy
  "0F3460", // Deep Blue
  "533483"  // Royal Purple
];

function generateTraitData() {
  const assetsPath = path.join(__dirname, '..', 'images', 'solanoundry');
  
  const traitCategories = ['Accessories', 'Background', 'Body', 'Head', 'Glasses'];
  const traits = {};
  
  for (const category of traitCategories) {
    const categoryPath = path.join(assetsPath, category);
    const files = fs.readdirSync(categoryPath);
    
    // Handle proper pluralization
    let categoryKey;
    if (category === 'Accessories') {
      categoryKey = 'accessories';
    } else if (category === 'Background') {
      categoryKey = 'backgrounds';
    } else if (category === 'Body') {
      categoryKey = 'bodies';
    } else if (category === 'Head') {
      categoryKey = 'heads';
    } else if (category === 'Glasses') {
      categoryKey = 'glasses';
    }
    
    traits[categoryKey] = files
      .filter(file => file.endsWith('.png'))
      .map(file => ({
        name: file.replace('-gradient.png', '').replace('.png', '').replace(/[_-]/g, ' '),
        filename: file
      }));
  }

  return {
    bgcolors: SOLANA_BACKGROUNDS,
    traits
  };
}

// Generate the data
const solanounsData = generateTraitData();

console.log('Debug - traits object:', Object.keys(solanounsData.traits));

// Write to JSON file
fs.writeFileSync(
  path.join(__dirname, '..', 'src', 'solanouns-data.json'),
  JSON.stringify(solanounsData, null, 2)
);

console.log('✅ Generated Solanouns trait data');
console.log('📊 Assets summary:');
for (const [key, value] of Object.entries(solanounsData.traits)) {
  console.log(`  - ${key}: ${value.length}`);
}
console.log(`  - Background colors: ${solanounsData.bgcolors.length}`);