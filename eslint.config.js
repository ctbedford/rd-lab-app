import globals from 'globals';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactNative from 'eslint-plugin-react-native';
import prettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier'; // Used to disable ESLint rules that conflict with Prettier

export default [
  {
    ignores: [
      'node_modules/',
      '.expo/',
      'android/',
      'ios/',
      'build/',
      'dist/',
      '*.lock',
    ],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        'react-native/react-native': true, // For react-native globals
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react,
      'react-hooks': reactHooks,
      'react-native': reactNative,
      prettier,
    },
    rules: {
      ...tseslint.configs.recommended.rules, // Base TypeScript rules
      ...react.configs.recommended.rules, // Base React rules
      ...reactHooks.configs.recommended.rules, // Base React Hooks rules
      ...reactNative.configs.all.rules, // All React Native rules
      ...eslintConfigPrettier.rules, // Disables conflicting rules
      'prettier/prettier': 'error', // Runs Prettier as an ESLint rule
      'react/prop-types': 'off', // We use TypeScript for prop types
      'react/react-in-jsx-scope': 'off', // Not needed with new JSX transform
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'react-native/no-raw-text': ['warn', { skip: ['Button'] }],
      'react-native/no-color-literals': 'warn', // Re-enable (or 'error')
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
