import React, { useState } from "react";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import {
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Arrowright from "../../../assets/icon/Arrowright1.svg";
import search_icon from "../../../assets/icon/search.svg";
import Calendar from "../../../assets/icon/Calendar.svg";
import Sidebar from "./SidebarConsult";
import { useSelector } from "react-redux";
import userpic from "../../../assets/icon/userpic.svg";
const data_filial = require("../json/data_filial.json");
const data = require("../json/data.json");
const colors = scaleOrdinal(schemeCategory10).range();

const Analitika = () => {
  const selector = useSelector((state) => state.payload.payload.data);
  const [startDate, setStartDate] = useState(null);
  return (
    <div className="consultAnnalitika">
      <Sidebar>
        <div className="asos">
          {/* up navbar */}
          <div className="Up_navbar">
            <h4>Бухгалтер Аналитика</h4>
            <div className="user_info">
              <img src={userpic} alt="" />
              <div>
                <p>
                  {selector.first_name} {selector.last_name}
                </p>
                <h5>
                  {(selector.role == "branch_director" && "директор филиала") ||
                    selector.role}
                </h5>
              </div>
            </div>
          </div>
          {/* end up navbar */}
          <div className="sideGlavny">
            <div className="settSearch">
              <div className="searchUniv">
                <img src={search_icon} alt="" />
                <input type="text" placeholder="Поиск филиала для статистики" />
              </div>
            </div>
            <div className="block_2 block_chart">
              <div>
                <h5>Доход по филиалам</h5>
                <div className="seeMoreAct data_pick">
                  <img src={Calendar} alt="" />
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    fixedHeight
                    dateFormat="dd/MMM/yyyy"
                    placeholderText="Выбрать период"
                  />
                  <select>
                    <option>Показать все</option>
                    <option>lorem1</option>
                    <option>lorem2</option>
                  </select>
                </div>
              </div>
              <div className="diag">
                <ResponsiveContainer>
                  <BarChart
                    data={data_filial}
                    margin={{
                      top: 20,
                      right: 30,
                      left: -20,
                      bottom: 30,
                    }}
                  >
                    <CartesianGrid strokeDasharray="10 10" vertical="" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" barSize={45} fill="#8884d8">
                      {data_filial.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="block_2 bottom">
              <div>
                <h5>Динамика доходов во всех филиалах</h5>
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
                  <LineChart
                    width={700}
                    height={300}
                    data={data}
                    margin={{
                      top: 20,
                      right: 10,
                      left: -20,
                      bottom: 30,
                    }}
                  >
                    <CartesianGrid strokeDasharray="10 10" vertical="" />
                    <XAxis dataKey="sana" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      strokeWidth={3}
                      dataKey="Факультеты"
                      stroke="#00587F"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </Sidebar>
    </div>
  );
};
export default Analitika;
