import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Switch from "@material-ui/core/Switch";
import { Link } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Loader from "react-js-loader";
import { Pagination } from "@material-ui/lab";
import TablePagination from "@material-ui/core/TablePagination";
//import img
import idea from "../../../../assets/icon/idea.svg";
import warning from "../../../../assets/icon/warning.svg";
import close from "../../../../assets/icon/close2.svg";
import filter from "../../../../assets/icon/Filter.svg";
import excel from "../../../../assets/icon/excel.svg";
import search from "../../../../assets/icon/Search2.svg";
import yes from "../../../../assets/icon/yes.svg";
import no from "../../../../assets/icon/no.svg";
import userpic from "../../../../assets/icon/userpic.svg";

//import css
import "react-datepicker/dist/react-datepicker.css";
import "../../../../style/css/abiturient.css";
import UniversitetBackoffice from "../universitetBackoffice";
import Axios from "../../../../utils/axios";
import { useSelector } from "react-redux";

// const data_table = require("../json/data_table.json");
const Abiturient = () => {
  const selector = useSelector((state) => state?.payload?.payload?.data);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [filters, setfilters] = useState(false);
  const [loading, setLoading] = useState();
  const [allValues, setAllValues] = useState({
    type: "",
  });

  const [inputValue, setInputValue] = useState();
  const [certainId, setCertainId] = useState("");
  const [certainDegree, setCertainDegree] = useState();
  const [getSelectBachelor, setGetSelectBachelor] = useState([]);
  const [getSelectDegree, setGetSelectDegree] = useState([]);

  const [handleDegree, setHandleDegree] = useState();
  const [handleFcaulty, setHandleFaculty] = useState();

  const [addDescription, setAddDescription] = useState("");
  const [key, setkey] = React.useState("");
  const [users, setUsers] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [degreeAll, setDegreeAll] = useState();
  const [facultyAll, setFacultyAll] = useState([]);
  const [degree, setDegree] = useState();
  const [faculty, setFaculty] = useState([]);
  const [typeEdu, setTypeEdu] = useState();
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
  const [openy, setOpeny] = React.useState(false);
  const handleOpeny = () => {
    setOpeny(true);
  };
  const handleClosey = () => {
    setOpeny(false);
  };

  const [openx, setOpenx] = React.useState(false);
  const handleOpenx = () => {
    setOpenx(true);
  };

  const handleClosex = () => {
    setOpenx(false);
  };

  const [open1, setOpen1] = useState(false);
  const [selected1, setSelected1] = useState("");
  const inputClick1 = () => {
    setOpen1(true);
    setOpen2(false);
    setOpen3(false);
  };

  const itemClick1 = (e) => {
    setSelected1(e.target.textContent);
    setOpen1(false);
  };
  const getDegree = async () => {
    try {
      const response = await Axios.get("/university/degree/");
      setDegreeAll(response.data.results);
    } catch (error) {}
  };
  const getFaculty = async () => {
    try {
      const response = await Axios.get(`/university/${selector.id}/`);
      response.data.faculties.map((item) => {
        if (degree == item.degree) {
          setFacultyAll((prev) => [...prev, item]);
        }
      });
    } catch (error) {}
  };

  const [open2, setOpen2] = useState(false);
  const [selected2, setSelected2] = useState("");
  const inputClick2 = () => {
    setOpen1(false);
    setOpen2(true);
    setOpen3(false);
  };
  const itemClick2 = (e) => {
    setSelected2(e.target.textContent);
    setOpen2(false);
  };
  useEffect(() => {
    setFacultyAll([]);
    getFaculty();
  }, [degree]);
  const [open3, setOpen3] = useState(false);
  const [selected3, setSelected3] = useState("");
  const inputClick3 = () => {
    setOpen1(false);
    setOpen2(false);
    setOpen3(true);
  };
  const itemClick3 = (e) => {
    setSelected3(e.target.textContent);
    setOpen3(false);
  };

  const getUser = async () => {
    setLoading(true);
    try {
      const res = await Axios.get("/applicant/list/");
      setUsers(res.data.results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue((state) => ({ ...state, [name]: value }));
  };

  const filterApplicants = async () => {
    setLoading(true);
    const sd = startDate?.getDate();
    const sm = startDate?.getMonth() + 1;
    const sy = startDate?.getFullYear();
    const ed = endDate?.getDate();
    const em = endDate?.getMonth() + 1;
    const ey = endDate?.getFullYear();
    try {
      const res = await Axios.get(
        `/applicant/list/?date-from=${
          startDate ? `${sd}.${sm}.${sy}` : ""
        }&date-to=${
          endDate ? `${ed}.${em}.${ey}` : ""
        }&degree=${degree}&faculty=${faculty}&education_type=${typeEdu} &search=${
          searchName ? searchName : " "
        }`
      );

      const { data, status } = res;
      const { results } = data;
      if (status == 200) {
        setUsers(results);
        setfilters(false);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setfilters(false);
    }
    setfilters(false);
  };

  useEffect(() => {
    getDegree();
    getFaculty();
    getUser();
  }, []);
  useEffect(() => {
    getDegree();
  }, [certainId]);

  useEffect(() => {
    filterApplicants();
  }, [searchName]);

  return (
    <UniversitetBackoffice>
      <div className="abiturient">
        <div className="up_nav">
          <div>
            <h1 className="link_h1">Абитуриенты</h1>
          </div>
          <div className="user_info">
            <img src={userpic} alt="" />
            <div>
              <h1>{selector?.name} </h1>
              <h2>
                {selector?.city?.name}, {selector?.city?.country?.name}
              </h2>
            </div>
          </div>
        </div>
        <div className="abiturients">
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
                  onChange={(e) => setSearchName(e.target.value)}
                  placeholder="Поиск Студенты"
                />
              </div>
              <div className="filtr_btn">
                <button
                  onClick={() => {
                    setfilters(!filters);
                  }}
                >
                  <img src={filter} alt="" />
                </button>
              </div>
            </div>
            <div className="table">
              <h1>Список абитуриентов</h1>
              <div className="tableScroll">
                <table id="table_excel">
                  <thead>
                    <th>ФИО</th>
                    <th> Телефон</th>
                    <th>Факультет</th>
                    <th>Степень</th>
                    <th>Тип обученияе</th>
                    <th>Контракт</th>
                    <th>Менеджер </th>
                    <th>Телефон менеджера</th>
                    {/* <th>Принять</th> */}
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
                        .map((data) => {
                          return (
                            <tr>
                              <th>
                                <Link to={`/userPage/${data?.id}`}>
                                  {data?.first_name} {data?.last_name}
                                </Link>
                              </th>
                              <th>{data.phone_number}</th>
                              <th>{data?.faculty}</th>
                              <th>{data?.degree}</th>
                              {/* <th>{data?.manager}</th> */}
                              <th>
                                {(`${data?.type_education}` == "full_time" &&
                                  "Очный") ||
                                  "Заочный"}
                              </th>
                              <th>{`${data?.education_fee} $`}</th>
                              <th>
                                {data.manager?.first_name}{" "}
                                {data.manager?.last_name}
                              </th>
                              <th>{data.manager?.phone_number}</th>

                              {/* <th>
                            <button onClick={handleOpeny}>
                              <img src={yes} alt="" />
                            </button>
                            <button onClick={handleOpenx}>
                              <img src={no} alt="" />
                            </button>
                          </th> */}
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
                <h2>Тип обучения</h2>
                <select
                  name="type"
                  name="degree"
                  id=""
                  onChange={(e) => setDegree(e.target.value)}
                >
                  {degreeAll?.map((data) => (
                    <option value={data.id}>{data.title}</option>
                  ))}
                </select>
              </div>
              <div className="form_ab">
                <h2>Факультет</h2>
                <select onChange={(e) => setFaculty(e.target.value)}>
                  {facultyAll?.map((i) => {
                    return <option value={i?.id}>{i?.name}</option>;
                  })}
                </select>
              </div>
              <div className="form_ab">
                <h2>Тип обучения</h2>
                <select
                  name="type"
                  id=""
                  onChange={(e) => setTypeEdu(e.target.value)}
                >
                  <option value="full_time" name="full">
                    Полная ставка
                  </option>
                  <option value="part_time" name="part">
                    Пол ставка
                  </option>
                  <option value="distance" name="distance">
                    Дистанционно
                  </option>
                </select>
              </div>

              <div className="form_ab">
                <button className="form_button" onClick={filterApplicants}>
                  Применить
                </button>
              </div>
            </div>
          </div>
          {/* // ! */}
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className="class_modal"
            open={openy}
            onClose={handleClosey}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
            onChange={(e) => setAddDescription(e.target.value)}
          >
            <Fade in={openy}>
              <div className="modal">
                <div className="close_btn">
                  <img onClick={handleClosey} src={close} alt="" />
                </div>

                <img src={warning} alt="" />
                <h1>
                  Вы действительно хотите принять{" "}
                  <span>
                    {" "}
                    {users?.first_name} {users?.last_name}
                  </span>{" "}
                  на учебу?
                </h1>
                <div className="modal_btn">
                  <button onClick={handleClosey}>Отменить</button>
                  <button onClick={handleClosey}>Принять</button>
                </div>
              </div>
            </Fade>
          </Modal>

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className="class_modal"
            open={openx}
            onClose={handleClosex}
            closeAfterTransition
            BackdropComponent={Backdrop}
            onChange={(e) => setAddDescription(e.target.value)}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openx}>
              <div className="modal">
                <div className="close_btn">
                  <img onClick={handleClosex} src={close} alt="" />
                </div>

                <img src={idea} alt="" />
                <h1>Причина отказа:</h1>
                <input type="text" placeholder="Напишите причину отказа" />
                <div className="modal_btn">
                  <button onClick={handleClosex}>Отменить</button>
                  <button onClick={handleClosex}>Отправить</button>
                </div>
              </div>
            </Fade>
          </Modal>
        </div>
      </div>
    </UniversitetBackoffice>
  );
};

export default Abiturient;
