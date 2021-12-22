import ManegerSidebar from "../ManagerSidebar";
import React, { useEffect, useState, useRef } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Loader from "react-js-loader";
import DatePicker from "react-datepicker";
import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab";
import search_icon from "../../../assets/icon/search.svg";
import filterImg from "../../../assets/icon/Filter.svg";
import Vector from "../../../assets/icons/Vector.svg";
import blueStroke from "../../../assets/images/Stroke-blue.svg";
import closeFilter from "../../../assets/icon/close.svg";
import check from "../../../assets/icon/check1.svg";
import styled from "styled-components";
// import css
import "../../../style/css/SidebarUniverstitet.css";
import "../../../style/css/fakultet.css";
import "react-datepicker/dist/react-datepicker.css";
import userpic from "../../../assets/icon/userpic.svg";
import Axios from "../../../utils/axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "../../../style/css/notarius.css";
import plus from "../../../assets/icon/plus.svg";
import { Pagination } from "@material-ui/lab";
import TablePagination from "@material-ui/core/TablePagination";
export default function SuperManager() {
  const [items, setItems] = useState([]);
  const [radio, setRadio] = useState("");
  //   const [tempNote, setTempNote] = useState([]);
  const [value, setValue] = useState();
  const [note, setNote] = useState([]);
  const [words, setWords] = useState();

  const [loading, setLoading] = useState(false);
  const counts = new Date().getUTCMilliseconds();
  const [students, setStudents] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [paymentConfirm, setPaymentConfirm] = useState(false);
  const [open_change, setOpen_change] = React.useState(false);
  const [fixEnd, setFix] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [data, setData] = useState(null);
  const [managersFrom, setManager] = useState();
  const [managerAll, setManagerAll] = useState();
  const container = useRef();
  const [faculty, setFaculty] = useState([]);
  const [managerName, setManagerName] = useState();
  const [userId, setUserId] = useState();
  const [select, setSelect] = useState([]);
  const [nameIdM, setNameIdM] = useState();
  const [confirms, setConfirms] = useState();
  const history = useHistory();
  const selector = useSelector((state) => state.payload.payload.data);

  const [univer, setUniver] = useState([]);
  const [next, setNext] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [page, setPage] = useState(0);
  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const inputHandler = (e, index) => {
    let filteredWords = items.find((item) => item.id == index);
    filteredWords.description = e.target.value;
    // handleWords(data, index);
  };

  const fetchNote = async () => {
    setLoading(true);
    try {
      const res = await Axios.get("/company/note/");
      const { status, data } = res;
      const { results } = data;
      if (status === 200) {
        setNote(results);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const deleteFetchedCard = async (id) => {
    Swal.fire({
      icon: "warning",
      text: "Вы уверены, что хотите удалить?",
      showCancelButton: true,
      showConfirmButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await Axios.delete(`/company/note/${id}/`);
          const { status } = res;
          if (status === 204) {
            fetchNote();
          }
        } catch (error) {}
      }
    });
  };
  useEffect(() => {
    fetchNote();
  }, []);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen_change = () => {
    setOpen_change(true);
  };
  const handleClose_change = () => {
    setOpen_change(false);
  };
  const handleClock = async (id) => {
    try {
      const res = await Axios.put(`/applicant/confirm-payment/${id}/`, {
        invoice_confirmed: true,
      });
      setPaymentConfirm(true);
      const { data, status } = res;
    } catch (error) {}
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
  const handleClick = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Вы действительно хотите потвердить этот платеж?",
      showCancelButton: true,
      reverseButtons: true,
      cancelButtonColor: "#F3F5F7",
      cancelButtonText: "Отменить",
      confirmButtonColor: "#00587F",
      confirmButtonText: "Потвердить",
    }).then((result) => {
      if (result.isConfirmed) {
        handleClock(id);
      } else {
      }
    });
  };
  const [input, setInput] = useState(false);

  const [IdUser, setIdUser] = useState(() => new Set());

  const addItem = (item) => {
    setIdUser((prev) => new Set(prev).add(item));
    //
  };

  const getManagerId = () => {
    managersFrom?.map((v) => {
      if (managerName == v.first_name) {
        setNameIdM((nameIdM) => v.id);
      }
    });
  };

  const onChange = async (e, id) => {
    setManagerName(e.target.innerText);
    const { name } = e.target;
    managersFrom?.map((v) => {
      if (e.target.innerText == v.first_name) {
        setNameIdM((nameIdM) => v.id);
        // try {
        //   const dataUser = { manager: nameIdM, applicant: id };
        //   const res = Axios.post(
        //     "/company/super-manager-set-manager/",
        //     dataUser
        //   );
        // } catch (error) {}
      }
    });
  };
  const handleRadio = (e) => {
    const { name, value } = e.target;
    setRadio({ [name]: value });
  };
  const handleSelect = (e) => {
    const { name, value } = e.target;
    setSelect((prev) => ({ ...prev, [name]: value }));
  };
  zzz;

  const setManagers = async (id) => {
    const dataUser = { manager: nameIdM, applicant: id };
    try {
      const res = Axios.post("/company/super-manager-set-manager/", dataUser);
    } catch (error) {}
    setConfirms((state) => ({ ...state, [`confirms_${id}`]: true }));
  };
  const fetchUniver = async () => {
    try {
      const res = await Axios.get("/university/");
      const { status, data } = res;
      if (status === 200) {
        const { results } = data;
        setUniver(results);
      }
    } catch (error) {}
  };
  const fetchFaculty = async () => {
    try {
      const res = await Axios.get(`/university/${select?.university}`);
      const { status, data } = res;
      if (status === 200) {
        const { faculties } = data;
        setFaculty(faculties);
      }
    } catch (error) {}
  };
  const handleSubmit = async () => {
    try {
      const res = await Axios.get(
        `/applicant/list/?manager-attached=false&has_univer=${
          radio.has_univer
        }&date-from=${startDate.toLocaleDateString()}&date-to=${endDate.toLocaleDateString()}&university=${
          select.university
        }&faculty=${select.faculty}&education_type=${select.education_type}`
      );
      const { status, data } = res;
      const { results, count } = data;

      if (status === 200) {
        setStudents(results);
      }
    } catch (error) {}
  };
  const handleSearch = async (e) => {
    const { value } = e.target;
    if (value.length > 2) {
      try {
        const res = await Axios.get(
          `/applicant/list/?manager-attached=false&search=${value}`
        );
        const { status, data } = res;
        const { results, count } = data;
        results.map((v, i) => {
          return setConfirms((state) => ({
            ...state,
            [`confirms_${v?.id}`]: false,
          }));
        });
        if (status === 200) {
          setStudents(results);
        }
      } catch (error) {}
    }
  };
  useEffect(() => {
    fethcStudents();
    fetchUniver();
  }, []);
  useEffect(() => {
    fetchFaculty();
  }, [select?.university]);
  useEffect(() => {
    handleManager();
  }, []);
  // useEffect(() => {
  //   fethcStudents();
  // }, [count]);
  useEffect(() => {
    getManagerId();
  }, [managerName]);

  return (
    <>
      <ManegerSidebar />
      <div className="asos" id="top">
        <div className="Up_navbar">
          <div>
            <div className="nav-bugalter">
              <h4>Клиентский ввод</h4>
            </div>
          </div>
          <div className="user_info">
            <img src={userpic} alt="" />
            <div>
              <p>
                {selector.first_name} {selector.last_name}
              </p>
              <p>{selector.role}</p>
            </div>
          </div>
        </div>
        <div className="SidebarUniverstitet">
          <button onClick={handleOpen}>
            {/* <div className="excel table_excel_btn manager-excel ">
              <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button"
                table="table_excel"
                filename="tablexls"
                sheet="tablexls"
                buttonText="Excel"
              />{" "}
            </div> */}
            <span>
              <img src={Vector} className="vector" alt="Vector img" />
              <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button manager-download"
                table="table_excel"
                filename="tablexls"
                sheet="tablexls"
                buttonText="Excel"
              />
            </span>
          </button>

          <div className="settSearch">
            <div className="searchUniv">
              <img src={search_icon} alt="" />
              <input
                type="text"
                onChange={(e) => handleSearch(e)}
                placeholder="Поиск Студенты"
              />
            </div>
            <button
              onClick={() => {
                setFix(!fixEnd);
              }}
              className="settingsUniver"
            >
              <img src={filterImg} className="" alt="" />
            </button>
          </div>
          <div className="univerList talabalar" id="scroll_bar">
            <table id="table_excel">
              <thead>
                <tr className="table-line">
                  <th>ФИО</th>
                  <th>Университет</th>
                  <th>Тип обучения</th>
                  <th>Факультет</th>
                  <th>Телефон</th>
                  <th>Реферальный</th>
                  <th>Менеджер</th>
                </tr>
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
                    .map((item, i) => {
                      const {
                        id,
                        first_name,
                        last_name,
                        university,
                        service_price,
                        phone_number,
                        contract_created_date,
                        invoice,
                        manager,
                        contract,
                        invoice_confirmed,
                        faculty,
                        education_type,
                        referral,
                      } = item;
                      return (
                        <tr key={id}>
                          <td>
                            <td
                              onClick={() => history.push(`/m-glavny/${id}`)}
                              style={{ cursor: "pointer" }}
                            >
                              {first_name} {last_name}
                            </td>
                          </td>
                          <td>{university}</td>
                          <td>
                            {(education_type == "full_time" && "Очный") ||
                              "Заочный"}
                          </td>
                          <td> {faculty} </td>
                          <td>{phone_number}</td>
                          <td>{referral}</td>
                          <td className="search-td">
                            {IdUser.has(id) ? (
                              <Autocomplete
                                disabled={
                                  (confirms[`confirms_${id}`] && true) || false
                                }
                                onChange={(e) => onChange(e, id)}
                                className="manager-search w-50"
                                name={`confirm_${id}`}
                                options={managersFrom}
                                id="combo-box-demo"
                                getOptionLabel={(option) =>
                                  option ? option.first_name : " "
                                }
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label=""
                                    variant="outlined"
                                  />
                                )}
                              />
                            ) : (
                              <button
                                className="table-manager"
                                onClick={() => addItem(id)}
                              >
                                Выбрать менеджера
                              </button>
                            )}
                            {IdUser.has(id) ? (
                              <button
                                style={{
                                  display: confirms[`confirms_${id}`]
                                    ? "none"
                                    : "flex",
                                }}
                                className="table-manager"
                                onClick={() => setManagers(id)}
                              >
                                сохранять
                              </button>
                            ) : (
                              ""
                            )}
                            <img
                              width="20px"
                              src={check}
                              alt=""
                              style={{
                                width: "25px",
                                marginLeft: "10px",
                                display: confirms[`confirms_${id}`]
                                  ? "flex"
                                  : "none",
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })
                )}
              </tbody>
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

          {/* NOTES */}
          <div className="n_glavny">
            <h1>Примечания</h1>
            <div className="zametki">
              <div
                onClick={addCard}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                className="paper"
              >
                <img src={plus} alt="plus" />
              </div>
              {items.map((data, index) => {
                const { description, id } = data;
                return (
                  <div onBlur={() => saveCard(id)} key={id} className="paper">
                    <span onClick={() => deleteCard(id)}>x</span>
                    <h1>Заметка {index + 1}</h1>
                    <textarea onChange={(e) => inputHandler(e, id)}></textarea>
                    {/* <p onClick={saveCard} className="saveButton">сохранит</p> */}
                  </div>
                );
              })}

              {note.map((data, index) => {
                const { id, text } = data;
                return (
                  <div key={id} className="paper">
                    <span onClick={() => deleteFetchedCard(id)}>x</span>
                    <h1>Заметка {index + 1}</h1>
                    <p style={{ textAlign: "justify" }}>{text}</p>
                  </div>
                );
              })}
            </div>
          </div>
          {/* end Filter */}

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
                  ? { transform: "translateX(0)", transition: "0.5s" }
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
                      onChange={(date) => setStartDate(date)}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
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
                <FormFilter>
                  <InputDiv>
                    <input
                      value="false"
                      onChange={handleRadio}
                      type="radio"
                      name="has_univer"
                      id="registered"
                    />
                    <label htmlFor="registered">Registered</label>
                  </InputDiv>
                  <InputDiv>
                    <input
                      value="true"
                      onChange={handleRadio}
                      type="radio"
                      name="has_univer"
                      id="univer"
                    />
                    <label htmlFor="univer">Univer tanlangan</label>
                  </InputDiv>
                  <div
                    style={
                      radio?.has_univer === "true"
                        ? { visibility: "visible" }
                        : { visibility: "hidden" }
                    }
                  >
                    <p>Выберите Университет</p>
                    <div className="selectCountry">
                      <select name="university" onChange={handleSelect}>
                        {univer.map((item) => {
                          const { id, name } = item;
                          return <option value={id}>{name}</option>;
                        })}
                      </select>
                    </div>
                    <p>Выберите факультет</p>
                    <div className="selectCountry">
                      <select name="faculty" onChange={handleSelect} id="">
                        {faculty.map((item) => {
                          const { id, name } = item;
                          return <option value={id}>{name}</option>;
                        })}
                      </select>
                    </div>
                    <div>
                      <p>Выберите тип образования</p>
                      <div className="selectCountry">
                        <select
                          onChange={handleSelect}
                          name="education_type"
                          id=""
                        >
                          <option value="full_time">очное</option>
                          <option value="distance">дистанционный</option>
                          <option value="part_time">пол ставка</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </FormFilter>

                <button onClick={handleSubmit}>Применить</button>
              </div>
              {/* end FilterUniver */}
            </div>
          </div>
        </div>
        <a href="#top" title="Go to top" className="backTop">
          <img src={blueStroke} alt="back to top" />
        </a>
      </div>
    </>
  );
}

const FormFilter = styled.div``;
const InputDiv = styled.div`
  margin: 18px 0;
  font-size: 18px;
  display: flex;
  align-items: center;
  input {
    height: 18px;
    width: 18px;
  }
  label {
    margin-left: 15px;
    font-weight: 600;
    cursor: pointer;
  }
`;
