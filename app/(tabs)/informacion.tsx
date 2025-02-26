import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { 
  Users, 
  Accessibility, 
  UserCheck, 
  GraduationCap, 
  Book, 
  BookOpen 
} from 'lucide-react-native';

// Componente para cada tarjeta de tarifa
const TarifaCard = ({ IconComponent, title, price }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <IconComponent size={32} color="#FFD700" />
    </View>
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardText}>
        Tarifa: <Text style={styles.cardPrice}>{price}</Text>
      </Text>
    </View>
  </View>
);

// Componente para cada fila de la tabla
const TableRow = ({ no, infraccion, sancion, header = false }) => {
  const textStyle = header ? styles.tableHeader : styles.tableCell;
  return (
    <View style={styles.tableRow}>
      <Text style={[textStyle, { flex: 0.5 }]}>{no}</Text>
      <Text style={[textStyle, { flex: 3 }]}>{infraccion}</Text>
      <Text style={[textStyle, { flex: 2 }]}>{sancion}</Text>
    </View>
  );
};

export default function TarifaScreen() {
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Tarifas y Sanciones</Text>
        
        {/* Sección de Tarifa: Tarjetas */}
        <View style={styles.grid}>
          <TarifaCard 
            IconComponent={Users} 
            title="Usuarios en General" 
            price="Bs. 2.50" 
          />
          <TarifaCard 
            IconComponent={Accessibility} 
            title="Personas con Discapacidad" 
            price="Bs. 1.50" 
          />
          <TarifaCard 
            IconComponent={UserCheck} 
            title="Adultos Mayores o Tercera Edad" 
            price="Bs. 1.50" 
          />
          <TarifaCard 
            IconComponent={GraduationCap} 
            title="Estudiantes Universitarios" 
            price="Bs. 1.00" 
          />
          <TarifaCard 
            IconComponent={Book} 
            title="Estudiantes de Nivel Secundario" 
            price="Bs. 1.00" 
          />
          <TarifaCard 
            IconComponent={BookOpen} 
            title="Estudiantes de Nivel Primaria" 
            price="Bs. 0.50" 
          />
        </View>

        {/* Sección de Infracciones y Sanciones: Tabla */}
        <View style={styles.tableContainer}>
          <Text style={styles.tableTitle}>Infracciones y Sanciones</Text>
          <TableRow 
            no="No." 
            infraccion="Infracción" 
            sancion="Sanción" 
            header 
          />
          <TableRow 
            no="1" 
            infraccion="Incumplimiento de uno o varios de los criterios de Calidad establecidos en el Artículo 5" 
            sancion="Suspensión del vehículo" 
          />
          <TableRow 
            no="2" 
            infraccion="Incumplimiento de uno o varios de los criterios de Seguridad establecidos en el Artículo 6" 
            sancion="Aplicación de sanciones según el código de tránsito" 
          />
          <TableRow 
            no="3" 
            infraccion="Cobrar tarifas superiores a las determinadas en la Ley Municipal 1575/2024" 
            sancion="Pago de Bs. 100" 
          />
          <TableRow 
            no="4" 
            infraccion="No recoger un pasajero de manera injustificada" 
            sancion="Pago de Bs. 100" 
          />
          <TableRow 
            no="5" 
            infraccion="Abandonar al usuario a medio recorrido" 
            sancion="Pago de Bs. 50" 
          />
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "rgba(31, 41, 55, 0.8)",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.2)",
    overflow: "hidden",
    marginBottom: 12,
    shadowColor: "#000",
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
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 215, 0, 0.1)",
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    color: "#4B5563",
  },
  cardPrice: {
    fontWeight: "bold",
    color: "#2563eb",
  },
  tableContainer: {
    marginTop: 32,
    backgroundColor: "rgba(31, 41, 55, 0.8)",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.2)",
    padding: 16,
  },
  tableTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 16,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  tableHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFD700",
  },
  tableCell: {
    fontSize: 14,
    color: "#FFFFFF",
  },
});
