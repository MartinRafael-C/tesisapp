import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HologramGuide() {
  const router = useRouter();
  const pasos = [
    { n: "1", t: "Materiales", d: "Acetato transparente, regla y tijeras." },
    { n: "2", t: "Medidas", d: "Trapecios: Base 6cm, Tope 1cm, Alto 3.5cm." },
    { n: "3", t: "Unión", d: "Pega las 4 caras formando una pirámide." }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={26} color="#B8860B" /></TouchableOpacity>
        <Text style={styles.headerTitle}>GUÍA TÉCNICA</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 25 }}>
        <Text style={styles.intro}>Construye tu prisma para ver la proyección de Don Bosco en 3D.</Text>
        
        {pasos.map((p, i) => (
          <View key={i} style={styles.stepCard}>
            <View style={styles.stepNum}><Text style={styles.stepNumT}>{p.n}</Text></View>
            <View style={{ flex: 1 }}><Text style={styles.stepT}>{p.t}</Text><Text style={styles.stepD}>{p.d}</Text></View>
          </View>
        ))}

        <TouchableOpacity style={styles.projBtn} onPress={() => router.push('/hologram-view')}>
          <Ionicons name="videocam" size={24} color="#FFF" />
          <Text style={styles.projBtnT}>INICIAR PROYECCIÓN 3D</Text>
        </TouchableOpacity>
        <Text style={styles.tip}>* Coloca el prisma en el centro de la pantalla en un cuarto oscuro.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDFBF0' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, backgroundColor: '#FFF', alignItems: 'center' },
  headerTitle: { fontFamily: 'Cinzel-Bold', color: '#B8860B', fontSize: 18 },
  intro: { textAlign: 'center', marginBottom: 30, fontSize: 16, color: '#666', fontStyle: 'italic' },
  stepCard: { flexDirection: 'row', backgroundColor: '#FFF', padding: 20, borderRadius: 15, marginBottom: 15, elevation: 2 },
  stepNum: { width: 35, height: 35, backgroundColor: '#F3EFE0', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  stepNumT: { color: '#B8860B', fontWeight: 'bold' },
  stepT: { fontFamily: 'Cinzel-Bold', color: '#333' },
  stepD: { color: '#888', fontSize: 13 },
  projBtn: { backgroundColor: '#B8860B', padding: 20, borderRadius: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20, gap: 10 },
  projBtnT: { color: '#FFF', fontFamily: 'Cinzel-Bold', fontSize: 16 },
  tip: { marginTop: 20, textAlign: 'center', color: '#B8860B', fontSize: 12, opacity: 0.7 }
});