@echo off
REM Solanouns Deployment Setup Script for Windows
REM This script helps you deploy Solanouns to GitHub and Vercel

echo 🎭 Solanouns Deployment Setup
echo ==============================

REM Check if git is initialized
if not exist ".git" (
    echo Initializing git repository...
    git init
    git add .
    git commit -m "Initial commit: Solanouns DAO monorepo"
)

REM Check if remote origin exists
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo ❌ No git remote 'origin' found.
    echo Please create a GitHub repository and run:
    echo git remote add origin https://github.com/YOUR_USERNAME/solanouns-monorepo.git
    echo git push -u origin main
    pause
    exit /b 1
)

echo ✅ Git repository configured

REM Check if Vercel CLI is installed
vercel --version >nul 2>&1
if errorlevel 1 (
    echo Installing Vercel CLI...
    npm install -g vercel
)

echo ✅ Vercel CLI ready

REM Install dependencies
echo Installing dependencies...
pnpm install

REM Build packages to verify everything works
echo Building packages...
pnpm build

if errorlevel 1 (
    echo ❌ Build failed. Please check errors above.
    pause
    exit /b 1
)

echo ✅ All packages built successfully
echo.
echo 🚀 Ready for deployment!
echo.
echo Next steps:
echo 1. Push to GitHub: git push origin main
echo 2. Deploy webapp: cd packages\solanouns-webapp && vercel
echo 3. Deploy API: cd packages\solanouns-api && vercel
echo.
echo Or use the one-click Vercel deployment buttons in README.md
echo.
echo 📚 See docs\DEPLOYMENT.md for detailed instructions
pause