/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        kinopurple: {
          primary: '#8B5CF6',
          secondary: '#A78BFA',
          glow: 'rgba(139, 92, 246, 0.35)',
          subtle: 'rgba(139, 92, 246, 0.12)',
        },
        kinodark: {
          bg: '#0B0912',
          card: '#171326',
          surface: '#20192F',
          border: '#302542',
        },
        kinotext: {
          main: '#F5F3FF',
          muted: '#9991A8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Manrope', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-purple': '0 0 25px -5px rgba(139, 92, 246, 0.3)',
        'glow-purple-lg': '0 0 40px -5px rgba(139, 92, 246, 0.45)',
        'card': '0 10px 30px -10px rgba(0, 0, 0, 0.6)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to top, #0B0912 10%, rgba(11, 9, 18, 0.8) 50%, rgba(11, 9, 18, 0.2) 90%)',
        'purple-radial': 'radial-gradient(circle at top right, rgba(139, 92, 246, 0.15), transparent 70%)',
      },
    },
  },
  plugins: [],
};
