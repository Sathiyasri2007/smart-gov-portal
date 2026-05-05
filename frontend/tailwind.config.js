/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Blue-Grey Professional Palette
        'blue-grey': {
          50: '#f8f9fa',
          100: '#e9ecef',
          200: '#dee2e6',
          300: '#ced4da',
          400: '#adb5bd',
          500: '#9FA2A4', // Soft light grey-blue
          600: '#868e96',
          700: '#68727A', // Deep blue-grey
          800: '#495057',
          900: '#343a40',
        },
        primary: {
          DEFAULT: '#68727A',
          light: '#868e96',
          lighter: '#9FA2A4',
          dark: '#495057',
        },
        secondary: {
          DEFAULT: '#9FA2A4',
          light: '#ced4da',
          lighter: '#e9ecef',
          dark: '#868e96',
        },
      },
    }
  },
  plugins: []
};
