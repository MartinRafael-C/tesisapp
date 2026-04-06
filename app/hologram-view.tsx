import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function HologramView() {
  // El contenido que se repetirá en las 4 caras del prisma
  const HologramContent = ({ rotation }: { rotation: string }) => (
    <View style={[styles.contentContainer, { transform: [{ rotate: rotation }] }]}>
      {/* Aquí iría tu modelo 3D o imagen de Don Bosco */}
      <View style={styles.placeholderFigure}>
        <Text style={styles.text}>DB</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" hidden />
      
      {/* Proyección Superior */}
      <View style={[styles.positioner, { top: '10%', left: 0, right: 0 }]}>
        <HologramContent rotation="180deg" />
      </View>

      {/* Proyección Inferior */}
      <View style={[styles.positioner, { bottom: '10%', left: 0, right: 0 }]}>
        <HologramContent rotation="0deg" />
      </View>

      {/* Proyección Izquierda */}
      <View style={[styles.positioner, { left: '5%', top: 0, bottom: 0, justifyContent: 'center' }]}>
        <HologramContent rotation="90deg" />
      </View>

      {/* Proyección Derecha */}
      <View style={[styles.positioner, { right: '5%', top: 0, bottom: 0, justifyContent: 'center' }]}>
        <HologramContent rotation="-90deg" />
      </View>

      {/* Centro guía para colocar el prisma */}
      <View style={styles.centerGuide} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Negro absoluto para el efecto
  },
  positioner: {
    position: 'absolute',
    alignItems: 'center',
  },
  contentContainer: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderFigure: {
    width: 80,
    height: 120,
    borderWidth: 2,
    borderColor: '#D4AF37', // Dorado de la marca [cite: 22]
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
  },
  text: {
    color: '#D4AF37',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Cinzel-Bold', // Tipografía principal [cite: 25]
  },
  centerGuide: {
    position: 'absolute',
    top: height / 2 - 1,
    left: width / 2 - 1,
    width: 2,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.2)',
  }
});