import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DollarOutlined,
  UserAddOutlined
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import style from "./HomeAdmin.module.css";

import ReportAllUsers from "../../components/userAdmin/userAdmin";

import { useDispatch } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import ComponentReportOfferings from "../../components/componentReportOfferings/ComponentReportOfferings";
const { Header, Sider, Content } = Layout;
import BackButton from "../../components/backButton/backButton";
const HomeAdmin = () => {
  const { username } = useParams();
  const dispatch = useDispatch();



  const [collapsed, setCollapsed] = useState(false);

  
  const {
    token: { colorBgContainer },
  } = theme.useToken();


  const [selectedItem, setSelectedItem] = useState("1");

 
  const handleMenuItemClick = (key) => {
    setSelectedItem(key);
  };

  
  const renderSelectedComponent = () => {
    switch (selectedItem) {
      case "1":
        return < ComponentReportOfferings />;
        
        case "2":
          return < ReportAllUsers/>;
      
      default:
        return null;
    }
  };

  const navigate = useNavigate();

  const handlehomeSubAdmin = () => {
    navigate("/home");
  };

  return (
    <div className={style.container}>
      <div className={style.button}>
      <BackButton></BackButton>
      </div>
    <Layout >
        <Sider style={{ background: "rgba(192, 100, 209, 0.835)" }}trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu style={{ background: "rgba(192, 100, 209, 0.835)" }}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            onClick={({ key }) => handleMenuItemClick(key)}
            items={[
              {
                key: "1",
                icon: <UserAddOutlined />,
                label: "Ofrendas",
              },
              {
                key: "2",
                icon: <DollarOutlined />,
                label: "Usuarios",
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
          </Header>
          <Content
            style={{
              margin: "10px 10px",
              padding: 24,
              minHeight: "91.1vh",
              background:colorBgContainer,
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
