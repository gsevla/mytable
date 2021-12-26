// @generated: @expo/next-adapter@3.1.0
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'next/router';

export default function App() {
  const router = useRouter();
  const isClientAuthorized = false;

  useEffect(() => {
    if (!isClientAuthorized) {
      console.log('entrou');
      router.push('/auth');
    }
  }, [isClientAuthorized]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Expo + Next.js 👋</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
});
