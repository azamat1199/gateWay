import React, { useState, useEffect } from "react";
import ManegerSidebar from "../ManagerSidebar";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import Axios from "../../../utils/axios";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Pagination } from "@material-ui/lab";
import TablePagination from "@material-ui/core/TablePagination";
import userpic from "../../../assets/icon/userpic.svg";
import filter from "../../../assets/icon/Filter.svg";
import search from "../../../assets/icon/Search2.svg";
import close from "../../../assets/icon/close.svg";
import Loader from "react-js-loader";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
const M_doc_all = () => {
  const history = useHistory();
  const selector = useSelector((state) => state.payload.payload.data);
  const [filterCountry, setFilterCountry] = useState([]);

  const [universities, setUniversities] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [document, setDocument] = useState([]);
  const [value, setValue] = React.useState("all");
  const [filters, setfilters] = useState(false);
  const [key, setkey] = React.useState("");
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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

  const fetchUniversities = async () => {
    try {
      const data = await Axios.get("/university/");
      const { results } = data.data;
      if (data.status === 200) {
        setUniversities(results);
      }
    } catch (error) {}
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
        `applicant/list/?status=managernotary&checked=${value}&date-from=${
          startDate ? `${sd}.${sm}.${sy}` : ""
        }&date-to=${endDate ? `${ed}.${em}.${ey}` : ""}&search=${
          searchName ? searchName : " "
        }`
      );
      setLoading(false);
      if (data.status === 200) {
        setUsers(data.data.results);
      }
    } catch (error) {}
    setfilters(false);
  };
  useEffect(() => {
    userList();
  }, [searchName]);
  const setFavourite = async (univerId) => {
    try {
      const data = await Axios.post(
        "/enrollee/enrollee-user-favorite-university/",
        {
          university: univerId,
          //   enrollee_user: userId,
        }
      );
    } catch (error) {}
  };

  const handler = (userId) => {
    setFavourite(userId).then(() => history.push(`/university/${userId}`));
  };

  useEffect(() => {
    userList();
  }, []);

  return (
    <React.Fragment>
      <ManegerSidebar />
      <div className="right-doc">
        <div className="up_nav n_up">
          <div>
            <h1 className="link_h1">Документы</h1>
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
        <div className="invoys n_documents m_doc_all">
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
                  <th>Университет</th>
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
                            {" "}
                            <th>
                              <Link
                                to={`${
                                  (selector.role == "manager" &&
                                    "/m-docs_all/") ||
                                  "/superManager-docs_all/"
                                }${v.id}`}
                              >
                                {v?.first_name} {v?.last_name}
                              </Link>
                            </th>
                            <th>{v.phone_number}</th>
                            <th>{v.university}</th>
                            <th>{v?.faculty}</th>
                            <th>{v?.degree}</th>
                            {/* <th>{data?.manager}</th> */}
                            <th>
                              {(`${v?.type_education}` == "full_time" &&
                                "Очный") ||
                                "Заочный"}
                            </th>
                            <th>{v?.major?.name}</th>
                            <th>{v?.original}</th>
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
              <div className="form_ab">
                <button className="form_button" onClick={userList}>
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
