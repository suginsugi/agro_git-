import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import * as Location from 'expo-location';
import { ArrowLeft, CloudSun, Droplets, Wind, Thermometer, Eye, Sun, CloudRain, MapPin } from 'lucide-react-native';
import { weatherApi } from '@/services/api';

export default function WeatherScreen() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [locationName, setLocationName] = useState('Loading...');

  const fetchWeather = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      let lat = 12.2958, lon = 76.6394; // Default: Mysuru

      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({});
        lat = loc.coords.latitude;
        lon = loc.coords.longitude;
      }

      setLocationName('Mysuru, Karnataka');

      try {
        const [currentData, forecastData] = await Promise.all([
          weatherApi.getCurrent(lat, lon),
          weatherApi.getForecast(lat, lon),
        ]);
        setWeather(currentData);
        if (forecastData?.forecast) setForecast(forecastData.forecast);
      } catch {
        // Fallback mock data
        setWeather({
          temperature: 28, condition: 'Partly Cloudy', humidity: 65,
          wind_speed: 12, feels_like: 31, visibility: 10, uv_index: 7, pressure: 1013,
        });
        setForecast([
          { day: 'Mon', temp_high: 30, temp_low: 22, condition: 'Sunny', icon: '☀️' },
          { day: 'Tue', temp_high: 29, temp_low: 21, condition: 'Cloudy', icon: '⛅' },
          { day: 'Wed', temp_high: 27, temp_low: 20, condition: 'Rain', icon: '🌧️' },
          { day: 'Thu', temp_high: 26, temp_low: 19, condition: 'Rain', icon: '🌧️' },
          { day: 'Fri', temp_high: 28, temp_low: 20, condition: 'Sunny', icon: '☀️' },
          { day: 'Sat', temp_high: 31, temp_low: 22, condition: 'Sunny', icon: '☀️' },
          { day: 'Sun', temp_high: 30, temp_low: 21, condition: 'Cloudy', icon: '⛅' },
        ]);
      }
    } catch (error) {
      console.error('Weather error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchWeather(); }, []);

  const onRefresh = () => { setRefreshing(true); fetchWeather(); };

  const WeatherStat = ({ icon: Icon, label, value, color }: any) => (
    <View style={styles.statCard}>
      <Icon size={22} color={color} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#10B981" />
          <Text style={styles.loadingText}>Fetching weather data...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Weather</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#10B981']} />}
      >
        {/* Main Weather Card */}
        <View style={styles.mainCard}>
          <View style={styles.locationRow}>
            <MapPin size={16} color="#6B7280" />
            <Text style={styles.locationText}>{locationName}</Text>
          </View>
          <View style={styles.tempRow}>
            <CloudSun size={56} color="#F59E0B" />
            <View style={styles.tempInfo}>
              <Text style={styles.tempValue}>{weather?.temperature || 28}°</Text>
              <Text style={styles.tempCondition}>{weather?.condition || 'Partly Cloudy'}</Text>
              <Text style={styles.tempFeels}>Feels like {weather?.feels_like || 31}°</Text>
            </View>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <WeatherStat icon={Droplets} label="Humidity" value={`${weather?.humidity || 65}%`} color="#3B82F6" />
          <WeatherStat icon={Wind} label="Wind" value={`${weather?.wind_speed || 12} km/h`} color="#6B7280" />
          <WeatherStat icon={Eye} label="Visibility" value={`${weather?.visibility || 10} km`} color="#8B5CF6" />
          <WeatherStat icon={Sun} label="UV Index" value={weather?.uv_index || 7} color="#F59E0B" />
        </View>

        {/* 7-Day Forecast */}
        <View style={styles.forecastCard}>
          <Text style={styles.forecastTitle}>7-Day Forecast</Text>
          {forecast.map((day: any, i: number) => (
            <View key={i} style={[styles.forecastRow, i === forecast.length - 1 && { borderBottomWidth: 0 }]}>
              <Text style={styles.forecastDay}>{day.day}</Text>
              <Text style={styles.forecastIcon}>{day.icon}</Text>
              <Text style={styles.forecastCondition}>{day.condition}</Text>
              <View style={styles.forecastTemps}>
                <Text style={styles.forecastHigh}>{day.temp_high}°</Text>
                <View style={styles.tempBar}>
                  <View style={[styles.tempBarFill, { width: `${((day.temp_high - 15) / 25) * 100}%` }]} />
                </View>
                <Text style={styles.forecastLow}>{day.temp_low}°</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Farm Advisory */}
        <View style={styles.advisoryCard}>
          <View style={styles.advisoryHeader}>
            <CloudRain size={20} color="#3B82F6" />
            <Text style={styles.advisoryTitle}>Farm Advisory</Text>
          </View>
          <Text style={styles.advisoryText}>
            Rain expected mid-week. Consider completing any pending spraying operations by Tuesday. 
            Current humidity levels are favorable for crop growth.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 16, fontSize: 15, color: '#6B7280', fontWeight: '500' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 16, backgroundColor: '#FFF',
    borderBottomWidth: 1, borderBottomColor: '#F3F4F6',
  },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#111827' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  mainCard: {
    backgroundColor: '#FFF', borderRadius: 24, padding: 24, marginBottom: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.06, shadowRadius: 12, elevation: 4,
  },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 20 },
  locationText: { fontSize: 14, color: '#6B7280', fontWeight: '500' },
  tempRow: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  tempInfo: { flex: 1 },
  tempValue: { fontSize: 56, fontWeight: '800', color: '#111827' },
  tempCondition: { fontSize: 18, fontWeight: '600', color: '#4B5563', marginTop: -4 },
  tempFeels: { fontSize: 14, color: '#9CA3AF', marginTop: 4 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 20 },
  statCard: {
    width: '47%', backgroundColor: '#FFF', borderRadius: 16, padding: 16, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2,
  },
  statValue: { fontSize: 18, fontWeight: '700', color: '#111827', marginTop: 8 },
  statLabel: { fontSize: 12, color: '#9CA3AF', marginTop: 4 },
  forecastCard: {
    backgroundColor: '#FFF', borderRadius: 20, padding: 20, marginBottom: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3,
  },
  forecastTitle: { fontSize: 16, fontWeight: '700', color: '#374151', marginBottom: 16 },
  forecastRow: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: '#F9FAFB',
  },
  forecastDay: { width: 40, fontSize: 14, fontWeight: '600', color: '#4B5563' },
  forecastIcon: { fontSize: 20, width: 32, textAlign: 'center' },
  forecastCondition: { flex: 1, fontSize: 13, color: '#6B7280', marginLeft: 8 },
  forecastTemps: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  forecastHigh: { fontSize: 14, fontWeight: '700', color: '#111827', width: 28, textAlign: 'right' },
  forecastLow: { fontSize: 14, fontWeight: '500', color: '#9CA3AF', width: 28 },
  tempBar: { width: 40, height: 4, borderRadius: 2, backgroundColor: '#F3F4F6', overflow: 'hidden' },
  tempBarFill: { height: '100%', backgroundColor: '#F59E0B', borderRadius: 2 },
  advisoryCard: {
    backgroundColor: '#EFF6FF', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#BFDBFE',
  },
  advisoryHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  advisoryTitle: { fontSize: 16, fontWeight: '700', color: '#1E40AF' },
  advisoryText: { fontSize: 14, color: '#374151', lineHeight: 22 },
});
