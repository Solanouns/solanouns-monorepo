import React from 'react';

const AuctionPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="font-londrina text-5xl font-black bg-gradient-to-r from-solana-purple to-solana-green bg-clip-text text-transparent mb-12 text-center">
        Current Auction
      </h1>
      
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Solanouns Display */}
        <div className="card-gradient">
          <h2 className="font-londrina text-3xl font-black text-white mb-6">
            Solanouns #1
          </h2>
          <div className="bg-white/20 backdrop-blur-sm w-full h-80 rounded-lg mb-6 flex items-center justify-center border border-white/30">
            <div className="text-8xl">👑</div>
          </div>
          <p className="text-white/90 text-lg">
            Generated Solanouns NFT with rare crown and lightning traits on Solana
          </p>
        </div>
        
        {/* Auction Details */}
        <div className="card bg-white">
          <h2 className="font-londrina text-3xl font-black text-gray-900 mb-8">
            Auction Details
          </h2>
          <div className="space-y-6">
            <div className="border-2 border-solana-green rounded-lg p-6 bg-gradient-to-r from-green-50 to-emerald-50">
              <span className="font-bold text-gray-600 text-sm uppercase block mb-2">
                Current Bid:
              </span>
              <span className="text-3xl font-bold text-solana-green">
                ◎ 5.5 SOL
              </span>
            </div>
            <div className="border-2 border-solana-purple rounded-lg p-6 bg-gradient-to-r from-purple-50 to-violet-50">
              <span className="font-bold text-gray-600 text-sm uppercase block mb-2">
                Time Remaining:
              </span>
              <span className="text-2xl font-bold text-solana-purple">
                2h 15m 30s
              </span>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <span className="font-bold text-gray-600 text-sm uppercase block mb-2">
                Leading Bidder:
              </span>
              <span className="font-mono text-gray-900 bg-white px-3 py-2 rounded border text-sm">
                7xKE...9aBc
              </span>
            </div>
            <div className="mt-8 space-y-3">
              <input 
                type="number" 
                placeholder="Enter bid amount (SOL)"
                className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-solana-purple focus:outline-none text-lg"
              />
              <button className="btn-primary w-full font-bold text-lg">
                Place Bid
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Auctions */}
      <div>
        <h2 className="font-londrina text-4xl font-black text-gray-900 mb-8 text-center">
          Recent Auctions
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { id: 4, price: 7.2, emoji: "🎭" },
            { id: 3, price: 6.8, emoji: "⚡" },
            { id: 2, price: 5.9, emoji: "🔥" },
            { id: 1, price: 4.5, emoji: "💎" }
          ].map((item) => (
            <div key={item.id} className="card bg-white hover:shadow-xl transition-all duration-300 group">
              <div className="bg-gradient-to-br from-solana-purple to-solana-green rounded-lg p-6 mb-4 flex items-center justify-center group-hover:scale-105 transition-transform">
                <div className="text-3xl">{item.emoji}</div>
              </div>
              <h3 className="font-londrina font-black text-gray-900 text-xl mb-2">
                Solanouns #{item.id}
              </h3>
              <p className="text-gray-600">
                Sold for <span className="font-bold text-solana-green">◎ {item.price} SOL</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuctionPage;