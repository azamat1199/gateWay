import React, { useState, useEffect } from "react";
import ManegerSidebar from "../ManagerSidebar";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { Button } from "reactstrap";
import Axios from "../../../utils/axios";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Pagination } from "@material-ui/lab";
import TablePagination from "@material-ui/core/TablePagination";
import userpic from "../../../assets/icon/userpic.svg";
import filter from "../../../assets/icon/Filter.svg";
import search from "../../../assets/icon/Search2.svg";
import close from "../../../assets/icon/close.svg";
import close_modal from "../../../assets/icon/close_modal.svg";
import Modal from "@material-ui/core/Modal";
import Loader from "react-js-loader";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import styled from "styled-components";
const ChangeUniver = () => {
  const history = useHistory();
  const selector = useSelector((state) => state?.payload?.payload?.data);
  const [filterCountry, setFilterCountry] = useState([]);
  const [open, setOpen] = useState(false);
  const [universities, setUniversities] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [document, setDocument] = useState([]);
  const [educationType, setEducationType] = useState([]);
  const [selectedEdcuation, setSelectedEdu] = useState("");
  const [univerId, setUniverId] = useState("");
  const [selectedDegree, setSelectedDegree] = useState("");
  const [value, setValue] = React.useState("all");
  const [needToPay,setNeedToPay] = useState(false)
  const [filters, setfilters] = useState(false);
  const [selectedAmount,setSelectedAmount] = useState('')
  const [key, setkey] = React.useState("");
  const [faculties, setFaculties] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [degreeList, setDegreeList] = useState([]);
  const [majorList, setMajor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMajor,setSelectedMajor] = useState('')
  const [searchName, setSearchName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [userData, setUserData] = useState([]);
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
  const handleClose = () => {
    setOpen(false);
  };
  const fetchFacultyById = async () => {
    try {
      const res = await Axios.get(`/university/faculty/${selectedFaculty}/`);
      const {status,data} = res;
      console.log(res);
      if (status === 200) {
        setSelectedAmount(data.service_price);
      }
    } catch (err) {}
  };
console.log(selectedFaculty);
  const fetchUniversities = async () => {
    try {
      const res = await Axios.get("/university/");
      const { status, data } = res;
      const { results } = data;
      console.log(res);
      if (status === 200) {
        setUniversities(results);
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDegreeList = async () => {
    const { degree_name } = universities;
    try {
      const res = await Axios.get(
        `/university/degree/?university_id=${universities}`
      );
      console.log(res);
      const { status, data } = res;
      const { results } = data;
      if (status == 200) {
        setDegreeList(results);
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
        `applicant/list/?status=rejected&checked=${value}&date-from=${
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

  // useEffect(() => {
  //   userList();
  // }, [searchName]);

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
  const filterById = (id) => {
    setOpen(true);
    const data = users.filter((item) => item.id === id);
    setUserData(data);
  };
  
 console.log(userData);
  const currentAmount = userData[0]?.amount 
  const resultAmount = selectedAmount - currentAmount;
  console.log(resultAmount);
  console.log(currentAmount,selectedAmount);
  const handler = (userId) => {
    setFavourite(userId).then(() => history.push(`/university/${userId}`));
  };
  const fetchDegree = async () => {
    try {
      const res = await Axios.get(
        `/university/degree/?university_id=${univerId}`
      );
      console.log(res);
      const { status, data } = res;
      if (status === 200) {
        const { results } = data;
        setDegreeList(results);
      }
      console.log(res);
    } catch (error) {}
  };
  const fetchEducationType = async () => {
    try {
      const res = await Axios.get(
        `/university/education-type/?university_id=${univerId}`
      );
      const { status, data } = res;
      const { education_types } = data;
      if (status == 200) {
        setEducationType(education_types);
      }
      console.log(res);
    } catch (error) {}
  };
  const fetchFaculties = async () => {
    try {
      const res = await Axios.get(
        `/university/faculty/?university_id=${univerId}&degree=${selectedDegree}&education_type=${selectedEdcuation}`
      );
      const { status, data } = res;
      const { results } = data;
      if (status == 200) {
        setFaculties(results);
      }
      console.log(res);
    } catch (error) {
      console.log(error.response);
    }
  };
  const fetchMajorList = async () => {
    try {
      const res = await Axios.get(
        `/university/major/?faculty=${selectedFaculty}&education_type=${selectedEdcuation}`
      );
      const { status, data } = res;
      const { results } = data;
      if (status == 200) {
        setMajor(results);
      }
    } catch (error) {
      console.log(error);
    }
  }

console.log(selectedMajor);
const changeUserUniver = async(id)=>{
  setLoading(true)
  console.log(id);
  try {
    const res = await Axios.patch(`/applicant/update/${id}/`,{
      major:selectedMajor,
      need_to_pay:needToPay
    })
    console.log(
      res
    );
    setLoading(false)
  } catch (error) {
    console.log(error);
    setLoading(error)
  }
}
useEffect(()=>{
  fetchMajorList()
  fetchFacultyById()
},[selectedFaculty])
  useEffect(() => {
    userList();
  }, []);
  useEffect(()=>{
    fetchUniversities()
  },[open === true])
  useEffect(()=>{
    fetchFaculties()
    
  },[selectedEdcuation])
  useEffect(()=>{
    fetchDegree()
    fetchEducationType()
  },[univerId])
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
                {selector?.first_name} {selector?.last_name}
              </h1>
              <h2>{selector?.role}</h2>
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
                  {(selector?.role == "supermanager" && <th>Менеджер</th>) ||
                    null}
                  {(selector?.role == "supermanager" && (
                    <th>Телефон менеджера</th>
                  )) ||
                    null}
                  <th>Дата</th>
                  <th>изменение</th>
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
                              {v?.first_name} {v?.last_name}
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
                            <th>
                              <button
                                style={{
                                  background: "#0d5372",
                                  color: "white",
                                  padding: "10px",
                                  borderRadius: "4px",
                                }}
                                onClick={() => filterById(v.id)}
                              >
                                сменить универ
                              </button>
                            </th>
                          </tr>
                        );
                      })}
                  </tbody>
                )}
              </table>
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
                  <UniverChangeContainer>
                    <div className="heading">
                      <h4>Изменить университет </h4>
                      <img
                        src={close_modal}
                        onClick={() => setOpen(!open)}
                        alt=""
                      />
                    </div>
                    <div className="mainContainer">
                      <div className="inputContainer">
                        <label htmlFor="univer">Университет</label>
                        <select
                          name="univer"
                          onChange={(e) => setUniverId(e.target.value)}
                        >
                          <option selected value={userData[0]?.id}>
                            {" "}
                            {userData[0]?.university}
                          </option>
                          {universities.map((item) => {
                            const { id, name } = item;
                            return <option value={id}>{name}</option>;
                          })}
                        </select>
                      </div>
                        <div className="inputContainer" style={{flexDirection:'row',justifyContent:'space-between'}}>
                          <div>
                            <label htmlFor="univer">Степень</label>
                            <select name="degree" onChange={e=> setSelectedDegree(e.target.value)} >
                              <option selected value=''>{userData[0]?.degree}</option>
                              {
                               degreeList.map((item,index)=>{
                                 const {id,title} = item
                                 return(
                                   <option  selected={index === 0} value={id}>{title}</option>
                                 )
                               })
                               }
                            </select>
                          </div>
                          <div>
                            <label htmlFor="univer">Тип обучения</label>
                            <select  name="edu" onChange={e=> setSelectedEdu(e.target.value)} >
                              <option selected value="">{
                                    userData[0]?.major?.education_type === "full_time"
                                    ? "Очное обучение "
                                    : userData[0]?.major?.education_type === "part_time"
                                    ? "Заочное обучение "
                                    : userData[0]?.major?.education_type === "distance"
                                    ? "Дистанционное обучение"
                                    : "Нет данных"
                                    }
                              </option>
                                {educationType.map(item=>{
                                return(
                                  <>
                                    <option value={item}>{ 
                                    item === "full_time"
                                    ? "Очное обучение "
                                    : item === "part_time"
                                    ? "Заочное обучение "
                                    : item === "distance"
                                    ? "Дистанционное обучение"
                                    : "Нет данных"}
                                    </option>
                                  </>
                                )
                              }
                              )
                            }
                            </select>
                          </div>
                        </div>
                        <div className="inputContainer">
                          <label htmlFor="univer">Факультет</label>
                           <select name="faculty" onChange={e=> setSelectedFaculty(e.target.value)} >
                             <option selected value="">{userData[0]?.major?.faculty_name}</option>
                             {faculties.map(item=>{
                               const {id,name} = item
                               return(
                                 <option value={id}>{name}</option>
                               )
                             })}
                           </select>
                        </div>
                        <div className="inputContainer">
                          <label htmlFor="univer">Направление</label>
                           <select name="major" onChange={e=>setSelectedMajor(e.target.value) }>
                             <option selected value="">{userData[0]?.major?.name}</option>
                             {majorList.map(item=>{
                               const {id,faculty_name} = item;
                               return(
                                 <option value={id}>{faculty_name}</option>
                               )
                             })}
                           </select>
                        </div>

                        {
                          resultAmount > 0 ? 
                          <CheckBoxContainer >
                              <input onChange={()=> setNeedToPay(!needToPay)} type="checkbox" id="payment"/>
                              <label htmlFor="payment">Нужно доплачивать: {resultAmount}</label>
                          </CheckBoxContainer>
                        :
                        ''
                        }
                      
                        <button onClick={()=> changeUserUniver(userData[0]?.id)}>Submit</button>
                       </div>
                    </UniverChangeContainer>
                </Fade>
              </Modal>
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
}

export default ChangeUniver;

const UniverChangeContainer = styled.div`
  height:550px;
  width:520px;
  border-radius: 5px;
  background: white;
  .heading {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 20px 0;
    h4 {
      font-size: 22px;
    }
    img {
      position: absolute;
      right: 10px;
      cursor: pointer;
    }
  }
  .mainContainer {
    height: calc(100% - 66.66px);
    display: flex;
    align-items: center;
    justify-content: start;
    position: relative;
    flex-direction: column;
    .inputContainer {
      display: flex;
      flex-direction: column;
      width: 80%;
      justify-content: space-around;
      margin: 8px 0;
      label{
        font-weight: 600;
        margin-bottom: 8px;
      }
      select{
        height: 40px;
        border-radius: 4px;
        max-width: 100%;
        outline: none;
        option{
          font-size: 16px;
          font-weight:600;
        }
      }
      div {
        display: flex;
        flex-direction: column;
        width: 48%;
        select {
          outline: none;
          height: 40px;
          border-radius: 4px;
        }
      }
    }
    button {
      width: 80%;
      background: #00587f;
      border-radius: 10px;
      height: 60px;
      position: absolute;
      bottom: 20px;
      color: white;
      border: none;
      cursor: pointer;
      font-size:20px;
     }
   }
`

const CheckBoxContainer = styled.div`
  display: flex;
  width: 80%;
  align-items:center;
   input {
    height: 18px;
    width: 18px;
   }
   label{
    margin-left: 15px;
   }
  `
