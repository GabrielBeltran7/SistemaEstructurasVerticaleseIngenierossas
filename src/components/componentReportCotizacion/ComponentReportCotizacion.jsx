import React, { useRef, useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";
import moment from "moment";
import Swal from "sweetalert2";
import { getReportCotizaciones, getFilterporFecha } from "../../Redux/Actions";
import style from "./ComponentReportCotizacion.module.css";
import { useNavigate } from "react-router-dom";


const ComponentReportCotizacion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchInput = useRef(null);
  const reportecotizaciones = useSelector((state) => state.reportecotizaciones);
  
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [inputFilter, setInputFilter] = useState({ fechainicio: "", fechafin: "" });

  useEffect(() => {
    dispatch(getReportCotizaciones());
  }, [dispatch]);

  useEffect(() => {
    if (reportecotizaciones) {
      const total = reportecotizaciones.reduce((acc, item) => acc + parseFloat(item.cantidadofrendada || 0), 0);
      setTotalAmount(total);
    }
  }, [reportecotizaciones]);

  useEffect(() => {
    if (reportecotizaciones) {
      reportecotizaciones.forEach((item) => {
        item.createdAt = moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss");
        item.updatedAt = moment(item.updatedAt).format("YYYY-MM-DD HH:mm:ss");
      });
    }
  }, [reportecotizaciones]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const handleFilter = (event) => {
    setInputFilter({ ...inputFilter, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { fechainicio, fechafin } = inputFilter;
    
    if (!fechainicio || !fechafin) {
      return Swal.fire({ icon: 'error', title: 'Debe seleccionar las fechas', timerProgressBar: true, timer: 2000 });
    }
    if (fechafin < fechainicio) {
      return Swal.fire({ icon: 'error', title: 'La Fecha final no puede ser menor a la fecha inicio', timerProgressBar: true, timer: 2000 });
    }
    
    dispatch(getFilterporFecha(inputFilter));
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(reportecotizaciones);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reportes");
    XLSX.writeFile(wb, "reportecotizaciones.xlsx");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Buscar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button type="primary" onClick={() => handleSearch(selectedKeys, confirm, dataIndex)} icon={<SearchOutlined />} size="small" style={{ width: 90 }}>
            Buscar
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Resetear
          </Button>
          <Button type="link" size="small" onClick={() => close()}>
            Cerrar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />,
    onFilter: (value, record) => record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
    render: (text) => searchedColumn === dataIndex ? <Highlighter highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }} searchWords={[searchText]} autoEscape textToHighlight={text ? text.toString() : ""} /> : text,
  });

  const columns = [
    { 
      title: "Nombre Empresa", 
      dataIndex: "CompañiadelCliente", 
      key: "CompañiadelCliente", 
      ...getColumnSearchProps("CompañiadelCliente"),
      onFilter: (value, record) => 
        record.CompañiadelCliente 
          ? record.CompañiadelCliente.toString().toLowerCase().includes(value.toLowerCase()) 
          : false,
      render: (text, record) => (
        <a href={`/AprobarCotizacion/${record.Numerocotizacion}`}>
          {text || "Sin Empresa"}
        </a>
      ),
    },
    
    { title: "Numero Cotizacion", dataIndex: "Numerocotizacion", key: "Numerocotizacion", ...getColumnSearchProps("Numerocotizacion") },
    { title: "Nombre Cliente", dataIndex: "NombredeCliente", key: "NombredeCliente", ...getColumnSearchProps("NombredeCliente") },
    { title: "Celular Cliente", dataIndex: "CelulardelCliente", key: "CelulardelCliente", ...getColumnSearchProps("CelulardelCliente") },
    { title: "Estado", dataIndex: "estado", key: "estado", ...getColumnSearchProps("estado") },
    { title: "Fecha Cotizacion", dataIndex: "date", key: "date", ...getColumnSearchProps("date") },
    { title: "Valor", dataIndex: "monto", key: "monto", render: (text) => <span>$ {text}</span> },
    { title: "Nombre Empleado", dataIndex: "NombreEmpleado", key: "NombreEmpleado", ...getColumnSearchProps("NombreEmpleado") },
  ];

  return (
    <div>
      <div className={style.contenedorbotton}>
        <input type="date" onChange={handleFilter} value={inputFilter.fechainicio} name="fechainicio" required />
        <input type="date" onChange={handleFilter} value={inputFilter.fechafin} name="fechafin" required />
        <button onClick={handleSubmit}>Buscar</button>
        <button onClick={() => dispatch(getReportCotizaciones())}>Actualizar</button>
        <button onClick={exportToExcel}>Exportar a Excel 📁</button>
      </div>
      <div className={style.tableContainer}>
      <Table columns={columns} dataSource={reportecotizaciones}  rowKey="Numerocotizacion"  rowClassName={() => style.rowWhiteBackground} 
/>
      </div>
    </div>
  );
};

export default ComponentReportCotizacion;
