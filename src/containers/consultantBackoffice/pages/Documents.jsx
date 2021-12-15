import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useSelector } from "react-redux";
import userpic from "../../../assets/icon/userpic.svg";
import TablePagination from "@material-ui/core/TablePagination";
import { Link } from "react-router-dom";
import Loader from "react-js-loader";
// import img
import search_icon from "../../../assets/icon/search.svg";
import filterSvg from "../../../assets/icon/Filter.svg";
import close_modal from "../../../assets/icon/close_modal.svg";
import folder_icon from "../../../assets/icon/folder_icon.svg";
import pencil from "../../../assets/icon/pencil.svg";
import doc from "../../../assets/icon/doc.svg";
import delet from "../../../assets/icon/delet1.svg";
import arrow1 from "../../../assets/icon/arrow1.svg";
import exel from "../../../assets/icon/excel.svg";
import closeFilter from "../../../assets/icon/close.svg";
// import css
import "../../../style/css/SidebarUniverstitet.css";
import "../../../style/css/fakultet.css";
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from "./SidebarConsult";
import Axios from "../../../utils/axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router";
import { SET_DOC } from "../../../store/actionTypes";
import { dispatch } from "../../../store";
import { Pagination } from "@material-ui/lab";
import Arrowright from "../../../assets/icon/Arrowright1.svg";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";

