import React, { useState, useEffect } from "react";
import ManegerSidebar from "../ManagerSidebar";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import Axios from "../../../utils/axios";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import DatePicker from "react-datepicker";
import userpic from "../../../assets/icon/userpic.svg";
import filter from "../../../assets/icon/Filter.svg";
import "../../../style/css/fakultet.css";
import search from "../../../assets/icon/Search2.svg";
import "react-datepicker/dist/react-datepicker.css";
import "../../../style/css/SidebarUniverstitet.css";
import close from "../../../assets/icon/close.svg";
import Loader from "react-js-loader";
import { useSelector } from "react-redux";
const M_doc_all = () => {
  const history = useHistory();

  const selector = useSelector((state) => state?.payload?.payload.data);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filters, setfilters] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [key, setkey] = React.useState("");
  const [loading, setLoading] = useState(true);
  const [managers, setManager] = useState([]);
  const [current, setCurrent] = useState("");
  function handleChange(event) {
    setkey(event.target.value);
  }

  const handelFilter = () => {
    setfilters(!filters);
  };

  const handleManager = async (id) => {
    try {
      const res = await Axios.get(`/company/managers/list/`);
      const { status, data } = res;
      const { results } = data;
      if (status === 200) {
        setManager(results);
      }
    } catch (error) {}
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
        `/applicant/list/?manager-attached=true&&date-from=${
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

  const [users, setUsers] = useState([]);

  const userList = async () => {
    setLoading(true);

    try {
      const data = await Axios.get("/applicant/list/?manager-attached=true");
      if (data.status === 200) {
        setUsers(data.data.results);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    userList();
  }, []);
  useEffect(() => {
    handleManager();
  }, [searchName]);

  return (
    <React.Fragment>
      <ManegerSidebar />
      <div>
        <div className="up_nav n_up">
          <div>
            <h1 className="link_h1">Документы</h1>
          </div>
          <div className="user_info">
            <img src={userpic} alt="" />
            <div>
              <h1>
                {selector?.first_name} {selector?.last_name}
              </h1>
              <h2>{selector?.role}</h2>
            </div>
          </div>
        </div>
        <div className="invoys n_documents m_doc_all">
          <div className="ab_1">
            <div className="excel table_excel_btn hi ">
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
                  <th>Тип обученияе</th>
                  <th> Направления</th>
                  <th>Загруженные документы</th>
                  <th>Статус</th>
                  <th>Менеджер</th>
                  <th>Телефон менеджера</th>
                  <th>Дата</th>
                </thead>{" "}
                {loading ? (
                  <Loader
                    className="spinner2"
                    type="spinner-circle"
                    bgColor={"#FFFFFF"}
                    color={"#FFFFFF"}
                    size={80}
                  />
                ) : (
                  <tbody>
                    {users.map((v, i) => {
                      return (
                        <tr>
                          {" "}
                          <th>
                            <th
                            // to={`${
                            //   (selector.role == "manager" &&
                            //     "/m-docs_all/") ||
                            //   "/superManager-docs_all/"
                            // }${v.id}`}
                            >
                              {v?.first_name} {v?.last_name}
                            </th>
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
                          <th>8</th>
                          <th
                            style={{
                              color: `${
                                (v.step == "notary" && "green") || "red"
                              }`,
                            }}
                          >
                            {(v.step == "notary" && "Потверждён") ||
                              "Не потверждён"}
                          </th>
                          <th>
                            {v.manager.first_name} {v.manager.last_name}
                          </th>
                          <th>{v.manager.phone_number}</th>
                          <th>{v?.manager_set_date?.slice(0, 10)}</th>
                        </tr>
                      );
                    })}
                  </tbody>
                )}
              </table>
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
              <div className="form_ab">
                <h2>Manager</h2>
                <select
                  onChange={(e) => setCurrent(e.target.value)}
                  name="manager"
                  id=""
                >
                  <option value=""></option>
                  {managers.map((m) => {
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
        </div>
      </div>
    </React.Fragment>
  );
};

export default M_doc_all;
