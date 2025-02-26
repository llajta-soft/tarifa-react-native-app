import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { Check, AlertCircle, Flag } from "lucide-react-native";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import AsyncStorage from "@react-native-async-storage/async-storage";

interface FormData {
  transportLine: string;
  vehiclePlate: string;
  violations: string[];
  incidentRelation: string;
  description?: string;
  image?: {
    uri: string;
    type: string;
    name: string;
  };
}

export default function FormularioDenuncia() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      transportLine: "",
      vehiclePlate: "",
      violations: [],
      incidentRelation: "",
      description: "",
    },
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

      // Función para obtener el token de AsyncStorage
      const getToken = async () => {
        try {
          const token = await AsyncStorage.getItem("@storage_token");
          return token;
        } catch (error) {
          console.error("Error al obtener el token:", error);
          return null;
        }
      };

      

  const pickImage = async () => {
    
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        setErrorMessage("Se necesitan permisos para acceder a la galería");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const imageData = {
          uri: asset.uri,
          type: asset.mimeType || "image/jpeg",
          name: asset.fileName || "photo.jpg",
        };
        setImagePreview(asset.uri);
        setValue("image", imageData);
      }
    } catch (error) {
      setErrorMessage("Error al seleccionar la imagen");
      console.error(error);
    }
  };

  const onSubmit = async (data: FormData) => {
    const token = await getToken();  // Obtener el token
    setSubmitting(true);
    setErrorMessage(null);

    try {
      const formData = {
        transportLine: data.transportLine,
        vehiclePlate: data.vehiclePlate,
        violations: data.violations,
        incidentRelation: data.incidentRelation,
        description: data.description || "",
        image: data.image ? {
          uri: data.image.uri,
          type: data.image.type,
          name: data.image.name,
        } : undefined,
      };

      console.log("Esto se esta enviando");
      console.log(formData);

      const response = await axios.post(
        "https://tarifa.vercel.app/api/account/complaints",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Incluir el token en los encabezados
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setSuccess(true);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(
        "Error al enviar la denuncia. Por favor, intenta de nuevo."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const violationsOptions = [
    "Incumplimiento de criterios de Calidad",
    "Incumplimiento de criterios de Seguridad",
    "Cobro de tarifas superiores a la Ley",
    "No recoger un pasajero",
    "Abandonar al usuario a medio recorrido",
  ];

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        {success ? (
          <View style={styles.successMessage}>
            <Check size={32} color="green" />
            <Text style={styles.successText}>
              ¡Denuncia Realizada con Éxito!
            </Text>
            <Button
              title="Realizar Otra Denuncia"
              onPress={() => {
                setSuccess(false);
                setImagePreview(null);
                setValue("violations", []);
                setValue("transportLine", "");
                setValue("vehiclePlate", "");
                setValue("incidentRelation", "");
                setValue("description", "");
              }}
            />
          </View>
        ) : (
          <>
            {errorMessage && (
              <View style={styles.errorMessage}>
                <AlertCircle size={24} color="red" />
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            )}

            <View style={styles.formContainer}>
              <View style={styles.cardHeader}>
                <View style={styles.headerLeft}>
                  <View style={styles.flagIconContainer}>
                    <Flag size={20} color="#FFD700" />
                  </View>
                  <Text style={styles.cardTitle}>Nueva denuncia</Text>
                </View>
              </View>

              <View style={styles.denunciaContainer}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Línea de Transporte</Text>
                  <Controller
                    control={control}
                    name="transportLine"
                    rules={{ required: "Este campo es obligatorio" }}
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        style={styles.input}
                        placeholder="Ej. Línea 1, Metro, Bus 104"
                        value={value}
                        onChangeText={onChange}
                      />
                    )}
                  />
                  {errors.transportLine && (
                    <Text style={styles.error}>
                      {errors.transportLine.message}
                    </Text>
                  )}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Placa del Vehículo</Text>
                  <Controller
                    control={control}
                    name="vehiclePlate"
                    rules={{ required: "Este campo es obligatorio" }}
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        style={styles.input}
                        placeholder="Ej. ABC-123"
                        value={value}
                        onChangeText={onChange}
                      />
                    )}
                  />
                  {errors.vehiclePlate && (
                    <Text style={styles.error}>
                      {errors.vehiclePlate.message}
                    </Text>
                  )}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Evidencia Fotográfica</Text>
                  <Button title="Subir Imagen" onPress={pickImage} />
                  {imagePreview && (
                    <Image
                      source={{ uri: imagePreview }}
                      style={styles.imagePreview}
                    />
                  )}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Infracciones</Text>
                  <Controller
                    control={control}
                    name="violations"
                    rules={{
                      validate: (value) =>
                        value.length > 0 ||
                        "Selecciona al menos una infracción",
                    }}
                    render={({ field: { value, onChange } }) => (
                      <View>
                        {violationsOptions.map((violation) => (
                          <View
                            key={violation}
                            style={styles.checkboxContainer}
                          >
                            <BouncyCheckbox
                              size={25}
                              fillColor="#FFD700"
                              unfillColor="#fff"
                              text={violation}
                              iconStyle={{ borderColor: "#FFD700" }}
                              textStyle={styles.checkboxLabel}
                              isChecked={value.includes(violation)}
                              onPress={(newValue) => {
                                const updatedViolations = newValue
                                  ? [...value, violation]
                                  : value.filter((v) => v !== violation);
                                onChange(updatedViolations);
                              }}
                            />
                          </View>
                        ))}
                      </View>
                    )}
                  />
                  {errors.violations && (
                    <Text style={styles.error}>
                      {errors.violations.message}
                    </Text>
                  )}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Relación con el Incidente</Text>
                  <Controller
                    control={control}
                    name="incidentRelation"
                    rules={{ required: "Este campo es obligatorio" }}
                    render={({ field: { onChange, value } }) => (
                      <View style={styles.radioContainer}>
                        <TouchableOpacity
                          onPress={() => onChange("Víctima")}
                          style={styles.radioOption}
                        >
                          <Text
                            style={[
                              styles.radioLabel,
                              value === "Víctima" && styles.radioLabelSelected,
                            ]}
                          >
                            Víctima
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => onChange("Testigo")}
                          style={styles.radioOption}
                        >
                          <Text
                            style={[
                              styles.radioLabel,
                              value === "Testigo" && styles.radioLabelSelected,
                            ]}
                          >
                            Testigo
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  />
                  {errors.incidentRelation && (
                    <Text style={styles.error}>
                      {errors.incidentRelation.message}
                    </Text>
                  )}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Descripción (Opcional)</Text>
                  <Controller
                    control={control}
                    name="description"
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Describe el incidente..."
                        value={value}
                        onChangeText={onChange}
                        multiline
                        numberOfLines={4}
                      />
                    )}
                  />
                </View>

                <Button
                  title={submitting ? "Enviando..." : "Enviar Denuncia"}
                  onPress={handleSubmit(onSubmit)}
                  disabled={submitting}
                />
              </View>
            </View>
          </>
        )}
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
    padding: 8,
    paddingTop: 20,
    paddingBottom: 10,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFD700",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    color: "#ccc",
    textAlign: "center",
    marginBottom: 20,
  },
  successMessage: {
    backgroundColor: "rgba(31, 41, 55, 0.8)",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.2)",
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  successText: {
    fontSize: 18,
    color: "#fff",
    marginVertical: 10,
  },
  errorMessage: {
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  errorText: {
    color: "#fff",
    marginLeft: 10,
  },
  formContainer: {
    marginBottom: 12,
    backgroundColor: "rgba(31, 41, 55, 0.8)",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.2)",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 215, 0, 0.1)",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  flagIconContainer: {
    backgroundColor: "rgba(255, 215, 0, 0.2)",
    padding: 8,
    borderRadius: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },

  denunciaContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",

    padding: 20,
    // borderWidth: 1,
    // borderColor: '#374151',
  },

  inputGroup: {
    marginBottom: 15,
  },
  label: {
    color: "#FFD700",
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#555",
    backgroundColor: "#111",
    color: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  error: {
    color: "#FF6347",
    fontSize: 12,
    marginTop: 5,
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxLabel: {
    color: "#fff",
  },
  radioContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  radioLabel: {
    color: "#FFD700", // Amarillo
    fontSize: 16,
    marginHorizontal: 10,
  
  },
  radioLabelSelected: {
    color: "white", // Blanco cuando se selecciona
    fontWeight: "bold",
    backgroundColor: "#333",
    borderRadius: 10,
    padding : 4
  },
  button: {
    backgroundColor: "#FFD700", // Amarillo
    color: "white", // Texto blanco
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
    fontSize: 16,
    width: "100%",
    textAlign: "center",
  },
  
});
