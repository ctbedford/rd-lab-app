// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './index.ts', // Ensure this is correct if you have an index.ts
    './src/**/*.{js,jsx,ts,tsx}',
    // Add any other component paths if necessary
  ],
  presets: [require('nativewind/preset')], // <-- Add this line
  theme: {
    extend: {},
  },
  plugins: [],
};