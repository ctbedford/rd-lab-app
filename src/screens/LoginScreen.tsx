import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { supabase } from '../lib/supabase'; // Import Supabase client
import { useAuth } from '../contexts/AuthContext'; // To potentially access auth methods if needed
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AppNavigator';

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // const { signIn } = useAuth(); // If we had a signIn method in AuthContext

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error: supabaseError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (supabaseError) {
        throw supabaseError;
      }
      // Navigation to Main stack will be handled by AppNavigator due to onAuthStateChange
      // Alert.alert('Login Success', 'You are now logged in.'); // Optional success message
    } catch (e: any) {
      console.error('Login error:', e.message);
      setError(e.message || 'An unexpected error occurred.');
      Alert.alert('Login Failed', e.message || 'Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-6 bg-gray-100">
      <Text className="text-3xl font-bold mb-8 text-gray-800">Login</Text>
      
      {error && (
        <Text className="text-red-500 mb-4 text-center">{error}</Text>
      )}

      <TextInput
        className="w-full h-12 border border-gray-300 rounded-lg px-4 mb-4 bg-white text-gray-700"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#9ca3af"
      />
      <TextInput
        className="w-full h-12 border border-gray-300 rounded-lg px-4 mb-6 bg-white text-gray-700"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#9ca3af"
      />
      
      {loading ? (
        <ActivityIndicator size="large" color="#4f46e5" />
      ) : (
        <TouchableOpacity
          className="w-full h-12 bg-indigo-600 rounded-lg justify-center items-center shadow-md"
          onPress={handleLogin}
          disabled={loading}
        >
          <Text className="text-white text-lg font-semibold">Login</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => navigation.navigate('Signup')} className="mt-6">
        <Text className="text-indigo-600 hover:text-indigo-500">
          Don't have an account? Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
