import { Stack } from 'expo-router';
import { useAppStore } from '../src/store/useAppStore';

export default function RootLayout() {
  const theme = useAppStore((state) => state.theme);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="register" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="soil-analysis" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
      <Stack.Screen name="weather" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
    </Stack>
  );
}

