import React, { Component ,useState} from 'react';
import { BrowserRouter, NavLink, Route, Switch,useHistory } from 'react-router-dom';

//import img
import Logout from  "../../../assets/icon/logout.svg"  
import logo from  "../../../assets/icon/logo.svg"  
import home from  "../../../assets/icon/Home.svg" 
import user from  "../../../assets/icon/User.svg" 
import paper from "../../../assets/icon/Paper.svg" 
import doc from   "../../../assets/icon/Document.svg"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { signOutAction } from '../../../store/actions/authActions';


function UniversitetBackoffice(props) {
	const history = useHistory()

	const [menu , setMenu] = useState(false)

    const selector = useSelector(state=> state)

    const dispatch = useDispatch()

	const signOut = ()=>{
		dispatch(signOutAction())
		history.replace('/')
	}

	console.log(selector);

	const handlemenu = () =>{
		setMenu(!menu)
	}

	const handlemenuclose = () =>{
		setMenu(false)
	}

	
		return ( 
			<>
						<div className="asos_1">
							<div className="navfixed" id={menu ? "left0" : ""}>
								<div className="logo">
									<img src={logo} alt="" />
									<h1>Education Gateway</h1>
								</div>
								<div className="links">
									<NavLink onClick={handlemenu} activeClassName="active_unve" to="/univer-backoffice-page"><img src={home} alt="" />Главное</NavLink>
									<NavLink onClick={handlemenu} activeClassName="active_unve" to="/studentsss"><img src={user} alt="" />Абитуриенты</NavLink>
									<NavLink onClick={handlemenu} activeClassName="active_unve" to="/invoice"><img src={paper} alt="" />Инвойсы</NavLink>
									<NavLink onClick={handlemenu} activeClassName="active_unve" to="/info"><img src={doc} alt="" />Данные</NavLink>
									<button onClick={signOut}><img src={Logout} /> Log out</button>
								</div>
							</div>
							<div className="fix_diiv"></div>
						</div>
						<div className="asos_2" >
							<button onClick={handlemenu} className="burger_btn"><span></span><span></span><span></span></button>
							<div className="switchs" onClick={handlemenuclose}>
							    {props.children}
							</div>
						</div>
		   </>
		 );
}
 
export default UniversitetBackoffice;