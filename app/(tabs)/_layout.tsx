import React, { useState, useEffect } from 'react';
import { Platform, View, StatusBar as RNStatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { HapticTab } from '@/components/HapticTab';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Asegúrate de importar AsyncStorage

export default function TabLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    // Verifica si el usuario está autenticado
    const checkAuth = async () => {
      const token = await getAuthToken(); // Obtiene el token de AsyncStorage
      if (!token) {
        navigation.navigate('landing'); // Redirigir a la pantalla de landing si no hay token
      } else {
        setIsAuthenticated(true); // Si tiene token, está autenticado
      }
    };

    checkAuth();
  }, []);

  if (!isAuthenticated) {
    return null; // Puedes mostrar un loading mientras se verifica la autenticación
  }

  // Definir colores para el modo claro
  const tabBarStyle = { 
    backgroundColor: '#ffffff', // Fondo claro para el modo claro
    borderTopWidth: 0,           // Eliminar borde superior
    paddingVertical: 50          // Aumenté el padding en el eje Y a 50 para hacerlo más alto
  };
  const activeColor = 'black';     // Color de los íconos activos (oscuro)
  const inactiveColor = '#A9A9A9'; // Color de los íconos inactivos (gris)

  return (
    <>
      {/* Cambiar el fondo de la barra de estado a blanco y el texto a oscuro */}
      <RNStatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Vista para cubrir el status bar en Android */}
      <View style={{
        height: Platform.OS === 'ios' ? 20 : RNStatusBar.currentHeight,
        backgroundColor: '#ffffff' // Fondo blanco para la barra de estado en Android
      }} />
      
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: activeColor,
          tabBarInactiveTintColor: inactiveColor,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarStyle: tabBarStyle,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Inicio',
            tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={23} color={color} />,
          }}
        />
        <Tabs.Screen
          name="informacion"
          options={{
            title: 'Info',
            tabBarIcon: ({ color }) => <Ionicons name="information-circle-outline" size={25} color={color} />,
          }}
        />
        <Tabs.Screen
          name="nueva-denuncia"
          options={{
            title: 'Nueva',
            tabBarIcon: ({ color }) => <Ionicons name="add-outline" size={28} color={color} />,
          }}
        />
        <Tabs.Screen
          name="historial"
          options={{
            title: 'Historial',
            tabBarIcon: ({ color }) => <Ionicons name="list-outline" size={23} color={color} />,
          }}
        />
        <Tabs.Screen
          name="perfil"
          options={{
            title: 'Perfil',
            tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={23} color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}

// Función para obtener el token de AsyncStorage
async function getAuthToken() {
  try {
    const token = await AsyncStorage.getItem('@storage_token');
    return token; // Retorna el token si está presente
  } catch (error) {
    console.error('Error al obtener el token:', error);
    return null; // Retorna null si ocurre un error al obtener el token
  }
}
