import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Image, 
  TouchableOpacity 
} from 'react-native';
import { 
  User, 
  Edit3, 
  Lock, 
  Settings, 
  LogOut 
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

export default function MiPerfilScreen() {
  const [userData, setUserData] = useState(null);
  const [faresData, setFaresData] = useState(null);
  const navigation = useNavigation();

  // Obtener los datos desde AsyncStorage
  useEffect(() => {
    const fetchData = async () => {
      const user = await AsyncStorage.getItem("@storage_user");
      const fares = await AsyncStorage.getItem("@storage_fares");

      if (user && fares) {
        setUserData(JSON.parse(user));
        setFaresData(JSON.parse(fares));
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    // Eliminar los datos de AsyncStorage
    await AsyncStorage.removeItem("@storage_token");
    await AsyncStorage.removeItem("@storage_user");
    await AsyncStorage.removeItem("@storage_fares");

    // Redirigir a la pantalla de landing
    navigation.navigate('landing');
  };

  if (!userData || !faresData) {
    return <Text>Cargando...</Text>; // O puedes mostrar un spinner mientras cargan los datos
  }

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Mi Perfil</Text>
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            {userData.profileImage ? (
              <Image 
                source={{ uri: userData.profileImage }} 
                style={styles.profileImage} 
              />
            ) : (
              <View style={styles.noProfileImage}>
                <User size={48} color="#6B7280" />
              </View>
            )}
          </View>
          <View style={styles.profileContent}>
            <Text style={styles.profileName}>
              {userData.firstName} {userData.lastName}
            </Text>
            <Text style={styles.profileInfo}>Email: {userData.email}</Text>
            {userData.phone && (
              <Text style={styles.profileInfo}>Teléfono: {userData.phone}</Text>
            )}
            {userData.address && (
              <Text style={styles.profileInfo}>Dirección: {userData.address}</Text>
            )}
            {userData.birthDate && (
              <Text style={styles.profileInfo}>
                Fecha de Nacimiento: {userData.birthDate}
              </Text>
            )}
            {userData.gender && (
              <Text style={styles.profileInfo}>Género: {userData.gender}</Text>
            )}
            <Text style={styles.profileInfo}>
              Estado: {userData.status ? "Activo" : "Inactivo"}
            </Text>
            {/* Información de tarifas */}
            <Text style={styles.profileInfo}>Tipo: {faresData.userType}</Text>
            <Text style={styles.profileInfo}>Monto: {faresData.amount}</Text>
          </View>
        </View>

        {/* Sección de Acciones del Perfil */}
        <View style={styles.profileActionsContainer}>
          <TouchableOpacity style={styles.profileAction}>
            <Edit3 size={24} color="#FFD700" />
            <Text style={styles.profileActionText}>Editar Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileAction}>
            <Lock size={24} color="#FFD700" />
            <Text style={styles.profileActionText}>Cambiar Contraseña</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileAction}>
            <Settings size={24} color="#FFD700" />
            <Text style={styles.profileActionText}>Ajustes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileAction} onPress={handleLogout}>
            <LogOut size={24} color="#FFD700" />
            <Text style={styles.profileActionText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
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
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFD700",
    textAlign: "center",
    marginBottom: 20,
    textShadowColor: "rgba(255, 215, 0, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  profileCard: {
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
  profileHeader: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  noProfileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  profileContent: {
    padding: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
    textAlign: "center",
  },
  profileInfo: {
    fontSize: 16,
    color: "#D1D5DB",
    marginBottom: 4,
  },
  profileActionsContainer: {
    marginTop: 20,
    backgroundColor: "rgba(31, 41, 55, 0.8)",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.2)",
    paddingVertical: 16,
    paddingHorizontal: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  profileAction: {
    alignItems: "center",
    marginVertical: 8,
    width: "45%",
  },
  profileActionText: {
    fontSize: 14,
    color: "#FFD700",
    marginTop: 4,
    textAlign: "center",
  },
});
