import React, { useState } from 'react';
import {BrowserRouter as Router, Switch, Link, NavLink,useRouteMatch, useHistory} from "react-router-dom";


// import icon
import LogoEdu from "../../assets/icon/LogoEdu.svg"
import home from "../../assets/icon/Home.svg" 
import user from "../../assets/icon/User.svg" 
import paper from "../../assets/icon/Paper.svg" 
import doc from "../../assets/icon/Document.svg" 
import logout_icon from "../../assets/icon/logout.svg"

import { useDispatch } from 'react-redux';
import { signOutAction } from '../../store/actions/authActions';

const NotariusSidebar = () => {
    
    const history = useHistory()
    
    const dispatch = useDispatch()

    const [sideFix, setSideFix] = useState(false)

    const signOut = ()=>{
       dispatch(signOutAction())
       history.replace('/')
    }
    return (
        <>
                <button id="none768" onClick={()=>setSideFix(true)}>
                    <div></div>
                    <div></div>
                    <div></div>
                </button>
                <div className={sideFix ? "sidebarFix sideAct" : "sidebarFix sidePass"}>
                    <div className="sidebar">
                        <svg onClick={()=> setSideFix(false)} id="Xnone768" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M44 44L4 4M44 4L4 44" stroke="white" stroke-width="7" stroke-linecap="round"/>
                        </svg>
                        <Link to="/" className="top">

                            <img src={LogoEdu}
                                alt=""/>
                            <h1>Education Gateway</h1>
                        </Link>
                        <div className="bottom">
                            <NavLink exact to="/n-glavny"  onClick={()=> setSideFix(false)}>
                                <img src={home}
                                    alt=""/>
                                <h5>Главное</h5>
                            </NavLink>
                            <NavLink exact to="/n-document"  onClick={()=> setSideFix(false)}>
                                <img src={user}
                                    alt=""/>
                                <h5>Документы от Консультантов</h5>
                            </NavLink>
                            <NavLink exact to="/n-perevod"  onClick={()=> setSideFix(false)}>
                                <img src={doc}
                                    alt=""/>
                                <h5>Переведенные документы</h5>
                            </NavLink>
                            <NavLink exact to="/n-info"  onClick={()=> setSideFix(false)}>
                                <img src={paper}
                                    alt=""/>
                                <h5>Информация</h5>
                            </NavLink>
                            <NavLink exact to="/n-otchot"  onClick={()=> setSideFix(false)}>
                                <img src={paper}
                                    alt=""/>
                                <h5>Отчет аналитики</h5>
                            </NavLink>
                            <button  to=''  onClick={signOut} className="logoutbtn">
                                <img src={logout_icon}
                                    alt=""/>
                                <h5>Выйти</h5>
                            </button>
                        </div>
                    </div>
                </div>
        </>
    );
}

export default NotariusSidebar;
