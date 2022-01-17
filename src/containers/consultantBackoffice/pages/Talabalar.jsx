import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Loader from "react-js-loader";
import TablePagination from "@material-ui/core/TablePagination";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useSelector } from "react-redux";
import userpic from "../../../assets/icon/userpic.svg";
// import img
import search_icon from "../../../assets/icon/search.svg";
import filterSvg from "../../../assets/icon/Filter.svg";
import close_modal from "../../../assets/icon/close_modal.svg";
import closeFilter from "../../../assets/icon/close.svg";
// import css
import styled from "styled-components";
import "../../../style/css/SidebarUniverstitet.css";
import "../../../style/css/fakultet.css";
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from "./SidebarConsult";
import Axios from "../../../utils/axios";
import { useHistory } from "react-router";


const Talabalar = () => {
  const selector = useSelector((state) => state.payload.payload.data);
  const [students, setStudents] = useState([]);
  const [chek, setChek] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [password, setPassword] = useState("");
  const [select, setSelect] = useState([]);
  const [radio, setRadio] = useState(false);
  const [univer, setUniver] = useState([]);
  const [file, setFile] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [count , setCount] = useState()
  const [endDate, setEndDate] = useState(null);
  const [data, setData] = useState(null);
  const [country, setContry] = useState();
  const [facultetId, setFacultetId] = useState();
  const [univerId, setUniverId] = useState();
  const [faculty, setFaculty] = useState([]);
  const [type_education, setTypeEducation] = useState();
  const [founding_year, setFoundingYear] = useState();
  const [managerList,setManager] = useState([])
  const [searchName,setSearchName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [managerId,setManagerId] = useState('')
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((state) => ({ ...state, [name]: value }));
  };
  const handleRadio = (e) => {
    const { name, value } = e.target;
    setRadio({ [name]: value });
  };
  // modal
  const [open_change, setOpen_change] = React.useState(false);
  const [fixEnd, setFix] = useState(false);
  const history = useHistory();
  const year = founding_year?.getFullYear();
  const month = founding_year?.getMonth();
  const day = founding_year?.getDate();
  const date = year + "-" + month + "-" + day;

  const formData = new FormData();
  formData.append("first_name", data?.first_name);
  formData.append("middle_name", data?.middle_name);
  formData.append("last_name", data?.last_name);
  formData.append("phone_number", data?.phone_number);
  formData.append("birthday", date);
  formData.append("passport_number", data?.passport_number);
  formData.append("citizenship", data?.country);
  formData.append("city", data?.country);
  formData.append("address", "65465465446");
  formData.append("ref_code", data?.ref);
  formData.append("agree_with_agreement", chek);
  formData.append("password_1", data?.password_1);
  formData.append("password_2", data?.password_1);

  const fethcStudents = async () => {
    setLoading(true)
    try {
      const res = await Axios.get(`/applicant/list/?limit=${rowsPerPage}`);
      const { status, data } = res;
      const { results , count} = data;
      if (status === 200) {
        setStudents(results);
        setCount(count)
      }
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };
  const handlePageChange = async(e, newPage) => {
    setPage(newPage);
    setLoading(true)
     try {
        const res = await Axios.get(`/applicant/list/?limit=${rowsPerPage}&offset=${newPage*rowsPerPage}`);
        const { status, data } = res;
        const { results } = data;
        if (status == 200) {
          setStudents(results);
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
  const handleSelect = (e) => {
    const { name, value } = e.target;
    setSelect((prev) => ({ ...prev, [name]: value }));
  };

  const getUniverId = async () => {
    try {
      const res = await Axios.get("/university/");
      const { status, data } = res;
      const { results } = data;
      if (status === 200) {
        setUniver(results);
      }
    } catch (error) {}
  };

  const fetchFaculty = async () => {
    try {
      const res = await Axios.get(`/university/${univerId}`);
      const { status, data } = res;
      if (status === 200) {
        const { faculties } = data;
        setFaculty(faculties);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getUniverId();
  }, []);
  useEffect(() => {
    fetchFaculty();
  }, [univerId]);
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
  const setDataFilter = async () => {
    setLoading(true);
    const sd = startDate?.getDate();
    const sm = startDate?.getMonth() + 1;
    const sy = startDate?.getFullYear();
    const ed = endDate?.getDate();
    const em = endDate?.getMonth() + 1;
    const ey = endDate?.getFullYear();
    try {
      const res = await Axios.get(
        `/applicant/list/?has_univer=${
          radio.has_univer
        }&date-from=${
          startDate ? `${sd}.${sm}.${sy}` : ""
        }&date-to=${endDate ? `${ed}.${em}.${ey}` : ""}&search=${
          searchName ? searchName : ""
        }?manager=${managerId}`  );
      const { status, data } = res;
      const { results } = data;
      if (status === 200) {
        setStudents(results);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setFix(false);
  };
    useEffect(()=>{
      fethcStudents()
    },[rowsPerPage])
    useEffect(() => {
      fethcStudents();
      handleManager()
    }, [])
    useEffect(() => {
      setDataFilter()},[searchName])
 
  // modal
  return (
    <div className="consultTaalabalar">
      <Sidebar>
        <div className="asos">
          <div className="Up_navbar">
            <h4>Студенты</h4>
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

          <div className="SidebarUniverstitet">
            {/* <button onClick={handleOpen}>Добавить студента</button> */}
            <div className="settSearch">
              <div className="searchUniv">
                <img src={search_icon} alt="" />
                <input type="text" onChange={(e)=>setSearchName(e.target.value)} placeholder="Поиск Студенты" />
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
            <div className="univerList talabalar" id="scroll_bar">
              <table>
                <thead>
                  <tr>
                    <th className="px-3">N</th>
                    <th>ФИО</th>
                    <th>Факультет</th>
                    <th>Университет</th>
                    <th>Номер телефона</th>
                    <th>Номер контракта</th>
                    <th>Дата контракта</th>
                    {/* <th>Оплата за услуги</th> */}
                    {(selector.role == "branch_director" && <span></span>) || (
                      <th>Филиал</th>
                    )}
                    <th>Реферал</th>
                    <th>Менеджер</th>
                    <th>Менеджер телефона</th>
                    <th>Статус</th>
                    <th></th>
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
                    students?.map((item, i) => {
                      const {
                        id,
                        first_name,
                        last_name,
                        phone_number,
                        documents_filled,
                        university,
                        faculty,
                        university_date,
                        branch,
                        contract,
                        referral,
                        manager,
                        step
                      } = item;

                      return (
                        <tr key={id}>
                          <td className="px-3">{i + 1}</td>
                          <td className="firstTD">
                            {first_name} - {last_name}
                          </td>
                          <td>{faculty}</td>
                          <td>{university}</td>
                          <td>{phone_number}</td>
                          <td>{contract}</td>
                          <td>{university_date?.slice(0, 10)} </td>
                          {/* <td>{"sorash kerak"}</td> */}
                          <td>
                            {" "}
                            {(selector.role == "branch_director" && (
                              <span></span>
                            )) ||
                              branch}
                          </td>
                          <td>{referral ? referral : 'Реферала нету'}</td>

                          <td>
                            {manager?.first_name} {manager?.last_name}
                          </td>
                          <td>{manager?.phone_number}</td>
                          <td>{step === 'manager_checking' || step === 'notary' || step === 'university' || step=== 'completed'|| step === 'rejected' ? 'подтвержденный':'не подтверждено'}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
              <TablePagination
                rowsPerPageOptions={[20,40,60]}
                component="table"
                count={count}
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
                  <p>Выберите манажер</p>
                  <FormFilter>
                  <div className="selectCountry">
                      <select name="manager" onChange={(e)=>setManagerId(e.target.value) }>
                        <option value='' selected>Выберите манажер</option>
                        {managerList.map(item=>{
                          const {id,first_name,last_name} = item
                          return(
                            <option value={id}>{first_name} {last_name}</option>
                          )
                        })}
                      </select>
                    </div>
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
                        <select
                          name="university"
                          onChange={(e) => setUniverId(e.target.value)}
                        >
                          {univer?.map((item) => {
                            const { id, name } = item;
                            return <option value={id}>{name}</option>;
                          })}
                        </select>
                      </div>
                      <p>Выберите факультет</p>
                      <div className="selectCountry">
                        <select
                          name="faculty"
                          onChange={(e) => setFacultetId(e.target.value)}
                          id=""
                        >
                          {faculty?.map((item) => {
                            const { id, name } = item;
                            return <option value={id}>{name}</option>;
                          })}
                        </select>
                      </div>
                      <div>
                        <p>Выберите тип образования</p>
                        <div className="selectCountry">
                          <select
                            onChange={(e) => setTypeEducation(e.target.value)}
                            name="education_type"
                            id=""
                          >
                            <option value="full_time">очное</option>
                            <option value="distance">дистанционный</option>
                            <option value="part_time">Заочное обучение</option>
                            <option value="night_time">Вечернее обучение</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </FormFilter>
                  <button onClick={() => setDataFilter()}>Применить</button>
                </div>
                {/* end FilterUniver */}
              </div>
            </div>
            {/* modal one */}
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
                <div
                  className="addNewUniverModalUniver talaba_modal"
                  id="scroll_bar"
                >
                  <img onClick={handleClose} src={close_modal} alt="" />
                  <div className="modalContainer">
                    <h5>Добавить нового студента</h5>
                    <div>
                      <label>Ваша имя</label>
                      <input
                        type="text"
                        name="first_name"
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                      />
                    </div>
                    <div>
                      <label>Ваша фамилия</label>
                      <input
                        type="text"
                        name="middle_name"
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                      />
                    </div>
                    <div>
                      <label>Отчество</label>
                      <input
                        type="text"
                        name="last_name"
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                      />
                    </div>

                    <div>
                      <label>Страна</label>
                      <select
                        name="country"
                        onChange={(e) => handleInputChange(e)}
                      >
                        {country?.map((value) => {
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
                      <label>номер и серия паспорта</label>
                      <input
                        type="text"
                        name="passport_number"
                        placeholder="AA0000000"
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                      />
                    </div>
                    <div className="modalDataPick">
                      <label>день рождения</label>
                      <DatePicker
                        selected={founding_year}
                        onChange={(e) => setFoundingYear(e)}
                        placeholderText="sana"
                      />
                    </div>
                    <div>
                      <label>Номер телефона</label>
                      <input
                        type="text"
                        name="phone_number"
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                      />
                    </div>
                    <div>
                      <label>Пароль</label>
                      <input
                        type="password"
                        name="password_1"
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                      />
                    </div>
                    <div>
                      <label>Реф код</label>
                      <input
                        type="text"
                        name="ref"
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                      />
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                      <label className="w-100">согласен с соглашением</label>
                      <input
                        type="checkbox"
                        name="agree_with_agreement"
                        className="d-block"
                        onChange={() => {
                          setChek((chek) => !chek);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Fade>
            </Modal>
            {/* end Filter */}
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default Talabalar;
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
