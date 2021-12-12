import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "react-js-loader";
import TablePagination from "@material-ui/core/TablePagination";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// UI modal
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

// import img
import search_icon from "../../../assets/icon/search.svg";
import closeFilter from "../../../assets/icon/close.svg";
import blueStroke from "../../../assets/images/Stroke-blue.svg";
import styled from "styled-components";
// import settings from '../../../assets/icon/settings.svg';
import filterSvg from "../../../assets/icon/Filter.svg";
import close_modal from "../../../assets/icon/close_modal.svg";
import folder_icon from "../../../assets/icon/folder_icon.svg";

// import css
import "../../../style/css/SidebarUniverstitet.css";
import "../../../style/css/fakultet.css";
import Sidebar from "./SidebarConsult";
import Axios from "../../../utils/axios";
import arrow1 from "../../../assets/icon/arrow1.svg";

const Fakultet = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [name, setName] = useState("");
  const [universtitetName, setUniverstitetName] = useState("");
  const [kvota, setKvota] = useState(null);
  const [description, setDescription] = useState("");
  const date = new Date();
  const [degreeId, setDegreeId] = useState();
  const [nowDate, setNowDate] = useState(date);
  const [status, setStatus] = useState("");
  const [degree, setDegree] = useState([]);
  const [count, setCount] = useState();
  const [quota, setQuota] = useState();
  const [price, setPrice] = useState(null);
  const [fixEnd, setFix] = useState(false);
  const [data, setData] = useState();
  const [univerData, setUniverData] = useState();
  const [facultet, setFacultet] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState();

  const fetchData = async () => {
    const data = await Axios.get("university/");
    const datas = data.data.results;
    setUniverData(datas);
    return data;
  };
  const getFacultet = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(`/university/faculty/?limit=${rowsPerPage}`);
      setFacultet(res.data.results);
      setCount(res.data.count);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handlePageChange = async (e, newPage) => {
    setPage(newPage);
    setLoading(true);
    try {
      const res = await Axios.get(
        `/university/faculty/?limit=${rowsPerPage}&offset=${
          newPage * rowsPerPage
        }`
      );
      const { status, data } = res;
      const { results } = data;
      if (status == 200) {
        setFacultet(results);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((state) => ({ ...state, [name]: value }));
  };
  // modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const formData = new FormData();
  formData.append("university", data?.university);
  formData.append("major", data?.university);
  formData.append("name", data?.name);
  formData.append("status", data?.status);
  formData.append("education_type", data?.education_type);
  formData.append("quota", data?.quota);
  formData.append("education_fee", 10);
  formData.append("service_price", data?.service_price);

  const submitFaculty = async (e) => {
    try {
      const res = await Axios.post("/university/faculty/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {}
    handleClose();
    getFacultet();
  };
  const selector = useSelector((state) => state.payload.payload.data);
  const fetchDegree = async () => {
    if (!fixEnd) return;
    try {
      const res = await Axios.get("/university/degree/");
      const { status, data } = res;
      if (status === 200) {
        const { results } = data;
        setDegree(results);
      }
      console.log(res);
    } catch (error) {}
  };
  const filterByGivenData = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `/university/faculty/?deadline=${startDate?.toLocaleDateString()}&degree=${degreeId}&quota=${quota}`
      );
      const { status, data } = res;
      if (status === 200) {
        const { results } = data;
        setFacultet(results);
      }
      setLoading(false);
      setFix(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const filterByInput = async (e) => {
    if (e.length < 1) return;
    setLoading(true);
    try {
      const res = await Axios.get(`/university/faculty/?search=${e}`);
      const { status, data } = res;
      if (status === 200) {
        const { results } = data;
        setFacultet(results);
      }
      setLoading(false);
      console.log(res);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getFacultet();
  }, [rowsPerPage]);
  useEffect(() => {
    fetchData();
    getFacultet();
  }, []);
  useEffect(() => {
    fetchDegree();
  }, [fixEnd]);
  return (
    <div className="consultFakulteet">
      <Sidebar>
        <div className="asos" id="top">
          <div className="Up_navbar">
            <h4>Факультеты</h4>
            <div>
              <img src="https://picsum.photos/70" alt="" />
              <div>
                <h5>
                  {" "}
                  {selector?.first_name} {selector?.last_name}
                </h5>
                <p>{selector?.role}</p>
              </div>
            </div>
          </div>
          <div className="SidebarUniverstitet">
            {/* <button onClick={handleOpen}>Добавить факультет</button> */}
            <div className="settSearch">
              <div className="searchUniv">
                <img src={search_icon} alt="" />
                <input
                  onChange={(e) => filterByInput(e.target.value)}
                  type="text"
                  placeholder="Поиск факультет"
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
            <div className="univerList fakultet" id="scroll_bar">
              <table>
                <thead>
                  <tr>
                    <th className="firstTD">Название</th>
                    <th>Университет</th>
                    <th>Степень</th>
                    <th>Квота</th>
                    <th>Сумма контракта</th>
                    {/* <th>Дедлайн</th> */}
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
                    facultet?.map((iteam) => {
                      const {
                        university_name,
                        major,
                        name,
                        status,
                        degree_name,
                        education_fee,
                        education_type,
                        quota,
                        service_price,
                      } = iteam;

                      return (
                        <tr>
                          <td className="firstTD">{name}</td>
                          <td>{university_name}</td>
                          <td>{degree_name}</td>
                          <td>{quota}</td>
                          <td>${education_fee}</td>
                          {/* <td>450</td> */}
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
                  <div style={{ display: "flex" }}>
                    <div className="datapickBlock">
                      <div>
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          selectsStart
                          startDate={startDate}
                          endDate={endDate}
                        />
                      </div>
                    </div>
                    <InputContainer>
                      <p>Заполните квоту</p>
                      <input
                        onChange={(e) => setQuota(e.target.value)}
                        type="text"
                      />
                    </InputContainer>
                  </div>
                  <p>Выберите факультет</p>
                  <div className="selectCountry">
                    <select
                      name="degree"
                      onChange={(e) => setDegreeId(e.target.value)}
                    >
                      <option selected>Выберите факультет</option>
                      {degree.map((item) => {
                        const { id, title } = item;
                        return <option value={id}>{title}</option>;
                      })}
                    </select>
                  </div>
                  <button onClick={filterByGivenData}>Применить</button>
                </div>
                {/* end FilterUniver */}
              </div>
            </div>
            {/* end Filter */}
          </div>
          <a href="#top" title="Go to top" className="backTop">
            <img src={blueStroke} alt="back to top" />
          </a>
        </div>
      </Sidebar>
    </div>
  );
};

export default Fakultet;

const InputContainer = styled.div`
  position: relative;
  bottom: 10px;
  p {
    position: relative;
    bottom: 10px;
    color: black;
  }
  input {
    font-family: Raleway;
    font-style: normal;
    font-weight: 500;
    letter-spacing: 0.02em;
    color: #7595a3;
    outline: none;
    background: none;
    font-size: 14px;
    width: 95%;
    padding: 11px 18px;
    border: 1px solid #00587f;
    border-radius: 8px;
    text-align: left;
    position: relative;
  }
`;
