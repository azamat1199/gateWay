import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import '../../../style/css/LoginStaff.css';
import logo_education from '../../../assets/icon/Logo_education.svg';
import message_icon from '../../../assets/icon/message_icon.svg';
import close_modal from '../../../assets/icon/close_modal.svg';

const LoginStaff = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //
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
            <h3>Восстановить пароль</h3>
            {/* Login kiritish */}
            <div className="loginInput">
              <p>
                Введите номер телефона или email адрес указанные при рег-ции
              </p>
              <div>
                <input type="text" />
              </div>
            </div>
            {/* kirish */}
            <button onClick={handleOpen}>Отправить</button>
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
