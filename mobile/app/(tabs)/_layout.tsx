import React from 'react';
import { Tabs } from 'expo-router';
import { Home, Camera, MessageSquare, User, TrendingUp } from 'lucide-react-native';
import { Colors } from '../../src/constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.dark.primary,
        tabBarInactiveTintColor: Colors.dark.textMuted,
        tabBarStyle: {
          backgroundColor: Colors.dark.surface,
          borderTopWidth: 1,
          borderTopColor: Colors.dark.border,
          height: 65,
          paddingBottom: 10,
          paddingTop: 8,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 2,
        }
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home color={color} size={24} strokeWidth={2.5} />,
        }}
      />
      <Tabs.Screen
        name="agri-market"
        options={{
          title: 'Market',
          tabBarIcon: ({ color }) => <TrendingUp color={color} size={24} strokeWidth={2.5} />,
        }}
      />
      <Tabs.Screen
        name="disease-detection"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color }) => <Camera color={color} size={24} strokeWidth={2.5} />,
        }}
      />
      <Tabs.Screen
        name="ai-assistant"
        options={{
          title: 'Assistant',
          tabBarIcon: ({ color }) => <MessageSquare color={color} size={24} strokeWidth={2.5} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User color={color} size={24} strokeWidth={2.5} />,
        }}
      />
    </Tabs>
  );
}
