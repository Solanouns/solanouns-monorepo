/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Solana-themed color palette inheriting NounsDAO structure
        'solana-purple': '#9945FF',           // Solana's signature purple
        'solana-purple-dark': '#7C3AED',     // Darker purple variant
        'solana-purple-light': '#C084FC',    // Lighter purple variant
        'solana-green': '#14F195',           // Solana's bright green
        'solana-green-dark': '#10B981',      // Darker green
        'solana-cyan': '#00D4FF',            // Solana cyan accent
        'solana-pink': '#DC1FFF',            // Solana hot pink
        'solana-black': '#000000',           // Pure black
        'solana-gray': '#6B7280',            // Medium gray
        'solana-light-gray': '#E5E7EB',      // Light gray
        'solana-warm': '#FEF3C7',            // Warm cream background
        'solana-cool': '#F3F4F6',            // Cool light background
        
        // Dark mode specific colors
        'dark-bg': '#0F0F23',                // Deep purple-black background
        'dark-bg-secondary': '#1A1A2E',      // Secondary dark background
        'dark-bg-tertiary': '#16213E',       // Tertiary dark background
        'dark-text': '#E2E8F0',             // Light text for dark mode
        'dark-text-secondary': '#94A3B8',    // Secondary text for dark mode
        'dark-border': '#334155',            // Dark mode borders
        
        // Brand colors mapping to Solana theme
        'brand-primary': '#9945FF',          // Solana purple as primary
        'brand-secondary': '#14F195',        // Solana green as secondary
        'brand-accent': '#00D4FF',           // Solana cyan as accent
        'brand-danger': '#DC1FFF',           // Solana pink for alerts
        'brand-background': '#F3F4F6',       // Light cool background
        'brand-warm-background': '#FEF3C7',  // Warm background
        'brand-text-primary': '#111827',     // Dark text
        'brand-text-secondary': '#6B7280',   // Gray text
        'brand-border': '#D1D5DB',           // Border color
        
        // Keep NounsDAO structure with Solana colors
        'brand-cool-background': '#F3F4F6',
        'brand-cool-border': '#D1D5DB',
        'brand-cool-dark-text': '#111827',
        'brand-cool-light-text': '#6B7280',
        'brand-dark-red': '#DC1FFF',         // Replace red with Solana pink
        'brand-color-green': '#14F195',      // Solana green
        'brand-color-blue': '#9945FF',       // Solana purple
        'brand-color-red': '#DC1FFF',        // Solana pink
        'brand-gray-light-text': '#6B7280',
        'brand-black': '#000000',
        'brand-light-green': '#10B981',
        'brand-bg-green': '#ECFDF5',
        
        // Legacy compatibility
        'nouns-warm': '#FEF3C7',
        'nouns-cool': '#F3F4F6',
        'nouns-black': '#111827',
        'nouns-gray': '#6B7280',
        'nouns-light-gray': '#D1D5DB',
        'nouns-red': '#DC1FFF',
        'nouns-blue': '#9945FF',
        'nouns-green': '#14F195',
        'solanouns-bg': '#F3F4F6',
        'solanouns-warm': '#FEF3C7',
        'solanouns-black': '#111827',
        'solanouns-white': '#FFFFFF',
      },
      backgroundImage: {
        'solana-gradient': 'linear-gradient(135deg, #9945FF 0%, #14F195 100%)',
        'solana-gradient-reverse': 'linear-gradient(135deg, #14F195 0%, #9945FF 100%)',
        'solana-gradient-dark': 'linear-gradient(135deg, #7C3AED 0%, #10B981 100%)',
        'solana-purple-gradient': 'linear-gradient(135deg, #9945FF 0%, #DC1FFF 100%)',
        'solana-cyan-gradient': 'linear-gradient(135deg, #00D4FF 0%, #9945FF 100%)',
      },
      fontFamily: {
        'londrina': ['Londrina Solid', 'sans-serif'],
        'pt-root': ['PT Root UI', 'system-ui', 'sans-serif'],
        'nouns': ['Londrina Solid', 'sans-serif'],
        'solanouns': ['Londrina Solid', 'PT Root UI', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'nouns-xs': ['12px', { lineHeight: '1.2' }],
        'nouns-sm': ['14px', { lineHeight: '1.2' }],
        'nouns-base': ['16px', { lineHeight: '1.2' }],
        'nouns-lg': ['18px', { lineHeight: '1.2' }],
        'nouns-xl': ['22px', { lineHeight: '1.2' }],
        'nouns-2xl': ['32px', { lineHeight: '1.1' }],
        'nouns-3xl': ['40px', { lineHeight: '1.1' }],
        'nouns-4xl': ['42px', { lineHeight: '1.1' }],
        'nouns-5xl': ['56px', { lineHeight: '1.1' }],
      },
      animation: {
        'gradient': 'gradient 3s ease infinite',
        'pulse-solana': 'pulse-solana 2s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'pulse-solana': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
      },
    },
  },
  plugins: [],
}