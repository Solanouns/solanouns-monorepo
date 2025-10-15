import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

// Import wallet adapter CSS
import '@solana/wallet-adapter-react-ui/styles.css';

// Import pages
import HomePage from './pages/HomePage';
import AuctionPage from './pages/AuctionPage';
import GovernancePage from './pages/GovernancePage';
import ExplorePage from './pages/ExplorePage';

// Import components
import Navbar from './components/Navbar';
import { ThemeProvider } from './contexts/ThemeContext';

// Create a query client
const queryClient = new QueryClient();

function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = clusterApiUrl(network);

  const wallets = React.useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  );

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
              <Router>
                <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
                  <Navbar />
                  <main className="container mx-auto px-4 py-8">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/auction" element={<AuctionPage />} />
                      <Route path="/governance" element={<GovernancePage />} />
                      <Route path="/explore" element={<ExplorePage />} />
                    </Routes>
                  </main>
                </div>
              </Router>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;