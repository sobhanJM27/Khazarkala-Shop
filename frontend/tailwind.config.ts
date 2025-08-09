/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'selector',
  theme: {
    extend: {
      fontFamily: {
        body: [
          'Vazirmatn',
          'Inter',
          'system-ui',
          'Avenir',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        'main-primary-bg': 'rgba(var(--primary-bg-color))',
        'main-secondary-bg': 'rgba(var(--secondary-bg-color))',
        'main-primary-text': 'rgba(var(--primary-text-color))',
        'main-secondary-text': 'rgba(var(--secondary-text-color))',
        'main-black': 'rgba(var(--black-color))',
        'main-white': 'rgba(var(--white-color))',
        'main-red': 'rgba(var(--red-color))',
        'main-yellow': 'rgba(var(--yellow-color))',
        'main-gray': {
          50: '#D6D7D9',
          100: '#B8BBBF',
          200: '#898F98',
          300: '#484D57',
          400: '#2E323A',
          500: '#1A1C21',
        },
        'main-brown': {
          50: '#FFFCE5',
          100: '#FFF5B8',
          200: '#FFEC80',
          300: '#FFE34A',
          400: '#FFDA1C',
          500: '#FFD700',
          600: '#E6BF00',
          700: '#B38F00',
          800: '#806600',
          900: '#4D3D00',
        },
      },
      boxShadow: {
        'card-hover': '0 5px 0 0 #070d04',
        'card-effect': '0 12px 16px 0 rgba(19, 32, 17, 0.05)',
        'box-shadow-1': '0 4px 4px 0 rgba(31, 34, 39, 0.08)',
        'box-shadow-2': '0 4px 8px 0 rgba(31, 34, 39, 0.08)',
        'box-shadow-3': '0 4px 16px 0 rgba(31, 34, 39, 0.08)',
        'box-shadow-4': '0 4px 24px 0 rgba(31, 34, 39, 0.06)',
      },
      borderRadius: {
        big: '1.375rem',
        small: '0.825rem',
      },
      keyframes: {
        jump765: {
          '0%, 80%, 100%': { transform: 'scale(0)' },
          '40%': { transform: 'scale(2.0)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateX(10px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        jump765_dot1: 'jump765 1.6s -0.32s linear infinite',
        jump765_dot2: 'jump765 1.6s -0.16s linear infinite',
        jump765_dot3: 'jump765 1.6s linear infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
        'fade-in': 'fade-in 0.5s ease-out forwards',
      },
      screens: {
        'product-sidebar': { max: '1000px' },
        'article-sidebar': { max: '700px' },
        sidebar: { max: '820px' },
        mobile: { max: '500px' },
        article: { max: '600px' },
        'mobile-navbar': { max: '640px' },
      },
    },
  },
  plugins: [],
};
