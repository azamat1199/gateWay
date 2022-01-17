import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import TablePagination from "@material-ui/core/TablePagination"
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
  const phoneRef = useRef()
  const [isAct, setIsAct] = useState(false);
  const [value, setValue] = useState("all");
  const [searchName, setSearchName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [counts,setCounts] = useState()
  const [price, setPrice] = useState();
  const getManagerRayting = async () => {
    try {
      const res = await Axios.get(
        `company/director/statistics/manager/third_block/`
      );

      setData_agent(res.data);
    } catch (error) {}
  };
  const getAgent = async () => {
    setLoading(true)
    try {
      const res = await Axios.get(`/company/company-user/?search=${searchName ? searchName : " "}&limit=${rowsPerPage}`);
      const results = res?.data?.results;
      const numbers = res?.data?.count
      setCounts(numbers)
      setAgents(results);
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  };
  const handlePageChange = async(e, newPage) => {
    setPage(newPage);
    setLoading(true)
     try {
        const res = await Axios.get(`/company/company-user/?limit=${rowsPerPage}&offset=${newPage*rowsPerPage}`);
        const { status, data } = res;
        const { results } = data;
        if (status == 200) {
          setAgents(results);
        }
        console.log(res);
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
  };

  const handleChangeRowsPerPage = async (event) => {
    console.log(rowsPerPage);
    console.log(event.target.value);
    setRowsPerPage(+event.target.value);
    setPage(0);
    }

  const getManager = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `/company/branch-agent/?search=${searchName ? searchName : " "}`
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
  const getPrice = (e) => {
    const { name, value } = e.target;
    setPrice((state) => ({ ...state, [name]: value }));
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((state) => ({ ...state, [name]: value }));
    if(name !== 'phone_number') return 
     setData({...data,phone_number:`+${phoneRef?.current?.value}`})
  };console.log(data);


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
    setOpen(false)
       setLoading(true)
      try {
        const res = await Axios.post("/company/company-user/", formData);
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    setPriceDoc();
    getAgent();
    handleClose();
  };
  const setManager = async () => {
    if (data?.password_1 == data?.password_2) {
      setLoading(true)
      try {
        const res = await Axios.post(`company/branch-agent/`, formData);
        setLoading(false)
      } catch (error) {
        errorMassage(error);
        setLoading(false)
      }
      getManager();
      handleClose();
    } else {
      errorPassword();
    }
  };
  const setPriceDoc = async () => {
    try {
      const res = await Axios.post("/company/notary-price/", price);
    } catch (error) {}
  };
  const isActiveId = async (id, is_active) => {
    try {
      const res = await Axios.patch(`/company/branch-agent/${id}/`, {
        is_active: !is_active,
      });
    } catch (error) {}
    getManager();
  };

  useEffect(() => {
    
      if(selector.role == "director") {
        getAgent()  
      } 
      else{ getManager();}
    
  }, [searchName]);
console.log(phoneRef?.current?.value);
  useEffect(() => {
    getManagerRayting();
    console.log(selector.role);
    if(selector.role == "director") {
      getAgent()  
    } 
    else{ getManager();}
  }, []);
  return (
    <div className="consultAgennts">
      <Sidebar>
        <div className="asos">
          <div className="Up_navbar">
            <h4>Агенты</h4>
            <div className="user_info">
            {loading ? (
                    <Loader
                      type="spinner-circle"
                      bgColor={"#FFFFFF"}
                      color={"#FFFFFF"}
                      size={80}
                    />):
              <img src={userpic} alt="" />
            }
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
            {(selector?.role == "branch_director" && (
              <button onClick={handleOpen}>Добавить Менеджер</button>
            )) || <button onClick={handleOpen}>Добавить Агенты</button>}

            <div className="settSearch">
              <div className="searchUniv">
                <img src={search_icon} alt="" />
                <input
                  onChange={(e) => setSearchName(e.target.value)}
                  type="text"
                  placeholder="Поиск сотрудника"
                />
              </div>
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
                    {(selector?.role == `director` && <span></span>) || (
                      <th>Число клие...</th>
                    )}
                    
                    {(selector?.role == `director` && <span></span>) || (
                  <th>статус</th>
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
                    agents?.map((value, index) => {
                      const {
                        first_name,
                        last_name,
                        phone_number,
                        id,
                        is_active,
                        middle_name,
                        applicant_count,
                      } = value;

                      return (
                        <tr>
                          <td className="firstTD">
                          {last_name} - {first_name} - {middle_name} 
                          </td>
                          <td
                            style={{
                              display:
                                (`${value?.role}` == "manager" && "flex") ||
                                "none",
                            }}
                          >
                            Менеджер
                          </td>
                          <td
                            style={{
                              display:
                                (`${value?.role}` == "branch_director" &&
                                  "flex") ||
                                "none",
                            }}
                          >
                            директор филиала
                          </td>
                          <td
                            style={{
                              display:
                                (`${value?.role}` == "partner" && "flex") ||
                                "none",
                            }}
                          >
                            партнер
                          </td>
                          <td
                            style={{
                              display:
                                (`${value?.role}` == "agent" && "flex") ||
                                "none",
                            }}
                          >
                            агент
                          </td>
                          <td
                            style={{
                              display:
                                (`${value?.role}` == "supermanager" &&
                                  "flex") ||
                                "none",
                            }}
                          >
                            суперменеджер
                          </td>
                          <td
                            style={{
                              display:
                                (`${value?.role}` == "accountant" && "flex") ||
                                "none",
                            }}
                          >
                            бухгалтер
                          </td>
                          <td
                            style={{
                              display:
                                (`${value?.role}` == "director" && "flex") ||
                                "none",
                            }}
                          >
                            директор
                          </td>
                          <td
                            style={{
                              display:
                                (`${value?.role}` == "notary" && "flex") ||
                                "none",
                            }}
                          >
                            notary
                          </td>
                          <td>{phone_number}</td>
                          <td className="priDoc">{applicant_count}</td>
                          {(selector?.role == `director` && <span></span>) || (
                            <td className='c'>
                              <button
                                style={{
                                  backgroundColor: is_active
                                    ? "blue"
                                    : "#C6C6C6",
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
                          )}
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
              <TablePagination
              rowsPerPageOptions={[20,40,60]}
              component="table"
              count={counts}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
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
                        <label>Имя </label>
                        <input
                          type="text"
                          name="first_name"
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>
                      <div>
                        <label>фамилия </label>
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
                        <label>Номер телефона</label>
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
                          <option value="" selected disabled hidden>выбрать роль</option>
                          <option value="director">Директор</option>
                          <option value="manager">менеджер </option>
                          <option value="notary"> нотариус</option>
                          <option value="partner">партнер</option>
                          <option value="accountant">Бухгалтер</option>
                          <option value="supermanager">супер-менеджер</option>
                        </select>
                      </div>
                      {(data?.role == "notary" && (
                        <div>
                          <label>пасспорт цена</label>
                          <input
                            type="text"
                            name="passport_confirmed"
                            onChange={(e) => getPrice(e)}
                          />
                        </div>
                      )) ||
                        ""}
                      {(data?.role == "notary" && (
                        <div>
                          <label>диплом цена</label>
                          <input
                            type="text"
                            name="diploma_confirmed"
                            onChange={(e) => getPrice(e)}
                          />
                        </div>
                      )) ||
                        ""}
                      {(data?.role == "notary" && (
                        <div>
                          <label> паспорт матер цена</label>
                          <input
                            type="text"
                            name="passport_mother_confirmed"
                            onChange={(e) => getPrice(e)}
                          />
                        </div>
                      )) ||
                        ""}
                      {(data?.role == "notary" && (
                        <div>
                          <label>свидетельство о браке цена</label>
                          <input
                            type="text"
                            name="marriage_cert_confirmed"
                            onChange={(e) => getPrice(e)}
                          />
                        </div>
                      )) ||
                        ""}
                      {(data?.role == "notary" && (
                        <div>
                          <label> рождение сертификат цена</label>
                          <input
                            type="text"
                            name="birth_cert_confirmed"
                            onChange={(e) => getPrice(e)}
                          />
                        </div>
                      )) ||
                        ""}
                      {(data?.role == "notary" && (
                        <div>
                          <label>медицина 063 сертификат цена</label>
                          <input
                            type="text"
                            name="med_063_cert_confirmed"
                            onChange={(e) => getPrice(e)}
                          />
                        </div>
                      )) ||
                        ""}
                      {(data?.role == "notary" && (
                        <div>
                          <label>медицина 086 сертификат цена</label>
                          <input
                            type="text"
                            name="med_086_cert_confirmed"
                            onChange={(e) => getPrice(e)}
                          />
                        </div>
                      )) ||
                        ""}
                      {(data?.role == "notary" && (
                        <div>
                          <label> сертификат ВИЧ цена</label>
                          <input
                            type="text"
                            name="hiv_cert_confirmed"
                            onChange={(e) => getPrice(e)}
                          />
                        </div>
                      )) ||
                        ""}

                      <div style={{position:'relative'}}>
                        <label>Номер телефона</label>
                        <span style={{position: 'absolute',
                            top: '46px',
                            left: '15px',
                            fontSize: '22px'}}>
                              +
                              </span>
                        <input
                          type="text"
                          defaultValue='998'
                          ref={phoneRef}
                          style={{fontSize:'20px'}}
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
