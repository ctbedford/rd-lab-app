import './src/globals.css'; // Import global styles for NativeWind
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/contexts/AuthContext'; // Import AuthProvider

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider> // Wrap with AuthProvider
        <AppNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}
