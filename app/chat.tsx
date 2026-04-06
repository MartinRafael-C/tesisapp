import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, KeyboardAvoidingView, Platform, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context'; // Arregla el WARN de SafeAreaView
import ChatInput from '../components/ChatInput';

// Importación condicional o protegida para evitar el crash en Expo Go SDK 53+
let Notifications: any;
try {
  Notifications = require('expo-notifications');
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
} catch (e) {
  console.log("Notificaciones no soportadas en este entorno");
}

export default function ChatScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState([{ id: '1', text: "¡Buenos días, mi querido joven! ¿En qué puedo guiarte hoy?", sender: 'bosco' }]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = async () => {
    if (!inputText.trim() || isTyping) return;
    const userText = inputText;
    setMessages(p => [...p, { id: Date.now().toString(), text: userText, sender: 'user' }]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.EXPO_PUBLIC_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "qwen/qwen-turbo",
          messages: [
            { role: "system", content: "Eres San Juan Bosco. Responde paternalmente, alegre y breve. Saluda siempre con afecto." },
            { role: "user", content: userText }
          ],
        }),
      });

      const data = await response.json();
      const reply = data.choices[0].message.content;

      setMessages(p => [...p, { id: Date.now().toString(), text: reply, sender: 'bosco' }]);
      
      // Solo dispara la notificación si la librería cargó bien
      if (Notifications?.scheduleNotificationAsync) {
        await Notifications.scheduleNotificationAsync({
          content: { title: "Don Bosco te respondió 🕊️", body: reply.substring(0, 50) + "...", sound: true },
          trigger: null,
        });
      }
    } catch (e) { 
      console.error(e); 
    } finally { 
      setIsTyping(false); 
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#B8860B" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>DON BOSCO IA</Text>
          <View style={{ width: 24 }} />
        </View>

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={i => i.id}
          contentContainerStyle={{ padding: 20 }}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          renderItem={({ item }) => (
            <View style={[styles.bubble, item.sender === 'user' ? styles.userB : styles.boscoB]}>
              <Text style={[styles.msgText, { color: item.sender === 'user' ? '#FFF' : '#333' }]}>{item.text}</Text>
            </View>
          )}
        />
        
        {isTyping && (
          <View style={styles.typingBox}>
            <ActivityIndicator size="small" color="#B8860B" />
            <Text style={styles.typingText}>Don Bosco está pensando...</Text>
          </View>
        )}

        <ChatInput value={inputText} onChangeText={setInputText} onSend={sendMessage} disabled={isTyping} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDFBF0' },
  header: { 
    flexDirection: 'row', justifyContent: 'space-between', padding: 15, 
    backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#F3EFE0', alignItems: 'center' 
  },
  headerTitle: { fontFamily: 'Cinzel-Bold', color: '#B8860B', fontSize: 16 },
  bubble: { padding: 18, borderRadius: 25, marginBottom: 15, maxWidth: '85%', elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 },
  userB: { alignSelf: 'flex-end', backgroundColor: '#B8860B', borderBottomRightRadius: 4 },
  boscoB: { alignSelf: 'flex-start', backgroundColor: '#FFF', borderBottomLeftRadius: 4 },
  msgText: { fontSize: 16, lineHeight: 22 },
  typingBox: { flexDirection: 'row', paddingLeft: 25, marginBottom: 15, alignItems: 'center' },
  typingText: { marginLeft: 10, color: '#B8860B', fontStyle: 'italic', fontSize: 12 }
});