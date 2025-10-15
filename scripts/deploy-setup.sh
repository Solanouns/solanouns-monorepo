#!/bin/bash

# Solanouns Deployment Setup Script
# This script helps you deploy Solanouns to GitHub and Vercel

echo "🎭 Solanouns Deployment Setup"
echo "=============================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit: Solanouns DAO monorepo"
fi

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "❌ No git remote 'origin' found."
    echo "Please create a GitHub repository and run:"
    echo "git remote add origin https://github.com/YOUR_USERNAME/solanouns-monorepo.git"
    echo "git push -u origin main"
    exit 1
fi

echo "✅ Git repository configured"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

echo "✅ Vercel CLI ready"

# Install dependencies
echo "Installing dependencies..."
pnpm install

# Build packages to verify everything works
echo "Building packages..."
pnpm build

if [ $? -eq 0 ]; then
    echo "✅ All packages built successfully"
else
    echo "❌ Build failed. Please check errors above."
    exit 1
fi

echo ""
echo "🚀 Ready for deployment!"
echo ""
echo "Next steps:"
echo "1. Push to GitHub: git push origin main"
echo "2. Deploy webapp: cd packages/solanouns-webapp && vercel"
echo "3. Deploy API: cd packages/solanouns-api && vercel"
echo ""
echo "Or use the one-click Vercel deployment buttons in README.md"
echo ""
echo "📚 See docs/DEPLOYMENT.md for detailed instructions"