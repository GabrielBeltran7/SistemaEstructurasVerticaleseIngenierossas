import React, { useRef, useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";
import moment from "moment";
import { getUserProfile, apdateRoluser, apdateStateUser, UpdateUserChangeState } from "../../Redux/Actions"; 
import style from "./userAdmin.module.css";
import { useNavigate } from "react-router-dom";

const ReportAllUsers = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [permissions, setPermissions] = useState({}); 
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [estado, setEstado] = useState({}); 
  const allUsers = useSelector((state) => state.allUsers);

  const dispatch = useDispatch();

  if (allUsers) {
    allUsers.forEach((user) => {
      user.createdAt = moment(user.createdAt).format("YYYY-MM-DD HH:mm:ss");
      user.updatedAt = moment(user.updatedAt).format("YYYY-MM-DD HH:mm:ss");
    });
  }

  const handleUserChangeState = (userId, value) => {
    setEstado({
      id: userId,
      estado: value
    });
    dispatch(UpdateUserChangeState({ id: userId, estado: value }));
  };

  const handlePermissionChange = (userId, value) => {
    setPermissions({ id: userId, rol: value });
    dispatch(apdateRoluser({ id: userId, rol: value }));
  };

  const handleUserChange = (userId, value) => {
    setUser({ id: userId, rol: value });
    dispatch(apdateStateUser({ id: userId, user: value }));
  };

  useEffect(() => {
    dispatch(getUserProfile());
  }, [permissions, user, estado]);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(allUsers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "User");
    XLSX.writeFile(wb, "users.xlsx");
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{ padding: 8 }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => { close(); }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      (record[dataIndex] &&
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())) ||
      false,
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    { title: "Nombre", dataIndex: "nombre", key: "nombre", ...getColumnSearchProps("nombre"), render: (text, record) => (<a href={`/componentUpdateUserAdmin/${record.id}`}>{text}</a>) },
    { title: "Apellido", dataIndex: "apellidos", key: "apellidos", ...getColumnSearchProps("apellidos") },
    { title: "Telefono", dataIndex: "telefono", key: "telefono", ...getColumnSearchProps("telefono") },
    { title: "Direccion", dataIndex: "direccion", key: "direccion", ...getColumnSearchProps("direccion") },
    { title: "Ciudad", dataIndex: "ciudad", key: "ciudad", ...getColumnSearchProps("ciudad") },
    { title: "Departamento", dataIndex: "departamento", key: "departamento", ...getColumnSearchProps("departamento") },
    { title: "Titulo Academico", dataIndex: "educacion", key: "educacion", ...getColumnSearchProps("educacion") },
    { title: "N° Targeta Proesional", dataIndex: "numerotarjetaprofesional", key: "numerotarjetaprofesional", ...getColumnSearchProps("numerotarjetaprofesional") },
    { title: "Cargo", dataIndex: "cargo", key: "cargo", ...getColumnSearchProps("cargo") },
    { title: "Fecha Afiliacion", dataIndex: "fechaAfiliacion", key: "fechaAfiliacion", ...getColumnSearchProps("fechaAfiliacion") },
    { title: "Fecha Nacimiento", dataIndex: "fechaNacimiento", key: "fechaNacimiento", ...getColumnSearchProps("fechaNacimiento") },
    { title: "Rol", dataIndex: "rol", key: "rol", render: (text, record) => (
        <select
          name="rol"
          value={permissions[record.id] || ""}
          onChange={(e) => handlePermissionChange(record.id, e.target.value)}
        >
          <option value="">{record.rol}</option>
          <option value="Administrador">Administrador</option>
          <option value="Usuario">Usuario</option>
        </select>
      ),
    },
    { title: "Eliminar Usuarios", dataIndex: "user", key: "user", render: (text, record) => (
        <select
          name="user"
          value={permissions[record.id] || ""}
          onChange={(e) => handleUserChange(record.id, e.target.value)}
        >
          <option value="">{record.user}</option>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      ),
    },
    { title: "Estado", dataIndex: "estado", key: "estado", render: (text, record) => (
        <select
          name="estado"
          value={permissions[record.id] || ""}
          onChange={(e) => handleUserChangeState(record.id, e.target.value)}
        >
          <option value="">{record.estado}</option>
          <option value="Desabilitado">Desabilitado</option>
          <option value="Habilitado">Habilitado</option>
        </select>
      ),
    },
  ];

  return (
    <div>
      <div className={style.contenedorbotton}>
        <div className={style.botonexcel}>
          <button onClick={exportToExcel}>Exportar a excel 📑</button>
        </div>
      </div>
      <div className={style.tableContainer}>
        <Table columns={columns} dataSource={allUsers} rowClassName={() => style.rowWhiteBackground} />
      </div>
      <div>
        <div className={style.containerAviso}></div>
      </div>
    </div>
  );
};

export default ReportAllUsers;

