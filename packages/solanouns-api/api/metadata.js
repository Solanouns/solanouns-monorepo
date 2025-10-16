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
    
    res.status(200).json({
      name: `Solanoun ${id}`,
      description: `Solanoun ${id} is a member of the Solanouns DAO - A Solana fork of NounsDAO`,
      image: `https://${req.headers.host}/api/image?tokenId=${id}`,
      external_url: `https://solanouns.com/noun/${id}`,
      attributes: [
        {
          trait_type: 'Background',
          value: traits.background
        },
        {
          trait_type: 'Body',
          value: traits.body
        },
        {
          trait_type: 'Accessory',
          value: traits.accessory
        },
        {
          trait_type: 'Head',
          value: traits.head
        },
        {
          trait_type: 'Glasses',
          value: traits.glasses
        }
      ]
    });
  } catch (error) {
    console.error('Error generating metadata:', error);
    res.status(500).json({ error: 'Failed to generate metadata' });
  }
}