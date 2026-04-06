import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../services/supabaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const FRASES_BOSCO = [
  "«Hijo mío, estate siempre alegre. Nuestra santidad consiste en estar muy alegres».",
  "«La educación es cosa del corazón. Solo Dios tiene las llaves».",
  "«Caminen con los pies en la tierra, pero vivan con el corazón en el cielo».",
  "«Me basta que sean jóvenes para que los ame con todo mi corazón».",
  "«No dejes para mañana el bien que puedas hacer hoy»."
];

export default function HomeScreen() {
  const router = useRouter();
  const [saludo, setSaludo] = useState('');
  const [frase, setFrase] = useState('');

  useEffect(() => {
    // Lógica de saludo según la hora
    const hora = new Date().getHours();
    if (hora >= 6 && hora < 12) setSaludo('Buenos Días');
    else if (hora >= 12 && hora < 19) setSaludo('Buenas Tardes');
    else setSaludo('Buenas Noches');

    // Selección de frase aleatoria
    const indiceAleatorio = Math.floor(Math.random() * FRASES_BOSCO.length);
    setFrase(FRASES_BOSCO[indiceAleatorio]);
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      // Regresa a la pantalla de "Bienvenido" (index.tsx)
      router.replace('/');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header Centralizado y con margen superior */}
        <View style={styles.header}>
          <Text style={styles.brandTitle}>ORATORIO DIGITAL</Text>
          <View style={styles.timeBadge}>
            <Text style={styles.timeText}>{saludo}</Text>
          </View>
        </View>

        {/* Burbuja de Frases de Don Bosco (Icono corregido) */}
        <View style={styles.quoteBubble}>
          <Ionicons name="chatbubble-ellipses-sharp" size={28} color="#B8860B" style={styles.quoteIcon} />
          <Text style={styles.quoteText}>{frase}</Text>
          <Text style={styles.quoteAuthor}>— San Juan Bosco</Text>
        </View>

        {/* Contenedor de Botones Principales */}
        <View style={styles.buttonContainer}>
          
          {/* Botón Holograma */}
          <TouchableOpacity 
            style={styles.mainButton} 
            onPress={() => router.push('/holograma')}
          >
            <View style={styles.iconCircle}>
              <Ionicons name="cube" size={26} color="#FFF" />
            </View>
            <View style={styles.btnTextBox}>
              <Text style={styles.btnTitle}>PROCESO HOLOGRAMA</Text>
              <Text style={styles.btnDesc}>Guía técnica y visualización 3D</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#DDD" />
          </TouchableOpacity>

          {/* Botón Chatbot */}
          <TouchableOpacity 
            style={[styles.mainButton, { borderLeftColor: '#2E7D32' }]} 
            onPress={() => router.push('/chat')}
          >
            <View style={[styles.iconCircle, { backgroundColor: '#2E7D32' }]}>
              <Ionicons name="chatbox-ellipses" size={26} color="#FFF" />
            </View>
            <View style={styles.btnTextBox}>
              <Text style={styles.btnTitle}>CHATBOT DON BOSCO</Text>
              <Text style={styles.btnDesc}>Conversa con nuestra Inteligencia Artificial</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#DDD" />
          </TouchableOpacity>

        </View>

        {/* Bloque de Cierre de Sesión inferior */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#C62828" />
            <Text style={styles.logoutText}>CERRAR SESIÓN</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFBF0', // Fondo crema suave
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingBottom: 40,
  },
  header: {
    marginTop: 40, // Espacio para que no pegue arriba
    alignItems: 'center',
    marginBottom: 35,
  },
  brandTitle: {
    fontFamily: 'Cinzel-Bold', // Asegúrate de tener cargada esta fuente
    fontSize: 28,
    color: '#333',
    letterSpacing: 2,
    textAlign: 'center',
  },
  timeBadge: {
    backgroundColor: '#F3EFE0',
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderRadius: 25,
    marginTop: 12,
    borderWidth: 1,
    borderColor: 'rgba(184, 134, 11, 0.2)',
  },
  timeText: {
    fontFamily: 'Cinzel-Bold',
    fontSize: 16,
    color: '#B8860B',
  },
  quoteBubble: {
    backgroundColor: '#FFF',
    padding: 25,
    borderRadius: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 15,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  quoteIcon: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  quoteText: {
    fontSize: 16,
    color: '#444',
    fontStyle: 'italic',
    lineHeight: 24,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  quoteAuthor: {
    textAlign: 'right',
    marginTop: 15,
    fontFamily: 'Cinzel-Bold',
    fontSize: 11,
    color: '#B8860B',
    letterSpacing: 1,
  },
  buttonContainer: {
    gap: 18,
  },
  mainButton: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 22,
    borderLeftWidth: 6,
    borderLeftColor: '#B8860B',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  iconCircle: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: '#B8860B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTextBox: {
    marginLeft: 15,
    flex: 1,
  },
  btnTitle: {
    fontFamily: 'Cinzel-Bold',
    fontSize: 14,
    color: '#333',
    letterSpacing: 0.5,
  },
  btnDesc: {
    fontSize: 11,
    color: '#888',
    marginTop: 3,
  },
  footer: {
    marginTop: 60,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  logoutBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  logoutText: {
    fontFamily: 'Cinzel-Bold',
    fontSize: 13,
    color: '#C62828',
    letterSpacing: 1,
  },
});