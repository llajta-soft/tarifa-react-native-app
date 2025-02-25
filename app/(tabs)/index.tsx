"use client";
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { 
  AlertCircle, 
  Clock, 
  FileText, 
  Flag, 
  Shield, 
  MapPin, 
  User, 
  Info, 
  Car,
  Image as ImageIcon
} from 'lucide-react-native';

export default function HomeScreen() {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await axios.get('http://192.168.1.6:3000/api/account/feed');
        console.log("Respuesta de la API:", response.data);
        setFeed(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Hubo un error al cargar las denuncias.");
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  const formatDate = (dateString) => {
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
          text: '#FFBF00', 
          bg: 'rgba(255, 191, 0, 0.1)', 
          border: 'rgba(255, 191, 0, 0.2)'
        };
      case "revision":
        return { 
          text: '#3B82F6', 
          bg: 'rgba(59, 130, 246, 0.1)', 
          border: 'rgba(59, 130, 246, 0.2)'
        };
      case "resuelto":
        return { 
          text: '#4ADE80', 
          bg: 'rgba(74, 222, 128, 0.1)', 
          border: 'rgba(74, 222, 128, 0.2)'
        };
      default:
        return { 
          text: '#9CA3AF', 
          bg: 'rgba(156, 163, 175, 0.1)', 
          border: 'rgba(156, 163, 175, 0.2)'
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
      <View style={styles.centeredContainer}>
        <AlertCircle size={48} color="#EF4444" />
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.mainContainer}>
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
                    <Flag size={20} color="#FFD700" />
                  </View>
                  <View>
                    <Text style={styles.cardTitle}>Denuncia #{denuncia.PK_complaint}</Text>
                    <View style={styles.dateContainer}>
                      <Clock size={14} color="#9CA3AF" />
                      <Text style={styles.dateText}>{formatDate(denuncia.createdAt)}</Text>
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
                          source={{ uri: denuncia.image }} 
                          style={styles.image} 
                        />
                      </View>
                    ) : (
                      <View style={styles.noImageContainer}>
                        <ImageIcon size={32} color="#4B5563" />
                        <Text style={styles.noImageText}>Sin imagen</Text>
                      </View>
                    )}

                    {/* Transport Info Section */}
                    <View style={styles.transportInfoContainer}>
                      <View style={styles.sectionHeader}>
                        <Car size={18} color="#FFD700" />
                        <Text style={styles.sectionTitle}>Información del Transporte</Text>
                      </View>

                      <View style={styles.infoGrid}>
                        <View style={styles.infoItem}>
                          <View style={styles.iconContainer}>
                            <MapPin size={16} color="#FFD700" />
                          </View>
                          <View>
                            <Text style={styles.infoLabel}>Línea</Text>
                            <Text style={styles.infoValue}>{denuncia.transportLine || "No especificado"}</Text>
                          </View>
                        </View>

                        <View style={styles.infoItem}>
                          <View style={styles.iconContainer}>
                            <Car size={16} color="#FFD700" />
                          </View>
                          <View>
                            <Text style={styles.infoLabel}>Placa</Text>
                            <Text style={styles.infoValue}>{denuncia.vehiclePlate || "No especificado"}</Text>
                          </View>
                        </View>

                        <View style={styles.infoItem}>
                          <View style={styles.iconContainer}>
                            <User size={16} color="#FFD700" />
                          </View>
                          <View>
                            <Text style={styles.infoLabel}>Relación</Text>
                            <Text style={styles.infoValue}>{denuncia.incidentRelation}</Text>
                          </View>
                        </View>

                        <View style={styles.infoItem}>
                          <View style={styles.iconContainer}>
                            <User size={16} color="#FFD700" />
                          </View>
                          <View>
                            <Text style={styles.infoLabel}>Estado</Text>
                            <View style={styles.statusIndicatorContainer}>
                              <View style={[
                                styles.statusDot, 
                                { backgroundColor: getStatusColor(denuncia.tbstatuscomplaints.statusName).text }
                              ]} />
                              <Text style={styles.infoValue}>{denuncia.tbstatuscomplaints.statusName}</Text>
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
                      <View style={styles.sectionHeader}>
                        <Info size={18} color="#FFD700" />
                        <Text style={styles.sectionTitle}>Descripción del Incidente</Text>
                      </View>

                      <View style={styles.descriptionContent}>
                        <Text style={styles.descriptionText}>
                          {denuncia.description ? (
                            denuncia.description
                          ) : (
                            <Text style={styles.noDescriptionText}>No hay descripción proporcionada</Text>
                          )}
                        </Text>
                      </View>
                    </View>

                    {/* Violations Section */}
                    <View style={styles.violationsContainer}>
                      <View style={styles.sectionHeader}>
                        <Shield size={18} color="#FFD700" />
                        <Text style={styles.sectionTitle}>Infracciones Reportadas</Text>
                      </View>

                      <View style={styles.violationsList}>
                        {JSON.parse(denuncia.violations).map((violation, idx) => (
                          <View key={idx} style={styles.violationItem}>
                            <AlertCircle size={16} color="#F87171" />
                            <Text style={styles.violationText}>{violation}</Text>
                          </View>
                        ))}
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
    backgroundColor: '#000000',
  },
  container: {
    padding: 8,
    paddingTop: 20,
    paddingBottom: 10,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(255, 215, 0, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    minHeight: 300,
  },
  loadingSpinner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#FFD700',
    borderTopColor: 'transparent',
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 20,
    color: '#9CA3AF',
  },
  errorText: {
    marginTop: 16,
    fontSize: 18,
    color: '#EF4444',
  },
  emptyContainer: {
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    padding: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 20,
    color: '#6B7280',
    marginTop: 16,
  },
  card: {
    marginBottom: 12,
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 215, 0, 0.1)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  flagIconContainer: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    padding: 8,
    borderRadius: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  dateText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  statusBadge: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
  },
  statusText: {
    fontWeight: '500',
  },
  cardContent: {
  
  },
  contentGrid: {
    // In React Native, we'll need to handle grid with different approach on small vs large screens
  },
  leftColumn: {
   
  },
  rightColumn: {
    // Style for right column
  },
  imageContainer: {
   
    overflow: 'hidden',
    // borderWidth: 1,
    // borderColor: '#374151',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',

  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  noImageContainer: {
    height: 192,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // borderWidth: 1,
    // borderColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  noImageText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
  },
  transportInfoContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  
    padding: 20,
    // borderWidth: 1,
    // borderColor: '#374151',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFD700',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minWidth: '45%', 
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  statusIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  descriptionContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 20,
    // borderWidth: 1,
    // borderColor: '#374151',
 
  },
  descriptionContent: {
    padding: 4,
   
  },
  descriptionText: {
    color: '#D1D5DB',
  },
  noDescriptionText: {
    fontStyle: 'italic',
    color: '#6B7280',
  },
  violationsContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',

    padding: 20,
    // borderWidth: 1,
    // borderColor: '#374151',
  },
  violationsList: {
    gap: 4,
    padding:4
  },
  violationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    padding: 2

  },
  violationText: {
    fontSize: 14,
    color: '#6B7280',
  },
});