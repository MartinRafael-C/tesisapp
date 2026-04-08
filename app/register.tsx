import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  ScrollView, Alert, ActivityIndicator, SafeAreaView, Platform 
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
      Alert.alert("SISTEMA", "COMPLETE LOS DATOS DE LA LICENCIA"); return;
    }
    if (step === 1) { setStep(2); return; }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email, password, options: { data: { full_name: fullName } }
    });

    if (error) { Alert.alert("ERROR_AUTH", error.message); setLoading(false); return; }

    try {
      await Notifications.scheduleNotificationAsync({
        content: { 
          title: "ACCESO AUTORIZADO 🔓", 
          body: `Bienvenido, ${fullName}. Interfaz configurada.`, 
          sound: true 
        },
        trigger: null,
      });
    } catch (e) { console.log("Notify skip"); }

    setLoading(false);
    router.replace('/home');
  };

  return (
    <View style={{ flex: 1, backgroundColor: THEME.black }}>
      <LinearGradient colors={['#001a1a', '#000000']} style={StyleSheet.absoluteFill} />
      
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content}>
          
          <View style={styles.header}>
            <Text style={styles.stepIndicator}>PASO_0{step}_DE_02</Text>
            <Text style={styles.title}>{step === 1 ? "NUEVO_PERFIL" : "SOPORTE_SISTEMA"}</Text>
          </View>

          {step === 1 ? (
            <View style={styles.form}>
              <View style={styles.inputBox}>
                <Text style={styles.label}>NOMBRE_USUARIO</Text>
                <TextInput placeholder="EJ. JUAN BOSCO" style={styles.input} onChangeText={setFullName} placeholderTextColor="rgba(0, 128, 128, 0.3)" />
              </View>

              <View style={styles.inputBox}>
                <Text style={styles.label}>EMAIL_ID</Text>
                <TextInput placeholder="correo@sistema.com" style={styles.input} onChangeText={setEmail} autoCapitalize="none" placeholderTextColor="rgba(0, 128, 128, 0.3)" />
              </View>

              <View style={styles.inputBox}>
                <Text style={styles.label}>PASSWORD_KEY</Text>
                <TextInput placeholder="••••••••" style={styles.input} secureTextEntry onChangeText={setPassword} placeholderTextColor="rgba(0, 128, 128, 0.3)" />
              </View>

              <TouchableOpacity style={styles.btnPrimary} onPress={handleRegister}>
                <Text style={styles.btnText}>CONFIGURAR ACCESO</Text>
                <Ionicons name="chevron-forward" size={18} color={THEME.white} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.form}>
              <View style={styles.cardBox}>
                <View style={styles.priceRow}>
                  <Text style={styles.cardHeader}>COSTO LICENCIA ANUAL</Text>
                  <Text style={styles.price}>$9.99</Text>
                </View>

                <TextInput 
                  placeholder="0000 0000 0000 0000" 
                  style={styles.cardInput} 
                  keyboardType="numeric" 
                  maxLength={19}
                  value={cardNumber}
                  onChangeText={(t) => setCardNumber(formatCardNumber(t))}
                  placeholderTextColor="rgba(255,255,255,0.2)"
                />
                
                <View style={{ flexDirection: 'row', gap: 15 }}>
                  <TextInput placeholder="MM/YY" style={[styles.cardInput, { flex: 1 }]} maxLength={5} value={expiry} onChangeText={(t) => setExpiry(formatExpiry(t))} keyboardType="numeric" placeholderTextColor="rgba(255,255,255,0.2)" />
                  <TextInput placeholder="CVV" style={[styles.cardInput, { flex: 1 }]} maxLength={3} secureTextEntry onChangeText={setCvv} keyboardType="numeric" placeholderTextColor="rgba(255,255,255,0.2)" />
                </View>
              </View>

              <TouchableOpacity style={styles.btnPay} onPress={handleRegister} disabled={loading}>
                {loading ? (
                  <ActivityIndicator color={THEME.white} />
                ) : (
                  <>
                    <Ionicons name="lock-closed-outline" size={18} color={THEME.white} />
                    <Text style={styles.btnText}>CONFIRMAR Y ACTIVAR</Text>
                  </>
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setStep(1)} style={styles.backBtn}>
                <Text style={styles.backText}>VOLVER AL REGISTRO</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: 30, paddingTop: 40 },
  header: { marginBottom: 40, alignItems: 'center' },
  stepIndicator: { color: THEME.teal, fontFamily: 'Inter-Medium', fontSize: 10, letterSpacing: 2, marginBottom: 8 },
  title: { fontFamily: 'Montserrat-Black', fontSize: 32, color: THEME.white, letterSpacing: -1 },
  form: { gap: 20 },
  inputBox: { gap: 8 },
  label: { color: THEME.teal, fontSize: 10, fontFamily: 'Montserrat-Bold', marginLeft: 4 },
  input: { 
    backgroundColor: THEME.grayDark, 
    padding: 18, 
    borderRadius: 2, 
    borderWidth: 1, 
    borderColor: THEME.glass,
    color: THEME.white,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace'
  },
  btnPrimary: { 
    backgroundColor: THEME.teal, 
    padding: 20, 
    borderRadius: 2, 
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 10 
  },
  btnPay: { 
    backgroundColor: '#1B5E20', // Verde oscuro para pago
    padding: 20, 
    borderRadius: 2, 
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
  btnText: { color: THEME.white, fontFamily: 'Montserrat-Bold', fontSize: 14, letterSpacing: 1 },
  cardBox: { 
    backgroundColor: THEME.petroleo, 
    padding: 24, 
    borderRadius: 2, 
    borderWidth: 1, 
    borderColor: THEME.teal, 
    gap: 15 
  },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  cardHeader: { fontFamily: 'Montserrat-Bold', color: THEME.teal, fontSize: 10, letterSpacing: 1 },
  price: { color: THEME.white, fontFamily: 'Montserrat-Black', fontSize: 18 },
  cardInput: { 
    borderBottomWidth: 1, 
    borderBottomColor: THEME.glass, 
    color: THEME.white, 
    paddingVertical: 10,
    fontFamily: 'monospace',
    fontSize: 16
  },
  backBtn: { marginTop: 20, padding: 10, alignSelf: 'center' },
  backText: { color: 'rgba(255,255,255,0.4)', fontFamily: 'Inter-Medium', fontSize: 11, letterSpacing: 1 }
});