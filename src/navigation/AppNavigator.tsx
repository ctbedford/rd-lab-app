import React from 'react';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import Screens
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ExperimentListScreen from '../screens/ExperimentListScreen';
import HabitListScreen from '../screens/HabitListScreen';
import ReviewScreen from '../screens/ReviewScreen';
import SettingsScreen from '../screens/SettingsScreen';

// Define Param Lists for Navigators
export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Experiments: undefined;
  Habits: undefined;
  Review: undefined;
  Settings: undefined;
};

// For the RootStack, we nest the other navigators
// We use NavigatorScreenParams to correctly type nested navigators
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  // Potentially add other top-level modal screens here later if needed
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainTabs = createBottomTabNavigator<MainTabParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

// Auth Stack Navigator (Login, Signup)
const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
    </AuthStack.Navigator>
  );
};

// Main App Bottom Tab Navigator
const MainTabsNavigator = () => {
  return (
    <MainTabs.Navigator screenOptions={{ headerShown: true }}>
      <MainTabs.Screen name="Dashboard" component={DashboardScreen} />
      <MainTabs.Screen name="Experiments" component={ExperimentListScreen} />
      <MainTabs.Screen name="Habits" component={HabitListScreen} />
      <MainTabs.Screen name="Review" component={ReviewScreen} />
      <MainTabs.Screen name="Settings" component={SettingsScreen} />
    </MainTabs.Navigator>
  );
};

// Root Navigator (Conditionally renders Auth or Main flow)
const AppNavigator = () => {
  // TODO: Replace with actual authentication state from context/store
  const isAuthenticated = false; // Simulate unauthenticated state for now

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <RootStack.Screen name="Main" component={MainTabsNavigator} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthStackNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
