import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Switch from "@material-ui/core/Switch";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import check from "../../../../assets/icon/check1.svg";
//import css
import "react-datepicker/dist/react-datepicker.css";
import { Pagination } from "@material-ui/lab";
import TablePagination from "@material-ui/core/TablePagination";
//import img
import filterImg from "../../../../assets/icon/Filter.svg";
import excel from "../../../../assets/icon/excel.svg";
import search from "../../../../assets/icon/Search2.svg";
import ticketDownload from "../../../../assets/images/ticket-download.svg";
import userpic from "../../../../assets/icon/userpic.svg";
import close from "../../../../assets/icon/close.svg";
import UniversitetBackoffice from "../universitetBackoffice";
import { useSelector } from "react-redux";
import Axios from "../../../../utils/axios";
import Loader from "react-js-loader";
const data_table = require("../json/data_table.json");

const InvoiceReceive = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [filter, setFilter] = useState("");

  const [loading, setLoading] = useState();
  const [students, setStudents] = useState([]);
  const [count, setCount] = useState();

  const [filters, setfilters] = useState(false);

  const [key, setkey] = React.useState("");
  const [invoiceAlert, setInvoiceAlert] = useState(() => new Set());
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  function handleChange(event) {
    setkey(event.target.value);
  }

  const addItem = (item) => {
    setInvoiceAlert((prev) => new Set(prev).add(item));
  };

  const selector = useSelector((state) => state.payload.payload.data);

  const handleClickSave = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Вы уверены что хотите потвердить?",
      showCancelButton: true,
      reverseButtons: true,
      cancelButtonColor: "#E96464",
      cancelButtonText: "Отменить",
      confirmButtonColor: "#00587F",
      confirmButtonText: "Потвердить",
      preConfirm: function (result) {
        return new Promise(function (resolve, reject) {
          if (result) {
            Axios.patch(`applicant/university-check-documents/${id}/`, {
              university_invoice_confirmed: true,
            });
            Swal.fire("Saved!", "", "success")
              .then(function (response) {
                resolve();
              })
              .catch(function (error) {
                error("Error ");
                console.log(error);
                reject();
              });
          }
        });
        fetchInvoice();
      },
    }).then(function (cancelButtonText) {
      return new Promise(function (resolve, reject) {
        if (cancelButtonText) {
          Axios.patch(`applicant/university-check-documents/${id}/`, {
            university_invoice_confirmed: false,
          });
          Swal.fire("Canceled", "", "success")

            .then(function (response) {
              resolve();
            })
            .catch(function (error) {
              error("Error ");
              console.log(error);
              reject();
            });
        }
      });
    });
  };

  const fetchInvoice = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `applicant/list/confirmed/?invoice_status=true`
      );
      const { status, data } = res;
      const { results, count } = data;
      if (status === 200) {
        setStudents(results);
        setCount(count);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const filterApplicants = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `/applicant/list/confirmed/?date-from=${
          startDate ? startDate.toLocaleDateString() : ""
        }&date-to=${
          endDate ? endDate.toLocaleDateString() : ""
        }&payment-status=${filter ? filter.filter : ""}&search=${
          searchName ? searchName : " "
        }`
      );
      const { data, status } = res;
      const { results } = data;
      if (status == 200) {
        setStudents(results);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoice();
  }, []);

  useEffect(() => {
    filterApplicants();
  }, [searchName]);

  return (
    <UniversitetBackoffice>
      <div className="up_nav">
        <div>
          <h1 className="link_h1">Инвойсы {`>`} Принятые</h1>
        </div>
        <div className="user_info">
          <img src={userpic} alt="" />
          <div>
            <h1>{selector?.name} </h1>
            <h2>
              {selector?.city?.name}, {selector?.city?.country.name}
            </h2>
          </div>
        </div>
      </div>
      <div className="invoys">
        <div className="ab_1">
          <div className="excel">
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="download-table-xls-button"
              table="table_excel"
              filename="tablexls"
              sheet="tablexls"
              buttonText="Excel"
            />
          </div>
          <div className="search">
            <div className="input">
              <button>
                <img src={search} alt="" />
              </button>
              <input
                type="text"
                placeholder="Поиск Студенты"
                onChange={(e) => setSearchName(e.target.value)}
              />
            </div>
            <div className="filtr_btn">
              <button
                onClick={() => {
                  setfilters(!filters);
                }}
              >
                <img src={filterImg} alt="" />
              </button>
            </div>
          </div>
          <div className="table">
            <div className="table_up">
              <div>
                <h1>Список ученик</h1>
              </div>
              {/* <div>
                <select name="" id="">
                  <option value="">Показать все</option>
                  <option value="">lorem 1</option>
                  <option value="">lorem 2</option>
                </select>
              </div> */}
            </div>

            <div>
              <table className="" id="table_excel">
                <thead>
                  <th className="px-3">N</th>
                  <th>ФИО</th>
                  <th>Факультет</th>
                  <th>Степень</th>
                  <th>Тип обученияе</th>
                  <th>Контракт</th>
                  <th>Менеджер </th>
                  <th>Телефон менеджера</th>
                  <th>Инвойс</th>
                  <th></th>
                </thead>
                <tbody>
                  {loading ? (
                    <Loader
                      type="spinner-circle"
                      bgColor={"#FFFFFF"}
                      color={"#FFFFFF"}
                      size={80}
                    />
                  ) : (
                    students
                      ?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((data, i) => {
                        if (filters) {
                          return (
                            <tr>
                              <td className="invoice-table">{i + 1}</td>
                              <th>{data?.full_name}</th>
                              <th>{data?.faculty}</th>
                              <th>{data?.degree}</th>
                              {/* <th>{data?.manager}</th> */}
                              <th>
                                {(`${data?.type_education}` == "full_time" &&
                                  "Очный") ||
                                  "Заочный"}
                              </th>
                              <th>$ {data?.education_fee}</th>
                              <th>$ {data?.applicant_invoice_upload}</th>
                              <th>
                                <button className="invoice-btn">
                                  <img src={ticketDownload} alt="" />
                                </button>
                              </th>
                              <th>
                                {data?.manager?.first_name}{" "}
                                {data?.manager?.last_name}
                              </th>
                              <th>{data?.manager?.phone_number}</th>
                            </tr>
                          );
                        } else {
                          return (
                            <tr>
                              {/* <td className="invoice-table">{i + 1}</td> */}
                              <th className="">{i + 1}</th>
                              <th>{data?.full_name}</th>
                              <th>{data?.faculty}</th>
                              <th>{data?.degree}</th>
                              {/* <th>{data?.manager}</th> */}
                              <th>
                                {(`${data?.type_education}` == "full_time" &&
                                  "Очный") ||
                                  "Заочный"}
                              </th>
                              <th>$ {data?.education_fee}</th>
                              <th>
                                {data?.manager?.first_name}{" "}
                                {data?.manager?.last_name}
                              </th>
                              <th>{data?.manager?.phone_number}</th>
                              <th>
                                <a
                                  href={data?.applicant_invoice_upload}
                                  target="_blank"
                                  download
                                  className="invoice-load"
                                >
                                  <img src={ticketDownload} alt="" />
                                </a>
                              </th>

                              <th>
                                {data?.university_invoice_confirmed ? (
                                  <img
                                    src={check}
                                    alt=""
                                    style={{
                                      width: "25px",
                                    }}
                                  />
                                ) : (
                                  <button
                                    className="invoice-save"
                                    onClick={() => handleClickSave(data?.id)}
                                  >
                                    Save
                                  </button>
                                )}
                              </th>
                            </tr>
                          );
                        }
                      })
                  )}
                </tbody>
              </table>
            </div>

            <TablePagination
              rowsPerPageOptions={[5, 10, 15, 20, 30]}
              component="table"
              count={students?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
        {/* // ! */}
        <div
          className="abitFilBox"
          style={
            filters
              ? { width: "100%" }
              : { width: "0", transition: "0.5s step-end" }
          }
        >
          <div className="abitFilCl" onClick={() => setfilters(!filters)}></div>
          <div
            className="ab_2"
            style={
              filters
                ? { transform: "translateX(0)", transition: "0.5s" }
                : { transform: "translateX(100%)", transition: "0.5s" }
            }
          >
            <button
              onClick={() => {
                setfilters(!filters);
              }}
              className="ab_2_close"
            >
              <img src={close} alt="" />
            </button>
            <h1>Фильтры</h1>
            <div className="form_ab">
              <h2>Выберите период</h2>
              <div className="form_div">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  dateFormat="dd MMM yyyy"
                  placeholderText="От"
                />
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  dateFormat="dd MMM yyyy"
                  minDate={startDate}
                  placeholderText="До"
                />
              </div>
            </div>
            {/* <div className="form_ab">
              <h2>Выберите семестр</h2>
              <div className="form_div">
                <select name="" id="">
                  <option value="">Весенний</option>
                  <option value="">Летний</option>
                  <option value="">Осенний</option>
                  <option value="">Зимний</option>
                </select>
              </div>
            </div> */}
            {/* <div className="form_ab">
              <FormControl component="fieldset">
                <FormGroup aria-label="position" className="ab_check" row>
                  <FormControlLabel
                    value="Поступившие"
                    control={<Checkbox color="primary" />}
                    label="Поступившие"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="Непоступившие"
                    control={<Checkbox color="primary" />}
                    label="Непоступившие"
                    labelPlacement="end"
                  />
                </FormGroup>
              </FormControl>
            </div>
            <div className="form_ab">
              <FormControl component="fieldset" className="ab_switch">
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value="show"
                    control={<Switch color="primary" />}
                    label="Показать консультанта"
                    labelPlacement="start"
                  />
                </FormGroup>
              </FormControl>
            </div> */}
            <div className="form_ab">
              <button className="form_button" onClick={filterApplicants}>
                Применить
              </button>
            </div>
          </div>
        </div>
        {/* // ! */}
      </div>
    </UniversitetBackoffice>
  );
};

export default InvoiceReceive;
