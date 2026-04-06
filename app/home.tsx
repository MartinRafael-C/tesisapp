import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons'; // Iconos integrados en Expo

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header con saludo personalizado */}
      <View style={styles.header}>
        <Text style={styles.greetingText}>Bienvenido, Joven</Text>
        <View style={styles.divider} />
      </View>

      {/* Tarjeta de la Frase de Don Bosco (Efecto Pergamino) */}
      <View style={styles.quoteCard}>
      <Ionicons name="chatbox-ellipses-outline" size={24} color={Colors.primary} style={styles.quoteIcon} />
        <Text style={styles.quoteText}>
          "Tratad de haceros amar más que haceros temer. La economía del castigo es la última ratio."
        </Text>
        <Text style={styles.author}>— San Juan Bosco</Text>
      </View>

      {/* Sección de Acciones Principales */}
      <View style={styles.menuGrid}>
        
        {/* Botón: Tutorial del Holograma */}
        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => router.push('/tutorial')}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#E0C9A6' }]}>
            <Ionicons name="prism-outline" size={32} color={Colors.text} />
          </View>
          <Text style={styles.menuTitle}>Construcción</Text>
          <Text style={styles.menuSubtitle}>Crea tu pirámide de holograma</Text>
        </TouchableOpacity>

        {/* Botón: Chatbot IA Don Bosco */}
        <TouchableOpacity 
          style={[styles.menuItem, styles.highlightItem]} 
          onPress={() => router.push('/chat')}
        >
          <View style={[styles.iconContainer, { backgroundColor: Colors.primary }]}>
            <Ionicons name="chatbubbles-outline" size={32} color={Colors.surface} />
          </View>
          <Text style={styles.menuTitle}>Hablar con Don Bosco</Text>
          <Text style={styles.menuSubtitle}>Sabiduría e Inteligencia Artificial</Text>
        </TouchableOpacity>

      </View>

      {/* Footer Decorativo */}
      <Text style={styles.footerText}>DA MIHI ANIMAS, CAETERA TOLLE</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 25,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  greetingText: {
    fontFamily: 'Cinzel-Bold',
    fontSize: 22,
    color: Colors.text,
    letterSpacing: 1,
  },
  divider: {
    width: 50,
    height: 2,
    backgroundColor: Colors.primary,
    marginTop: 10,
  },
  quoteCard: {
    backgroundColor: Colors.surface,
    padding: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 40,
  },
  quoteIcon: {
    marginBottom: 10,
    alignSelf: 'center',
  },
  quoteText: {
    fontFamily: 'Lato-Regular',
    fontSize: 18,
    color: Colors.text,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 28,
  },
  author: {
    fontFamily: 'Cinzel-Bold',
    fontSize: 14,
    color: Colors.primary,
    textAlign: 'right',
    marginTop: 20,
  },
  menuGrid: {
    gap: 20,
  },
  menuItem: {
    backgroundColor: Colors.surface,
    padding: 20,
    borderRadius: 15,
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  highlightItem: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  menuTitle: {
    fontFamily: 'Cinzel-Bold',
    fontSize: 18,
    color: Colors.text,
  },
  menuSubtitle: {
    fontFamily: 'Lato-Light',
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 5,
    textAlign: 'center',
  },
  footerText: {
    fontFamily: 'Cinzel-Regular',
    fontSize: 12,
    color: Colors.primary,
    textAlign: 'center',
    marginTop: 40,
    opacity: 0.6,
  }
});