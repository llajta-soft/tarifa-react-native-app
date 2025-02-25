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
import {
  Car,
  MapPin,
  User,
  Shield,
  Info,
  Image as LucideImage,
  FileText,
  AlertCircle,
  Send,
  Clock,
  Tag,
  Flag,
  Check,
} from "lucide-react-native";
import { useForm, Controller } from "react-hook-form";
import { launchImageLibrary } from "react-native-image-picker";
import Checkbox from "@react-native-community/checkbox";

interface FormData {
  transportLine: string;
  vehiclePlate: string;
  violations: string[];
  incidentRelation: string;
  description: string;
  image: any; // para el archivo de imagen
}

export default function FormularioDenuncia() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    defaultValues: { violations: [] },
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setErrorMessage(null);
    try {
      const formData = new FormData();
      formData.append("transportLine", data.transportLine);
      formData.append("vehiclePlate", data.vehiclePlate);
      formData.append("violations", JSON.stringify(data.violations));
      formData.append("incidentRelation", data.incidentRelation);
      formData.append("description", data.description);
      if (data.image) formData.append("image", data.image);

      await axios.post("/api/account/report", formData);
      setSuccess(true);
    } catch (err) {
      setErrorMessage(
        "Hubo un error al realizar la denuncia. Por favor, intente nuevamente."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const pickImage = () => {
    const options = {
      mediaType: "photo",
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        setImagePreview(asset.uri || null);
        setValue("image", {
          uri: asset.uri,
          type: asset.type,
          name: asset.fileName,
        });
      }
    });
  };

  const violations = watch("violations");
  const hasViolations =
    violations &&
    (Array.isArray(violations) ? violations.length > 0 : !!violations);

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Realiza una Denuncia</Text>
        <Text style={styles.subtitle}>
          Complete el formulario a continuación para reportar una infracción.
          Todos los campos marcados con * son obligatorios.
        </Text>

        {success ? (
          <View style={styles.successMessage}>
            <Check size={32} color="green" />
            <Text style={styles.successText}>
              ¡Denuncia Realizada con Éxito!
            </Text>
            <Button
              title="Realizar Otra Denuncia"
              onPress={() => setSuccess(false)}
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
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Línea de Transporte</Text>
                <Controller
                  control={control}
                  name="transportLine"
                  rules={{ required: "Este campo es obligatorio" }}
                  render={({ field }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Ej. Línea 1, Metro, Bus 104"
                      {...field}
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
                  render={({ field }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Ej. ABC-123"
                      {...field}
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
                    required: "Debe seleccionar al menos una infracción",
                  }}
                  render={({ field }) => (
                    <View>
                      <View style={styles.checkboxContainer}>
                        <Checkbox
                          value={field.value.includes(
                            "Incumplimiento de criterios de Calidad"
                          )}
                          onValueChange={(value) => {
                            if (value)
                              field.onChange([ 
                                ...field.value,
                                "Incumplimiento de criterios de Calidad"
                              ]);
                            else
                              field.onChange(
                                field.value.filter(
                                  (item: string) =>
                                    item !==
                                    "Incumplimiento de criterios de Calidad"
                                )
                              );
                          }}
                        />
                        <Text style={styles.checkboxLabel}>
                          Incumplimiento de criterios de Calidad
                        </Text>
                      </View>
                      {/* Agrega más checkboxes aquí */}
                    </View>
                  )}
                />
                {errors.violations && (
                  <Text style={styles.error}>{errors.violations.message}</Text>
                )}
              </View>

              <Button
                title="Enviar Denuncia"
                onPress={handleSubmit(onSubmit)}
                disabled={submitting}
              />
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
    backgroundColor: "#111",
  },
  container: {
    padding: 20,
    backgroundColor: "#333",
    flex: 1,
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
    backgroundColor: "#32CD32",
    padding: 20,
    borderRadius: 10,
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
    backgroundColor: "#222",
    padding: 20,
    borderRadius: 10,
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
});
