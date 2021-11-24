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

// import css
import "../../../style/css/SidebarUniverstitet.css";
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from "./SidebarConsult";
import Axios from "../../../utils/axios";
import Swal from "sweetalert2";
import arrow1 from "../../../assets/icon/arrow1.svg";
import log from "d3-scale/src/log";

const SidebarUniverstitet = () => {
  const selector = useSelector((state) => state?.payload?.payload?.data);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fixEnd, setFix] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState("");
  const [countryLoc, setCountryLoc] = useState("");
  const [cityLoc, setCityLoc] = useState("");
  const [description, setDescription] = useState("");
  const [founding_year, setFoundingYear] = useState();
  const [editModal, setEditModal] = useState(false);
  const inputEl1 = useRef(null);
  const [univerData, setUniverData] = useState({});
  const [open_change, setOpen_change] = React.useState(false);
  const [country, setContry] = useState([]);
  const [city, setCity] = useState([]);
  const [cityId, setCityId] = useState(0);
  const [id, setId] = useState();
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState();
  const [radio, setRadio] = useState("");
  const [img, setImg] = useState();
  const [cities, setCities] = useState([]);
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await Axios.get("/university/");
      const { status, data } = res;
      if (status === 200) {
        const { results } = data;
        setUniverData(res);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      Axios.get("common/country/").then((res) => {
        setContry(res.data.results);
      });
    }
  }, [open, data?.country]);
  useEffect(() => {
    fetchData();
  }, []);

  //
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
  };
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setImg((state) => ({ ...state, [name]: files[0] }));
  };

  const formData = new FormData();
  formData.append("name", data?.name);

  formData.append("password", data?.password);
  formData.append("email", data?.password);
  formData.append("email", founding_year);
  const formDataImg = new FormData();
  formDataImg.append("university", univerData?.data?.count + 1);
  formDataImg.append("image", img?.images);
  formDataImg.append("description", data?.description);

  const submitUniverstet = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.post("/university/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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
        const res = await Axios.post("/university/image/", formDataImg, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        if (err.response.status == 500)
          Swal.fire({
            icon: "error",
            text: "Server Error",
            showCancelButton: true,
          });
      }
    }
    handleClose();
  };
  const edit = async (id) => {
    handleOpen_change();
    try {
      const res = await Axios.get(`university/${id}`);
      const { name, country, description, founding_year } = res.data;
      setId(id + 1);
      setName(name);
      countryLoc(country);
      setDescription(description);
      setFoundingYear(parseInt(founding_year));
    } catch (error) {
      if (error.status == 500)
        Swal.fire({
          icon: "error",
          text: "Server Errror",
          showCancelButton: true,
        });
    }
  };
  const setEdit = async (id) => {
    try {
      const res = await Axios.patch(`/university/${id}/`, formData);
    } catch (error) {}
    handleClose_change();
  };

  const fetchCities = async () => {
    if (!fixEnd) return;
    try {
      const res = await Axios.get("/common/city/");
      const { status, data } = res;
      if (status === 200) {
        const { results } = data;
        setCities(results);
      }
    } catch (error) {}
  };

  const filterUniver = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `/university/?city=${cityId}&status=${radio}`
      );

      const { status, data } = res;
      if (status === 200) {
        const { results } = data;
        setUniverData(res);
      }
      setLoading(false);
      setFix(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleSearch = async (e) => {
    setLoading(true);
    try {
      const res = await Axios.get(`/university/?search=${e}`);
      const { status, data } = res;
      if (status === 200) {
        const { results } = data;
        setUniverData(res);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCities();
  }, [fixEnd]);
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
              {!editModal ? (
                selector?.role === "branch_director" ? (
                  <span></span>
                ) : (
                  <button onClick={handleOpen}>Добавить университет</button>
                )
              ) : (
                <div className="header-btn-edit-university-director">
                  <button>Изменить</button>
                  <button onClick={() => setEditModal(false)}>Отмена</button>
                </div>
              )}
              {!editModal ? (
                <div className="settSearch">
                  <div className="searchUniv">
                    <img src={search_icon} alt="" />
                    <input
                      type="text"
                      onChange={(e) => handleSearch(e.target.value)}
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
              ) : null}
              {!editModal ? (
                <div className="univerList director-univer">
                  <table>
                    <thead>
                      <tr>
                        <th className="px-3">N</th>
                        <th className="firstTD">Название</th>
                        <th>Город</th>
                        <th>Срок</th>
                        <th>Статус</th>
                        {selector?.role === "branch_director" ? (
                          <span></span>
                        ) : (
                          <th className="infoTd">Информация</th>
                        )}
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
                        univerData?.data?.results?.map((v, i) => {
                          return (
                            <tr key={v.name}>
                              <td className="px-3">{i + 1}</td>
                              <td className="firstTD">{v.name}</td>
                              <td>{v.city.name}</td>
                              <td>
                                {moment(v?.application_end_date).format(
                                  "DD.MM.YYYY"
                                )}
                              </td>
                              <td className="priDoc">Прием докуметов</td>
                              {selector?.role === "branch_director" ? (
                                <span></span>
                              ) : (
                                <td className="infoTd">
                                  <img
                                    src={info_icon}
                                    alt=""
                                    className="me-5"
                                    onClick={() => setEditModal(true)}
                                  />
                                  <img
                                    src={pencil}
                                    onClick={(e) => edit(v.id)}
                                    alt=""
                                    width="28"
                                    className="ms-5"
                                  />
                                </td>
                              )}
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="SidebarUniverstitet modal-edit-table-univer">
                  <div className="univerList director-univer">
                    <table>
                      <thead>
                        <tr>
                          <th className="px-3">Имя</th>
                          <td className="firstTD">Юсупов</td>
                        </tr>
                        <tr>
                          <th className="px-3">Фамилия</th>
                          <td className="firstTD">Юсупов</td>
                        </tr>
                        <tr>
                          <th className="px-3">Отчество</th>
                          <td className="firstTD">Юсупов</td>
                        </tr>
                        <tr>
                          <th className="px-3">Университет</th>
                          <td className="firstTD">
                            ЮсуповЮсуповЮсуповЮсуповЮсуповЮсуповЮсуповЮсуповЮсуповЮсуповЮсуповЮсуповЮсуповЮсуповЮсуповЮсуповЮсуповЮсуповЮсуповЮсуповЮсуповЮсуповЮсупов
                          </td>
                        </tr>
                        <tr>
                          <th className="px-3">Факультет</th>
                          <td className="firstTD">Юсупов</td>
                        </tr>
                        <tr>
                          <th className="px-3">Специальность</th>
                          <td className="firstTD">Юсупов</td>
                        </tr>
                        <tr>
                          <th className="px-3">Паспорт</th>
                          <td className="firstTD">Юсупов</td>
                        </tr>
                        <tr>
                          <th className="px-3">Диплом</th>
                          <td className="firstTD">Юсупов</td>
                        </tr>
                      </thead>
                    </table>
                  </div>
                </div>
              )}
              {/* Filter */}
              {/* // ! */}
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
                    <button onClick={filterUniver}>Применить</button>
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
                        <select name="country">
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
                        <select name="city">
                          {city?.cities?.map((value) => {
                            return (
                              <option key={value.id} value={value.id}>
                                {value.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div>
                        {/* <label>Описание</label>
                      <textarea
                        name="description"
                        id=""
                        cols="30"
                        rows="5"
                        onChange={(e) => handleInputChange(e)}
                      ></textarea> */}
                      </div>
                      <div className="modalDataPick">
                        <label>Прием документов заканчивается</label>
                        <DatePicker
                          selected={founding_year}
                          onChange={(e) => setFoundingYear(e)}
                          placeholderText="sana"
                        />
                      </div>
                      <div>
                        <label>Email</label>
                        <input
                          type="email"
                          name="email"
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>
                      <div>
                        <label>Пароль</label>
                        <input
                          type="password"
                          name="password"
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>
                      <div>
                        <label>Картинка</label>
                        <div className="import">
                          <img src={folder_icon} alt="" />
                          <p>
                            Drop your files here or a
                            <input
                              onChange={(e) => handleFileChange(e)}
                              ref={inputEl1}
                              type="file"
                              id="chFile2"
                              name="images"
                            />
                            <label htmlFor="chFile2">choose file</label>
                          </p>
                        </div>
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
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className="class1"
                open={open_change}
                onClose={handleClose_change}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open_change}>
                  <div className="addNewUniverModalUniver talaba_modal">
                    <img
                      onClick={handleClose_change}
                      src={close_modal}
                      alt=""
                    />
                    <div className="modalContainer">
                      <h5>Добавить новый университет</h5>
                      <div>
                        <label>Название университета</label>
                        <input
                          value={name}
                          name="name"
                          type="text"
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>
                      <div>
                        <label>Страна</label>
                        <select value={country}>
                          <option>Tashkent</option>
                          <option>Istabul</option>
                          <option>Maskiva</option>
                        </select>
                      </div>

                      <div>
                        <label>Город</label>
                        <select value={city}>
                          <option>Tashkent</option>
                          <option>Istabul</option>
                          <option>Maskiva</option>
                        </select>
                      </div>
                      <div>
                        <label>Описание</label>
                        <textarea
                          name="description"
                          id=""
                          cols="30"
                          rows="5"
                          value={description}
                          onChange={(e) => handleInputChange(e)}
                        ></textarea>
                      </div>
                      <div className="modalDataPick">
                        <label>Прием документов заканчивается</label>
                        <DatePicker
                          selected={founding_year}
                          onChange={(e) => setFoundingYear(e)}
                          placeholderText="sana"
                        />
                      </div>
                      <div>
                        <label>Email</label>
                        <input
                          type="email"
                          name="email"
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>
                      <div>
                        <label>Пароль</label>
                        <input
                          type="password"
                          name="password"
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>
                      <div>
                        <label>Картинка</label>
                        <div className="importFile">
                          <img src={folder_icon} alt="" />
                          <p>
                            Drop your files here or a
                            <input
                              type="file"
                              id="chFile"
                              ref={inputEl1}
                              name="images"
                              onChange={(e) => handleFileChange(e)}
                            />
                            <label htmlFor="chFile">choose file</label>
                          </p>
                        </div>
                      </div>
                      <button onClick={() => setEdit(id)}>Добавить</button>
                      <button onClick={handleClose_change} className="back_btn">
                        <img src={arrow1} alt="" /> Вернуться
                      </button>
                    </div>
                  </div>
                </Fade>
              </Modal>
              {/* end Filter */}
            </div>
            <a href="#top" title="Go to top" className="backTop">
              <img src={blueStroke} alt="back to the top" />
            </a>
          </>
        </div>
      </Sidebar>
    </div>
  );
};

export default SidebarUniverstitet;
