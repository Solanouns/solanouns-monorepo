import { Connection, PublicKey, Commitment, ConfirmOptions } from '@solana/web3.js';

/**
 * Default Solana RPC endpoints
 */
export const SOLANA_RPC_ENDPOINTS = {
  mainnet: 'https://api.mainnet-beta.solana.com',
  devnet: 'https://api.devnet.solana.com',
  testnet: 'https://api.testnet.solana.com',
  localnet: 'http://localhost:8899',
};

/**
 * Solanouns program IDs for different networks
 */
export const SOLANOUNS_PROGRAM_IDS = {
  token: new PublicKey('HGmLX7h2DP2BkAr1Q3q2qLWXGvF1uw1Rk8aBxD7eBdRp'),
  auctionHouse: new PublicKey('AHUe7A3p1G2kLTPVeQ1oFLBzQQNzf8G2wMxE3QVrjKpn'),
  governance: new PublicKey('GoV7mCqy4pZkMxHpWx1VZJGrQdE2z7PqFqNcVnELjKto'),
  treasury: new PublicKey('TrE3sJ8h1ZpKyVWx7fN4HpQz2cGhM5aXtDK9nVsW2LpR'),
};

/**
 * Create a Solana connection with default settings
 */
export function createConnection(
  endpoint: string = SOLANA_RPC_ENDPOINTS.devnet,
  commitment: Commitment = 'confirmed'
): Connection {
  return new Connection(endpoint, commitment);
}

/**
 * Default confirm options for transactions
 */
export const DEFAULT_CONFIRM_OPTIONS: ConfirmOptions = {
  preflightCommitment: 'confirmed',
  commitment: 'confirmed',
};

/**
 * Get the program derived address for a given seed and program
 */
export function getProgramDerivedAddress(
  seeds: (Buffer | Uint8Array)[],
  programId: PublicKey
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(seeds, programId);
}

/**
 * Get Solanouns config PDA
 */
export function getSolanounsConfigAddress(): [PublicKey, number] {
  return getProgramDerivedAddress(
    [Buffer.from('solanouns_config')],
    SOLANOUNS_PROGRAM_IDS.token
  );
}

/**
 * Get auction PDA for a given token ID
 */
export function getAuctionAddress(tokenId: number): [PublicKey, number] {
  return getProgramDerivedAddress(
    [Buffer.from('auction'), Buffer.from(tokenId.toString())],
    SOLANOUNS_PROGRAM_IDS.auctionHouse
  );
}

/**
 * Get auction house PDA
 */
export function getAuctionHouseAddress(): [PublicKey, number] {
  return getProgramDerivedAddress(
    [Buffer.from('auction_house')],
    SOLANOUNS_PROGRAM_IDS.auctionHouse
  );
}