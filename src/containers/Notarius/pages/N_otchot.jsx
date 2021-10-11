import React, { useState } from 'react';
import NotariusSidebar from '../NotariusStudent';
import userpic from  "../../../assets/icon/userpic.svg"
import {
	LineChart, Line, XAxis, YAxis,
	CartesianGrid, Tooltip, Legend,
	ResponsiveContainer, BarChart,
	Bar, ComposedChart, LabelList,
	PieChart, Pie, Cell
} from "recharts";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css"


const colors = scaleOrdinal(schemeCategory10).range();

const data_doxod = require("../../consultantBackoffice/json/data_doxod.json")

const N_otchot = () => {

	const [startDate1, setStartDate1] = useState(null);
	const [startDate2, setStartDate2] = useState(null);
	const [startDate3, setStartDate3] = useState(null);

    return ( 
        <React.Fragment>
            <NotariusSidebar/>
			<div>
				<div className="up_nav n_up">
					<div>
						<h1 className="link_h1">Отчет аналитики</h1>
					</div>
					<div className="user_info">
						<img src={userpic} alt="" />
						<div>
							<h1>Sevara Ibragimova</h1>
							<h2>Нотариус</h2>
						</div>
					</div>
				</div>
				<div className="home n_otchot">
					<div className="block_1">
						{/* card */}
						<div className="card_1 card">
							<h4>Student</h4>
							<h3>1424</h3>
						</div>
						{/* card */}
						<div className="card_2 card">
							<h4>Страны</h4>
							<h3>8</h3>
						</div>
						{/* card */}
						<div className="card_3 card">
							<h4>Поступившие</h4>
							<h3>740</h3>
						</div>
						{/* card */}
						<div className="card_4 card">
							<h4>Непоступившие</h4>
							<h3>58</h3>
						</div>
					</div>
					<div className="scroll">
						<div className="block_3">
							<div className="block_3_up">
								<p>Кол-во договоров по филиалам</p>
								<div>
										<div>
											<DatePicker placeholderText="Выбрать период" selected={startDate1} onChange={(date) => setStartDate1(date)} />
										</div>
										<select>
											<option>Показать все</option>
											<option>Показать 1</option>
											<option>Показать 2</option>
										</select>
								</div>
							</div>
							<div className="block_3_chart">
								<ResponsiveContainer>
									<BarChart
										data={data_doxod}
										margin={{
											top: 20,
											right: 0,
											left: -20,
											bottom: 20
										}}
									>
										<CartesianGrid strokeDasharray="10 10" vertical="" />
										<XAxis dataKey="name" />
										<YAxis />
										<Tooltip/>
										<Bar dataKey="value" barSize={45} fill="#8884d8">
										{data_doxod.map((entry, index) => (
											<Cell key={`cell-${index}`} fill={colors[index % 20]} />
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
								<p>Кол-во договоров по университетам</p>
								<div>
										<div>
											<DatePicker placeholderText="Выбрать период" selected={startDate2} onChange={(date) => setStartDate2(date)} />
										</div>
										<select>
											<option>Показать все</option>
											<option>Показать 1</option>
											<option>Показать 2</option>
										</select>
								</div>
							</div>
							<div className="block_3_chart">
								<ResponsiveContainer>
									<BarChart
										data={data_doxod}
										margin={{
											top: 20,
											right: 0,
											left: -20,
											bottom: 20
										}}
									>
										<CartesianGrid strokeDasharray="10 10" vertical="" />
										<XAxis dataKey="name" />
										<YAxis />
										<Tooltip/>
										<Bar dataKey="value" barSize={45} fill="#8884d8">
										{data_doxod.map((entry, index) => (
											<Cell key={`cell-${index}`} fill={colors[index % 20]} />
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
								<p>Самые популярные колледжи по числу поступивших студентов</p>
								<div>
										<div>
											<DatePicker placeholderText="Выбрать период" selected={startDate3} onChange={(date) => setStartDate3(date)} />
										</div>
										<select>
											<option>Показать все</option>
											<option>Показать 1</option>
											<option>Показать 2</option>
										</select>
								</div>
							</div>
							<div className="block_3_chart">
							<ResponsiveContainer>
								<ComposedChart
									layout="vertical"
									data={data_doxod}
									margin={{
										top: 0,
										right: 100,
										bottom: 50,
										left: -20
									}} >
									<CartesianGrid strokeDasharray="10 10" horizontal="" />
									<XAxis type="number" />
									<YAxis dataKey="value" type="category" scale="band" />
									<Tooltip />
									<Bar dataKey="value" barSize={45}  fill="#413ea0">
										<LabelList dataKey="name" position="right"/>
										{data_doxod.map((entry, index) => (
										<Cell key={`cell-${index}`} fill={colors[index % 20]} />
									))}
									</Bar>
								</ComposedChart>
							</ResponsiveContainer>
							</div>
						</div>
					</div>
				</div>
			</div>
        </React.Fragment>
     );
}
 
export default N_otchot;