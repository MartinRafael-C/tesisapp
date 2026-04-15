import { useState, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { Platform, LogBox } from 'react-native';
import * as Device from 'expo-device';

// Silenciamos el aviso de Android Push para Expo Go
LogBox.ignoreLogs(['expo-notifications: Android Push notifications']);

export const usePushNotifications = () => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  useEffect(() => {
    // Solo pedimos permisos para notificaciones locales
    registerForLocalNotificationsAsync().then(granted => {
      setHasPermission(!!granted);
    });
  }, []);

  return { hasPermission };
};

async function registerForLocalNotificationsAsync() {
  // 1. Configurar canal en Android (Obligatorio para que se vean)
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#008080',
    });
  }

  // 2. Verificar si es dispositivo o simulador y pedir permiso
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  
  if (finalStatus !== 'granted') {
    console.log('Permiso de notificaciones locales no concedido');
    return false;
  }

  return true;
}