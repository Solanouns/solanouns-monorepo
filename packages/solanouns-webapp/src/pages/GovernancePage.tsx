import React from 'react';

const GovernancePage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="font-londrina text-5xl font-black bg-gradient-to-r from-solana-purple to-solana-green bg-clip-text text-transparent mb-12 text-center">
        Governance
      </h1>
      
      <div className="card-gradient mb-12">
        <h2 className="font-londrina text-4xl font-black text-white mb-8 text-center">
          Treasury Overview
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
            <div className="text-3xl font-bold text-white mb-2">
              ◎ 125.5 SOL
            </div>
            <div className="text-white/80 text-sm font-bold uppercase">
              Treasury Balance
            </div>
          </div>
          <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
            <div className="text-3xl font-bold text-white mb-2">
              42
            </div>
            <div className="text-white/80 text-sm font-bold uppercase">
              Total Proposals
            </div>
          </div>
          <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
            <div className="text-3xl font-bold text-white mb-2">
              15
            </div>
            <div className="text-white/80 text-sm font-bold uppercase">
              Active Proposals
            </div>
          </div>
        </div>
      </div>
      
      <div className="card bg-white">
        <h2 className="font-londrina text-4xl font-black text-gray-900 mb-8">
          Recent Proposals
        </h2>
        <div className="space-y-6">
          <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-solana-purple transition-colors">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Fund Community Art Program
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Allocate 50 SOL to support community artists creating Solanouns-inspired artwork on Solana
            </p>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <span className="text-gray-500 text-sm font-bold uppercase">
                  Ends in 2 days
                </span>
                <span className="bg-gradient-to-r from-solana-green to-emerald-500 text-white px-4 py-2 rounded-lg font-bold text-sm">
                  65% For
                </span>
              </div>
              <button className="btn-primary">
                Vote
              </button>
            </div>
          </div>
          
          <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-solana-purple transition-colors">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Upgrade Smart Contracts
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Technical proposal to enhance auction mechanics and improve user experience on Solana
            </p>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <span className="text-gray-500 text-sm font-bold uppercase">
                  Ends in 5 days
                </span>
                <span className="bg-gradient-to-r from-solana-green to-emerald-500 text-white px-4 py-2 rounded-lg font-bold text-sm">
                  78% For
                </span>
              </div>
              <button className="btn-primary">
                Vote
              </button>
            </div>
          </div>
          
          <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-solana-purple transition-colors">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Solana Ecosystem Partnership
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Establish partnerships with key Solana DeFi protocols to expand Solanouns utility
            </p>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <span className="text-gray-500 text-sm font-bold uppercase">
                  Ends in 7 days
                </span>
                <span className="bg-gradient-to-r from-solana-cyan to-blue-500 text-white px-4 py-2 rounded-lg font-bold text-sm">
                  45% For
                </span>
              </div>
              <button className="btn-primary">
                Vote
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center space-x-4">
          <button className="btn-secondary">
            View All Proposals
          </button>
          <button className="btn-primary">
            Create Proposal
          </button>
        </div>
      </div>
    </div>
  );
};

export default GovernancePage;