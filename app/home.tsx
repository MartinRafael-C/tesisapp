import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../services/supabaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const THEME = {
  black: '#000000',
  petroleo: '#002626',
  white: '#FFFFFF',
  teal: '#008080',
  grayDark: '#1A1A1A',
  glass: 'rgba(255, 255, 255, 0.1)'
};

const FRASES_BOSCO = [
  "ESTATE SIEMPRE ALEGRE.",
  "LA EDUCACIÓN ES COSA DEL CORAZÓN.",
  "PIES EN LA TIERRA, CORAZÓN EN EL CIELO."
];

export default function HomeScreen() {
  const router = useRouter();
  const [saludo, setSaludo] = useState('');
  const [frase, setFrase] = useState('');

  useEffect(() => {
    const hora = new Date().getHours();
    if (hora >= 6 && hora < 12) setSaludo('BUENOS DÍAS');
    else if (hora >= 12 && hora < 19) setSaludo('BUENAS TARDES');
    else setSaludo('BUENAS NOCHES');
    setFrase(FRASES_BOSCO[Math.floor(Math.random() * FRASES_BOSCO.length)]);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: THEME.black }}>
      <LinearGradient colors={['#001515', '#000000']} style={StyleSheet.absoluteFill} />
      
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          {/* Header Impacto Montserrat Black Style */}
          <View style={styles.header}>
            <Text style={styles.brandTitle}>ORATORIO</Text>
            <Text style={[styles.brandTitle, styles.outlineText]}>DIGITAL</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{saludo}</Text>
            </View>
          </View>

          {/* Frase Estilo Instagram (Bordes rectos y Teal) */}
          <View style={styles.quoteCard}>
            <View style={styles.tealLine} />
            <Text style={styles.quoteText}>{frase}</Text>
            <Text style={styles.author}>— DON BOSCO</Text>
          </View>

          {/* Botones Estilo Glassmorphism */}
          <View style={styles.menuGrid}>
            <TouchableOpacity 
              style={styles.navButton} 
              onPress={() => router.push('/holograma')}
            >
              <Ionicons name="cube-outline" size={24} color={THEME.teal} />
              <Text style={styles.navButtonText}>PROCESO HOLOGRAMA</Text>
              <Text style={styles.navButtonSub}>TECH SPEC & 3D VIEW</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.navButton, { borderColor: THEME.teal }]} 
              onPress={() => router.push('/chat')}
            >
              <Ionicons name="chatbubble-outline" size={24} color={THEME.white} />
              <Text style={styles.navButtonText}>CHATBOT IA</Text>
              <Text style={styles.navButtonSub}>NEURAL NETWORK ACCESS</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.logoutBtn} 
            onPress={async () => { await supabase.auth.signOut(); router.replace('/'); }}
          >
            <Text style={styles.logoutText}>TERMINAL_EXIT</Text>
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 24 },
  header: { marginTop: 40, marginBottom: 40 },
  brandTitle: {
    fontSize: 48,
    color: THEME.white,
    fontWeight: '900', // Simula Montserrat Black
    letterSpacing: -2,
    lineHeight: 44,
  },
  outlineText: {
    color: 'transparent',
    textShadowColor: THEME.white,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    borderWidth: 1,
    borderColor: THEME.white,
    // Nota: En RN el outline real se simula mejor con sombras o SVG
  },
  badge: {
    backgroundColor: THEME.teal,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 10,
  },
  badgeText: { color: THEME.white, fontWeight: 'bold', fontSize: 12 },
  
  quoteCard: {
    backgroundColor: THEME.grayDark,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: THEME.teal,
    marginBottom: 40,
  },
  quoteText: { color: THEME.white, fontSize: 18, fontWeight: '700', letterSpacing: -0.5 },
  author: { color: THEME.teal, fontSize: 12, marginTop: 10, fontWeight: 'bold' },
  tealLine: { width: 30, height: 2, backgroundColor: THEME.teal, marginBottom: 10 },

  menuGrid: { gap: 16 },
  navButton: {
    backgroundColor: THEME.petroleo,
    padding: 24,
    borderWidth: 1,
    borderColor: THEME.glass,
    borderRadius: 2, // Bordes rectos solicitados
  },
  navButtonText: { color: THEME.white, fontSize: 16, fontWeight: '800', marginTop: 10 },
  navButtonSub: { color: 'rgba(255,255,255,0.4)', fontSize: 10, marginTop: 4, letterSpacing: 1 },

  logoutBtn: { marginTop: 60, alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#C62828' },
  logoutText: { color: '#C62828', fontSize: 12, fontWeight: 'bold', letterSpacing: 2 }
});