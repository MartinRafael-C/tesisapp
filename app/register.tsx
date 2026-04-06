import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Alert,
  ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { supabase } from '../services/supabaseConfig';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleNextStep = () => {
    if (!email || !password || !fullName) {
      Alert.alert("Atención", "Por favor, completa todos los campos del formulario.");
      return;
    }
    setStep(2);
  };

  const handleRegisterAndPayment = async () => {
    setLoading(true);
    
    // 1. Registro en Supabase
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: { full_name: fullName }
      }
    });

    if (error) {
      Alert.alert("Error", error.message);
      setLoading(false);
      return;
    }

    // 2. Simulación de éxito de pago
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        "¡Acceso Concedido!", 
        "Tu ofrenda ha sido recibida. Ya eres parte del oratorio digital.",
        [{ text: "EMPEZAR", onPress: () => router.replace('/home') }]
      );
    }, 1500);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.headerTitle}>
        {step === 1 ? "Inscripción" : "Suscripción"}
      </Text>
      <Text style={styles.headerSubtitle}>
        {step === 1 ? "Únete a nuestra comunidad" : "Activa tu acceso premium"}
      </Text>

      {step === 1 ? (
        <View style={styles.form}>
          <TextInput
            placeholder="Nombre completo"
            style={styles.input}
            placeholderTextColor={Colors.textSecondary}
            onChangeText={setFullName}
          />
          <TextInput
            placeholder="Correo electrónico"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
            placeholderTextColor={Colors.textSecondary}
          />
          <TextInput
            placeholder="Contraseña"
            style={styles.input}
            secureTextEntry
            onChangeText={setPassword}
            placeholderTextColor={Colors.textSecondary}
          />
          <TouchableOpacity style={styles.mainButton} onPress={handleNextStep}>
            <Text style={styles.buttonText}>CONTINUAR AL PAGO</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.form}>
          {/* Card de Pago Simulado */}
          <View style={styles.fakeCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardPrice}>$9.99 / anual</Text>
              <Ionicons name="card" size={24} color={Colors.primary} />
            </View>
            
            <TextInput
              placeholder="Número de Tarjeta (Simulado)"
              style={styles.cardInput}
              keyboardType="numeric"
            />
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TextInput placeholder="MM/AA" style={[styles.cardInput, { flex: 1 }]} />
              <TextInput placeholder="CVC" style={[styles.cardInput, { flex: 1 }]} />
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.payButton, loading && { opacity: 0.7 }]} 
            onPress={handleRegisterAndPayment}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>CONFIRMAR OFRENDA</Text>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => setStep(1)} disabled={loading}>
            <Text style={styles.backLink}>Modificar mis datos</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 30, paddingTop: 40 },
  headerTitle: { fontFamily: 'Cinzel-Bold', fontSize: 28, color: Colors.text, textAlign: 'center' },
  headerSubtitle: { fontFamily: 'Lato-Light', fontSize: 13, color: Colors.primary, textAlign: 'center', marginBottom: 40, letterSpacing: 1 },
  form: { gap: 15 },
  input: {
    backgroundColor: Colors.surface,
    padding: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    fontFamily: 'Lato-Regular',
    color: Colors.text,
  },
  fakeCard: {
    backgroundColor: '#F3EFE0',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.primary,
    gap: 12,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  cardPrice: { fontFamily: 'Cinzel-Bold', fontSize: 18, color: Colors.text },
  cardInput: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    fontFamily: 'Lato-Regular',
  },
  mainButton: {
    backgroundColor: Colors.primary,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  payButton: {
    backgroundColor: '#2E7D32',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#FFF', fontFamily: 'Cinzel-Bold', fontSize: 14, letterSpacing: 1 },
  backLink: { textAlign: 'center', color: Colors.textSecondary, marginTop: 15, fontFamily: 'Lato-Regular', textDecorationLine: 'underline' }
});