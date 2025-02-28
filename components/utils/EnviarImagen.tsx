import React, { useState } from 'react';
import { View, Button, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const EnviarImagen = () => {
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Se necesitan permisos para acceder a la galería.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      uploadImageToNextJS(result.assets[0]);
    }
  };

  const uploadImageToNextJS = async (selectedImage) => {
    setLoading(true);
  
    const fileExt = selectedImage.uri.split('.').pop();
    const timestamp = Date.now();
    const fileName = `${timestamp}.${fileExt}`;
  
    const formData = new FormData();
    formData.append('image', {
      uri: selectedImage.uri,
      name: fileName,
      type: `image/${fileExt}`,
    });
  
    try {
      const response = await fetch(
        'http://192.168.1.6:3000/api/account/upload', // Asegúrate de que la URL sea correcta
        {
          method: 'POST',
          body: formData, // No pongas 'Content-Type' aquí
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Imagen subida con éxito:', data.imageUrl);
      Alert.alert('Imagen subida con éxito.');
      handleUploadSuccess(data.imageUrl);
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      Alert.alert('Error al subir la imagen.');
      handleUploadError(error);
    }
  
    setLoading(false);
  };
  

  const handleUploadSuccess = (imageUrl) => {
    console.log('URL de la imagen subida:', imageUrl);
    // Realiza acciones adicionales con la URL de la imagen aquí
    // Por ejemplo, actualizar el estado del componente padre o navegar a otra pantalla
  };

  const handleUploadError = (error) => {
    console.error('Error al subir la imagen:', error);
    // Maneja el error aquí
    // Por ejemplo, mostrar un mensaje de error más detallado al usuario
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Seleccionar imagen" onPress={pickImage} />
      {loading && <ActivityIndicator size="large" />}
    </View>
  );
};

export default EnviarImagen;