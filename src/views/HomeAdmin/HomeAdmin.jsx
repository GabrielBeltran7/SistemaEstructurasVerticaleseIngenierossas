import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DollarOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import style from "./HomeAdmin.module.css";

import ReportAllUsers from "../../components/userAdmin/userAdmin";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ComponentReportOfferings from "../../components/componentReportCotizacion/ComponentReportCotizacion";


const { Header, Sider, Content } = Layout;

const HomeAdmin = () => {
  const { username } = useParams();
  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [selectedItem, setSelectedItem] = useState("1");

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setCollapsed(window.innerWidth <= 768); // Mantén el menú colapsado en móviles
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMenuItemClick = (key) => {
    setSelectedItem(key);
  };

  const renderSelectedComponent = () => {
    switch (selectedItem) {
      case "1":
        return <ComponentReportOfferings />;
      case "2":
        return <ReportAllUsers />;
      default:
        return null;
    }
  };

  return (
    <div className={style.container}>
      <div className={style.button}>
       
      </div>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          trigger={null}
          style={{ background: "#2c3e50" }}
          width={collapsed ? 80 : 200}  // Cambiar el ancho según el estado del colapso
          collapsedWidth={50} // Ancho cuando está colapsado
        >
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            onClick={({ key }) => handleMenuItemClick(key)}
            style={{ background: "#2c3e50" }}
            items={[
              {
                key: "1",
                icon: <DollarOutlined />,
                label: collapsed ? "Cotizacion" : "Cotizacion",  // Muestra el texto solo cuando no está colapsado
              },
              {
                key: "2",
                icon: <UserAddOutlined />,
                label: collapsed ? "Usuarios" : "Usuarios",  // Muestra el texto solo cuando no está colapsado
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            {!isMobile && (
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
            )}
          </Header>
          <Content
            style={{
              margin: "10px 10px",
              padding: 24,
              minHeight: "91.1vh",
              background: colorBgContainer,
            }}
          >
            {renderSelectedComponent()}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default HomeAdmin;





// import React, { useState, useEffect } from "react";
// import {
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   DollarOutlined,
//   UserAddOutlined,
// } from "@ant-design/icons";
// import { Layout, Menu, Button, theme } from "antd";
// import style from "./HomeAdmin.module.css";

// import ReportAllUsers from "../../components/userAdmin/userAdmin";
// import { useDispatch } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import ComponentReportOfferings from "../../components/componentReportCotizacion/ComponentReportCotizacion";
// import BackButton from "../../components/backButton/backButton";

// const { Header, Sider, Content } = Layout;

// const HomeAdmin = () => {
//   const { username } = useParams();
//   const dispatch = useDispatch();

//   const [collapsed, setCollapsed] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();
//   const [selectedItem, setSelectedItem] = useState("1");

//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//       setCollapsed(window.innerWidth <= 768); // Mantén el menú colapsado en móviles
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleMenuItemClick = (key) => {
//     setSelectedItem(key);
//   };

//   const renderSelectedComponent = () => {
//     switch (selectedItem) {
//       case "1":
//         return <ComponentReportOfferings />;
//       case "2":
//         return <ReportAllUsers />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className={style.container}>
//       <div className={style.button}>
//         <BackButton />
//       </div>
//       <Layout>
//       <Sider
//   collapsible
//   collapsed={collapsed}
//   trigger={null}
//   style={{ background: "#9c3e50", width: collapsed ? 80 : 200 }} // Cambiar el ancho según el estado del colapso
// >

// <Menu
//   style={{
//     background: "#2c9e20",
//     width: collapsed ? "50px" : "20px", // Reducir el ancho cuando el menú está colapsado
//   }}
//   theme="dark"
//   mode="inline"
//   defaultSelectedKeys={["1"]}
//   onClick={({ key }) => handleMenuItemClick(key)}
//   items={[
//     {
//       key: "1",
//       icon: <DollarOutlined />,
//       label: collapsed ? "Cotizacion" : "Cotizacion",
//     },
//     {
//       key: "2",
//       icon: <UserAddOutlined />,
//       label: collapsed ? "Usuarios" : "Usuarios",
//     },
//   ]}
// />




//         </Sider>
//         <Layout>
//           <Header
//             style={{
//               padding: 0,
//               background: colorBgContainer,
//             }}
//           >
//             {!isMobile && (
//               <Button
//                 type="text"
//                 icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//                 onClick={() => setCollapsed(!collapsed)}
//                 style={{
//                   fontSize: "16px",
//                   width: 64,
//                   height: 64,
//                 }}
//               />
//             )}
//           </Header>
//           <Content
//             style={{
//               margin: "10px 10px",
//               padding: 24,
//               minHeight: "91.1vh",
//               background: colorBgContainer,
//             }}
//           >
//             {renderSelectedComponent()}
//           </Content>
//         </Layout>
//       </Layout>
//     </div>
//   );
// };

// export default HomeAdmin;

// import React, { useState, useEffect } from "react";
// import {
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   DollarOutlined,
//   UserAddOutlined,
// } from "@ant-design/icons";
// import { Layout, Menu, Button, theme } from "antd";
// import style from "./HomeAdmin.module.css";

// import ReportAllUsers from "../../components/userAdmin/userAdmin";
// import { useDispatch } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import ComponentReportOfferings from "../../components/componentReportCotizacion/ComponentReportCotizacion";
// import BackButton from "../../components/backButton/backButton";

// const { Header, Sider, Content } = Layout;

// const HomeAdmin = () => {
//   const { username } = useParams();
//   const dispatch = useDispatch();

//   const [collapsed, setCollapsed] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();
//   const [selectedItem, setSelectedItem] = useState("1");

//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//       setCollapsed(window.innerWidth <= 768); // Mantén el menú colapsado en móviles
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleMenuItemClick = (key) => {
//     setSelectedItem(key);
//   };

//   const renderSelectedComponent = () => {
//     switch (selectedItem) {
//       case "1":
//         return <ComponentReportOfferings />;
//       case "2":
//         return <ReportAllUsers />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className={style.container}>
//       <div className={style.button}>
//         <BackButton />
//       </div>
//       <Layout>
//         <Sider
//           collapsible
//           collapsed={collapsed}
//           trigger={null}
//           style={{ background: "#2c3e50" }}
//         >
//           <Menu
//             style={{ background: "#2c3e50" }}
//             theme="dark"
//             mode="inline"
//             defaultSelectedKeys={["1"]}
//             onClick={({ key }) => handleMenuItemClick(key)}
//             items={[
//               {
//                 key: "1",
//                 icon: <DollarOutlined />,
//                 label: collapsed ? "Cotizacion" : "Cotizacion",
//               },
//               {
//                 key: "2",
//                 icon: <UserAddOutlined />,
//                 label: collapsed ? "Cotizacion" : "Usuarios",
//               },
//             ]}
//           />
//         </Sider>
//         <Layout>
//           <Header
//             style={{
//               padding: 0,
//               background: colorBgContainer,
//             }}
//           >
//             {!isMobile && (
//               <Button
//                 type="text"
//                 icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//                 onClick={() => setCollapsed(!collapsed)}
//                 style={{
//                   fontSize: "16px",
//                   width: 64,
//                   height: 64,
//                 }}
//               />
//             )}
//           </Header>
//           <Content
//             style={{
//               margin: "10px 10px",
//               padding: 24,
//               minHeight: "91.1vh",
//               background: colorBgContainer,
//             }}
//           >
//             {renderSelectedComponent()}
//           </Content>
//         </Layout>
//       </Layout>
//     </div>
//   );
// };

// export default HomeAdmin;


