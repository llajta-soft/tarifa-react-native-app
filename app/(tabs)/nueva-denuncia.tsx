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
        "http://192.168.1.6:3000/api/account/complaints",
        formData,
        {
          headers: {
            "Content-Type": "application/json", // Cambié a "application/json" para enviar JSON
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
    backgroundColor: "#f2f2f2",
  },
  container: {
    padding: 16,
  },
  formContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  flagIconContainer: {
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  denunciaContainer: {
    marginTop: 20,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
  },
  textArea: {
    height: 100,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  checkboxLabel: {
    fontSize: 14,
    marginLeft: 8,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginTop: 8,
    borderRadius: 8,
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  radioOption: {
    padding: 8,
  },
  radioLabel: {
    fontSize: 16,
  },
  radioLabelSelected: {
    fontWeight: "bold",
    color: "#FFD700",
  },
  errorMessage: {
    flexDirection: "row",
    backgroundColor: "#f8d7da",
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
  },
  errorText: {
    color: "#721c24",
    marginLeft: 8,
  },
  successMessage: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#d4edda",
    borderRadius: 8,
    marginBottom: 16,
  },
  successText: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 8,
    color: "#155724",
  },
});
