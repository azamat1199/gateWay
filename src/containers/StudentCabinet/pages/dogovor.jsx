import React from "react";
import { useSelector } from "react-redux";

// import css
import "../../../style/css/dogovor.css";

import download_icon from "../../../assets/icon/skachat.svg";
import print_icon from "../../../assets/icon/pechat.svg";
import StudentSidebar from "./SidebarStudent";

const Dogovor = () => {
  const selector = useSelector((state) => state);
  const { payload } = selector.payload;
  const { agreement_docx, agreement_pdf } = payload.data;
  return (
    <>
      <StudentSidebar />
      <div className="dogovor">
        <div className="top">
          <h1>Ваши университеты</h1>
          <div>
            <img src="https://picsum.photos/70" alt="" />
            <h2>
              Nargiza Akhmedova
              <span>IT Specialist</span>
            </h2>
          </div>
        </div>
        <div className="bootm">
          <div className="main">
            <h4>Договор </h4>
            <embed
              src={
                agreement_pdf.startsWith("h")
                  ? agreement_pdf
                  : `http://backend.edugateway.uz/${agreement_pdf}`
              }
              style={{ width: "100%", height: "80vh" }}
              type=""
            />
          </div>
          <div className="print">
            <button>
              <img src={download_icon} alt="" />
              <a href={agreement_pdf} download>
                {" "}
                Скачать PDF
              </a>
            </button>
            <button>
              <img src={download_icon} alt="" />
              <a href={agreement_docx} download>
                {" "}
                Скачать Word
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
