import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors';

// Definimos la "forma" de las propiedades que recibe el componente
interface ChatInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  disabled: boolean;
}

export default function ChatInput({ value, onChangeText, onSend, disabled }: ChatInputProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[
      styles.wrapper, 
      { paddingBottom: Math.max(insets.bottom, 15) } 
    ]}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Escribe a Don Bosco..."
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#999"
          editable={!disabled} // No permite escribir mientras la IA responde
          multiline={false}
        />
        <TouchableOpacity 
          style={[
            styles.sendBtn, 
            (!value.trim() || disabled) && { opacity: 0.5 }
          ]} 
          onPress={onSend}
          disabled={!value.trim() || disabled}
        >
          <Ionicons name="send" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingTop: 10,
    // Sombra para Android
    elevation: 8,
    // Sombra para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  sendBtn: {
    backgroundColor: Colors.primary,
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
});