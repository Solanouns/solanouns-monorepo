import * as fs from 'fs';
import * as path from 'path';

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

interface TraitData {
  name: string;
  filename: string;
}

interface SolanounsAssets {
  bgcolors: string[];
  traits: {
    accessories: TraitData[];
    backgrounds: TraitData[];
    bodies: TraitData[];
    heads: TraitData[];
    glasses: TraitData[];
  };
}

function generateTraitData(): SolanounsAssets {
  const assetsPath = path.join(__dirname, '..', 'images', 'solanoundry');
  
  const traitCategories = ['Accessories', 'Background', 'Body', 'Head', 'Glasses'];
  const traits: any = {};
  
  for (const category of traitCategories) {
    const categoryPath = path.join(assetsPath, category);
    const files = fs.readdirSync(categoryPath);
    
    const categoryKey = category.toLowerCase() + 's';
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

// Write to JSON file
fs.writeFileSync(
  path.join(__dirname, 'solanouns-data.json'),
  JSON.stringify(solanounsData, null, 2)
);

console.log('✅ Generated Solanouns trait data');
console.log(`📊 Assets summary:`);
console.log(`  - Accessories: ${solanounsData.traits.accessories.length}`);
console.log(`  - Backgrounds: ${solanounsData.traits.backgrounds.length}`);
console.log(`  - Bodies: ${solanounsData.traits.bodies.length}`);
console.log(`  - Heads: ${solanounsData.traits.heads.length}`);
console.log(`  - Glasses: ${solanounsData.traits.glasses.length}`);
console.log(`  - Background colors: ${solanounsData.bgcolors.length}`);