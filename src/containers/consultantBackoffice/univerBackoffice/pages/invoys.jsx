import React, { useState } from 'react';
import DatePicker from "react-datepicker"
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Switch from "@material-ui/core/Switch";
import { Link } from 'react-router-dom';

//import css
import "react-datepicker/dist/react-datepicker.css";

//import img
import filter from "../../../../assets/icon/Filter.svg"
import excel from "../../../../assets/icon/excel.svg" 
import search from "../../../../assets/icon/Search2.svg"  
import Message from "../../../../assets/icon/Message2.svg"
import userpic from "../../../../assets/icon/userpic.svg"  
import close from "../../../../assets/icon/close.svg"  
import UniversitetBackoffice from '../universitetBackoffice';


const data_table = require("../json/data_table.json")

const Invoys =() => {
	const [startDate, setStartDate] = useState(null);
  	const [endDate, setEndDate] = useState(null);

	const [filters, setfilters] = useState(false);

	const [key, setkey] = React.useState("");

	function handleChange(event) {
		setkey(event.target.value);
  	}
	return ( 
		<UniversitetBackoffice>
			<div className="up_nav">
				<div>
					<h1 className="link_h1">Инвойсы</h1>
				</div>
				<div className="user_info">
					<img src={userpic} alt="" />
					<div>
						<h1>Harvard University</h1>
						<h2>Boston, USA</h2>
					</div>
				</div>
				
			</div>
			<div className="invoys">
				<div className="ab_1">
					<div className="excel">
						<button>
							<img src={excel} alt="" />
							Excel
						</button>
					</div>
					<div className="search">
						<div className="input">
							<button><img src={search} alt="" /></button>
							<input type="text" onChange={ handleChange }/>
						</div>
						<div className="filtr_btn">
							<button onClick={() => {setfilters(!filters) }}>
								<img src={filter} alt="" />
							</button>
						</div>
					</div>
					<div className="table">
						<div className="table_up">
							<div><h1>Список абитуриентов</h1></div>
							<div>
								<select name="" id="">
									<option value="">Показать все</option>
									<option value="">lorem 1</option>
									<option value="">lorem 2</option>
								</select>
							</div>
						</div>
						
						<table>
							<thead>
								<th>ФИО</th>
								<th>Контракт</th>
								<th>Прочие расходы</th>
								<th>Инвойс</th>
							</thead>
							<tbody>
								{data_table.map ((data)=>{
									if (filters) {
										return(
											<tr>
												<th><Link to="/singlepage">{data.first_name} {data.last_name}</Link></th>
												<th>$ {data.contract}</th>
												<th>$ {data.rasxod}</th>
												<th><a href="#"><img src={Message} alt="" /></a></th>
											</tr>
										)
									}
									else {
										if (data.first_name.toUpperCase().includes(key.toUpperCase())){
											return(
												<tr>
													<th><Link to="/singlepage">{data.first_name} {data.last_name}</Link></th>
													<th>$ {data.contract}</th>
													<th>$ {data.rasxod}</th>
													<th><a href="#"><img src={Message} alt="" /></a></th>
												</tr>
											)
										}
									}
								})}
							</tbody>
						</table>
					</div>
				</div>
				<div className="ab_2" id={filters ? "ra0" : "ra100"}>
				<button onClick={() => {setfilters(!filters) }} className="ab_2_close"><img src={close} alt="" /></button>
					<h1>Фильтры</h1>
					<div className="form_ab">
						<h2>Выберите период</h2>
						<div className="form_div">
						<DatePicker
							selected={startDate}
							onChange={(date) => setStartDate(date)}
							selectsStart
							startDate={startDate}
							endDate={endDate}
							dateFormat="dd MMM yyyy"
							placeholderText=""
						/>
						<DatePicker
							selected={endDate}
							onChange={(date) => setEndDate(date)}
							selectsEnd
							startDate={startDate}
							endDate={endDate}
							dateFormat="dd MMM yyyy"
							minDate={startDate}
							placeholderText=""
						/>
						</div>
					</div>
					<div className="form_ab">
						<h2>Выберите семестр</h2>
						<div className="form_div">
							<select name="" id="">
								<option value="">Весенний</option>
								<option value="">Летний</option>
								<option value="">Осенний</option>
								<option value="">Зимний</option>
							</select>
						</div>
					</div>
					<div className="form_ab">
						<FormControl component="fieldset">
							<FormGroup aria-label="position" className="ab_check" row>
								<FormControlLabel
									value="Поступившие"
									control={<Checkbox color="primary" />}
									label="Поступившие"
									labelPlacement="end"
								/>
								<FormControlLabel
									value="Непоступившие"
									control={<Checkbox color="primary" />}
									label="Непоступившие"
									labelPlacement="end"
								/>
							</FormGroup>
						</FormControl>
					</div>
					<div className="form_ab">
						<FormControl component="fieldset" className="ab_switch">
							<FormGroup aria-label="position" row>
							<FormControlLabel
								value="show"
								control={<Switch color="primary" />}
								label="Показать консультанта"
								labelPlacement="start"
							/>
							</FormGroup>
						</FormControl>
					</div>
					<div className="form_ab">
						<button className="form_button" onClick={() => {setfilters(!filters) }}>Применить</button>
					</div>

				</div>
			</div>
		</UniversitetBackoffice>
		);
}
 
export default Invoys;