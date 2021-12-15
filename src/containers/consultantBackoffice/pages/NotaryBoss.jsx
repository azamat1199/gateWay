import React, { useState, useEffect } from "react";
import userpic from "../../../assets/icon/userpic.svg";
import check from "../../../assets/icon/check1.svg";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import DatePicker from "react-datepicker";
import Axios from "../../../utils/axios";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "react-js-loader";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import TablePagination from "@material-ui/core/TablePagination";
import Sidebar from "./SidebarConsult";
import delet from "../../../assets/icon/delet.svg";
import edit from "../../../assets/icon/edit.svg";
import close from "../../../assets/icon/close-red.svg";
const colors = scaleOrdinal(schemeCategory10).range();

const N_otchot = () => {
  const [key, setkey] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setfilters] = useState(false);
  const [page, setPage] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(null);
  const [passport_confirmedE, setPassport_confirmedE] = useState();
  const [diploma_confirmedE, setDiploma_confirmedE] = useState();
  const [passport_mother_confirmedE, setPassport_mother_confirmedE] =useState();
  const [marriage_cert_confirmedE, setMarriage_cert_confirmedE] = useState();
  const [birth_cert_confirmedE, setBirth_cert_confirmedE] = useState();
  const [med_063_cert_confirmedE, setMed_063_cert_confirmedE] = useState();
  const [med_086_cert_confirmedE, setMed_086_cert_confirmedE] = useState();
  const [hiv_cert_confirmedE, setHiv_cert_confirmedE] = useState();

  const [univerArray, setUniverArray] = useState([]);
  const selector = useSelector((state) => state);
  const { payload } = selector?.payload;
  const { first_name, last_name } = payload?.data;
  const [loading, setLoading] = useState(false);
  const [smth, setSmth] = useState();
  const [permonth, setPermonth] = useState([]);
  const [university, setUniversity] = useState([]);
  const [universities, setUnivresities] = useState([]);
  const [allUniver, setAllUniver] = useState([]);
  const [startDate1, setStartDate1] = useState(null);
  const [startDate2, setStartDate2] = useState(null);
  const [startDate3, setStartDate3] = useState(null);
  const [editPriceData, setEdidPriceData] = useState();
  const [priceData, setPriceData] = useState([]);
  const [newChangeValues, setChengeValues] = useState();
  const handleUniver = (id) => {
    
    setUnivresities(id);
  };
  const [number, setNumber] = useState({
    count: "",
    need_to_translate: "",
    salary: "",
    translated: "",
  });
  
  const nothanks = () => {
    let univer = "";
    for (let i = 0; i < universities.length; i++) {
      univer += `university=${universities[i].id}&`;
      
    }
    setSmth(univer);
  };
  const handlePageChange = (e, newPage) => {
    
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  const fetchUniversities = async () => {
    try {
      const res = await Axios.get("/university/");
      const { status, data } = res;
      if (status === 200) {
        const { results } = data;
        setAllUniver(results);
      }
    } catch (error) {
      
    }
  };
  const fetchFirst = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `/company/director/statistics/notary/first_block/`
      );
      const { status, data } = res;
      if (status === 200) {
        setNumber(data);
      }
      
      setLoading(false);
    } catch (error) {
      
      setLoading(false);
    }
    getPrice();
  };
  const fetchByDay = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `/company/director/statistics/notary/first_block/?day=true`
      );
      const { status, data } = res;
      if (status === 200) {
        setNumber(data);
      }
      
      setLoading(false);
    } catch (error) {
      
      setLoading(false);
    }
  };
  const fetchByWeek = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `/company/director/statistics/notary/first_block/?week=true`
      );
      const { status, data } = res;
      if (status === 200) {
        setNumber(data);
      }
      
      setLoading(false);
    } catch (error) {
      
      setLoading(false);
    }
  };
  const fetchByMonth = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `/company/director/statistics/notary/first_block/?month=true`
      );
      const { status, data } = res;
      if (status === 200) {
        setNumber(data);
      }
      
      setLoading(false);
    } catch (error) {
      
      setLoading(false);
    }
  };
  const fetchByYear = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `/company/director/statistics/notary/first_block/?year=true`
      );
      const { status, data } = res;
      if (status === 200) {
        setNumber(data);
      }
      
      setLoading(false);
    } catch (error) {
      
      setLoading(false);
    }
  };
  const fetchByChoosenDate = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `/company/director/statistics/notary/first_block/?date-from=${startDate.toLocaleDateString()}&date-to=${endDate.toLocaleDateString()}`
      );
      const { status, data } = res;
      if (status === 200) {
        setNumber(data);
      }
      setLoading(false);
    } catch (error) {
      
      setLoading(false);
    }
  };

  const getPrice = async () => {
    try {
      const res = await Axios.get("company/notary-price/");
      setPriceData(res.data);
      
      setPassport_confirmedE(priceData[0].passport_confirmed);
      setDiploma_confirmedE(priceData[0].diploma_confirmed);
      setPassport_mother_confirmedE(priceData[0].passport_mother_confirmed);
      setMarriage_cert_confirmedE(priceData[0].marriage_cert_confirmed);
      setBirth_cert_confirmedE(priceData[0].birth_cert_confirmed);
      setMed_063_cert_confirmedE(priceData[0].med_063_cert_confirmed);
      setMed_086_cert_confirmedE(priceData[0].med_086_cert_confirmed);
      setHiv_cert_confirmedE(priceData[0].hiv_cert_confirmed);
      
    } catch (error) {}
  };

  const fetchSecond = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `/company/director/statistics/notary/second_block/`
      );
      const { status, data } = res;
      if (status === 200) {
        setPermonth(data);
      }
      
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleSelect = async (e) => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `/company/director/statistics/notary/second_block/?year=${e.target.value}`
      );
      const { status, data } = res;
      if (status === 200) {
        setPermonth(data);
      }
      setLoading(false);
    } catch (error) {}
  };
  const fetchThird = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `/company/director/statistics/notary/third_block/`
      );
      const { status, data } = res;
      if (status === 200) {
        setUniversity(data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const fetchByUniver = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `/company/director/statistics/notary/third_block/?date-from=${startDate1.toLocaleDateString()}&date-to=${startDate2.toLocaleDateString()}&${smth}`
      );
      const { status, data } = res;
      if (status === 200) {
        setUniversity(data);
      }
      setLoading(false);
      
    } catch (error) {
      
      setLoading(false);
    }
  };
  const editPrice = (e) => {
    const { name } = e.target;
    setEdidPriceData((state) => ({ ...state, [name]: true }));
    getPrice();
    
  };

  const closeInput = (e) => {
    const { name } = e.target;
    setEdidPriceData((state) => ({ ...state, [name]: false }));
  };
  const patchPrice = (e, id) => {
    const { name } = e.target;
    try {
      const res = Axios.patch(`/company/notary-price/${id}/`, {
        [name]: newChangeValues[`${name}E`],
      });
    } catch (error) {}
    closeInput(e);
    getPrice();
  };

  useEffect(() => {
    setChengeValues((state) => ({
      ...state,
      passport_confirmedE: passport_confirmedE,
      diploma_confirmedE: diploma_confirmedE,
      passport_mother_confirmedE: passport_mother_confirmedE,
      marriage_cert_confirmedE: marriage_cert_confirmedE,
      birth_cert_confirmedE: birth_cert_confirmedE,
      med_063_cert_confirmedE: med_063_cert_confirmedE,
      med_086_cert_confirmedE: med_086_cert_confirmedE,
      hiv_cert_confirmedE: hiv_cert_confirmedE,
    }));
  }, [
    passport_confirmedE,
    diploma_confirmedE,
    passport_mother_confirmedE,
    marriage_cert_confirmedE,
    birth_cert_confirmedE,
    med_063_cert_confirmedE,
    med_086_cert_confirmedE,
    hiv_cert_confirmedE,
  ]);

  useEffect(() => {
    nothanks();
  }, [universities]);
  useEffect(() => {
    fetchFirst();
    fetchSecond();
    fetchUniversities();
    fetchThird();

  }, []);
  useEffect(() => {
    getPrice();},[])
  
  console.log(priceData);

  return (
    <React.Fragment>
      <Sidebar>
        <div style={{ background: "#FAFDFF" }}>
          <div className="up_nav n_up">
            <div>
              <h1 className="link_h1">Отчет аналитики</h1>
            </div>
            <div className="user_info">
              <img src={userpic} alt="" />
              <div>
                <h1>
                  {first_name} {last_name}
                </h1>
                <h2>Нотариус</h2>
              </div>
            </div>
          </div>
          <div className="home n_otchot">
            <FilterContainer>
              <p onClick={fetchByDay}>День</p>
              <p onClick={fetchByWeek}>Неделя</p>
              <p onClick={fetchByMonth}> Месяц</p>
              <p onClick={fetchByYear}>Год</p>
              <p>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  openTo="year"
                  views={["year", "month", "day"]}
                  startDate={startDate}
                  endDate={endDate}
                  dateFormat="dd MM yyyy"
                  placeholderText="От"
                />
              </p>
              -
              <p>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  onSelect={fetchByChoosenDate}
                  dateFormat="dd MM yyyy"
                  minDate={startDate}
                  placeholderText="До"
                />
              </p>
            </FilterContainer>

            <div className="block_1">
              {/* card */}
              <div className="card_1 card">
                <h4> Обшие документы</h4>
                <h3>{number.count}</h3>
              </div>
              {/* card */}
              <div className="card_2 card">
                <h4> Переведенные документы</h4>
                <h3>{number.translated}</h3>
              </div>
              {/* card */}
              <div className="card_3 card">
                <h4> Не переведенные документы</h4>
                <h3>{number.need_to_translate}</h3>
              </div>
              {/* card */}
              <div className="card_4 card">
                {loading ? (
                  <Loader
                    type="spinner-circle"
                    bgColor={"#FFFFFF"}
                    color={"#FFFFFF"}
                    size={80}
                  />
                ) : (
                  <>
                    <h4>Заработак</h4>
                    <h3>{number.salary}</h3>
                  </>
                )}
              </div>
            </div>
            <div className="scroll">
              <div className="block_3">
                <div className="block_3_up">
                  <p> Месячное количество переводов </p>
                  <div>
                    <select onChange={handleSelect}>
                      <option selected>Выберите год</option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                    </select>
                  </div>
                </div>
                <div className="block_3_chart">
                  <ResponsiveContainer>
                    <BarChart
                      data={permonth}
                      margin={{
                        top: 20,
                        right: 0,
                        left: -20,
                        bottom: 20,
                      }}
                    >
                      <CartesianGrid strokeDasharray="10 10" vertical="" />
                      <XAxis dataKey="name" />
                      <YAxis />2
                      <Tooltip />
                      <Bar dataKey="value" barSize={45} fill="#8884d8">
                        {permonth?.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={colors[index % 10]}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            <div className="scroll">
              <div className="block_3">
                <div className="block_3_up">
                  <p>Количество переведенных по университету </p>
                  <DatePickerContainer>
                    <p>
                      <DatePicker
                        selected={startDate1}
                        onChange={(date) => setStartDate1(date)}
                        selectsStart
                        openTo="year"
                        views={["year", "month", "day"]}
                        startDate={startDate1}
                        endDate={startDate2}
                        dateFormat="dd MM yyyy"
                        placeholderText="От"
                      />
                    </p>
                    <p>
                      <DatePicker
                        selected={startDate2}
                        onChange={(date) => setStartDate2(date)}
                        selectsEnd
                        startDate={startDate2}
                        endDate={startDate2}
                        dateFormat="dd MM yyyy"
                        minDate={startDate1}
                        placeholderText="До"
                      />
                    </p>
                  </DatePickerContainer>

                  <Autocomplete
                    style={{ width: "25" }}
                    onBlur={fetchByUniver}
                    onChange={(e, newValue) => handleUniver(newValue)}
                    multiple
                    id="tags-standard"
                    options={allUniver}
                    getOptionLabel={(option) => (option ? option.name : "")}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        label="выберите университет"
                      />
                    )}
                  />
                </div>
                <div className="block_3_chart">
                  <ResponsiveContainer>
                    <BarChart
                      data={university}
                      margin={{
                        top: 20,
                        right: 0,
                        left: -20,
                        bottom: 20,
                      }}
                    >
                      <CartesianGrid strokeDasharray="10 10" vertical="" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" barSize={45} fill="#8884d8">
                        {university?.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={colors[index % 20]}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            <div className="invoys n_documents">
              <div className="ab_1">
                <div className="table">
                  <div className="table_up">
                    <div>
                      <h1>Список документов</h1>
                    </div>
                    <div></div>
                  </div>

                  <table id="table_excel" style={{ width: "100%" }}>
                    <thead>
                      <th>название документа</th>
                      <th>ценовой документ</th>
                      <th>редактировать</th>
                      <th></th>
                    </thead>
                    <tbody>
                      {loading ? (
                        <Loader
                          type="spinner-circle"
                          bgColor={"#fff"}
                          color={"black"}
                          size={70}
                        />
                      ) : (
                        priceData?.map((data) => {
                          
                          const {
                            birth_cert_confirmed,
                            diploma_confirmed,
                            hiv_cert_confirmed,
                            marriage_cert_confirmed,
                            med_063_cert_confirmed,
                            id,
                            med_086_cert_confirmed,
                            passport_confirmed,
                            passport_mother_confirmed,
                          } = data;
                          return (
                            <>
                              <tr>
                                <th>пасспорт</th>

                                <th
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  {(editPriceData?.passport_confirmed && (
                                    <>
                                      <input
                                        style={{
                                          border: "0.5px solid grey",
                                          outline: "none",
                                          borderRadius: "5px",
                                        }}
                                        type="text"
                                        value={passport_confirmedE}
                                        onChange={(e) =>
                                          setPassport_confirmedE(e.target.value)
                                        }
                                      />
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <img
                                          onClick={(e) => patchPrice(e, id)}
                                          style={{
                                            width: "23px",
                                            cursor: "pointer",
                                            marginLeft: "15px",
                                          }}
                                          name={"passport_confirmed"}
                                          src={check}
                                          alt=""
                                        />
                                        <img
                                          style={{
                                            width: "20px",
                                            cursor: "pointer",
                                            marginLeft: "15px",
                                            padding:"10px 0",
                                            fontWeight:'bold'
                                          }}
                                          name={"passport_confirmed"}
                                          onClick={(e) => closeInput(e)}
                                          src={close}
                                          alt=""
                                        />
                                      </div>
                                    </>
                                  )) ||
                                    passport_confirmed}    сум 
                                </th>

                                <th>
                                  <img
                                    onClick={(e) => editPrice(e)}
                                    style={{ width: "23px", cursor: "pointer" }}
                                    name={"passport_confirmed"}
                                    src={edit}
                                    alt=""
                                  />
                                  
                                </th>
                              </tr>
                              <tr>
                                <th>диплом</th>
                                <th
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  {(editPriceData?.diploma_confirmed && (
                                    <>
                                      <input

                                        style={{
                                          border: "0.5px solid grey",
                                          outline: "none",
                                          borderRadius: "5px",
                                          padding:"10px 0",
                                          fontWeight:'bold'
                                        }}
                                        type="text"
                                        value={diploma_confirmedE}
                                        onChange={(e) =>
                                          setDiploma_confirmedE(e.target.value)
                                        }
                                      />
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <img
                                          onClick={(e) => patchPrice(e, id)}
                                          style={{
                                            width: "23px",
                                            cursor: "pointer",
                                            marginLeft: "15px",
                                          }}
                                          name={"diploma_confirmed"}
                                          src={check}
                                          alt=""
                                        />
                                        <img
                                          style={{
                                            width: "20px",
                                            cursor: "pointer",
                                            marginLeft: "15px",
                                          }}
                                          name={"diploma_confirmed"}
                                          onClick={(e) => closeInput(e)}
                                          src={close}
                                          alt=""
                                        />
                                      </div>
                                    </>
                                  )) ||
                                    diploma_confirmed} сум 
                                </th>
                                <th>
                                  <img
                                    onClick={(e) => editPrice(e)}
                                    style={{ width: "23px", cursor: "pointer" }}
                                    src={edit}
                                    name={"diploma_confirmed"}
                                    alt=""
                                  />
                                  
                                </th>
                              </tr>
                              <tr>
                                <th>паспорт матер</th>
                                <th
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  {(editPriceData?.passport_mother_confirmed && (
                                    <>
                                      <input

                                        style={{
                                          padding:"10px 0",
                                          fontWeight:'bold',
                                          border: "0.5px solid grey",
                                          outline: "none",
                                          borderRadius: "5px",
                                        }}
                                        type="text"
                                        value={passport_mother_confirmedE}
                                        onChange={(e) =>
                                          setPassport_mother_confirmedE(
                                            e.target.value
                                          )
                                        }
                                      />
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        {" "}
                                        <img
                                          onClick={(e) => patchPrice(e, id)}
                                          style={{
                                            width: "23px",
                                            cursor: "pointer",
                                            marginLeft: "15px",
                                          }}
                                          name={"passport_mother_confirmed"}
                                          src={check}
                                          alt=""
                                        />
                                        <img
                                          style={{
                                            width: "20px",
                                            cursor: "pointer",
                                            marginLeft: "15px",
                                          }}
                                          name={"passport_mother_confirmed"}
                                          onClick={(e) => closeInput(e)}
                                          src={close}
                                          alt=""
                                        />
                                      </div>
                                    </>
                                  )) ||
                                    passport_mother_confirmed} сум 
                                </th>
                                <th>
                                  <img
                                    onClick={(e) => editPrice(e)}
                                    name={"passport_mother_confirmed"}
                                    style={{ width: "23px", cursor: "pointer" }}
                                    src={edit}
                                    alt=""
                                  />
                                
                                </th>
                              </tr>
                              <tr>
                                <th>свидетельство о браке</th>
                                <th
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  {(editPriceData?.marriage_cert_confirmed && (
                                    <>
                                      <input

                                        style={{
                                          border: "0.5px solid grey",
                                          outline: "none",
                                          borderRadius: "5px",
                                          padding:"10px 0",
                                          fontWeight:'bold'
                                        }}
                                        type="text"
                                        value={marriage_cert_confirmedE}
                                        onChange={(e) =>
                                          setMarriage_cert_confirmedE(
                                            e.target.value
                                          )
                                        }
                                      />
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        {" "}
                                        <img
                                          onClick={(e) => patchPrice(e, id)}
                                          style={{
                                            width: "23px",
                                            cursor: "pointer",
                                            marginLeft: "15px",
                                          }}
                                          name={"marriage_cert_confirmed"}
                                          src={check}
                                          alt=""
                                        />
                                        <img
                                          style={{
                                            width: "20px",
                                            cursor: "pointer",
                                            marginLeft: "15px",
                                          }}
                                          name={"marriage_cert_confirmed"}
                                          onClick={(e) => closeInput(e)}
                                          src={close}
                                          alt=""
                                        />
                                      </div>
                                    </>
                                  )) ||
                                    marriage_cert_confirmed} сум 
                                </th>
                                <th>
                                  <img
                                    onClick={(e) => editPrice(e)}
                                    name= {"marriage_cert_confirmed"}
                                    style={{ width: "23px", cursor: "pointer" }}
                                    src={edit}
                                    alt=""
                                  />
                                
                                </th>
                              </tr>
                              <tr>
                                <th> рождение сертификат</th>
                                <th
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  {(editPriceData?.birth_cert_confirmed && (
                                    <>
                                      <input

                                        style={{
                                          border: "0.5px solid grey",
                                          outline: "none",
                                          borderRadius: "5px",
                                          padding:"10px 0",
                                          fontWeight:'bold'
                                        }}
                                        type="text"
                                        value={birth_cert_confirmedE}
                                        onChange={(e) =>
                                          setBirth_cert_confirmedE(
                                            e.target.value
                                          )
                                        }
                                      />
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        {" "}
                                        <img
                                          onClick={(e) => patchPrice(e, id)}
                                          style={{
                                            width: "23px",
                                            cursor: "pointer",
                                            marginLeft: "15px",
                                          }}
                                          name={"birth_cert_confirmed"}
                                          src={check}
                                          alt=""
                                        />
                                        <img
                                          style={{
                                            width: "20px",
                                            cursor: "pointer",
                                            marginLeft: "15px",
                                          }}
                                          name={"birth_cert_confirmed"}
                                          onClick={(e) => closeInput(e)}
                                          src={close}
                                          alt=""
                                        />
                                      </div>
                                    </>
                                  )) ||
                                    birth_cert_confirmed} сум 
                                </th>
                                <th>
                                  <img
                                    onClick={(e) => editPrice(e)}
                                    name={"birth_cert_confirmed"}
                                    style={{ width: "23px", cursor: "pointer" }}
                                    src={edit}
                                    alt=""
                                  />
                                
                                </th>
                              </tr>
                              <tr>
                                <th>мед 063 сертификат</th>
                                <th
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  {(editPriceData?.med_063_cert_confirmed && (
                                    <>
                                      <input

                                        style={{
                                          border: "0.5px solid grey",
                                          outline: "none",
                                          borderRadius: "5px",
                                          padding:"10px 0",
                                          fontWeight:'bold'
                                        }}
                                        type="text"
                                        value={med_063_cert_confirmedE}
                                        onChange={(e) =>
                                          setMed_063_cert_confirmedE(
                                            e.target.value
                                          )
                                        }
                                      />
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        {" "}
                                        <img
                                          onClick={(e) => patchPrice(e, id)}
                                          style={{
                                            width: "23px",
                                            cursor: "pointer",
                                            marginLeft: "15px",
                                          }}
                                          name={"med_063_cert_confirmed"}
                                          src={check}
                                          alt=""
                                        />
                                        <img
                                          style={{
                                            width: "20px",
                                            cursor: "pointer",
                                            marginLeft: "15px",
                                          }}
                                          name={"med_063_cert_confirmed"}
                                          onClick={(e) => closeInput(e)}
                                          src={close}
                                          alt=""
                                        />
                                      </div>
                                    </>
                                  )) ||
                                    med_063_cert_confirmed} сум 
                                </th>
                                <th>
                                  <img
                                    onClick={(e) => editPrice(e)}
                                    name={"med_063_cert_confirmed"}
                                    style={{ width: "23px", cursor: "pointer" }}
                                    src={edit}
                                    alt=""
                                  />
                                
                                </th>
                              </tr>
                              <tr>
                                <th>мед 086 сертификат</th>
                                <th
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  {(editPriceData?.med_086_cert_confirmed && (
                                    <>
                                      <input

                                        style={{
                                          border: "0.5px solid grey",
                                          outline: "none",
                                          borderRadius: "5px",
                                          padding:"10px 0",
                                          fontWeight:'bold'
                                        }}
                                        type="text"
                                        value={med_086_cert_confirmed}
                                        onChange={(e) =>
                                          setMed_086_cert_confirmedE(
                                            e.target.value
                                          )
                                        }
                                      />
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        {" "}
                                        <img
                                          onClick={(e) => patchPrice(e, id)}
                                          style={{
                                            width: "23px",
                                            cursor: "pointer",
                                            marginLeft: "15px",
                                          }}
                                          name={"med_086_cert_confirmed"}
                                          src={check}
                                          alt=""
                                        />
                                        <img
                                          style={{
                                            width: "20px",
                                            cursor: "pointer",
                                            marginLeft: "15px",
                                          }}
                                          name={"med_086_cert_confirmed"}
                                          onClick={(e) => closeInput(e)}
                                          src={close}
                                          alt=""
                                        />
                                      </div>
                                    </>
                                  )) ||
                                  med_086_cert_confirmed} сум 
                                </th>
                                <th>
                                  <img
                                    onClick={(e) => editPrice(e)}
                                    name={"med_086_cert_confirmed"}
                                    style={{ width: "23px", cursor: "pointer" }}
                                    src={edit}
                                    alt=""
                                  />
                                
                                </th>
                              </tr>
                              <tr>
                                <th>сертификат ВИЧ</th>
                                <th
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  {(editPriceData?.hiv_cert_confirmed && (
                                    <>
                                      <input

                                        style={{
                                          border: "0.5px solid grey",
                                          outline: "none",
                                          borderRadius: "5px",
                                          padding:"10px 0",
                                          fontWeight:'bold'
                                        }}
                                        type="text"
                                        value={hiv_cert_confirmed}
                                        onChange={(e) =>
                                          setHiv_cert_confirmedE(e.target.value)
                                        }
                                      />
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        {" "}
                                        <img
                                          onClick={(e) => patchPrice(e, id)}
                                          style={{
                                            width: "23px",
                                            cursor: "pointer",
                                            marginLeft: "15px",
                                          }}
                                          name={"hiv_cert_confirmed"}
                                          src={check}
                                          alt=""
                                        />
                                        <img
                                          style={{
                                            width: "20px",
                                            cursor: "pointer",
                                            marginLeft: "15px",
                                          }}
                                          name={"hiv_cert_confirmed"}
                                          onClick={(e) => closeInput(e)}
                                          src={close}
                                          alt=""
                                        />
                                      </div>
                                    </>
                                  )) ||
                                    hiv_cert_confirmed} сум 
                                </th>
                                <th>
                                  <img
                                    onClick={(e) => editPrice(e)}
                                    style={{ width: "23px", cursor: "pointer" }}
                                    src={edit}
                                    name={"hiv_cert_confirmed"}
                                    alt=""
                                  />
                                
                                </th>
                              </tr>
                            </>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Sidebar>
    </React.Fragment>
  );
};

export default N_otchot;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 70px;
  padding: 0 20px;
  align-items: center;
  justify-content: space-around;
  p {
    background: #fff;
    width: 148px;
    height: 49px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 14px;
    font-size: 18px;
    font-weight: 600;
    opacity: 0.6;
    cursor: pointer;
    &:hover {
      opacity: 1;
      transition: all 0.25s;
      box-shadow: 0px -2px 8px rgba(13, 83, 114, 0.15),
        2px 4px 9px rgba(13, 83, 114, 0.15);
      border: 1px solid #1ab9;
    }
    input {
      padding: 0 10px;
      border: none;
      outline: none;
      height: 100%;
      width: 100%;
    }
  }
`;

const DatePickerContainer = styled.div`
  .react-datepicker-wrapper {
    .react-datepicker__input-container {
      input {
        font-family: Raleway;
        font-style: normal;
        font-weight: 500;
        letter-spacing: 0.02em;
        color: #7595a3;
        outline: none;
        margin: 0 !important;
        background: none;
        font-size: 14px;
        width: 95%;
        padding: 11px 18px !important;
        border: 1px solid #00587f !important;
        border-radius: 8px;
        text-align: right;
        position: relative;
      }
    }
  }
`;
