// Import Solanouns trait data
import { SolanounsData } from '@solanouns/assets';

// Get trait data
const { bgcolors, traits } = SolanounsData;
const { bodies, accessories, heads, glasses } = traits;

// Generate a deterministic seed from token ID
function generateSeedFromTokenId(tokenId) {
  const seed = (tokenId * 2654435761) % Math.pow(2, 32);
  return {
    background: seed % bgcolors.length,
    body: (seed >> 8) % bodies.length,
    accessory: (seed >> 16) % accessories.length,
    head: (seed >> 24) % heads.length,
    glasses: (seed >> 4) % glasses.length,
  };
}

// Generate metadata using real Solanouns traits
function generateSolanounMetadata(tokenId) {
  const seed = generateSeedFromTokenId(tokenId);
  
  return {
    background: `#${bgcolors[seed.background]}`,
    body: bodies[seed.body].name,
    accessory: accessories[seed.accessory].name,
    head: heads[seed.head].name,
    glasses: glasses[seed.glasses].name
  };
}

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { tokenId } = req.query;
  
  if (!tokenId) {
    return res.status(400).json({ error: 'Token ID is required' });
  }

  const id = parseInt(tokenId);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid token ID' });
  }

  try {
    const traits = generateSolanounMetadata(id);
    
    // Generate a simple SVG with Solana colors and real trait names
    const svg = `
      <svg width="320" height="320" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="320" fill="${traits.background}"/>
        <circle cx="160" cy="120" r="50" fill="white" opacity="0.8"/>
        <rect x="140" y="140" width="40" height="60" fill="white" opacity="0.9"/>
        <text x="160" y="230" text-anchor="middle" font-size="16" fill="white" font-weight="bold">Solanoun ${id}</text>
        <text x="160" y="250" text-anchor="middle" font-size="10" fill="white">${traits.head}</text>
        <text x="160" y="265" text-anchor="middle" font-size="10" fill="white">${traits.body}</text>
        <text x="160" y="280" text-anchor="middle" font-size="10" fill="white">${traits.accessory}</text>
        <text x="160" y="295" text-anchor="middle" font-size="10" fill="white">${traits.glasses}</text>
      </svg>
    `;
    
    res.setHeader('Content-Type', 'image/svg+xml');
    res.status(200).send(svg);
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
}