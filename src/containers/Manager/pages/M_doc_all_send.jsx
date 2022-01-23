import React, { useState, useEffect, useRef } from "react";
import ManegerSidebar from "../ManagerSidebar";
import userpic from "../../../assets/icon/userpic.svg";
import pdf from "../../../assets/icons/pdf.svg";
import down_doc from "../../../assets/icons/down_doc.svg";
import check from "../../../assets/icons/check.svg";
import folder from "../../../assets/icons/folder.svg";
import sms from "../../../assets/icons/sms.svg";
import close from "../../../assets/icon/close-red.svg";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import Axios from "../../../utils/axios";
import Loader from "react-js-loader";
import close_modal from "../../../assets/icon/close_modal.svg";
import folder_icon from "../../../assets/icon/folder_icon.svg";
import arrow1 from "../../../assets/icon/arrow1.svg";
import styled from "styled-components";
const M_doc_all_send = () => {
  const history = useHistory();
  const selector = useSelector((state) => state.payload.payload.data);
  const [userDoc, setUserDoc] = useState();
  const params = useParams();
  const [allData, setAllData] = useState();
  const [whereGoFile, setWhereGoFile] = useState();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const inputEl1 = useRef(null);
  const [newFileName, setNewFileName] = useState("");
  const [newFile, setNewFile] = useState(null);
  const [img, setImg] = useState();
  const [isNeedTranslate, setIsNeedTranslate] = useState("need_to_translate");
  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const [file, setFile] = useState({
    passport_confirmed: null,
    diploma_confirmed: null,
    birth_cert_confirmed: null,
    photo_confirmed: null,
    passport_mother_confirmed: null,
    marriage_cert_confirmed: null,
    agreement_doc_confirmed: null,
    med_063_cert_confirmed: null,
    med_086_cert_confirmed: null,
    hiv_cert_confirmed: null,
  });
  const [n, setN] = useState({
    passport_confirmed_N: false,
    diploma_confirmed_N: false,
    birth_cert_confirmed_N: false,
    photo_confirmed_N: false,
    passport_mother_confirmed_N: false,
    marriage_cert_confirmed_N: false,
    agreement_doc_confirmed_N: false,
    med_063_cert_confirmed_N: false,
    med_086_cert_confirmed_N: false,
    hiv_cert_confirmed_N: false,
  });
  const [o, setO] = useState({
    passport_confirmed_O: false,
    diploma_confirmed_O: false,
    birth_cert_confirmed_O: false,
    photo_confirmed_O: false,
    passport_mother_confirmed_O: false,
    marriage_cert_confirmed_O: false,
    agreement_doc_confirmed_O: false,
    med_063_cert_confirmed_O: false,
    med_086_cert_confirmed_O: false,
    hiv_cert_confirmed_O: false,
  });
  const [dowload, setDownload] = useState({
    fileDownload1: false,
    fileDownload2: false,
    fileDownload3: false,
    fileDownload4: false,
    fileDownload5: false,
    fileDownload6: false,
    fileDownload7: false,
    fileDownload8: false,
    fileDownload9: false,
    fileDownload10: false,
  });
  const [data, setData] = useState();

  const handdleInput = (e) => {
    const { name, files } = e.target;
    setData((state) => ({ ...state, [name]: files[0] }));
  };
  useEffect(() => {
    setWhereGoFile((state) =>
      file?.passport_confirmed == "need_to_translate" ||
      file?.diploma_confirmed == "need_to_translate" ||
      file?.birth_cert_confirmed == "need_to_translate" ||
      file?.photo_confirmed == "need_to_translate" ||
      file?.passport_mother_confirmed == "need_to_translate" ||
      file?.marriage_cert_confirmed == "need_to_translate" ||
      file?.agreement_doc_confirmed == "need_to_translate" ||
      file?.med_086_cert_confirmed == "need_to_translate" ||
      file?.hiv_cert_confirmed == "need_to_translate"
        ? false
        : true
    );
  }, [file]);

  const handdleorOrginalFile = (e) => {
    const name = e.target.name;
    setFile((state) => ({ ...state, [name]: "original_confirmed" }));
    setO((state) => ({ ...state, [`${name}_O`]: true }));
  };

  const handdleorNotarylFile = (e) => {
    const name = e.target.name;
    setFile((state) => ({ ...state, [name]: "need_to_translate" }));
    setN((state) => ({ ...state, [`${name}_N`]: true }));
  };

  const handdleDownload = (e) => {
    const name = e.target.name;
    setDownload((state) => ({ ...state, [name]: true }));
  };

  const getUserInfo = async () => {
    try {
      const res = await Axios.get(`applicant/${params.id}/`);
      if (res.status == "success") {
        setUserDoc(res.data);
        setLoading((loading) => !loading);
      }
      setUserDoc(res.data);
      setLoading((loading) => !loading);
    } catch (error) {
      setLoading((loading) => !loading);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  const formDate = new FormData();
  if (data?.passport) {
    formDate.append("passport", data?.passport);
  }
  if (data?.diploma) {
    formDate.append("diploma", data?.diploma);
  }
  if (data?.birth_cert) {
    formDate.append("birth_cert", data?.birth_cert);
  }
  if (data?.photo) {
    formDate.append("photo", data?.photo);
  }
  if (data?.passport_mother) {
    formDate.append("passport_mother", data?.passport_mother);
  }
  if (data?.marriage_cert) {
    formDate.append("marriage_cert", data?.marriage_cert);
  }
  if (data?.agreement_doc) {
    formDate.append("agreement_doc", data?.agreement_doc);
  }
  if (data?.med_063_cert) {
    formDate.append("med_063_cert", data?.med_063_cert);
  }
  if (data?.med_086_cert) {
    formDate.append("med_086_cert", data?.med_086_cert);
  }
  if (data?.hiv_cert) {
    formDate.append("hiv_cert", data?.hiv_cert);
  }

  if (userDoc?.passport) {
    formDate.append("passport_confirmed", file?.passport_confirmed);
  }
  if (userDoc?.diploma) {
    formDate.append("diploma_confirmed", file?.diploma_confirmed);
  }
  if (userDoc?.birth_cert) {
    formDate.append("birth_cert_confirmed", file?.birth_cert_confirmed);
  }
  if (userDoc?.photo) {
    formDate.append("photo_confirmed", file?.photo_confirmed);
  }
  if (userDoc?.passport_mother) {
    formDate.append(
      "passport_mother_confirmed",
      file?.passport_mother_confirmed
    );
  }
  if (userDoc?.marriage_cert) {
    formDate.append("marriage_cert_confirmed", file?.marriage_cert_confirmed);
  }

  if (userDoc?.agreement_doc) {
    formDate.append("agreement_doc_confirmed", file?.agreement_doc_confirmed);
  }
  if (userDoc?.med_063_cert) {
    formDate.append("med_063_cert_confirmed", file?.med_063_cert_confirmed);
  }
  if (userDoc?.med_086_cert) {
    formDate.append("med_086_cert_confirmed", file?.med_086_cert_confirmed);
  }
  if (data?.hiv_cert) {
    formDate.append("hiv_cert_confirmed", file?.hiv_cert_confirmed);
  }
  const next_step = whereGoFile ? "university" : "notary";
  formDate.append("next_step", next_step);
  const sendNotary = async () => {
    setAllData((state) => ({ ...state, ...formDate }));
    try {
      const res = await Axios.patch(
        `/applicant/manager-check-documents/${params.id}/`,
        formDate,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {}
    history.push("/m-docs_all");
  };
  const addNewFile = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append(`${newFileName}`, newFile);

      const res = await Axios.patch(
        `/applicant/manager-check-documents/${params.id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      getUserInfo();
      setLoading((loading) => !loading);

      setOpen(false);
      setImg({});
      setData({});
    } catch (error) {}

    handleClose();
  };
  const closeN = (e) => {
    const { name } = e.target;

    setFile((state) => ({ ...state, [name]: false }));
    setN((state) => ({ ...state, [`${name}_N`]: false }));
  };
  const closeO = (e) => {
    const { name } = e.target;
    setFile((state) => ({ ...state, [name]: false }));
    setO((state) => ({ ...state, [`${name}_O`]: false }));
  };
  return (
    <React.Fragment>
      <ManegerSidebar />
      <Responsive>
        <div className="up_nav n_up">
          <div className="single_h1">
            <h1 className="link_h1">Документы </h1>
            <h3>
              {" "}
              {" > "}
              {userDoc?.first_name.toUpperCase()}{" "}
              {userDoc?.last_name.toUpperCase()}
            </h3>
          </div>
          <div className="user_info">
            <img src={userpic} alt="" />
            <div>
              <h1>
                {selector?.first_name} {selector?.last_name}
              </h1>
              <h2>{selector?.role}</h2>
            </div>
          </div>
        </div>

        {loading ? (
          <Loader
            className="spinner2"
            type="spinner-circle"
            bgColor={"#FFFFFF"}
            color={"#FFFFFF"}
            size={80}
          />
        ) : (
          <div className="doc_box">
            <div className="doc_perevodi">
              <div className="doc_1">
                <h1>Оригинал документов:</h1>
                {dowload.fileDownload1 ? (
                  <label htmlFor="passport" className="form_down">
                    <img src={folder} alt="" />
                    <input
                      type="file"
                      onChange={(e) => handdleInput(e)}
                      name="passport"
                      id="passport"
                    />
                    <p>
                      Drop your files here or <span>choose file</span>
                    </p>
                  </label>
                ) : (
                  <div
                    className="form_doc"
                    style={{
                      display: (userDoc?.passport == null && "none") || "flex",
                    }}
                  >
                    <img src={pdf} alt="" />
                    <p> Паспорт </p>
                    <a target="_blank" href={`${userDoc.passport}`}>
                      <img src={down_doc} alt="" />{" "}
                    </a>
                    <img
                      src={close}
                      style={{ width: "25px" }}
                      name="fileDownload1"
                      onClick={(e) => handdleDownload(e)}
                      alt=""
                    />
                  </div>
                )}

                {dowload.fileDownload2 ? (
                  <label htmlFor="diploma" className="form_down">
                    <img src={folder} alt="" />
                    <input
                      type="file"
                      name="diploma"
                      onChange={(e) => handdleInput(e)}
                      id="diploma"
                    />
                    <p>
                      Drop your files here or <span>choose file</span>
                    </p>
                  </label>
                ) : (
                  <div
                    className="form_doc"
                    style={{
                      display: (userDoc.diploma == null && "none") || "flex",
                    }}
                  >
                    <img src={pdf} alt="" />
                    <p> Диплом/Аттестат </p>
                    <a target="_blank" href={`${userDoc.diploma}`}>
                      <img src={down_doc} alt="" />
                    </a>
                    <img
                      src={close}
                      style={{ width: "25px" }}
                      name="fileDownload2"
                      onClick={(e) => handdleDownload(e)}
                      alt=""
                    />
                  </div>
                )}

                {dowload.fileDownload3 ? (
                  <label htmlFor="birth_cert" className="form_down">
                    <img src={folder} alt="" />
                    <input
                      type="file"
                      onChange={(e) => handdleInput(e)}
                      name="birth_cert"
                      id="birth_cert"
                    />
                    <p>
                      Drop your files here or <span>choose file</span>
                    </p>
                  </label>
                ) : (
                  <div
                    className="form_doc"
                    style={{
                      display: (userDoc.birth_cert == null && "none") || "flex",
                    }}
                  >
                    <img src={pdf} alt="" />
                    <p> Свидет. о рождении </p>
                    <a target="_blank" href={`${userDoc.birth_cert}`}>
                      {" "}
                      <img src={down_doc} alt="" />
                    </a>
                    <img
                      src={close}
                      style={{ width: "25px" }}
                      name="fileDownload3"
                      onClick={(e) => handdleDownload(e)}
                      alt=""
                    />
                  </div>
                )}

                {dowload.fileDownload4 ? (
                  <label htmlFor="photo" className="form_down">
                    <img src={folder} alt="" />
                    <input
                      type="file"
                      name="photo"
                      onChange={(e) => handdleInput(e)}
                      id="photo"
                    />
                    <p>
                      Drop your files here or <span>choose file</span>
                    </p>
                  </label>
                ) : (
                  <div
                    className="form_doc"
                    style={{
                      display: (userDoc.photo == null && "none") || "flex",
                    }}
                  >
                    <img src={pdf} alt="" />
                    <p> 3х4 фото 8шт. </p>
                    <a target="_blank" href={`${userDoc.photo}`}>
                      {" "}
                      <img src={down_doc} alt="" />
                    </a>
                    <img
                      src={close}
                      style={{ width: "25px" }}
                      name="fileDownload4"
                      onClick={(e) => handdleDownload(e)}
                      alt=""
                    />
                  </div>
                )}
                {dowload.fileDownload5 ? (
                  <label htmlFor="passport_mother" className="form_down">
                    <img src={folder} alt="" />
                    <input
                      type="file"
                      name="passport_mother"
                      onChange={(e) => handdleInput(e)}
                      id="passport_mother"
                    />
                    <p>
                      Drop your files here or <span>choose file</span>
                    </p>
                  </label>
                ) : (
                  <div
                    className="form_doc"
                    style={{
                      display:
                        (userDoc.passport_mother == null && "none") || "flex",
                    }}
                  >
                    <img src={pdf} alt="" />
                    <p> Паспорт матери </p>
                    <a target="_blank" href={`${userDoc.passport_mother}`}>
                      <img src={down_doc} alt="" />
                    </a>
                    <img
                      src={close}
                      style={{ width: "25px" }}
                      name="fileDownload5"
                      onClick={(e) => handdleDownload(e)}
                      alt=""
                    />
                  </div>
                )}

                {dowload.fileDownload6 ? (
                  <label htmlFor="marriage_cert" className="form_down">
                    <img src={folder} alt="" />
                    <input
                      type="file"
                      name="marriage_cert"
                      onChange={(e) => handdleInput(e)}
                      id="marriage_cert"
                    />
                    <p>
                      Drop your files here or <span>choose file</span>
                    </p>
                  </label>
                ) : (
                  <div
                    className="form_doc"
                    style={{
                      display:
                        (userDoc.marriage_cert == null && "none") || "flex",
                    }}
                  >
                    <img src={pdf} alt="" />
                    <p> Свид. о браке </p>
                    <a target="_blank" href={`${userDoc.marriage_cert}`}>
                      {" "}
                      <img src={down_doc} alt="" />
                    </a>
                    <img
                      src={close}
                      style={{ width: "25px" }}
                      name="fileDownload6"
                      onClick={(e) => handdleDownload(e)}
                      alt=""
                    />
                  </div>
                )}

                {dowload.fileDownload7 ? (
                  <label htmlFor="agreement_doc" className="form_down">
                    <img src={folder} alt="" />
                    <input
                      type="file"
                      name="agreement_doc"
                      onChange={(e) => handdleInput(e)}
                      id="agreement_doc"
                    />
                    <p>
                      Drop your files here or <span>choose file</span>
                    </p>
                  </label>
                ) : (
                  <div
                    className="form_doc"
                    style={{
                      display:
                        (userDoc.agreement_doc == null && "none") || "flex",
                    }}
                  >
                    <img src={pdf} alt="" />
                    <p> Договор с компанией </p>
                    <a href={`${userDoc.agreement_doc}`}>
                      {" "}
                      <img src={down_doc} alt="" />
                    </a>
                    <img
                      src={close}
                      style={{ width: "25px" }}
                      name="fileDownload7"
                      onClick={(e) => handdleDownload(e)}
                      alt=""
                    />
                  </div>
                )}

                {dowload.fileDownload8 ? (
                  <label htmlFor="med_063_cert" className="form_down">
                    <img src={folder} alt="" />
                    <input
                      type="file"
                      name="med_063_cert"
                      onChange={(e) => handdleInput(e)}
                      id="med_063_cert"
                    />
                    <p>
                      Drop your files here or <span>choose file</span>
                    </p>
                  </label>
                ) : (
                  <div
                    className="form_doc"
                    style={{
                      display:
                        (userDoc.med_063_cert == null && "none") || "flex",
                    }}
                  >
                    <img src={pdf} alt="" />
                    <p> 063 мед. справка </p>
                    <a target="_blank" href={`${userDoc.med_063_cert}`}>
                      <img src={down_doc} alt="" />
                    </a>
                    <img
                      src={close}
                      style={{ width: "25px" }}
                      name="fileDownload8"
                      onClick={(e) => handdleDownload(e)}
                      alt=""
                    />
                  </div>
                )}

                {dowload.fileDownload9 ? (
                  <label htmlFor="med_086_cert" className="form_down">
                    <img src={folder} alt="" />
                    <input
                      type="file"
                      name="med_086_cert"
                      onChange={(e) => handdleInput(e)}
                      id="med_086_cert"
                    />
                    <p>
                      Drop your files here or <span>choose file</span>
                    </p>
                  </label>
                ) : (
                  <div
                    className="form_doc"
                    style={{
                      display:
                        (userDoc.med_086_cert == null && "none") || "flex",
                    }}
                  >
                    <img src={pdf} alt="" />
                    <p> 086 мед. справка </p>
                    <a target="_blank" href={`${userDoc.med_086_cert}`}>
                      <img src={down_doc} alt="" />
                    </a>
                    <img
                      src={close}
                      style={{ width: "25px" }}
                      name="fileDownload9"
                      onClick={(e) => handdleDownload(e)}
                      alt=""
                    />
                  </div>
                )}

                {dowload.fileDownload10 ? (
                  <label htmlFor="hiv_cert" className="form_down">
                    <img src={folder} alt="" />
                    <input
                      type="file"
                      name="hiv_cert"
                      onChange={(e) => handdleInput(e)}
                      id="hiv_cert"
                    />
                    <p>
                      Drop your files here or <span>choose file</span>
                    </p>
                  </label>
                ) : (
                  <a
                    className="form_doc"
                    style={{
                      display: (userDoc.hiv_cert == null && "none") || "flex",
                    }}
                  >
                    <img src={pdf} alt="" />
                    <p> Справка о ВИЧ </p>
                    <a target="_blank" href={`${userDoc.hiv_cert}`}>
                      <img src={down_doc} alt="" />
                    </a>
                    <img
                      src={close}
                      style={{ width: "25px" }}
                      name="fileDownload10"
                      onClick={(e) => handdleDownload(e)}
                      alt=""
                    />
                  </a>
                )}
              </div>
              <div className="doc_1">
                <h1>Перевод документов:</h1>

                {file.passport_confirmed ? (
                  <>
                    {" "}
                    <div
                      className="form_doc"
                      style={{
                        display: (o.passport_confirmed_O && "flex") || "none",
                      }}
                    >
                      <img src={pdf} alt="" /> <p> Паспорт </p>
                      <img src={check} alt="" />
                      <img
                        src={close}
                        style={{ width: "25px" }}
                        name="passport_confirmed"
                        onClick={(e) => closeO(e)}
                        alt=""
                      />
                    </div>
                    <div
                      className="form_doc"
                      style={{
                        display: (n.passport_confirmed_N && "flex") || "none",
                      }}
                    >
                      <img src={sms} alt="" />
                      <p> Паспорт отправлен нотариусу </p>
                      <img src={check} alt="" />
                      <img
                        src={close}
                        style={{ width: "25px" }}
                        name="passport_confirmed"
                        onClick={(e) => closeN(e)}
                        alt=""
                      />
                    </div>
                  </>
                ) : (
                  <div
                    className={`form_doc_btn`}
                    style={{
                      display: (userDoc.passport == null && "none") || "flex",
                    }}
                  >
                    <button
                      name="passport_confirmed"
                      onClick={(e) => handdleorNotarylFile(e)}
                      className={`white-btn`}
                    >
                      Передать нотариусу
                    </button>
                    <button
                      className={`green-btn`}
                      name="passport_confirmed"
                      onClick={(e) => handdleorOrginalFile(e)}
                    >
                      Потвердить оригинал
                    </button>
                  </div>
                )}

                {file.diploma_confirmed ? (
                  <>
                    {" "}
                    <div
                      className="form_doc"
                      style={{
                        display: (o.diploma_confirmed_O && "flex") || "none",
                      }}
                    >
                      <img src={pdf} alt="" /> <p> Диплом/Аттестат </p>
                      <img src={check} alt="" />
                      <img
                        src={close}
                        style={{ width: "25px" }}
                        name="diploma_confirmed"
                        onClick={(e) => closeO(e)}
                        alt=""
                      />
                    </div>
                    <div
                      className="form_doc"
                      style={{
                        display: (n.diploma_confirmed_N && "flex") || "none",
                      }}
                    >
                      <img src={sms} alt="" />
                      <p> Диплом/Аттестат отправлен нотариусу </p>
                      <img src={check} alt="" />
                      <img
                        src={close}
                        style={{ width: "25px" }}
                        name="diploma_confirmed"
                        onClick={(e) => closeN(e)}
                        alt=""
                      />
                    </div>
                  </>
                ) : (
                  <div
                    className=" form_doc_btn"
                    style={{
                      display: (userDoc.diploma == null && "none") || "flex",
                    }}
                  >
                    <button
                      name="diploma_confirmed"
                      onClick={(e) => handdleorNotarylFile(e)}
                      className="white-btn"
                    >
                      Передать нотариусу
                    </button>
                    <button
                      className="green-btn"
                      name="diploma_confirmed"
                      onClick={(e) => handdleorOrginalFile(e)}
                    >
                      Потвердить оригинал
                    </button>
                  </div>
                )}

                {file.birth_cert_confirmed ? (
                  <>
                    {" "}
                    <div
                      className="form_doc"
                      style={{
                        display: (o.birth_cert_confirmed_O && "flex") || "none",
                      }}
                    >
                      <img src={pdf} alt="" /> <p> Свидет. о рождении </p>
                      <img src={check} alt="" />
                      <img
                        src={close}
                        style={{ width: "25px" }}
                        name="birth_cert_confirmed"
                        onClick={(e) => closeO(e)}
                        alt=""
                      />
                    </div>
                    <div
                      className="form_doc"
                      style={{
                        display: (n.birth_cert_confirmed_N && "flex") || "none",
                      }}
                    >
                      <img src={sms} alt="" />
                      <p> Свидет. о рождении отправлен нотариусу </p>
                      <img src={check} alt="" />
                      <img
                        src={close}
                        style={{ width: "25px" }}
                        name="birth_cert_confirmed"
                        onClick={(e) => closeN(e)}
                        alt=""
                      />
                    </div>
                  </>
                ) : (
                  <div
                    className=" form_doc_btn"
                    style={{
                      display: (userDoc.birth_cert == null && "none") || "flex",
                    }}
                  >
                    <button
                      name="birth_cert_confirmed"
                      onClick={(e) => handdleorNotarylFile(e)}
                      className="white-btn"
                    >
                      Передать нотариусу
                    </button>
                    <button
                      className="green-btn"
                      name="birth_cert_confirmed"
                      onClick={(e) => handdleorOrginalFile(e)}
                    >
                      Потвердить оригинал
                    </button>
                  </div>
                )}

                {file.photo_confirmed ? (
                  <>
                    {" "}
                    <div
                      className="form_doc"
                      style={{
                        display: (o.photo_confirmed_O && "flex") || "none",
                      }}
                    >
                      <img src={pdf} alt="" /> <p> 3х4 фото 8шт. </p>
                      <img src={check} alt="" />
                      <img
                        src={close}
                        style={{ width: "25px" }}
                        name="photo_confirmed"
                        onClick={(e) => closeO(e)}
                        alt=""
                      />
                    </div>
                    <div
                      className="form_doc"
                      style={{
                        display: (n.photo_confirmed_N && "flex") || "none",
                      }}
                    >
                      <img src={sms} alt="" />
                      <p> 3х4 фото 8шт. отправлен нотариусу </p>
                      <img src={check} alt="" />
                      <img
                        src={close}
                        style={{ width: "25px" }}
                        name="photo_confirmed"
                        onClick={(e) => closeN(e)}
                        alt=""
                      />
                    </div>
                  </>
                ) : (
                  <div
                    className=" form_doc_btn"
                    style={{
                      display: (userDoc.photo == null && "none") || "flex",
                    }}
                  >
                    <button
                      name="photo_confirmed"
                      onClick={(e) => handdleorNotarylFile(e)}
                      className="white-btn"
                    >
                      Передать нотариусу
                    </button>
                    <button
                      className="green-btn"
                      name="photo_confirmed"
                      onClick={(e) => handdleorOrginalFile(e)}
                    >
                      Потвердить оригинал
                    </button>
                  </div>
                )}

                {file.passport_mother_confirmed ? (
                  <>
                    {" "}
                    <div
                      className="form_doc"
                      style={{
                        display:
                          (o.passport_mother_confirmed_O && "flex") || "none",
                      }}
                    >
                      <img src={pdf} alt="" /> <p> Паспорт матери </p>
                      <img src={check} alt="" />
                      <img
                        src={close}
                        style={{ width: "25px" }}
                        name="passport_mother_confirmed"
                        onClick={(e) => closeO(e)}
                        alt=""
                      />
                    </div>
                    <div
                      className="form_doc"
                      style={{
                        display:
                          (n.passport_mother_confirmed_N && "flex") || "none",
                      }}
                    >
                      <img src={sms} alt="" />
                      <p> Паспорт матери отправлен нотариусу </p>
                      <img src={check} alt="" />
                      <img
                        src={close}
                        style={{ width: "25px" }}
                        name="passport_mother_confirmed"
                        onClick={(e) => closeN(e)}
                        alt=""
                      />
                    </div>
                  </>
                ) : (
                  <div
                    className=" form_doc_btn"
                    style={{
                      display:
                        (userDoc.passport_mother == null && "none") || "flex",
                    }}
                  >
                    <button
                      name="passport_mother_confirmed"
                      onClick={(e) => handdleorNotarylFile(e)}
                      className="white-btn"
                    >
                      Передать нотариусу
                    </button>
                    <button
                      className="green-btn"
                      name="passport_mother_confirmed"
                      onClick={(e) => handdleorOrginalFile(e)}
                    >
                      Потвердить оригинал
                    </button>
                  </div>
                )}

                {file.marriage_cert_confirmed ? (
                  <>
                    {" "}
                    <div
                      className="form_doc"
                      style={{
                        display:
                          (o.marriage_cert_confirmed_O && "flex") || "none",
                      }}
                    >
                      <img src={pdf} alt="" /> <p>Свид. о браке </p>
                      <img src={check} alt="" />
                      <img
                        src={close}
                        style={{ width: "25px" }}
                        name="marriage_cert_confirmed"
                        onClick={(e) => closeO(e)}
                        alt=""
                      />
                    </div>
                    <div
                      className="form_doc"
                      style={{
                        display:
                          (n.marriage_cert_confirmed_N && "flex") || "none",
                      }}
                    >
                      <img src={sms} alt="" />
                      <p> Свид. о браке отправлен нотариусу </p>
                      <img src={check} alt="" />
                      <img
                        src={close}
                        style={{ width: "25px" }}
                        name="marriage_cert_confirmed"
                        onClick={(e) => closeN(e)}
                        alt=""
                      />
                    </div>
                  </>
                ) : (
                  <div
                    className=" form_doc_btn"
                    style={{
                      display:
                        (userDoc.marriage_cert == null && "none") || "flex",
                    }}
                  >
                    <button
                      name="marriage_cert_confirmed"
                      onClick={(e) => handdleorNotarylFile(e)}
                      className="white-btn"
                    >
                      Передать нотариусу
                    </button>
                    <button
                      className="green-btn"
                      name="marriage_cert_confirmed"
                      onClick={(e) => handdleorOrginalFile(e)}
                    >
                      Потвердить оригинал
                    </button>
                  </div>
                )}

                {file.agreement_doc_confirmed ? (
                  <>
                    {" "}
                    <div
                      className="form_doc"
                      style={{
                        display:
                          (o.agreement_doc_confirmed_O && "flex") || "none",
                      }}
                    >
                      <img src={pdf} alt="" /> <p>Договор с компанией </p>
                      <img src={check} alt="" />
                      <img
                        src={close}
                        style={{ width: "25px" }}
                        name="agreement_doc_confirmed"
                        onClick={(e) => closeO(e)}
                        alt=""
                      />
                    </div>
                    <div
                      className="form_doc"
                      style={{
                        display:
                          (n.agreement_doc_confirmed_N && "flex") || "none",
                      }}
                    >
                      <img src={sms} alt="" />
                      <p> Договор с компанией отправлен нотариусу </p>
                      <img src={check} alt="" />
                      <img
                        src={close}
                        style={{ width: "25px" }}
                        name="agreement_doc_confirmed"
                        onClick={(e) => closeN(e)}
                        alt=""
                      />
                    </div>
                  </>
                ) : (
                  <div
                    className=" form_doc_btn"
                    style={{
                      display:
                        (userDoc.agreement_doc == null && "none") || "flex",
                    }}
                  >
                    <button
                      name="agreement_doc_confirmed"
                      onClick={(e) => handdleorNotarylFile(e)}
                      className="white-btn"
                    >
                      Передать нотариусу
                    </button>
                    <button
                      className="green-btn"
                      name="agreement_doc_confirmed"
                      onClick={(e) => handdleorOrginalFile(e)}
                    >
                      Потвердить оригинал
                    </button>
                  </div>
                )}

                {file.med_063_cert_confirmed ? (
                  <>
                    {" "}
                    <div
                      className="form_doc"
                      style={{
                        display:
                          (o.med_063_cert_confirmed_O && "flex") || "none",
                      }}
                    >
                      <img src={pdf} alt="" /> <p>063 мед. справка </p>
                      <img src={check} alt="" />
                      <img
                        src={close}
                        style={{ width: "25px" }}
                        name="med_063_cert_confirmed"
                        onClick={(e) => closeO(e)}
                        alt=""
                      />
                    </div>
                    <div
                      className="form_doc"
                      style={{
                        display:
                          (n.med_063_cert_confirmed_N && "flex") || "none",
                      }}
                    >
                      <img src={sms} alt="" />
                      <p> 063 мед. справка отправлен нотариусу </p>
                      <img src={check} alt="" />
                      <img
                        src={close}
                        style={{ width: "25px" }}
                        name="med_063_cert_confirmed"
                        onClick={(e) => closeN(e)}
                        alt=""
                      />
                    </div>
                  </>
                ) : (
                  <div
                    className=" form_doc_btn"
                    style={{
                      display:
                        (userDoc.med_063_cert == null && "none") || "flex",
                    }}
                  >
                    <button
                      name="med_063_cert_confirmed"
                      onClick={(e) => handdleorNotarylFile(e)}
                      className="white-btn"
                    >
                      Передать нотариусу
                    </button>
                    <button
                      className="green-btn"
                      name="med_063_cert_confirmed"
                      onClick={(e) => handdleorOrginalFile(e)}
                    >
                      Потвердить оригинал
                    </button>
                  </div>
                )}

                {file.med_086_cert_confirmed ? (
                  <>
                    {" "}
                    <div
                      className="form_doc"
                      style={{
                        display:
                          (o.med_086_cert_confirmed_O && "flex") || "none",
                      }}
                    >
                      <img src={pdf} alt="" /> <p>086 мед. справка </p>
                      <img src={check} alt="" />
                      <img
                        src={close}
                        style={{ width: "25px" }}
                        name="med_086_cert_confirmed"
                        onClick={(e) => closeO(e)}
                        alt=""
                      />
                    </div>
                    <div
                      className="form_doc"
                      style={{
                        display:
                          (n.med_086_cert_confirmed_N && "flex") || "none",
                      }}
                    >
                      <img src={sms} alt="" />
                      <p> 086 мед. справка отправлен нотариусу </p>
                      <img src={check} alt="" />
                      <img
                        src={close}
                        style={{ width: "25px" }}
                        name="med_086_cert_confirmed"
                        onClick={(e) => closeN(e)}
                        alt=""
                      />
                    </div>
                  </>
                ) : (
                  <div
                    className=" form_doc_btn"
                    style={{
                      display:
                        (userDoc.med_086_cert == null && "none") || "flex",
                    }}
                  >
                    <button
                      name="med_086_cert_confirmed"
                      onClick={(e) => handdleorNotarylFile(e)}
                      className="white-btn"
                    >
                      Передать нотариусу
                    </button>
                    <button
                      className="green-btn"
                      name="med_086_cert_confirmed"
                      onClick={(e) => handdleorOrginalFile(e)}
                    >
                      Потвердить оригинал
                    </button>
                  </div>
                )}

                {file.hiv_cert_confirmed ? (
                  <>
                    {" "}
                    <div
                      className="form_doc"
                      style={{
                        display: (o.hiv_cert_confirmed_O && "flex") || "none",
                      }}
                    >
                      <img src={pdf} alt="" /> <p>Справка о ВИЧ </p>
                      <img src={check} alt="" />
                      <img
                        src={close}
                        style={{ width: "25px" }}
                        name="hiv_cert_confirmed"
                        onClick={(e) => closeO(e)}
                        alt=""
                      />
                    </div>
                    <div
                      className="form_doc"
                      style={{
                        display: (n.hiv_cert_confirmed_N && "flex") || "none",
                      }}
                    >
                      <img src={sms} alt="" />
                      <p> Справка о ВИЧ отправлен нотариусу </p>
                      <img src={check} alt="" />
                      <img
                        src={close}
                        style={{ width: "25px" }}
                        name="hiv_cert_confirmed"
                        onClick={(e) => closeN(e)}
                        alt=""
                      />
                    </div>
                  </>
                ) : (
                  <div
                    className=" form_doc_btn"
                    style={{
                      display: (userDoc.hiv_cert == null && "none") || "flex",
                    }}
                  >
                    <button
                      name="hiv_cert_confirmed"
                      onClick={(e) => handdleorNotarylFile(e)}
                      className="white-btn"
                    >
                      Передать нотариусу
                    </button>
                    <button
                      className="green-btn"
                      name="hiv_cert_confirmed"
                      onClick={(e) => handdleorOrginalFile(e)}
                    >
                      Потвердить оригинал
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div style={{display:'flex',width:'90%',justifyContent:'space-around'}} className="form_doc_btns">
              <div className="doc_btn">
                <button onClick={sendNotary}>Отправить университету</button>
              </div>
              <div className="doc_btn">
                <button onClick={sendNotary}>Отправить нотариусу</button>
              </div>
              <div className="doc_btn">
                <button onClick={handleOpen}> добавить новый файл</button>
              </div>
            </div>

            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className="class1"
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <div className="addNewUniverModalUniver talaba_modal">
                  <img onClick={handleClose} src={close_modal} alt="" />
                  <div className="modalContainer">
                    <h5>Добавить новый файл</h5>
                    <div>
                      <label>Название файл</label>
                      <select onChange={(e) => setNewFileName(e.target.value)}>
                        <option value="passport">
                          Сканер с оригинала паспорта
                        </option>
                        <option value="diploma">
                          Сканер диплом или аттестат с приложением
                        </option>
                        <option value="photo">
                          8 шт. фото 3х4, скан с оригинала
                        </option>
                        <option value="passport_mother">
                          Сканер паспорта матери с оригинала, + прописка
                        </option>
                        <option value="marriage_cert">
                          Свидетельсво о браке, если в браке (Не обязательно)
                        </option>
                        <option value="med_063_cert">
                          063 мед. справка, скан с оригинала
                        </option>
                        <option value="med_086_cert">
                          086 мед. справка, скан с оригинала
                        </option>
                        <option value="hiv_cert">Справка о ВИЧ</option>
                        {/* <option name="name">Языковой сертификат</option> */}
                      </select>
                    </div>

                    <div>
                      <div className="import">
                        <p>
                          Drop your files here or a
                          <input
                            onChange={(e) => setNewFile(e.target.files[0])}
                            type="file"
                            id="chFile2"
                            name="images"
                          />
                        </p>
                      </div>
                    </div>

                    <button onClick={(event) => addNewFile(event)}>
                      Добавить
                    </button>
                    <button onClick={handleClose} className="back_btn">
                      <img src={arrow1} alt="" /> Вернуться
                    </button>
                  </div>
                </div>
              </Fade>
            </Modal>
          </div>
        )}
      </Responsive>
    </React.Fragment>
  );
};

export default M_doc_all_send;
const Responsive = styled.div`
  .form_doc_btn {
    display: flex;
    justify-content: space-between;
    align-items: start;
  }
  @media (max-width: 768px) {
   
    .doc_box {
      height: auto;
    }
    .form_doc_btn {
      flex-direction: column;
      align-items: start;
      flex-wrap: wrap;
    }
    .doc_perevodi {
      display: flex;
      flex-direction: column;
      .doc_1 {
        width: 90%;
        display: flex;
        align-items: start;
        
      }
    
    }
  }
  @media (max-width: 576px) {
    .doc_box {
      height: auto;
    }
    .doc_perevodi {
      display: flex;
      flex-direction: column;
      .doc_1 {
        width: 90%;
        display: flex;
        align-items: start;
      }
      .form_doc_btn {
        width: 90%;
        display: flex;
        align-items: start;
        flex-wrap: wrap;
      }
    }
  }
  @media (max-width: 320px) {
    .doc_box {
      height: auto;
    }
    .doc_perevodi {
      display: flex;
      flex-direction: column;
      .doc_1 {
        width: 90%;
        display: flex;
        align-items: start;
        .form_doc_btn{
          flex-direction: column;
        }
      }
      .form_doc_btn {
        width: 90%;
        display: flex;
        align-items: start;
      }
    }
  }
`;
