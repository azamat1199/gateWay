import React, { useState } from 'react';
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import DatePicker from "react-datepicker"
import { 
	ResponsiveContainer,Tooltip,
	BarChart, Bar, Cell, XAxis,
	YAxis, CartesianGrid,
	ComposedChart, LabelList
} from "recharts";
import "react-datepicker/dist/react-datepicker.css";

import "../../../style/css/dagavor.css"
import Calendar from "../../../assets/icon/Calendar.svg"
import Sidebar from './SidebarConsult';

// import json
const data_doxod = require("../json/data_doxod.json")
const data_filial = require("../json/data_filial.json")
const data_populyar = require("../json/data_populyar.json")
const data_univer = require("../json/data_univer.json")

const colors = scaleOrdinal(schemeCategory10).range();


const Dagavori = () => {
	const [startDate, setStartDate] = useState(null);
	const [startDate2, setStartDate2] = useState(null);
	return (
		<Sidebar>
		<div className="asos">
			<div className="Up_navbar">
					<h4>Договоры</h4>
					<div>
						<img src="https://picsum.photos/70" alt="" />
						<div>
							<h5>Nargiza Akhmedova</h5>
							<p>IT Specialist</p>
						</div>
					</div>
			</div>
			<div className="sideGlavny">
				<div className="dagavor_select">
					<h4>Показать статистику за  </h4>
					<select>
							<option>Все филилалы</option>
							<option>lorem1</option>
							<option>lorem2</option>
					</select>
				</div>
				{/* block - 1 */}
				<div className="block_1">
					{/* card */}
					<div className="card_1 card">
						<h4>Договоры за 1 день</h4>
						<h3>1424</h3>
					</div>
					{/* card */}
					<div className="card_2 card">
						<h4>За неделю</h4>
						<h3>58</h3>
					</div>
					{/* card */}
					<div className="card_3 card">
						<h4>За месяц</h4>
						<h3>8</h3>
					</div>
					{/* card */}
					<div className="card_4 card">
						<h4>За год</h4>
						<h3>740</h3>
					</div>
				</div>
				{/* end block - 1 */}
				<div className="block_2 block_chart">
					<div>
						<h5>Кол-во договоров по филиалам</h5>
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
								right: 0,
								left: -20,
								bottom: 50
								}}
							>
								<CartesianGrid strokeDasharray="10 10" vertical="" />
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip/>
								<Bar dataKey="value" barSize={45} fill="#8884d8">
								{data_filial.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={colors[index % 20]} />
								))}
								</Bar>
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>
				<div className="block_2 block_chart">
					<div>
						<h5>Кол-во договоров по университетам</h5>
						<div className="seeMoreAct data_pick">
							<img src={Calendar} alt="" />
							<DatePicker
								selected={startDate2}
								onChange={(date) => setStartDate2(date)}
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
							data={data_univer}
							margin={{
							top: 20,
							right: 0,
							left: -20,
							bottom: 50
							}}
						>
							<CartesianGrid strokeDasharray="10 10" vertical="" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip/>
							<Bar dataKey="value" barSize={45} fill="#8884d8">
							{data_univer.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={colors[index % 20]} />
							))}
							</Bar>
						</BarChart>
					</ResponsiveContainer>
					</div>
				</div>
				<div className="block_2 block_chart vertical_charts">
					<div>
						<h5>Самые доходные университеты по услугам компании</h5>
					</div>
					<div className="diag">
					<ResponsiveContainer>
						<ComposedChart
							layout="vertical"
							data={data_doxod}
							margin={{
							top: 0,
							right: 100,
							bottom: 10,
							left: -20
							}}
						>
							<CartesianGrid strokeDasharray="10 10" horizontal="" />
							<XAxis type="number" />
							<YAxis dataKey="value" type="category" scale="band" />
							<Tooltip />
							<Bar dataKey="value" barSize={20}  fill="#413ea0">
							<LabelList dataKey="name" position="right"/>
							{data_doxod.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={colors[index % 20]} />
							))}
							</Bar>
						</ComposedChart>
					</ResponsiveContainer>
					</div>
				</div>
				<div className="block_2 block_chart vertical_charts">
					<div>
						<h5>Самые популярные колледжи по числу поступивших студентов</h5>
					</div>
					<div className="diag">
						<ResponsiveContainer>
							<ComposedChart
								layout="vertical"
								data={data_populyar}
								margin={{
								top: 20,
								right: 100,
								bottom: 20,
								left: -20
								}} >
								<CartesianGrid strokeDasharray="10 10" horizontal="" />
								<XAxis type="number" />
								<YAxis dataKey="value" type="category" scale="band" />
								<Tooltip />
								<Bar dataKey="value" barSize={20}  fill="#413ea0">
									<LabelList dataKey="name" position="right"/>
									{data_populyar.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={colors[index % 20]} />
								))}
								</Bar>
							</ComposedChart>
						</ResponsiveContainer>
					</div>
				</div>
			</div>
		</div>
		</Sidebar> 
	);
}

export default Dagavori;