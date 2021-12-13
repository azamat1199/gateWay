import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useHistory } from "react-router-dom";
import "../../../style/css/LoginStaff.css";
import logo_education from "../../../assets/icon/Logo_education.svg";
import message_icon from "../../../assets/icon/message_icon.svg";
import close_modal from "../../../assets/icon/close_modal.svg";
import Axios from "../../../utils/axios";
import Swal from "sweetalert2";
import Loader from "react-js-loader";
const LoginStaff = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState();
  const handleOpen = () => {
    setOpen(true);
  };
  const history = useHistory();
  const handleClose = () => {
    setOpen(false);
  };
  const sendCode = async () => {
    setLoading(true);
    try {
      const res = await Axios.post(`/applicant/send-code/`, {
        phone_number: phone,
        to_register: false,
      });
      const { status } = res;
      if (status === 200) {
        setLoading(false);
        const { value: formValues } = await Swal.fire({
          title: `Пожалуйста введите код который отправлен на ваш номер!`,
          html:
            '<div style="display:flex;flex-direction:column"><label for="swal-input1"> код </label> <input id="swal-input1" class="swal2-input"> </div>' +
            '<div style="display:flex;flex-direction:column"><label for="swal-input2"> новый пароль</label> <input id="swal-input2" class="swal2-input"></div>' +
            '<div style="display:flex;flex-direction:column"><label for="swal-input3"> подтвердите новый пароль</label><input id="swal-input3" class="swal2-input"></div>',
          focusConfirm: false,
          preConfirm: () => {
            return [
              document.getElementById("swal-input1")?.value,
              document.getElementById("swal-input2")?.value,
              document.getElementById("swal-input3")?.value,
            ];
          },
          timer: 60000,
          timerProgressBar: true,
        });
        if (formValues) {
          setLoading(true);
          try {
            const res = await Axios.post("/common/reset-password/", {
              phone_number: phone,
              code: formValues[0],
              new_password1: formValues[1],
              new_password2: formValues[2],
            });
            console.log(res);
            const { status } = res;
            if (status === 200) {
              setLoading(false);
              Swal.fire({
                text: "Пароль успешно изменен",
                icon: "success",
              }).then(() => history.push("/login"));
            }
          } catch (error) {
            const { status } = error?.response;
            console.log(error);
            if (status === 400) {
              setLoading(false);
              const { data } = error?.response;
              if (data?.code || data?.new_password1 || data?.new_password2) {
                Swal.fire({
                  text: "Поля не могут быть пустыми",
                  icon: "error",
                });
              } else if (data === "Code is incorrect") {
                Swal.fire({
                  text: "Код указан неверно",
                  icon: "error",
                });
              } else if (
                error?.response ===
                "Code has already been sent, please try again!"
              ) {
                Swal.fire({
                  text: "Код уже отправлен, повторите попытку позже!",
                  icon: "error",
                });
              } else if (
                error?.response?.error ===
                "There is no such user! Please, register!"
              ) {
                Swal.fire({
                  text: "Такого пользователя нет! Зарегистрируйтесь!",
                  icon: "error",
                });
              }
            }
          }
        }
        console.log(formValues);
      }
      console.log(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  //
  console.log(phone);
  //
  return (
    <div className="LoginStaff">
      <div className="background_login"></div>

      <div className="container">
        <div className="title">
          <img src={logo_education} alt="" />
          <h2>Education Gateway</h2>
        </div>
        <div className="block">
          <div className="blockBox">
            {loading ? (
              <Loader
                type="spinner-circle"
                bgColor={"#FFFFFF"}
                color={"#FFFFFF"}
                size={75}
              />
            ) : (
              ""
            )}

            <h3>Восстановить пароль</h3>
            {/* Login kiritish */}
            <div className="loginInput">
              <p>Введите номер телефона указанные при рег-ции</p>
              <div>
                <input
                  type="text"
                  placeholder="+998901234567"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            {/* kirish */}
            <button onClick={sendCode}>Отправить</button>
            {/* parolni unutdim */}
            <div className="forgetPass">
              <p>
                Вспомнили пароль? <Link to="/login"> Войти</Link>
              </p>
            </div>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className="staff_modal"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <div className="loginStafModal">
                  <img src={message_icon} alt="" />
                  <p>
                    На ваш email мы отправили ссылку для восстановления пароля
                  </p>
                  <div>
                    <button>Отправить еще раз</button>
                    <button onClick={handleClose}>Вернуться</button>
                  </div>
                  <img
                    src={close_modal}
                    onClick={handleClose}
                    alt=""
                    className="close_modal"
                  />
                </div>
              </Fade>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginStaff;
