import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function TutorialScreen() {
  const router = useRouter();

  const Pasos = [
    {
      id: 1,
      titulo: "Materiales",
      desc: "Necesitarás una lámina de acetato transparente (como las de encuadernar), regla, cúter y cinta adhesiva.",
      icon: "list-outline"
    },
    {
      id: 2,
      titulo: "Corte de Piezas",
      desc: "Corta 4 trapecios iguales. Medidas recomendadas: Base mayor 6cm, Base menor 1cm, Altura 3.5cm.",
      icon: "cut-outline"
    },
    {
      id: 3,
      titulo: "Ensamblaje",
      desc: "Une los 4 trapecios con cinta adhesiva por sus laterales para formar una pirámide invertida.",
      icon: "construct-outline"
    },
    {
      id: 4,
      titulo: "Activación",
      desc: "Coloca la pirámide en el centro de tu pantalla y prepárate para ver a Don Bosco.",
      icon: "eye-outline"
    }
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>El Arte del Holograma</Text>
        <Text style={styles.subtitle}>Efecto Pepper's Ghost</Text>
      </View>

      {/* Ilustración o Diagrama (Placeholder para imagen) */}
      <View style={styles.diagramPlaceholder}>
        <Ionicons name="triangle" size={80} color={Colors.primary} />
        <Text style={styles.diagramText}>Diagrama de la Pirámide</Text>
      </View>

      <View style={styles.stepsContainer}>
        {Pasos.map((paso) => (
          <View key={paso.id} style={styles.stepCard}>
            <View style={styles.stepHeader}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{paso.id}</Text>
              </View>
              <Text style={styles.stepTitle}>{paso.titulo}</Text>
            </View>
            <Text style={styles.stepDesc}>{paso.desc}</Text>
          </View>
        ))}
      </View>

      {/* Botón para ir al visor del holograma */}
      <TouchableOpacity 
        style={styles.actionButton}
        onPress={() => router.push('/hologram-view')}
      >
        <Text style={styles.actionButtonText}>Iniciar Proyección</Text>
        <Ionicons name="play-circle" size={24} color="#FFF" />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 25, paddingTop: 40 },
  header: { alignItems: 'center', marginBottom: 30 },
  title: { fontFamily: 'Cinzel-Bold', fontSize: 24, color: Colors.text },
  subtitle: { fontFamily: 'Lato-Regular', fontSize: 14, color: Colors.primary, letterSpacing: 1 },
  diagramPlaceholder: {
    height: 180,
    backgroundColor: '#FFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderStyle: 'dashed'
  },
  diagramText: { fontFamily: 'Lato-Light', color: Colors.textSecondary, marginTop: 10 },
  stepsContainer: { gap: 20, marginBottom: 40 },
  stepCard: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 15,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    elevation: 2
  },
  stepHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  stepNumberText: { color: '#FFF', fontWeight: 'bold' },
  stepTitle: { fontFamily: 'Cinzel-Bold', fontSize: 16, color: Colors.text },
  stepDesc: { fontFamily: 'Lato-Regular', fontSize: 14, color: Colors.textSecondary, lineHeight: 20 },
  actionButton: {
    backgroundColor: Colors.text, // Marrón oscuro/negro para contraste
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginBottom: 30
  },
  actionButtonText: { color: '#FFF', fontFamily: 'Cinzel-Bold', fontSize: 16 }
});