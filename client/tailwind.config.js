/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'] },
      fontSize: { '2xs': ['0.65rem', { lineHeight: '1rem' }] },
      colors: {
        brand: {
          50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd',
          400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8',
        },
      },
      boxShadow: {
        'soft':       '0 2px 16px -2px rgba(0,0,0,0.06)',
        'card':       '0 4px 24px -4px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 40px -8px rgba(99,102,241,0.2)',
        'brand':      '0 4px 24px -4px rgba(99,102,241,0.4)',
        'brand-lg':   '0 8px 40px -8px rgba(99,102,241,0.5)',
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        'dot-pattern':  "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%236366f1' fill-opacity='0.06' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-up':    'fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'marquee':    'marquee 24s linear infinite',
      },
      keyframes: {
        fadeUp:  { '0%': { opacity:'0', transform:'translateY(22px)' }, '100%': { opacity:'1', transform:'translateY(0)' } },
        marquee: { '0%': { transform:'translateX(0)' }, '100%': { transform:'translateX(-50%)' } },
      },
    },
  },
  plugins: [],
};
