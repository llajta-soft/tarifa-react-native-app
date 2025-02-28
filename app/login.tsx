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
  StatusBar,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";

export default function LoginScreen() {
  const router = useRouter();

  // Estados del formulario
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  // Verifica si hay sesión activa
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const token = await AsyncStorage.getItem("@storage_token");
      if (token) {
        router.replace("/dash"); // Redirige si ya hay sesión
      }
    } catch (error) {
      console.error("Error al recuperar la sesión:", error);
      Alert.alert("Error", "No se pudo verificar la sesión.");
    }
  };

  const handleLogin = async (data: any) => {
    if (!data.email || !data.password) {
      Alert.alert("Campos incompletos", "Por favor, llena todos los campos.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "https://tarifa.vercel.app/api/auth/login",
        data
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
        router.replace("/dash"); // Redirige y reemplaza la ruta para evitar volver atrás
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
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView style={styles.mainContainer}>
        <View style={styles.container}>
          <Text style={styles.pageTitle}>Iniciar Sesión</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Correo Electrónico *</Text>
            <Controller
              control={control}
              rules={{
                required: "El correo electrónico es obligatorio",
                maxLength: {
                  value: 40,
                  message: "El correo no puede tener más de 40 caracteres",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Ingresa un correo válido",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="usuario@ejemplo.com"
                  placeholderTextColor="#CCCCCC"
                  keyboardType="email-address"
                  value={value}
                  onChangeText={onChange}
                  autoCapitalize="none"
                />
              )}
              name="email"
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Contraseña *</Text>
            <Controller
              control={control}
              rules={{
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
                maxLength: {
                  value: 12,
                  message: "La contraseña no puede tener más de 12 caracteres",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="********"
                  placeholderTextColor="#CCCCCC"
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="password"
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSubmit(handleLogin)}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#000000" />
            ) : (
              <Text style={styles.buttonText}>Entrar</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/register")}>
            <Text style={styles.linkText}>¿No tienes cuenta? Regístrate</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    padding: 16,
    paddingTop: 80,
    paddingBottom: 20,
  },
  pageTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 4,
  },
  label: {
    fontSize: 16,
    color: "#000000",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#F5F5F5",
    color: "#000000",
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#CCCCCC",
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
    color: "#000000",
    textAlign: "center",
    marginTop: 4,
    fontSize: 14,
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
});