const Document = () => {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const selector = useSelector((state) => state.payload.payload.data);
  const [students, setStudents] = useState([]);
  const [send, setSend] = useState(false);
  const [received, setReceived] = useState(false);
  const [studentGetById, setStudentGetById] = useState({});
  const [studentPostById, setStudentPostById] = useState({});
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [phone, setPhone] = useState("");
  const [universtitetName, setUniverstitetName] = useState("");
  const [nameFaculties, setNameFaculties] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  // modal
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open_change, setOpen_change] = React.useState(false);
  const [fixEnd, setFix] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [value, setValue] = useState("all");
  const [setfilters, setSetfilters] = useState(false);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleOpen = () => {
    setOpen(true);
  };

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
        `company/director/applicant/documents/?checked=${value}&date-from=${
          startDate ? `${sd}.${sm}.${sy}` : ""
        }&date-to=${endDate ? `${ed}.${em}.${ey}` : ""}&search=${
          searchName ? searchName : " "
        }`
      );
      if (data.status === 200) {
        setUsers(data.data.results);
        setLoading(false);
        setFix(false);
      } else {
        setUsers([]);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setFix(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const pageChange = (page) => {
    setPage(page);
  };
  useEffect(() => {
    userList();
  }, []);
  useEffect(() => {
    userList();
  }, [searchName]);
  useEffect(() => {
    if (window.location.pathname.includes("send")) {
      setSend(true);
      setReceived(false);
    } else if (window.location.pathname.includes("received")) {
      setReceived(true);
      setSend(false);
    } else {
      setReceived(false);
      setSend(false);
    }
  }, [window.location.pathname]);

  const getDoc = (id) => {
    localStorage.setItem("docId", id);
    history.push("documents/user");
  };
  // modal
  return (
    <div className="consultDoccuments">
      <Sidebar>
        <div className="asos">
          <div className="Up_navbar">
            <h4 className="document-h4">
              Документы{" "}
              {send ? (
                <>
                  <img src={Arrowright} alt="" width="18" />{" "}
                  <h6>Отправленные</h6>
                </>
              ) : received ? (
                <>
                  <img src={Arrowright} alt="" width="18" />
                  <h6>Принятые</h6>
                </>
              ) : (
                <></>
              )}
            </h4>
            <div className="user_info">
              <img src={userpic} alt="" />
              <div>
                <p>
                  {selector.first_name} {selector.last_name}
                </p>
                <h5>
                  {(selector.role == "branch_director" && "директор филиала") ||
                    selector.role}
                </h5>
              </div>
            </div>
          </div>

          <div className="SidebarUniverstitet">
            <button onClick={handleOpen}>
              <img src={exel} alt="" /> Excel
            </button>
            <div className="settSearch">
              <div className="searchUniv">
                <img src={search_icon} alt="" />
                <input
                  type="text"
                  onChange={(e) => setSearchName(e.target.value)}
                  placeholder="Поиск Студенты"
                />
              </div>
              <button
                onClick={() => {
                  setFix(!fixEnd);
                }}
                className="settingsUniver"
              >
                <img src={filterSvg} alt="" />
              </button>
            </div>
            {/* end settSearch */}
            <div className="univerList " id="scroll_bar">
              <h4 className="fw-bold mb-5 list-doc">Список документов</h4>
              <table id="table_excel" >
                <thead>
                  <th>ФИО</th>
                  <th>Телефон</th>
                  <th>Факультет</th>
                  <th>Степень</th>
                  <th>Тип обученияе</th>
                  <th> Направления</th>
                  <th>Загруженные документы</th>
                  <th>Статус</th>
                  {(selector.role == "supermanager" && <th>Менеджер</th>) ||
                    null}
                  {(selector.role == "supermanager" && (
                    <th>Телефон менеджера</th>
                  )) ||
                    null}
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
                    {users
                      ?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((v, i) => {
                        return (
                          <tr>
                            <th>
                                {v?.first_name} {v?.last_name}
                            </th>
                            <th>{v.phone_number}</th>
                            <th>{v?.faculty}</th>
                            <th>{v?.degree}</th>
                            <th>
                              {(`${v?.education_type}` == "full_time" &&
                                "Очный") ||
                                "Заочный"}
                            </th>
                            <th>{v?.specification}</th>
                            <th>{v?.uploaded_documents_count}</th>
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
                            <th>{v?.manager_set_date?.slice(0, 10)}</th>
                          </tr>
                        );
                      })}
                  </tbody>
                )}
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

            {/* end univerList */}
            {/* Filter */}
            <div
              className="abitFilBox"
              style={
                fixEnd
                  ? { width: "100%" }
                  : { width: "0", transition: "0.5s step-end" }
              }
            >
              <div className="abitFilCl" onClick={() => setFix(!fixEnd)}></div>
              <div
                className="FilterFix"
                style={
                  fixEnd
                    ? {
                        transform: "translateX(0)",
                        transition: "0.5s",
                      }
                    : { transform: "translateX(100%)", transition: "0.5s" }
                }
              >
                <div
                  className="fixLeft"
                  onClick={() => {
                    setFix(!fixEnd);
                  }}
                ></div>
                <div className="FilterUniver">
                  <button
                    onClick={() => {
                      setFix(!fixEnd);
                    }}
                    className="ab_2_close"
                  >
                    <img src={closeFilter} alt="" />
                  </button>
                  <h4>Фильтры</h4>
                  <p>Выберите период</p>
                  <div className="datapickBlock">
                    <div>
                      <DatePicker
                        selected={startDate}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        placeholderText="dan"
                      />
                    </div>
                    <div>
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        placeholderText="gacha"
                      />
                    </div>
                  </div>
                  <div className="form_ab">
                    <FormControl component="fieldset">
                      {/* <FormLabel component="legend">Status</FormLabel> */}
                      <RadioGroup
                        aria-label="gender"
                        name="gender1"
                        value={value}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="true"
                          control={<Radio color="primary" />}
                          label="Проверен"
                        />
                        <FormControlLabel
                          value="false"
                          control={<Radio color="primary" />}
                          label="Не проверен"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  {/* <p>Выберите страну</p>
                  <div className="selectCountry">
                    <select name="" id="">
                      <option value="">Турция</option>
                      <option value="">Россия</option>
                      <option value="">США</option>
                      <option value="">Узбекистан</option>
                    </select>
                  </div>
                  <p>Выберите город</p>
                  <div className="selectCountry">
                    <select name="" id="">
                      <option value="">Анталия</option>
                      <option value="">Анкара</option>
                      <option value="">Истанбул</option>
                      <option value="">Измир</option>
                    </select>
                  </div> */}
                  <button onClick={userList}>Применить</button>
                </div>
                {/* end FilterUniver */}
              </div>
            </div>
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default Document;
