import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
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
  glass: 'rgba(255, 255, 255, 0.08)'
};

const FRASES_BOSCO = [
  "ESTATE SIEMPRE ALEGRE.",
  "LA EDUCACIÓN ES COSA DEL CORAZÓN.",
  "PIES EN LA TIERRA, CORAZÓN EN EL CIELO.",
  "AMA LO QUE AMAN LOS JÓVENES."
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/');
  };

  return (
    <View style={{ flex: 1, backgroundColor: THEME.black }}>
      <LinearGradient colors={['#001a1a', '#000000']} style={StyleSheet.absoluteFill} />
      
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          {/* Header Impacto Montserrat Black */}
          <View style={styles.header}>
            <Text style={styles.systemStatus}>ONLINE_SISTEMA_v1.0</Text>
            <Text style={styles.brandTitle}>ORATORIO</Text>
            <Text style={[styles.brandTitle, styles.outlineText]}>DIGITAL</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{saludo}</Text>
            </View>
          </View>

          {/* Card de Frase Estilo Instagram Tech */}
          <View style={styles.quoteCard}>
            <View style={styles.tealLine} />
            <Text style={styles.quoteText}>"{frase}"</Text>
            <Text style={styles.author}>— SAN JUAN BOSCO</Text>
          </View>

          {/* Grid de Navegación */}
          <View style={styles.menuGrid}>
            <TouchableOpacity 
              style={styles.navButton} 
              onPress={() => router.push('/holograma')}
            >
              <View style={styles.btnHeader}>
                <Ionicons name="cube-outline" size={20} color={THEME.teal} />
                <Text style={styles.btnTag}>TECH_MODULE</Text>
              </View>
              <Text style={styles.navButtonText}>VISTA HOLOGRAMA</Text>
              <Text style={styles.navButtonSub}>PROYECCIÓN ÓPTICA 3D</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.navButton, styles.activeButton]} 
              onPress={() => router.push('/chat')}
            >
              <View style={styles.btnHeader}>
                <Ionicons name="chatbubble-ellipses-outline" size={20} color={THEME.white} />
                <Text style={[styles.btnTag, { color: THEME.white }]}>NEURAL_CORE</Text>
              </View>
              <Text style={[styles.navButtonText, { color: THEME.white }]}>CHATBOT IA</Text>
              <Text style={[styles.navButtonSub, { color: 'rgba(255,255,255,0.6)' }]}>INTERFAZ DE CONVERSACIÓN</Text>
            </TouchableOpacity>
          </View>

          {/* Footer de Salida */}
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Ionicons name="power-outline" size={16} color="#C62828" />
            <Text style={styles.logoutText}>TERMINAR_SESIÓN</Text>
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 25 },
  header: { marginTop: 30, marginBottom: 40 },
  systemStatus: { 
    color: THEME.teal, 
    fontFamily: 'Inter-Medium', 
    fontSize: 10, 
    letterSpacing: 2, 
    marginBottom: 5 
  },
  brandTitle: { 
    fontSize: 52, 
    color: THEME.white, 
    fontFamily: 'Montserrat-Black', 
    letterSpacing: -2, 
    lineHeight: 48 
  },
  outlineText: { 
    color: 'transparent', 
    textShadowColor: THEME.white, 
    textShadowRadius: 1,
    textShadowOffset: { width: 1, height: 1 },
    // En algunas plataformas se usa borderWidth si el motor lo soporta
  },
  badge: { 
    backgroundColor: THEME.teal, 
    alignSelf: 'flex-start', 
    paddingHorizontal: 10, 
    paddingVertical: 3, 
    marginTop: 15,
    borderRadius: 2
  },
  badgeText: { color: THEME.white, fontFamily: 'Montserrat-Bold', fontSize: 10 },
  
  quoteCard: { 
    backgroundColor: THEME.grayDark, 
    padding: 24, 
    borderLeftWidth: 4, 
    borderLeftColor: THEME.teal, 
    marginBottom: 40,
    borderRadius: 2
  },
  quoteText: { 
    color: THEME.white, 
    fontSize: 20, 
    fontFamily: 'Montserrat-Bold', 
    letterSpacing: -0.5 
  },
  author: { 
    color: THEME.teal, 
    fontSize: 11, 
    marginTop: 12, 
    fontFamily: 'Inter-Medium', 
    letterSpacing: 1 
  },
  tealLine: { width: 40, height: 2, backgroundColor: THEME.teal, marginBottom: 15 },

  menuGrid: { gap: 16 },
  navButton: { 
    backgroundColor: THEME.petroleo, 
    padding: 24, 
    borderWidth: 1, 
    borderColor: THEME.glass, 
    borderRadius: 2 
  },
  activeButton: {
    backgroundColor: THEME.teal,
    borderColor: 'transparent'
  },
  btnHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 15
  },
  btnTag: { 
    color: THEME.teal, 
    fontSize: 9, 
    fontFamily: 'Inter-Medium', 
    letterSpacing: 1.5 
  },
  navButtonText: { 
    color: THEME.white, 
    fontSize: 18, 
    fontFamily: 'Montserrat-Black',
  },
  navButtonSub: { 
    color: 'rgba(255,255,255,0.4)', 
    fontSize: 10, 
    marginTop: 4, 
    fontFamily: 'Inter-Regular',
    letterSpacing: 1 
  },

  logoutBtn: { 
    marginTop: 60, 
    alignSelf: 'center', 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8,
    borderBottomWidth: 1, 
    borderBottomColor: '#C62828',
    paddingBottom: 4
  },
  logoutText: { color: '#C62828', fontSize: 10, fontFamily: 'Montserrat-Bold', letterSpacing: 2 }
});