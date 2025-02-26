import React, { useState, useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();

  // Estados del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [prueba, setPrueba] = useState("");

  // Verifica si hay sesión activa
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      let prueba = " Celso Franciscano Choque prueba";
      await AsyncStorage.setItem("@storage_prueba", prueba);

      const token = await AsyncStorage.getItem("@storage_token");
      if (token) {
        router.replace("/(tabs)"); // Redirige si ya hay sesión
      }

      const pruebaCelso = await AsyncStorage.getItem("@storage_prueba");
      setPrueba(pruebaCelso);
    } catch (error) {
      console.error("Error al recuperar la sesión:", error);
      Alert.alert("Error", "No se pudo verificar la sesión.");
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Campos incompletos", "Por favor, llena todos los campos.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "https://tarifa.vercel.app/api/auth/login",
        {
          email,
          password,
        }
      );

      setLoading(false);
      if (response.data && response.status === 200) {
        const { token, user, fares } = response.data;

        // Almacenar los datos en AsyncStorage
        try {
          // Almacenar token
          await AsyncStorage.setItem("@storage_token", token);

          // Almacenar usuario, convirtiéndolo en cadena JSON
          await AsyncStorage.setItem("@storage_user", JSON.stringify(user));

          // Almacenar tarifas, también como cadena JSON
          await AsyncStorage.setItem("@storage_fares", JSON.stringify(fares));
        } catch (error) {
          console.error("Error al guardar en AsyncStorage:", error);
          Alert.alert("Error", "No se pudo guardar la sesión.");
          return;
        }

        Alert.alert("Inicio de Sesión", "Has iniciado sesión correctamente.");
        router.replace("/(tabs)"); // Navega a la pantalla principal
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      Alert.alert(
        "Error",
        error?.response?.data?.message || "Ocurrió un error."
      );
    }
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Iniciar Sesión</Text>

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
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFD700" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text style={styles.linkText}>¿No tienes cuenta? Regístrate</Text>
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
  },
  formGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: "#FFD700",
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
