import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function LandingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
      
      <ImageBackground
        source={require("../assets/images/cbba.png")}
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.8)']}
          style={styles.overlay}
        >
          <View style={styles.contentContainer}>
            <View style={styles.innerContainer}>
              {/* Logo y Título en la misma línea */}
              <View style={styles.headerContainer}>
                <View style={styles.logoCircle}>
                  <Text style={styles.logoText}>T</Text>
                </View>
                <View style={styles.titleContainer}>
                  <Text style={styles.pageTitle}>Tarifa</Text>
                  <Text style={styles.pageSubtitle}>Transporte Justo</Text>
                </View>
              </View>

              {/* Information card */}
              <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>
                  ¡Denuncia cobros indebidos en el transporte público de Cochabamba!
                </Text>
              </View>

              {/* Action buttons with improved design */}
              <View style={styles.actionContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => router.push("/login")}
                >
                  <Text style={styles.buttonText}>Iniciar Sesión</Text>
                </TouchableOpacity>

                <View style={styles.dividerContainer}>
                  <View style={styles.divider} />
                  <Text style={styles.orText}>o</Text>
                  <View style={styles.divider} />
                </View>

                <TouchableOpacity
                  style={[styles.button, styles.outlineButton]}
                  onPress={() => router.push("/register")}
                >
                  <Text style={styles.outlineButtonText}>Crear Cuenta</Text>
                </TouchableOpacity>
              </View>

              {/* Footer */}
              <Text style={styles.footerText}>Versión 1.0 - LLajtasoft</Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  innerContainer: {
    alignItems: "center",
    width: "90%",
    maxWidth: 400,
  },
  headerContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    width: "100%",
  },
  logoCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFD700",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 10, // Cambiado marginRight a marginBottom para alineación en columna
  },
  logoText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  titleContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  pageTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFD700",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    letterSpacing: 1,
    lineHeight: 40,
  },
  pageSubtitle: {
    fontSize: 14,
    color: "#ffffff",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  infoContainer: {
    padding: 15,
  
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    lineHeight: 22,
  },
  actionContainer: {
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#FFD700",
    padding: 14,
    paddingVertical: 10,
    width: "100%",
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#FFD700",
    shadowOpacity: 0.4,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    marginVertical: 5,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  orText: {
    color: "#fff",
    fontSize: 14,
    marginHorizontal: 10,
    fontWeight: "300",
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#d1bf00",
  },
  outlineButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFD700",
  },
  footerText: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 12,
    marginTop: 10,
  },
});