import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BienvenidaUsuario = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await AsyncStorage.getItem('@storage_user');
      if (user) {
        setUserData(JSON.parse(user));
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <Text style={styles.cargandoTexto}>Cargando...</Text>;
  }

  return (
    <View style={styles.bienvenidaContainer}>
      <Text style={styles.bienvenidaTexto}>¡Hola, {userData.firstName}!</Text>
      {/* <Text style={styles.subtitulo}>Bienvenido</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  bienvenidaContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: "#ffffff",
    padding:12
  },
  bienvenidaTexto: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333', // Un tono oscuro para mejor contraste
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 18,
    color: '#666',
    // fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 5,
  },
  cargandoTexto: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
  },
});

export default BienvenidaUsuario;
