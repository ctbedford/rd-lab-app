import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { supabase } from '../lib/supabase'; // Import Supabase client
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AppNavigator';

type SignupScreenProps = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: supabaseError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (supabaseError) {
        throw supabaseError;
      }

      if (data.session) {
        // This case might happen if auto-confirm is on or if it's a social provider (not used here)
        // For email/password, usually a confirmation email is sent.
        Alert.alert('Signup Success', 'You are now logged in and a session was created.');
      } else if (data.user && !data.session) {
        // User exists but session is null - means confirmation email sent
        Alert.alert('Signup Successful', 'Please check your email to confirm your account.');
      } else {
        // Should not happen with email/password if user exists, but as a fallback
        Alert.alert('Signup Initiated', 'Please check your email for a confirmation link.');
      }
      // Navigation will be handled by AppNavigator once email is confirmed and user logs in
      // or if Supabase automatically signs them in (depends on project settings)
    } catch (e: any) {
      console.error('Signup error:', e.message);
      setError(e.message || 'An unexpected error occurred during sign up.');
      Alert.alert('Signup Failed', e.message || 'Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-6 bg-gray-100">
      <Text className="text-3xl font-bold mb-8 text-gray-800">Create Account</Text>

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
          onPress={handleSignup}
          disabled={loading}
        >
          <Text className="text-white text-lg font-semibold">Sign Up</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => navigation.goBack()} className="mt-6">
        <Text className="text-indigo-600 hover:text-indigo-500">
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;
