import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Stack, router } from 'expo-router';
import { ArrowLeft, UploadCloud, FileText, CheckCircle2, FlaskConical } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  useAnimatedProps,
  withTiming, 
  withRepeat, 
  withSequence,
  FadeIn,
  FadeOut,
  SlideInUp
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import * as DocumentPicker from 'expo-document-picker';
import * as Haptics from 'expo-haptics';
import { Colors } from '../src/constants/theme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function SoilAnalysisScreen() {
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'analyzing' | 'success'>('idle');
  const [fileName, setFileName] = useState('');
  
  const progress = useSharedValue(0);
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    if (uploadState === 'analyzing') {
      progress.value = withTiming(100, { duration: 3000 });
      pulseScale.value = withRepeat(
        withSequence(
          withTiming(1.05, { duration: 500 }),
          withTiming(1, { duration: 500 })
        ),
        -1,
        true
      );

      const timer = setTimeout(() => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setUploadState('success');
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [uploadState]);

  const handleUpload = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setFileName(result.assets[0].name);
        setUploadState('analyzing');
      }
    } catch (err) {
      console.log('Error picking document', err);
    }
  };

  const animatedProps = useAnimatedProps(() => {
    const circumference = 2 * Math.PI * 60;
    const strokeDashoffset = circumference - (progress.value / 100) * circumference;
    return {
      strokeDashoffset,
    };
  });

  const animatedPulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }]
  }));

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={Colors.dark.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Soil Intelligence Center</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {uploadState === 'idle' && (
          <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.uploadContainer}>
            <Text style={styles.sectionTitle}>Upload Soil Report</Text>
            <Text style={styles.sectionDesc}>Select a PDF or image of your recent lab report for AI analysis.</Text>
            
            <Pressable style={styles.dashedZone} onPress={handleUpload}>
              <View style={styles.iconBg}>
                <UploadCloud size={32} color={Colors.dark.primary} />
              </View>
              <Text style={styles.uploadText}>Tap to select or take photo</Text>
              <Text style={styles.uploadSubtext}>Supported formats: PDF, JPG, PNG</Text>
            </Pressable>
          </Animated.View>
        )}

        {uploadState === 'analyzing' && (
          <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.analyzingContainer}>
            <Animated.View style={[styles.progressCircleContainer, animatedPulseStyle]}>
              <Svg width={140} height={140} viewBox="0 0 140 140">
                <Circle
                  cx={70}
                  cy={70}
                  r={60}
                  stroke={Colors.dark.border}
                  strokeWidth={8}
                  fill="none"
                />
                <AnimatedCircle
                  cx={70}
                  cy={70}
                  r={60}
                  stroke={Colors.dark.primary}
                  strokeWidth={8}
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 60}
                  animatedProps={animatedProps}
                  transform="rotate(-90 70 70)"
                />
              </Svg>
              <View style={styles.progressInnerIcon}>
                <FileText size={32} color={Colors.dark.primary} />
              </View>
            </Animated.View>

            <Text style={styles.analyzingTitle}>Processing Report</Text>
            <Text style={styles.analyzingText}>OCR Text Extraction & AI Analysis in progress...</Text>
            <Text style={styles.fileName}>{fileName}</Text>
          </Animated.View>
        )}

        {uploadState === 'success' && (
          <Animated.View entering={SlideInUp.duration(600)} style={styles.successContainer}>
            <View style={styles.successIconBg}>
              <CheckCircle2 size={48} color={Colors.dark.primary} />
            </View>
            <Text style={styles.successTitle}>Analysis Complete</Text>
            
            <View style={styles.resultsCard}>
              <View style={styles.resultHeader}>
                <FlaskConical size={20} color={Colors.dark.accent} />
                <Text style={styles.resultHeaderTitle}>Key Findings</Text>
              </View>
              
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>pH Level</Text>
                <Text style={styles.resultValue}>6.8 (Optimal)</Text>
              </View>
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Nitrogen (N)</Text>
                <Text style={[styles.resultValue, {color: Colors.dark.danger}]}>Deficient</Text>
              </View>
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Phosphorus (P)</Text>
                <Text style={styles.resultValue}>Adequate</Text>
              </View>
              
              <View style={styles.recommendationBox}>
                <Text style={styles.recTitle}>AI Recommendation</Text>
                <Text style={styles.recText}>Apply 40kg/acre of Urea in split doses. Add organic compost to improve moisture retention.</Text>
              </View>
            </View>

            <Pressable 
              style={styles.doneBtn}
              onPress={() => setUploadState('idle')}
            >
              <Text style={styles.doneBtnText}>Scan Another Report</Text>
            </Pressable>
          </Animated.View>
        )}
      </ScrollView>
    </View>
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
    backgroundColor: Colors.dark.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
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
    fontSize: 18,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  content: {
    flexGrow: 1,
    padding: 24,
  },
  uploadContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 8,
  },
  sectionDesc: {
    fontSize: 14,
    color: Colors.dark.textMuted,
    marginBottom: 32,
    lineHeight: 20,
  },
  dashedZone: {
    borderWidth: 2,
    borderColor: Colors.dark.border,
    borderStyle: 'dashed',
    borderRadius: 24,
    padding: 40,
    alignItems: 'center',
    backgroundColor: Colors.dark.surface,
  },
  iconBg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.dark.primaryAlpha,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  uploadText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 8,
  },
  uploadSubtext: {
    fontSize: 14,
    color: Colors.dark.textMuted,
  },
  analyzingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  progressCircleContainer: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  progressInnerIcon: {
    position: 'absolute',
  },
  analyzingTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 12,
  },
  analyzingText: {
    fontSize: 15,
    color: Colors.dark.textMuted,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  fileName: {
    fontSize: 13,
    color: Colors.dark.primary,
    fontWeight: '500',
    backgroundColor: Colors.dark.primaryAlpha,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  successContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  successIconBg: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.dark.primaryAlpha,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 32,
  },
  resultsCard: {
    width: '100%',
    backgroundColor: Colors.dark.surface,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    marginBottom: 32,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  resultHeaderTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  resultLabel: {
    fontSize: 15,
    color: Colors.dark.textMuted,
  },
  resultValue: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.dark.primary,
  },
  recommendationBox: {
    marginTop: 20,
    backgroundColor: Colors.dark.background,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  recTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 8,
  },
  recText: {
    fontSize: 14,
    color: Colors.dark.textMuted,
    lineHeight: 22,
  },
  doneBtn: {
    width: '100%',
    backgroundColor: Colors.dark.primary,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  doneBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
