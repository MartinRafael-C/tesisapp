import React from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function HologramView() {
  const router = useRouter();

  const HologramContent = ({ rotation }: { rotation: string }) => (
    <View style={[styles.contentContainer, { transform: [{ rotate: rotation }] }]}>
      <View style={styles.placeholderFigure}>
        <Text style={styles.text}>DB</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" hidden />
      
      {/* Botón para salir del modo oscuro */}
      <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
        <Ionicons name="close-circle" size={40} color="rgba(255,255,255,0.3)" />
      </TouchableOpacity>

      <View style={[styles.positioner, { top: '10%', left: 0, right: 0 }]}>
        <HologramContent rotation="180deg" />
      </View>

      <View style={[styles.positioner, { bottom: '10%', left: 0, right: 0 }]}>
        <HologramContent rotation="0deg" />
      </View>

      <View style={[styles.positioner, { left: '5%', top: 0, bottom: 0, justifyContent: 'center' }]}>
        <HologramContent rotation="90deg" />
      </View>

      <View style={[styles.positioner, { right: '5%', top: 0, bottom: 0, justifyContent: 'center' }]}>
        <HologramContent rotation="-90deg" />
      </View>

      <View style={styles.centerGuide} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  positioner: { position: 'absolute', alignItems: 'center' },
  contentContainer: { width: 150, height: 150, justifyContent: 'center', alignItems: 'center' },
  placeholderFigure: {
    width: 80, height: 120, borderWidth: 2, borderColor: '#D4AF37',
    borderRadius: 40, justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
  },
  text: { color: '#D4AF37', fontSize: 24, fontWeight: 'bold', fontFamily: 'Cinzel-Bold' },
  centerGuide: {
    position: 'absolute', top: height / 2 - 1, left: width / 2 - 1,
    width: 2, height: 2, backgroundColor: 'rgba(255,255,255,0.2)',
  },
  closeBtn: { position: 'absolute', top: 40, right: 20, zIndex: 10 }
});