import React, { Component, useState } from "react";
import { NavLink, Route, Switch, useHistory } from "react-router-dom";
// import routes from "../../../routes/routes";
import routes from "../../../../routes/routes";
import { useDispatch } from "react-redux";
import { signOutAction } from "../../../../store/actions/authActions";

// import css
import "../../../../style/css/sidebar.css";

function SidebarAccountant(props) {
  const history = useHistory();
  const [state, setState] = useState({
    menu: false,
    burger: false,
  });
  const dispatch = useDispatch();
  const handlemenu = () => {
    setState({
      menu: !state.menu,
    });
  };
  const handleburger = () => {
    setState({
      burger: !state.burger,
    });
  };

  const handleclose = () => {
    setState({
      menu: false,
    });
    handleburger();
  };

  const signOut = () => {
    dispatch(signOutAction());
    history.replace("/");
    localStorage.clear();
  };
  return (
    <>
      <div
        className={state.burger ? "switch_asos toggle_burger" : "switch_asos"}
      >
        <div className="dashboardBlock">
          <div className="sidebarFixed">
            <div className="sidebar">
              <div className="logoSidebar">
                <svg
                  width="74"
                  height="74"
                  viewBox="0 0 74 74"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M28.1256 7.19495L59.3147 22.7621C59.5128 22.861 59.6782 23.0051 59.7942 23.1798C59.9102 23.3545 59.9727 23.5537 59.9755 23.7573L60.5311 61.2723C60.534 61.476 60.5967 61.6753 60.7129 61.8501C60.8291 62.0249 60.9947 62.169 61.193 62.268C61.3913 62.3669 61.6153 62.4172 61.8425 62.4137C62.0697 62.4102 62.2921 62.3532 62.4872 62.2482L72.5433 56.8512C72.7371 56.7472 72.8974 56.5996 73.0081 56.4231C73.1188 56.2465 73.1762 56.0472 73.1745 55.845L72.6393 19.715C72.6366 19.5114 72.5741 19.3122 72.4581 19.1374C72.3421 18.9627 72.1767 18.8187 71.9786 18.7198L36.8281 1.17387C36.6299 1.07497 36.4061 1.02467 36.179 1.02804C35.9519 1.0314 35.7297 1.08831 35.5345 1.19303L28.0958 5.1871C27.9011 5.29192 27.7403 5.44073 27.6296 5.61861C27.519 5.79649 27.4623 5.99719 27.4653 6.20058C27.4683 6.40398 27.5309 6.60291 27.6468 6.77743C27.7627 6.95196 27.9278 7.09595 28.1256 7.19495Z"
                    fill="#00587F"
                  />
                  <path
                    d="M11.2337 16.2606L39.6451 30.4481C39.8433 30.5468 40.0088 30.6908 40.1248 30.8656C40.2408 31.0403 40.3033 31.2396 40.3058 31.4432L40.9128 71.8137C40.9172 72.0168 40.9809 72.2152 41.0976 72.389C41.2143 72.5629 41.3798 72.7061 41.5778 72.8043C41.7757 72.9026 41.9991 72.9525 42.2257 72.9491C42.4522 72.9457 42.674 72.889 42.8689 72.7848L52.9142 67.3928C53.1093 67.2881 53.2704 67.1392 53.3812 66.9611C53.4919 66.7831 53.5485 66.5821 53.5452 66.3785L52.9674 27.3669C52.9647 27.1633 52.9022 26.9641 52.7862 26.7894C52.6702 26.6147 52.5048 26.4707 52.3066 26.3718L19.9595 10.2262C19.7613 10.1273 19.5375 10.077 19.3104 10.0804C19.0833 10.0837 18.861 10.1407 18.6659 10.2454L11.2021 14.2511C11.007 14.356 10.846 14.505 10.7352 14.6831C10.6244 14.8613 10.5678 15.0623 10.571 15.2659C10.5742 15.4696 10.6371 15.6687 10.7534 15.8433C10.8698 16.0179 11.0354 16.1618 11.2337 16.2606Z"
                    fill="#00587F"
                  />
                  <path
                    d="M0.461176 20.0662L33.3957 36.5154L33.3645 34.4104L2.42084 18.9659L0.507031 19.9943L0.461176 20.0662Z"
                    fill="#00587F"
                  />
                  <path
                    d="M0.296875 21.5581L0.328076 23.6647L33.4498 40.2065L33.4187 38.1016L0.296875 21.5581Z"
                    fill="#00587F"
                  />
                  <path
                    d="M0.351562 25.251L0.382763 27.3575L33.5045 43.8994L33.4733 41.7945L0.351562 25.251Z"
                    fill="#00587F"
                  />
                  <path
                    d="M0.410156 28.9424L0.441333 31.0473L33.5613 47.5892L33.5301 45.4843L0.410156 28.9424Z"
                    fill="#00587F"
                  />
                  <path
                    d="M33.5809 49.1762L0.460938 32.6343L0.492138 34.7408L33.6121 51.2811L33.5809 49.1762Z"
                    fill="#00587F"
                  />
                  <path
                    d="M0.515625 36.3271L0.546802 38.4321L33.6668 54.974L33.6356 52.8691L0.515625 36.3271Z"
                    fill="#00587F"
                  />
                  <path
                    d="M0.570312 40.0186L0.601489 42.1235L33.7214 58.6654L33.6903 56.5605L0.570312 40.0186Z"
                    fill="#00587F"
                  />
                  <path
                    d="M0.625 43.7085L0.656201 45.815L33.7762 62.357L33.745 60.2504L0.625 43.7085Z"
                    fill="#00587F"
                  />
                  <path
                    d="M0.679688 47.4023L0.710864 49.5073L33.829 66.0492L33.7996 63.9443L0.679688 47.4023Z"
                    fill="#00587F"
                  />
                  <path
                    d="M0.734375 51.0928L0.765576 53.1993L33.8837 69.7396L33.8525 67.6347L0.734375 51.0928Z"
                    fill="#00587F"
                  />
                  <path
                    d="M0.789062 54.7847L0.820263 56.8912L33.9384 73.4315L33.9072 71.325L0.789062 54.7847Z"
                    fill="#00587F"
                  />
                  <path
                    d="M0.625 43.7085L0.656201 45.815L33.7762 62.357L33.745 60.2504L0.625 43.7085Z"
                    fill="#00587F"
                  />
                  <path
                    d="M0.679688 47.4023L0.710864 49.5073L33.829 66.0492L33.7996 63.9443L0.679688 47.4023Z"
                    fill="#00587F"
                  />
                  <path
                    d="M0.734375 51.0928L0.765576 53.1993L33.8837 69.7396L33.8525 67.6347L0.734375 51.0928Z"
                    fill="#00587F"
                  />
                  <path
                    d="M0.789062 54.7847L0.820263 56.8912L33.9384 73.4315L33.9072 71.325L0.789062 54.7847Z"
                    fill="#00587F"
                  />
                  <path
                    d="M0.570312 40.0186L0.601489 42.1235L33.7214 58.6654L33.6903 56.5605L0.570312 40.0186Z"
                    fill="#00587F"
                  />
                  <path
                    d="M0.515625 36.3271L0.546802 38.4321L33.6668 54.974L33.6356 52.8691L0.515625 36.3271Z"
                    fill="#00587F"
                  />
                  <path
                    d="M0.460938 32.6343L0.492138 34.7408L33.6121 51.2811L33.5809 49.1762L0.460938 32.6343Z"
                    fill="#00587F"
                  />
                  <path
                    d="M0.410156 28.9424L0.441333 31.0473L33.5613 47.5892L33.5301 45.4843L0.410156 28.9424Z"
                    fill="#00587F"
                  />
                  <path
                    d="M0.351562 25.251L0.382763 27.3575L33.5045 43.8994L33.4733 41.7945L0.351562 25.251Z"
                    fill="#00587F"
                  />
                  <path
                    d="M0.296875 21.5581L0.328076 23.6647L33.4498 40.2065L33.4187 38.1016L0.296875 21.5581Z"
                    fill="#00587F"
                  />
                  <path
                    d="M0.461176 20.0662L33.3957 36.5154L33.3645 34.4104L2.42084 18.9659L0.507031 19.9943L0.461176 20.0662Z"
                    fill="#00587F"
                  />
                </svg>
                <h6>Education Gateway</h6>
              </div>
              <NavLink onClick={handleclose} to="/accountant-ticket">
                Клиентский ввод
              </NavLink>
              <NavLink onClick={handleclose} to="/accountant-analytics">
                Статус клиента
              </NavLink>
              <NavLink onClick={handleclose} to="/accountant-analytics">
                Документы
              </NavLink>
              <NavLink onClick={handleclose} to="/accountant-analytics">
                Прайс лист
              </NavLink>
              <NavLink onClick={handleclose} to="/accountant-analytics">
                Отдел аналитики
              </NavLink>
              <NavLink onClick={handleclose} to="/accountant-analytics">
                Новости
              </NavLink>
              <div className={state.menu ? "div_active div_a" : "div_a"}>
                <div
                  className={state.menu ? "link_active bugalter" : "bugalter"}
                >
                  <div onClick={signOut} className="toggle_link">
                    Выйти
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div onClick={handleburger} className="burger_menu">
          <span></span>
          <span></span>
          <span></span>
        </div>
        {props.children}
      </div>
    </>
  );
}

