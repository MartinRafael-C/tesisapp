import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
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

export default function HologramGuide() {
  const router = useRouter();
  const pasos = [
    { n: "01", t: "MATERIALES", d: "Acetato transparente rígido, regla y cúter de precisión." },
    { n: "02", t: "ESPECIFICACIONES", d: "Trapecios: Base 6cm, Tope 1cm, Alto 3.5cm (x4)." },
    { n: "03", t: "ENSAMBLAJE", d: "Unir las caras con adhesivo mínimo formando el prisma." }
  ];

  return (
    <View style={{ flex: 1, backgroundColor: THEME.black }}>
      {/* Fondo con leve gradiente petróleo superior */}
      <LinearGradient colors={['#001a1a', '#000000']} style={StyleSheet.absoluteFill} />
      
      <SafeAreaView style={styles.container} edges={['top']}>
      
       

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.intro}>
            PROCESO DE CONSTRUCCIÓN PARA VISTA HOLOGRÁFICA 3D
          </Text>

          {pasos.map((p, i) => (
            <View key={i} style={styles.stepCard}>
              <View style={styles.stepNumBox}>
                <Text style={styles.stepNumText}>{p.n}</Text>
                <View style={styles.tealDot} />
              </View>
              <View style={styles.stepBody}>
                <Text style={styles.stepTitle}>{p.t}</Text>
                <Text style={styles.stepDesc}>{p.d}</Text>
              </View>
            </View>
          ))}

          {/* Botón de Acción Estilo Cyber */}
          <TouchableOpacity 
            style={styles.projBtn} 
            onPress={() => router.push('/hologram-view')}
          >
            <Ionicons name="scan-outline" size={20} color={THEME.white} />
            <Text style={styles.projBtnT}>EJECUTAR PROYECCIÓN</Text>
          </TouchableOpacity>

          <View style={styles.warningBox}>
            <Ionicons name="alert-circle-outline" size={16} color={THEME.teal} />
            <Text style={styles.tip}>
              SISTEMA ÓPTICO REQUIERE ENTORNO DE BAJA LUMINOSIDAD.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 20, 
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: THEME.glass
  },
  headerTitle: { 
    fontFamily: 'Montserrat-Bold', 
    color: THEME.teal, 
    fontSize: 12, 
    letterSpacing: 2 
  },
  backBtn: {
    padding: 5
  },
  scrollContent: { padding: 25 },
  intro: { 
    fontFamily: 'Inter-Medium',
    fontSize: 11, 
    color: THEME.white, 
    letterSpacing: 1.5,
    textAlign: 'center', 
    marginBottom: 40,
    opacity: 0.6
  },
  stepCard: { 
    flexDirection: 'row', 
    backgroundColor: THEME.grayDark, 
    padding: 20, 
    borderRadius: 2, // Recto
    marginBottom: 15,
    borderLeftWidth: 3,
    borderLeftColor: THEME.teal,
    borderWidth: 1,
    borderColor: THEME.glass
  },
  stepNumBox: { 
    alignItems: 'center',
    marginRight: 20,
    justifyContent: 'center'
  },
  stepNumText: { 
    color: THEME.white, 
    fontFamily: 'Montserrat-Black', 
    fontSize: 22,
    opacity: 0.8
  },
  tealDot: {
    width: 4,
    height: 4,
    backgroundColor: THEME.teal,
    marginTop: 4
  },
  stepBody: { flex: 1 },
  stepTitle: { 
    fontFamily: 'Montserrat-Bold', 
    color: THEME.white, 
    fontSize: 13,
    letterSpacing: 1,
    marginBottom: 4
  },
  stepDesc: { 
    fontFamily: 'Inter-Regular', 
    color: 'rgba(255,255,255,0.5)', 
    fontSize: 12,
    lineHeight: 18
  },
  projBtn: { 
    backgroundColor: THEME.teal, 
    padding: 20, 
    borderRadius: 2, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 25, 
    gap: 12,
    elevation: 8,
    shadowColor: THEME.teal,
    shadowOpacity: 0.3,
    shadowRadius: 10
  },
  projBtnT: { 
    color: THEME.white, 
    fontFamily: 'Montserrat-Bold', 
    fontSize: 14,
    letterSpacing: 1
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    gap: 8,
    paddingHorizontal: 10
  },
  tip: { 
    fontFamily: 'Inter-Medium',
    color: THEME.teal, 
    fontSize: 9, 
    letterSpacing: 1,
    textAlign: 'center'
  }
});