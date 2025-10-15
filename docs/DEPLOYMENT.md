# Deployment Guide

This guide walks you through deploying Solanouns to GitHub and hosting on Vercel.

## 📋 Prerequisites

- GitHub account
- Vercel account (free)
- Git installed locally
- Node.js 18+ and pnpm installed

## 🔄 GitHub Setup

### 1. Create GitHub Repository

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Solanouns DAO monorepo"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/solanouns-monorepo.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 2. Repository Settings

1. Go to your GitHub repository settings
2. Enable "Issues" and "Projects" for community engagement
3. Set up branch protection rules for `main`:
   - Require pull request reviews
   - Require status checks to pass
   - Restrict pushes to `main` branch

## 🚀 Vercel Deployment

### Method 1: One-Click Deployment (Recommended)

#### Deploy Webapp
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Select "packages/solanouns-webapp" as the root directory
4. Configure environment variables:
   ```
   VITE_SOLANA_NETWORK=devnet
   VITE_API_URL=https://your-api-domain.vercel.app
   ```
5. Click "Deploy"

#### Deploy API
1. Create a new Vercel project
2. Import the same GitHub repository
3. Select "packages/solanouns-api" as the root directory
4. Vercel will automatically detect it as a Node.js project
5. Click "Deploy"

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy webapp
cd packages/solanouns-webapp
vercel --prod

# Deploy API
cd ../solanouns-api
vercel --prod
```

## 🔧 Environment Configuration

### Webapp Environment Variables

In Vercel dashboard, add these environment variables for your webapp:

```bash
# Production
VITE_SOLANA_NETWORK=mainnet-beta
VITE_API_URL=https://your-api.vercel.app
VITE_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com

# Development/Testing
VITE_SOLANA_NETWORK=devnet
VITE_API_URL=https://your-api-staging.vercel.app
VITE_SOLANA_RPC_URL=https://api.devnet.solana.com
```

### API Environment Variables

```bash
PORT=3002
SOLANA_NETWORK=mainnet-beta
CORS_ORIGIN=https://your-webapp.vercel.app
```

## 🔄 Continuous Deployment

The project includes GitHub Actions for automatic deployment:

### Setup GitHub Secrets

1. Go to your repository settings
2. Navigate to "Secrets and variables" → "Actions"
3. Add these secrets:
   ```
   VERCEL_TOKEN=your_vercel_token
   ORG_ID=your_vercel_org_id
   PROJECT_ID_WEBAPP=webapp_project_id
   PROJECT_ID_API=api_project_id
   ```

### Getting Vercel Tokens

```bash
# Install Vercel CLI if not already installed
npm install -g vercel

# Login and link projects
vercel login

# Get your team/org ID
vercel teams list

# Link your projects and get project IDs
cd packages/solanouns-webapp
vercel link
# Copy the project ID from .vercel/project.json

cd ../solanouns-api
vercel link
# Copy the project ID from .vercel/project.json

# Generate a token
vercel token add your-token-name
```

## 🌐 Custom Domain Setup

### Vercel Custom Domain

1. In Vercel dashboard, go to your project settings
2. Navigate to "Domains"
3. Add your custom domain (e.g., `solanouns.com`)
4. Configure DNS records as instructed by Vercel

### DNS Configuration

For your domain registrar, add these DNS records:

```bash
# For webapp (www.solanouns.com or solanouns.com)
Type: CNAME
Name: www (or @)
Value: cname.vercel-dns.com

# For API (api.solanouns.com)
Type: CNAME
Name: api
Value: cname.vercel-dns.com
```

## 📊 Monitoring & Analytics

### Vercel Analytics

1. Enable Vercel Analytics in project settings
2. Add `@vercel/analytics` to your webapp:

```bash
cd packages/solanouns-webapp
npm install @vercel/analytics
```

Add to your `main.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

// Add <Analytics /> component to your app
```

### Error Monitoring

Consider adding error monitoring:

```bash
# Sentry for error tracking
npm install @sentry/react @sentry/tracing
```

## 🔒 Security Checklist

- [ ] Enable HTTPS only
- [ ] Configure proper CORS origins
- [ ] Set up rate limiting for API
- [ ] Use environment variables for all secrets
- [ ] Enable Vercel's security headers
- [ ] Regular dependency updates

## 🧪 Testing Deployment

### Pre-deployment Checklist

```bash
# Test builds locally
pnpm build

# Test webapp
cd packages/solanouns-webapp
npm run build
npm run preview

# Test API
cd ../solanouns-api
npm run build
npm start

# Verify all links and functionality work
```

### Post-deployment Testing

1. **Webapp**: Test wallet connection, theme switching, responsive design
2. **API**: Test metadata endpoints `/metadata/1`, `/images/1.png`
3. **Performance**: Check Lighthouse scores
4. **Cross-browser**: Test on Chrome, Firefox, Safari, Edge

## 🐛 Troubleshooting

### Common Issues

**Build Fails on Vercel**
```bash
# Check Node.js version in vercel.json
{
  "functions": {
    "packages/solanouns-api/src/server.ts": {
      "runtime": "nodejs18.x"
    }
  }
}
```

**CORS Errors**
```typescript
// In API server.ts, ensure proper CORS setup
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3001'
}));
```

**Environment Variables Not Working**
- Ensure variables start with `VITE_` for webapp
- Redeploy after adding environment variables
- Check variable names match exactly

### Getting Help

1. Check [Vercel Documentation](https://vercel.com/docs)
2. Review [GitHub Actions logs](https://github.com/your-repo/actions)
3. Check Vercel function logs in dashboard
4. Open issues in your repository for community help

## 🎉 Go Live Checklist

- [ ] GitHub repository is public and well-documented
- [ ] Webapp deploys successfully on Vercel
- [ ] API deploys and metadata endpoints work
- [ ] Custom domains configured (if applicable)
- [ ] Analytics and monitoring enabled
- [ ] Social media accounts created
- [ ] Community Discord/Telegram set up
- [ ] Documentation is complete and accurate

Congratulations! Your Solanouns DAO is now live and ready for the community! 🎊