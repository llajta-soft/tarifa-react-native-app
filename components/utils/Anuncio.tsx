import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from "react-native";
import Swiper from "react-native-swiper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Anuncio: React.FC<{
  title: string;
  image: string;
  description: string;
  url: string;
  button: string;
}> = ({ title, image, description, url, button }) => {
  const abrirURL = () => {
    Linking.openURL(url).catch((err) =>
      console.error("Error al abrir URL:", err)
    );
  };

  return (
    <View style={styles.contenedor}>
      <View style={styles.imagenContainer}>
        <Image source={{ uri: image }} style={styles.imagen} />
        <Text style={styles.leyenda}>Anuncio</Text>
      </View>
      <Text style={styles.titulo}>{title}</Text>
      <Text style={styles.descripcion}>{description}</Text>
      <TouchableOpacity style={styles.boton} onPress={abrirURL}>
        <Text style={styles.botonTexto}>{button}</Text>
      </TouchableOpacity>
    </View>
  );
};

const CarruselAnuncios: React.FC = () => {
  const [anuncios, setAnuncios] = useState<any[]>([]); // Para almacenar los anuncios
  const [loading, setLoading] = useState<boolean>(true); // Para manejar el estado de carga
  const [error, setError] = useState<string | null>(null); // Para manejar errores

  // Función para obtener el token de AsyncStorage
  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("@storage_token");
      return token;
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    // Función para obtener los anuncios desde la API
    const obtenerAnuncios = async () => {
      const token = await getToken(); // Obtener el token
      try {
        if (token) {
          // Realizar la solicitud GET con el token
          const response = await axios.get("https://tarifa.vercel.app/api/account/adds", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setAnuncios(response.data); // Guardar los anuncios en el estado
        } else {
          setError("No se encontró el token de autenticación.");
        }
      } catch (err) {
        console.error("Error al obtener los anuncios:", err);
        setError("Hubo un error al obtener los anuncios.");
      } finally {
        setLoading(false); // Finalizar el estado de carga
      }
    };

    obtenerAnuncios(); // Llamada a la API al montar el componente
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Mostrar cargando mientras se obtienen los datos
  }

  if (error) {
    return <Text>{error}</Text>; // Mostrar error si ocurre alguno
  }

  if (anuncios.length === 0) {
    return null; // No renderizar nada si no hay anuncios
  }

  const renderAnuncio = (item, index) => <Anuncio key={index} {...item} />;

  return anuncios.length === 1 ? (
    <View style={styles.swiper}>{renderAnuncio(anuncios[0], 0)}</View>
  ) : (
    <Swiper
      style={styles.swiper}
      showsPagination={false}
      autoplay
      loop
      autoplayTimeout={4}
    >
      {anuncios.map(renderAnuncio)}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  swiper: {
    height: 355,
  },
  contenedor: {
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 8,
    shadowColor: "#e4e2e2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  imagenContainer: {
    position: "relative",
  },
  imagen: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  leyenda: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    color: "#fff",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 5,
    fontSize: 12,
    fontWeight: "bold",
  },
  titulo: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 4,
    paddingHorizontal: 16,
  },
  descripcion: {
    fontSize: 14,
    color: "#333",
    padding: 4,
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  boton: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
    marginHorizontal: 16,
  },
  botonTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CarruselAnuncios;
