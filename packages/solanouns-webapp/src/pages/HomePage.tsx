import React from 'react';
import { SolanounCard, SolanounGrid } from '../components/Solanoun/SolanounCard';

const HomePage: React.FC = () => {
  // Generate some token IDs for display
  const featuredTokenIds = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Banner Section - Solana themed */}
      <div className="grid lg:grid-cols-2 gap-8 items-center mb-16">
        <div className="space-y-6">
          <h1 className="font-londrina text-6xl font-black text-gray-900 dark:text-gray-100 leading-none">
            ONE SOLANOUNS,
            <br />
            <span className="bg-gradient-to-r from-solana-purple to-solana-green bg-clip-text text-transparent">
              EVERY DAY,
            </span>
            <br />
            FOREVER.
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-medium max-w-lg">
            Community-driven NFTs on Solana. One unique Solanouns is generated, 
            auctioned, and governed by the community every 24 hours.
          </p>
        </div>
        <div className="flex justify-center">
          <SolanounCard tokenId={42} className="w-80" />
        </div>
      </div>

      {/* Current Auction Section */}
      <div className="card mb-16 max-w-md mx-auto bg-white dark:bg-slate-800 hover:shadow-2xl transition-all duration-300">
        <div className="text-center">
          <h3 className="font-londrina text-3xl font-black text-gray-900 dark:text-gray-100 mb-4">
            CURRENT AUCTION
          </h3>
          <div className="mb-6">
            <SolanounCard tokenId={42} className="w-full max-w-sm mx-auto" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
            Auction ends in <span className="font-bold text-solana-purple">2h 15m</span>
          </p>
          <div className="mb-6">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Current Bid</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">◎ 12.5 SOL</div>
          </div>
          <button className="btn-primary w-full">
            Place Bid
          </button>
        </div>
      </div>

      {/* Featured Solanouns Section */}
      <div className="mb-16">
        <h2 className="font-londrina text-4xl font-black text-gray-900 dark:text-gray-100 text-center mb-8">
          FEATURED SOLANOUNS
        </h2>
        <SolanounGrid tokenIds={featuredTokenIds} />
        <div className="text-center mt-8">
          <button className="btn-secondary">
            View All Solanouns
          </button>
        </div>
      </div>
      
      {/* Info Cards Section - Solana themed */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="card bg-white dark:bg-slate-800 text-center hover:shadow-xl transition-all duration-300">
          <div className="w-16 h-16 bg-gradient-to-br from-solana-purple to-solana-green rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-white">⚡</span>
          </div>
          <h3 className="font-londrina text-2xl font-black text-gray-900 dark:text-gray-100 mb-4">
            Daily Auctions
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            New Solanouns are generated and auctioned every day on Solana. 
            The winning bidder receives the Solanouns NFT.
          </p>
        </div>
        
        <div className="card bg-white dark:bg-slate-800 text-center hover:shadow-xl transition-all duration-300">
          <div className="w-16 h-16 bg-gradient-to-br from-solana-green to-solana-cyan rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-white">🗳️</span>
          </div>
          <h3 className="font-londrina text-2xl font-black text-solana-purple mb-4">
            DAO Governance
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Solanouns holders can propose and vote on how the 
            community treasury is used on Solana.
          </p>
        </div>
        
        <div className="card bg-white dark:bg-slate-800 text-center hover:shadow-xl transition-all duration-300">
          <div className="w-16 h-16 bg-gradient-to-br from-solana-cyan to-solana-pink rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-white">🏦</span>
          </div>
          <h3 className="font-londrina text-2xl font-black text-solana-green mb-4">
            Community Treasury
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Auction proceeds flow to the Solana treasury, controlled 
            by the community through governance.
          </p>
        </div>
      </div>
      
      {/* CTA Buttons - Solana themed */}
      <div className="text-center space-x-4">
        <button className="btn-secondary">
          View Collection
        </button>
        <button className="btn-primary">
          Join Auction
        </button>
      </div>
    </div>
  );
};

export default HomePage;