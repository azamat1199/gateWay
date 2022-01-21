import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import Snackbar from "@material-ui/core/Snackbar";
import {
  BrowserRouter as Router,
  Switch,
  Link,
  NavLink,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
// import "../../style/css/maneger.css"
import Axios from "../../../utils/axios";
// import icon
import LogoEdu from "../../../assets/icon/LogoEdu.svg";
import logout_icon from "../../../assets/icon/logout.svg";

import { useDispatch, useSelector } from "react-redux";
import { signOutAction } from "../../../store/actions/authActions";

const ManegerSidebar = () => {
  const [menu, setMenu] = useState(false);
  const handlemenuOn = () => {
    setMenu(!menu);
  };
  const selector = useSelector((state) => state?.payload?.payload?.data);
  const handlemenuOff = () => {
    setMenu(false);
    setSideFix(false);
  };
  const [open, setOpen] = useState(false);
  const [referral, setReferral] = useState([]);
  const history = useHistory();
  const [link, setLink] = useState();
  const dispatch = useDispatch();

  const [sideFix, setSideFix] = useState(false);

  const signOut = () => {
    dispatch(signOutAction());
    history.replace("/");
  };
   useMemo(async () => {
    if (selector?.role === "supermanager") return;
    try {
      const res = await Axios.get("/company/generate-link/");
      const { status, data } = res;
      if (status === 200) {
        setReferral(data);
      }
    } catch (error) {}
  },[link])
  const generateLink = async () => {
    if (referral.length < 1) {
      try {
        const res = await Axios.post("/company/generate-link/");
        const { status, data } = res;
        if (status === 201) {
          const { url } = data.link;
          setLink(url);
        }
      } catch (error) {}
    } else {
      navigator.clipboard.writeText(referral[0].url);
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // useEffect(() => {
  //   fetchReferral()
  // }, [link]);
  return (
    <div>
      <button className="n_none" id="none768" onClick={() => setSideFix(!sideFix)}>
        <div></div>
        <div></div>
        <div></div>
      </button>
      <div className={sideFix ? "sidebarFix sideAct" : "sidebarFix sidePass"}>
        <div className="sidebar">
          <svg
            id="Xnone768"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M44 44L4 4M44 4L4 44"
              stroke="white"
              stroke-width="7"
              stroke-linecap="round"
            />
          </svg>
          <Link to="/" className="top">
            <img src={LogoEdu} alt="" />
            <h1>Education Gateway</h1>
          </Link>
          <div className="bottom">
            <NavLink
              exact
              to={`/branchManagerAnalitika`}
            >
              <h5>Отдел аналитики</h5>
            </NavLink>
            <NavLink
              exact
              to={`/branchAgentGlavny/`}
            >
              <h5>Клиентский ввод </h5>
            </NavLink>
        
            <div>
              <div>
                <button to="" style={{marginBottom:'80px'}} onClick={signOut} className="logoutbtn">
                  <img src={logout_icon} alt="" />
                  <h5>Выйти</h5>
                </button>
                {selector?.role == "supermanager" ? (
            <span></span>
          ) : (
            <ReferralContainer>
              <button onClick={generateLink}>
                {referral.length > 0 ? (
                  referral.map((item) => {
                    return (
                      <>
                        <p style={{ fontSize: "16px" }}>
                          {" "}
                          {item.url.length > 21
                            ? item.url.slice(0, 21) + "..."
                            : item.url}
                        </p>
                        <p>копировать</p>
                      </>
                    );
                  })
                ) : (
                  <p>создать ссылку</p>
                )}
              </button>
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Скопировано в буфер обмена"
              />
            </ReferralContainer>
          )}
              </div>
            </div>
          </div>
       
        </div>
      </div>
    </div>
  );
};

export default ManegerSidebar;

const ReferralContainer = styled.div`
  width: 100%;
  padding: 0 30px;
  button {
    width: 227px;
    height: 52px;
    background: #dbf4ff;
    border-radius: 12px;
    border: none;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
  }
`;
