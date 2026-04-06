import { useState, useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { notificationAdapter } from './notification.adapter';
// Ajusta esta ruta si renombraste el archivo a .ts
import { supabase } from '../../../../services/supabaseConfig'; 

export const usePushNotifications = () => {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>('');
  const [notification, setNotification] = useState<Notifications.Notification | null>(null);
  
  // Tipamos los refs como Subscription de Expo
  const notificationListener = useRef<Notifications.EventSubscription | null>(null);
  const responseListener = useRef<Notifications.EventSubscription | null>(null);

  useEffect(() => {
    // 1. Registro de notificaciones
    notificationAdapter.registerForPushNotificationsAsync().then(token => {
      setExpoPushToken(token);
      if (token) saveTokenToSupabase(token);
    });

    // 2. Listener para notificaciones recibidas (App en primer plano)
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // 3. Listener para interacción (Cuando el usuario toca la notificación)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notificación tocada:', response.notification.request.content.data);
    });

    // LIMPIEZA CORREGIDA (Fix Error 2339)
    return () => {
      if (notificationListener.current) {
        notificationListener.current.remove(); // Método moderno .remove()
      }
      if (responseListener.current) {
        responseListener.current.remove(); // Método moderno .remove()
      }
    };
  }, []);

  const saveTokenToSupabase = async (token: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await supabase
          .from('profiles')
          .update({ push_token: token })
          .eq('id', session.user.id);
      }
    } catch (error) {
      console.error('Error persistiendo token:', error);
    }
  };

  return { expoPushToken, notification };
};