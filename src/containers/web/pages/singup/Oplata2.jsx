import React, { Component } from 'react';
import { NavLink,Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import uzcard from "../../../../assets/icon/uzcard.svg" 
import click from "../../../../assets/icon/click.svg" 
import payme from "../../../../assets/icon/payme.svg" 
import bank from "../../../../assets/icon/bank.svg"
import lock from "../../../../assets/icon/lock.svg"
import arrowleft from "../../../../assets/icon/arrowleft.svg"
import tasdiq from "../../../../assets/icon/tasdiq.svg" 
import error from "../../../../assets/icon/error.svg"
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Navbar from '../Navbar';

class Oplata2 extends Component {
	state = { 
		modal1:false,
		modal2:false
	 }
	handleopen1 = () => {
		this.setState({
			modal1: true
		})
	}
	handleclose1 = () => {
		this.setState({
			modal1: false
		})
	}
	handleopen2 = () => {
		this.setState({
			modal2: true
		})
	}
	handleclose2 = () => {
		this.setState({
			modal2: false
		})
	}
	render() { 
		return ( 
			<React.Fragment>
				<div className="navRegist">
					<Navbar/>
				</div>
				<div className="singup_asos container">
					<div className="nav_name">
						<h1>Процесс поступления</h1>
					</div>
					<div className="up_nav">
						<h2 className="singup_pass">Регистрация/Войти</h2>
						<svg id="svg_pass" width="82" height="10" viewBox="0 0 82 10" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M82 5L74.5 0.669873V9.33013L82 5ZM0 5.75H5.125V4.25H0V5.75ZM15.375 5.75H25.625V4.25H15.375V5.75ZM35.875 5.75H46.125V4.25H35.875V5.75ZM56.375 5.75H66.625V4.25H56.375V5.75Z" fill="#5C7C8A"/>
						</svg>
						<h2 className="singup_pass">Профайл</h2>
						<svg id="svg_pass" width="82" height="10" viewBox="0 0 82 10" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M82 5L74.5 0.669873V9.33013L82 5ZM0 5.75H5.125V4.25H0V5.75ZM15.375 5.75H25.625V4.25H15.375V5.75ZM35.875 5.75H46.125V4.25H35.875V5.75ZM56.375 5.75H66.625V4.25H56.375V5.75Z" fill="#5C7C8A"/>
						</svg>
						<h2 className="singup_pass">Файлы</h2>
						<svg id="svg_pass" width="82" height="10" viewBox="0 0 82 10" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M82 5L74.5 0.669873V9.33013L82 5ZM0 5.75H5.125V4.25H0V5.75ZM15.375 5.75H25.625V4.25H15.375V5.75ZM35.875 5.75H46.125V4.25H35.875V5.75ZM56.375 5.75H66.625V4.25H56.375V5.75Z" fill="#5C7C8A"/>
						</svg>
						<h2 className="singup_active2">Оплата</h2>
					</div>
					<div className="main_singup">
						<h1>Оплата</h1>
						<div className="oplata_asos">
							<div className="oplata_tip">
								<p>Выберите тип оплаты</p>
								<div className="tolov_turlari">
									<NavLink activeClassName="oplata_active" to="/payment-click"><img src={click} alt="" /></NavLink>
									<NavLink activeClassName="oplata_active" to="/payment-payme"><img src={payme} alt="" /></NavLink>
									<NavLink activeClassName="oplata_active" className="bank_tolov" to="/payment-transaction"><img src={bank} alt="" /> Банковский перевод</NavLink>
								</div>
								<div className="oplata_switch">
									<div className="oplata_card">
										<p>Номер карты</p>
										<div className="oplata_div">
											<NumberFormat format="#### #### #### ####" placeholder="8600 хххх хххх ххх" mask="_" />
											<img src={uzcard} alt="" />
										</div>
									</div><br />
									<div className="oplata_card">
										<p>Дата истечения</p>
										<div className="oplata_div">
											<NumberFormat format="##/##" placeholder="MM/ГГ" mask={['М', 'М', 'Г', 'Г']} />
										</div>
									</div>
								</div>
							</div>
							<div className="oplata_kvitansa">
								<p>Квитанция</p>
								<div className="kvitansa_list"><h1>Поиск академических програм</h1><p>$450</p></div>
								<div className="kvitansa_list"><h1>Подбор подкурсов</h1><p>$450</p></div>
								<div className="kvitansa_list"><h1>Оформление визы</h1><p>$450</p></div>
								<div className="kvitansa_list"><h1>Общее</h1><p>$1,350</p></div>
							</div>
						</div>
						<div className="oplata_btn">
							<button onClick={this.handleopen1}><img src={lock} alt="" /> Оплатить $1,350</button>
							<Link to="/registration"><img src={arrowleft} alt="" />Вернуться</Link>
						</div>
					</div>
					<Modal
						aria-labelledby="spring-modal-title"
						aria-describedby="spring-modal-description"
						className="modalll"
						open={this.state.modal1}
						onClose={this.handleclose1}
						className="oplata_modal"
						closeAfterTransition
						BackdropComponent={Backdrop}
						BackdropProps={{
							timeout: 500
						}}
					>
						<Fade in={this.state.modal1}>
							<div className="alert_tasdiq">
								<img src={tasdiq} alt="" />
								<p>Ваш платеж был проведен успешно</p>
								<button onClick={this.handleclose1}>Вернуться</button>
							</div>
						</Fade>
					</Modal>
					<Modal
						aria-labelledby="spring-modal-title"
						aria-describedby="spring-modal-description"
						className="modalll"
						open={this.state.modal2}
						onClose={this.handleclose2}
						className="oplata_modal"
						closeAfterTransition
						BackdropComponent={Backdrop}
						BackdropProps={{
							timeout: 500
						}}
					>
						<Fade in={this.state.modal2}>
						<div className="alert_error">
							<img src={error} alt="" />
							<p>Произошла ошибка при оплате</p>
							<div className="alert_btn">
								<button Click={this.submit_error}>Отменить</button>
								<button>Повторить оплату</button>
							</div>
				  		</div>
						</Fade>
					</Modal>
				</div>
			</React.Fragment>
		 );
	}
}
 
export default Oplata2;