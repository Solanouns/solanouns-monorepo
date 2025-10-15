import React from 'react';
import { Link } from 'react-router-dom';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import DarkModeToggle from './DarkModeToggle';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white dark:bg-slate-800 border-b-2 border-purple-200 dark:border-slate-600 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section - Solana themed */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-solana-purple to-solana-green rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-londrina text-xl font-black">S</span>
              </div>
              <span className="text-2xl font-londrina font-black bg-gradient-to-r from-solana-purple to-solana-green bg-clip-text text-transparent">
                SOLANOUNS
              </span>
            </Link>
            
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                to="/auction" 
                className="text-gray-700 dark:text-gray-200 hover:text-solana-purple dark:hover:text-purple-300 font-medium text-base transition-colors duration-200"
              >
                Auction
              </Link>
              <Link 
                to="/governance" 
                className="text-gray-700 dark:text-gray-200 hover:text-solana-purple dark:hover:text-purple-300 font-medium text-base transition-colors duration-200"
              >
                Governance
              </Link>
              <Link 
                to="/explore" 
                className="text-gray-700 dark:text-gray-200 hover:text-solana-purple dark:hover:text-purple-300 font-medium text-base transition-colors duration-200"
              >
                Explore
              </Link>
            </div>
          </div>

          {/* Right side - Wallet and Stats */}
          <div className="flex items-center space-x-4">
            {/* Treasury Stats - Solana themed */}
            <div className="hidden lg:flex items-center space-x-6 text-sm">
              <div className="text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Treasury</div>
                <div className="font-bold text-gray-900 dark:text-gray-100">◎ 1,247</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Owners</div>
                <div className="font-bold text-gray-900 dark:text-gray-100">342</div>
              </div>
            </div>
            
            {/* Dark Mode Toggle */}
            <DarkModeToggle />
            
            {/* Wallet Connection - Solana themed */}
            <WalletMultiButton className="!bg-gradient-to-r from-solana-purple to-solana-green hover:from-purple-700 hover:to-green-600 !border-none !rounded-xl !h-12 !px-6 !font-semibold !text-white !shadow-lg hover:!shadow-xl !transition-all !duration-300" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;