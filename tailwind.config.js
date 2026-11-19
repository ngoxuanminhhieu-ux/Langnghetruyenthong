/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        heritage: {
          dark: '#17382D',       // Xanh lá đậm
          forest: '#0E231C',     // Xanh đậm huyền bí
          moss: '#294638',       // Xanh rêu
          cream: '#F5F0E5',      // Màu kem
          gold: '#B69A68',       // Màu vàng đồng
          goldLight: '#D4BA88',  // Vàng sáng
          wood: '#49372A',       // Màu nâu gỗ
          woodDark: '#2B1E16',   // Nâu mun
          ivory: '#FFFDF7',      // Màu trắng ngà
          border: 'rgba(182, 154, 104, 0.25)',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(23, 56, 45, 0.15)',
        'luxury-gold': '0 10px 30px -10px rgba(182, 154, 104, 0.3)',
        'pearl': '0 8px 32px 0 rgba(182, 154, 104, 0.18)',
      },
      backgroundImage: {
        'pearl-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(245,240,229,0.3) 50%, rgba(182,154,104,0.2) 100%)',
        'dark-gradient': 'linear-gradient(180deg, #17382D 0%, #0E231C 100%)',
      }
    },
  },
  plugins: [],
}
