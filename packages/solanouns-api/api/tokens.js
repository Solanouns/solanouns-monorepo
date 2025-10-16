export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const limit = Math.min(parseInt(req.query.limit) || 10, 100);
    const offset = parseInt(req.query.offset) || 0;
    
    const tokens = [];
    for (let i = offset; i < offset + limit; i++) {
      tokens.push({
        tokenId: i,
        name: `Solanoun ${i}`,
        image: `https://${req.headers.host}/api/image?tokenId=${i}`,
        metadata: `https://${req.headers.host}/api/metadata?tokenId=${i}`
      });
    }
    
    res.status(200).json({
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
}