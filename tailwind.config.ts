import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#0d9488',
          600: '#0f766e',
          700: '#115e59',
          800: '#134e4a',
          900: '#042f2e',
        },
        background: {
          light: '#ffffff',
          dark: '#0a0b0d',
        },
        surface: {
          light: '#f8f9fa',
          dark: '#141519',
        },
        border: {
          light: '#e5e7eb',
          dark: '#2d2f36',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out both',
        'slide-up-delay-1': 'slideUp 0.6s ease-out 0.15s both',
        'slide-up-delay-2': 'slideUp 0.6s ease-out 0.30s both',
        'slide-up-delay-3': 'slideUp 0.6s ease-out 0.45s both',
        'float': 'float 7s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out 2s infinite',
        'float-slower': 'float 13s ease-in-out 5s infinite',
        'aurora': 'aurora 14s ease-in-out infinite',
        'aurora-slow': 'aurora 20s ease-in-out 4s infinite',
        'aurora-slower': 'aurora 26s ease-in-out 8s infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
        'gradient': 'gradient 6s ease infinite',
        'ping-slow': 'ping 2.5s cubic-bezier(0,0,0.2,1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(22px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        aurora: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.75' },
          '25%': { transform: 'translate(50px, -35px) scale(1.12)', opacity: '1' },
          '75%': { transform: 'translate(-30px, 22px) scale(0.92)', opacity: '0.65' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
