import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Pressable, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, MapPin, Droplets, Thermometer, Wind, Sprout, AlertCircle } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSpring,
  withDelay,
  FadeIn
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '../../src/constants/theme';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const fields = [
  { id: 'A', name: 'Block A - Tomato', status: 'HEALTHY', statusColor: Colors.dark.primary, progress: 65, day: 85, totalDays: 130, humidity: '64%', temp: '28°C' },
  { id: 'B', name: 'Block B - Onion', status: 'EXCELLENT', statusColor: '#10B981', progress: 40, day: 45, totalDays: 110, humidity: '58%', temp: '29°C' },
  { id: 'C', name: 'Block C - Paddy', status: 'STRESS', statusColor: Colors.dark.accent, progress: 25, day: 35, totalDays: 140, humidity: '82%', temp: '31°C' },
];

const ProgressBar = ({ progress }: { progress: number }) => {
  const widthVal = useSharedValue(0);

  useEffect(() => {
    widthVal.value = withDelay(500, withTiming(progress, { duration: 1500 }));
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${widthVal.value}%`,
  }));

  return (
    <View style={styles.progressTrack}>
      <Animated.View style={[styles.progressFill, animatedStyle]} />
    </View>
  );
};

const ImageUploadButton = () => {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const handlePress = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        quality: 0.8,
      });
      if (!result.canceled) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Pressable 
        style={styles.uploadBtn}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
      >
        <Camera size={24} color={Colors.dark.primary} />
        <Text style={styles.uploadBtnText}>Attach Field Photo</Text>
      </Pressable>
    </Animated.View>
  );
};

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Field Reports</Text>
          <View style={styles.locationRow}>
            <MapPin size={14} color={Colors.dark.textMuted} />
            <Text style={styles.locationText}>Mysuru, Karnataka</Text>
          </View>
        </View>
        <Pressable onPress={() => router.push('/support')} style={styles.supportBtn}>
          <AlertCircle size={20} color={Colors.dark.textMuted} />
        </Pressable>
      </View>

      <ScrollView 
        horizontal 
        pagingEnabled 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        decelerationRate="fast"
        snapToInterval={width}
      >
        {fields.map((field, index) => (
          <View key={field.id} style={[styles.page, { width }]}>
            <Animated.View entering={FadeIn.delay(index * 200)} style={styles.card}>
              
              {/* Card Header */}
              <View style={styles.cardHeader}>
                <View style={styles.titleRow}>
                  <View style={styles.iconBg}>
                    <Sprout size={24} color={Colors.dark.primary} />
                  </View>
                  <Text style={styles.blockName}>{field.name}</Text>
                </View>
                <View style={[styles.statusPill, { backgroundColor: field.statusColor + '20', borderColor: field.statusColor + '40' }]}>
                  <Text style={[styles.statusText, { color: field.statusColor }]}>{field.status}</Text>
                </View>
              </View>

              {/* Stats Row */}
              <View style={styles.statsRow}>
                <View style={styles.statBox}>
                  <Droplets size={18} color={Colors.dark.secondary} />
                  <Text style={styles.statVal}>{field.humidity}</Text>
                  <Text style={styles.statLabel}>Moisture</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statBox}>
                  <Thermometer size={18} color={Colors.dark.accent} />
                  <Text style={styles.statVal}>{field.temp}</Text>
                  <Text style={styles.statLabel}>Temp</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statBox}>
                  <Wind size={18} color="#A78BFA" />
                  <Text style={styles.statVal}>12 km/h</Text>
                  <Text style={styles.statLabel}>Wind</Text>
                </View>
              </View>

              {/* Progress Bar Section */}
              <View style={styles.progressSection}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressTitle}>Growth Stage</Text>
                  <Text style={styles.progressText}>Day {field.day} / {field.totalDays}</Text>
                </View>
                <ProgressBar progress={field.progress} />
                <Text style={styles.progressSub}>Estimated harvest in {field.totalDays - field.day} days</Text>
              </View>

              {/* Action Section */}
              <View style={styles.actionSection}>
                <ImageUploadButton />
              </View>

            </Animated.View>
          </View>
        ))}
      </ScrollView>

      {/* Pagination indicators (Static representation) */}
      <View style={styles.pagination}>
        {fields.map((_, i) => (
          <View key={i} style={[styles.dot, i === 0 && styles.dotActive]} />
        ))}
      </View>
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
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.dark.text,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 6,
  },
  locationText: {
    fontSize: 14,
    color: Colors.dark.textMuted,
    fontWeight: '500',
  },
  supportBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.dark.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  scrollContent: {
    alignItems: 'center',
  },
  page: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: Colors.dark.surface,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.dark.primaryAlpha,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blockName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  statusPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.dark.cardAlt,
    borderRadius: 20,
    padding: 16,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  statVal: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.dark.textMuted,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.dark.border,
    marginVertical: 4,
  },
  progressSection: {
    marginBottom: 32,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.dark.primary,
  },
  progressTrack: {
    height: 10,
    backgroundColor: Colors.dark.cardAlt,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.dark.primary,
    borderRadius: 5,
  },
  progressSub: {
    fontSize: 12,
    color: Colors.dark.textMuted,
  },
  actionSection: {
    marginTop: 8,
  },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: Colors.dark.cardAlt,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    borderStyle: 'dashed',
    borderRadius: 16,
    paddingVertical: 20,
  },
  uploadBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.dark.border,
  },
  dotActive: {
    width: 24,
    backgroundColor: Colors.dark.primary,
  },
});
