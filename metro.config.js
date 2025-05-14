// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { 
    input: './src/globals.css', // Path to your global CSS file
    // Optional: reactNativeStyleContent: true, // For some advanced use cases
});