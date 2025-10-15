import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Generate a deterministic seed from token ID
function generateSeedFromTokenId(tokenId) {
  // Simple deterministic seed generation for demo
  const seed = (tokenId * 2654435761) % Math.pow(2, 32);
  return {
    background: seed % 2,
    body: (seed >> 8) % 30,
    accessory: (seed >> 16) % 130,
    head: (seed >> 24) % 230,
    glasses: (seed >> 4) % 20,
  };
}

// Simple mock metadata generator
function generateMockMetadata(tokenId) {
  const traits = {
    backgrounds: ['Cool', 'Warm'],
    bodies: ['Robot', 'Alien', 'Human', 'Cat', 'Dog'],
    accessories: ['Sunglasses', 'Hat', 'Necklace', 'None'],
    heads: ['Big', 'Small', 'Round', 'Square'],
    glasses: ['3D', 'Regular', 'Funky', 'None']
  };

  const seed = generateSeedFromTokenId(tokenId);
  
  return {
    background: traits.backgrounds[seed.background],
    body: traits.bodies[seed.body % traits.bodies.length],
    accessory: traits.accessories[seed.accessory % traits.accessories.length],
    head: traits.heads[seed.head % traits.heads.length],
    glasses: traits.glasses[seed.glasses % traits.glasses.length]
  };
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'Solanouns API' });
});

// Get metadata for a specific token ID
app.get('/metadata/:tokenId', (req, res) => {
  try {
    const tokenId = parseInt(req.params.tokenId);
    
    if (isNaN(tokenId)) {
      return res.status(400).json({ error: 'Invalid token ID' });
    }

    const traits = generateMockMetadata(tokenId);
    
    res.json({
      name: `Solanoun ${tokenId}`,
      description: `Solanoun ${tokenId} is a member of the Solanouns DAO`,
      image: `${req.protocol}://${req.get('host')}/image/${tokenId}`,
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
});

// Get SVG image for a specific token ID  
app.get('/image/:tokenId', (req, res) => {
  try {
    const tokenId = parseInt(req.params.tokenId);
    
    if (isNaN(tokenId)) {
      return res.status(400).json({ error: 'Invalid token ID' });
    }

    const traits = generateMockMetadata(tokenId);
    const bgColor = traits.background === 'Cool' ? '#14F195' : '#9945FF';
    
    // Generate a simple SVG with Solana colors
    const svg = `
      <svg width="320" height="320" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="320" fill="${bgColor}"/>
        <circle cx="160" cy="120" r="50" fill="white" opacity="0.8"/>
        <rect x="140" y="140" width="40" height="60" fill="white" opacity="0.9"/>
        <text x="160" y="250" text-anchor="middle" font-size="16" fill="white" font-weight="bold">Solanoun ${tokenId}</text>
        <text x="160" y="270" text-anchor="middle" font-size="12" fill="white">${traits.body}</text>
      </svg>
    `;
    
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg);
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
});

// List all available metadata
app.get('/tokens', (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 10, 100);
    const offset = parseInt(req.query.offset) || 0;
    
    const tokens = [];
    for (let i = offset; i < offset + limit; i++) {
      tokens.push({
        tokenId: i,
        name: `Solanoun ${i}`,
        image: `${req.protocol}://${req.get('host')}/image/${i}`,
        metadata: `${req.protocol}://${req.get('host')}/metadata/${i}`
      });
    }
    
    res.json({
      tokens,
      pagination: {
        limit,
        offset,
        total: 1000 // Arbitrary large number for demo
      }
    });
  } catch (error) {
    console.error('Error listing tokens:', error);
    res.status(500).json({ error: 'Failed to list tokens' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Solanouns API server running on port ${PORT}`);
  console.log(`📖 Health check: http://localhost:${PORT}/health`);
  console.log(`🖼️  Image example: http://localhost:${PORT}/image/1`);
  console.log(`📊 Metadata example: http://localhost:${PORT}/metadata/1`);
});