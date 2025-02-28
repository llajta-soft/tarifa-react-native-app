import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Modal, 
  TextInput, 
  StatusBar,
  Dimensions,
  Platform
} from 'react-native';
import { 
  User, 
  Edit3, 
  LogOut,
  Camera,
  MapPin,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  ChevronsDown,
  Shield,
  UserCheck,
  Star
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

export default function MiPerfilScreen() {
  const [userData, setUserData] = useState(null);
  const [faresData, setFaresData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});
  const [selectedGender, setSelectedGender] = useState(null);
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const navigation = useNavigation();

  const genderOptions = ["Masculino", "Femenino", "Otro", "Prefiero no decir"];

  useEffect(() => {
    const fetchData = async () => {
      const user = await AsyncStorage.getItem("@storage_user");
      const fares = await AsyncStorage.getItem("@storage_fares");

      if (user && fares) {
        setUserData(JSON.parse(user));
        setFaresData(JSON.parse(fares));
        setEditedUserData(JSON.parse(user));
        setSelectedGender(JSON.parse(user).gender);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("@storage_token");
    await AsyncStorage.removeItem("@storage_user");
    await AsyncStorage.removeItem("@storage_fares");
   // Resetear el historial de navegación
   navigation.reset({
    index: 0,
    routes: [{ name: 'index' }],  // Redirige a la pantalla de inicio
  });
  };

  const handleEditProfile = () => {
    setIsModalVisible(true);
  };

  const handleSaveChanges = () => {
    const updatedUserData = {...editedUserData, gender: selectedGender};
    AsyncStorage.setItem("@storage_user", JSON.stringify(updatedUserData));
    setUserData(updatedUserData);
    setIsModalVisible(false);
  };

  const selectGender = (gender) => {
    setSelectedGender(gender);
    setShowGenderDropdown(false);
  };

  if (!userData || !faresData) {
    return (
      <View style={styles.loadingContainer}>
        <LinearGradient
          colors={['#FFD700', '#FFA000']}
          style={styles.loadingGradient}
        >
          <Text style={styles.loadingText}>Cargando...</Text>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="#FFD700" /> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#FFD700', '#FFEB3B']}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <Text style={styles.pageTitle}>Mi Perfil</Text>
            <View style={styles.profileImageContainer}>
              {userData.profileImage ? (
                <Image 
                  source={{ uri: userData.profileImage }} 
                  style={styles.profileImage} 
                />
              ) : (
                <View style={styles.noProfileImage}>
                  <LinearGradient
                    colors={['#FFA000', '#FFD700']}
                    style={styles.gradientProfileImage}
                  >
                    <Text style={styles.profileInitials}>
                      {userData.firstName.charAt(0)}{userData.lastName.charAt(0)}
                    </Text>
                  </LinearGradient>
                </View>
              )}
              <TouchableOpacity style={styles.cameraButton}>
                <Camera size={20} color="#000000" />
              </TouchableOpacity>
            </View>
            <Text style={styles.profileName}>{userData.firstName} {userData.lastName}</Text>
            <View style={styles.profileTypeContainer}>
              <Star size={16} color="#FFD700" style={{marginRight: 5}} />
              <Text style={styles.profileType}>{faresData.userType}</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.container}>
          <View style={styles.infoCard}>
            <View style={styles.infoSection}>
              <View style={styles.infoHeader}>
                <Text style={styles.infoTitle}>Información Personal</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Shield size={20} color="#000000" style={styles.infoIcon} />
                <View>
                  <Text style={styles.infoLabel}>Cédula de Identidad</Text>
                  <Text style={styles.infoValue}>{userData.CI || "No registrado"}</Text>
                </View>
              </View>
              
              <View style={styles.infoRow}>
                <Mail size={20} color="#000000" style={styles.infoIcon} />
                <View>
                  <Text style={styles.infoLabel}>Email</Text>
                  <Text style={styles.infoValue}>{userData.email}</Text>
                </View>
              </View>
              
              <View style={styles.infoRow}>
                <Phone size={20} color="#000000" style={styles.infoIcon} />
                <View>
                  <Text style={styles.infoLabel}>Teléfono</Text>
                  <Text style={styles.infoValue}>{userData.phone || "No registrado"}</Text>
                </View>
              </View>
              
              <View style={styles.infoRow}>
                <MapPin size={20} color="#000000" style={styles.infoIcon} />
                <View>
                  <Text style={styles.infoLabel}>Dirección</Text>
                  <Text style={styles.infoValue}>{userData.address || "No registrada"}</Text>
                </View>
              </View>
              
              <View style={styles.infoRow}>
                <Calendar size={20} color="#000000" style={styles.infoIcon} />
                <View>
                  <Text style={styles.infoLabel}>Fecha de Nacimiento</Text>
                  <Text style={styles.infoValue}>{userData.birthDate || "No registrada"}</Text>
                </View>
              </View>
              
              <View style={styles.infoRow}>
                <UserCheck size={20} color="#000000" style={styles.infoIcon} />
                <View>
                  <Text style={styles.infoLabel}>Género</Text>
                  <Text style={styles.infoValue}>{userData.gender || "No registrado"}</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.infoSection}>
              <View style={styles.infoHeader}>
                <Text style={styles.infoTitle}>Información de Cuenta</Text>
              </View>
              
              <View style={styles.infoRow}>
                <CreditCard size={20} color="#000000" style={styles.infoIcon} />
                <View>
                  <Text style={styles.infoLabel}>Tu pasaje.</Text>
                  <Text style={styles.infoValue}>Bs{faresData.amount}</Text>
                </View>
              </View>
              
              <View style={[styles.infoRow, styles.statusRow]}>
                <Text style={styles.infoLabel}>Estado</Text>
                <View style={[styles.statusBadge, userData.status ? styles.activeBadge : styles.inactiveBadge]}>
                  <Text style={[styles.statusText, userData.status ? styles.activeText : styles.inactiveText]}>
                    {userData.status ? "Activo" : "Inactivo"}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.actionsContainer}>
            {/* <TouchableOpacity 
              style={styles.actionButton} 
              onPress={handleEditProfile}
            >
              <LinearGradient
                colors={['rgba(255, 215, 0, 0.9)', 'rgba(255, 215, 0, 0.9)']}
                style={styles.buttonGradient}
              >
                <Edit3 size={20} color="#000000" />
                <Text style={styles.actionButtonText}>Editar Perfil</Text>
              </LinearGradient>
            </TouchableOpacity> */}
            
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={handleLogout}
            >
              <LinearGradient
                colors={['rgba(255, 215, 0, 0.9)', 'rgba(255, 215, 0, 0.9)']}
                style={styles.buttonGradient}
              >
                <LogOut size={20} color="#000000" />
                <Text style={styles.actionButtonText}>Cerrar Sesión</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Modal para editar perfil */}
      <Modal 
        visible={isModalVisible} 
        animationType="slide" 
        transparent={true} 
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <BlurView intensity={90} style={StyleSheet.absoluteFill} tint="dark" />
          <View style={styles.modalContainer}>
            <LinearGradient
              colors={['#FFD700', '#000000']}
              style={styles.modalHeader}
            >
              <Text style={styles.modalTitle}>Editar Perfil</Text>
            </LinearGradient>
            
            <ScrollView style={styles.modalScrollView} showsVerticalScrollIndicator={false}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nombre</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Nombre"
                  value={editedUserData.firstName}
                  onChangeText={(text) => setEditedUserData({...editedUserData, firstName: text})}
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Apellido</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Apellido"
                  value={editedUserData.lastName}
                  onChangeText={(text) => setEditedUserData({...editedUserData, lastName: text})}
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Cédula de Identidad</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Cédula de Identidad"
                  value={editedUserData.CI}
                  onChangeText={(text) => setEditedUserData({...editedUserData, CI: text})}
                  keyboardType="numeric"
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Email"
                  value={editedUserData.email}
                  onChangeText={(text) => setEditedUserData({...editedUserData, email: text})}
                  keyboardType="email-address"
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Teléfono</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Teléfono"
                  value={editedUserData.phone}
                  onChangeText={(text) => setEditedUserData({...editedUserData, phone: text})}
                  keyboardType="phone-pad"
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Dirección</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Dirección"
                  value={editedUserData.address}
                  onChangeText={(text) => setEditedUserData({...editedUserData, address: text})}
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Fecha de Nacimiento</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="DD/MM/AAAA"
                  value={editedUserData.birthDate}
                  onChangeText={(text) => setEditedUserData({...editedUserData, birthDate: text})}
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Género</Text>
                <TouchableOpacity 
                  style={styles.dropdownSelector}
                  onPress={() => setShowGenderDropdown(!showGenderDropdown)}
                >
                  <Text style={styles.dropdownText}>
                    {selectedGender || "Seleccionar género"}
                  </Text>
                  <ChevronsDown size={20} color="#6b7280" />
                </TouchableOpacity>
                
                {showGenderDropdown && (
                  <View style={styles.dropdownMenu}>
                    {genderOptions.map((gender, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.dropdownItem}
                        onPress={() => selectGender(gender)}
                      >
                        <Text style={[
                          styles.dropdownItemText,
                          selectedGender === gender && styles.selectedDropdownItemText
                        ]}>
                          {gender}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </ScrollView>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]} 
                onPress={handleSaveChanges}
              >
                <LinearGradient
                  colors={['#FFD700', '#000000']}
                  style={styles.saveButtonGradient}
                >
                  <Text style={styles.saveButtonText}>Guardar</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff9e6",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff9e6",
  },
  loadingGradient: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
  },
  headerGradient: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 30,
  },
  headerContent: {
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
    marginBottom: 20,
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 5,
    borderColor: '#FFFFFF',
  },
  noProfileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 5,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
  },
  gradientProfileImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitials: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  profileName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 5,
  },
  profileTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  profileType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  container: {
    padding: 16,
    marginTop: -30,
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#e4e2e2",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
    overflow: 'hidden',
  
  },
  infoSection: {
    marginBottom: 5,
  },
  infoHeader: {
    backgroundColor: '#fff9e6',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  infoIcon: {
    marginRight: 15,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '400',
  },
  statusRow: {
    justifyContent: 'space-between',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  activeBadge: {
    backgroundColor: '#dcfce7',
  },
  inactiveBadge: {
    backgroundColor: '#fee2e2',
  },
  statusText: {
    fontWeight: '600',
    fontSize: 14,
  },
  activeText: {
    color: '#15803d',
  },
  inactiveText: {
    color: '#b91c1c',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    borderRadius: 8,
    overflow: 'hidden',
    width: '48%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 15,
    backgroundColor:"rgba(255, 215, 0, 0.9)"
  },
  actionButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  modalContainer: {
    width: width * 0.9,
    maxHeight: height * 0.8,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  modalHeader: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  modalScrollView: {
    padding: 20,
    maxHeight: height * 0.5,
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 6,
    paddingLeft: 4,
    fontWeight: '500',
  },
  modalInput: {
    backgroundColor: '#fff9e6',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  dropdownSelector: {
    backgroundColor: '#fff9e6',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontSize: 16,
    color: '#374151',
  },
  dropdownMenu: {
    marginTop: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    zIndex: 1000,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#374151',
  },
  selectedDropdownItemText: {
    color: '#FFA000',
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f5f5f5',
  },
  modalButton: {
    borderRadius: 15,
    paddingVertical: 14,
    width: '48%',
    overflow: 'hidden',
  },
  cancelButton: {
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#d1d5db',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  saveButtonGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  cancelButtonText: {
    color: '#4b5563',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
});