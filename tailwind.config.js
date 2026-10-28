/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#040806',
          900: '#07110c',
          850: '#0a1610',
          800: '#0d1c14',
          700: '#13291d',
          600: '#1b3a29',
          500: '#27513a',
        },
        accent: {
          DEFAULT: '#b6ff3b',
          dim: '#8fd12a',
          deep: '#4f7a10',
        },
        signal: {
          cyan: '#38e8ff',
          amber: '#ffbf3b',
          red: '#ff5d5d',
          mint: '#3be8a5',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(182,255,59,0.35), 0 0 24px rgba(182,255,59,0.18)',
        card: '0 1px 0 rgba(255,255,255,0.03) inset, 0 8px 24px rgba(0,0,0,0.35)',
      },
      keyframes: {
        pass: {
          '0%': { strokeDashoffset: '120' },
          '100%': { strokeDashoffset: '0' },
        },
        floaty: {
          '0%,100%': { transform: 'translate(-50%, -50%) scale(1)' },
          '50%': { transform: 'translate(-50%, -50%) scale(1.12)' },
        },
        rise: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        sheetUp: {
          '0%': { transform: 'translateY(24px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        pass: 'pass 2.4s ease-in-out infinite alternate',
        floaty: 'floaty 2.8s ease-in-out infinite',
        rise: 'rise 0.35s ease-out both',
        sheetUp: 'sheetUp 0.22s ease-out both',
      },
    },
  },
  plugins: [],
};
