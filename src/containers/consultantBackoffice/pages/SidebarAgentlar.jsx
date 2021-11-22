import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import {
  ResponsiveContainer,
  Tooltip,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ComposedChart,
  LabelList,
} from "recharts";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import Loader from "react-js-loader";

import { useSelector } from "react-redux";
import userpic from "../../../assets/icon/userpic.svg";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import "react-datepicker/dist/react-datepicker.css";
import "../../../style/css/table.css";

// import img
import search_icon from "../../../assets/icon/search.svg";
import closeFilter from "../../../assets/icon/close.svg";
// import settings from '../../../assets/icon/settings.svg';
import filterSvg from "../../../assets/icon/Filter.svg";
import close_modal from "../../../assets/icon/close_modal.svg";
import folder_icon from "../../../assets/icon/folder_icon.svg";

// import css
import "../../../style/css/SidebarAgentlar.css";
import Sidebar from "./SidebarConsult";
import Axios from "../../../utils/axios";
import Swal from "sweetalert2";

// const data_agent = require("../json/data_agent.json");
const colors = scaleOrdinal(schemeCategory10).range();

const SidebarAgentlar = () => {
  const [name, setName] = useState("");
  const selector = useSelector((state) => state?.payload?.payload?.data);
  const [viewConsul, setConsul] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [data_agent, setData_agent] = useState([]);
  const [data, setData] = useState();
  const [fixEnd, setFix] = useState(false);
  const [agents, setAgents] = useState();
  const [count, setCount] = useState(0); // modal
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const [isAct, setIsAct] = useState(false);
  const [value, setValue] = useState("all");
  const [searchName, setSearchName] = useState("");
  const getManagerRayting = async () => {
    try {
      const res = await Axios.get(
        `company/director/statistics/manager/third_block/`
      );

      setData_agent(res.data);
    } catch (error) {}
  };
  const getAgent = async () => {
    try {
      const res = await Axios.get("/company/company-user");

      const results = res?.data?.results;
      setAgents(results);
    } catch (error) {}
  };
  const getManager = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `company/branch-manager/?search=${searchName ? searchName : " "}`
      );
      const results = res?.data?.results;
      setAgents(results);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setFix(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((state) => ({ ...state, [name]: value }));
  };
  const handleClose = () => {
    setOpen(false);
  };
  const errorPassword = () => {
    Swal.fire({
      icon: "error",
      text: "password error",
    });
  };
  const errorMassage = (props) => {
    Swal.fire({
      icon: "error",
      text: `${props} error`,
    });
  };
  const formData = new FormData();
  formData.append("first_name", data?.first_name);
  formData.append("last_name", data?.last_name);
  formData.append("middle_name", data?.middle_name);
  formData.append("phone_number", data?.phone_number);
  formData.append("password_1", data?.password_1);
  formData.append("role", data?.role);
  formData.append("password_2", data?.password_2);
  const setAgent = async () => {
    if (data?.password_1 == data?.password_2)
      try {
        const res = await Axios.post("/company/company-user/", formData);
      } catch (error) {}
    getAgent();
    handleClose();
  };
  const setManager = async () => {
    if (data?.password_1 == data?.password_2) {
      try {
        const res = await Axios.post(`company/branch-manager/`, formData);
      } catch (error) {
        errorMassage(error);
      }
      getManager();
      handleClose();
    } else {
      errorPassword();
    }
  };
  const isActiveId = async (id, is_active) => {
    try {
      const res = await Axios.patch(`/company/branch-manager/${id}/`, {
        is_active: !is_active,
      });
    } catch (error) {}
    getManager();
  };

  useEffect(() => {
    getManager();
  }, [searchName]);

  useEffect(() => {
    getManagerRayting();
    {
      (selector.role == "branch_director" && getManager()) || getAgent();
    }
  }, []);
  return (
    <div className="consultAgennts">
      <Sidebar>
        <div className="asos">
          <div className="Up_navbar">
            <h4>Агенты</h4>
            <div className="user_info">
              <img src={userpic} alt="" />
              <div>
                <p>
                  {selector?.first_name} {selector?.last_name}
                </p>
                <h5>
                  {(selector?.role == "branch_director" &&
                    "директор филиала") ||
                    selector?.role}
                </h5>
              </div>
            </div>
          </div>
          <div className="SidebarAgentlar">
            <button onClick={handleOpen}>Добавить Менеджер</button>
            <div className="settSearch">
              <div className="searchUniv">
                <img src={search_icon} alt="" />
                <input
                  onChange={(e) => setSearchName(e.target.value)}
                  type="text"
                  placeholder="Поиск сотрудника"
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
            <div className="univerList tableManager">
              <h5>Ваши Менеджер</h5>
              <table>
                <thead>
                  <tr>
                    <th className="firstTD">ФИО</th>
                    <th>Позиция</th>
                    <th> телефона</th>
                    <th>Число клие...</th>
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
                    agents?.map((value, index) => {
                      const {
                        first_name,
                        last_name,
                        phone_number,
                        id,
                        is_active,
                        applicant_count,
                      } = value;

                      return (
                        <tr>
                          <td className="firstTD">
                            {first_name} - {last_name}
                          </td>
                          <td>
                            {(value?.role && `${value?.role}`) || "Менеджер"}
                          </td>
                          <td>{phone_number}</td>
                          <td className="priDoc">{applicant_count}</td>
                          <td>
                            <button
                              style={{
                                backgroundColor: is_active ? "blue" : "#C6C6C6",
                                color: "white",
                                padding: "5px 10px",
                                border: "none",
                                borderRadius: "10px",
                                fontSize: "22px",
                                outline: "none",
                              }}
                              onClick={() => isActiveId(id, is_active)}
                            >
                              {(is_active && "активный") || "неактивный"}
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
            <div className="raytingAgentBlock block_chart vertical_charts">
              <div className="raytingAgentTitle">
                <p>Рейтинг агентов по кол-во договоров</p>
              </div>
              <div className="diag">
                <ResponsiveContainer>
                  <ComposedChart
                    layout="vertical"
                    data={data_agent}
                    margin={{
                      top: 20,
                      right: 100,
                      bottom: 0,
                      left: -30,
                    }}
                  >
                    <CartesianGrid strokeDasharray="10 10" horizontal="" />
                    <XAxis type="number" />
                    <YAxis dataKey="students" type="category" scale="band" />
                    <Tooltip />
                    <Bar dataKey="students" barSize={20} fill="#413ea0">
                      <LabelList dataKey="manager" position="right" />
                      {data_agent.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                      ))}
                    </Bar>
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* end univerList */}
            {/* Filter */}
            {(selector.role == "branch_director" && (
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
                    {/* <p>Выберите дату вступления на работу</p> */}
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
                            label="активный"
                          />
                          <FormControlLabel
                            value="false"
                            control={<Radio color="primary" />}
                            label="неактивный"
                          />
                        </RadioGroup>
                      </FormControl>
                    </div>
                    <button onClick={getManager}>Применить</button>
                  </div>
                  {/* end FilterUniver */}
                </div>
              </div>
            )) || (
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
                    <p>Выберите дату вступления на работу</p>
                    <div className="datapickBlock">
                      <div>
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          placeholderText="sana"
                        />
                      </div>
                    </div>
                    <p>Выберите семестр</p>
                    <div className="selectCountry">
                      <select name="" id="">
                        <option value="">Летний</option>
                        <option value="">Летний</option>
                        <option value="">Летний</option>
                        <option value="">Летний</option>
                      </select>
                    </div>
                    <label className="custom-checkbox checkSt1">
                      <input type="checkbox" name="" id="" />
                      <span></span>
                      <p>Поступившие</p>
                    </label>
                    <label className="custom-checkbox checkSt2">
                      <input type="checkbox" name="" id="" />
                      <span></span>
                      <p>Непоступившие</p>
                    </label>

                    <div className="viewConsult">
                      <p>Показать консультанта</p>
                      {viewConsul ? (
                        <div
                          className="actview"
                          onClick={() => {
                            setConsul(!viewConsul);
                          }}
                        >
                          <div></div>
                        </div>
                      ) : (
                        <div
                          className="passview"
                          onClick={() => {
                            setConsul(!viewConsul);
                          }}
                        >
                          <div></div>
                        </div>
                      )}
                    </div>

                    <button>Применить</button>
                  </div>
                  {/* end FilterUniver */}
                </div>
              </div>
            )}
            {(selector.role == "branch_director" && (
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
                      <h5>Добавить сотрудника</h5>
                      <div>
                        <label> Ваша Имя </label>
                        <input
                          type="text"
                          name="first_name"
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>
                      <div>
                        <label>Ваша фамилия </label>
                        <input
                          type="text"
                          name="last_name"
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>
                      <div>
                        <label>Отчество </label>
                        <input
                          type="text"
                          name="middle_name"
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>
                      <div>
                        <label>Логин</label>
                        <input
                          type="text"
                          name="phone_number"
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>
                      <div>
                        <label>Пароль</label>
                        <input
                          type="password"
                          name="password_1"
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>
                      <div>
                        <label>Пароль</label>
                        <input
                          type="password"
                          name="password_2"
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>
                      <button onClick={() => setManager()}>Добавить</button>
                    </div>
                  </div>
                </Fade>
              </Modal>
            )) || (
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
                      <h5>Добавить сотрудника</h5>
                      <div>
                        <label> Ваша Имя </label>
                        <input
                          type="text"
                          name="first_name"
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>
                      <div>
                        <label>Ваша фамилия </label>
                        <input
                          type="text"
                          name="last_name"
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>
                      <div>
                        <label>Отчество </label>
                        <input
                          type="text"
                          name="middle_name"
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>
                      <div>
                        <label>Роль в компании</label>
                        <select
                          name="type"
                          onChange={(e) => handleInputChange(e)}
                          name="role"
                        >
                          <option>Директор</option>
                          <option>менеджер </option>
                          <option>нотариус </option>
                          <option>партнер</option>
                          <option>Бухгалтер</option>
                        </select>
                      </div>
                      <div>
                        <label>Логин</label>
                        <input
                          type="text"
                          name="phone_number"
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>
                      <div>
                        <label>Пароль</label>
                        <input
                          type="password"
                          name="password_1"
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>
                      <div>
                        <label>Пароль</label>
                        <input
                          type="password"
                          name="password_2"
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>
                      <button onClick={() => setAgent()}>Добавить</button>
                    </div>
                  </div>
                </Fade>
              </Modal>
            )}

            {/* end Filter */}
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default SidebarAgentlar;
