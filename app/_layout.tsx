import { Stack } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

/**
 * RootLayout component serves as the main navigation container for the app
 * Uses Expo Router's Stack navigation for a native feel
 * Implements a clean header with a ToDo list icon for better UX
 */
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{
          // Configure header with title and icon
          title: 'My Tasks',
          headerLeft: () => (
            <Ionicons 
              name="list-outline" 
              size={24} 
              style={{ marginLeft: 16 }}
            />
          ),
          // Add subtle styling to header
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
          },
          // Ensure content doesn't go under the header
          contentStyle: {
            backgroundColor: '#f5f5f5',
          },
        }} 
      />
    </Stack>
  );
}