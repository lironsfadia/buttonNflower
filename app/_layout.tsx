import '../global.css';

import { useFonts, Heebo_400Regular, Heebo_700Bold } from '@expo-google-fonts/heebo';
import { Stack, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { Pressable, useColorScheme, View } from 'react-native';
import IOSBackArrowRight from '~/components/IOSBackArrowRight';

import AuthProvider from '~/contexts/authProvider';
import SplashScreen from '~/screens/SplashScreen/SplashScreen';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Heebo_400Regular,
    Heebo_700Bold,
  });

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

  if (!appIsReady || !fontsLoaded) {
    return (
      <View className="flex-1 justify-center align-middle">
        <SplashScreen />
      </View>
    );
  }

  return (
    // protected paths.
    <AuthProvider>
      <Stack
        screenOptions={{
          headerBackTitleVisible: false,

          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
          },
          headerTitleStyle: {
            fontFamily: 'Heebo_700Bold',
          },
          headerLeft: ({ canGoBack }) =>
            canGoBack ? (
              <Pressable onPress={() => router.back()}>
                <IOSBackArrowRight />
              </Pressable>
            ) : null,
        }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: true }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </AuthProvider>
  );
}
