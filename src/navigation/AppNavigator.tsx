import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, ActivityIndicator } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

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

export type MainTabsParamList = {
  Dashboard: undefined;
  Experiments: undefined;
  Habits: undefined;
  Review: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  AuthFlow: undefined; 
  MainFlow: undefined; 
};

const Stack = createNativeStackNavigator<RootStackParamList>(); 
const AuthStackNav = createNativeStackNavigator<AuthStackParamList>();
const MainTabsNav = createBottomTabNavigator<MainTabsParamList>();

// Auth Stack Navigator (Login, Signup)
const AuthStack = () => (
  <AuthStackNav.Navigator screenOptions={{ headerShown: false }}>
    <AuthStackNav.Screen name="Login" component={LoginScreen} />
    <AuthStackNav.Screen name="Signup" component={SignupScreen} />
  </AuthStackNav.Navigator>
);

// Main App Bottom Tab Navigator
const MainTabs = () => (
  <MainTabsNav.Navigator screenOptions={{ headerShown: true }}>
    <MainTabsNav.Screen name="Dashboard" component={DashboardScreen} />
    <MainTabsNav.Screen name="Experiments" component={ExperimentListScreen} />
    <MainTabsNav.Screen name="Habits" component={HabitListScreen} />
    <MainTabsNav.Screen name="Review" component={ReviewScreen} />
    <MainTabsNav.Screen name="Settings" component={SettingsScreen} />
  </MainTabsNav.Navigator>
);

// Root Navigator (Conditionally renders Auth or Main flow)
const AppNavigator = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading session...</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {session && session.user ? (
        <Stack.Screen name="MainFlow" component={MainTabs} />
      ) : (
        <Stack.Screen name="AuthFlow" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
