import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, KeyboardAvoidingView, Platform, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Markdown from 'react-native-markdown-display'; // Extensión Markdown
import ChatInput from '../components/ChatInput';

export default function ChatScreen() {
  const [messages, setMessages] = useState([{ id: '1', text: "SISTEMA INICIADO. Esperando consulta...", sender: 'bosco' }]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      {/* Ajuste de Teclado para Android (padding) y iOS (height/offset) */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>NEURAL_BOSCO_v1.0</Text>
          </View>

          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={i => i.id}
            contentContainerStyle={{ padding: 20 }}
            renderItem={({ item }) => (
              <View style={[styles.bubble, item.sender === 'user' ? styles.userB : styles.boscoB]}>
                {/* Renderizado de Markdown */}
                <Markdown style={markdownStyles}>
                  {item.text}
                </Markdown>
              </View>
            )}
          />

          {isTyping && <ActivityIndicator color="#008080" style={{ marginBottom: 10 }} />}
          
          <ChatInput 
            value={inputText} 
            onChangeText={setInputText} 
            onSend={() => {/* Tu lógica de fetch aquí */}} 
            disabled={isTyping} 
          />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { padding: 20, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)' },
  headerTitle: { color: '#008080', fontWeight: '900', letterSpacing: 2, fontSize: 12, textAlign: 'center' },
  bubble: { padding: 16, marginBottom: 12, maxWidth: '90%', borderRadius: 2 },
  userB: { alignSelf: 'flex-end', backgroundColor: '#008080' },
  boscoB: { alignSelf: 'flex-start', backgroundColor: '#1A1A1A', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }
});

const markdownStyles = {
  body: { color: '#FFFFFF', fontSize: 15 },
  strong: { fontWeight: 'bold', color: '#008080' },
  bullet_list: { color: '#FFFFFF' }
};