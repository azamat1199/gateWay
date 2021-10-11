import React, { Component, useCallback, useState } from "react";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";

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
  Bar,
  BarChart,
} from "recharts";
import { PieChart, Pie, Sector, Cell } from "recharts";
import DatePicker from "react-datepicker";

// import css
import "../../../style/css/SideGlavny.css";

// import icon
import search_icon from "../../../assets/icon/search.svg";
import settings from "../../../assets/icon/settings.svg";
import Sidebar from "../../consultantBackoffice/pages/SidebarConsult";
import Stroke from "../../../assets/images/Stroke.svg";

// import json
const data = require("../../consultantBackoffice/json/data.json");
const dataPie = require("../../consultantBackoffice/json/data2.json");
const dataPie2 = require("../../consultantBackoffice/json/data3.json");
const dataComposed = require("../../consultantBackoffice/json/dataComposed.json");
const dataComposed2 = require("../../consultantBackoffice/json/dataComposed2.json");
const data_filial = require("../../consultantBackoffice/json/data_filial.json");
const datablock6 = require("../../consultantBackoffice/json/block6.json");

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const COLORSPie = ["#4897D1", "#EF476F", "#C6E4FB"];

const colors1 = scaleOrdinal(schemeCategory10).range();

const SideOtdel = () => {
  const [startDate, setStartDate] = useState(null);
  const [startDate1, setStartDate1] = useState(null);
  const [startDate2, setStartDate2] = useState(null);

  return (
    <div className="right-side">
      <div className="asos">
        <div className="Up_navbar">
          <div className="otdel">
            <h4>Отдел аналитики</h4>
            <p className="strelka">{`>`}</p>
            {/* <img src={Stroke} alt="strelka" /> */}
            <h5 className="account-analaytics">Аналитика</h5>
          </div>
          <div className="head-img">
            <img src="https://picsum.photos/70" alt="" />
            <div>
              <h5>Nargiza Akhmedova</h5>
              <p>IT Specialist</p>
            </div>
          </div>
        </div>

        <div className="sideOtdel">
          {/* block - 0 */}
          <div className="block_0">
            <div className="settSearch">
              <div className="searchUniv">
                <img src={search_icon} alt="" />
                <input type="text" placeholder="Поиск университетов" />
              </div>
            </div>
          </div>

          {/* block - 5 */}
          <div className="block_5">
            <div className="block_5_up">
              <p>Доход по филиалам</p>
              <div>
                <div>
                  <DatePicker
                    placeholderText="Выбрать период"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
                <select>
                  <option>Показать все</option>
                  <option>Показать 1</option>
                  <option>Показать 2</option>
                </select>
              </div>
            </div>
            <div className="block_5_chart">
              <ResponsiveContainer>
                <BarChart
                  data={data_filial}
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
                    {data_filial.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors1[index % 20]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* end block - 5 */}

          {/* block - 6 */}
          <div className="blok_6">
            <div className="block_6_up">
              <p>Динамика доходов во всех филиалах</p>
              <select>
                <option>Показать все</option>
                <option>Показать 1</option>
                <option>Показать 2</option>
              </select>
            </div>
            <div className="block_6_chart">
              <ResponsiveContainer>
                <LineChart
                  width={500}
                  height={300}
                  data={datablock6}
                  margin={{
                    top: 5,
                    right: 0,
                    left: -20,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="10 10" vertical="" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="uv"
                    stroke="#00587F"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* end block - 6 */}
        </div>
      </div>
    </div>
  );
};

export default SideOtdel;
