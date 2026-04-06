import React, { useState, useRef } from 'react';
import { 
  View, Text, StyleSheet, TextInput, FlatList, 
  TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator,
  SafeAreaView 
} from 'react-native';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    { id: '1', text: "¡Hola, mi querido joven! ¿En qué puedo ayudarte hoy en tu camino?", sender: 'bosco' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = async () => {
    if (inputText.trim() === '' || isTyping) return;

    const userMsg = { id: Date.now().toString(), text: inputText, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = inputText;
    setInputText('');
    setIsTyping(true);

    try {
      // Configuración para OpenRouter y Qwen 3.6 Plus
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.EXPO_PUBLIC_OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'https://localhost:8081', // Opcional para OpenRouter
          'X-Title': 'Tesis Don Bosco App',        // Opcional para OpenRouter
        },
        body: JSON.stringify({
          model: "qwen/qwen3.6-plus:free", 
          messages: [
            { 
              role: "system", 
              content: "Eres San Juan Bosco (Don Bosco). Tu tono es paternal, amable y siempre animas a los jóvenes. Respondes de forma breve y espiritual. Usa frases como 'Mi querido hijo' o '¡Alegría!'. Tu objetivo es guiar con el Sistema Preventivo (Razón, Religión y Amor). Mantén las respuestas cortas para visualización móvil." 
            },
            ...messages.map(m => ({
                role: m.sender === 'user' ? 'user' : 'assistant',
                content: m.text
            })),
            { role: "user", content: currentInput }
          ],
        }),
      });

      const data = await response.json();
      
      if (data.choices && data.choices.length > 0) {
        const reply = data.choices[0].message.content;
        setMessages((prev) => [...prev, { 
          id: (Date.now() + 1).toString(), 
          text: reply, 
          sender: 'bosco' 
        }]);
      } else {
        throw new Error("Respuesta no válida de la API");
      }

    } catch (error) {
      console.error("Error en Chat:", error);
      setMessages((prev) => [...prev, { 
        id: 'error', 
        text: "Hijo mío, en este momento no puedo escucharte bien. Inténtalo de nuevo pronto.", 
        sender: 'bosco' 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
        style={styles.container}
        // Ajustamos el offset para que el input suba correctamente con el teclado
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 20}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          renderItem={({ item }) => (
            <View style={[styles.bubble, item.sender === 'user' ? styles.userBubble : styles.boscoBubble]}>
              <Text style={[styles.text, item.sender === 'user' ? styles.userText : styles.boscoText]}>
                {item.text}
              </Text>
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />

        {isTyping && (
          <View style={styles.typingContainer}>
            <ActivityIndicator size="small" color={Colors.primary} />
            <Text style={styles.typingText}>Don Bosco está escribiendo...</Text>
          </View>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Escribe tu mensaje aquí..."
            value={inputText}
            onChangeText={setInputText}
            placeholderTextColor="#999"
            multiline={false} // Evita que crezca demasiado y tape la navegación
          />
          <TouchableOpacity 
            style={[styles.sendBtn, { opacity: inputText.length > 0 ? 1 : 0.6 }]} 
            onPress={sendMessage}
            disabled={inputText.length === 0}
          >
            <Ionicons name="send" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1 },
  listContent: { padding: 20, paddingBottom: 10 },
  bubble: { padding: 15, borderRadius: 20, marginBottom: 12, maxWidth: '85%' },
  boscoBubble: { 
    alignSelf: 'flex-start', 
    backgroundColor: '#FFF', 
    borderWidth: 1, 
    borderColor: '#EEE', 
    borderBottomLeftRadius: 4,
    // Sombra ligera para legibilidad
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userBubble: { 
    alignSelf: 'flex-end', 
    backgroundColor: Colors.primary, 
    borderBottomRightRadius: 4 
  },
  text: { fontSize: 16, lineHeight: 22 },
  boscoText: { color: '#333' },
  userText: { color: '#FFF' },
  typingContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 10 },
  typingText: { marginLeft: 8, color: '#999', fontSize: 12, fontStyle: 'italic' },
  inputContainer: { 
    flexDirection: 'row', 
    padding: 15, 
    backgroundColor: '#FFF', 
    alignItems: 'center', 
    borderTopWidth: 1, 
    borderTopColor: '#EEE',
    // Elevamos el contenedor para que no sea tapado por barras de navegación inferiores
    paddingBottom: Platform.OS === 'ios' ? 25 : 15, 
  },
  input: { 
    flex: 1, 
    backgroundColor: '#F5F5F5', 
    borderRadius: 25, 
    paddingHorizontal: 20, 
    paddingVertical: 12, 
    marginRight: 10, 
    fontSize: 16,
    color: '#333'
  },
  sendBtn: { 
    backgroundColor: Colors.primary, 
    width: 48, 
    height: 48, 
    borderRadius: 24, 
    justifyContent: 'center', 
    alignItems: 'center' 
  }
});