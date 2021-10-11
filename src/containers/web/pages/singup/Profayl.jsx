// import React, { Component, useEffect } from 'react';
// import NumberFormat from 'react-number-format';
// import { NavLink, useHistory, useLocation } from 'react-router-dom';
// import arrowright from "../../../../assets/icon/arrowright.svg"
// import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import Navbar from '../Navbar';
// import { useState } from 'react';
// import Axios from '../../../../utils/axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { authSaveData } from '../../../../store/actions/authActions';
// import Swal from 'sweetalert2';

// const dataT = require("../../json/data.json")

//  function Profayl () {
// 	 const selector = useSelector(state=> state)
// 	 console.log(selector);
// 	 const {form} = selector.dataSave
//      const history = useHistory()
// 	 console.log(form);
// 	 const dispatch = useDispatch()
// 	 const location = useLocation()
// 	 const {pathname} = location
// 	 const [data,setData] = useState(dataT)
// 	 const[region,setRegion] = useState()
// 	 const [cities,setCities] = useState()
// 	 const[profileData,setProfileData] = useState({
// 		 firstName:'',
// 		 lastName:"",
// 		 middleName:'',
// 		 code:'',
// 		 country:'',
// 		 number:'',
// 	 })
	
// 	 const handleRegion = (event,newValue) =>{
//            setRegion(newValue)
// 	 }

// 	 const handleChange = (e) =>{
// 		 const {name,value} = e.target;
// 		 setProfileData(state => ({...state,[name]:value}))
// 	 }
// 	 const finalData = {
// 		firstName: profileData.firstName,
// 		lastName:profileData.lastName,
// 		middleName:profileData.middleName,
// 		code:profileData.code,
// 		country:profileData.country,
// 		number:profileData.number,
// 		region
// 	}
	
// 	const saveData =  () =>{
// 		dispatch(authSaveData(pathname,finalData))
// 		Swal.fire({
// 			icon:"success",
// 			text:"Текущие данные сохранены без промедления"
// 		}).then(()=> history.push('/my-account'))
// 	}
// 	const fetchCities = async () =>{
// 		try {
// 			const data = await Axios.get('/common/city')
// 			const {results} = data.data
// 			console.log(results);
// 			console.log(data.status);
// 			if(data.status === 200) {
// 				setCities(results)
// 			}	
// 		} catch (error) {
// 			console.log(error.response);
// 		}
		
// 	}
//   const localStr = ()=>{
// 	  localStorage.setItem('profile',JSON.stringify(finalData))
//   }

// 	useEffect(()=>{
// 		fetchCities()
// 	},[])
// 	 console.log(profileData);
// 	 console.log(region);
// 	 console.log(cities);
// 	 console.log(finalData);
// 		return ( 
// 			<React.Fragment>
// 				<div className="navRegist">
// 					<Navbar/>
// 				</div>
// 				<div className="singup_asos container">
// 					<div className="nav_name">
// 						<h1>Процесс поступления</h1>
// 					</div>
// 					<div className="up_nav">
// 						<h2 className="singup_pass">Регистрация/Войти</h2>
// 						<svg id="svg_pass" width="82" height="10" viewBox="0 0 82 10" fill="none" xmlns="http://www.w3.org/2000/svg">
// 							<path d="M82 5L74.5 0.669873V9.33013L82 5ZM0 5.75H5.125V4.25H0V5.75ZM15.375 5.75H25.625V4.25H15.375V5.75ZM35.875 5.75H46.125V4.25H35.875V5.75ZM56.375 5.75H66.625V4.25H56.375V5.75Z" fill="#5C7C8A"/>
// 						</svg>
// 						<h2 className="singup_pass">Заявка</h2>
// 						<svg id="svg_pass" width="82" height="10" viewBox="0 0 82 10" fill="none" xmlns="http://www.w3.org/2000/svg">
// 							<path d="M82 5L74.5 0.669873V9.33013L82 5ZM0 5.75H5.125V4.25H0V5.75ZM15.375 5.75H25.625V4.25H15.375V5.75ZM35.875 5.75H46.125V4.25H35.875V5.75ZM56.375 5.75H66.625V4.25H56.375V5.75Z" fill="#5C7C8A"/>
// 						</svg>
// 						<h2 className="singup_active3">Профайл</h2>
// 						<svg width="82" height="10" viewBox="0 0 82 10" fill="none" xmlns="http://www.w3.org/2000/svg">
// 							<path d="M82 5L74.5 0.669873V9.33013L82 5ZM0 5.75H5.125V4.25H0V5.75ZM15.375 5.75H25.625V4.25H15.375V5.75ZM35.875 5.75H46.125V4.25H35.875V5.75ZM56.375 5.75H66.625V4.25H56.375V5.75Z" fill="#5C7C8A"/>
// 						</svg>
// 						<h2>Файлы</h2>
// 						<svg width="82" height="10" viewBox="0 0 82 10" fill="none" xmlns="http://www.w3.org/2000/svg">
// 							<path d="M82 5L74.5 0.669873V9.33013L82 5ZM0 5.75H5.125V4.25H0V5.75ZM15.375 5.75H25.625V4.25H15.375V5.75ZM35.875 5.75H46.125V4.25H35.875V5.75ZM56.375 5.75H66.625V4.25H56.375V5.75Z" fill="#5C7C8A"/>
// 						</svg>
// 						<h2>Оплата</h2>
// 					</div>
// 					<div className="main_singup">
// 						<h1>Профайл</h1>
// 						<div className="pagination">
// 							<div className="page page_a"></div>
// 							<a className="page"></a>
// 							<div className="page"></div>
// 						</div>
// 						<div className="form_div">
// 							<p>Ваша имя </p>
// 							<input type="text" onChange={handleChange} value={form.firstName}  name="firstName"/>
// 						</div>
// 						<div className="form_div">
// 							<p>Ваша фамилия</p>
// 							<input type="text"onChange={handleChange} value={form.lastName}  name="lastName"/>
// 						</div>
// 						<div className="form_div">
// 							<p>Отчество</p>
// 							<input type="text" onChange={handleChange} value={form.middleName} name="middleName"/>
// 						</div>
// 						<div className="form_div">
// 							<p>Гражданство</p>
// 							<input type="text" onChange={handleChange} value={form.country} name="country" />
// 						</div>
// 						<div className="form_div">
// 							<p>Город</p>
// 							<Autocomplete
// 							aria-required
// 							onChange = {handleRegion}
// 							id="profayl_input"
// 							options={cities}
// 							getOptionLabel={(option) => option.name}
// 							style={{ width: 575 }}
// 							renderInput={(params) => <TextField {...params} label="" variant="outlined"/>}
// 							/>
// 						</div>
// 						<div className="form_div">
// 							<p>Телефон</p>
// 							<NumberFormat name="number"  value={form.number} onChange={handleChange} format="+998(##) ###-##-##" allowEmptyFormatting mask="_" />
// 						</div>
// 						<div className="form_div">
// 							<p>Реферальный код</p>
// 							<input type="text" name="code"  value={form.code} onChange={handleChange} />
// 						</div>
// 						<div className="btn_div">
// 							<button onClick={saveData} className="save_btn">Сохранить</button>
// 							<NavLink onClick={localStr} to="/profile2" className="next_btn">Следующее <img src={arrowright} alt="" /></NavLink>
// 						</div>
// 					</div>
// 				</div>
// 			</React.Fragment>
// 		 );
// }
 
// export default Profayl;