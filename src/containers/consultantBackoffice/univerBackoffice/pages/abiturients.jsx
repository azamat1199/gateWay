import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Switch from "@material-ui/core/Switch";
import { Link } from 'react-router-dom';
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

//import img
import idea from  "../../../../assets/icon/idea.svg"  
import warning from  "../../../../assets/icon/warning.svg"  
import close from  "../../../../assets/icon/close2.svg"  
import filter from  "../../../../assets/icon/Filter.svg" 
import excel from  "../../../../assets/icon/excel.svg"  
import search from  "../../../../assets/icon/Search2.svg"   
import yes from  "../../../../assets/icon/yes.svg"  
import no from  "../../../../assets/icon/no.svg" 
import userpic from  "../../../../assets/icon/userpic.svg" 

//import css
import "react-datepicker/dist/react-datepicker.css";
import "../../../../style/css/abiturient.css"
import UniversitetBackoffice from '../universitetBackoffice';


const data_table = require("../json/data_table.json")
const Abiturient = () => {
	const [startDate, setStartDate] = useState(null);
  	const [endDate, setEndDate] = useState(null);

	const [filters, setfilters] = useState(false);

	const [key, setkey] = React.useState("");

	function handleChange(event) {
		setkey(event.target.value);
  	}

	const [openy, setOpeny] = React.useState(false);
	const handleOpeny = () => {
		setOpeny(true);
	};
	const handleClosey = () => {
		setOpeny(false);
	};

	const [openx, setOpenx] = React.useState(false);
	const handleOpenx = () => {
		setOpenx(true);
	};
	const handleClosex = () => {
		setOpenx(false);
	};


	return ( 
		<UniversitetBackoffice>
			<div className="abiturient">
				<div className="up_nav">
					<div>
						<h1 className="link_h1">Абитуриенты</h1>
					</div>
					<div className="user_info">
						<img src={userpic} alt="" />
						<div>
							<h1>Harvard University</h1>
							<h2>Boston, USA</h2>
						</div>
					</div>
					
				</div>
				<div className="abiturients">
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
							<h1>Список абитуриентов</h1>
							<table>
								<thead>
									<th>ФИО</th>
									<th>Факультет</th>
									<th>IELTS</th>
									<th>Принять</th>
								</thead>
								<tbody>
									{data_table.map ((data)=>{
										if (filters) {
											return(
												<tr>
													<th><Link to="/singlepage">{data.first_name} {data.last_name}</Link></th>
													<th>{data.fakultet}</th>
													<th>{data.ielts}</th>
													<th>
														<button onClick={handleOpeny}><img src={yes} alt="" /></button>
														<button onClick={handleOpenx}><img src={no} alt="" /></button>
													</th>
												</tr>
											)
										}
										else {
											if (data.first_name.toUpperCase().includes(key.toUpperCase())){
												return(
													<tr>
														<th><Link to="/singlepage">{data.first_name} {data.last_name}</Link></th>
														<th>{data.fakultet}</th>
														<th>{data.ielts}</th>
														<th>
															<button onClick={handleOpeny}><img src={yes} alt="" /></button>
															<button onClick={handleOpenx}><img src={no} alt="" /></button>
														</th>
													</tr>
												)
											}
											if (data.last_name.toUpperCase().includes(key.toUpperCase())){
												return(
													<tr>
														<th><Link to="/singlepage">{data.first_name} {data.last_name}</Link></th>
														<th>{data.fakultet}</th>
														<th>{data.ielts}</th>
														<th>
															<button onClick={handleOpeny}><img src={yes} alt="" /></button>
															<button onClick={handleOpenx}><img src={no} alt="" /></button>
														</th>
													</tr>
												)
											}
											if (data.fakultet.toUpperCase().includes(key.toUpperCase())){
												return(
													<tr>
														<th><Link to="/singlepage">{data.first_name} {data.last_name}</Link></th>
														<th>{data.fakultet}</th>
														<th>{data.ielts}</th>
														<th>
															<button onClick={handleOpeny}><img src={yes} alt="" /></button>
															<button onClick={handleOpenx}><img src={no} alt="" /></button>
														</th>
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
						<Modal
							aria-labelledby="transition-modal-title"
							aria-describedby="transition-modal-description"
							className="class_modal"
							open={openy}
							onClose={handleClosey}
							closeAfterTransition
							BackdropComponent={Backdrop}
							BackdropProps={{
								timeout: 500
							}}
						>
							<Fade in={openy}>
								<div className="modal">
									<div className="close_btn">
										<img onClick={handleClosey} src={close} alt="" />
									</div>
									
									<img src={warning} alt="" />
									<h1>Вы действительно хотите принять <span> Сардорбек Максудов</span> на учебу?</h1>
									<div className="modal_btn">
										<button onClick={handleClosey}>Отменить</button>
										<button onClick={handleClosey}>Принять</button>
									</div>
									
								</div>
							</Fade>
						</Modal>
						<Modal
							aria-labelledby="transition-modal-title"
							aria-describedby="transition-modal-description"
							className="class_modal"
							open={openx}
							onClose={handleClosex}
							closeAfterTransition
							BackdropComponent={Backdrop}
							BackdropProps={{
								timeout: 500
							}}
						>
							<Fade in={openx}>
								<div className="modal">
									<div className="close_btn">
										<img onClick={handleClosex} src={close} alt="" />
									</div>
									
									<img src={idea} alt="" />
									<h1>Причина отказа:</h1>
									<input type="text" placeholder="Напишите причину отказа"/>
									<div className="modal_btn">
										<button onClick={handleClosex}>Отменить</button>
										<button onClick={handleClosex}>Отправить</button>
									</div>
									
								</div>
							</Fade>
						</Modal>
							
				</div>
			</div>
		</UniversitetBackoffice>
		);
}
 
export default Abiturient;