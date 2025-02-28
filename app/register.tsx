import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert, StatusBar } from "react-native";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker"; // Importa Picker

export default function RegisterScreen() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [fareType, setFareType] = useState(""); // Estado para el tipo de tarifa

  const handleRegister = async (data) => {
    console.log(data);

    try {
      setLoading(true);
      const response = await axios.post(
        "https://tarifa.vercel.app/api/auth/register",
        { ...data, FK_fare: fareType  } // Incluye fareType en los datos enviados
      );
      setLoading(false);
      console.log(response);

      if (response.data && response.status === 200) {
        Alert.alert("Registro exitoso", "Cuenta creada correctamente.");
        router.push("/login");
      } else {
        Alert.alert("Error al registrar", "Intenta de nuevo.");
      }
    } catch (error) {
    
      console.log(error);
      Alert.alert(
        "No se puede Crear la cuenta",
        error?.response?.data?.error || "Ocurrió un error."
      );
    }
    finally{
      setLoading(false);


    }
  };

  return (
    <>
      {/* Establece el color del StatusBar */}
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView style={styles.mainContainer}>
        <View style={styles.container}>
          <Text style={styles.pageTitle}>Crear Cuenta</Text>

          {/* Resto del formulario */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Nombre(s) *</Text>
            <Controller
              control={control}
              rules={{
                required: "El nombre es obligatorio",
                minLength: {
                  value: 3,
                  message: "El nombre debe tener al menos 3 caracteres",
                },
                maxLength: {
                  value: 30,
                  message: "El nombre no puede tener más de 30 caracteres",
                },
                pattern: {
                  value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                  message: "El nombre solo puede contener letras",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Ingresa tu nombre"
                  placeholderTextColor="#CCCCCC"
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="firstName"
            />
            {errors.firstName && (
              <Text style={styles.errorText}>{errors.firstName.message}</Text>
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Apellido(s) *</Text>
            <Controller
              control={control}
              rules={{
                required: "El apellido es obligatorio",
                minLength: {
                  value: 3,
                  message: "El apellido debe tener al menos 3 caracteres",
                },
                maxLength: {
                  value: 30,
                  message: "El apellido no puede tener más de 30 caracteres",
                },
                pattern: {
                  value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                  message: "El apellido solo puede contener letras",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Ingresa tu apellido"
                  placeholderTextColor="#CCCCCC"
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="lastName"
            />
            {errors.lastName && (
              <Text style={styles.errorText}>{errors.lastName.message}</Text>
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Correo Electrónico *</Text>
            <Controller
              control={control}
              rules={{
                required: "El correo electrónico es obligatorio",
                maxLength: { value: 40, message: "El correo no puede tener más de 40 caracteres" },
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

          <View style={styles.formGroup}>
            <Text style={styles.label}>Tipo de Usuario *</Text>
            <Picker
              selectedValue={fareType}
              onValueChange={(itemValue) => setFareType(itemValue)} // Actualiza el estado
              style={styles.input}
            >
              <Picker.Item label="General" value="1" />
              <Picker.Item label="Adulto(a) mayor" value="2" />
              <Picker.Item label="Persona con discapacidad" value="3" />
              <Picker.Item label="Estudiante universitario" value="4" />
              <Picker.Item label="Estudiante de secundaria" value="5" />
              <Picker.Item label="Estudiante de primaria" value="6" />
            </Picker>
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSubmit(handleRegister)}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#000000" />
            ) : (
              <Text style={styles.buttonText}>Registrar</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={styles.linkText}>¿Ya tienes cuenta? Inicia sesión</Text>
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
    paddingTop: 0,
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
