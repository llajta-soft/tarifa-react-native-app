import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function TarifaScreen() {
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>
          Ley Municipal N° 1575/2024
        </Text>
        <Text style={styles.pageDescription}>
          Regulación de Tarifas de Transporte Público en Cercado Cochabamba, Bolivia
        </Text>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>1. Introducción</Text>
          <Text style={styles.sectionText}>
            La <Text style={styles.bold}>Ley Municipal N° 1575/2024</Text> establece tarifas fijas para el transporte público en Cochabamba, con el fin de garantizar un cobro justo y mejorar la calidad del servicio. Regula el comportamiento de los transportistas e impone sanciones a quienes incumplan.
          </Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>2. Tarifas Oficiales</Text>
          <Text style={styles.sectionText}>
            Usuarios generales: <Text style={styles.bold}>Bs. 2.50</Text>
          </Text>
          <Text style={styles.sectionText}>
            Personas con discapacidad: <Text style={styles.bold}>Bs. 1.50</Text>
          </Text>
          <Text style={styles.sectionText}>
            Personas adultas mayores: <Text style={styles.bold}>Bs. 1.50</Text>
          </Text>
          <Text style={styles.sectionText}>
            Estudiantes de secundaria: <Text style={styles.bold}>Bs. 1.00</Text>
          </Text>
          <Text style={styles.sectionText}>
            Estudiantes universitarios: <Text style={styles.bold}>Bs. 1.00</Text>
          </Text>
          <Text style={styles.sectionText}>
            Estudiantes de primaria: <Text style={styles.bold}>Bs. 0.50</Text>
          </Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>3. Supervisión y Control</Text>
          <Text style={styles.sectionText}>
            El <Text style={styles.bold}>Gobierno Autónomo Municipal de Cochabamba</Text> y <Text style={styles.bold}>Movilidad Urbana</Text> son responsables de supervisar y garantizar el cumplimiento de las tarifas en el transporte público.
          </Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>4. Sanciones por Incumplimiento</Text>
          <Text style={styles.sectionText}>
            Se establecen las siguientes infracciones y sanciones según el Reglamento de la Ley Municipal N° 1575/2024:
          </Text>
          <Text style={styles.sectionText}>
            1. Incumplimiento de los criterios de calidad (Ejemplo: Ventanas rotas, asientos sucios o sin respaldo) - <Text style={styles.bold}>Suspensión temporal del vehículo</Text>
          </Text>
          <Text style={styles.sectionText}>
            2. Incumplimiento de los criterios de seguridad (Ejemplo: Conductor no respeta las normas de tránsito) - <Text style={styles.bold}>Multa según el Código de Tránsito</Text>
          </Text>
          <Text style={styles.sectionText}>
            3. Cobro de tarifas superiores a las autorizadas (Ejemplo: Cargar Bs. 2.50 en lugar de Bs. 1) - <Text style={styles.bold}>Multa de Bs. 100</Text>
          </Text>
          <Text style={styles.sectionText}>
            4. No recoger un pasajero sin justificación (Ejemplo: Conductor no recoge pasajeros en una parada) - <Text style={styles.bold}>Multa de Bs. 100</Text>
          </Text>
          <Text style={styles.sectionText}>
            5. Abandonar a un pasajero a medio recorrido - <Text style={styles.bold}>Multa de Bs. 50</Text>
          </Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Aplicación "Tarifa"</Text>
          <Text style={styles.sectionText}>
            "Tarifa" surge como respuesta ciudadana ante los abusos en el transporte público. Busca empoderar a los ciudadanos para denunciar infracciones, como cobros excesivos, y apoyar el cumplimiento de la Ley Municipal N° 1575/2024.
          </Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Objetivo</Text>
          <Text style={styles.sectionText}>
            El objetivo de "Tarifa" es garantizar el cumplimiento de la Ley Municipal N° 1575/2024, que regula las tarifas del transporte público. A pesar de la ley, muchos transportistas siguen cobrando de manera indebida, especialmente a <Text style={styles.bold}>estudiantes y personas mayores</Text>. La aplicación permite recolectar denuncias y presionar al <Text style={styles.bold}>Gobierno Autónomo Municipal de Cochabamba</Text> para sancionar a los infractores.
          </Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Cómo Funciona</Text>
          <Text style={styles.sectionText}>
            Los usuarios pueden denunciar abusos proporcionando:
          </Text>
          <Text style={styles.sectionText}>- Línea de transporte</Text>
          <Text style={styles.sectionText}>- Placa del vehículo</Text>
          <Text style={styles.sectionText}>- Evidencias fotográficas</Text>
          <Text style={styles.sectionText}>- Listado de infracciones</Text>
          <Text style={styles.sectionText}>- Relación con el incidente: Indicar si fue víctima o testigo</Text>
          <Text style={styles.sectionText}>- Descripción de la infracción</Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Publicación de las Denuncias</Text>
          <Text style={styles.sectionText}>
            Una vez que el denunciante presenta su queja a través de la aplicación "Tarifa", la información proporcionada pasa por un riguroso proceso de verificación para asegurar que sea válida y precisa. Este proceso incluye la revisión de las evidencias fotográficas, la placa del vehículo, la línea de transporte, y los detalles del incidente.
          </Text>
          <Text style={styles.sectionText}>
            Después de la verificación, la denuncia se publica de manera anónima. Este proceso de publicación no solo garantiza la transparencia, sino que tiene un propósito claro: permitir que el <Text style={styles.bold}>Gobierno Autónomo Municipal de Cochabamba</Text> y las autoridades correspondientes tomen conocimiento directo de los incidentes reportados. Al hacer las denuncias públicas, se facilita el seguimiento y la acción de las autoridades, forzándolas a responder ante la presión social.
          </Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>4. Colaboradores</Text>
          <Text style={styles.sectionText}>
            La aplicación "Tarifa" cuenta con el apoyo de:
          </Text>
          <Text style={styles.sectionText}>
            - <Text style={styles.bold}>Consejo Distrital Nº 9 de OTBs y JJVV de Cochabamba</Text>
          </Text>
          <Text style={styles.sectionText}>
            - <Text style={styles.bold}>Comité Cívico Juvenil del Distrito Nº 9</Text>
          </Text>
          <Text style={styles.sectionText}>
            - <Text style={styles.bold}>Llajtasoft</Text>
          </Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>5. Conclusión</Text>
          <Text style={styles.sectionText}>
            "Tarifa" es una iniciativa ciudadana que busca presionar al <Text style={styles.bold}>Gobierno Autónomo Municipal de Cochabamba</Text> para que haga cumplir la Ley N° 1575/2024. Su éxito depende de la participación activa de la población.
          </Text>
        </View>
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
    fontSize: 26,
    fontWeight: "800",
    color: "#222",
    textAlign: "center",
    marginBottom: 10,
    lineHeight: 32,
  },
  pageDescription: {
    fontSize: 20,

 
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 25,
  },
  sectionContainer: {
    marginBottom: 10,
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,

    shadowColor: "#e4e2e2",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
    paddingBottom: 5,
  },
  sectionText: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
    lineHeight: 26,
  },
  bold: {
    fontWeight: "700",
    color: "#000",
  },
});
