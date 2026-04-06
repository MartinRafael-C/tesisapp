import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts, Cinzel_700Bold, Cinzel_400Regular } from '@expo-google-fonts/cinzel';
import { Lato_400Regular, Lato_300Light } from '@expo-google-fonts/lato';
import * as SplashScreen from 'expo-splash-screen';
import { Colors } from '../constants/Colors';
import { StatusBar } from 'expo-status-bar';

// Evita que la pantalla de carga se oculte antes de cargar las fuentes
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Cinzel-Bold': Cinzel_700Bold,
    'Cinzel-Regular': Cinzel_400Regular,
    'Lato-Regular': Lato_400Regular,
    'Lato-Light': Lato_300Light,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerTintColor: Colors.text,
          headerTitleStyle: {
            fontFamily: 'Cinzel-Bold',
            fontSize: 18,
          },
          contentStyle: { backgroundColor: Colors.background },
          // Animación de transición suave
          animation: 'fade_from_bottom',
        }}
      >
        {/* Definición de rutas */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ title: 'Inscripción' }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="tutorial" options={{ title: 'Construcción' }} />
        <Stack.Screen name="chat" options={{ title: 'Conversación con el Santo' }} />
        <Stack.Screen name="hologram-view" options={{ 
            title: 'Holograma',
            headerStyle: { backgroundColor: '#000' },
            headerTintColor: '#FFF' 
        }} />
      </Stack>
    </>
  );
}