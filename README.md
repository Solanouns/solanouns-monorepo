# Solanouns Monorepo

The Solanouns DAO monorepo - A Solana fork of NounsDAO

Solanouns DAO is a generative avatar art collective run by a group of crypto misfits, built on Solana.

## 🌐 Live Deployments

- **Webapp**: [Deploy to Vercel](https://vercel.com/new/clone?repository-url=https://github.com/Solanouns/solanouns-monorepo&project-name=solanouns-webapp&repository-name=solanouns-monorepo&root-directory=packages/solanouns-webapp)
- **API**: [Deploy to Vercel](https://vercel.com/new/clone?repository-url=https://github.com/Solanouns/solanouns-monorepo&project-name=solanouns-api&repository-name=solanouns-monorepo&root-directory=packages/solanouns-api)

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open webapp at http://localhost:3001
```

**✅ Status: Webapp is fully functional with Solana wallet integration!**

### Prerequisites

Before you begin, ensure you have the following installed:

#### Required
- **Node.js** >= 18.0.0 ([Download](https://nodejs.org/))
- **pnpm** >= 10.10.0 ([Installation Guide](https://pnpm.io/installation))
- **Git** ([Download](https://git-scm.com/downloads))

#### For Solana Development (Optional)
- **Rust** ([Installation Guide](https://rustup.rs/))
- **Solana CLI** ([Installation Guide](https://docs.solana.com/cli/install-solana-cli-tools))
- **Anchor Framework** ([Installation Guide](https://www.anchor-lang.com/docs/installation))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Solanouns/solanouns-monorepo.git
   cd solanouns-monorepo
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Build all packages**
   ```bash
   pnpm build
   ```

### Development

#### Start the web application
```bash
# Navigate to the webapp package
cd packages/solanouns-webapp

# Start development server
pnpm dev
```

The webapp will be available at `http://localhost:3000`

#### Start all development servers
```bash
# From the root directory
pnpm dev
```

This will start:
- 📱 **Webapp** at `http://localhost:3000`
- 🔧 **API** at `http://localhost:42069` (if configured)
- 📦 **Package watchers** for real-time building

### Solana Program Development

#### Setup Solana Environment

1. **Install Solana CLI**
   ```bash
   # Linux/Mac
   sh -c "$(curl -sSfL https://release.solana.com/v1.18.0/install)"
   
   # Windows (PowerShell)
   cmd /c "curl https://release.solana.com/v1.18.0/solana-install-init-x86_64-pc-windows-msvc.exe --output C:\solana-install-tmp\solana-install-init.exe --create-dirs"
   ```

2. **Create a wallet**
   ```bash
   solana-keygen new --outfile ~/.config/solana/id.json
   ```

3. **Set cluster to devnet**
   ```bash
   solana config set --url https://api.devnet.solana.com
   ```

4. **Airdrop SOL for testing**
   ```bash
   solana airdrop 2
   ```

#### Build and Deploy Programs

```bash
# Navigate to contracts package
cd packages/solanouns-contracts

# Build programs
anchor build

# Deploy to devnet
anchor deploy

# Run tests
anchor test
```

### Package Scripts

#### Root Level Commands

```bash
# Install all dependencies
pnpm install

# Build all packages
pnpm build

# Run tests across all packages
pnpm test

# Lint all packages
pnpm lint

# Format all code
pnpm format

# Start all development servers
pnpm dev

# Clean all build artifacts
pnpm clean

# Type check all packages
pnpm type-check
```

#### Package-Specific Commands

```bash
# Work in specific package
cd packages/[package-name]

# Available in all packages
pnpm build      # Build the package
pnpm dev        # Start development mode
pnpm test       # Run tests
pnpm clean      # Clean build artifacts
pnpm type-check # TypeScript type checking
```

### Environment Variables

Create a `.env.local` file in `packages/solanouns-webapp/`:

```env
# Solana Network Configuration
VITE_SOLANA_NETWORK=devnet
VITE_SOLANA_RPC_ENDPOINT=https://api.devnet.solana.com

# Program IDs (will be set after deployment)
VITE_SOLANOUNS_TOKEN_PROGRAM_ID=your_program_id_here
VITE_SOLANOUNS_AUCTION_HOUSE_PROGRAM_ID=your_program_id_here
VITE_SOLANOUNS_GOVERNANCE_PROGRAM_ID=your_program_id_here
VITE_SOLANOUNS_TREASURY_PROGRAM_ID=your_program_id_here
```

## 📦 Packages

### solanouns-assets

The [solanouns assets](./packages/solanouns-assets) package holds the Solanouns PNG and run-length encoded image data.

**Commands:**
```bash
cd packages/solanouns-assets
pnpm build    # Build the package
pnpm encode   # Encode new images
```

### solanouns-contracts  

The [solanouns contracts](./packages/solanouns-contracts) is the suite of Anchor Rust programs powering Solanouns DAO on Solana.

**Commands:**
```bash
cd packages/solanouns-contracts
anchor build     # Build all programs
anchor test      # Run program tests
anchor deploy    # Deploy to configured cluster
anchor localnet  # Start local validator
```

### solanouns-sdk

The [solanouns sdk](./packages/solanouns-sdk) includes methods and react hooks for interacting with all the Solanouns programs, as well as image encoding and SVG building utilities.

**Commands:**
```bash
cd packages/solanouns-sdk
pnpm build    # Build TypeScript SDK
pnpm test     # Run SDK tests
```

### solanouns-api

A [ponder.sh](https://github.com/ponder-sh/ponder) based API for all historical Solanouns DAO data on Solana.

**Commands:**
```bash
cd packages/solanouns-api
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm start    # Start production server
```

### solanouns-webapp

The [solanouns webapp](./packages/solanouns-webapp) is the frontend for interacting with Solanouns auctions.

**Commands:**
```bash
cd packages/solanouns-webapp
pnpm dev      # Start development server (localhost:3000)
pnpm build    # Build for production
pnpm preview  # Preview production build
```

## 🔧 Troubleshooting

### Common Issues

#### pnpm not found
```bash
# Install pnpm globally
npm install -g pnpm
# or
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

#### Node version mismatch
```bash
# Use the correct Node.js version
nvm use  # if you have nvm installed
# or manually install Node.js 18+
```

#### Anchor not found
```bash
# Install Anchor
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
avm install latest
avm use latest
```

#### Port already in use
```bash
# Kill process on port 3000
npx kill-port 3000
# or use a different port
cd packages/solanouns-webapp && pnpm dev --port 3001
```

### Getting Help

If you encounter issues:
1. Check the [Issues](https://github.com/Solanouns/solanouns-monorepo/issues) page
2. Review the [Solana documentation](https://docs.solana.com/)
3. Check [Anchor documentation](https://www.anchor-lang.com/)

## 🌐 Deployment

### One-Click Vercel Deployment

#### Webapp Deployment
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Solanouns/solanouns-monorepo&project-name=solanouns-webapp&repository-name=solanouns-monorepo&root-directory=packages/solanouns-webapp)

1. Click the "Deploy with Vercel" button above
2. Connect your GitHub account and fork the repository
3. Vercel will automatically detect the Vite configuration
4. Set environment variables:
   - `VITE_SOLANA_NETWORK=mainnet-beta` (or `devnet` for testing)
   - `VITE_API_URL=https://your-api-url.vercel.app`
5. Deploy! Your Solanouns webapp will be live in minutes

#### API Deployment
[![Deploy API with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Solanouns/solanouns-monorepo&project-name=solanouns-api&repository-name=solanouns-monorepo&root-directory=packages/solanouns-api)

1. Click the "Deploy API with Vercel" button above
2. Select the `packages/solanouns-api` directory as the root
3. Vercel will automatically deploy as serverless functions
4. Your metadata API will be available at `https://your-project.vercel.app`

### Manual Vercel Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy webapp
cd packages/solanouns-webapp
vercel

# Deploy API
cd ../solanouns-api
vercel
```

### Alternative Hosting Options

#### Netlify (Webapp)
```bash
cd packages/solanouns-webapp
npm run build
# Upload dist/ folder to Netlify
```

#### Railway (API)
```bash
cd packages/solanouns-api
# Connect GitHub repository to Railway
# Railway will auto-deploy on git push
```

#### Traditional VPS
```bash
# Build everything
pnpm build

# Deploy contracts to Solana
cd packages/solanouns-contracts
anchor deploy --provider.cluster mainnet

# Setup nginx for webapp and PM2 for API
# Copy webapp build to /var/www/html/
# Run API with PM2: pm2 start packages/solanouns-api/dist/server.js
```

### Environment Variables

#### Webapp (.env.local)
```bash
VITE_SOLANA_NETWORK=mainnet-beta
VITE_API_URL=https://your-api.vercel.app
VITE_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
```

#### API (.env)
```bash
PORT=3002
SOLANA_NETWORK=mainnet-beta
CORS_ORIGIN=https://your-webapp.vercel.app
```

### Manual Deployment
```bash
cd packages/solanouns-webapp
vercel
```

### Manual Deployment
```bash
# Build for production
pnpm build

# Deploy contracts
cd packages/solanouns-contracts
anchor deploy --provider.cluster mainnet

# Deploy webapp
cd packages/solanouns-webapp
pnpm build
# Upload dist/ to your hosting provider
```

## About

Solanouns DAO is inspired by NounsDAO but built natively for the Solana blockchain, bringing the power of generative NFT art and DAO governance to the Solana ecosystem.

## License

GPL-3.0