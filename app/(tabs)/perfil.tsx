import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Importa Ionicons

// Define la interfaz para los datos del pasajero
interface PassengerData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: string;
  address: string;
  CI: string;
  profileImage: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

const Perfil = () => {
  // Tipar el estado usando la interfaz
  const [passengerData, setPassengerData] = useState<PassengerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPassengerData = async () => {
      try {
        // Simulación de la obtención de datos desde una API
        setTimeout(() => {
          const mockData: PassengerData = {
            firstName: "Juan",
            lastName: "Pérez",
            email: "juan.perez@example.com",
            phone: "123-456-7890",
            birthDate: "1990-05-15",
            gender: "Masculino",
            address: "Calle Principal 123",
            CI: "1234567",
            profileImage: "profile.jpg",
            status: true,
            createdAt: "2023-01-01T10:00:00Z",
            updatedAt: "2023-01-15T14:30:00Z",
          };
          setPassengerData(mockData);
          setLoading(false);
        }, 1000); // Simula una demora de 1 segundo
      } catch (err) {
        console.error("Error fetching passenger data:", err);
        setError("Error al cargar datos del perfil.");
        setLoading(false);
      }
    };

    fetchPassengerData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.title}>
          <Ionicons name="person" size={24} color="#FFD700" style={styles.titleIcon} />
          Cuenta de Pasajero
        </Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitleStyle}>Información Personal</Text>
            {/* Mostrar la información */}
          </View>
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitleStyle}>Información de la Cuenta</Text>
            {/* Mostrar la información */}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    padding: 20,
  },
  profileContainer: {
    backgroundColor: '#1F2937',
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleIcon: {
    marginRight: 10,
    color: '#FFD700',
  },
  infoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoSection: {
    width: '48%',
    marginBottom: 20,
  },
  sectionTitleStyle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFD700',
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#E5E7EB',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#E53E3E',
  },
});

export default Perfil;
