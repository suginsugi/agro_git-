import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Linking, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Stack, router } from 'expo-router';
import { Phone, Mail, MapPin, Clock, ArrowLeft, CheckCircle2 } from 'lucide-react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, FadeIn, SlideInDown, ZoomIn } from 'react-native-reanimated';
import { Colors } from '../src/constants/theme';
import * as Haptics from 'expo-haptics';

// Floating Label Input Component
const FloatingLabelInput = ({ label, value, onChangeText, keyboardType = 'default', multiline = false }: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const labelTop = useSharedValue(value ? 8 : 20);
  const labelSize = useSharedValue(value ? 12 : 16);

  const handleFocus = () => {
    setIsFocused(true);
    labelTop.value = withTiming(8);
    labelSize.value = withTiming(12);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!value) {
      labelTop.value = withTiming(20);
      labelSize.value = withTiming(16);
    }
  };

  const animatedLabelStyle = useAnimatedStyle(() => ({
    top: labelTop.value,
    fontSize: labelSize.value,
    color: isFocused ? Colors.dark.primary : Colors.dark.textMuted,
  }));

  return (
    <View style={[styles.inputContainer, isFocused && styles.inputFocused, multiline && { height: 120 }]}>
      <Animated.Text style={[styles.floatingLabel, animatedLabelStyle]}>{label}</Animated.Text>
      <TextInput
        style={[styles.input, multiline && styles.inputMultiline]}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        keyboardType={keyboardType}
        multiline={multiline}
        placeholderTextColor="transparent"
        selectionColor={Colors.dark.primary}
      />
    </View>
  );
};

export default function SupportScreen() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const supportCards = [
    { title: 'Call Support', icon: Phone, action: () => Linking.openURL('tel:+9118001234567'), desc: '1800-123-4567' },
    { title: 'Email Us', icon: Mail, action: () => Linking.openURL('mailto:support@agrovision.io'), desc: 'support@agrovision.io' },
    { title: 'Location', icon: MapPin, action: () => {}, desc: 'Mysuru, Karnataka HQ' },
    { title: 'Business Hours', icon: Clock, action: () => {}, desc: 'Mon - Sat: 9 AM - 6 PM' },
  ];

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) return;
    
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }, 3000);
    }, 1500);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={Colors.dark.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <Animated.View entering={FadeIn.duration(600)} style={styles.grid}>
          {supportCards.map((card, i) => (
            <Pressable key={i} style={styles.card} onPress={card.action}>
              <View style={styles.iconBg}>
                <card.icon size={24} color={Colors.dark.primary} />
              </View>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardDesc}>{card.desc}</Text>
            </Pressable>
          ))}
        </Animated.View>

        <Animated.View entering={SlideInDown.duration(800).delay(300)} style={styles.formSection}>
          <Text style={styles.formTitle}>Send a Message</Text>
          
          <FloatingLabelInput label="Full Name" value={formData.name} onChangeText={(t: string) => setFormData({...formData, name: t})} />
          <FloatingLabelInput label="Email Address" value={formData.email} onChangeText={(t: string) => setFormData({...formData, email: t})} keyboardType="email-address" />
          <FloatingLabelInput label="Mobile Number (+91)" value={formData.phone} onChangeText={(t: string) => setFormData({...formData, phone: t})} keyboardType="phone-pad" />
          <FloatingLabelInput label="Subject" value={formData.subject} onChangeText={(t: string) => setFormData({...formData, subject: t})} />
          <FloatingLabelInput label="Message" value={formData.message} onChangeText={(t: string) => setFormData({...formData, message: t})} multiline />

          <Pressable style={styles.submitBtn} onPress={handleSubmit} disabled={isSubmitting || isSuccess}>
            {isSubmitting ? (
              <ActivityIndicator color="#FFF" />
            ) : isSuccess ? (
              <Animated.View entering={ZoomIn} style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                <CheckCircle2 size={20} color="#FFF" />
                <Text style={styles.submitText}>Sent Successfully</Text>
              </Animated.View>
            ) : (
              <Text style={styles.submitText}>Submit Message</Text>
            )}
          </Pressable>
        </Animated.View>
        
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
    backgroundColor: Colors.dark.surface,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 60,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 40,
  },
  card: {
    width: '47%',
    backgroundColor: Colors.dark.surface,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  iconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.dark.primaryAlpha,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 12,
    color: Colors.dark.textMuted,
  },
  formSection: {
    backgroundColor: Colors.dark.surface,
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 24,
  },
  inputContainer: {
    backgroundColor: Colors.dark.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    marginBottom: 16,
    height: 64,
    position: 'relative',
  },
  inputFocused: {
    borderColor: Colors.dark.primary,
  },
  floatingLabel: {
    position: 'absolute',
    left: 16,
    fontWeight: '500',
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    color: Colors.dark.text,
    fontSize: 16,
  },
  inputMultiline: {
    textAlignVertical: 'top',
    paddingTop: 32,
  },
  submitBtn: {
    backgroundColor: Colors.dark.primary,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  submitText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
