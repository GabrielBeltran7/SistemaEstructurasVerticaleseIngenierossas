import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import styles from "./Navbar.module.css";
import { auth } from "../../../api/firebase/FirebaseConfig/FirebaseConfig";
import { RESET_STATE } from "../../Redux/ActionsTypes";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, getUserProfileByEmail } from "../../Redux/Actions";


const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userByemail = useSelector((state) => state.UserProfileByEmail);


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dateUser = auth.currentUser;
  const userEmail = dateUser?.email ?? "";

  useEffect(() => {
    dispatch(getUserProfile());
  }, [userEmail]);

  useEffect(() => {
    dispatch(getUserProfileByEmail(userEmail));
  }, [userEmail]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      dispatch({
        type: RESET_STATE,
      });
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <div className={styles.navcontainer}>
      <div className={styles.iconosizquierda}>
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dnigz3zfp/image/upload/v1738353009/logo_jpg_virb2d.png"
            alt="logoiglesiacatolica"
          />
        </Link>
        <div className={styles.NombreEmpresa}>
          Estructuras Verticales e Ingenieros SAS
        </div>
      </div>
      <div
        className={`${styles.menuicono} ${showMenu ? styles.active : ""}`}
        onClick={toggleMenu}
      >
        <FaBars />
      </div>
      <div
        className={`${styles.linkcontainer} ${showMenu ? styles.active : ""}`}
      >
        <Link to="/" onClick={closeMenu}>
          Inicio
        </Link>

        {!userEmail ? ( // Mostrar "Regístrate" solo si el usuario NO está logueado
          <Link to="/register" onClick={closeMenu}>
            Regístrate
          </Link>
        ) : null} {/* No mostrar "Regístrate" si el usuario está logueado */}


        {userEmail && userByemail.rol === "Administrador" ? (
          <Link
            to="/homeadmin"
            onClick={closeMenu}
          >
            Administrador
          </Link>
        ) : null} {/* No mostrar "Administrador" si no es admin o no está logueado */}

        {userEmail ? (
          <Link to="/profile" onClick={closeMenu}>
            Perfil
          </Link>
        ) : null} {/* No mostrar "Perfil" si no está logueado */}


{userEmail && userByemail.estado === "Habilitado" ? (
  <Link to="/cotizacion" onClick={closeMenu}>
    Cotización
  </Link>
) : null}


        {!userEmail ? (
          <Link to="/login" onClick={closeMenu}>
            Inicia Sesión
          </Link>
        ) : (
          <Link
            to="/"
            onClick={() => {
              closeMenu();
              handleLogout();
            }}
          >
            Cerrar Sesión
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
