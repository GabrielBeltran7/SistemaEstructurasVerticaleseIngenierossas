
import React from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

const ProposalDocument = ({ proposalData }) => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      padding: 20,
      width: "100%",
      height: "100%",
      position: "relative", // Para el pie de página
    },
    imagePage: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: 0,
      width: "100%",
      height: "100%",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "fill",
    },
    imageFirma: {
      width: "32%",
      height: "25%",
    },
    section: {
      marginTop: 20,
      paddingLeft: 20,
      paddingRight: 20,
    },
    text: {
      fontSize: 12,
      marginBottom: 7,
      lineHeight: 2,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      marginTop: 40,
      marginBottom: 7,
    },
    title: {
      fontSize: 14,
      color: "#000",
      fontWeight: "300", // Negrita suave
      marginTop: 15,
      marginBottom: 5,
    },
    textImagenFirma: {
      fontSize: 12,
      marginBottom: 7,
    },
    titleIMagenFirma: {
      fontSize: 14,
      color: "#000",
      fontWeight: "300", // Negrita suave
      marginTop: 2,
      marginBottom: 5,
    },
    encabezadotext: {
      fontSize: 12,
      lineHeight: 1.3,
    },
    footer: {
      position: "absolute",
      bottom: 10,
      left: 20,
      right: 20,
      textAlign: "center",
      fontSize: 10,
      color: "rgba(28, 121, 214, 0.84)", // Azul oscuro con 60% de opacidad
    },
    encabezadoNit: {
      color: "rgba(28, 121, 214, 0.84)", // Azul oscuro con 60% de opacidad
      fontSize: 14,
    },
    container: {
      marginBottom: 20,
    }
  });

  const footer = (
    <View style={styles.footer}>
      <Text>Ingeniero Juan Carlos Rodríguez Castro</Text>
      <Text>ESTRUCTURAS VERTICALES E INGENIEROS SAS</Text>
      <Text>WWW.ESTRUCTURASVERTICALES.COM</Text>
    </View>
  );

  const encabezado = (
    <View style={styles.encabezadoNit}>
      <Text style={styles.encabezadoNit}>
        ESTRUCTURAS VERTICALES E INGENIEROS SAS
      </Text>
      <Text style={styles.encabezadoNit}>NIT 901746624 – 6</Text>
    </View>
  );

  return (
    <Document>
      {/* Primera página solo con la imagen */}
      <Page size="A4" orientation="landscape" style={styles.imagePage}>
        <Image
          style={styles.image}
          src="https://res.cloudinary.com/dby8lelja/image/upload/v1738203636/propuesta%20comercial/Diapositiva1_nfjsfy.png"
        />
      </Page>

      {/* Segunda página en adelante con contenido */}
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.section}>
          {encabezado}

          <View style={styles.row}>
            <Text style={[styles.encabezadotext, { flex: 1 }]}>
              Bogotá D.C: {proposalData.date}
            </Text>
            <Text style={styles.encabezadotext}>
              Cotización: {proposalData.quote}
            </Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.encabezadotext}>Sres./Sras: </Text>
            <Text style={styles.encabezadotext}>{proposalData.clientCompany}</Text>
            <Text style={styles.encabezadotext}>{proposalData.clientName}</Text>
            <Text style={styles.encabezadotext}>{proposalData.clientAddress}</Text>
            <Text style={styles.encabezadotext}>
              {proposalData.clientPhone}
            </Text>
            <Text style={styles.encabezadotext}>
              {proposalData.clientEmail}
            </Text>
            <Text style={styles.encabezadotext}>{proposalData.clientCity}</Text>
          </View>

          <View style={styles.container}>
            <Text>
              <Text style={styles.title}>Ref: </Text>
              <Text style={styles.text}>{proposalData.ref}</Text>
              <Text style={styles.text}></Text>
            </Text>
            <View style={{ marginTop: 12 }}>
              <Text>
                <Text style={styles.title}>OBJETIVO DE LA PROPUESTA: </Text>
                <Text style={styles.text}>{proposalData.objective}</Text>
              </Text>
            </View>
            <View style={{ marginTop: 12 }}>
              <Text>
                <Text style={styles.title}>LUGAR DE EJECUCIÓN:  </Text>
                <Text style={styles.text}>La ejecución de este proyecto se realizara en las instalaciones de </Text>
                <Text style={styles.text}>{proposalData.clientCompany}</Text>
              </Text>
            </View>
          </View>
        </View>

        {footer}
      </Page>

      {/* Más contenido con pie de página */}
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.section}>
          {encabezado}
          <View style={{ marginTop: 40 }}>
            <Text>
              <Text style={styles.title}>
                ACTIVIDADES A DESARROLLAR:{"\n\n"}
              </Text>
              <View style={{ marginTop: 8 }}>
                <Text style={styles.text}>{proposalData.serviceDetails}</Text>
              </View>
            </Text>
            <View style={{ marginTop: 12 }}>
              <Text>
                <Text style={styles.title}>PLAZO DE EJECUCIÓN: </Text>
                <Text style={styles.text}>{proposalData.executionTime}</Text>
              </Text>
            </View>

            <View style={{ marginTop: 12 }}>
              <Text>
                <Text style={styles.title}>VALOR: $ </Text>
                <Text style={styles.text}>{proposalData.amount}</Text>
              </Text>
            </View>
          </View>
        </View>

        {footer}
      </Page>

      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.section}>
          {encabezado}
          <View style={{ marginTop: 40 }}>
            <View style={{ marginTop: 12 }}>
              <Text>
                <Text style={styles.title}>FORMA DE PAGO: </Text>
                <Text style={styles.text}>
                  Un anticipo del 60% del valor total del contrato a la firma
                  del contrato y un pago del 40% contra entrega una vez cumplida
                  las obligaciones derivadas del objeto del contrato y
                  aceptación a satisfacción.
                </Text>
              </Text>
            </View>
            <View style={{ marginTop: 12 }}>
              <Text>
                <Text style={styles.title}>EMPRESA: </Text>
                <Text style={styles.text}>
                Estructuras Verticales e Ingenieros SAS  somo una empresa colombiana especializada en interventoría,
                supervisión de obras y diseño estructural. Ofrece soluciones integrales en montajes estructurales, 
                elaboración de pliegos de condiciones y recepción de zonas comunes en propiedad horizontal.
                 Nuestro equipo garantiza el cumplimiento de de todas las normaa de construccion en colombia, 
                 asegurando calidad y seguridad en cada proyecto. 
                 </Text>
              </Text>
            </View>
            <View style={{ marginTop: 12 }}>
              <Text style={styles.title}>OBLIGACIONES DEL CONTRATANTE: </Text>
              <Text style={styles.text}>
                1. Pagar el valor del contrato en la forma y términos
                establecidos.
              </Text>
              <Text style={styles.text}>
                2. Apoyar en forma permanente al contratista en los aspectos que
                sean de competencia de la Administración.
              </Text>
            </View>
          </View>
        </View>

        {footer}
      </Page>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.section}>
          {encabezado}
          <View style={{ marginTop: 40 }}></View>
          <Text style={styles.title}>COMPROMISOS COMO CONTRATISTAS: </Text>
          <View style={{ marginTop: 5 }}></View>
          <Text style={styles.text}>
            1. Cumplir con el objeto del contrato, conforme a los documentos, la
            propuesta y el contrato que se suscriba.
          </Text>
          <Text style={styles.text}>
            2. Presentar en el plazo establecido, los documentos y cumplir con
            los requisitos de orden técnico, exigidos como condición previa e
            indispensable para suscribir el Acta de Iniciación del Contrato
          </Text>
          <Text style={styles.text}>
            3. Programar las actividades que deba desarrollar para el
            cumplimiento del objeto del contrato.
          </Text>
          <Text style={styles.text}>
            4. Obrar con lealtad y buena fe en las distintas etapas
            contractuales, evitando dilaciones y en trabamientos.
          </Text>
          <Text style={styles.text}>
            5. No acceder a peticiones o amenazas de quienes actúen por fuera de
            la ley con el fin de hacer u omitir algún hecho.
          </Text>
          <View style={{ marginTop: 40 }}>
          <Image
          style={styles.imageFirma}
          src="https://res.cloudinary.com/dby8lelja/image/upload/v1738199547/propuesta%20comercial/FIRMAINGJUANCARLOS_pn2fwg.png"
        />
              <Text style={styles.titleIMagenFirma}>Ing. Juan Carlos Rodríguez Castro</Text>
              <Text style={styles.textImagenFirma}>
                Mat 25202-265787
              </Text> 
            </View>
        </View>

        {footer}
      </Page>

      {/* Páginas adicionales con imágenes SIN pie de página */}
      
      <Page size="A4" orientation="landscape" style={styles.imagePage}>
        <Image
          style={styles.image}
          src="https://res.cloudinary.com/dby8lelja/image/upload/v1738203649/propuesta%20comercial/Diapositiva2_dk4fjq.png"
        />
      </Page>
      <Page size="A4" orientation="landscape" style={styles.imagePage}>
        <Image
          style={styles.image}
          src="https://res.cloudinary.com/dby8lelja/image/upload/v1738203650/propuesta%20comercial/Diapositiva3_gpxon7.png"
        />
      </Page>
      <Page size="A4" orientation="landscape" style={styles.imagePage}>
        <Image
          style={styles.image}
          src="https://res.cloudinary.com/dby8lelja/image/upload/v1738203651/propuesta%20comercial/Diapositiva4_t0jg5m.png"
        />
      </Page>
      <Page size="A4" orientation="landscape" style={styles.imagePage}>
        <Image
          style={styles.image}
          src="https://res.cloudinary.com/dby8lelja/image/upload/v1738203652/propuesta%20comercial/Diapositiva5_var5s3.png"
        />
      </Page>
      <Page size="A4" orientation="landscape" style={styles.imagePage}>
        <Image
          style={styles.image}
          src="https://res.cloudinary.com/dby8lelja/image/upload/v1738203653/propuesta%20comercial/Diapositiva6_zyceez.png"
        />
      </Page>
      <Page size="A4" orientation="landscape" style={styles.imagePage}>
        <Image
          style={styles.image}
          src="https://res.cloudinary.com/dby8lelja/image/upload/v1738203654/propuesta%20comercial/Diapositiva7_nehuwl.png"
        />
      </Page>
      <Page size="A4" orientation="landscape" style={styles.imagePage}>
        <Image
          style={styles.image}
          src="https://res.cloudinary.com/dby8lelja/image/upload/v1738203655/propuesta%20comercial/Diapositiva8_gxkbm2.png"
        />
      </Page>
    </Document>
  );
};
const handleReload = () => {
  window.location.reload();  // Recarga la página
};
const GenerateProposal = ({ proposalData }) => {
  return (
    <>
    <div className="flex justify-center items-center py-4">
      <PDFDownloadLink
        document={<ProposalDocument proposalData={proposalData} />}
        fileName="Propuesta_Comercial.pdf"
      >
        {({ loading }) => (loading ? "Generando PDF..." : "Descargar PDF")}
      </PDFDownloadLink>
      
    </div>
    <button onClick={handleReload} >
        Actualizar Página
      </button>
    </>
  );
};

export default GenerateProposal;

