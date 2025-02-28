import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import {
  Check,
  AlertCircle,
  Flag,
  Image as ImageIcon,
} from "lucide-react-native";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

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
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
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
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
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
    const token = await getToken(); // Obtener el token
    setSubmitting(true);
    setErrorMessage(null);

    try {
      const formData = {
        transportLine: data.transportLine,
        vehiclePlate: data.vehiclePlate,
        violations: data.violations,
        incidentRelation: data.incidentRelation,
        description: data.description || "",
        image: data.image
          ? {
              uri: data.image.uri,
              type: data.image.type,
              name: data.image.name,
            }
          : undefined,
      };

      console.log("Esto se esta enviando");
      console.log(formData);

      const response = await axios.post(
        "https://tarifa.vercel.app/api/account/complaints",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Incluir el token en los encabezados
          },
        }
      );
      console.log(response);


      if (response.status === 200 || response.status === 201) {
        Alert.alert(
          "¡Denuncia Realizada con Éxito!",
          "Se esta haciendo revision a su denuncia.",
          [
            {
              text: "OK",

              onPress: () => {
                reset();
                navigation.navigate("historial", { autoRefresh: true });
              },
            },
          ],
          { cancelable: false }
        );
      }
    } catch (err) {
      setErrorMessage(
        "Error al enviar la denuncia. Por favor, intenta de nuevo. o cierra la aplicación."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const violationsOptions = [
    "Cobro de tarifas superiores a la Ley",
    "Abandonar al usuario a medio recorrido",
    "No recoger un pasajero",
    "Incumplimiento de criterios de Calidad",
    "Incumplimiento de criterios de Seguridad",
  ];

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        {errorMessage && (
          <View style={styles.errorMessage}>
            <AlertCircle size={24} color="#D8000C" />
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        )}

        <View style={styles.formContainer}>
          <View style={styles.cardHeader}>
            <View style={styles.headerLeft}>
              <Text style={styles.cardTitle}>Nueva denuncia</Text>
            </View>
          </View>
          <View style={styles.denunciaContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Línea de Transporte</Text>
              <Controller
                control={control}
                name="transportLine"
                rules={{
                  required: "Este campo es obligatorio",
                  minLength: {
                    value: 1,
                    message:
                      "La línea de transporte debe tener al menos 1 carácter",
                  },
                  maxLength: {
                    value: 20,
                    message:
                      "La línea de transporte no puede tener más de 20 caracteres",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Ej. 130"
                    placeholderTextColor="#999"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.transportLine && (
                <Text style={styles.error}>{errors.transportLine.message}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Placa del Vehículo</Text>
              <Controller
                control={control}
                name="vehiclePlate"
                rules={{
                  required: "Este campo es obligatorio",
                  pattern: {
                    value: /^(?:\d{3}[A-Za-z]{3}|\d{4}[A-Za-z]{3})$/,
                    message:
                      "La placa debe tener 6 o 7 caracteres, donde los primeros son dígitos y los siguientes letras",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Ej. 1234JGH"
                    placeholderTextColor="#999"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.vehiclePlate && (
                <Text style={styles.error}>{errors.vehiclePlate.message}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Evidencia Fotográfica</Text>
              <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                <ImageIcon size={20} color="#222" style={styles.uploadIcon} />
                <Text style={styles.uploadButtonText}>Subir Imagen</Text>
              </TouchableOpacity>
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
                    value.length > 0 || "Selecciona al menos una infracción",
                }}
                render={({ field: { value, onChange } }) => (
                  <View>
                    {violationsOptions.map((violation) => (
                      <View key={violation} style={styles.checkboxContainer}>
                        <BouncyCheckbox
                          size={25}
                          fillColor="#000000"
                          unfillColor="#FFF"
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
                <Text style={styles.error}>{errors.violations.message}</Text>
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

            <View style={styles.description}>
              <Text style={styles.label}>Descripción *</Text>
              <Controller
                control={control}
                name="description"
                rules={{
                  required: "La descripción es obligatoria.",
                  validate: {
                    minLength: (value) => {
                      // Eliminar espacios y contar los caracteres restantes
                      const charCount = value.replace(/\s/g, "").length;
                      return (
                        charCount >= 150 ||
                        "La descripción debe tener al menos 150 caracteres sin contar los espacios."
                      );
                    },
                    maxLength: (value) => {
                      // Verificar si la longitud total es menor o igual a 500
                      return (
                        value.length <= 500 ||
                        "La descripción no puede tener más de 500 caracteres."
                      );
                    },
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Ej. El chofer cobró Bs 2.50, a pesar de que mencioné que soy universitario y la tarifa para estudiantes es solo Bs 1.00, según la Ley Municipal N° 1575."
                    placeholderTextColor="#999"
                    value={value}
                    onChangeText={onChange}
                    multiline
                    numberOfLines={4}
                  />
                )}
              />
              {errors.description && (
                <Text style={styles.error}>{errors.description.message}</Text>
              )}
            </View>

            <TouchableOpacity
              style={[styles.submitButton, submitting && styles.disabledButton]}
              onPress={handleSubmit(onSubmit)}
              disabled={submitting}
            >
              <Text style={styles.submitButtonText}>
                {submitting ? "Enviando..." : "Enviar Denuncia"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#efefef",
  },
  container: {
    padding: 8,
    paddingTop: 8,
    paddingBottom: 10,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
    marginBottom: 10,
  },
  successMessage: {
    backgroundColor: "#E6F9E6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#4CAF50",
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  successText: {
    fontSize: 18,
    color: "#4CAF50",
    marginVertical: 10,
  },
  errorMessage: {
    backgroundColor: "#FFE6E6",
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  errorText: {
    color: "#D8000C",
    marginLeft: 10,
  },
  formContainer: {
    marginBottom: 12,
    backgroundColor: "#ffffff",
    borderRadius: 8,

    overflow: "hidden",
    shadowColor: "#e4e2e2",
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
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    gap: 12,
  },
  flagIconContainer: {
    backgroundColor: "#FFF",
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#CCC",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
  },
  denunciaContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  description: {
    marginBottom: 15,
    height: 100,
  },
  label: {
    color: "#222",
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    backgroundColor: "#FFF",
    color: "#000",
    padding: 10,
    borderRadius: 5,
  },
  textArea: {
    textAlignVertical: "top",
    height: 100,
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
    color: "#000",
    fontSize: 15,
  },
  radioContainer: {
    flexDirection: "row",
    marginTop: 10,
  },

  radioLabel: {
    color: "#222",
    fontSize: 16,
    marginHorizontal: 10,
  },
  radioLabelSelected: {
    color: "#FFF",
    fontWeight: "bold",
    backgroundColor: "#000000",
    borderRadius: 10,
    padding: 4,
    paddingHorizontal: 16,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  uploadIcon: {
    marginRight: 8,
  },
  uploadButtonText: {
    color: "#222",
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 50,
  },
  submitButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    opacity: 0.6,
  },
});
