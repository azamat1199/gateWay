import React, { useEffect, useMemo, useState } from "react";
import StudentSidebar from "./SidebarStudent.jsx";
import Loader from "react-js-loader";
import styled from "styled-components";
// import css
import "../../../style/css/kabinet.css";
// import icon
import download_icon from "../../../assets/icon/download.svg";
import StudentCabinet from "../studentCabinet";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import Axios from "../../../utils/axios.js";
const Kabinet = () => {
  const [invoiceConfirm, setInvoiceConfirm] = useState();
  const [progress, setProgress] = useState(0);
  const univerId = JSON.parse(localStorage.getItem("univerId"));
  const userId = JSON.parse(localStorage.getItem("enrolle_user"));
  const files = JSON.parse(localStorage.getItem("files"));
  const profile3 = JSON.parse(localStorage.getItem("profile3"));
  const payment = JSON.parse(localStorage.getItem("payment"));
  const history = useHistory();
  const [myStep, setMyStep] = useState();
  const [currentStep, setCurrentStep] = useState();
  const selector = useSelector((state) => state);
  const { lastStep } = selector.dataSave;
  const { data } = selector?.payload?.payload;
  const { first_name, last_name, id, base_user, sity, email, role } = data;

  const fetchPaymentConfirm = async () => {
    try {
      const res = await Axios.get("/applicant/me/");
      const { data, status } = res;
      const { invoice_confirmed, step } = data;
      console.log(res);
      if (status == 200) {
        setMyStep(step);
        setInvoiceConfirm(invoice_confirmed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCurrentStep = async () => {
    try {
      const res = await Axios.get("/applicant/profile/step/");
      const { status, data } = res;
      const { step } = data;
      if (status === 200) {
        setCurrentStep(step);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(invoiceConfirm);
  console.log(progress);

  useEffect(() => {
    fetchCurrentStep();
    fetchPaymentConfirm();
  }, []);

  return (
    <>
      <StudentSidebar />
      <div className="DNT_Kabinet">
        {/* <div style={{width:'calc(100vw - 320px)'}} className="main"> */}
        <div className="main">
          <div className="lichKabinet">
            <div className="top">
              <div className="settings p-lr-30">
                <h6>Личный кабинет</h6>
                <span>
                  <svg
                    width="22"
                    height="24"
                    viewBox="0 0 22 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.0013 18.3349C17.1105 18.3349 19.9367 17.5512 20.2096 14.4055C20.2096 11.262 18.2392 11.4641 18.2392 7.60716C18.2392 4.59444 15.3836 1.16663 11.0013 1.16663C6.61897 1.16663 3.76339 4.59444 3.76339 7.60716C3.76339 11.4641 1.79297 11.262 1.79297 14.4055C2.067 17.5631 4.89322 18.3349 11.0013 18.3349Z"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M13.5876 21.5953C12.1098 23.2363 9.80445 23.2557 8.3125 21.5953"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <svg
                    width="22"
                    height="24"
                    viewBox="0 0 22 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M20.5395 7.2589L19.8653 6.0888C19.2948 5.09871 18.0306 4.75716 17.0392 5.32526V5.32526C16.5672 5.60327 16.0041 5.68215 15.4739 5.54449C14.9438 5.40684 14.4901 5.06396 14.2131 4.59147C14.0348 4.29114 13.9391 3.94907 13.9354 3.59986V3.59986C13.9515 3.03997 13.7403 2.49742 13.3499 2.09579C12.9594 1.69416 12.4231 1.46766 11.863 1.4679H10.5045C9.95572 1.46789 9.42959 1.68655 9.0425 2.0755C8.65541 2.46445 8.43928 2.99162 8.44191 3.54036V3.54036C8.42565 4.67332 7.50252 5.58319 6.36945 5.58308C6.02023 5.57945 5.67816 5.48367 5.37784 5.30542V5.30542C4.3864 4.73733 3.12221 5.07888 2.55175 6.06896L1.82788 7.2589C1.25811 8.24774 1.59502 9.51114 2.5815 10.085V10.085C3.22273 10.4552 3.61775 11.1394 3.61775 11.8798C3.61775 12.6202 3.22273 13.3044 2.5815 13.6746V13.6746C1.59627 14.2446 1.259 15.5049 1.82788 16.4908V16.4908L2.51209 17.6708C2.77937 18.1531 3.22782 18.509 3.75821 18.6597C4.2886 18.8105 4.8572 18.7436 5.33818 18.474V18.474C5.81101 18.1981 6.37446 18.1225 6.90329 18.264C7.43212 18.4055 7.88251 18.7524 8.15435 19.2276C8.33259 19.5279 8.42837 19.87 8.432 20.2192V20.2192C8.432 21.3638 9.35987 22.2917 10.5045 22.2917H11.863C13.0037 22.2917 13.93 21.3699 13.9354 20.2291V20.2291C13.9328 19.6787 14.1503 19.15 14.5395 18.7608C14.9288 18.3715 15.4574 18.154 16.0079 18.1567C16.3563 18.166 16.6969 18.2614 16.9995 18.4343V18.4343C17.9883 19.0041 19.2517 18.6672 19.8256 17.6807V17.6807L20.5395 16.4908C20.8159 16.0164 20.8918 15.4515 20.7503 14.9211C20.6089 14.3906 20.2618 13.9384 19.7859 13.6647V13.6647C19.3101 13.3909 18.963 12.9388 18.8215 12.4083C18.6801 11.8779 18.7559 11.313 19.0323 10.8386C19.212 10.5248 19.4722 10.2647 19.7859 10.085V10.085C20.7665 9.51145 21.1026 8.25543 20.5395 7.26881V7.26881V7.2589Z"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <circle
                      cx="11.1879"
                      cy="11.8798"
                      r="2.85583"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </div>
              <div className="person">
                <img src="https://picsum.photos/200" alt="" />
                <h4>
                  {first_name} {last_name}
                </h4>
                <h3>Заявитель</h3>
              </div>
              {/* // ! */}
            </div>
            <div className="bottom p-lr-30">
              <div className="progress">
                <h1>Ваш прогресс</h1>
                <div className="progressTdiv">
                  <div
                    className="progressIdiv"
                    style={
                      invoiceConfirm === true
                        ? { width: "100%" }
                        : currentStep === "registered"
                        ? { width: `20%` }
                        : currentStep === "university_chose"
                        ? { width: "40%" }
                        : currentStep === "data_entry"
                        ? { width: "60%" }
                        : currentStep === "document_upload" ||
                          currentStep === "payment"
                        ? { width: "80%" }
                        : { width: "0" }
                    }
                  >
                    <h6>
                      {" "}
                      {invoiceConfirm === true
                        ? "100%"
                        : currentStep === "registered"
                        ? "20%"
                        : currentStep === "university_chose"
                        ? "40%"
                        : currentStep === "data_entry"
                        ? "60%"
                        : currentStep === "document_upload" ||
                          currentStep === "payment"
                        ? "80%"
                        : "0"}{" "}
                    </h6>
                  </div>
                </div>
                <div className="progressTitle">
                  <p>Регистрация</p>
                  <p>Выберите университет</p>
                  <p>Заполнить заявку</p>
                  <p>Отправить документы</p>
                  <p>Услуга оплачена</p>
                </div>
              </div>
              <div className="danni">
                <div className="izmenit">
                  <h2>Список документов для подачи заявки</h2>
                  {/* <button>Изменить</button> */}
                </div>
                <table>
                  <tr>
                    <td>1. Сканер с оригинала паспорта</td>
                  </tr>
                  <tr>
                    <td>2. Сканер с оригинала диплома или аттестата</td>
                  </tr>
                  <tr>
                    <td> 3. 8шт. фото 3х4, скан с оригинала </td>
                  </tr>
                  <tr>
                    <td> 4. 063 мед. справка, скан с оригинала </td>
                  </tr>
                  <tr>
                    <td> 5. 086 мед. справка, скан с оригинала</td>
                  </tr>
                  <tr>
                    <td> 6. Свидетельство о рождении, скан с оригинала</td>
                  </tr>
                  <tr>
                    <td> 7. Справка о ВИЧ </td>
                  </tr>
                  <tr>
                    <td> 8. Сканер паспорта матери с оригинала, + прописка</td>
                  </tr>
                  <tr>
                    <td> 9. Свидетельсво о браке (если в браке) </td>
                  </tr>
                  <tr>
                    <td> 10. Языковой сертификат </td>
                  </tr>
                </table>
                <ButtonContainer>
                  {myStep === "payment_confirmation" ? (
                    <h1>Платеж проверяется</h1>
                  ) : (
                    <>
                      <button
                        style={
                          myStep === "profile_filled" ? { display: "none" } : {}
                        }
                        onClick={() => history.push("/universities")}
                      >
                        {" "}
                        Найти университет{" "}
                      </button>
                      <button
                        style={
                          myStep === "profile_filled" ? {} : { display: "none" }
                        }
                        onClick={() => history.push("/payment-transaction")}
                      >
                        {" "}
                        Заполнить анкету{" "}
                      </button>
                    </>
                  )}
                </ButtonContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Kabinet;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  button {
    height: 64px;
    width: 600px;
    position: relative;
    top: 13px;
    color: #fff;
    cursor: pointer;
    border: none;
    margin: 0 !important;
    left: 0 !important;
    font-size: 20px;
    background: #00587f;
    border-radius: 10px;
    transition: 0.4s;
    font-weight: 500;
  }
`;
