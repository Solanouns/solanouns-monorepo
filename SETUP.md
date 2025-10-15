# Solanouns Setup Guide

This guide will walk you through setting up the Solanouns monorepo on your Windows machine step by step.

## 🚀 Quick Start (Current Status)

The monorepo is now in a **working state** with a webapp-first development approach:

```powershell
# Navigate to project directory
cd c:\Users\Allanne\Documents\GitHub\solanouns-monorepo

# Install dependencies (if not already done)
pnpm install

# Start development server
pnpm dev
```

**✅ Webapp is now running at:** [http://localhost:3001](http://localhost:3001)

### Current Build Status
- ✅ **Webapp**: Fully functional with Solana wallet integration
- 🔄 **SDK**: Build temporarily disabled (TypeScript fixes applied)
- 🔄 **Assets**: Build temporarily disabled (dependency issues resolved)
- 🔄 **API**: Build temporarily disabled (requires Solana-compatible replacement)
- 🔄 **Contracts**: Build disabled (requires Anchor CLI installation)

This configuration allows immediate development on the React frontend while supporting packages are stabilized.

## 🎯 Step-by-Step Setup (If Starting Fresh)

### Step 1: Verify Prerequisites

Open PowerShell and check your current versions:

```powershell
# Check Node.js version (should be >= 18.0.0)
node --version

# Check if pnpm is installed
pnpm --version

# Check Git
git --version
```

### Step 2: Install Missing Dependencies

#### Install pnpm (if not installed)
```powershell
# Option 1: Using npm
npm install -g pnpm

# Option 2: Using PowerShell script
iwr https://get.pnpm.io/install.ps1 -useb | iex
```

#### Install Node.js (if version < 18)
1. Go to [nodejs.org](https://nodejs.org/)
2. Download Node.js 18+ LTS version
3. Run the installer
4. Restart PowerShell

### Step 3: Initial Setup

```powershell
# Navigate to your project directory
cd c:\Users\Allanne\Documents\GitHub\solanouns-monorepo

# Install all dependencies
pnpm install

# Build all packages
pnpm build
```

### Step 4: Start Development

#### Option A: Start Everything
```powershell
# Start all development servers
pnpm dev
```

#### Option B: Start Just the Webapp
```powershell
# Navigate to webapp
cd packages\solanouns-webapp

# Start development server
pnpm dev
```

The webapp will be available at: http://localhost:3000

### Step 5: Verify Installation

Open your browser and go to http://localhost:3000. You should see the Solanouns homepage.

## 🔧 If You Want to Work with Solana Programs

### Install Rust and Solana Tools

1. **Install Rust**
   ```powershell
   # Download and run rustup-init.exe from https://rustup.rs/
   # Or use chocolatey if you have it:
   choco install rust
   ```

2. **Install Solana CLI**
   ```powershell
   # Download from https://github.com/solana-labs/solana/releases
   # Or use the installer:
   cmd /c "curl https://release.solana.com/v1.18.0/solana-install-init-x86_64-pc-windows-msvc.exe --output C:\solana-install-tmp\solana-install-init.exe --create-dirs && C:\solana-install-tmp\solana-install-init.exe"
   ```

3. **Install Anchor Framework**
   ```powershell
   # First install avm (Anchor Version Manager)
   cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
   
   # Install latest Anchor
   avm install latest
   avm use latest
   ```

4. **Setup Solana Wallet**
   ```powershell
   # Create a new wallet
   solana-keygen new --outfile ~/.config/solana/id.json
   
   # Set to devnet
   solana config set --url https://api.devnet.solana.com
   
   # Get some test SOL
   solana airdrop 2
   ```

5. **Build and Test Solana Programs**
   ```powershell
   # Navigate to contracts
   cd packages\solanouns-contracts
   
   # Build programs
   anchor build
   
   # Run tests
   anchor test
   ```

## 🚨 Common Issues & Solutions

### Issue: "pnpm: command not found"
**Solution:**
```powershell
# Restart PowerShell after installing pnpm
# Or add to PATH manually if needed
```

### Issue: "Access denied" during installation
**Solution:**
```powershell
# Run PowerShell as Administrator
# Right-click PowerShell -> "Run as Administrator"
```

### Issue: Port 3000 already in use
**Solution:**
```powershell
# Kill the process using port 3000
npx kill-port 3000

# Or use a different port
cd packages\solanouns-webapp
pnpm dev --port 3001
```

### Issue: TypeScript compilation errors
**Solution:**
```powershell
# Clean and rebuild everything
pnpm clean
pnpm build
```

### Issue: Anchor build fails
**Solution:**
```powershell
# Make sure Rust and Anchor are properly installed
rustc --version
anchor --version

# Clean anchor build
cd packages\solanouns-contracts
anchor clean
anchor build
```

## 📁 Directory Structure

```
solanouns-monorepo/
├── packages/
│   ├── solanouns-assets/       # NFT assets and image data
│   ├── solanouns-contracts/    # Solana programs (Rust)
│   ├── solanouns-sdk/         # TypeScript SDK
│   ├── solanouns-webapp/      # React frontend
│   └── solanouns-api/         # Data indexing API
├── package.json               # Root package configuration
├── pnpm-workspace.yaml        # Workspace configuration
├── turbo.json                # Build orchestration
└── README.md                 # Main documentation
```

## 🎯 What to Do Next

1. **For Frontend Development:**
   - Focus on `packages/solanouns-webapp`
   - Edit React components in `src/pages/` and `src/components/`
   - Run `pnpm dev` in webapp directory

2. **For Smart Contract Development:**
   - Focus on `packages/solanouns-contracts`
   - Edit Rust programs in `programs/*/src/`
   - Run `anchor build` and `anchor test`

3. **For SDK Development:**
   - Focus on `packages/solanouns-sdk`
   - Edit TypeScript files in `src/`
   - Run `pnpm build` to compile

## 🔄 Development Workflow

```powershell
# Daily workflow:
cd c:\Users\Allanne\Documents\GitHub\solanouns-monorepo

# Pull latest changes
git pull

# Install any new dependencies
pnpm install

# Start development
pnpm dev

# Make your changes...

# Build and test before committing
pnpm build
pnpm lint
pnpm format

# Commit your changes
git add .
git commit -m "Your commit message"
git push
```

## 📞 Need Help?

If you run into issues:
1. Check this guide first
2. Look at the main README.md
3. Check the individual package README files
4. Search for similar issues online
5. Ask for help with specific error messages