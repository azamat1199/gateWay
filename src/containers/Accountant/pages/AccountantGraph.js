import React, { Component, useCallback, useState ,useEffect} from "react";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import Loader from 'react-js-loader';
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
import styled from 'styled-components'
// import css
import "../../../style/css/SideGlavny.css";

// import icon
import userpic from "../../../assets/icon/LogoAsia.jpg";
import search_icon from "../../../assets/icon/search.svg";
import settings from "../../../assets/icon/settings.svg";
import Sidebar from "../../consultantBackoffice/pages/SidebarConsult";
import Stroke from "../../../assets/images/Stroke.svg";
import blueStroke from "../../../assets/images/Stroke-blue.svg";
import Axios from "../../../utils/axios";
import {useSelector} from 'react-redux'
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
  const selector = useSelector((state) => state);
  const { payload } = selector?.payload;
  const {  first_name,last_name} = payload?.data;
  const [startDate, setStartDate] = useState(null);
  const [branchPayment,setBranchPayment] = useState([])
  const [endDate, setEndDate] = useState(null);
  const [startDate1, setStartDate1] = useState(null);
  const [startDate2, setStartDate2] = useState(null);
  const [loading,setLoading] = useState(false)
  const [second,setSecond] = useState([])
  const [payment,setPayment] = useState({
    not_paid:'',
    paid:'',
    waiting_confirmation:''
  });
  const fetchNumber = async()=>{
    setLoading(true)
    try {
      const res = await Axios.get('/company/director/statistics/accountant/third_block/');
      const {status,data} = res;
      if(status === 200){
        const {payment,payment_status_by_branch} = data;
        setPayment(payment)
        setBranchPayment(payment_status_by_branch)
      }
      console.log(res);
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }
 const fetchByDay = async()=>{
   setLoading(true)
   try {
     const res = await Axios.get(`/company/director/statistics/accountant/third_block/?day=true`)
     const {status,data} = res;
     if(status === 200){
       const {payment} = data;
       setPayment(payment)
     }
     setLoading(false)
   } catch (error) {
     console.log(error);
     setLoading(false)
   }
 }
 const fetchByWeek = async()=>{
   setLoading(true)
   try {
     const res = await Axios.get(`/company/director/statistics/accountant/third_block/?week=true`)
     const {status,data} = res;
     if(status === 200){
       const {payment} = data;
       setPayment(payment)
     }
     setLoading(false)
   } catch (error) {
     console.log(error);
     setLoading(false)
   }
 }
 const fetchByMonth = async()=>{
   setLoading(true)
   try {
     const res = await Axios.get(`/company/director/statistics/accountant/third_block/?month=true`)
     const {status,data} = res;
     if(status === 200){
       const {payment} = data;
       setPayment(payment)
     }
     setLoading(false)
   } catch (error) {
     console.log(error);
     setLoading(false)
   }
 }
 const fetchByYear = async()=>{
   setLoading(true)
   try {
     const res = await Axios.get(`/company/director/statistics/accountant/third_block/?year=true`)
     const {status,data} = res;
     if(status === 200){
       const {payment} = data;
       setPayment(payment)
     }
     setLoading(false)
   } catch (error) {
     console.log(error);
     setLoading(false)
   }
 }
 const fetchByChoosenDate = async()=>{
   setLoading(true)
    try {
      const res = await Axios.get(`/company/director/statistics/accountant/third_block/?date-from=${startDate.toLocaleDateString()}&date-to=${endDate.toLocaleDateString()}`)
      const {status,data} = res;
      if(status === 200){
        const {payment} = data;
        setPayment(payment)
      }
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
}
  const fetchSecondBlock = async()=>{
    setLoading(true)
    try {
      const res = await Axios.get('/company/director/statistics/accountant/second_block/');
      const {status,data} = res;
      if(status === 200){
        setSecond(data)
      }
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }
  useEffect(()=>{
    fetchNumber()
    fetchSecondBlock()
  },[])
  return (
    <div className="right-side">
      <div className="asos" id="top">
        <div className="Up_navbar">
          <div>
            <div className="nav-bugalter">
              <h4>Отдел аналитики</h4>
              <h5>Аналитика</h5>
            </div>
          </div>
          <div className="head-img">
            <img src={userpic} alt="" />
            <div>
              <h5>{first_name} {last_name}</h5>
              <p>Бухгалтер</p>
            </div>
          </div>
        </div>

        <div className="sideOtdel">
          {/* block - 0 */}
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
						</p> -
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

          <div className="block_0">
            <div className="settSearch">
              <div className="searchUniv">
                <img src={search_icon} alt="" />
                <input type="text" placeholder="Поиск университетов" />
              </div>
            </div>
          </div>

          {/* block - 1 */}
          <div className="block_1">
            {/* card */}
            <div className="card_1 card">
                <h4>Неоплаченные</h4>
                <h3>{payment.not_paid}</h3>
            </div>
            {/* card */}

          
              {loading ? 
                <Loader
                  type="spinner-circle"
                  bgColor={"#FFFFFF"}
                  color={"#FFFFFF"}
                  size={80}
                />
                :
                <div className="card_2 card">
                  <h4>Оплаченные</h4>
                  <h3>{payment.paid}</h3>
                </div>
            }
                
            {/* card */}
            <div className="card_3 card">
                <h4>Ждуть подтверждения</h4>
                <h3>{payment.waiting_confirmation}</h3>
            </div>
            <div className="card_3 card">
                {/* <h4>Ждуть подтверждения</h4>
                <h3>{payment.waiting_confirmation}</h3> */}
            </div>
          </div>
            {/* end block - 1 */}


          {/* block - 5 */}
          <div className="block_5">
            <div className="block_5_up">
              <p>Неоплаченные квитанции  по филиалам</p>
              <div>
                {/* <div style={{display:'flex'}}>
                  <DatePicker
                    placeholderText="Выбрать период"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                  <DatePicker
                    placeholderText="Выбрать период"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                  />
                </div> */}
                {/* <select>
                  <option>Показать все</option>
                  <option>Показать 1</option>
                  <option>Показать 2</option>
                </select> */}
              </div>
            </div>
            <div className="block_5_chart">
              <ResponsiveContainer>
                <BarChart
                  data={second}
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
              <p>Динамика абаратов во всех филиалах</p>
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
                  data={branchPayment}
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
                    dataKey="not_paid"
                    stroke="#00587F"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* end block - 6 */}
        </div>
        <a href="#top" title="Go to top" className="backTop">
          <img src={blueStroke} alt="back to top" />
        </a>
      </div>
    </div>
  );
};

export default SideOtdel;

const FilterContainer = styled.div`
    display: flex;
	flex-wrap:wrap;
    width: 100%;
    height: 70px;
	padding:0 20px;
    align-items: center;
    justify-content: space-around;
      p{
		background: #fff;
		width: 148px;
		height: 49px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 14px;
		font-size: 18px;
		font-weight: 600;
		opacity:0.6;
		cursor:pointer;
		 &:hover{
			 opacity:1;
			 transition:all 0.25s;
			 box-shadow: 0px -2px 8px rgba(13, 83, 114, 0.15), 2px 4px 9px rgba(13, 83, 114, 0.15);
			 border: 1px solid #1AB9;
		 }
		 input{
			 border:none;
			 outline:none;
			 height:100%;
			 width:100%;
		 }
	  }    
`
