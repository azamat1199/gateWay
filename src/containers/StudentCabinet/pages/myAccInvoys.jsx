import React, { useEffect, useRef, useState } from "react";
import StudentSidebar from "./SidebarStudent";
import "../../../style/css/status.css";
import StudentCabinet from "../studentCabinet";
import { useSelector } from "react-redux";
import folder from "../../../assets/icons/folder.svg";
import avatar from "../../../assets/icon/Avatar.svg";
import pdf from "../../../assets/icons/pdf.svg";
import down_doc from "../../../assets/icons/down_doc.svg";
import invoysLineImg from "../../../assets/images/invoysLine.svg";
import styled from "styled-components";
import Axios from "../../../utils/axios.js";
import Swal from "sweetalert2";
import Loader from "react-js-loader";
import check from "../../../assets/icon/checked.svg";
import wait from "../../../assets/images/Waiting.svg";
import goal from "../../../assets/images/Goal.svg";
const MyAccInvoys = () => {
  const [currentStep, setCurrentStep] = useState();
  const [loading, setLoading] = useState(false);
  const inputEl1 = useRef(null);
  const [file, setFile] = useState({
    myInvoice: "",
    diploma_confirmed: "",
  });
  const selector = useSelector((state) => state);
  const [cert, setCert] = useState("");
  const { data } = selector?.payload?.payload;
  const { first_name, last_name, id } = data;
  const [downloaded, setDownloaded] = useState(false);
  const [invoice, setInvoice] = useState({
    applicant_invoice_upload: null,
    university_invoice_confirmed: null,
    university_invoice_upload: null,
  });
  console.log(id);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (inputEl1.current?.files[0]) {
      formData.append("applicant_invoice_upload", inputEl1.current.files[0]);
    }
    try {
      const res = await Axios.patch(
        `applicant/upload-invoice/${id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { status } = res;
      if (status === 200) {
        Swal.fire({
          icon: "success",
          text: "Загружено успешно",
        });
      }
      console.log(res);
    } catch (error) {}
  };
  const handleChange = (e) => {
    const { name, files } = e.target;
    setFile((state) => ({ ...state, [name]: files[0] }));
  };
  console.log(file);
  const fetchMyData = async () => {
    try {
      const res = await Axios.get("/applicant/me/");
      const { data, status } = res;
      const { university_cert, step } = data;
      console.log(res);
      if (status == 200) {
        setCert(university_cert);
        setCurrentStep(step);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchInvoice();
    fetchMyData();
  }, []);
  console.log(downloaded);
  return (
    <>
      <StudentSidebar />
      <div className="main">
        <div className="status">
          <div className="top">
            <h1>Инвойс</h1>
            <div>
              <img src={avatar} alt="" />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h4>
                  {first_name} {last_name}
                </h4>
                <h5>Заявитель</h5>
              </div>
            </div>
          </div>
          <div className="myAccInvBottom">
            <div className="myAccInvBottom_Btn">
              {loading ? (
                <Loader
                  type="spinner-circle"
                  bgColor={"#fff"}
                  color={"#fff"}
                  size={80}
                />
              ) : invoice.university_invoice_upload === null ? (
                "У вас нет счета еще "
              ) : (
                <MyInvoice>
                  <a
                    href={invoice.university_invoice_upload}
                    target="_blank"
                    download={invoice.university_invoice_upload}
                    onClick={() => setDownloaded(() => !downloaded)}
                    className="form_doc"
                  >
                    <img src={pdf} alt="" />
                    <p style={{ fontSize: "18px" }}> Счет </p>
                    <img src={down_doc} alt="" />
                  </a>
                  <a
                    href={invoice.university_invoice_upload}
                    target="_blank"
                    onClick={() => setDownloaded(true)}
                    className="downloadBtn"
                  >
                    Скачать инвойс
                  </a>
                </MyInvoice>
              )}
            </div>
          </div>
          {cert ? (
            <div className="myAccInvBottom">
              <div className="myAccInvBottom_Btn">
                <MyInvoice>
                  <a
                    href={cert}
                    target="_blank"
                    download={cert}
                    onClick={() => setDownloaded(() => !downloaded)}
                    className="form_doc"
                  >
                    <img src={pdf} alt="" />
                    <p style={{ fontSize: "18px" }}> файл </p>
                    <img src={down_doc} alt="" />
                  </a>
                  <a
                    href={cert}
                    target="_blank"
                    onClick={() => setDownloaded(true)}
                    className="downloadBtn"
                  >
                    Скачать файл
                  </a>
                </MyInvoice>
              </div>
            </div>
          ) : (
            ""
          )}

          {invoice.university_invoice_confirmed === true ||
          currentStep === "completed" ? (
            <div className="bottom">
              <img src={goal} alt="waitforRESULT" />
              <h1>
                Вы успешно зачислены в университе! <span>Поздравления!</span>
              </h1>
            </div>
          ) : invoice.university_invoice_upload === null ? (
            ""
          ) : invoice.applicant_invoice_upload ? (
            ""
          ) : (
            <div className="myAccInvBottom">
              <div className="myAccInvBottom_Btn">
                <MyInvoice>
                  <>
                    <label
                      style={{ position: "relative" }}
                      htmlFor="drop1"
                      className="form_down"
                    >
                      <img src={folder} alt="" />
                      <input
                        ref={inputEl1}
                        type="file"
                        onChange={handleChange}
                        name="diploma_confirmed"
                        id="drop1"
                      />
                      <p style={{ fontSize: "18px" }}>
                        Drop your files here or{" "}
                        <span style={{ fontSize: "15px" }}> choose file</span>
                      </p>

                      <p
                        style={{
                          height: "27px",
                          position: "absolute",
                          right: "-45px",
                        }}
                        className="checkIcon"
                      >
                        {file?.diploma_confirmed ? (
                          <img
                            style={{ height: "100%" }}
                            src={check}
                            alt="success"
                          />
                        ) : (
                          ""
                        )}
                      </p>
                    </label>
                    <button
                      style={
                        inputEl1?.current?.files[0]
                          ? { cursor: "pointer !important" }
                          : { cursor: "not-allowe !important" }
                      }
                      onClick={handleSubmit}
                      className="downloadBtn"
                    >
                      Загрузить
                    </button>
                  </>
                </MyInvoice>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyAccInvoys;

const MyInvoice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  .downloadBtn {
    background: #00587f !important;
    border-radius: 10px !important;
    padding: 15px 20px !important;
    outline: none !important;
    border: none !important;
    color: #fff !important;
    height: 55px !important;
    width: 224px !important;
    transition: 0.2s !important;
    &:hover {
      border: 1px solid #00587f !important;
      background: #fff !important;
      color: #00587f !important;
      transition: 0.2s !important;
    }
  }
`;
