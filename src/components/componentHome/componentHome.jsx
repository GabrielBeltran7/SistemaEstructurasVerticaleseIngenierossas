import React from "react"; 
import { motion } from "framer-motion";
import { FaHardHat, FaBuilding, FaUsers } from "react-icons/fa";
import styles from "./ComponentHome.module.css";

function ComponentHome() {
  return (
    <div className={styles.container}>
      {/* Hero */}
      <main className={styles.hero}>
        <motion.div
          className={styles.icon}
          animate={{ 
            y: [-10, 10, -10], 
            rotate: [0, 180, 0], 
            scaleX: [1, 1.1, 1] 
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <FaHardHat size={60} color="#ff6600" />
        </motion.div>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          ¡Bienvenido a Estructuras Verticales 
          e Ingenieros SAS 🏗️!
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Juntos construimos el futuro con dedicación y excelencia.
        </motion.p>
      </main>

      {/* Características */}
      <section className={styles.features}>
        {/* Proyectos Sólidos */}
        <motion.div className={styles.feature} whileHover={{ scale: 1.1 }}>
          <FaBuilding size={50} color="#ffcc00" />
          <h3>Proyectos Sólidos</h3>
          <p>Construimos con materiales de alta calidad y diseños innovadores.</p>
        </motion.div>

        {/* Seguridad en el Trabajo */}
        <motion.div className={styles.feature} whileHover={{ scale: 1.1 }}>
          <FaHardHat size={50} color="#ff6600" />
          <h3>Seguridad en el Trabajo</h3>
          <p>Garantizamos ambientes seguros con protocolos estrictos.</p>
        </motion.div>

        {/* Innovación y Tecnología */}
        <motion.div className={styles.feature} whileHover={{ scale: 1.1 }}>
          <FaUsers size={50} color="#00ccff" />
          <h3>Innovación y Tecnología</h3>
          <p>Implementamos tecnología avanzada en cada proyecto.</p>
        </motion.div>

        {/* Compromiso con el Cliente */}
        <motion.div className={styles.feature} whileHover={{ scale: 1.1 }}>
          <FaUsers size={50} color="#00ff66" />
          <h3>Compromiso con el Cliente</h3>
          <p>Escuchamos y trabajamos de la mano con nuestros clientes.</p>
        </motion.div>
      </section>
    </div>
  );
}

export default ComponentHome;




// import React from "react"; 
// import { motion } from "framer-motion";
// import { FaHardHat, FaBuilding, FaUsers } from "react-icons/fa";
// import styles from "./ComponentHome.module.css";

// function ComponentHome() {
//   return (
//     <div className={styles.container}>
//       {/* Hero */}
//       <main className={styles.hero}>
//         <motion.div
//           className={styles.icon}
//           animate={{ 
//             y: [-10, 10, -10], 
//             rotate: [0, 180, 0], 
//             scaleX: [1, 1.1, 1] 
//           }}
//           transition={{ 
//             duration: 10, 
//             repeat: Infinity, 
//             ease: "easeInOut" 
//           }}
//         >
//           <FaHardHat size={60} color="#ff6600" />
//         </motion.div>

//         <motion.h1
//           className={styles.title}
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           ¡Bienvenido a Estructuras Verticales 
//           e Ingenieros SAS 🏗️!
//         </motion.h1>
        

//         <motion.p
//           className={styles.subtitle}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5, duration: 1 }}
//         >
//           Juntos construimos el futuro con dedicación y excelencia.
//         </motion.p>

       
//       </main>

//       {/* Características */}
//       <section className={styles.features}>
//   {/* Proyectos Sólidos */}
//   <motion.div className={styles.feature} whileHover={{ scale: 1.1 }}>
//     <FaBuilding size={50} color="#ffcc00" />
//     <h3>Proyectos Sólidos</h3>
//     <p>Construimos con materiales de alta calidad y diseños innovadores.</p>
//   </motion.div>

//   {/* Seguridad en el Trabajo */}
//   <motion.div className={styles.feature} whileHover={{ scale: 1.1 }}>
//     <FaHardHat size={50} color="#ff6600" />
//     <h3>Seguridad en el Trabajo</h3>
//     <p>Garantizamos ambientes seguros con protocolos estrictos.</p>
//   </motion.div>

//   {/* Innovación y Tecnología */}
//   <motion.div className={styles.feature} whileHover={{ scale: 1.1 }}>
//     <FaUsers size={50} color="#00ccff" />
//     <h3>Innovación y Tecnología</h3>
//     <p>Implementamos tecnología avanzada en cada proyecto.</p>
//   </motion.div>

//   {/* Compromiso con el Cliente */}
//   <motion.div className={styles.feature} whileHover={{ scale: 1.1 }}>
//     <FaUsers size={50} color="#00ff66" />
//     <h3>Compromiso con el Cliente</h3>
//     <p>Escuchamos y trabajamos de la mano con nuestros clientes.</p>
//   </motion.div>
// </section>

//     </div>
//   );
// }

// export default ComponentHome;






