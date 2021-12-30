import React, { Component, useState,useEffect } from 'react';
import { NavLink,Link ,useHistory} from 'react-router-dom';
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
import Axios from "../../../../utils/axios";
import Swal from 'sweetalert2';
import Loader from "react-js-loader";
const  Oplata2 = ()=>{
	const [loading,setLoading] = useState(false)
	const [cardData,setCardData] = useState({
		card_number:'',
		expire:''
	});
	const [amount,setAmount] = useState()
	 const [state,setState] = useState( { 
		modal1:false,
		modal2:false
	 })
	const handleopen1 = () => {
		setState({
			modal1: true
		})
	}
	const history  = useHistory()
	const handleclose1 = () => {
		setState({
			modal1: false
		})
	}
	const handleopen2 = () => {
		setState({
			modal2: true
		})
	}
	const handleclose2 = () => {
		setState({
			modal2: false
		})
	}
	const handleChange = (e)=>{
		const {value,name} = e.target;
		setCardData({...cardData,[name]:value})
		console.log(value,name);
	}
	const fetchUserData = async()=>{
        try {
			const res = await Axios.get('/applicant/me/')
			const {status,data} = res;
			if(status === 200){
               const {amount} = data;
			   setAmount(amount)
			}
		} catch (error) {
			
		}
	}
	const handleSubmit = async()=>{
		setLoading(true)
		try {
			const res = await Axios.post('/payments/payme/cardinfo/',cardData)
			const {status,data} = res;
			const {token} = data;
			const {phone} = data?.result
			if(status === 200){
				const {value:text} =  await Swal.fire({
					text:`Пожалуйста введите код который отправлен на ваш номер!`,
					input:'text',
					timer:60000,
					timerProgressBar: true,
				})
				if(text){
					try {
						const res = await Axios.post('/payments/payme/verify/',{token,amount:amount,code:text})
						const {status} = res
						if(status === 200 ){
							Swal.fire({
								icon:'success',
								text:'Ваш платеж  успешно оплачено'
							}).then(()=> history.push('/my-account'))
						}
						console.log(res);
					} catch (error) {
						const {status} = error?.response
						if(status === 400){
							const {message} = error?.response?.data?.error;
							Swal.fire({
								icon:'error',
								text:`${message}`
							})
						}
						console.log(error.response);
					}
				}
			}
			console.log(res);
			setLoading(false)
		} catch (error) {
			setLoading(false)
		}
	}
	useEffect(()=>{
		fetchUserData()
	},[]);
	console.log(amount);
	console.log(cardData);
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
											<NumberFormat name="card_number" onChange={handleChange} format="################" placeholder="8600 хххх хххх ххх" mask="_" />
											<img src={uzcard} alt="" />
										</div>
									</div><br />
									<div className="oplata_card">
										<p>Дата истечения</p>
										<div className="oplata_div">
											<NumberFormat name='expire' format="####" onChange={handleChange} placeholder="MM/ГГ" mask={['М', 'М', 'Г', 'Г']} />
										</div>
									</div>
								</div>
							</div>
							<div className="oplata_kvitansa">
								<p>Квитанция</p>
								<div className="kvitansa_list"><h1>Услуги Education Gateway</h1><p>{amount}</p></div>
							</div>
						</div>
						<div className="oplata_btn">
							<button onClick={handleSubmit}><img src={lock} alt="" /> {loading ?  <Loader  type="spinner-circle" bgColor={"#FFFFFF"}  color={'#FFFFFF'} size={50} /> :' Оплатить ' + amount} </button>
							<Link to="/my-account"><img src={arrowleft} alt="" />Вернуться</Link>
						</div>
					</div>
					<Modal
						aria-labelledby="spring-modal-title"
						aria-describedby="spring-modal-description"
						className="modalll"
						open={state.modal1}
						onClose={handleclose1}
						className="oplata_modal"
						closeAfterTransition
						BackdropComponent={Backdrop}
						BackdropProps={{
							timeout: 500
						}}
					>
						<Fade in={state.modal1}>
							<div className="alert_tasdiq">
								<img src={tasdiq} alt="" />
								<p>Ваш платеж был проведен успешно</p>
								<button onClick={()=> history.push('/my-account')}>Вернуться</button>
							</div>
						</Fade>
					</Modal>
					<Modal
						aria-labelledby="spring-modal-title"
						aria-describedby="spring-modal-description"
						className="modalll"
						open={state.modal2}
						onClose={handleclose2}
						className="oplata_modal"
						closeAfterTransition
						BackdropComponent={Backdrop}
						BackdropProps={{
							timeout: 500
						}}
					>
						<Fade in={state.modal2}>
						<div className="alert_error">
							<img src={error} alt="" />
							<p>Произошла ошибка при оплате</p>
							<div className="alert_btn">
								<button >Отменить</button>
								<button>Повторить оплату</button>
							</div>
				  		</div>
						</Fade>
					</Modal>
				</div>
			</React.Fragment>
		 );
}
 
export default Oplata2;