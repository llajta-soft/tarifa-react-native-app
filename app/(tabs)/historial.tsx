import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import {
  AlertCircle,
  Clock,
  FileText,
  Flag,
  Shield,
  MapPin,
  User,
  Info,
  Activity,
  Car,
  Bus,
  Route,
  MessageSquareQuote,
  Image as ImageIcon,
} from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRoute } from "@react-navigation/native";

export default function HomeScreen() {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const route = useRoute();

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

  const fetchFeed = async () => {
    const token = await getToken(); // Obtener el token
    try {
      const response = await axios.get(
        "http://192.168.1.6:3000/api/account/history",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Incluir el token en los encabezados
          },
        }
      );
      console.log("Respuesta de la API:", response.data);
      setFeed(response.data);
      setLoading(false);
      setRefreshing(false);
    } catch (err) {
      console.log(err);
      setError("Hubo un error al cargar las denuncias, intenta cerrar la aplicación.");

      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  // Si se navega a esta pantalla con el parámetro autoRefresh, se refresca automáticamente
  useFocusEffect(
    useCallback(() => {
      if (route.params?.autoRefresh) {
        onRefresh();
      }
    }, [route.params])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchFeed();
  }, []);

  const formatDate = (dateString: any) => {
    return new Date(dateString).toLocaleString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (statusName) => {
    switch (statusName.toLowerCase()) {
      case "pendiente":
        return {
          text: "#FFBF00",
          bg: "rgba(255, 191, 0, 0.1)",
          border: "rgba(255, 191, 0, 0.2)",
        };
      case "revision":
        return {
          text: "#3B82F6",
          bg: "rgba(59, 130, 246, 0.1)",
          border: "rgba(59, 130, 246, 0.2)",
        };
      case "resuelto":
        return {
          text: "#4ADE80",
          bg: "rgba(74, 222, 128, 0.1)",
          border: "rgba(74, 222, 128, 0.2)",
        };
      default:
        return {
          text: "#9CA3AF",
          bg: "rgba(156, 163, 175, 0.1)",
          border: "rgba(156, 163, 175, 0.2)",
        };
    }
  };

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <View style={styles.loadingSpinner} />
        <Text style={styles.loadingText}>Cargando denuncias...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <ScrollView
        contentContainerStyle={styles.centeredContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#7c7c7c"]}
          />
        }
      >
        <AlertCircle size={48} color="#EF4444" />
        <Text style={styles.errorText}>{error}</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={styles.mainContainer}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#7c7c7c"]}
        />
      }
    >
      <View style={styles.container}>
        {feed.length === 0 ? (
          <View style={styles.emptyContainer}>
            <FileText size={48} color="#6B7280" />
            <Text style={styles.emptyText}>No hay denuncias disponibles.</Text>
          </View>
        ) : (
          feed.map((denuncia) => (
            <View key={denuncia.PK_complaint} style={styles.card}>
              {/* Header */}
              <View style={styles.cardHeader}>
                <View style={styles.headerLeft}>
                  <View style={styles.flagIconContainer}>
                    <MessageSquareQuote size={20} color="#7c7c7c" />
                  </View>
                  <View>
                    <Text style={styles.cardTitle}>
                      Mi denuncia Nº {denuncia.PK_complaint}
                    </Text>
                    <View style={styles.dateContainer}>
                      <Clock size={14} color="#9CA3AF" />
                      <Text style={styles.dateText}>
                        {formatDate(denuncia.createdAt)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.cardContent}>
                <View style={styles.contentGrid}>
                  {/* Left Column - Image and Transport Info */}
                  <View style={styles.leftColumn}>
                    {/* Image Section */}
                    {denuncia.image ? (
                      <View style={styles.imageContainer}>
                        <Image
                          source={{
                            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuAM7MdflxK4Yf7qjor3SqZPSja_aB4lIA5g&s",
                          }}
                          style={styles.image}
                        />
                      </View>
                    ) : (
                      <View style={styles.imageContainer}>
                        <Image
                          source={{
                            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuAM7MdflxK4Yf7qjor3SqZPSja_aB4lIA5g&s",
                          }}
                          style={styles.image}
                        />
                      </View>
                    )}

                    {/*   <View style={styles.noImageContainer}>
                                          <ImageIcon size={32} color="#4B5563" />
                                          <Text style={styles.noImageText}>Sin imagen</Text>
                                        </View> */}

                    {/* Transport Info Section */}
                    <View style={styles.transportInfoContainer}>
                      <View style={styles.infoGrid}>
                        <View style={styles.infoItem}>
                          <View style={styles.iconContainer}>
                            <Route size={16} color="#7c7c7c" />
                          </View>
                          <View>
                            <Text style={styles.infoLabel}>Línea</Text>
                            <Text style={styles.infoValue}>
                              {denuncia.transportLine || "No especificado"}
                            </Text>
                          </View>
                        </View>

                        <View style={styles.infoItem}>
                          <View style={styles.iconContainer}>
                            <Bus size={16} color="#7c7c7c" />
                          </View>
                          <View>
                            <Text style={styles.infoLabel}>Placa</Text>
                            <Text style={styles.infoValue}>
                              {denuncia.vehiclePlate || "No especificado"}
                            </Text>
                          </View>
                        </View>

                        <View style={styles.infoItem}>
                          <View style={styles.iconContainer}>
                            <User size={16} color="#7c7c7c" />
                          </View>
                          <View>
                            <Text style={styles.infoLabel}>Relación</Text>
                            <Text style={styles.infoValue}>
                              {denuncia.incidentRelation}
                            </Text>
                          </View>
                        </View>

                        <View style={styles.infoItem}>
                          <View style={styles.iconContainer}>
                            <Activity size={16} color="#7c7c7c" />
                          </View>
                          <View>
                            <Text style={styles.infoLabel}>Estado</Text>
                            <View style={styles.statusIndicatorContainer}>
                              <View
                                style={[
                                  styles.statusDot,
                                  {
                                    backgroundColor: getStatusColor(
                                      denuncia.tbstatuscomplaints.statusName
                                    ).text,
                                  },
                                ]}
                              />
                              <Text style={styles.infoValue}>
                                {denuncia.tbstatuscomplaints.statusName}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* Right Column - Description and Violations */}
                  <View style={styles.rightColumn}>
                    {/* Description Section */}
                    <View style={styles.descriptionContainer}>
                      <View style={styles.descriptionContent}>
                        <Text style={styles.descriptionText}>
                          {denuncia.description ? (
                            denuncia.description
                          ) : (
                            <Text style={styles.noDescriptionText}>
                              No hay descripción proporcionada
                            </Text>
                          )}
                        </Text>
                      </View>
                    </View>

                    {/* Violations Section */}
                    <View style={styles.violationsContainer}>
                      <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Infracciones</Text>
                      </View>

                      <View style={styles.violationsList}>
                        {JSON.parse(denuncia.violations).map(
                          (violation, idx) => (
                            <View key={idx} style={styles.violationItem}>
                              <AlertCircle size={16} color="#F87171" />
                              <Text style={styles.violationText}>
                                {violation}
                              </Text>
                            </View>
                          )
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))
        )}
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
    paddingTop: 20,
    paddingBottom: 10,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
    marginBottom: 20,
    textShadowColor: "rgba(255, 215, 0, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    minHeight: 300,
    backgroundColor:"#ffffff"
  },
  loadingSpinner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#7c7c7c",
    borderTopColor: "transparent",
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 20,
    color: "#9CA3AF",
  },
  errorText: {
    marginTop: 16,
    fontSize: 18,
    color: "#EF4444",
  },
  emptyContainer: {
    backgroundColor: "#ffffff",
    padding: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.2)",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 20,
    color: "#6B7280",
    marginTop: 16,
  },
  card: {
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
    backgroundColor: "",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  flagIconContainer: {
    backgroundColor: "rgba(255, 215, 0, 0.4)",
    padding: 8,
    borderRadius: 6,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#000000",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  dateText: {
    fontSize: 12,
    color: "#000000",
  },
  statusBadge: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
  },
  statusText: {
    fontWeight: "500",
  },
  cardContent: {},
  contentGrid: {
    // In React Native, we'll need to handle grid with different approach on small vs large screens
  },
  leftColumn: {},
  rightColumn: {
    // Style for right column
  },
  imageContainer: {
    overflow: "hidden",
    // borderWidth: 1,
    // borderColor: '#374151',
    backgroundColor: "#ffffff",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  noImageContainer: {
    height: 192,
    backgroundColor: "#ffffff",
    // borderWidth: 1,
    // borderColor: '#374151',
    justifyContent: "center",
    alignItems: "center",
  },
  noImageText: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 8,
  },
  transportInfoContainer: {
    padding: 16,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#000000",
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    minWidth: "45%",
  },
  iconContainer: {
    width: 36,
    height: 36,
    backgroundColor: "#efefef",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 12,
    color: "#6B7280",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
  },
  statusIndicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  descriptionContainer: {
    padding: 16,
    paddingBottom: 0,
    paddingTop: 0,
  },

  descriptionText: {
    color: "#000000",
  },
  noDescriptionText: {
    fontStyle: "italic",
    color: "#000000",
  },
  violationsContainer: {
    color: "#000000",

    padding: 16,
  },
  violationsList: {
    gap: 4,
    paddingTop: 8,
    paddingBottom: 4,
  },
  violationItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 2,
  },
  violationText: {
    fontSize: 13,
    color: "#000000",
  },
});
