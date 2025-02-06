import "./App.css";
import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom";
import Home from "./views/home/home.jsx";
import Login from "./views/login/login.jsx";
import Register from "./views/register/register.jsx";
import RecoverPassword from "./views/recoverPassword/recoverPassword.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ComponentProfile from "./components/componentProfile/ComponentProfile.jsx";
import HomeAdmin from "./views/HomeAdmin/HomeAdmin.jsx";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../api/firebase/FirebaseConfig/FirebaseConfig.js";
import { useEffect, useState } from "react";
import { getUserProfileByEmail, getUserProfile } from "./Redux/Actions.js";
import { onAuthStateChanged } from "firebase/auth";
import ComponentRegisterSocio from "./components/componentregisterProfile/ComponentRegisterSocio.jsx";
import ComponentUpdateUserAdmin from "./components/componentUpdateUserAdmin/componentUpdateUserAdmin.jsx";
import GenerateProposal from "./components/GenerateProposal/GenerateProposal.jsx";
import CotizacionForm from "./components/Cotizacion/CotizacionForm.jsx";
import AprobarCotizacionForm from "./components/AprobarCotizacion/AprobarCotizacionForm.jsx";

function App() {
  const dispatch = useDispatch();
  const userByemail = useSelector((state) => state.UserProfileByEmail);
  const [userEmail, setUserEmail] = useState("");
  const [proposalData, setProposalData] = useState(null);



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        setUserEmail(user.email);
        dispatch(getUserProfileByEmail(user.email));
        dispatch(getUserProfile(user.email));
      } else {
        setUserEmail("");
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (userByemail.user === "Inactivo") {
    return (
      <div
        style={{
          padding: "2rem",
          fontSize: "2rem",
          textAlign: "center",
          color: "white",
        }}
      >
        <h1>Usuario Inactivo</h1>
        <p>Comunícate con el administrador para más información.</p>
      </div>
    );
  }

  return (
    <Router>
      <>
        <div>
          <Navbar />
        </div>

        {/* Resto de las rutas */}
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/registersocio" element={<ComponentRegisterSocio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/componentUpdateUserAdmin/:id" element={<ComponentUpdateUserAdmin />} />
         
          
          <Route path="/profile" element={<ComponentProfile />} />
          <Route path="/passwordrecover" element={<RecoverPassword />} />
          {/* Ruta protegida para HomeAdmin */}
          <Route
            path="/homeadmin"
            element={userByemail.rol === "Administrador" ? <HomeAdmin /> : <Navigate to="/" />}
          />
             <Route
              path="/cotizacion"
              element={userByemail?.estado === "Habilitado" ? <CotizacionForm /> : <Home />}
              />


               <Route path="/AprobarCotizacion/:id"
                element={userByemail.rol === "Administrador" ? <AprobarCotizacionForm /> :<Home />} />
              <Route
              path="/generarpdf"
              element={
              userByemail?.rol === "Administrador" ? <GenerateProposal /> : <Home />
                }
/>
        </Routes>
        

        <Footer />
      </>
    </Router>
  );
}

export default App;
