import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { 
  useFonts, 
  Montserrat_900Black, 
  Montserrat_700Bold 
} from '@expo-google-fonts/montserrat';
import { 
  Inter_400Regular, 
  Inter_500Medium 
} from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// Mantenemos la pantalla de carga hasta que el sistema esté listo
SplashScreen.preventAutoHideAsync();

const THEME = {
  black: '#000000',
  teal: '#008080',
  white: '#FFFFFF',
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Montserrat-Black': Montserrat_900Black,
    'Montserrat-Bold': Montserrat_700Bold,
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
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
      {/* StatusBar en light para que resalte sobre el fondo negro */}
      <StatusBar style="light" />
      
      <Stack
  screenOptions={{
    headerStyle: {
      backgroundColor: THEME.black,
    },
    headerTintColor: THEME.teal,
    headerTitleStyle: {
      fontFamily: 'Montserrat-Bold',
      fontSize: 14,
      // Se eliminó letterSpacing de aquí para evitar el error TS2353
    },
    contentStyle: { backgroundColor: THEME.black },
    animation: 'fade',
    headerShadowVisible: false, 
  }}
>
        {/* Pantallas de Inicio y Registro */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen 
          name="register" 
          options={{ 
            title: 'REGISTRO_SISTEMA',
            headerShown: true 
          }} 
        />
        
        {/* Dashboard Principal */}
        <Stack.Screen name="home" options={{ headerShown: false }} />
        
        {/* Secciones de Contenido */}
        <Stack.Screen 
          name="holograma" 
          options={{ 
            title: 'DATA_PRISMA',
            headerShown: true 
          }} 
        />
        
        <Stack.Screen 
          name="chat" 
          options={{ 
            title: 'NEURAL_INTERFACE',
            headerShown: false // Lo manejamos interno para el estilo personalizado
          }} 
        />

        {/* Vista del Holograma (Modo inmersivo total) */}
        <Stack.Screen 
          name="hologram-view" 
          options={{ 
            headerShown: false, // Máxima oscuridad
            presentation: 'fullScreenModal',
            animation: 'fade'
          }} 
        />
        
        <Stack.Screen 
          name="tutorial" 
          options={{ 
            title: 'LEARNING_MODULE',
            headerShown: true 
          }} 
        />
      </Stack>
    </>
  );
}