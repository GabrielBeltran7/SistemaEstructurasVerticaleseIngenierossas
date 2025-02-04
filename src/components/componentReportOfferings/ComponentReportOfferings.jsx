import React, { useRef, useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";
import moment from "moment";
import Swal from "sweetalert2";
import { getReportOffering, getFilterporFecha } from "../../Redux/Actions";
import style from "./ComponentReportOfferings.module.css";
import { useNavigate } from "react-router-dom";

const ComponentReportOfferings = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const searchInput = useRef(null);
  const navigate = useNavigate();
  const offering = useSelector((state) => state.allOffering);

  const [inputfilter, setInputFilter] = useState({
    fechainicio: "",
    fechafin: ""
  });
const handleSubmit =(event)=>{
  if(inputfilter.fechainicio ==="" || inputfilter.fechafin===""){
    Swal.fire({
      icon: 'error',
      title: 'Debe seleccionar las fechas',
      timerProgressBar: true,
      timer: 2000,
    });
    return
  }if(inputfilter.fechafin<inputfilter.fechainicio){
    Swal.fire({
      icon: 'error',
      title: 'La Fecha final no puede ser menor a la fecha inicio',
      timerProgressBar: true,
      timer: 2000,
    });
    return
  }
  event.preventDefault()
  
 dispatch(getFilterporFecha(inputfilter))
}
  useEffect(() => {
    if (offering) {
      const total = offering.reduce(
        (acc, item) => acc + parseFloat(item.cantidadofrendada || 0),
        0
      );
      setTotalAmount(total);
    }
  }, [offering]);

  if (offering) {
    offering.forEach((offering) => {
      offering.createdAt = moment(offering.createdAt).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      offering.updatedAt = moment(offering.updatedAt).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    });
  }

  const dispatch = useDispatch();

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(offering);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "offering");
    XLSX.writeFile(wb, "offering.xlsx");
  };

  useEffect(() => {
    dispatch(getReportOffering());
  }, [dispatch]);

  const HandleUpdate =(event)=>{
    event.preventDefault()
    dispatch(getReportOffering());
  }
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const navigateOfferingsAnonimo = () => {
    navigate("/registerofferinganonimo");
  };

  const handleFilter = (event) => {
    setInputFilter({
      ...inputfilter,
      [event.target.name]: event.target.value
    });
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
        style={{
          padding: 8,
        }}
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
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      (record[dataIndex] &&
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase())) ||
      false,
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      ...getColumnSearchProps("nombre"),
      render: (text, record) =>
        text === "Anonimo" ? (
          <span>{text}</span>
        ) : (
          <a href={`/registeroffering/${record.iduser}`}>{text}</a>
        ),
    },
    {
      title: "Apellido",
      dataIndex: "apellidos",
      key: "apellidos",
      ...getColumnSearchProps("apellidos"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Fecha de Ofrenda",
      dataIndex: "fechadeofrenda",
      key: "fechadeofrenda",
      ...getColumnSearchProps("fechadeofrenda"),
    },
    {
      title: "Tipo de Ofrenda",
      dataIndex: "tipodeofrenda",
      key: "tipodeofrenda",
      ...getColumnSearchProps("tipodeofrenda"),
    },
    {
      title: "Cantidad Ofrendada",
      dataIndex: "cantidadofrendada",
      key: "cantidadofrendada",
      ...getColumnSearchProps("cantidadofrendada"),
      render: (text) => <span>$ {text}</span>,
    },
  ];

  return (
    <div>
      <div className={style.contenedorbotton}>
         <div className={style.botonexcel}>
          <label >Desde</label>
          <input
            type="date"
            onChange={handleFilter}
            value={inputfilter.fechainicio}
            name="fechainicio"
            required
          />
        </div>
        <div className={style.botonexcel}>
        <label >Hasta</label>
          <input
            type="date"
            onChange={handleFilter}
            value={inputfilter.fechafin}
            name="fechafin"
            required
          />
        </div>
        
        <div className={style.botonexcel}>
          <button onClick={handleSubmit}>Buscar</button>
        </div>
        <div className={style.botonexcel}>
          <button onClick={HandleUpdate}>Actualizar</button>
        </div>
        <div className={style.botonexcel}>
          <button onClick={navigateOfferingsAnonimo}>Ofrenda anónima</button>
        </div>
        <div className={style.botonexcel}>
          <button onClick={exportToExcel}>Exportar a Excel 📑</button>
        </div>
      </div>

      <Table columns={columns} dataSource={offering} />
      <div>
        <Typography.Title level={4}>
          Total Ofrendas: $ {totalAmount.toFixed(2)}
        </Typography.Title>
      </div>
      <div>
        <div className={style.containerAviso}></div>
      </div>
    </div>
  );
};

export default ComponentReportOfferings;
