import React, { useState, useEffect } from 'react';
import { Platform, View, Text, StatusBar as RNStatusBar, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { HapticTab } from '@/components/HapticTab';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    // Verifica si el usuario está autenticado
    const checkAuth = async () => {
      const token = await getAuthToken();
      if (!token) {
        navigation.navigate('landing');
      } else {
        setIsAuthenticated(true);
      }
    };

    // Obtener datos del usuario desde AsyncStorage
    const fetchUserData = async () => {
      const user = await AsyncStorage.getItem("@storage_user");
      if (user) {
        setUserData(JSON.parse(user));
      }
    };

    checkAuth();
    fetchUserData();
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  // Obtener la primera letra del firstName del usuario
  const firstLetter = userData?.firstName ? userData.firstName.charAt(0).toUpperCase() : '?';

  return (
    <>
      {/* Barra de estado */}
      <RNStatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.statusBar} />

      {/* Barra superior */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Tarifa</Text>
        {/* <Text style={styles.pageTitle}>Inicio</Text> */}
        <View style={styles.profileCircle}>
          <Text style={styles.profileText}>{firstLetter}</Text>
        </View>
      </View>

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: '#A9A9A9',
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarStyle: styles.tabBar,
        }}
      >
        <Tabs.Screen
          name="dash"
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

async function getAuthToken() {
  try {
    const token = await AsyncStorage.getItem('@storage_token');
    return token;
  } catch (error) {
    console.error('Error al obtener el token:', error);
    return null;
  }
}

const styles = StyleSheet.create({
  statusBar: {
    height: Platform.OS === 'ios' ? 20 : RNStatusBar.currentHeight,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 8,

  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  pageTitle: {
    fontSize: 18,
    color: '#555',
  },
  profileCircle: {
    width: 35,
    height: 35,
    borderRadius: 50,
    backgroundColor: '#efefef',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    color: '#525252',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tabBar: {
    backgroundColor: '#ffffff',
    borderTopWidth: 0,
    paddingVertical: 15,
  },
});

