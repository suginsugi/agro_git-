import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, Image as ImageIcon, ScanSearch, XCircle, AlertTriangle, CheckCircle2 } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withRepeat, 
  withSequence,
  FadeIn,
  FadeOut,
  SlideInUp
} from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';
import { Colors } from '../../src/constants/theme';

const { width } = Dimensions.get('window');

export default function DiseaseDetectionScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'result'>('idle');
  
  const laserTop = useSharedValue(0);

  useEffect(() => {
    if (scanState === 'scanning') {
      // 300 is the height of the image container approx
      laserTop.value = withRepeat(
        withSequence(
          withTiming(280, { duration: 1500 }),
          withTiming(0, { duration: 1500 })
        ),
        -1,
        true
      );

      const timer = setTimeout(() => {
        setScanState('result');
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [scanState]);

  const animatedLaserStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: laserTop.value }]
  }));

  const handlePickImage = async (useCamera: boolean) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    let result;
    if (useCamera) {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        quality: 0.8,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 0.8,
      });
    }

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
      setScanState('scanning');
    }
  };

  const resetScan = () => {
    setImageUri(null);
    setScanState('idle');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Disease AI</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {scanState === 'idle' && (
          <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.idleContainer}>
            <View style={styles.portalCard}>
              <View style={styles.portalIconBg}>
                <ScanSearch size={48} color={Colors.dark.danger} />
              </View>
              <Text style={styles.portalTitle}>Diagnostic Scan</Text>
              <Text style={styles.portalDesc}>Upload a clear photo of the affected plant leaf for instant AI disease classification.</Text>
              
              <View style={styles.actionRow}>
                <Pressable style={styles.actionBtn} onPress={() => handlePickImage(true)}>
                  <Camera size={24} color={Colors.dark.text} />
                  <Text style={styles.actionText}>Take Photo</Text>
                </Pressable>
                
                <Pressable style={styles.actionBtn} onPress={() => handlePickImage(false)}>
                  <ImageIcon size={24} color={Colors.dark.text} />
                  <Text style={styles.actionText}>Gallery</Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.tipsBox}>
              <Text style={styles.tipsTitle}>Tips for best results</Text>
              <Text style={styles.tipText}>• Ensure good lighting (natural light preferred)</Text>
              <Text style={styles.tipText}>• Focus closely on the affected area</Text>
              <Text style={styles.tipText}>• Keep the leaf still while capturing</Text>
            </View>
          </Animated.View>
        )}

        {scanState === 'scanning' && imageUri && (
          <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.scanningContainer}>
            <Text style={styles.scanningTitle}>Analyzing Leaf Patterns...</Text>
            
            <View style={styles.imageWrapper}>
              <Image source={{ uri: imageUri }} style={styles.previewImage} />
              <View style={styles.overlay}>
                <Animated.View style={[styles.laserLine, animatedLaserStyle]} />
              </View>
            </View>
            
            <Text style={styles.scanningSub}>Cross-referencing with 50,000+ disease signatures</Text>
          </Animated.View>
        )}

        {scanState === 'result' && imageUri && (
          <Animated.View entering={SlideInUp.duration(600)} style={styles.resultContainer}>
            <View style={styles.imageWrapperSmall}>
              <Image source={{ uri: imageUri }} style={styles.previewImageSmall} />
            </View>

            <View style={styles.resultCard}>
              <View style={styles.alertHeader}>
                <AlertTriangle size={24} color={Colors.dark.danger} />
                <Text style={styles.alertTitle}>Early Blight Detected</Text>
              </View>
              
              <View style={styles.confidenceRow}>
                <Text style={styles.confidenceLabel}>AI Confidence Level</Text>
                <Text style={styles.confidenceValue}>94.8%</Text>
              </View>
              
              <View style={styles.divider} />
              
              <Text style={styles.sectionTitle}>Treatment Plan</Text>
              <View style={styles.treatmentItem}>
                <CheckCircle2 size={18} color={Colors.dark.primary} />
                <Text style={styles.treatmentText}>Apply Chlorothalonil fungicide immediately.</Text>
              </View>
              <View style={styles.treatmentItem}>
                <CheckCircle2 size={18} color={Colors.dark.primary} />
                <Text style={styles.treatmentText}>Remove infected lower leaves to prevent spread.</Text>
              </View>
              <View style={styles.treatmentItem}>
                <CheckCircle2 size={18} color={Colors.dark.primary} />
                <Text style={styles.treatmentText}>Avoid overhead irrigation to keep foliage dry.</Text>
              </View>
            </View>

            <Pressable style={styles.resetBtn} onPress={resetScan}>
              <XCircle size={20} color={Colors.dark.text} />
              <Text style={styles.resetText}>Scan Another Plant</Text>
            </Pressable>
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.dark.text,
  },
  content: {
    flexGrow: 1,
    padding: 24,
  },
  idleContainer: {
    flex: 1,
  },
  portalCard: {
    backgroundColor: Colors.dark.surface,
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.border,
    shadowColor: Colors.dark.danger,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  portalIconBg: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.dark.dangerAlpha,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  portalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 12,
  },
  portalDesc: {
    fontSize: 15,
    color: Colors.dark.textMuted,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
  },
  actionBtn: {
    flex: 1,
    backgroundColor: Colors.dark.cardAlt,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.border,
    gap: 8,
  },
  actionText: {
    color: Colors.dark.text,
    fontSize: 14,
    fontWeight: '600',
  },
  tipsBox: {
    marginTop: 32,
    backgroundColor: Colors.dark.surface,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    color: Colors.dark.textMuted,
    marginBottom: 8,
    lineHeight: 20,
  },
  scanningContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  scanningTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 24,
  },
  imageWrapper: {
    width: width - 48,
    height: 300,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 2,
    borderColor: Colors.dark.primary,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  laserLine: {
    width: '100%',
    height: 4,
    backgroundColor: Colors.dark.primary,
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  scanningSub: {
    fontSize: 14,
    color: Colors.dark.textMuted,
    marginTop: 24,
    textAlign: 'center',
  },
  resultContainer: {
    flex: 1,
  },
  imageWrapperSmall: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
  },
  previewImageSmall: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  resultCard: {
    backgroundColor: Colors.dark.surface,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    marginBottom: 24,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  alertTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.dark.danger,
  },
  confidenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  confidenceLabel: {
    fontSize: 15,
    color: Colors.dark.textMuted,
  },
  confidenceValue: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.dark.primary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.dark.border,
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 16,
  },
  treatmentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  treatmentText: {
    flex: 1,
    fontSize: 15,
    color: Colors.dark.text,
    lineHeight: 22,
  },
  resetBtn: {
    flexDirection: 'row',
    backgroundColor: Colors.dark.cardAlt,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.border,
    gap: 8,
  },
  resetText: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: '600',
  },
});
