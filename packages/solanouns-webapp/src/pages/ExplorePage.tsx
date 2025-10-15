import React from 'react';

const ExplorePage: React.FC = () => {
  const gradients = [
    'from-solana-purple to-solana-green', 
    'from-solana-green to-solana-cyan', 
    'from-solana-cyan to-solana-pink',
    'from-solana-pink to-solana-purple', 
    'from-purple-500 to-pink-500', 
    'from-green-500 to-blue-500'
  ];
  const emojis = ['👑', '⚡', '�', '💎', '🚀', '�', '�', '�', '�', '�', '�', '�'];
  
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="font-londrina text-5xl font-black bg-gradient-to-r from-solana-purple to-solana-green bg-clip-text text-transparent mb-12 text-center">
        Explore Solanouns
      </h1>
      
      <div className="mb-8 text-center space-x-4">
        <button className="btn-primary">
          All Solanouns
        </button>
        <button className="btn-secondary">
          Recently Sold
        </button>
        <button className="btn-secondary">
          By Traits
        </button>
        <button className="btn-secondary">
          Trending
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="card bg-white hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <div className={`bg-gradient-to-br ${gradients[i % gradients.length]} w-full h-48 rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
              <span className="text-6xl">{emojis[i % emojis.length]}</span>
            </div>
            <div>
              <h3 className="font-londrina text-xl font-black text-gray-900 mb-3">
                SOLANOUNS #{i + 1}
              </h3>
              <div className="space-y-2">
                <p className="text-gray-600 text-sm">
                  Owner: <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">
                    7xKE...{Math.random().toString(36).substr(2, 4)}
                  </span>
                </p>
                <p className="text-solana-green font-bold">
                  Last: ◎ {(Math.random() * 10 + 1).toFixed(1)} SOL
                </p>
                <div className="flex space-x-2 mt-3">
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">Crown</span>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Rare</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <button className="btn-primary px-8">
          Load More Solanouns
        </button>
      </div>
    </div>
  );
};

export default ExplorePage;