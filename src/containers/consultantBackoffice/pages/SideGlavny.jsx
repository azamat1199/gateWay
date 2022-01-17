import React, { Component, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
// import diagramma
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { PieChart, Pie, Sector, Cell } from "recharts";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";

// import css
import "../../../style/css/SideOtdel.css";

import Sidebar from "./SidebarConsult";
import Axios from "../../../utils/axios";

import blueStroke from "../../../assets/images/Stroke-blue.svg";

// !
import DatePicker from "react-datepicker";
import SkeletonLoader from "./assets/skeleton/skeletonLoader";
import { WrappedMap } from "./Map";
// !

// import icon

// import json
const data = require("../json/data.json");
const dataPie = require("../json/data2.json");
const dataPie2 = require("../json/data3.json");
const dataComposed = require("../json/dataComposed.json");
const dataComposed2 = require("../json/dataComposed2.json");

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const COLORSPie = ["#4897D1", "#EF476F", "#C6E4FB"];

const colors = scaleOrdinal(schemeCategory10).range();

const SideGlavny = () => {
  const [statistics, setStatistics] = useState([]);
  const [filterStats, setFilterStats] = useState("all");
  const [firstBlock, setFirstBlock] = useState([]);
  const [loading, setLoading] = useState(false);
  const [secondBlock, setSecondBlock] = useState([]);
  const [filter, setFilter] = useState("");
  const [thirdBlock, setThirdBlock] = useState([]);
  const [sixBlock, setSixBlock] = useState([]);
  const selector = useSelector((state) => state.payload.payload.data);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const genderData = [
    { name: "Мужчины", value: sixBlock?.students?.male },
    { name: "Женщины", value: sixBlock?.students?.female },
  ];
  //popular univer filter
  let popularUniver = [
    {
      name: "",
      студенты: "",
    },
  ];
  // for (let i = 0; i < secondBlock.length; i++) {
  //   popularUniver[i]?.студенты = secondBlock[i]?.students_count;
  //   popularUniver[i]?.name = secondBlock[i]?.name;
  // }

  //popular country filter
  let popularCountry = [];
  for (let i = 0; i < thirdBlock.length; i++) {}
  // thirdBlock?.forEach((item) => {
  //     let countries = [];
  //     countries.push(item.countries);
  //     //
  //     let filterCountry = [];
  //     countries.forEach(item => {
  //         filterCountry.push(item)
  //     });
  //     let endFilter = [];
  //     filterCountry.forEach((item) => {
  //         endFilter.push(item)
  //     });
  //     let ooo = [];
  //     endFilter.forEach((item) => {
  //
  //     });
  //     popularCountry.push({
  //         month: item.month ,
  //         counties: ooo.name,
  //         students: ooo.students
  //     })
  // });
  //
  //
  const fetchCountries = async () => {
    try {
      const data = await Axios.get("/university/");
    } catch (error) {}
  };
  const resetDateFilter = () => {
    setStartDate(null);
    setEndDate(null);
  };
  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    setLoading(true);
    Axios.get("company/director/statistics/dashboard/first_block/").then(
      (res) => {
        setLoading(false);
        setFirstBlock(res.data);
      }
    );
    Axios.get(
      "company/director/statistics/dashboard/popular_universities/"
    ).then((res) => {
      //
      setLoading(false);
      setSecondBlock(res.data);
    });
    Axios.get("company/director/statistics/dashboard/popular_countries/").then(
      (res) => {
        //
        setLoading(false);
        setThirdBlock(res.data);
      }
    );
    Axios.get("company/director/statistics/dashboard/fourth_block/").then(
      (res) => {
        //
        setLoading(false);
        setSixBlock(res.data);
      }
    );
  }, []);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    if (filter.length > 0) {
      Axios.get(
        `company/director/statistics/dashboard/first_block/?filter-by=${filter}`
      ).then((res) => {
        if (mounted) {
          setLoading(false);
          setFirstBlock(res.data);
        }
      });
    }
    if ((startDate && endDate) !== null) {
      Axios.get(
        `company/director/statistics/dashboard/first_block/?date-from=${moment(
          startDate
        ).format("DD.MM.YYYY")}&date-to=${moment(endDate).format("DD.MM.YYYY")}`
      ).then((res) => {
        if (mounted) {
          setLoading(false);
          setFirstBlock(res.data);
        }
      });
    }
    return () => {
      mounted = false;
    };
  }, [filter, startDate, endDate]);

  const name = thirdBlock[10]?.countries[0]?.name;
  return (
    <Sidebar>
      <div className="asos" id="top">
        <div className="Up_navbar">
          <h4>Главное</h4>
          <div>
            <img src="https://picsum.photos/70" alt="" />
            <div>
              <h5>
                {" "}
                {selector.first_name} {selector.last_name}
              </h5>
              <p>{selector.role}</p>
            </div>
          </div>
        </div>

        <div className="sideGlavny">
          <div className="DNT_SideGlavBtnDate">
            <button
              className={`${filter === "day" && "active-director-header-btn"}`}
              onClick={() => {
                setFilter("day");
                resetDateFilter();
              }}
            >
              День
            </button>
            <button
              className={`${filter === "week" && "active-director-header-btn"}`}
              onClick={() => {
                setFilter("week");
                resetDateFilter();
              }}
            >
              Неделя
            </button>
            <button
              className={`${
                filter === "month" && "active-director-header-btn"
              }`}
              onClick={() => {
                setFilter("month");
                resetDateFilter();
              }}
            >
              Месяц
            </button>
            <button
              className={`${filter === "year" && "active-director-header-btn"}`}
              onClick={() => {
                setFilter("year");
                resetDateFilter();
              }}
            >
              Год
            </button>

            <div className="datapickBlock">
              <div>
                <DatePicker
                  className={`${startDate && "active-director-header-btn"}`}
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    setFilter("");
                  }}
                  selectsStart
                  openTo="year"
                  views={["year", "month", "day"]}
                  startDate={startDate}
                  endDate={endDate}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="С"
                />
              </div>
              <div>
                <DatePicker
                  className={`${endDate && "active-director-header-btn"}`}
                  selected={endDate}
                  onChange={(date) => {
                    setEndDate(date);
                    setFilter("");
                  }}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="До"
                />
              </div>
            </div>
          </div>

          {/* block - 1 */}

          <div className="DNT_SideGlavBox">
            <div className="card">
              <h4>Регистрированные</h4>
              {loading ? <SkeletonLoader /> : <h3>{firstBlock?.register}</h3>}
            </div>
            <div className="card">
              <h4>У бухгалтера</h4>
              {loading ? <SkeletonLoader /> : <h3>{firstBlock?.accountant}</h3>}
            </div>
            <div className="card">
              <h4>У менеджера</h4>
              {loading ? <SkeletonLoader /> : <h3>{firstBlock?.manager}</h3>}
            </div>
            <div className="card">
              <h4>У нотариуса</h4>
              {loading ? <SkeletonLoader /> : <h3>{firstBlock?.notary}</h3>}
            </div>
            <div className="card">
                <SkeletonLoader />
              ) : (
                <h3>{firstBlock?.manager_checking_translates}</h3>
              )
            </div>
            <div className="card">
              <h4>У университета</h4>
              {loading ? <SkeletonLoader /> : <h3>{firstBlock?.university}</h3>}
            </div>
            <div className="card">
              <h4>Инвойс университет</h4>
              {loading ? (
                <SkeletonLoader />
              ) : (
                <h3>{firstBlock?.university_invoice}</h3>
              )}
            </div>
            <div className="card">
              <h4></h4>
              <h3></h3>
            </div>
          </div>
          {/* end block - 1 */}

          <div className="scroll">
            <div className="block_2">
              <div>
                <h5>Самые популярные университеты, число студентов</h5>
                <div className="seeMoreAct">
                  <select onChange={(e) => setFilterStats(e.target.value)}>
                    <option value="all">Показать все</option>
                    <option value="students">Южная Корея</option>
                    <option value="university">Узбекистан</option>
                    <option value="country">США</option>
                    <option value="faculty">Россия</option>
                  </select>
                </div>
              </div>

              <div className="diag">
                <ResponsiveContainer>
                  <BarChart
                    data={popularUniver}
                    margin={{
                      top: 20,
                      right: 0,
                      left: -20,
                      bottom: 50,
                    }}
                  >
                    <CartesianGrid strokeDasharray="10 10" vertical="" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="студенты" barSize={45} fill="#8884d8">
                      {dataComposed2.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* block -2 */}
          <div className="scroll">
            <div className="block_2">
              <div>
                <h5>Самые популярные страны</h5>
                <div className="seeMoreAct">
                  <select onChange={(e) => setFilterStats(e.target.value)}>
                    <option value="все">Показать все</option>
                    <option value="Южная Корея">Южная Корея</option>
                    <option value="Узбекистан">Узбекистан</option>
                    <option value="США">США</option>
                    <option value="Россия">Россия</option>
                  </select>
                </div>
              </div>
              <div className="diag">
                <ResponsiveContainer>
                  <LineChart width={700} height={300} data={thirdBlock}>
                    <CartesianGrid strokeDasharray="10 10" vertical="" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend iconType="square" />
                    <Line
                      type="monotone"
                      strokeWidth={3}
                      dataKey={thirdBlock?.countries?.students_count}
                      stroke="#00587F"
                      name={name}
                    />
                    <Line
                      type="monotone"
                      strokeWidth={3}
                      dataKey="Университеты"
                      stroke="#10CC9B"
                    />
                    {/*/!*<Line type="monotone" strokeWidth={5} dataKey="США" stroke="#E96383"/>*!/*/}
                    {/*/!*<Line type="monotone" strokeWidth={5} dataKey="Россия" stroke="#FCCA58"/>*!/*/}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          {/* end block -2 */}

          {/* block - 3 */}
          <div className="block_3">
            {/* PieChart */}
            <div className="block_3_1">
              <h4>Студенты по полу</h4>
              <div className="pieChart">
                <div>
                  <span>
                    {sixBlock?.students?.female + sixBlock?.students?.male}
                  </span>
                  <PieChart width={188} height={188}>
                    <Pie
                      data={genderData}
                      cx={80}
                      cy={80}
                      innerRadius={50}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORSPie[index % COLORSPie.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </div>
                <div className="PieChartSurf">
                  <span>
                    <div style={{ background: "#4897D1" }}></div>
                    <h5>Мужчины</h5>
                  </span>
                  <span>
                    <div style={{ background: "#EF476F" }}></div>
                    <h5>Женщины</h5>
                  </span>
                </div>
              </div>
            </div>

            <div className="block_2">
              <h4>Самые популярные факультеты</h4>
              <div className="diag">
                <ResponsiveContainer>
                  <BarChart
                    data={sixBlock.popular_faculties}
                    margin={{
                      top: 20,
                      right: 0,
                      left: -20,
                      bottom: 50,
                    }}
                  >
                    <CartesianGrid strokeDasharray="10 10" vertical="" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="students_count"
                      barSize={45}
                      fill="#8884d8"
                      name="число студентов"
                    >
                      {dataComposed2.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* block - 4 */}
          <div className="block_4">
            <h4>Университеты партнеры</h4>
            {/*<div className="map-wrapper">*/}
            {/*    <WrappedMap*/}
            {/*        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places}`}*/}
            {/*        loadingElement={<div style={{ height: `100%` }} />}*/}
            {/*        containerElement={<div style={{ height: `100% ` }} />}*/}
            {/*        mapElement={<div style={{ height: `100%` }} />}*/}
            {/*    />*/}
            {/*</div>*/}
            {/*<h6>180 стран</h6>*/}
          </div>
          {/* end block - 4 */}
        </div>
        <a href="#top" title="Go to top" className="backTop">
          <img src={blueStroke} alt="back to top" />
        </a>
      </div>
    </Sidebar>
  );
};

export default SideGlavny;
