import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Link,
  NavLink,
  useRouteMatch,
  useHistory,
} from "react-router-dom";

// import component
import Kabinet from "./kabinet";

// import icon
import LogoEdu from "../../../assets/icon/LogoEdu.svg";
import bonus_icon from "../../../assets/icon/bonus.svg";
import dogovor_icon from "../../../assets/icon/dogovor.svg";
import personal_icon from "../../../assets/icon/personal.svg";
import Profile_icon from "../../../assets/icon/Profile.svg";
import settings_icon from "../../../assets/icon/settings.svg";
// import univer_icon from "../../../assets/icon/univer.svg"
import univer_icon from "../../../assets/icon/universitetLogo.svg";
import status_icon from "../../../assets/icon/status.svg";
import logout_icon from "../../../assets/icon/logout.svg";
import styled from "styled-components";
// import css
import "../../../style/css/sidebarCabinet.css";
import Universitet from "./universitet";
import Personal from "./personal";
import Status from "./status";
import Dogovor from "./dogovor";
import { useDispatch } from "react-redux";
import { signOutAction } from "../../../store/actions/authActions";
import Axios from "../../../utils/axios.js";
import Swal from "sweetalert2";
const StudentSidebar = () => {
  const [currentManager, setCurrentManager] = useState();
  const [invoice, setInvoice] = useState({
    university_invoice_upload: null,
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const univerId = localStorage.getItem("univerId");
  const seenInvoice = localStorage.getItem("invoiceSeen");
  const seen = localStorage.getItem("seen");
  const files = localStorage.getItem("files");
  const userId = localStorage.getItem("enrolle_user");
  const [sideFix, setSideFix] = useState(false);

  const signOut = () => {
    dispatch(signOutAction());
    history.replace("/");
    localStorage.clear();
    localStorage.setItem("seen", seen);
    localStorage.setItem("invoiceSeen", seenInvoice);
    localStorage.setItem("univerId", univerId);
    localStorage.setItem("files", files);
    localStorage.setItem("enrolle_user", userId);
  };

  const fetchMyMeneger = async () => {
    try {
      const res = await Axios.get("/applicant/me/");
      const { manager } = res.data;
      setCurrentManager(manager);
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error?.response,
      });
    }
  };

  const fetchMyInvoice = async () => {
    try {
      const res = await Axios.get("/applicant/university-docs/");
      const { status, data } = res;
      if (status === 200) {
        setInvoice(data);
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMyMeneger();
    fetchMyInvoice();
  }, []);
  return (
    <>
      <button id="none768" onClick={() => setSideFix(true)}>
        <div></div>
        <div></div>
        <div></div>
      </button>
      <div className={sideFix ? "sidebarFix sideAct" : "sidebarFix sidePass"}>
        <div className="sidebar">
          {/* <svg onClick={()=> setSideFix(false)} id="Xnone768" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M44 44L4 4M44 4L4 44" stroke="white" stroke-width="7" stroke-linecap="round"/>
                        </svg> */}
          <Link to="/" className="top">
            <img src={LogoEdu} alt="" />
            <h1>Education Gateway</h1>
          </Link>
          <div className="bottom">
            <NavLink exact to="/my-account" onClick={() => setSideFix(false)}>
              <img src={Profile_icon} alt="" />
              <h5>Профиль</h5>
            </NavLink>
            <NavLink to="/universities" onClick={() => setSideFix(false)}>
              <img src={univer_icon} alt="" />
              <h5>Университеты</h5>
            </NavLink>
            <NavLink to="/personal" onClick={() => setSideFix(false)}>
              <img src={personal_icon} alt="" />
              <h5>Персональный менеджер</h5>
              {history.location.pathname === "/personal" ? (
                ""
              ) : seen ? (
                ""
              ) : currentManager ? (
                <Notify>1</Notify>
              ) : (
                ""
              )}
            </NavLink>
            <NavLink to="/agreement" onClick={() => setSideFix(false)}>
              <img src={dogovor_icon} alt="" />
              <h5>E-Договор</h5>
            </NavLink>
            <NavLink to="/status" onClick={() => setSideFix(false)}>
              <img src={status_icon} alt="" />
              <h5>Статус заявки</h5>
            </NavLink>
            <NavLink to="/myAccInvoys" onClick={() => setSideFix(false)}>
              <img src={dogovor_icon} alt="" />
              <h5>Инвойсы</h5>
              {history.location.pathname === "/myAccInvoys" ? (
                ""
              ) : seenInvoice ? (
                ""
              ) : invoice.university_invoice_upload !== null ? (
                <Notify>1</Notify>
              ) : (
                ""
              )}
            </NavLink>
            <NavLink to="/bonus" onClick={() => setSideFix(false)}>
              <img src={bonus_icon} alt="" />
              <h5>Бонусы</h5>
            </NavLink>
            <NavLink to="/student/settings" onClick={() => setSideFix(false)}>
              <img src={settings_icon} alt="" />
              <h5>Настройки</h5>
            </NavLink>
            <button onClick={signOut} className="logoutbtn">
              <img src={logout_icon} alt="" />
              <h5>Выйти</h5>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentSidebar;

const Notify = styled.div`
  color: #0d5372;
  font-size: 18px;
  background: white;
  height: 21px;
  width: 21px;
  border-radius: 50%;
  position: absolute;
  top: -4px;
  right: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
