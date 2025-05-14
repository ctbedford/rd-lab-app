// tailwind.config.js
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './index.ts', // For NativeWind v4, ensure index.ts is included if it exists
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
