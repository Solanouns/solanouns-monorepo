import express from 'express';
import cors from 'cors';
import { getNounData, getRandomNounSeed } from '@solanouns/assets';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Generate a deterministic seed from token ID
function generateSeedFromTokenId(tokenId: number) {
  // Simple deterministic seed generation for demo
  // In production, this would use actual blockchain data
  const seed = (tokenId * 2654435761) % Math.pow(2, 32);
  return {
    background: seed % 2,
    body: (seed >> 8) % 30,
    accessory: (seed >> 16) % 130,
    head: (seed >> 24) % 230,
    glasses: (seed >> 4) % 20,
  };
}

// Health check endpoint
app.get('/health', (req: any, res: any) => {
  res.json({ status: 'ok', service: 'Solanouns API' });
});

// Get metadata for a specific token ID
app.get('/metadata/:tokenId', (req: any, res: any) => {
  try {
    const tokenId = parseInt(req.params.tokenId);
    
    if (isNaN(tokenId)) {
      return res.status(400).json({ error: 'Invalid token ID' });
    }

    const seed = generateSeedFromTokenId(tokenId);
    const metadata = getNounData(seed);
    
    res.json({
      name: `Solanoun ${tokenId}`,
      description: `Solanoun ${tokenId} is a member of the Solanouns DAO`,
      image: `${req.protocol}://${req.get('host')}/image/${tokenId}`,
      attributes: [
        {
          trait_type: 'Background',
          value: metadata.background
        },
        {
          trait_type: 'Body',
          value: metadata.parts[0]?.filename.split('-')[0] || 'Body'
        },
        {
          trait_type: 'Accessory',
          value: metadata.parts[1]?.filename.split('-')[0] || 'Accessory'
        },
        {
          trait_type: 'Head',
          value: metadata.parts[2]?.filename.split('-')[0] || 'Head'
        },
        {
          trait_type: 'Glasses',
          value: metadata.parts[3]?.filename.split('-')[0] || 'Glasses'
        }
      ]
    });
  } catch (error) {
    console.error('Error generating metadata:', error);
    res.status(500).json({ error: 'Failed to generate metadata' });
  }
});

// Get SVG image for a specific token ID  
app.get('/image/:tokenId', (req: any, res: any) => {
  try {
    const tokenId = parseInt(req.params.tokenId);
    
    if (isNaN(tokenId)) {
      return res.status(400).json({ error: 'Invalid token ID' });
    }

    const seed = generateSeedFromTokenId(tokenId);
    const metadata = getNounData(seed);
    
    // For now, return a simple SVG placeholder
    // In production, this would use the canvas image generation
    const svg = `
      <svg width="320" height="320" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="320" fill="${metadata.background}"/>
        <text x="160" y="160" text-anchor="middle" font-size="24" fill="white">Solanoun ${tokenId}</text>
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
app.get('/tokens', (req: any, res: any) => {
  try {
    const limit = Math.min(parseInt(req.query.limit as string) || 10, 100);
    const offset = parseInt(req.query.offset as string) || 0;
    
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