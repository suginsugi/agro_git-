import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Send, Menu, X, Bot, User, HelpCircle } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withRepeat,
  withSequence,
  SlideInDown,
  FadeIn
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Colors } from '../../src/constants/theme';

const { width } = Dimensions.get('window');

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
};

const suggestedQuestions = [
  "What's the best time to sow Paddy in Karnataka?",
  "How to treat Yellow Mosaic Virus in Tomato?",
  "Recommend a fertilizer schedule for Onion.",
  "What is the current market price of Cotton?"
];

// Animated 3-dot typing indicator
const TypingIndicator = () => {
  const dot1 = useSharedValue(0);
  const dot2 = useSharedValue(0);
  const dot3 = useSharedValue(0);

  useEffect(() => {
    const animateDot = (dot: any, delay: number) => {
      setTimeout(() => {
        dot.value = withRepeat(
          withSequence(
            withTiming(-5, { duration: 300 }),
            withTiming(0, { duration: 300 })
          ),
          -1,
          true
        );
      }, delay);
    };

    animateDot(dot1, 0);
    animateDot(dot2, 150);
    animateDot(dot3, 300);
  }, []);

  const getStyle = (dot: any) => useAnimatedStyle(() => ({
    transform: [{ translateY: dot.value }]
  }));

  return (
    <View style={styles.typingContainer}>
      <Animated.View style={[styles.dot, getStyle(dot1)]} />
      <Animated.View style={[styles.dot, getStyle(dot2)]} />
      <Animated.View style={[styles.dot, getStyle(dot3)]} />
    </View>
  );
};

export default function AIAssistantScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Hello! I am AgroVision AI. How can I assist you with your farm today?", sender: 'ai' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const slideAnim = useSharedValue(-width);

  const toggleSuggestions = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (showSuggestions) {
      slideAnim.value = withTiming(-width, { duration: 300 });
      setShowSuggestions(false);
    } else {
      slideAnim.value = withTiming(0, { duration: 300 });
      setShowSuggestions(true);
    }
  };

  const suggestionsStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: slideAnim.value }]
  }));

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const newMsg: Message = { id: Date.now().toString(), text: inputText, sender: 'user' };
    setMessages(prev => [...prev, newMsg]);
    setInputText('');
    setIsTyping(true);

    // Mock AI Response
    setTimeout(() => {
      const aiResponse: Message = { 
        id: (Date.now() + 1).toString(), 
        text: "Based on the latest agricultural data, that is an excellent approach. Make sure to monitor soil moisture levels regularly.", 
        sender: 'ai' 
      };
      setIsTyping(false);
      setMessages(prev => [...prev, aiResponse]);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, 2000);
  };

  const handleSuggestionPress = (text: string) => {
    setInputText(text);
    toggleSuggestions();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <Bot size={28} color={Colors.dark.primary} />
          <Text style={styles.headerTitle}>AgroVision AI</Text>
        </View>
        <Pressable onPress={toggleSuggestions} style={styles.menuBtn}>
          <HelpCircle size={24} color={Colors.dark.text} />
        </Pressable>
      </View>

      {/* Suggested Questions Drawer */}
      <Animated.View style={[styles.suggestionsDrawer, suggestionsStyle]}>
        <View style={styles.drawerHeader}>
          <Text style={styles.drawerTitle}>Suggested Questions</Text>
          <Pressable onPress={toggleSuggestions} style={styles.closeBtn}>
            <X size={24} color={Colors.dark.text} />
          </Pressable>
        </View>
        <ScrollView style={styles.drawerContent}>
          {suggestedQuestions.map((q, i) => (
            <Pressable key={i} style={styles.suggestionItem} onPress={() => handleSuggestionPress(q)}>
              <Text style={styles.suggestionText}>{q}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </Animated.View>

      <KeyboardAvoidingView 
        style={styles.chatArea}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView 
          ref={scrollViewRef}
          contentContainerStyle={styles.messagesList}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((msg, index) => (
            <Animated.View 
              key={msg.id} 
              entering={SlideInDown.springify().mass(0.5)}
              style={[
                styles.messageBubble, 
                msg.sender === 'user' ? styles.messageUser : styles.messageAI
              ]}
            >
              {msg.sender === 'ai' && (
                <View style={styles.avatarAI}>
                  <Bot size={16} color="#FFF" />
                </View>
              )}
              <View style={[styles.messageContent, msg.sender === 'user' ? styles.messageContentUser : styles.messageContentAI]}>
                <Text style={msg.sender === 'user' ? styles.messageTextUser : styles.messageTextAI}>
                  {msg.text}
                </Text>
              </View>
              {msg.sender === 'user' && (
                <View style={styles.avatarUser}>
                  <User size={16} color="#FFF" />
                </View>
              )}
            </Animated.View>
          ))}
          
          {isTyping && (
            <Animated.View entering={FadeIn} style={[styles.messageBubble, styles.messageAI]}>
              <View style={styles.avatarAI}>
                <Bot size={16} color="#FFF" />
              </View>
              <View style={styles.messageContentAI}>
                <TypingIndicator />
              </View>
            </Animated.View>
          )}
        </ScrollView>

        {/* Input Area */}
        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            placeholder="Ask anything about your farm..."
            placeholderTextColor={Colors.dark.textMuted}
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <Pressable 
            style={[styles.sendBtn, !inputText.trim() && styles.sendBtnDisabled]}
            onPress={handleSend}
            disabled={!inputText.trim()}
          >
            <Send size={20} color="#FFF" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.dark.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
    zIndex: 10,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  menuBtn: {
    padding: 8,
  },
  suggestionsDrawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: width * 0.8,
    backgroundColor: Colors.dark.surface,
    zIndex: 20,
    borderRightWidth: 1,
    borderRightColor: Colors.dark.border,
    elevation: 24,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  closeBtn: {
    padding: 4,
  },
  drawerContent: {
    flex: 1,
    padding: 16,
  },
  suggestionItem: {
    backgroundColor: Colors.dark.cardAlt,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  suggestionText: {
    fontSize: 15,
    color: Colors.dark.text,
    lineHeight: 22,
  },
  chatArea: {
    flex: 1,
  },
  messagesList: {
    padding: 20,
    paddingBottom: 40,
    gap: 16,
  },
  messageBubble: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    maxWidth: '85%',
    gap: 8,
  },
  messageUser: {
    alignSelf: 'flex-end',
  },
  messageAI: {
    alignSelf: 'flex-start',
  },
  avatarAI: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.dark.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarUser: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.dark.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  messageContentAI: {
    backgroundColor: Colors.dark.surface,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  messageContentUser: {
    backgroundColor: Colors.dark.primaryDark,
    borderBottomRightRadius: 4,
  },
  messageTextAI: {
    color: Colors.dark.text,
    fontSize: 15,
    lineHeight: 22,
  },
  messageTextUser: {
    color: '#FFF',
    fontSize: 15,
    lineHeight: 22,
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    height: 20,
    paddingHorizontal: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.dark.primary,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
    backgroundColor: Colors.dark.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.dark.border,
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    maxHeight: 120,
    minHeight: 44,
    color: Colors.dark.text,
    fontSize: 15,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.dark.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtnDisabled: {
    backgroundColor: Colors.dark.border,
  },
});
