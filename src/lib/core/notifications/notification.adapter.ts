import * as Notifications from 'expo-notifications';
import { Platform, LogBox } from 'react-native';

// Silenciamos el error antes de que aparezca
LogBox.ignoreLogs(['expo-notifications: Android Push notifications']);

export const notificationAdapter = {
  // Configuración inicial
  init: () => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });
  },

  // Pedir permisos (Sin buscar Tokens de Push)
  requestPermissions: async () => {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
      });
    }
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  },

  // Función genérica para enviar notificaciones desde cualquier pantalla
  sendLocalNotification: async (title: string, body: string) => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: { title, body, sound: true },
        trigger: null, // Inmediato
      });
    } catch (error) {
      console.log("Error enviando notificación local");
    }
  }
};