import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  Alert, ActivityIndicator, SafeAreaView, KeyboardAvoidingView, Platform 
} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../services/supabaseConfig';
import * as Notifications from 'expo-notifications';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Atención", "Por favor ingresa tus credenciales.");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      Alert.alert("Error de acceso", "Correo o contraseña incorrectos");
      setLoading(false);
      return;
    }

    if (data.user) {
      try {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "¡Bienvenido de vuelta! 👋",
            body: "Qué alegría verte de nuevo en el oratorio.",
            sound: true,
          },
          trigger: null,
        });
      } catch (e) { console.log("Notificación local no disponible"); }
      
      router.replace('/home');
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={styles.content}>
          <Text style={styles.title}>Oratorio Digital</Text>
          <Text style={styles.subtitle}>"Dadme almas, llevaos lo demás"</Text>

          <View style={styles.form}>
            <TextInput
              placeholder="Correo electrónico"
              style={styles.input}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor="#999"
            />
            <TextInput
              placeholder="Contraseña"
              style={styles.input}
              secureTextEntry
              onChangeText={setPassword}
              placeholderTextColor="#999"
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
              {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>ENTRAR AL ORATORIO</Text>}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/register')}>
              <Text style={styles.link}>¿No tienes cuenta? Regístrate aquí</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDFBF0' },
  content: { flex: 1, padding: 30, justifyContent: 'center' },
  title: { fontFamily: 'Cinzel-Bold', fontSize: 36, textAlign: 'center', color: '#333' },
  subtitle: { textAlign: 'center', color: '#B8860B', marginBottom: 40, fontSize: 14, fontStyle: 'italic' },
  form: { gap: 15 },
  input: { backgroundColor: '#FFF', padding: 18, borderRadius: 12, borderWidth: 1, borderColor: '#E0E0E0' },
  button: { 
    backgroundColor: '#B8860B', padding: 20, borderRadius: 12, alignItems: 'center',
    elevation: 4, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 4 
  },
  buttonText: { color: '#FFF', fontFamily: 'Cinzel-Bold', fontSize: 16, letterSpacing: 1 },
  link: { textAlign: 'center', marginTop: 25, color: '#666', textDecorationLine: 'underline' }
});