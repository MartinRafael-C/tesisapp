import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  Alert, ActivityIndicator, SafeAreaView, KeyboardAvoidingView, Platform 
} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../services/supabaseConfig';
import * as Notifications from 'expo-notifications';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const THEME = {
  black: '#000000',
  petroleo: '#002626',
  white: '#FFFFFF',
  teal: '#008080',
  grayDark: '#1A1A1A',
  glass: 'rgba(255, 255, 255, 0.1)'
};

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("SISTEMA", "CREDENCIALES REQUERIDAS");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      Alert.alert("ERROR_AUTH", "ACCESO DENEGADO: VERIFIQUE DATOS");
      setLoading(false);
      return;
    }

    if (data.user) {
      try {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "SISTEMA ONLINE",
            body: "Bienvenido, hijo mío. Iniciando interfaz oratorio.",
            sound: true,
          },
          trigger: null,
        });
      } catch (e) { console.log("Notify skip"); }
      
      router.replace('/home');
    }
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: THEME.black }}>
      <LinearGradient colors={['#002626', '#000000']} style={StyleSheet.absoluteFill} />
      
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          style={{ flex: 1 }}
        >
          <View style={styles.content}>
            {/* Header Visual */}
            <View style={styles.logoContainer}>
              <View style={styles.iconCircle}>
                <Ionicons name="shield-checkmark-outline" size={40} color={THEME.teal} />
              </View>
              <Text style={styles.systemCode}>AUTH_LOGIN_v1.0</Text>
              <Text style={styles.title}>ORATORIO</Text>
              <Text style={[styles.title, styles.outlineText]}>DIGITAL</Text>
            </View>

            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>USUARIO_EMAIL</Text>
                <TextInput
                  placeholder="admin@oratorio.com"
                  style={styles.input}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  placeholderTextColor="rgba(0, 128, 128, 0.3)"
                  selectionColor={THEME.teal}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>PASSWORD_KEY</Text>
                <TextInput
                  placeholder="••••••••"
                  style={styles.input}
                  secureTextEntry
                  onChangeText={setPassword}
                  placeholderTextColor="rgba(0, 128, 128, 0.3)"
                  selectionColor={THEME.teal}
                />
              </View>

              <TouchableOpacity 
                style={[styles.button, loading && styles.buttonDisabled]} 
                onPress={handleLogin} 
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={THEME.white} />
                ) : (
                  <Text style={styles.buttonText}>INICIAR_SESIÓN</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.linkContainer} 
                onPress={() => router.push('/register')}
              >
                <Text style={styles.link}>CREAR NUEVO PERFIL DE ACCESO</Text>
                <View style={styles.linkLine} />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 30, justifyContent: 'center' },
  logoContainer: { alignItems: 'center', marginBottom: 50 },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: THEME.teal,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(0, 128, 128, 0.05)'
  },
  systemCode: {
    color: THEME.teal,
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    letterSpacing: 3,
    marginBottom: 10
  },
  title: { 
    fontFamily: 'Montserrat-Black', 
    fontSize: 42, 
    textAlign: 'center', 
    color: THEME.white,
    lineHeight: 40
  },
  outlineText: {
    color: 'transparent',
    textShadowColor: THEME.white,
    textShadowRadius: 1,
    textShadowOffset: { width: 1, height: 1 },
  },
  form: { gap: 25 },
  inputContainer: { gap: 8 },
  inputLabel: {
    color: THEME.teal,
    fontSize: 10,
    fontFamily: 'Montserrat-Bold',
    marginLeft: 4
  },
  input: { 
    backgroundColor: THEME.grayDark, 
    padding: 18, 
    borderRadius: 2, 
    borderWidth: 1, 
    borderColor: THEME.glass,
    color: THEME.white,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace'
  },
  button: { 
    backgroundColor: THEME.teal, 
    padding: 20, 
    borderRadius: 2, 
    alignItems: 'center',
    marginTop: 10,
    shadowColor: THEME.teal,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { 
    color: THEME.white, 
    fontFamily: 'Montserrat-Black', 
    fontSize: 14, 
    letterSpacing: 2 
  },
  linkContainer: { marginTop: 20, alignItems: 'center' },
  link: { 
    color: 'rgba(255,255,255,0.5)', 
    fontSize: 11, 
    fontFamily: 'Inter-Medium',
    letterSpacing: 1
  },
  linkLine: {
    width: 40,
    height: 1,
    backgroundColor: THEME.teal,
    marginTop: 8,
    opacity: 0.5
  }
});