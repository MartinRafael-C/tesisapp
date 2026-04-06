import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  ScrollView, Alert, ActivityIndicator, SafeAreaView 
} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../services/supabaseConfig';
import * as Notifications from 'expo-notifications';

export default function RegisterScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const formatCardNumber = (t: string) => t.replace(/\D/g, '').match(/.{1,4}/g)?.join(' ') || t.replace(/\D/g, '');
  const formatExpiry = (t: string) => {
    const c = t.replace(/\D/g, '');
    return c.length >= 2 ? `${c.slice(0, 2)}/${c.slice(2, 4)}` : c;
  };

  const handleRegister = async () => {
    if (step === 2 && (cardNumber.length < 19 || expiry.length < 5 || cvv.length < 3)) {
      Alert.alert("Aviso", "Completa los datos de la tarjeta."); return;
    }
    if (step === 1) { setStep(2); return; }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email, password, options: { data: { full_name: fullName } }
    });

    if (error) { Alert.alert("Error", error.message); setLoading(false); return; }

    await Notifications.scheduleNotificationAsync({
      content: { title: "¡Bienvenido a la familia! ✨", body: `Hola ${fullName}, tu acceso está listo.`, sound: true },
      trigger: null,
    });

    setLoading(false);
    router.replace('/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{step === 1 ? "Inscripción" : "Ofrenda Digital"}</Text>
        
        {step === 1 ? (
          <View style={styles.form}>
            <TextInput placeholder="Nombre Completo" style={styles.input} onChangeText={setFullName} placeholderTextColor="#999" />
            <TextInput placeholder="Correo" style={styles.input} onChangeText={setEmail} autoCapitalize="none" placeholderTextColor="#999" />
            <TextInput placeholder="Contraseña" style={styles.input} secureTextEntry onChangeText={setPassword} placeholderTextColor="#999" />
            <TouchableOpacity style={styles.btnPrimary} onPress={handleRegister}>
              <Text style={styles.btnText}>SIGUIENTE PASO</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.form}>
            <View style={styles.cardBox}>
              <Text style={styles.cardHeader}>Suscripción Anual: $9.99</Text>
              <TextInput 
                placeholder="0000 0000 0000 0000" 
                style={styles.input} 
                keyboardType="numeric" 
                maxLength={19}
                value={cardNumber}
                onChangeText={(t) => setCardNumber(formatCardNumber(t))}
              />
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <TextInput placeholder="MM/YY" style={[styles.input, { flex: 1 }]} maxLength={5} value={expiry} onChangeText={(t) => setExpiry(formatExpiry(t))} keyboardType="numeric" />
                <TextInput placeholder="CVV" style={[styles.input, { flex: 1 }]} maxLength={3} secureTextEntry onChangeText={setCvv} keyboardType="numeric" />
              </View>
            </View>
            <TouchableOpacity style={styles.btnPay} onPress={handleRegister} disabled={loading}>
              {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.btnText}>CONFIRMAR Y PAGAR</Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setStep(1)}><Text style={styles.back}>Regresar</Text></TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDFBF0' },
  content: { padding: 30, paddingTop: 40 },
  title: { fontFamily: 'Cinzel-Bold', fontSize: 28, textAlign: 'center', marginBottom: 40, color: '#333' },
  form: { gap: 15 },
  input: { backgroundColor: '#FFF', padding: 18, borderRadius: 12, borderWidth: 1, borderColor: '#DDD' },
  btnPrimary: { backgroundColor: '#B8860B', padding: 20, borderRadius: 12, alignItems: 'center' },
  btnPay: { backgroundColor: '#2E7D32', padding: 20, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#FFF', fontFamily: 'Cinzel-Bold', fontSize: 14 },
  cardBox: { backgroundColor: '#F3EFE0', padding: 20, borderRadius: 15, borderWidth: 1, borderColor: '#B8860B', gap: 12 },
  cardHeader: { textAlign: 'center', fontFamily: 'Cinzel-Bold', color: '#B8860B', marginBottom: 5 },
  back: { textAlign: 'center', marginTop: 10, color: '#666', textDecorationLine: 'underline' }
});