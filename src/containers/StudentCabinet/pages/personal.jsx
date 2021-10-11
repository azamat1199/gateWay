import React, { Component } from 'react';

// import css
import  "../../../style/css/personal.css" 

// imort icon
import message_icon from    "../../../assets/icon/message.svg" 
import call_icon from "../../../assets/icon/call.svg"
import StudentSidebar from './SidebarStudent';
import { useSelector } from 'react-redux';

const Personal = () => {
    const selector = useSelector(state=> state)
    console.log(selector);
    return ( 
        <>
        <StudentSidebar/>
        <div className="Personal">
            <div className="top">
                <h1>Персональный менеджер</h1>
                <div>
                    <img src="https://picsum.photos/70" alt="" />
                    <h2>Nargiza Akhmedova <span>IT Specialist</span></h2>
                </div>
            </div>
            <div className="bottom">
                <div className="inf">
                    <div>
                        <img src="https://picsum.photos/150" alt="" />
                        <h2>Нафиса Абдураимова<span>Chief Recruiter, Education Gateway</span></h2>
                    </div>
                    <div>
                        <img src={message_icon} alt="" />
                        <img src={call_icon} alt="" />
                    </div>
                </div>
                <p>Нафиса Абдураимова является ветераном в деле рекруитинга и подбора университетов. Она вам все досколнально объяснит и всему научит. Нафиса Абдураииова является ветераном в деле рекруитинга и подбора университетов. Она вам все досколнально объяснит и всему научит.</p>
                <h5>Номер телефона:<span>+998 (99) 607 - 74 - 40</span></h5>
                <h6>Email адрес:<span>educationgateway@gmail.com</span></h6>
            </div>
        </div>
        </>
     );
}
 
export default Personal;