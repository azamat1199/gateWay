import React, { useState, useEffect } from "react";
import NotariusSidebar from "../NotariusSidebar";
import userpic from "../../../assets/icon/userpic.svg";
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
const colors = scaleOrdinal(schemeCategory10).range();

const N_otchot = () => {
  const [key, setkey] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setfilters] = useState(false);
  const [page, setPage] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(null);
  const [number, setNumber] = useState({
    count: "",
    need_to_translate: "",
    salary: "",
    translated: "",
  });
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
  const [priceData, setPriceData] = useState();
  const handleUniver = (id) => {
    console.log(id);
    setUnivresities(id);
  };
  console.log(universities);
  const nothanks = () => {
    let univer = "";
    for (let i = 0; i < universities.length; i++) {
      univer += `university=${universities[i].id}&`;
      console.log(univer);
    }
    setSmth(univer);
  };
  const handlePageChange = (e, newPage) => {
    console.log(newPage);
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    console.log(event.target.value);
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  console.log(smth);
  const fetchUniversities = async () => {
    try {
      const res = await Axios.get("/university/");
      const { status, data } = res;
      if (status === 200) {
        const { results } = data;
        setAllUniver(results);
      }
    } catch (error) {
      console.log(error);
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
      console.log(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
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
      console.log(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
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
      console.log(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
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
      console.log(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
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
      console.log(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
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
      console.log(error);
      setLoading(false);
    }
  };

  const getPrice = async () => {
    try {
      const res = await Axios.get("company/notary-price/");
      setPriceData(res.data.results);
      console.log(res, "dsafasfasdf");
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
      console.log(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
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
      console.log(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
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
      console.log(res);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    nothanks();
  }, [universities]);
  useEffect(() => {
    fetchFirst();
    fetchSecond();
    fetchUniversities();
    fetchThird();
    getPrice();
  }, []);
  console.log(priceData, "salom");
  console.log(number);
  // console.log(univerArray?.map(item=> `univer=${item}`));
  return (
    <React.Fragment>
      <NotariusSidebar />
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
                      {permonth.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % 10]} />
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
                      {university.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % 20]} />
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
                        console.log(data);
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
                            {" "}
                            <tr>
                              <th>пасспорт</th>
                              <th>{passport_confirmed}</th>
                              <th>{}</th>
                            </tr>
                            <tr>
                              <th>диплом</th>
                              <th>{diploma_confirmed}</th>
                              <th>{}</th>
                            </tr>
                            <tr>
                              <th>паспорт матер</th>
                              <th>{passport_mother_confirmed}</th>
                              <th>{}</th>
                            </tr>
                            <tr>
                              <th>свидетельство о браке</th>
                              <th>{marriage_cert_confirmed}</th>
                              <th>{}</th>
                            </tr>
                            <tr>
                              <th> рождение сертификат</th>
                              <th>{birth_cert_confirmed}</th>
                              <th>{}</th>
                            </tr>
                            <tr>
                              <th>мед 063 сертификат</th>
                              <th>{med_063_cert_confirmed}</th>
                              <th>{}</th>
                            </tr>
                            <tr>
                              <th>мед 086 сертификат</th>
                              <th>{med_086_cert_confirmed}</th>
                              <th>{}</th>
                            </tr>
                            <tr>
                              <th>сертификат ВИЧ</th>
                              <th>{hiv_cert_confirmed}</th>
                              <th>{}</th>
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
