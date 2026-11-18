/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        azulInstitucional: '#0F2C59',
        celesteCivico: '#1D5D9B',
        doradoOcre: '#D4AF37',
      }
    },
  },
  plugins: [],
}