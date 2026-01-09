import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Earthy Admin Colors
        sage: {
          50: '#f6f8f6',
          100: '#e3e9e3',
          200: '#c7d3c7',
          300: '#a3b5a3',
          400: '#7d947d',
          500: '#6B8E6F',
          600: '#567256',
          700: '#455b45',
          800: '#384a38',
          900: '#2f3e2f',
        },
        terracotta: {
          50: '#fdf5f3',
          100: '#fbe8e4',
          200: '#f7d0c8',
          300: '#f0afa1',
          400: '#e6836f',
          500: '#C97064',
          600: '#b04d3f',
          700: '#933f33',
          800: '#7a362d',
          900: '#66312a',
        },
        sand: {
          50: '#faf9f7',
          100: '#f5f3ef',
          200: '#ebe7dd',
          300: '#ddd6c7',
          400: '#cdc2ad',
          500: '#b8a88e',
          600: '#a08d73',
          700: '#85745f',
          800: '#6e6050',
          900: '#5c5144',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair-display)', 'Georgia', 'serif'],
        sackers: ['var(--font-sackers)', 'Georgia', 'serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
    },
  },
};

export default config;
