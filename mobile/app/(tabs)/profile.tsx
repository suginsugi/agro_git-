import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, MapPin, Leaf, Droplets, Target, HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';
import Animated, { 
  useAnimatedStyle, 
  withTiming, 
  interpolateColor,
  useSharedValue,
  FadeIn
} from 'react-native-reanimated';
import { Colors } from '../../src/constants/theme';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';

const CHIP_DATA = [
  { id: '1', label: 'Tomato' },
  { id: '2', label: 'Onion' },
  { id: '3', label: 'Paddy' },
  { id: '4', label: 'Cotton' },
  { id: '5', label: 'Sugarcane' },
];

const AnimatedChip = ({ label, selected, onPress }: any) => {
  const progress = useSharedValue(selected ? 1 : 0);

  React.useEffect(() => {
    progress.value = withTiming(selected ? 1 : 0, { duration: 300 });
  }, [selected]);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.dark.cardAlt, Colors.dark.primary]
    );
    const borderColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.dark.border, Colors.dark.primary]
    );
    return { backgroundColor, borderColor };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.dark.textMuted, '#FFFFFF']
    );
    return { color };
  });

  return (
    <Pressable onPress={onPress}>
      <Animated.View style={[styles.chip, animatedStyle]}>
        <Animated.Text style={[styles.chipText, animatedTextStyle]}>{label}</Animated.Text>
      </Animated.View>
    </Pressable>
  );
};

export default function ProfileScreen() {
  const [preferences, setPreferences] = useState<string[]>(['Tomato', 'Onion', 'Paddy']);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const togglePreference = (label: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setPreferences(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', style: 'destructive', onPress: () => {
        router.replace('/');
      }},
    ]);
  };

  const InfoGridItem = ({ icon: Icon, label, value }: any) => (
    <View style={styles.gridItem}>
      <View style={styles.gridIconBg}>
        <Icon size={18} color={Colors.dark.primary} />
      </View>
      <View>
        <Text style={styles.gridLabel}>{label}</Text>
        <Text style={styles.gridValue}>{value}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        
        <Animated.View entering={FadeIn} style={styles.profileHeaderCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <User size={36} color="#FFF" />
            </View>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>Raj Singh</Text>
            <View style={styles.idBadge}>
              <Text style={styles.idText}>Farmer ID: AGR-88219-X</Text>
            </View>
          </View>
        </Animated.View>

        <Text style={styles.sectionTitle}>Farm Information</Text>
        <Animated.View entering={FadeIn.delay(150)} style={styles.infoGrid}>
          <InfoGridItem icon={MapPin} label="Land Area" value="124.5 Acres" />
          <InfoGridItem icon={Leaf} label="Crop Types" value="Multi-Crop" />
          <InfoGridItem icon={Droplets} label="Irrigation" value="Drip System" />
          <InfoGridItem icon={Target} label="Soil Type" value="Red Sandy Loam" />
        </Animated.View>

        <Text style={styles.sectionTitle}>Market Preferences</Text>
        <Animated.View entering={FadeIn.delay(300)} style={styles.preferencesCard}>
          <Text style={styles.prefDesc}>Select crops to receive targeted market price alerts and intelligence.</Text>
          <View style={styles.chipContainer}>
            {CHIP_DATA.map(chip => (
              <AnimatedChip 
                key={chip.id} 
                label={chip.label} 
                selected={preferences.includes(chip.label)}
                onPress={() => togglePreference(chip.label)}
              />
            ))}
          </View>
        </Animated.View>

        <Text style={styles.sectionTitle}>Settings</Text>
        <Animated.View entering={FadeIn.delay(450)} style={styles.settingsCard}>
          <View style={styles.settingRow}>
            <Text style={styles.settingText}>Push Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: Colors.dark.border, true: Colors.dark.primary }}
              thumbColor={'#FFF'}
            />
          </View>
          
          <View style={styles.settingDivider} />

          <Pressable style={styles.settingRow} onPress={() => router.push('/support')}>
            <View style={styles.settingLeft}>
              <HelpCircle size={20} color={Colors.dark.textMuted} />
              <Text style={styles.settingText}>Help & Support</Text>
            </View>
            <ChevronRight size={20} color={Colors.dark.textMuted} />
          </Pressable>

          <View style={styles.settingDivider} />

          <Pressable style={styles.settingRow} onPress={handleLogout}>
            <View style={styles.settingLeft}>
              <LogOut size={20} color={Colors.dark.danger} />
              <Text style={[styles.settingText, { color: Colors.dark.danger }]}>Log Out</Text>
            </View>
          </Pressable>
        </Animated.View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  profileHeaderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.surface,
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    marginBottom: 32,
    gap: 20,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.dark.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: Colors.dark.surface,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.dark.text,
    marginBottom: 8,
  },
  idBadge: {
    backgroundColor: Colors.dark.cardAlt,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  idText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.dark.primary,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 32,
  },
  gridItem: {
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.surface,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    gap: 12,
  },
  gridIconBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.dark.primaryAlpha,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridLabel: {
    fontSize: 11,
    color: Colors.dark.textMuted,
    marginBottom: 2,
  },
  gridValue: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  preferencesCard: {
    backgroundColor: Colors.dark.surface,
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    marginBottom: 32,
  },
  prefDesc: {
    fontSize: 14,
    color: Colors.dark.textMuted,
    marginBottom: 20,
    lineHeight: 20,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  settingsCard: {
    backgroundColor: Colors.dark.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.dark.text,
  },
  settingDivider: {
    height: 1,
    backgroundColor: Colors.dark.border,
    marginLeft: 20,
  },
});
