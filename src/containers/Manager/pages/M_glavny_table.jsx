import React, { useState, useEffect } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import Axios from "../../../utils/axios";
import { Pagination } from "@material-ui/lab";
import TablePagination from "@material-ui/core/TablePagination";
import filter from "../../../assets/icon/Filter.svg";
import search from "../../../assets/icon/Search2.svg";
import close from "../../../assets/icon/close.svg";
import Loader from "react-js-loader";

const M_glavny_table = () => {
  const history = useHistory();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filterCountry, setFilterCountry] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [universitiesId, setUniversitiesId] = useState("Tatu");
  const [document, setDocument] = useState([]);
  const [filters, setfilters] = useState(false);
  const [faculty, setFaculty] = useState();
  const [value, setValue] = React.useState("all");
  const [users, setUsers] = useState([]);
  const [key, setkey] = React.useState("");
  const [loading, setLoading] = useState();

  const [searchName, setSearchName] = useState("");
  const [next, setNext] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState();
  const [amount, setAmount] = useState("");
  const [pageChange, setPageChange] = useState();
  const [prev, setPrev] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  const handelFilter = () => {
    setfilters(!filters);
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
        `/applicant/list/?step=${value}&date-from=${
          startDate ? `${sd}.${sm}.${sy}` : ""
        }&date-to=${endDate ? `${ed}.${em}.${ey}` : ""}&search=${
          searchName ? searchName : " "
        }`
      );
      setUsers(data.data.results);
      setCount(data.data.count);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
    setfilters(false);
  };
  useEffect(() => {
    userList();
  }, []);

  const fetchUniversitiesId = async (id) => {
    try {
      const data = await Axios.get(`/university/university/${id}`);
      setUniversitiesId(data.data.name);

      if (data.status === 200) {
      }
    } catch (error) {}
  };
  const handlePageChange = async (e, newPage) => {
    setPage(newPage);
    setLoading(true);
    try {
      const res = await Axios.get(
        `/applicant/list/?limit=${rowsPerPage}&offset=${newPage * rowsPerPage}`
      );
      const { status, data } = res;
      const { results } = data;
      if (status == 200) {
        setUsers(results);
      }
      console.log(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleChangeRowsPerPage = async (event) => {
    console.log(rowsPerPage);
    console.log(event.target.value);
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    userList();
  }, [rowsPerPage]);
  useEffect(() => {
    userList();
  }, [searchName]);
  return (
    <React.Fragment>
      <div className="invoys n_documents">
        <div className="ab_1">
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
            <div className="table_up"></div>
            <table>
              <thead>
                <th>ФИО</th>
                <th>Телефон</th>
                <th>Факультет</th>
                <th>Степень</th>
                <th>Тип обученияе </th>
                <th> Направления</th>
                <th>Статус клиента</th>
              </thead>
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
                      if (v.step == "registered")
                        return (
                          <tr>
                            <th>
                              <Link to={`/m-glavny/${v.id}`}>
                                {v.first_name} {v.last_name}
                              </Link>
                            </th>
                            <th>{v?.phone_number}</th>
                            <th>{v?.faculty}</th>
                            <th>{v?.degree}</th>
                            <th>
                              {(`${v?.type_education}` == "full_time" &&
                                "Очный") ||
                                "Заочный"}
                            </th>
                            <th>{v?.major?.name}</th>

                            <th className="steps">
                              <span className={`step`}>
                                1 <p>Заявка</p>
                              </span>
                              <span className="">
                                2<p>profile </p>
                              </span>

                              <span className="">
                                3 <p>Бугалтер </p>
                              </span>

                              <span className="">
                                4 <p>Менеджер </p>
                              </span>

                              <span className="">
                                5 <p>Нотариус </p>
                              </span>

                              <span className="">
                                6 <p>manager_checking_notary </p>
                              </span>

                              <span className="">
                                6 <p>менеджер проверяет файл у нотариуса </p>
                              </span>
                            </th>
                          </tr>
                        );
                      if (v.step == "profile_filled")
                        return (
                          <tr>
                            <th>
                              <Link to={`/m-glavny/${v.id}`}>
                                {v.first_name} {v.last_name}
                              </Link>
                            </th>
                            <th>{v?.phone_number}</th>
                            <th>{v?.faculty}</th>
                            <th>{v?.degree}</th>
                            <th>
                              {(`${v?.type_education}` == "full_time" &&
                                "Очный") ||
                                "Заочный"}
                            </th>
                            <th>{v?.major?.name}</th>

                            <th className="steps">
                              <span className={`step`}>
                                1 <p>Заявка</p>
                              </span>
                              <span className="step">
                                2 <p>регистр </p>
                              </span>
                              <span className="">
                                3 <p>Бугалтер </p>
                              </span>
                              <span className="">
                                4 <p>Менеджер </p>
                              </span>

                              <span className="">
                                5<p>Нотариус </p>
                              </span>

                              {/* <span className="">
                                6 <p>manager_checking_notary </p>
                              </span> */}

                              <span className="">
                                6<p>менеджер проверяет файл у нотариуса </p>
                              </span>
                            </th>
                          </tr>
                        );
                      if (v.step == "payment_confirmation")
                        return (
                          <tr>
                            <th>
                              <Link to={`/m-glavny/${v.id}`}>
                                {v.first_name} {v.last_name}
                              </Link>
                            </th>
                            <th>{v?.phone_number}</th>
                            <th>{v?.faculty}</th>
                            <th>{v?.degree}</th>
                            <th>
                              {(`${v?.type_education}` == "full_time" &&
                                "Очный") ||
                                "Заочный"}
                            </th>
                            <th>{v?.major?.name}</th>
                            <th className="steps">
                              <span className={`step`}>
                                1 <p>Заявка</p>
                              </span>
                              <span className="step">
                                2 <p>регистр </p>
                              </span>
                              <span className="step">
                                3 <p>Бугалтер </p>
                              </span>
                              <span className="">
                                4 <p>Менеджер </p>
                              </span>
                              <span className="">
                                5 <p>Нотариус </p>
                              </span>
                              {/* <span className="">
                                6 <p>manager_checking_notary </p>
                              </span> */}
                              <span className="">
                                6 <p>менеджер проверяет файл у нотариуса </p>
                              </span>
                            </th>
                          </tr>
                        );

                      if (
                        v.step == "payment_confirmed" ||
                        v.step == "manager_checking"
                      )
                        return (
                          <tr>
                            <th>
                              <Link to={`/m-glavny/${v.id}`}>
                                {v.first_name} {v.last_name}
                              </Link>
                            </th>
                            <th>{v?.phone_number}</th>
                            <th>{v?.faculty}</th>
                            <th>{v?.degree}</th>
                            <th>
                              {(`${v?.type_education}` == "full_time" &&
                                "Очный") ||
                                "Заочный"}
                            </th>
                            <th>{v?.major?.name}</th>
                            <th className="steps">
                              <span className={`step`}>
                                1 <p>Заявка</p>
                              </span>
                              <span className="step">
                                2 <p>регистр </p>
                              </span>
                              <span className="step">
                                3 <p>Бугалтер </p>
                              </span>
                              <span className="step">
                                4 <p>Менеджер </p>
                              </span>
                              <span className="">
                                5 <p>Нотариус </p>
                              </span>
                              {/* <span className="">
                                6 <p>manager_checking_notary </p>
                              </span> */}
                              <span className="">
                                6 <p>менеджер проверяет файл у нотариуса </p>
                              </span>
                            </th>
                          </tr>
                        );

                      if (
                        v.step == "notary" ||
                        v.step == "manager_reject_notary"
                      )
                        return (
                          <tr>
                            <th>
                              <Link to={`/m-glavny/${v.id}`}>
                                {v.first_name} {v.last_name}
                              </Link>
                            </th>
                            <th>{v?.phone_number}</th>
                            <th>{v?.faculty}</th>
                            <th>{v?.degree}</th>
                            <th>
                              {(`${v?.type_education}` == "full_time" &&
                                "Очный") ||
                                "Заочный"}
                            </th>
                            <th>{v?.major?.name}</th>

                            <th className="steps">
                              <span className={`step`}>
                                1 <p>Заявка</p>
                              </span>
                              <span className="step">
                                2 <p>регистр </p>
                              </span>
                              <span className="step">
                                3 <p>Бугалтер </p>
                              </span>
                              <span className="step">
                                4 <p>Менеджер </p>
                              </span>
                              <span className="step">
                                5 <p>Нотариус </p>
                              </span>
                              {/* <span className="">
                                6 <p>manager_checking_notary </p>
                              </span> */}
                              <span className="">
                                6 <p>менеджер проверяет файл у нотариуса </p>
                              </span>
                            </th>
                          </tr>
                        );

                      if (v.step == "manager_checking_notary")
                        return (
                          <tr>
                            <th>
                              <Link to={`/m-glavny/${v.id}`}>
                                {v.first_name} {v.last_name}
                              </Link>
                            </th>
                            <th>{v?.phone_number}</th>
                            <th>{v?.faculty}</th>
                            <th>{v?.degree}</th>
                            <th>
                              {(`${v?.type_education}` == "full_time" &&
                                "Очный") ||
                                "Заочный"}
                            </th>
                            <th>{v?.major?.name}</th>
                            <th className="steps">
                              <span className={`step`}>
                                1 <p>Заявка</p>
                              </span>
                              <span className="step">
                                2 <p>регистр </p>
                              </span>
                              <span className="step">
                                3 <p>Бугалтер </p>
                              </span>
                              <span className="step">
                                4 <p>Менеджер </p>
                              </span>
                              <span className="step">
                                5 <p>Нотариус </p>
                              </span>

                              <span className="step">
                                6 <p>менеджер проверяет файл у нотариуса </p>
                              </span>
                            </th>
                          </tr>
                        );
                    })}
                </tbody>
              )}
            </table>
            <TablePagination
              rowsPerPageOptions={[20, 40, 60]}
              component="table"
              count={count}
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
                <FormLabel component="legend">Status</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={value}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="registered"
                    control={<Radio color="primary" />}
                    label="регистр"
                  />
                  <FormControlLabel
                    value="profile_filled"
                    control={<Radio color="primary" />}
                    label="Профиль"
                  />
                  <FormControlLabel
                    value="payment_confirmation"
                    control={<Radio color="primary" />}
                    label="Бугалтер"
                  />
                  <FormControlLabel
                    value="payment_confirmed"
                    control={<Radio color="primary" />}
                    label="Менеджер"
                  />
                  <FormControlLabel
                    value="notary"
                    control={<Radio color="primary" />}
                    label="Нотариус"
                  />
                  <FormControlLabel
                    value="manager_checking_notary"
                    control={<Radio color="primary" />}
                    label="менеджер проверяет файл у нотариуса"
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
    </React.Fragment>
  );
};

export default M_glavny_table;
const Table = styled.div`
overflow-x: hidden;
width:100%;
.Up_navbar {
  padding-top: 70px;
}
@media (max-width: 768px) {
 
  overflow-x: hidden;
  .ab_1{
    width:68%;
    .search{
      width:100%
    }
    .table {
      width: 100%;
      overflow: hidden;
      overflow-x: scroll;
    }
  
  }

  @media (max-width: 425px) {
    font-size: 12px;
    .Up_navbar {
      margin-left: 0; 
      padding-top: 50px;
     }
    .ab_1 {
      width:90%;
      .search{
        width:136%
      }
       .table {
       width: 100%;
       overflow: hidden;
       overflow-x: scroll;
     }
    }
  }
  `;