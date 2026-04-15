import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, KeyboardAvoidingView, Platform, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Markdown from 'react-native-markdown-display'; 
import ChatInput from '../components/ChatInput';
import * as Notifications from 'expo-notifications'; // IMPORTANTE

const THEME = {
  black: '#000000',
  petroleo: '#002626',
  white: '#FFFFFF',
  teal: '#008080',
  grayDark: '#1A1A1A',
  glass: 'rgba(255, 255, 255, 0.1)'
};

export default function ChatScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState([{ id: '1', text: "**SISTEMA INICIADO.** Esperando consulta...", sender: 'bosco' }]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = async () => {
    if (!inputText.trim() || isTyping) return;
    const userText = inputText;
    setMessages(prev => [...prev, { id: Date.now().toString(), text: userText, sender: 'user' }]);
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
            { role: "system", content: "Eres San Juan Bosco. Responde paternalmente. Usa Markdown para resaltar puntos clave." },
            { role: "user", content: userText }
          ],
        }),
      });
      
      const data = await response.json();
      const botResponse = data.choices[0].message.content;

      // ACTUALIZAR MENSAJES
      setMessages(prev => [...prev, { id: Date.now().toString(), text: botResponse, sender: 'bosco' }]);

      // DISPARAR NOTIFICACIÓN DE RESPUESTA
      try {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "SISTEMA_MENSAJE 💬",
            body: "Don Bosco ha enviado una respuesta a tu consulta.",
            sound: true,
            priority: Notifications.AndroidNotificationPriority.HIGH,
          },
          trigger: null,
        });
      } catch (notifyErr) {
        console.log("Error al notificar");
      }

    } catch (e) { 
      console.error(e); 
    } finally { 
      setIsTyping(false); 
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: THEME.black }}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color={THEME.white} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>NEURAL_BOSCO_v1.0</Text>
            <View style={{ width: 24 }} />
          </View>

          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <View style={[styles.bubble, item.sender === 'user' ? styles.userB : styles.boscoB]}>
                <Markdown style={markdownStyles}>{item.text}</Markdown>
              </View>
            )}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          />

          {isTyping && (
            <View style={styles.typing}>
              <ActivityIndicator size="small" color={THEME.teal} />
              <Text style={styles.typingT}>PROCESANDO...</Text>
            </View>
          )}

          <View style={styles.inputArea}>
            <ChatInput value={inputText} onChangeText={setInputText} onSend={sendMessage} disabled={isTyping} />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: THEME.glass },
  headerTitle: { color: THEME.teal, fontWeight: '900', letterSpacing: 2, fontSize: 10 },
  listContent: { padding: 20 },
  bubble: { padding: 16, marginBottom: 12, maxWidth: '85%', borderRadius: 2 },
  userB: { alignSelf: 'flex-end', backgroundColor: THEME.teal },
  boscoB: { alignSelf: 'flex-start', backgroundColor: THEME.grayDark, borderWidth: 1, borderColor: THEME.glass },
  typing: { flexDirection: 'row', alignItems: 'center', paddingLeft: 25, marginBottom: 15 },
  typingT: { color: THEME.teal, fontSize: 10, fontWeight: 'bold', marginLeft: 10 },
  inputArea: { paddingHorizontal: 15, paddingBottom: Platform.OS === 'android' ? 15 : 0 }
});

const markdownStyles = {
  body: { color: THEME.white, fontSize: 15 },
  strong: { color: THEME.teal, fontWeight: '900' as const },
  bullet_list: { color: THEME.white },
  paragraph: { marginVertical: 0 }
};