export default SidebarAccountant;

// import React, { useState } from "react";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Link,
//   NavLink,
//   useRouteMatch,
//   useHistory,
// } from "react-router-dom";
// // import "../../style/css/maneger.css"

// // import icon
// import LogoEdu from "../../../../assets/icon/LogoEdu.svg";
// import home from "../../../../assets/icon/Home.svg";
// import user from "../../../../assets/icon/User.svg";
// import paper from "../../../../assets/icon/Paper.svg";
// import doc from "../../../../assets/icon/Document.svg";
// import logout_icon from "../../../../assets/icon/logout.svg";

// import { useDispatch } from "react-redux";
// import { signOutAction } from "../../../../store/actions/authActions";

// const ManegerSidebar = () => {
//   const [menu, setMenu] = useState(false);
//   const handlemenuOn = () => {
//     setMenu(!menu);
//   };
//   const handlemenuOff = () => {
//     setMenu(false);
//     setSideFix(false);
//   };

//   const history = useHistory();

//   const dispatch = useDispatch();

//   const [sideFix, setSideFix] = useState(false);

//   const signOut = () => {
//     dispatch(signOutAction());
//     history.replace("/");
//   };
//   return (
//     <div>
//       <button className="n_none" id="none768" onClick={() => setSideFix(true)}>
//         <div></div>
//         <div></div>
//         <div></div>
//       </button>
//       <div className={sideFix ? "sidebarFix sideAct" : "sidebarFix sidePass"}>
//         <div className="sidebar">
//           <svg
//             id="Xnone768"
//             width="48"
//             height="48"
//             viewBox="0 0 48 48"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M44 44L4 4M44 4L4 44"
//               stroke="white"
//               stroke-width="7"
//               stroke-linecap="round"
//             />
//           </svg>
//           <Link to="/" className="top">
//             <img src={LogoEdu} alt="" />
//             <h1>Education Gateway</h1>
//           </Link>
//           <div className="bottom">
//             <NavLink exact to="/m-glavny">
//               <h5>Клиентский ввод</h5>
//             </NavLink>
//             <NavLink exact to="/m-status">
//               <h5>Статус клиента</h5>
//             </NavLink>
//             <div
//               className={menu === false ? "m_toggle" : "m_toggle m_toggleOn"}
//               onClick={handlemenuOn}
//             >
//               <NavLink exact to="/m-docs_all" onClick={handlemenuOff}>
//                 <h5>Все документы</h5>
//               </NavLink>
//               <NavLink exact to="/m-docs_send" onClick={handlemenuOff}>
//                 <h5>Отправленные</h5>
//               </NavLink>
//               <NavLink exact to="/m-docs_rec" onClick={handlemenuOff}>
//                 <h5>Принятые</h5>
//               </NavLink>
//             </div>
//             <NavLink exact to="/m-prayslist">
//               <h5>Прайс лист</h5>
//             </NavLink>
//             <NavLink exact to="/m-analitika">
//               <h5>Отдел аналитики</h5>
//             </NavLink>
//             <NavLink exact to="/m-news">
//               <h5>Новости</h5>
//             </NavLink>
//             <button to="" onClick={signOut} className="logoutbtn">
//               <img src={logout_icon} alt="" />
//               <h5>Выйти</h5>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManegerSidebar;
