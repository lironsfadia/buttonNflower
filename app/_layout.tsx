import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import '../global.css';

import { ErrorBoundary, SplashScreen, Stack } from 'expo-router';
import { useState, useEffect } from 'react';
import { useColorScheme, View } from 'react-native';
import AuthProvider from '~/contexts/authProvider';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  // const [loaded] = useFonts({
  //   SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  // });
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make API calls, etc.
        // Simulate loading - replace with your actual initialization code
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  // Hide splash screen once app is ready
  useEffect(() => {
    if (appIsReady) {
      console.log('App is ready, hiding splash screen');
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  return (
    // protected paths.
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </AuthProvider>
  );
}
