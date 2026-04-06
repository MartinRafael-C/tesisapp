import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
  Alert} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { supabase } from '../services/supabaseConfig';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Atención", "Por favor, introduce tus credenciales.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert("Error de Acceso", "No pudimos encontrar tu cuenta. Revisa tus datos.");
      setLoading(false);
    } else {
      setLoading(false);
      router.replace('/home');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.inner}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoSymbol}>DB</Text>
        </View>

        <Text style={styles.title}>Don Bosco</Text>
        <Text style={styles.subtitle}>SABIDURÍA & LUZ</Text>

        <View style={styles.form}>
          <TextInput
            placeholder="Correo del joven"
            placeholderTextColor={Colors.textSecondary}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Contraseña"
            placeholderTextColor={Colors.textSecondary}
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity 
            style={[styles.button, loading && { opacity: 0.7 }]} 
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "CARGANDO..." : "ENTRAR AL ORATORIO"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.registerLink} 
            onPress={() => router.push('/register')}
          >
            <Text style={styles.registerText}>
              ¿Eres nuevo? <Text style={styles.boldText}>Regístrate aquí</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  inner: { flex: 1, justifyContent: 'center', padding: 40 },
  logoContainer: {
    alignSelf: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoSymbol: { fontFamily: 'Cinzel-Bold', fontSize: 28, color: Colors.primary },
  title: { fontFamily: 'Cinzel-Bold', fontSize: 36, color: Colors.text, textAlign: 'center' },
  subtitle: { fontFamily: 'Lato-Light', fontSize: 14, color: Colors.primary, textAlign: 'center', letterSpacing: 3, marginBottom: 50 },
  form: { gap: 15 },
  input: {
    backgroundColor: Colors.surface,
    padding: 18,
    borderRadius: 12,
    fontFamily: 'Lato-Regular',
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    elevation: 4,
  },
  buttonText: { color: '#FFF', fontFamily: 'Cinzel-Bold', fontSize: 14, letterSpacing: 1 },
  registerLink: { marginTop: 20, alignItems: 'center' },
  registerText: { fontFamily: 'Lato-Regular', color: Colors.textSecondary },
  boldText: { color: Colors.primary, fontWeight: 'bold' },
});