// Definimos la "forma" de las propiedades que recibe el componeimport React from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Platform 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const THEME = {
  black: '#000000',
  petroleo: '#002626',
  teal: '#008080',
  white: '#FFFFFF',
  glass: 'rgba(255, 255, 255, 0.1)',
};

interface ChatInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

export default function ChatInput({ value, onChangeText, onSend, disabled }: ChatInputProps) {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="ESCRIBIR COMANDO..."
          placeholderTextColor="rgba(0, 128, 128, 0.5)"
          value={value}
          onChangeText={onChangeText}
          multiline
          editable={!disabled}
          selectionColor={THEME.teal}
        />
        
        <TouchableOpacity 
          style={[styles.sendButton, disabled && styles.disabledButton]} 
          onPress={onSend}
          disabled={disabled || !value.trim()}
        >
          <Ionicons 
            name="terminal-outline" 
            size={20} 
            color={disabled ? '#444' : THEME.white} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: 'transparent',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: THEME.petroleo,
    borderWidth: 1,
    borderColor: THEME.glass,
    borderRadius: 2, // Bordes rectos Cyber
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 10 : 5,
  },
  input: {
    flex: 1,
    color: THEME.white,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace', // Estilo código
    fontSize: 14,
    maxHeight: 100,
    paddingTop: 10,
    paddingBottom: 10,
  },
  sendButton: {
    backgroundColor: THEME.teal,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    marginLeft: 10,
    borderRadius: 2,
  },
  disabledButton: {
    backgroundColor: '#1A1A1A',
  },
});