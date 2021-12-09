import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import "../../../i18n";

import { NavLink } from "react-router-dom";
import { Link, animateScroll as scroll } from "react-scroll";
// import css
import "../../../style/css/Navbar.css";
// import Icon
import search_icon from "../../../assets/icon/searchIcon.svg";
// import { updateLanguageAction } from "../../../store/actions/langAction";
import ru from "../../lang/ru";
import us from "../../lang/en";
import uz from "../../lang/uz";

const Navbar = () => {
  // const [languageValue, setLanguageValue] = useState();
  // const [putLanguage, setPutLanguage] = useState();
  // const data = setPutLanguage;
  // console.log(data);

  const { t, i18n } = useTranslation();
  console.log(t);

  const changeLanguage = (e) => {
    const languageValue = e.target.value;
    i18n.changeLanguage(languageValue);
  };

  // const changeLanguageHandler = (e) => {
  //   i18n.changeLanguage(e);
  // };

  // console.log(languageValue);

  // if ("uz" === languageValue) {
  //   return data;
  // }

  // if ("ru" === languageValue) {
  //   return data;
  // }
  // if ("en" === languageValue) {
  //   return data;
  // }

  // const [lang, setLang] = useState();
  // const [data, setData] = useState({});

  // console.log(ru);
  // if ("ru" === lang) {
  //   setData(statweru);
  // }

  // if ("uz" === lang) {
  //   setData(uz);
  // }

  // if ("en" === lang) {
  //   setData(en);
  // }

  // const handleLanguage = (e) => {
  //   const { name, value } = e.target;
  //   setLang((state) => ({ ...state, [name]: value }));
  //   console.log(data);
  // };

  const selector = useSelector((state) => state);
  const { payload } = selector.payload;
  const currentRole = payload?.role;
  //console.log(currentRole);
  const currentPath = window.location.pathname;
  const [burger, setBurger] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [navActive, setnavActive] = useState(false);

  useEffect(() => {
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop);
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

  const handleout = () => {
    setnavActive(true);
    setBurger(false);
  };

  let button;
  if (currentPath === "/") {
    button = (
      <Link
        to="main"
        spy={true}
        offset={0}
        duration={700}
        style={{ cursor: "pointer" }}
      >
        {t("part1")}
      </Link>
    );
  } else {
    button = (
      <NavLink
        onClick={handleout}
        activeClass={navActive ? "active" : null}
        to="/"
      >
        {t("part1")}
      </NavLink>
    );
  }

  let howItWork;
  if (currentPath === "/") {
    howItWork = (
      <Link
        onClick={handleout}
        to="howItWork"
        spy={true}
        offset={-60}
        duration={700}
        style={{ cursor: "pointer" }}
      >
        {t("part2")}
      </Link>
    );
  } else {
    howItWork = null;
  }
  let universitet;
  if (currentPath === "/") {
    universitet = (
      <Link
        onClick={handleout}
        to="university"
        spy={true}
        offset={-60}
        duration={700}
        style={{ cursor: "pointer" }}
      >
        {t("part3")}
      </Link>
    );
  } else {
    universitet = null;
  }

  return (
    <>
      <div className="eduGateMain">
        <button
          id="burgerMenu"
          className={navActive ? "burger_menu" : ""}
          onClick={() => {
            setBurger(!burger);
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        {/* NavbarFix */}
        <div className="NavbarFix" id={burger ? "right0" : "right100"}>
          <div className={scrollTop < 20 ? "navbar navPass" : "navbar navAct"}>
            {/* navLeft */}
            <div className="navLeft">
              <svg
                width="50"
                height="50"
                viewBox="0 0 42 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.2731 3.50972L34.2397 12.8122C34.3539 12.8713 34.4486 12.9563 34.5144 13.0587C34.5802 13.1611 34.6148 13.2772 34.6146 13.3954V35.1719C34.6146 35.2901 34.6492 35.4063 34.7152 35.5088C34.7811 35.6112 34.8759 35.6963 34.9902 35.7554C35.1044 35.8145 35.234 35.8456 35.3659 35.8456C35.4978 35.8455 35.6273 35.8143 35.7415 35.7551L41.6239 32.7094C41.7372 32.6507 41.8315 32.5664 41.8973 32.4649C41.9631 32.3634 41.9981 32.2482 41.9988 32.1308V11.1583C41.999 11.0401 41.9644 10.924 41.8986 10.8216C41.8328 10.7192 41.738 10.6342 41.6239 10.5751L21.3753 0.0902165C21.2611 0.0311149 21.1317 0 20.9998 0C20.868 0 20.7386 0.0311149 20.6244 0.0902165L16.2731 2.34422C16.1591 2.40337 16.0646 2.48835 15.9988 2.59064C15.9331 2.69292 15.8984 2.80891 15.8984 2.92697C15.8984 3.04503 15.9331 3.16102 15.9988 3.2633C16.0646 3.36559 16.1591 3.45057 16.2731 3.50972Z"
                  fill="white"
                />
                <path
                  d="M6.3917 8.62564L22.7581 17.1035C22.8723 17.1625 22.9671 17.2475 23.033 17.3499C23.0988 17.4523 23.1333 17.5685 23.1331 17.6867L23.1383 41.1208C23.1391 41.2387 23.1744 41.3544 23.2406 41.4563C23.3068 41.5582 23.4017 41.6427 23.5157 41.7014C23.6297 41.7602 23.7589 41.7911 23.8904 41.791C24.0219 41.791 24.1511 41.76 24.2651 41.7012L30.1413 38.6583C30.2554 38.5992 30.3501 38.5142 30.416 38.4118C30.4818 38.3094 30.5163 38.1933 30.5162 38.0751V15.4299C30.5163 15.3117 30.4818 15.1956 30.416 15.0932C30.3501 14.9908 30.2554 14.9058 30.1413 14.8467L11.5075 5.19861C11.3934 5.13951 11.2639 5.1084 11.1321 5.1084C11.0003 5.1084 10.8708 5.13951 10.7566 5.19861L6.39065 7.45919C6.27652 7.51837 6.18178 7.60344 6.11595 7.70587C6.05012 7.8083 6.01552 7.92446 6.01563 8.04268C6.01573 8.16091 6.05054 8.27702 6.11656 8.37935C6.18257 8.48168 6.27747 8.56662 6.3917 8.62564Z"
                  fill="white"
                />
                <path
                  d="M0.109375 10.7418L19.0814 20.5712V19.3493L1.25612 10.1201L0.136605 10.7005L0.109375 10.7418Z"
                  fill="white"
                />
                <path
                  d="M0 11.6055V12.8283L19.0799 22.713V21.4911L0 11.6055Z"
                  fill="white"
                />
                <path
                  d="M0 13.749V14.9718L19.0799 24.8566V23.6347L0 13.749Z"
                  fill="white"
                />
                <path
                  d="M0 15.8926V17.1144L19.0788 26.9992V25.7773L0 15.8926Z"
                  fill="white"
                />
                <path
                  d="M19.0788 27.9199L0 18.0352V19.258L19.0788 29.1417V27.9199Z"
                  fill="white"
                />
                <path
                  d="M0 20.1787V21.4006L19.0788 31.2853V30.0634L0 20.1787Z"
                  fill="white"
                />
                <path
                  d="M0 22.3213V23.5431L19.0788 33.4279V32.206L0 22.3213Z"
                  fill="white"
                />
                <path
                  d="M0 24.4639V25.6867L19.0788 35.5714V34.3486L0 24.4639Z"
                  fill="white"
                />
                <path
                  d="M0 26.6074V27.8293L19.0778 37.714L19.0788 36.4921L0 26.6074Z"
                  fill="white"
                />
                <path
                  d="M0 28.75V29.9728L19.0778 39.8566V38.6347L0 28.75Z"
                  fill="white"
                />
                <path
                  d="M0 30.8936V32.1163L19.0778 42.0001V40.7773L0 30.8936Z"
                  fill="white"
                />
                <path
                  d="M0 24.4639V25.6867L19.0788 35.5714V34.3486L0 24.4639Z"
                  fill="white"
                />
                <path
                  d="M0 26.6074V27.8293L19.0778 37.714L19.0788 36.4921L0 26.6074Z"
                  fill="white"
                />
                <path
                  d="M0 28.75V29.9728L19.0778 39.8566V38.6347L0 28.75Z"
                  fill="white"
                />
                <path
                  d="M0 30.8936V32.1163L19.0778 42.0001V40.7773L0 30.8936Z"
                  fill="white"
                />
                <path
                  d="M0 22.3213V23.5431L19.0788 33.4279V32.206L0 22.3213Z"
                  fill="white"
                />
                <path
                  d="M0 20.1787V21.4006L19.0788 31.2853V30.0634L0 20.1787Z"
                  fill="white"
                />
                <path
                  d="M0 18.0352V19.258L19.0788 29.1417V27.9199L0 18.0352Z"
                  fill="white"
                />
                <path
                  d="M0 15.8926V17.1144L19.0788 26.9992V25.7773L0 15.8926Z"
                  fill="white"
                />
                <path
                  d="M0 13.749V14.9718L19.0799 24.8566V23.6347L0 13.749Z"
                  fill="white"
                />
                <path
                  d="M0 11.6055V12.8283L19.0799 22.713V21.4911L0 11.6055Z"
                  fill="white"
                />
                <path
                  d="M0.109375 10.7418L19.0814 20.5712V19.3493L1.25612 10.1201L0.136605 10.7005L0.109375 10.7418Z"
                  fill="white"
                />
              </svg>
              <h1>Education Gateway</h1>
              <button
                id="burgerclose"
                onClick={() => {
                  setBurger(!burger);
                }}
              >
                <span></span>
                <span></span>
              </button>
            </div>
            {/* end navLeft */}
            {/* navRight */}
            <div className="navRight">
              {button}
              {howItWork}
              {universitet}
              <NavLink onClick={handleout} to="/partners">
                {t("part4")}
              </NavLink>
              <NavLink onClick={handleout} to="/registration">
                {t("part5")}
              </NavLink>
              <NavLink
                to={
                  currentRole
                    ? currentRole === "applicant"
                      ? "/my-account"
                      : currentRole === "notary"
                      ? "/n-glavny"
                      : currentRole === "accountant"
                      ? "/accountant-ticket"
                      : currentRole === "director"
                      ? "/home/main"
                      : currentRole === "supermanager"
                      ? "superManager-analitika"
                      : currentRole === "university"
                      ? "/univer-backoffice-page"
                      : "/login"
                    : "/login"
                }
              >
                {t("part6")}
              </NavLink>
              <div className="nav-item">
                <div>
                  <select
                    className="lang-drop"
                    name="lang"
                    onClick={changeLanguage}
                  >
                    <option
                      className="lang-opt"
                      value="ru"
                      //  onClick={() => changeLanguage("ru")}
                    >
                      RU
                    </option>
                    <option
                      value="en"
                      className="lang-opt"

                      //  onClick={() => changeLanguage("en")}
                    >
                      EN
                    </option>
                    <option
                      className="lang-opt"
                      value="uz"
                      // onClick={() => changeLanguage("uz")}
                      to="/uz"
                    >
                      Uz
                    </option>
                  </select>
                </div>
              </div>
            </div>
            {/* end navRight */}{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
