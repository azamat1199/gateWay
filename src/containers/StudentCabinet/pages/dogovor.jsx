import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// import css
import "../../../style/css/dogovor.css";
import avatar from "../../../assets/icon/Avatar.svg";
import download_icon from "../../../assets/icon/skachat.svg";
import print_icon from "../../../assets/icon/pechat.svg";
import StudentSidebar from "./SidebarStudent";
import Axios from "../../../utils/axios.js";

const Dogovor = () => {
  const selector = useSelector((state) => state);
  const { payload } = selector.payload;
  const { first_name, last_name } = payload.data;
  const [agreement_pdf, setAggrement] = useState();

  const fetchAgreement = async () => {
    try {
      const res = await Axios.get("/applicant/me/");
      console.log(res);
      const { data, status } = res;
      const { agreement_pdf } = data;
      if (status === 200) {
        setAggrement(agreement_pdf);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(agreement_pdf);
  useEffect(() => {
    fetchAgreement();
  }, []);
  return (
    <>
      <StudentSidebar />
      <div className="dogovor">
        <div className="top">
          <h1>электронный дагавор</h1>
          <div>
            <img src={avatar} alt="" />
            <h2>
              {first_name} {last_name}
              <span>Заявитель</span>
            </h2>
          </div>
        </div>
        <div className="bootm">
          <div className="main">
            <h4>Договор </h4>
            <embed
              src={
                agreement_pdf?.startsWith("h")
                  ? agreement_pdf
                  : `http://backend.edugateway.uz${agreement_pdf}`
              }
              style={{ width: "100%", height: "80vh" }}
              type=""
            />
          </div>
          <div className="print">
            <button>
              <img src={download_icon} alt="" />
              <a
                style={{ color: "#00587f" }}
                href={
                  agreement_pdf?.startsWith("h")
                    ? agreement_pdf
                    : `http://backend.edugateway.uz${agreement_pdf}`
                }
                download
              >
                {" "}
                Скачать PDF
              </a>
            </button>
            <button>
              <img src={print_icon} alt="" />
              Напечатать
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dogovor;
