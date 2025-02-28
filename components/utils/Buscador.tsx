import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Complaint {
  [key: string]: any; // Permite cualquier clave para la búsqueda
}

interface BuscadorProps {
  feed: Complaint[];
  setFeed: (data: Complaint[]) => void;
  feedOriginal: Complaint[];
}

const Buscador: React.FC<BuscadorProps> = ({ feed, setFeed, feedOriginal }) => {
  const [texto, setTexto] = useState<string>("");

  const manejarCambio = (valor: string) => {
    setTexto(valor);
    if (valor.trim() === "") {
      setFeed(feedOriginal);
      return;
    }

    const resultado = feedOriginal.filter((item) =>
      Object.values(item).some(
        (val) => val && val.toString().toLowerCase().includes(valor.toLowerCase())
      )
    );

    setFeed(resultado);
  };

  return (
    <View style={styles.contenedorPrincipal}>
      <View style={styles.contenedor}>
        <Ionicons name="search" size={22} color="#555" style={styles.icono} />
        <TextInput
          style={styles.input}
          placeholder="Escribe aquí..."
          placeholderTextColor="#777"
          value={texto}
          onChangeText={manejarCambio}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedorPrincipal: {
    padding: 8,
    width: "100%",
    marginBottom: -16,
  },
  contenedor: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: "#e4e2e2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  icono: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
});

export default Buscador;
