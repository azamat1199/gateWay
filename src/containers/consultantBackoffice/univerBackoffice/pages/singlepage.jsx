import React, { Component } from 'react';

//import img
import img from   "../../../../assets/icon/img.svg" 
import download from   "../../../../assets/icon/download.svg" 
import yes from   "../../../../assets/icon/yes.svg"  
import no from   "../../../../assets/icon/no.svg"   
import userpic from   "../../../../assets/icon/userpic.svg" 

//import css
import "../../../../style/css/singlepage.css"
import { useSelector } from 'react-redux';


function Singlepage () {
	const selector = useSelector(state=> console.log(state))
		return ( 
			<React.Fragment>
				<div className="up_nav">
					<div>
						<h1 className="link_h1">Абитуриенты  <span> {'>'}  Информация</span></h1>
					</div>
					<div className="user_info">
						<img src={userpic} alt="" />
						<div>
							<h1>Harvard University</h1>
							<h2>Boston, USA</h2>
						</div>
					</div>
					
				</div>
				<div className="singlepage">
					<div className="single_up">
						<div>
							<div className="single_1">
								<img src={img} alt="" />
							</div>
							<div className="single_2">
								<h1>Наргиза Ахмедова</h1>
								<h2>22 лет, Фергана, Узбекистан</h2>
							</div>
						</div>
						<div>
							<a href="#">
								<img src={download} alt="" />
								Скачать PDF
							</a>
						</div>
					</div>

					<div className="single_down">
						<h1>Ваши данные</h1>
						<div className="single_info">
							<div className="info_1">
								<div><h1>Имя</h1></div>
								<div><p>Нафиса</p></div>
							</div>
							<div className="info_1">
								<div><h1>Фамилия</h1></div>
								<div><p>Абдураимова</p></div>
							</div>
							<div className="info_1">
								<div><h1>Отчество</h1></div>
								<div><p>Зафар кизи</p></div>
							</div>
							<div className="info_1">
								<div><h1>Университет</h1></div>
								<div><p>Омская гуманитарная академия</p></div>
							</div>
							<div className="info_1">
								<div><h1>Факультет</h1></div>
								<div><p>Педагогическое образование (с двумя профилями подготовки) (уровень бакалавриата)</p></div>
							</div>
							<div className="info_1">
								<div><h1>Специальность</h1></div>
								<div><p>Начальное образование и иностранный язык (английский язык)</p></div>
							</div>
							<div className="info_1">
								<div><h1>IELTS</h1></div>
								<div><p>7</p></div>
							</div>
							<div className="info_1 info_a">
								<div><h1>Документы</h1></div>
								<div><a href="#">Паспорт.pdf</a>,  <a href="#">IELTS Certificate.pdf</a>,  <a href="#">Diploma.pdf</a></div>
							</div>
						</div>
						<div className="info_btn">
							<button><img src={no} alt="" />Отклонить</button>
							<button><img src={yes} alt="" />Принять</button>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
 
export default Singlepage;