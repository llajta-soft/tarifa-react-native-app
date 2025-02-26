import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, StatusBar } from "react-native";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function LandingScreen() {
  const router = useRouter();

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <View style={styles.dividerDot} />
          <View style={styles.dividerLine} />
        </View>

        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.pageTitle}>¡Bienvenido a La Tarifa!</Text>
          <Text style={styles.subtitle}>
            Aquí podrás denunciar cobros excesivos del transporte público.
          </Text>
        </View>

        {/* Card Container */}
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <View style={styles.actionContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/login")}
              >
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
              </TouchableOpacity>

              <Text style={styles.orText}>o</Text>

              <TouchableOpacity
                style={[styles.button, styles.outlineButton]}
                onPress={() => router.push("/register")}
              >
                <Text style={styles.outlineButtonText}>Crear Cuenta</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footerSection}>
              <Text style={styles.footerText}>Juntos por una comunidad más justa</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: "center",
    marginTop: 70,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    width: "60%",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  dividerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FFD700",
    marginHorizontal: 15,
    shadowColor: "#FFD700",
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 10,
  },
  welcomeSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 26,
    paddingHorizontal: 24,
  },
  cardContainer: {
    width: "100%",
    alignItems: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionContainer: {
    alignItems: "center",
    padding: 16,
  },
  button: {
    width: "100%",
    backgroundColor: "#FFD700",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "700",
  },
  orText: {
    color: "#6B7280",
    fontSize: 16,
    marginVertical: 8,
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#FFD700",
  },
  outlineButtonText: {
    color: "#FFD700",
    fontSize: 18,
    fontWeight: "700",
  },
  footerSection: {
    marginTop: 24,
    alignItems: "center",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  footerText: {
    color: "#6B7280",
    fontSize: 14,
    fontStyle: "italic",
  },
});

