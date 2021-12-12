import React, { useState, useCallback, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUpAction } from "../../../store/actions/authActions";
import logo_education from "../../../assets/icon/Logo_education.svg";
import eye_login from "../../../assets/icon/eye_login.svg";
import "../../../style/css/Login.css";
import Loader from "react-js-loader";
import Axios from "../../../utils/axios";
import Swal from "sweetalert2";
import axios from "axios";
// import axios from "axios";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const phoneRef = useRef();
  const [wiew, setWiew] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    password: "",
  });
  const finalData = {
    phone_number: `+${phoneRef?.current?.value}`,
    password: state.password,
  };

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setState((state) => ({ ...state, [name]: value }));
    },
    [state]
  );
  const submitData = async (e) => {
    e.preventDefault();
    if (!window.navigator.onLine) {
      Swal.fire({
        icon: "warning",
        text: "у вас нет подключения к интернету",
      });
    } else {
      setLoading(true);
      try {
        const res = await axios.post(
          "https://backend.edugateway.uz/api/v1/common/token/obtain",
          finalData
        );

        const { access, refresh, data } = res.data;
        const { role } = data;

        dispatch(
          signUpAction({ access, refresh, role: data.role, data: data })
        );
        localStorage.setItem("enrolle_user", data?.id);
        if (role.startsWith("u")) {
          history.push("/univer-backoffice-page");
        } else if (role === "applicant") {
          history.push("/my-account");
        } else if (role.startsWith("d")) {
          history.push("/home/main");
        } else if (role.startsWith("m")) {
          history.push("/m-analitika");
        } else if (role.startsWith("supermanager")) {
          history.push("/superManager-analitika");
        } else if (role === "accountant") {
          history.push("/accountant-ticket");
        } else if (role.startsWith("n")) {
          history.push("/n-glavny");
        } else if (role.startsWith("branch_director")) {
          history.push("/home/main");
        } else if (role.startsWith("agent")) {
          history.push("/branchAgentGlavny");
        }
        // else if (role === "supermanager") {
        //   history.push("/m-analitika");
        // }
        else {
          history.push("/");
        }
        setLoading(false);
      } catch (error) {
        const status = error?.response?.status;

        Swal.fire({
          icon: "error",
          text: "Активная учетная запись с указанными учетными данными не найдена",
        });
        setLoading(false);
      }
    }
  };

  return (
    <div className="Login">
      <div className="background_login"></div>
      <div className="background_login"></div>
      <div className="container">
        <div className="title">
          <img src={logo_education} alt="" />
          <h2>Education Gateway</h2>
        </div>
        <div className="block">
          <form onSubmit={submitData} className="blockBox">
            <h3>Войти</h3>
            <div className="loginInput">
              <p>Номер телефона</p>
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    top: "16px",
                    left: "8px",
                    fontSize: "25px",
                    color: "#00587f",
                  }}
                >
                  +
                </span>
                <input
                  ref={phoneRef}
                  defaultValue="998"
                  style={{ textIndent: "4px" }}
                  onChange={handleChange}
                  type="phone"
                  name="phone_number"
                  placeholder=""
                  required
                />
              </div>
            </div>
            <div className="loginInput">
              <p>пароль</p>
              <div>
                <input
                  onChange={handleChange}
                  name="password"
                  type={wiew === false ? "password" : "text"}
                  required
                />
                <img
                  src={eye_login}
                  alt=""
                  onClick={() => {
                    setWiew(!wiew);
                  }}
                />
              </div>
            </div>
            <div className="loginRemberMe">
              <label className="custom-checkbox">
                <input type="checkbox" name="rememberMe" value="rememberMe" />
                <span></span>
                <p>Запомнить меня</p>
              </label>
              <p>
                Забыли пароль? <Link to="/loginStaff">Восстановить</Link>
              </p>
            </div>
            <h4 style={{ color: "red", margin: "auto" }}>{errorMsg}</h4>
            <button type="submit">
              {loading ? (
                <>
                  <Loader
                    type="spinner-circle"
                    bgColor={"#FFFFFF"}
                    color={"#FFFFFF"}
                    size={75}
                  />
                </>
              ) : (
                "Войти"
              )}
            </button>
            <div className="forgetPass">
              <p>
                {" "}
                Нет аккаунта? <Link to="/registration"> Регистрация</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
