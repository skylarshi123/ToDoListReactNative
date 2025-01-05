import React from 'react';
import { Stack } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';

/**
 * Theme configuration object that defines all the colors used in our app
 * We have two sets of colors: one for light mode and one for dark mode
 */
const theme = {
  light: {
    background: '#ffffff',      // Pure white for light mode main background
    text: '#000000',           // Black text for good contrast on light background
    headerBackground: '#ffffff', // White header to match the main background
    contentBackground: '#f5f5f5', // Slightly grey content area to create depth
    icon: '#000000',           // Black icons for visibility on light background
  },
  dark: {
    background: '#1a1a1a',      // Dark grey for main background (not pure black for less eye strain)
    text: '#ffffff',           // White text for good contrast on dark background
    headerBackground: '#1a1a1a', // Dark header to match the main background
    contentBackground: '#2d2d2d', // Slightly lighter grey for content area
    icon: '#ffffff',           // White icons for visibility on dark background
  },
};

/**
 * RootLayout: This is the main container component for our entire app
 * It sets up the navigation structure and applies our theme styling
 */
export default function RootLayout() {
  // Get the current color scheme (light/dark) from the device settings
  const colorScheme = useColorScheme();
  
  // Select the appropriate theme colors
  const currentTheme = theme[colorScheme ?? 'light'];

  return (
    <>
      {/* StatusBar component handles the appearance of the device's status bar */}
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      {/* Stack navigator for handling screen navigation */}
      <Stack>
        <Stack.Screen 
          name="index"
          options={{
            title: 'My Tasks',
            headerLeft: () => (
              <Ionicons 
                name="document-text-outline"
                size={24}
                style={{ 
                  marginLeft: 16,
                  color: currentTheme.icon
                }}
              />
            ),
            headerStyle: {
              backgroundColor: currentTheme.headerBackground,
            },
            headerTitleStyle: {
              fontWeight: '600',
              fontSize: 18,
              color: currentTheme.text,
            },
            contentStyle: {
              backgroundColor: currentTheme.contentBackground,
            },
            headerShadowVisible: colorScheme === 'light',
          }} 
        />
      </Stack>
    </>
  );
}