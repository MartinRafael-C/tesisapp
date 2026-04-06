import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

export const notificationAdapter = {
  // Configura el comportamiento visual de la notificación
  setHandler: () => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true, // Fix Error 2322
        shouldShowList: true,   // Fix Error 2322
      }),
    });
  },

  // Proceso para obtener permisos y el Token del dispositivo
  registerForPushNotificationsAsync: async () => {
    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#D4AF37', // Color dorado de tu app
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
        return undefined;
      }
      
      // Obtiene el ID del proyecto desde app.json automáticamente
      const projectId = Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId;
      
      token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
    } else {
      console.log('Aviso: Las notificaciones push requieren un dispositivo físico.');
    }

    return token;
  },
};