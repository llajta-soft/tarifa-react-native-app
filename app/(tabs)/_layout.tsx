"use client";
import React from 'react';
import { Platform, View, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { HapticTab } from '@/components/HapticTab';

export default function TabLayout() {
  const colorScheme = 'dark'; // Forzar el modo oscuro

  return (
    <>
      {/* Vista para cubrir el status bar */}
      <View style={{
        height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
        backgroundColor: 'black'
      }} />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colorScheme === 'dark' ? 'white' : 'black',
          tabBarInactiveTintColor: colorScheme === 'dark' ? '#808080' : '#A9A9A9',
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarStyle: {
            backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f0f0f0'
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Inicio',
            tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="informacion"
          options={{
            title: 'Info',
            tabBarIcon: ({ color }) => <Ionicons name="information-circle-outline" size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="nueva-denuncia"
          options={{
            title: 'Nueva',
            tabBarIcon: ({ color }) => <Ionicons name="alert-circle-outline" size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="historial"
          options={{
            title: 'Historial',
            tabBarIcon: ({ color }) => <Ionicons name="list-outline" size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="perfil"
          options={{
            title: 'Perfil',
            tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={28} color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}
