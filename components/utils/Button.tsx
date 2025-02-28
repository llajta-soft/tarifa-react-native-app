import React from 'react';
import { TouchableOpacity, Text, StyleSheet,Image } from 'react-native';

const BotonPersonalizado = ({ titulo, onPress }) => {
  return (
    <TouchableOpacity style={styles.boton} onPress={onPress}>
      <Text style={styles.texto}>{titulo}</Text>
      <Image
       source={require('../../assets/images/cbba.png')}
        style={styles.imagen}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  texto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BotonPersonalizado;
