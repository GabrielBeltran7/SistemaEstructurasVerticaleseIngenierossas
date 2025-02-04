

import React, { useState } from "react";
import styles from "./componentRecoverPassword.module.css";
import BackButton from "../backButton/backButton";
import { FaEnvelope } from "react-icons/fa";
import Swal from "sweetalert2";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../api/firebase/FirebaseConfig/FirebaseConfig";

const componentRecoverPassword = () => {
  const [input, setInput] = useState({
    email: ""
  });

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleRecoverPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, input.email);
      Swal.fire({
        icon: 'success',
        title: 'Correo enviado con éxito.',
        timerProgressBar: true,
        timer: 2500,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al enviar el correo',
        text: 'Intenta nuevamente.',
        confirmButtonColor: '#d33',
        timer: 5000,
      });
    }
  };

  return (
    <>
      <div className={styles.bodyContainer}>
        <BackButton />
      </div>
      <div className={styles.container}>
        <label className={styles.labelTitle}>Recuperar Contraseña</label>
        <form className={styles.form} onSubmit={handleRecoverPassword}>
          <div className={styles.inputContainer}>
            <FaEnvelope className={styles.icon} />
            <input
              name="email"
              placeholder="Digita tu correo"
              type="email"
              value={input.email}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            Recuperar
          </button>
        </form>
      </div>
    </>
  );
};

export default componentRecoverPassword;




// import React, { useState } from "react";
// import styles from "./componentRecoverPassword.module.css";
// import BackButton from "../backButton/backButton";
// import { FaEnvelope } from "react-icons/fa";
// import Swal from "sweetalert2";
// import { sendPasswordResetEmail } from "firebase/auth";
// import { auth } from "../../../api/firebase/FirebaseConfig/FirebaseConfig";

// const componentRecoverPassword = () => {
//   const [input, setInput] = useState({
//     email: ""
//   });

//   const handleInputChange = (e) => {
//     setInput({
//       ...input,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleRecoverPassword = async (e) => {
//     e.preventDefault();
//     try {
//       await sendPasswordResetEmail(auth, input.email);
//       Swal.fire({
//         icon: 'success',
//         title: 'Correo enviado con éxito.',
//         timerProgressBar: true,
//         timer: 2500,
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error al enviar el correo',
//         text: 'Intenta nuevamente.',
//         confirmButtonColor: '#d33',
//         timer: 5000,
//       });
//     }
//   };

//   return (
//     <>
//       <div className={styles.buttonBack}>
//         <BackButton />
//       </div>
//       <div className={styles.container}>
//         <label className={styles.labelTitle}>Recuperar Contraseña</label>
//         <form className={styles.form} onSubmit={handleRecoverPassword}>
//           <div className={styles.inputContainer}>
//             <FaEnvelope className={styles.icon} />
//             <input
//               name="email"
//               placeholder="Digita tu correo"
//               type="email"
//               value={input.email}
//               onChange={handleInputChange}
//               className={styles.input}
//               required
//             />
//           </div>
//           <button type="submit" className={styles.button}>
//             Recuperar
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default componentRecoverPassword;


