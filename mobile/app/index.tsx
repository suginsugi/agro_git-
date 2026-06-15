import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { router } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withDelay,
  withRepeat,
  withSpring,
  withSequence,
  FadeIn,
  SlideInDown
} from 'react-native-reanimated';
import { MapPin, ArrowRight, CloudSun } from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../src/constants/theme';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

// Animated SVG Component for Heartbeat
const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function LandingScreen() {
  const arrowOffset = useSharedValue(0);
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    // Pulse animation for the live timestamp
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const handlePressIn = () => {
    arrowOffset.value = withSpring(4);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handlePressOut = () => {
    arrowOffset.value = withSpring(0);
  };

  const handleDashboardNav = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.replace('/(tabs)/dashboard');
  };

  const arrowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: arrowOffset.value }]
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }]
  }));

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.locationBadge}>
          <MapPin size={14} color={Colors.dark.textMuted} />
          <Text style={styles.locationText}>Sriperumbudur, Tamil Nadu</Text>
        </View>
        <View style={styles.timePill}>
          <Animated.View style={[styles.pulseDot, pulseStyle]} />
          <Text style={styles.timeText}>Live • {currentTime}</Text>
        </View>
      </View>

      <View style={styles.content}>
        {/* Hero Text */}
        <Animated.View entering={FadeIn.duration(800)}>
          <Text style={styles.heroTitle}>
            AgroVision <Text style={styles.heroTitleHighlight}>Delivers</Text>
          </Text>
        </Animated.View>
        <Animated.View entering={SlideInDown.duration(800).delay(300)}>
          <Text style={styles.heroSubtitle}>
            AI-powered precision agriculture at your fingertips. Monitor crop health, analyze soil, and optimize your farm's yield in real-time.
          </Text>
        </Animated.View>

        {/* Stacked Overlay Cards */}
        <View style={styles.cardsContainer}>
          {/* Card 1: Crop Health */}
          <Animated.View 
            entering={SlideInDown.duration(800).delay(600)}
            style={[styles.card, styles.healthCard]}
          >
            <Text style={styles.cardTitle}>Crop Health: <Text style={{color: Colors.dark.primary}}>Optimal</Text></Text>
            <View style={styles.waveformContainer}>
              <Svg width="100%" height="40" viewBox="0 0 200 40">
                <AnimatedPath
                  d="M0 20 L50 20 L60 5 L70 35 L80 15 L90 25 L100 20 L200 20"
                  stroke={Colors.dark.primary}
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </View>
          </Animated.View>

          {/* Card 2: Weather AI */}
          <Animated.View 
            entering={FadeIn.duration(800).delay(900)}
            style={[styles.card, styles.weatherCard]}
          >
            <View style={styles.weatherRow}>
              <CloudSun size={24} color={Colors.dark.accent} />
              <View style={styles.weatherInfo}>
                <Text style={styles.cardTitle}>Weather AI Forecast</Text>
                <Text style={styles.microCopy}>Clear skies • Ideal conditions for spraying</Text>
              </View>
            </View>
          </Animated.View>
        </View>
      </View>

      {/* CTA Button */}
      <Animated.View entering={SlideInDown.duration(800).delay(1100)} style={styles.ctaContainer}>
        <Pressable 
          style={styles.ctaButton}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={handleDashboardNav}
        >
          <Text style={styles.ctaText}>Open Dashboard</Text>
          <Animated.View style={arrowStyle}>
            <ArrowRight size={20} color="#FFFFFF" />
          </Animated.View>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 48,
  },
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    gap: 6,
  },
  locationText: {
    color: Colors.dark.textMuted,
    fontSize: 12,
    fontWeight: '500',
  },
  timePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
    gap: 6,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.dark.danger,
  },
  timeText: {
    color: Colors.dark.danger,
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 42,
    fontWeight: '800',
    color: Colors.dark.text,
    letterSpacing: -1,
    lineHeight: 50,
  },
  heroTitleHighlight: {
    color: Colors.dark.primary,
  },
  heroSubtitle: {
    fontSize: 16,
    color: Colors.dark.textMuted,
    marginTop: 16,
    lineHeight: 24,
  },
  cardsContainer: {
    marginTop: 48,
    gap: -24, // Negative margin to stack them
  },
  card: {
    backgroundColor: Colors.dark.surface,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  },
  healthCard: {
    zIndex: 2,
    height: 140,
  },
  weatherCard: {
    zIndex: 1,
    paddingTop: 40, // Space for the overlap
    backgroundColor: Colors.dark.cardAlt,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  waveformContainer: {
    marginTop: 16,
    height: 40,
    justifyContent: 'center',
  },
  weatherRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  weatherInfo: {
    flex: 1,
  },
  microCopy: {
    color: Colors.dark.textMuted,
    fontSize: 13,
    marginTop: 4,
  },
  ctaContainer: {
    paddingBottom: 48,
  },
  ctaButton: {
    backgroundColor: Colors.dark.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    gap: 8,
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
