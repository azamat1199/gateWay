import React, { useState, useEffect } from "react";
import ManegerSidebar from "../ManagerSidebar";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import Axios from "../../../utils/axios";
import DatePicker from "react-datepicker";

import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Loader from "react-js-loader";
import userpic from "../../../assets/icon/userpic.svg";
import filter from "../../../assets/icon/Filter.svg";
import search from "../../../assets/icon/Search2.svg";
import close from "../../../assets/icon/close.svg";
import { useSelector } from "react-redux";
import { Pagination } from "@material-ui/lab";
import TablePagination from "@material-ui/core/TablePagination";

const StatusAbiturent = () => {
  const selector = useSelector((state) => state?.payload?.payload?.data);
  const history = useHistory();
  const [filterCountry, setFilterCountry] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [document, setDocument] = useState([]);
  const [filters, setfilters] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [radioFilter, setRadioFilter] = useState("");
  const [confirmFilter, setConfirmFilter] = useState("");

  const [searchName, setSearchName] = useState();

  const [key, setkey] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState();
  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRadio = (e) => {
    const { name, value } = e.target;
    setRadioFilter({ [name]: value });
  };

  const handleConfirm = (e) => {
    const { name, value } = e.target;
    setConfirmFilter({ [name]: value });
  };

  const handelFilter = () => {
    setfilters(!filters);
  };

  const univerCountry = async () => {
    try {
      const data2 = await Axios.get("/common/country/");
      const countrys = data2.data.results;
      if (data2.status === 200) {
        setFilterCountry(countrys);
      }
    } catch (err) {}
  };

  const [users, setUsers] = useState([]);

  const userList = async () => {
    setLoading(true);
    try {
      const data = await Axios.get("/applicant/list/?status=university");
      setUsers(data.data.results);
      if (data.status === 200) {
      }
      setLoading(false);
    } catch (error) {}
  };

  const filterApplicants = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `/applicant/list/?status=university&date-from=${
          startDate ? startDate.toLocaleDateString() : ""
        }&date-to=${endDate ? endDate.toLocaleDateString() : ""}&step=${
          radioFilter.completed
        }&invoice_confirmed=${confirmFilter.filter}&search=${
          searchName ? searchName : " "
        }`
      );

      const { data, status } = res;
      const { results } = data;
      if (status == 200) {
        setUsers(results);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
    setfilters(false);
  };

  useEffect(() => {
    userList();
  }, []);

  useEffect(() => {
    filterApplicants();
  }, [searchName]);

  return (
    <React.Fragment>
      <ManegerSidebar />
      <div className="left-status">
        <div className="up_nav n_up">
          <div className="single_h1">
            {/* <h1 className="link_h1">Документы </h1> <h3> {" > "}Принятые</h3> */}
          </div>
          <div className="user_info">
            <img src={userpic} alt="" />
            <div>
              <h1>
                {selector.first_name} {selector.last_name}
              </h1>
              <h2>{selector.role}</h2>
            </div>
          </div>
        </div>
        <div className="invoys n_documents M_doc_rec">
          <div className="ab_1">
            <div className="excel table_excel_btn">
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
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </div>
              <div className="filtr_btn">
                <button onClick={handelFilter}>
                  <img src={filter} alt="" />
                </button>
              </div>
            </div>
            <div className="table">
              <div className="table_up">
                <div>
                  <h1>Список документов</h1>
                </div>
                <div></div>
              </div>
              <table id="table_excel">
                <thead>
                  <th>ФИО</th>
                  <th>Телефон</th>
                  <th>Факультет</th>
                  <th>Степень</th>
                  <th>Тип обученияе </th>
                  <th> Направления</th>
                  <th>Статус принятия</th>
                  <th>Статус оплаты контракта</th>
                  <th>Когда</th>
                  {(selector.role == "supermanager" && <th>Менеджер</th>) || ""}
                  {(selector.role == "supermanager" && (
                    <th>Телефон менеджера</th>
                  )) ||
                    ""}
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
                    users
                      ?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((v) => {
                        return (
                          <tr>
                            <th>
                              <Link to={`/m-docs_rec/${v.id}`}>
                                {v.first_name} {v.last_name}
                              </Link>
                            </th>
                            <th>{v.phone_number}</th>
                            <th>{v?.faculty}</th>
                            <th>{v?.degree}</th>
                            {/* <th>{data?.manager}</th> */}
                            <th>
                              {(`${v?.type_education}` == "full_time" &&
                                "Очный") ||
                                "Заочный"}
                            </th>
                            <th>{v?.major?.name}</th>
                            {v?.step == "university" ? (
                              <th style={{ color: "black" }}>Ожидание</th>
                            ) : (
                              <th
                                style={{
                                  color: (v?.completed && "green") || "red",
                                }}
                              >
                                {(v?.completed && "Принят") || "Отказ"}
                              </th>
                            )}

                            {/* <th
                              style={{
                                color: (v?.completed && "green") || "red",
                              }}
                            >
                              {(v?.completed && "Принят") || "Отказ"}
                            </th> */}
                            <th
                              style={{
                                color:
                                  (v?.university_invoice_confirmed &&
                                    "green") ||
                                  "red",
                              }}
                            >
                              {(v?.university_invoice_confirmed && "Оплачен") ||
                                "Не оплачен"}
                            </th>
                            <th>{v?.notary_sent_manager?.slice(0, 10)}</th>
                            {(selector.role == "supermanager" && (
                              <th>
                                {v?.manager?.first_name}
                                {v?.manager?.last_name}
                              </th>
                            )) ||
                              ""}
                            {(selector.role == "supermanager" && (
                              <th>{v?.manager?.phone_number}</th>
                            )) ||
                              ""}
                          </tr>
                        );
                      })
                  )}
                </tbody>
              </table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15, 20, 30]}
                component="table"
                count={users?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          </div>

          <div
            className="abitFilBox"
            style={
              filters
                ? { width: "100%" }
                : { width: "0", transition: "0.5s step-end" }
            }
          >
            <div
              className="abitFilCl"
              onClick={() => setfilters(!filters)}
            ></div>
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
                    placeholderText=""
                  />
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="dd MMM yyyy"
                    minDate={startDate}
                    placeholderText=""
                  />
                </div>
              </div>
              <div className="radio-false">
                <div className=" radio-line">
                  <input
                    onChange={(e) => handleRadio(e)}
                    type="radio"
                    id="all"
                    name="completed"
                    value="completed"
                  />
                  <label className="label-true" for="all">
                    Поступивший
                  </label>
                </div>
                <div className=" radio-line">
                  <input
                    onChange={(e) => handleRadio(e)}
                    type="radio"
                    id="all"
                    name="completed"
                    value="cancelled"
                  />
                  <label className="label-true" for="all">
                    Не поступивший
                  </label>
                </div>
                <div className=" radio-line">
                  <input
                    onChange={(e) => handleConfirm(e)}
                    type="radio"
                    id="all"
                    name="filter"
                    value="true"
                  />
                  <label className="label-true" for="all">
                    Котракт оплачен
                  </label>
                </div>
                <div className=" radio-line">
                  <input
                    onChange={(e) => handleConfirm(e)}
                    type="radio"
                    id="all"
                    name="filter"
                    value="false"
                  />
                  <label className="label-true" for="all">
                    Контракт не оплачен
                  </label>
                </div>
              </div>
              {/* <div className="form_ab">
                <h2>Университет</h2>
                <select name="" id="">
                  <option value=""></option>
                  {universities.map((m) => {
                    return <option value={m.id}>{m.name}</option>;
                  })}
                </select>
              </div>
              <div className="form_ab">
                <h2>Степень</h2>
                <select name="" id="">
                  <option value=""></option>
                  {universities.map((m) => {
                    return <option value={m.id}>{m.name}</option>;
                  })}
                </select>
              </div>
              <div className="form_ab">
                <h2>Факультет</h2>
                <select name="" id="">
                  <option value=""></option>
                  {universities.map((m) => {
                    return <option value={m.id}>{m.name}</option>;
                  })}
                </select>
              </div> */}
              <div className="form_ab">
                <button className="form_button" onClick={filterApplicants}>
                  Применить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default StatusAbiturent;
