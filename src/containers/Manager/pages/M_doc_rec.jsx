import React, { useState, useEffect } from "react";
import ManegerSidebar from "../ManagerSidebar";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import Axios from "../../../utils/axios";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Loader from "react-js-loader";
import userpic from "../../../assets/icon/userpic.svg";
import filter from "../../../assets/icon/Filter.svg";
import search from "../../../assets/icon/Search2.svg";
import close from "../../../assets/icon/close.svg";
import { useSelector } from "react-redux";
import { Pagination } from "@material-ui/lab";
import TablePagination from "@material-ui/core/TablePagination";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import DatePicker from "react-datepicker";
const M_doc_rec = () => {
  const selector = useSelector((state) => state.payload.payload.data);
  const history = useHistory();
  const [filterCountry, setFilterCountry] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [document, setDocument] = useState([]);
  const [filters, setfilters] = useState(false);
  const [key, setkey] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchName, setSearchName] = useState();
  const [current, setCurrent] = useState("");
  const [managers, setManager] = useState([]);
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

  const handelFilter = () => {
    setfilters(!filters);
  };
  const [users, setUsers] = useState([]);

  const userList = async () => {
    setLoading(true);
    const sd = startDate?.getDate();
    const sm = startDate?.getMonth() + 1;
    const sy = startDate?.getFullYear();
    const ed = endDate?.getDate();
    const em = endDate?.getMonth() + 1;
    const ey = endDate?.getFullYear();
    try {
      const data = await Axios.get(
        `/applicant/list/?status=manager_checking_notary&date-from=${
          startDate ? `${sd}.${sm}.${sy}` : ""
        }&date-to=${endDate ? `${ed}.${em}.${ey}` : ""}&search=${
          searchName ? searchName : " "
        }`
      );
      setUsers(data.data.results);
      if (data.status === 200) {
      }
      setLoading(false);
    } catch (error) {}
    setfilters(false);
  };
  const handleSubmit = async () => {
    setLoading(true);
    const sd = startDate?.getDate();
    const sm = startDate?.getMonth() + 1;
    const sy = startDate?.getFullYear();
    const ed = endDate?.getDate();
    const em = endDate?.getMonth() + 1;
    const ey = endDate?.getFullYear();
    try {
      const res = await Axios.get(
        `/applicant/list/?manager-attached=true&status=manager_checking_notary&date-from=${
          startDate ? `${sd}.${sm}.${sy}` : ""
        }&date-to=${
          endDate ? `${ed}.${em}.${ey}` : ""
        }&manager=${current}&search=${searchName ? searchName : " "}`
      );
      const { status, data } = res;
      if (status === 200) {
        const { results } = data;
        setUsers(results);
      }
      setfilters(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, [searchName]);
  const getManager = async () => {
    try {
      const res = await Axios.get("company/managers/list/");
      setManager(res.data.results);
    } catch {}
  };
  useEffect(() => {
    {
      (selector.role == "supermanager" && handleSubmit()) || userList();
    }
    {
      selector.role == "supermanager" && getManager();
    }
  }, []);
  return (
    <React.Fragment>
      <ManegerSidebar />
      <div>
        <div className="up_nav n_up">
          <div className="single_h1">
            <h1 className="link_h1">Документы </h1> <h3> {" > "}Принятые</h3>
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
                  <th>Число</th>
                  <th>От кого</th>
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
                            <th>{v?.need_translated_count}</th>
                            <th>Нотариус</th>
                            <th>{v?.notary_sent_manager?.slice(0, 10)}</th>
                            {(selector.role == "supermanager" && (
                              <th>
                                {v?.manager.first_name}
                                {v?.manager.last_name}
                              </th>
                            )) ||
                              ""}
                            {(selector.role == "supermanager" && (
                              <th>{v?.manager.phone_number}</th>
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
          {(selector.role == "supermanager" && (
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
                <div className="form_ab">
                  <h2>Manager</h2>
                  <select
                    onChange={(e) => setCurrent(e.target.value)}
                    name="manager"
                    id=""
                  >
                    <option value=""></option>
                    {managers?.map((m) => {
                      return (
                        <option value={m.id}>
                          {m.first_name}-{m.last_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="form_ab">
                  <button className="form_button" onClick={handleSubmit}>
                    Применить
                  </button>
                </div>
              </div>
            </div>
          )) || (
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

                <div className="form_ab">
                  <button className="form_button" onClick={userList}>
                    Применить
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default M_doc_rec;
