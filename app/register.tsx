import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const router = useRouter();

  // Estados para almacenar los datos del formulario
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Control de carga y errores
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password) {
      Alert.alert("Campos incompletos", "Por favor, llena todos los campos.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "https://tarifa.vercel.app/api/auth/register",
        {
          firstName,
          lastName,
          email,
          password,
        }
      );
      setLoading(false);

      // Maneja la respuesta según la API
      if (response.data && response.status === 200) {
        Alert.alert("Registro exitoso", "Cuenta creada correctamente.");
        // Redirige al login (o a donde prefieras)
        router.push("/login");
      } else {
        Alert.alert("Error al registrar", "Intenta de nuevo.");
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      Alert.alert(
        "No se puede Crear la cuenta",
        error?.response?.data?.error || "Ocurrió un error."
      );
    }
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Crear Cuenta</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Nombre(s)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu nombre"
            placeholderTextColor="#9CA3AF"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Apellido(s)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu apellido"
            placeholderTextColor="#9CA3AF"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Correo Electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="usuario@ejemplo.com"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="********"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFD700" />
          ) : (
            <Text style={styles.buttonText}>Registrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={styles.linkText}>¿Ya tienes cuenta? Inicia sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#000000",
  },
  container: {
    padding: 16,
    paddingTop: 40,
    paddingBottom: 20,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFD700",
    textAlign: "center",
    marginBottom: 20,
    textShadowColor: "rgba(255, 215, 0, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  formGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: "#aea4a1", // esto es el color de label de input
    marginBottom: 6,
  },
  input: {
    backgroundColor: "rgba(31, 41, 55, 0.6)",
    color: "#FFFFFF",
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.2)",
  },
  button: {
    backgroundColor: "rgba(255, 215, 0, 0.9)",
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
    marginVertical: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "600",
  },
  linkText: {
    color: "#9CA3AF",
    textAlign: "center",
    marginTop: 4,
    fontSize: 14,
  },
});
