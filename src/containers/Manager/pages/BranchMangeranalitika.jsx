import React, { useEffect, useState } from "react";
import ManegerSidebar from "../ManagerSidebar";
import userpic from "../../../assets/icon/LogoAsia.jpg";
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
  ComposedChart,
  LabelList,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { scaleOrdinal } from "d3-scale";
import { interpolateCividis, schemeCategory10 } from "d3-scale-chromatic";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import Axios from "../../../utils/axios";
import styled from "styled-components";
import BranchManagerSidebar from "./BanchManagerSidebar";
const colors = scaleOrdinal(schemeCategory10).range();

const dataPie = require("../../consultantBackoffice/univerBackoffice/json/data2.json");
const dataPie2 = require("../../consultantBackoffice/univerBackoffice/json/data3.json");
const dataComposed = require("../../consultantBackoffice/univerBackoffice/json/dataComposed.json");

const M_analitika = () => {
  const [dataFirst, setDataFirst] = useState();
  const [data, setData] = useState();
  const [dataComposeds, setDataComposeds] = useState();
  const [data_doxod, setDataDoxod] = useState();
  const [loading, setLoading] = useState(false);
  const [second, setSecond] = useState([]);
  const [endDate, setEndDate] = useState(null);
  const [payment, setPayment] = useState({
    not_paid: "",
    paid: "",
    waiting_confirmation: "",
  });

  const fetchByDay = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `/company/manager/statistics/third_block/?day=true`
      );
      const { status, data } = res;
      if (status === 200) {
        const { payment } = data;
        setPayment(payment);
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
        `/company/manager/statistics/third_block/?week=true`
      );
      const { status, data } = res;
      if (status === 200) {
        const { payment } = data;
        setPayment(payment);
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
        `/company/manager/statistics/third_block/?month=true`
      );
      const { status, data } = res;
      if (status === 200) {
        const { payment } = data;
        setPayment(payment);
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
        `/company/manager/statistics/third_block/?year=true`
      );
      const { status, data } = res;
      if (status === 200) {
        const { payment } = data;
        setPayment(payment);
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
        `/company/manager/statistics/third_block/?date-from=${startDate.toLocaleDateString()}&date-to=${endDate.toLocaleDateString()}`
      );
      const { status, data } = res;
      if (status === 200) {
        const { payment } = data;
        setPayment(payment);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchSecondBlock = async () => {
    setLoading(true);
    try {
      const res = await Axios.get("/company/manager/statistics/second_block/");
      const { status, data } = res;
      if (status === 200) {
        setSecond(data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getDataStatistika = async () => {
    try {
      const res = await Axios.get("/company/manager/statistics/");
      const { first_block, second_block, fourth_block, third_block } = res.data;
      setDataFirst(first_block);
      setData(second_block);
      setDataDoxod(third_block);
      setDataComposeds(fourth_block);
    } catch (error) {}
  };

  useEffect(() => {
    getDataStatistika();
  }, []);

  const [startDate, setStartDate] = useState(null);
  const selector = useSelector((state) => state.payload.payload.data);
  const genderOfStudents = [
    {
      name: "Group A",
      value: dataComposeds?.applicants?.male,
    },
    { name: "Group B", value: dataComposeds?.applicants?.female },
  ];

  return (
    <React.Fragment>
       <BranchManagerSidebar /> 
      <div className="asos">
        <div className="up_nav n_up">
          <div>
            <h1 className="link_h1">Отдел аналитики</h1>
          </div>
          <div className="user_info">
            <img src={userpic} alt="" />
            <div>
              <h1>
                {selector.first_name} {selector.last_name}
              </h1>
              <h2>{selector.role}</h2>
            </div>
          </div>
        </div>
        <div className="home m_analitika">
          {/* <FilterContainer>
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
          </FilterContainer> */}
          <div className="block_1">
            {/* card */}
            <div className="card_1 card">
              <h4>Обшее количество</h4>
              <h3>{dataFirst?.applicants}</h3>
            </div>
            {/* card */}
            <div className="card_2 card">
              <h4> Прошли</h4>
              <h3>{dataFirst?.completed}</h3>
            </div>
            {/* card */}
            <div className="card_3 card">
              <h4> Не прошли</h4>
              <h3>{dataFirst?.closed}</h3>
            </div>
            {/* card */}
            <div className="card_4 card">
              <h4> В университете</h4>
              <h3>{dataFirst?.in_process}</h3>
            </div>
          </div>
          <div className="scroll">
            <div className="block_2">
              <div>
                <h5>Динамика роста или спада</h5>
                <div className="seeMoreAct">
                  <select>
                    <option>Показать все</option>
                    <option>lorem1</option>
                    <option>lorem2</option>
                  </select>
                </div>
              </div>
              <div className="diag">
                <ResponsiveContainer>
                  <LineChart height={300} data={data}>
                    <CartesianGrid strokeDasharray="12 12" vertical="" />
                    <XAxis dataKey="Месяц" />
                    <YAxis />
                    <Tooltip />
                    <Legend iconType="square" />
                    <Line
                      type="monotone"
                      strokeWidth={3}
                      dataKey="applicants"
                      stroke="#00587F"
                      name="Обшее количество"
                    />
                    <Line
                      type="monotone"
                      strokeWidth={3}
                      dataKey="in_process"
                      stroke="#10CC9B"
                      name="в университете"
                    />
                    <Line
                      type="monotone"
                      strokeWidth={3}
                      dataKey="closed"
                      stroke="#E96383"
                      name="не прошли"
                    />
                    <Line
                      type="monotone"
                      strokeWidth={3}
                      dataKey="completed"
                      stroke="#FCCA58"
                      name=" прошли"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="block_4">
            <div className="block_4_1">
              <h4>Студенты по полу</h4>
              <div className="pieChart diag">
                <div>
                  <span>
                    {dataComposeds?.applicants?.female +
                      dataComposeds?.applicants?.male}
                  </span>
                  <PieChart width={188} height={188}>
                    <Pie
                      data={genderOfStudents}
                      cx={80}
                      cy={80}
                      innerRadius={50}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {dataComposed.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </div>
                <div className="PieChartSurf">
                  <span>
                    <div style={{ background: "#4897D1" }}></div>
                    <h5>Мужчины</h5>
                    <h6>{dataComposeds?.applicants?.male}</h6>
                  </span>
                  <span>
                    <div style={{ background: "rgb(255, 127, 14)" }}></div>
                    <h5>Женщина</h5>
                    <h6>{dataComposeds?.applicants?.female}</h6>
                  </span>
                </div>
              </div>
            </div>
            <div className="block_2">
              <h4>Самые популярные факультеты</h4>
              <div className="diag">
                <ResponsiveContainer>
                  <BarChart
                    data={dataComposeds?.popular_faculties}
                    margin={{
                      top: 0,
                      right: 0,
                      left: -20,
                      bottom: 50,
                    }}
                  >
                    <CartesianGrid strokeDasharray="20 20" vertical="" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="applicants_count" barSize={35} fill="#8884d8">
                      {dataComposed.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
               </div>
      </div>
    </React.Fragment>
  );
};

export default M_analitika;

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
      border: none;
      outline: none;
      height: 100%;
      width: 100%;
    }
  }
`;
