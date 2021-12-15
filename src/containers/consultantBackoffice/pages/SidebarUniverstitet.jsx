import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import moment from "moment";
import Radio from "@material-ui/core/Radio";
import Loader from "react-js-loader";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TablePagination from "@material-ui/core/TablePagination";
// import img
import search_icon from "../../../assets/icon/search.svg";
import filterSvg from "../../../assets/icon/Filter.svg";
import info_icon from "../../../assets/icon/info_icon.svg";
import close_modal from "../../../assets/icon/close_modal.svg";
import closeFilter from "../../../assets/icon/close.svg";
import folder_icon from "../../../assets/icon/folder_icon.svg";
import pencil from "../../../assets/icon/pencil.svg";
import doc from "../../../assets/icon/doc.svg";
import delet from "../../../assets/icon/delet1.svg";
import blueStroke from "../../../assets/images/Stroke-blue.svg";
import { Autocomplete } from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import arrow1 from "../../../assets/icon/arrow1.svg";
// import css
import "../../../style/css/SidebarUniverstitet.css";
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from "./SidebarConsult";
import Axios from "../../../utils/axios";
import Swal from "sweetalert2";
import log from "d3-scale/src/log";

const SidebarUniverstitet = () => {
  const selector = useSelector((state) => state?.payload?.payload?.data);
  const [startDate, setStartDate] = useState(null);
  const [next, setNext] = useState("");
  const [students, setStudents] = useState([]);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fixEnd, setFix] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState("");
  const [countryLoc, setCountryLoc] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [page, setPage] = useState(0);
  // const [cityLoc, setCityLoc] = useState("");
  const [description, setDescription] = useState("");
  const [founding_year, setFoundingYear] = useState();
  const [editModal, setEditModal] = useState(false);
  const inputEl1 = useRef(null);
  const [univerData, setUniverData] = useState([]);
  const [open_change, setOpen_change] = React.useState(false);
  const [country, setContry] = useState([]);
  const [country_id, setCountryId] = useState("");
  const [city, setCity] = useState([]);
  const [cityId, setCityId] = useState(0);
  const phoneRef = useRef();
  const [id, setId] = useState();
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState({
    name: "",
    country: "",
    city: "",
    phone_number: "",
    password1: "",
    password2: "",
  });
  const [radio, setRadio] = useState("");
  const [img, setImg] = useState();
  const [cities, setCities] = useState([]);
  const [change1, setChange1] = useState("");
  const [count, setCount] = useState();
  const [amount, setAmount] = useState("");
  const [pageChange, setPageChange] = useState();
  const [prev, setPrev] = useState("");
  const [error, setError] = useState(false);

  const handlePageChange = async (e, newPage) => {
    setPage(newPage);
    setLoading(true);
    try {
      const res = await Axios.get(
        `/university/?limit=${rowsPerPage}&offset=${newPage * rowsPerPage}`
      );
      const { status, data } = res;
      const { results } = data;
      if (status == 200) {
        setUniverData(results);
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

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(`/university/?limit=${rowsPerPage}`);
      const { status, data } = res;
      if (status === 200) {
        const { results, amount, count, next } = data;
        setUniverData(results);
        setCount(count);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleRegion = (event, newValue) => {
    // console.log(newValue);
    if (newValue?.id) {
      setChange1((state) => ({ ...state, country: newValue.id }));
    }
  };

  const handleOpen_change = () => {
    setOpen_change(true);
  };
  const handleClose_change = () => {
    setOpen_change(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    if (name !== "phone_number") return;
    setData({ ...data, phone_number: phoneRef?.current?.value });
  };

  const submitUniverstet = async (e) => {
    e.preventDefault();
    if (data.password1 === data.password2) {
      setError(false);
      try {
        const res = await Axios.post("/university/?limit=1000", data);
        if (res.status == 200) {
          Swal.fire({
            icon: "success",
            text: "Success",
            showCancelButton: false,
          });
        }
      } catch (err) {
        if (err.response.status == 500)
          Swal.fire({
            icon: "error",
            text: "Server Error",
            showCancelButton: true,
          });
        try {
        } catch (error) {
          if (err.response.status == 500)
            Swal.fire({
              icon: "error",
              text: "Server Error",
              showCancelButton: true,
            });
        }
      }
      fetchData();
      handleClose();
    } else {
      setError(true);
    }
  };
  const getContry = async () => {
    try {
      const res = await Axios.get("/company/country/");
      const { status, data } = res;
      if (status === 200) {
        setContry(res.data.results);
      }
    } catch (error) {
      // console.log(error);
    }
  };
  const getCity = async () => {
    try {
      const res = await Axios.get(`company/country/${country_id}/`);
      const { status, data } = res;
      if (status === 200) {
        setCity(res.data.cities);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getCity();
  }, [country_id]);
  useEffect(() => {
    setData({ ...data, city_id: cityId });
  }, [cityId]);

  useEffect(() => {
    fetchData();
    getContry();
  }, []);
  useEffect(() => {
    fetchData();
  }, [rowsPerPage]);

  return (
    <div className="consultSidebarUniverstitet">
      <Sidebar>
        <div className="asos">
          <>
            <div className="Up_navbar">
              <h4>{editModal ? "Информация" : "Университеты"}</h4>
              <div>
                <img src="https://picsum.photos/70" alt="" />
                <div>
                  <h5>
                    {selector?.first_name} {selector?.last_name}
                  </h5>
                  <h5>
                    {(selector?.role == "branch_director" &&
                      "директор филиала") ||
                      selector?.role}
                  </h5>
                </div>
              </div>
            </div>
            <div className="SidebarUniverstitet">
              {selector?.role === "branch_director" ? (
                <span></span>
              ) : (
                <button onClick={handleOpen}>Добавить университет</button>
              )}

              <div className="settSearch">
                <div className="searchUniv">
                  <img src={search_icon} alt="" />
                  <input
                    type="text"
                    // onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Поиск университетов"
                  />
                </div>
                <button
                  onClick={() => {
                    setFix(!fixEnd);
                  }}
                  className="settingsUniver"
                >
                  <img src={filterSvg} alt="hi" />
                </button>
              </div>
              <div className="univerList director-univer">
                <table>
                  <thead>
                    <tr>
                      {/* <th className="px-3">N</th> */}
                      <th className="firstTD">Название</th>
                      <th>Город</th>
                      {/* <th></th> */}
                      <th>Номер телефона</th>
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
                      univerData?.map((v, i) => {
                        return (
                          <tr key={v.name}>
                            {/* <td className="px-3">{i + 1}</td> */}
                            <td className="firstTD">{v?.name}</td>
                            <td>{v?.city?.name}</td>
                            <td>{v?.phone_number}</td>
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
                  onChangePage={handlePageChange}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </div>

              {/* Filter */}
              <div
                className="abitFilBox"
                style={
                  fixEnd
                    ? { width: "100%" }
                    : { width: "0", transition: "0.5s step-end" }
                }
              >
                <div
                  className="abitFilCl"
                  onClick={() => setFix(!fixEnd)}
                ></div>
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
                    <p>Выберите город</p>
                    <div className="selectCountry">
                      <select
                        name="cityId"
                        onChange={(e) => setCityId(e.target.value)}
                      >
                        {cities.map((item) => {
                          const { id, name } = item;
                          return <option value={id}>{name}</option>;
                        })}
                      </select>
                    </div>
                    <RadioGroup
                      aria-label="gender"
                      defaultValue="female"
                      name="radio-buttons-group"
                      onChange={(e) => setRadio(e.target.value)}
                    >
                      <FormControlLabel
                        value="true"
                        control={<Radio color="primary" />}
                        label="Прием докуметов открытым"
                      />
                      <FormControlLabel
                        value="false"
                        control={<Radio color="primary" />}
                        label="Прием докуметов закрытым"
                      />
                    </RadioGroup>
                    <button>Применить</button>
                  </div>
                  {/* end FilterUniver */}
                </div>
              </div>
              {/* // ! */}

              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className="class1"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <div className="addNewUniverModalUniver talaba_modal">
                    <img onClick={handleClose} src={close_modal} alt="" />
                    <div className="modalContainer">
                      <h5>Добавить новый университет</h5>
                      <div>
                        <label>Название университета</label>
                        <input
                          type="text"
                          name="name"
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>
                      <div>
                        <label>Страна</label>
                        <select
                          name="country"
                          onChange={(e) => setCountryId(e.target.value)}
                        >
                          {country.map((value) => {
                            const { name, id } = value;
                            return (
                              <option key={id} value={id}>
                                {name}
                              </option>
                            );
                          })}
                        </select>
                      </div>

                      <div>
                        <label>Город</label>
                        <select
                          name="city"
                          onChange={(e) => setCityId(e.target.value)}
                        >
                          <option value="">Выберите город</option>
                          {city?.map((value) => {
                            return (
                              <option key={value.id} value={value.id}>
                                {value.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div style={{ position: "relative" }}>
                        <label> Номер телефона</label>
                        {/* <span style={{position: 'absolute',top: '40px',color:'#5c7c8a',left: '12px',fontSize:'30px'}}>+</span> */}
                        <input
                          defaultValue="+"
                          ref={phoneRef}
                          style={{ fontSize: "20px" }}
                          type="text"
                          name="phone_number"
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>
                      <div>
                        <label style={{ color: (error && "red") || "" }}>
                          Пароль
                        </label>
                        <input
                          type="password"
                          name="password1"
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>
                      <div>
                        <label style={{ color: (error && "red") || "" }}>
                          проверка пароля
                        </label>
                        <input
                          type="password"
                          name="password2"
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>
                      <button onClick={(event) => submitUniverstet(event)}>
                        Добавить
                      </button>
                      <button onClick={handleClose} className="back_btn">
                        <img src={arrow1} alt="" /> Вернуться
                      </button>
                    </div>
                  </div>
                </Fade>
              </Modal>

              {/* end Filter */}
            </div>
            <a href="#top" title="Go to top" className="backTop">
              <img src={blueStroke} alt="back to top" />
            </a>
          </>
        </div>
      </Sidebar>
    </div>
  );
};

export default SidebarUniverstitet;
