import React, { useEffect, useState } from "react";
import StudentSidebar from "./SidebarStudent";
import "../../../style/css/status.css";
import StudentCabinet from "../studentCabinet";
import Axios from "../../../utils/axios.js";
import wait from "../../../assets/images/Waiting.svg";
import goal from "../../../assets/images/Goal.svg";
import { useSelector } from "react-redux";
const Status = () => {
  const [loading, setLoading] = useState(false);
  const [invoice, setInvoice] = useState({
    applicant_invoice_upload: null,
    university_invoice_confirmed: null,
    university_invoice_upload: null,
  });
  const selector = useSelector((state) => state);
  const { payload } = selector.payload;
  const { first_name, last_name } = payload.data;

  const fetchInvoice = async () => {
    setLoading(true);
    try {
      const res = await Axios.get("/applicant/university-docs/");
      const { status, data } = res;
      if (status === 200) {
        setInvoice(data);
        if (data) {
          localStorage.setItem("invoiceSeen", data.university_invoice_upload);
        }
      }
      console.log(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchInvoice();
  }, []);
  return (
    <>
      <StudentSidebar />
      <div className="main">
        <div className="status">
          <div className="top">
            <h1>Ваши университеты</h1>
            <div>
              <img src="https://picsum.photos/70" alt="" />
              <h2>
                {first_name} {last_name} <span>Заявитель</span>
              </h2>
            </div>
          </div>
          <div className="bottom">
            {invoice.university_invoice_confirmed === true ? (
              <>
                <img src={goal} alt="waitForResult" />
                <h1>
                  Вы успешно зачислены в университе! <span>Поздравления!</span>
                </h1>
              </>
            ) : invoice.university_invoice_confirmed === null ? (
              "yoi dont have any invoice yet"
            ) : (
              <>
                <img src={wait} alt="waitForResult" />
                <h1>
                  В вашем платеже есть недостатки.
                  <span>Обратитесь менеджеру</span>
                </h1>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Status;
