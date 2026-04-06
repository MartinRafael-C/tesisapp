import { useState, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import Constants from 'expo-constants'; // Requerido para leer el projectId
import { supabase } from '../../../../services/supabaseConfig';

export const usePushNotifications = () => {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      setExpoPushToken(token);
      if (token) saveTokenToSupabase(token);
    });
  }, []);

  const saveTokenToSupabase = async (token: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      await supabase
        .from('profiles')
        .update({ push_token: token })
        .eq('id', session.user.id);
    }
  };

  return { expoPushToken };
};

async function registerForPushNotificationsAsync() {
  let token;

  // Configuración necesaria para Android
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      console.log('Permiso de notificaciones no concedido');
      return;
    }

    // Buscamos el ID en todas las ubicaciones posibles del manifiesto
    const projectId = 
      Constants?.expoConfig?.extra?.eas?.projectId ?? 
      Constants?.easConfig?.projectId;

    if (!projectId) {
      console.error("Error: No se encontró el projectId. Verifica app.json");
      return;
    }

    try {
      token = (await Notifications.getExpoPushTokenAsync({
        projectId: projectId,
      })).data;
      console.log("Token generado con éxito");
    } catch (e) {
      console.error("Error al obtener el token:", e);
    }
  } else {
    console.log('Notificaciones push requieren un dispositivo físico');
  }

  return token;
}