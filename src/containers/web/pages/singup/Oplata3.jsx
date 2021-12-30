import React, { Component, useState, useRef, useEffect } from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import copy from "../../../../assets/icon/copy.svg";
import click from "../../../../assets/icon/click.svg";
import payme from "../../../../assets/icon/payme.svg";
import bank from "../../../../assets/icon/bank.svg";
import CopyText from "react-copy-text";
import folder_icon from "../../../../assets/icon/folder_icon.svg";
import tasdiq from "../../../../assets/icon/tasdiq.svg";
import error from "../../../../assets/icon/error.svg";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Fade from "@material-ui/core/Fade";
import Navbar from "../Navbar";
import { authSaveData } from "../../../../store/actions/authActions";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Axios from "../../../../utils/axios";
import check from "../../../../assets/icon/checked.svg";
import Loader from "react-js-loader";

function Oplata3() {
  const history = useHistory();
  const userId = JSON.parse(localStorage.getItem("enrolle_user"));
  const profileData = JSON.parse(localStorage.getItem("files"));
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [amount, setAmount] = useState("");
  const [copyAlert, setCopyAlert] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { open, vertical, horizontal } = copyAlert;
  const handleClick = (newState) => {
    setCopyAlert({ open: true, ...newState });
  };
  const [data, setData] = useState({
    bankTransiction: "",
  });
  const dispatch = useDispatch();
  const inovice = useRef(null);
  const { pathname } = location;
  const [state, setState] = useState({
    textToCopy: "",
    modal1: false,
    modal2: false,
  });
  const handleInputChange = (e) => {
    const { name, files } = e.target;
    setData((state) => ({ ...state, [name]: files[0] }));
  };
  const handleopen1 = () => {
    setState({
      modal1: true,
    });
  };
  const handleclose1 = () => {
    setState({
      modal1: false,
    });
  };
  const handleopen2 = () => {
    setState({
      modal2: true,
    });
  };
  const handleclose2 = () => {
    setState({
      modal2: false,
    });
  };
  const fetchUserData = async () => {
    try {
      const res = await Axios.get("/applicant/me/");
      const { status, data } = res;
      if (status === 200) {
        const { amount } = data;
        setAmount(amount);
      }
    } catch (error) {}
  };
  const sendInovoice = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("invoice", inovice.current.files[0]);
    setLoading(true);
    try {
      const res = await Axios.patch(
        `/applicant/upload-invoice/${userId}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { status } = res;
      if (status == 200) {
        Swal.fire({
          icon: "warning",
          title: "Ваш платеж был успешным ",
        }).then(() => {
          Axios.post("/applicant/profile/step/", {
            step: "payment",
          }).then(() => history.push("/my-account"));
          localStorage.setItem("payment", status);
        });
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const saveData = () => {
    dispatch(authSaveData(pathname, profileData));
    Swal.fire({
      icon: "success",
      text: "Текущие данные сохранены без промедления",
    }).then(() => history.push("/my-account"));
  };

  const onButtonClick = () => {
    setState({
      textToCopy: [
        "Получатель: “Education Gateway”",
        "ИНН: 2340212",
        "Х/Р: 23402000300100001010",
        "Банк получателя: РКЦ ГУ ЦБ г. по Ташкент",
        "МФО банка получателя: 00014",
      ],
    });
    handleClick({
      vertical: "top",
      horizontal: "center",
    });
  };

  const onCopied = (text) => console.log(`${text} was copied to the clipboard`);
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <React.Fragment>
      <div className="navRegist">
        <Navbar />
      </div>
      <div className="singup_asos container">
        <div className="nav_name">
          <h1>Процесс поступления</h1>
        </div>
        <div className="up_nav">
          <h2 className="singup_pass">Регистрация/Войти</h2>
          <svg
            id="svg_pass"
            width="82"
            height="10"
            viewBox="0 0 82 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M82 5L74.5 0.669873V9.33013L82 5ZM0 5.75H5.125V4.25H0V5.75ZM15.375 5.75H25.625V4.25H15.375V5.75ZM35.875 5.75H46.125V4.25H35.875V5.75ZM56.375 5.75H66.625V4.25H56.375V5.75Z"
              fill="#5C7C8A"
            />
          </svg>
          <h2 className="singup_pass">Профайл</h2>
          <svg
            id="svg_pass"
            width="82"
            height="10"
            viewBox="0 0 82 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M82 5L74.5 0.669873V9.33013L82 5ZM0 5.75H5.125V4.25H0V5.75ZM15.375 5.75H25.625V4.25H15.375V5.75ZM35.875 5.75H46.125V4.25H35.875V5.75ZM56.375 5.75H66.625V4.25H56.375V5.75Z"
              fill="#5C7C8A"
            />
          </svg>
          <h2 className="singup_pass">Файлы</h2>
          <svg
            id="svg_pass"
            width="82"
            height="10"
            viewBox="0 0 82 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M82 5L74.5 0.669873V9.33013L82 5ZM0 5.75H5.125V4.25H0V5.75ZM15.375 5.75H25.625V4.25H15.375V5.75ZM35.875 5.75H46.125V4.25H35.875V5.75ZM56.375 5.75H66.625V4.25H56.375V5.75Z"
              fill="#5C7C8A"
            />
          </svg>
          <h2 className="singup_active2">Оплата</h2>
        </div>
        <div className="main_singup">
          <h1>Оплата</h1>
          <div className="oplata_asos">
            <div className="oplata_tip">
              <p>Выберите тип оплаты</p>
              <div className="tolov_turlari">
                <NavLink activeClassName="oplata_active" to="/payment-click">
                  <img src={click} alt="" />
                </NavLink>
                <NavLink activeClassName="oplata_active" to="/payment-payme">
                  <img src={payme} alt="" />
                </NavLink>
                <NavLink
                  activeClassName="oplata_active"
                  className="bank_tolov"
                  to="/payment-transaction"
                >
                  <img src={bank} alt="" /> Банковский перевод
                </NavLink>
              </div>
              <div className="oplata_switch">
                <div className="bank_card">
                  <h1>Наши реквизиты:</h1>
                  <div className="bank_list">
                    <h5>Получатель: </h5>
                    <h5>“Education Gateway”</h5>
                  </div>
                  <div className="bank_list">
                    <h5>ИНН: </h5>
                    <h5>2340212</h5>
                  </div>
                  <div className="bank_list">
                    <h5>Х/Р: </h5>
                    <h5>23402000300100001010</h5>
                  </div>
                  <div className="bank_list">
                    <h5>Банк получателя: </h5>
                    <h5>РКЦ ГУ ЦБ г. по Ташкент</h5>
                  </div>
                  <div className="bank_list">
                    <h5 onChange={state.textToCopy}>МФО банка получателя: </h5>
                    <h5>00014</h5>
                  </div>
                  <button onClick={onButtonClick}>
                    <img src={copy} alt="" />
                    Скопировать реквизиты
                  </button>
                  <Snackbar
                    autoHideDuration={2000}
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    message="Скопирован в буфер обмена"
                    key={vertical + horizontal}
                    onClose={() => setCopyAlert({ open: false })}
                  />
                  <CopyText text={state.textToCopy} onCopied={onCopied} />
                </div>
              </div>
            </div>
            <div className="oplata_kvitansa">
              <p>Квитанция</p>
              {loading ? (
                <Loader
                  type="spinner-circle"
                  bgColor={"#FFFFFF"}
                  color={"#FFFFFF"}
                  size={70}
                />
              ) : (
                ""
              )}
              <div className="kvitansa_list">
                <h1>Услуги Education Gateway</h1>
                <p>${amount}</p>
              </div>
            </div>
          </div>
          <div className="bank_btn">
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="importFile" htmlFor="chFile">
                <img src={folder_icon} alt="" />
                <p>
                  Drop your files here or a
                  <input
                    name="bankTransiction"
                    onChange={handleInputChange}
                    ref={inovice}
                    type="file"
                    id="chFile"
                  />
                  <label htmlFor="chFile">choose file</label>
                </p>
              </div>
              <p
                style={{
                  height: "27px",
                  position: "relative",
                  top: "22px",
                  left: "20px",
                }}
                className="checkIcon"
              >
                {data.bankTransiction ? (
                  <img style={{ height: "100%" }} src={check} alt="success" />
                ) : (
                  ""
                )}
              </p>
            </div>
            <button onClick={(e) => sendInovoice(e)} className="a_send">
              Отправить
            </button>
            <button
              type="button"
              onClick={saveData}
              style={{
                background: "#e6ebed",
                border: "none",
                color: "#00587f",
                cursor: "pointer",
              }}
              className="a_send"
            >
              Сохранить
            </button>
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
            timeout: 500,
          }}
        >
          <Fade in={state.modal1}>
            <div className="alert_tasdiq">
              <img src={tasdiq} alt="" />
              <p>Ваш платеж был проведен успешно</p>
              <button onClick={handleclose1}>Вернуться</button>
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
            timeout: 500,
          }}
        >
          <Fade in={state.modal2}>
            <div className="alert_error">
              <img src={error} alt="" />
              <p>Произошла ошибка при оплате</p>
              <div className="alert_btn">
                {/* <button Click={submit_error}>Отменить</button> */}
                <button>Повторить оплату</button>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    </React.Fragment>
  );
}

export default Oplata3;
