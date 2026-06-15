import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrendingUp, TrendingDown, RefreshCw, BarChart3 } from 'lucide-react-native';
import Animated, { 
  useAnimatedStyle, 
  withTiming, 
  withSequence,
  useSharedValue,
  FadeIn
} from 'react-native-reanimated';
import { Colors } from '../../src/constants/theme';
import * as Haptics from 'expo-haptics';

type MarketData = {
  id: string;
  commodity: string;
  price: number;
  change: number;
  isPositive: boolean;
};

const INITIAL_DATA: MarketData[] = [
  { id: '1', commodity: 'Tomato (Hybrid)', price: 3200, change: 4.2, isPositive: true },
  { id: '2', commodity: 'Onion (Red)', price: 2100, change: 1.6, isPositive: true },
  { id: '3', commodity: 'Paddy (Sona)', price: 2450, change: 0.8, isPositive: false },
  { id: '4', commodity: 'Cotton (MCU-5)', price: 7100, change: 2.4, isPositive: true },
  { id: '5', commodity: 'Sugarcane', price: 315, change: 0.0, isPositive: true },
];

const AnimatedChangePill = ({ change, isPositive, updated }: { change: number, isPositive: boolean, updated: boolean }) => {
  const glowOpacity = useSharedValue(0);

  useEffect(() => {
    if (updated) {
      glowOpacity.value = withSequence(
        withTiming(1, { duration: 300 }),
        withTiming(0, { duration: 1500 })
      );
    }
  }, [updated]);

  const animatedGlowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const color = isPositive ? Colors.dark.primary : Colors.dark.danger;
  const Icon = isPositive ? TrendingUp : TrendingDown;
  const changeText = `${isPositive ? '+' : '-'}${Math.abs(change).toFixed(1)}%`;

  if (change === 0) {
    return (
      <View style={[styles.pill, { backgroundColor: Colors.dark.cardAlt }]}>
        <Text style={[styles.pillText, { color: Colors.dark.textMuted }]}>0.0%</Text>
      </View>
    );
  }

  return (
    <View style={styles.pillContainer}>
      {/* Animated Glow Effect behind the pill */}
      <Animated.View 
        style={[
          styles.pillGlow, 
          { backgroundColor: color }, 
          animatedGlowStyle
        ]} 
      />
      <View style={[styles.pill, { backgroundColor: isPositive ? Colors.dark.primaryAlpha : Colors.dark.dangerAlpha }]}>
        <Icon size={12} color={color} strokeWidth={3} />
        <Text style={[styles.pillText, { color }]}>{changeText}</Text>
      </View>
    </View>
  );
};

export default function AgriMarketScreen() {
  const [data, setData] = useState<MarketData[]>(INITIAL_DATA);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());
  const [didUpdate, setDidUpdate] = useState(false);

  const simulateMarketUpdate = () => {
    const newData = data.map(item => {
      // Randomly change price by -5% to +5%
      const volatility = (Math.random() * 10 - 5) / 100;
      const newPrice = Math.round(item.price * (1 + volatility));
      const priceDiff = newPrice - item.price;
      const percentChange = (priceDiff / item.price) * 100;
      
      return {
        ...item,
        price: newPrice,
        change: Math.abs(percentChange),
        isPositive: percentChange >= 0
      };
    });
    
    setData(newData);
    setLastUpdated(new Date().toLocaleTimeString());
    setDidUpdate(true);
    
    // Reset update trigger for animations
    setTimeout(() => setDidUpdate(false), 2000);
  };

  const onRefresh = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setRefreshing(true);
    setTimeout(() => {
      simulateMarketUpdate();
      setRefreshing(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Market Intel</Text>
          <View style={styles.liveIndicator}>
            <RefreshCw size={12} color={Colors.dark.textMuted} />
            <Text style={styles.liveText}>Updated: {lastUpdated}</Text>
          </View>
        </View>
        <View style={styles.headerIcon}>
          <BarChart3 size={24} color={Colors.dark.primary} />
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh} 
            tintColor={Colors.dark.primary}
            colors={[Colors.dark.primary]}
          />
        }
      >
        <Animated.View entering={FadeIn.duration(800)} style={styles.tableCard}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.colHeader, { flex: 2 }]}>Commodity</Text>
            <Text style={[styles.colHeader, { flex: 1.5, textAlign: 'right' }]}>Price (₹/QTL)</Text>
            <Text style={[styles.colHeader, { flex: 1, textAlign: 'right' }]}>Change</Text>
          </View>

          {/* Table Rows */}
          {data.map((item, index) => (
            <View key={item.id} style={[styles.tableRow, index === data.length - 1 && styles.tableRowLast]}>
              <View style={{ flex: 2 }}>
                <Text style={styles.commodityName}>{item.commodity}</Text>
              </View>
              <View style={{ flex: 1.5, alignItems: 'flex-end' }}>
                <Text style={styles.priceValue}>₹{item.price.toLocaleString()}</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <AnimatedChangePill 
                  change={item.change} 
                  isPositive={item.isPositive} 
                  updated={didUpdate}
                />
              </View>
            </View>
          ))}
        </Animated.View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Market Insights</Text>
          <Text style={styles.infoText}>Tomato prices are expected to rise further due to unexpected rain in major producing states. Consider holding current inventory.</Text>
        </View>

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
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  liveText: {
    fontSize: 13,
    color: Colors.dark.textMuted,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.dark.surface,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 24,
  },
  tableCard: {
    backgroundColor: Colors.dark.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    paddingVertical: 16,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  colHeader: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.dark.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  tableRowLast: {
    borderBottomWidth: 0,
    paddingBottom: 8,
  },
  commodityName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.dark.text,
  },
  priceValue: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.dark.text,
    fontVariant: ['tabular-nums'],
  },
  pillContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
    zIndex: 2,
  },
  pillGlow: {
    position: 'absolute',
    top: -4,
    bottom: -4,
    left: -4,
    right: -4,
    borderRadius: 12,
    zIndex: 1,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '700',
  },
  infoBox: {
    backgroundColor: Colors.dark.primaryAlpha,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.dark.primary,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: Colors.dark.text,
    lineHeight: 22,
  },
});
