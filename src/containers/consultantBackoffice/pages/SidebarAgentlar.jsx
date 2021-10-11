import React, { useState } from 'react';
import DatePicker from "react-datepicker"
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import { 
    ResponsiveContainer,Tooltip, 
	Bar, Cell, XAxis, 
	YAxis, CartesianGrid,
	ComposedChart, LabelList
} from "recharts";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import "react-datepicker/dist/react-datepicker.css";

// import img
import search_icon from   "../../../assets/icon/search.svg"            
import settings from   "../../../assets/icon/settings.svg"           
import close_modal from   "../../../assets/icon/close_modal.svg"           
import folder_icon from   "../../../assets/icon/folder_icon.svg"            

// import css 
import "../../../style/css/SidebarAgentlar.css"
import Sidebar from './SidebarConsult';

const data_agent = require("../json/data_agent.json")
const colors = scaleOrdinal(schemeCategory10).range();


const SidebarAgentlar = () => {
    const [viewConsul, setConsul] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [fixEnd, setFix] = useState(false);

    // modal
    const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

    return ( 
        <Sidebar>
    
        <div className="asos">
            <div className="Up_navbar">
                <h4>Агенты</h4>
                <div>
                    <img src="https://picsum.photos/70" alt="" />
                    <div>
                        <h5>Nargiza Akhmedova</h5>
                        <p>IT Specialist</p>
                    </div>
                </div>
            </div>
            <div className="SidebarAgentlar">
                <button onClick={handleOpen}>Добавить сотрудника</button>
                <div className="settSearch">
                    <div className="searchUniv">
                        <img src={search_icon} alt="" />
                        <input type="text" placeholder="Поиск сотрудника"/>
                    </div>
                    <button onClick={()=>{setFix( !fixEnd)}} className="settingsUniver">
                        <img src={settings} alt=""  />
                    </button>
                </div>
                {/* end settSearch */}
                <div className="univerList">
                    <h5>Ваши сотрудники</h5>
                    <table>
                        <thead>
                            <tr>
                                <th className="firstTD">ФИО</th>
                                <th>Филиал</th>
                                <th>Договоры</th>
                                <th>Число клие...</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="firstTD">Максудов Сардорбек</td>
                                <td>Фергана</td>
                                <td>248</td>
                                <td className="priDoc">15</td>
                            </tr>
                            <tr>
                                <td className="firstTD">Максудов Сардорбек</td>
                                <td>Фергана</td>
                                <td>248</td>
                                <td className="priDoc">15</td>
                            </tr>
                            <tr>
                                <td className="firstTD">Максудов Сардорбек</td>
                                <td>Фергана</td>
                                <td>248</td>
                                <td className="priDoc">15</td>
                            </tr>
                            
                        </tbody>
                        
                        
                    </table>
                </div>
                <div className="raytingAgentBlock block_chart vertical_charts">
                <div className="raytingAgentTitle">
                    <p>Рейтинг агентов по кол-во договоров</p>
                        <select>
                            <option>Показать все</option>
                            <option>Показать все</option>
                            <option>Показать все</option>
                        </select>
                </div>
                <div className="diag">
                    <ResponsiveContainer>
                        <ComposedChart
                            layout="vertical"
                            data={data_agent}
                            margin={{
                            top: 20,
                            right: 100,
                            bottom: 0,
                            left: -30
                            }}
                        >
                            <CartesianGrid strokeDasharray="10 10" horizontal="" />
                            <XAxis type="number" />
                            <YAxis dataKey="value" type="category" scale="band" />
                            <Tooltip />
                            <Bar dataKey="value" barSize={20}  fill="#413ea0">
                            <LabelList dataKey="name" position="right"/>
                            {data_agent.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                            ))}
                            </Bar>
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>

                {/* end univerList */}
                {/* Filter */}
                {
                    // fixEnd ?
                    fixEnd === true ?
                    <div className="FilterFix">
                        <div className="fixLeft" onClick={()=>{setFix( !fixEnd)}}></div>
                        <div className="FilterUniver">
                            <h4>Фильтры</h4>
                            <p>Выберите дату вступления на работу</p>
                            <div className="datapickBlock">
                                <div>
                                     <DatePicker
                                        selected={startDate} 
                                        onChange={(date) => setStartDate(date)}
                                        placeholderText="sana"
                                    />
                                </div>
                            </div>
                            <p>Выберите семестр</p>
                            <div className="selectCountry">
                                <select name="" id="">
                                    <option value="">Летний</option>
                                    <option value="">Летний</option>
                                    <option value="">Летний</option>
                                    <option value="">Летний</option>
                                </select>
                            </div>
                            <label className='custom-checkbox checkSt1'>
                                <input type="checkbox" name="" id="" />
                                <span></span>
                                <p>
                                    Поступившие
                                </p>
                            </label>
                            <label className='custom-checkbox checkSt2'>
                                <input type="checkbox" name="" id="" />
                                <span></span>
                                <p>
                                    Непоступившие
                                </p>
                            </label>

                            <div className="viewConsult">
                                <p>Показать консультанта</p>
                                {
                                    viewConsul ?
                                    <div className="actview" onClick={ () =>{setConsul(!viewConsul); } }>
                                        <div></div>
                                    </div>
                                    :
                                    <div className="passview" onClick={ () =>{setConsul(!viewConsul); } }>
                                        <div></div>
                                    </div>
                                }
                                
                            </div>
                            
                            <button>Применить</button>
                        </div>
                        {/* end FilterUniver */}
                    </div>
                    :
                    null
                }
                
                <Modal
						aria-labelledby="transition-modal-title"
						aria-describedby="transition-modal-description"
						className="class1"
						open={open}
						onClose={handleClose}
						closeAfterTransition
						BackdropComponent={Backdrop}
						BackdropProps={{
							timeout: 500
						}}
					>
						<Fade in={open}>
                            <div className="addNewUniverModalUniver talaba_modal">
                                <img onClick={handleClose} src={close_modal} alt="" />
                                <div className="modalContainer">
                                    <h5>Добавить новый университет</h5>
                                    <div>
                                        <label>Название университета</label>
                                        <input type="text" />
                                    </div>
                                    <div>
                                        <label>Название университета</label>
                                        <select>
                                            <option>Выбрать страну</option>
                                            <option>страну</option>
                                            <option>страну</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label>Название университета</label>
                                        <textarea name="" id="" cols="30" rows="5"></textarea>
                                    </div>
                                    <div className="modalDataPick">
                                        <label>Прием документов заканчивается</label>
                                        <DatePicker 
                                            selected={startDate} 
                                            onChange={(date) => setStartDate(date)} 
                                            placeholderText="sana"
                                            />
                                    </div>
                                    <div>
                                        <label>Картинка</label>
                                        <div className="importFile">
                                            <img src={folder_icon} alt="" />
                                            <p>
                                                Drop your files here or a    
                                                <input type="file" id="chFile"/> 
                                                <label htmlFor="chFile">choose file</label>
                                            </p>
                                        </div>
                                    </div>
                                    <button>Добавить</button>
                                </div>
                            </div>
						</Fade>
					</Modal>
                {/* end Filter */}
            </div>
        </div>
        </Sidebar>
        // end SidebarUniverstitet
    
    );
}

export default SidebarAgentlar;