import React, { useEffect, useState } from "react";
import ManegerSidebar from "../ManagerSidebar";
import userpic from "../../../assets/icon/userpic.svg";
import pdf from "../../../assets/icons/pdf.svg";
import down_doc from "../../../assets/icons/down_doc.svg";
import check from "../../../assets/icons/check.svg";
import folder from "../../../assets/icons/folder.svg";
import sms from "../../../assets/icons/sms.svg";
import DatePicker from "react-datepicker";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Switch from "@material-ui/core/Switch";
import { Link } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import Axios from "../../../utils/axios";
import idea from "../../../assets/icon/idea.svg";
import close from "../../../assets/icon/close2.svg";
import Loader from "react-js-loader";
const M_doc_rec_send = () => {
  const history = useHistory();
  const selector = useSelector((state) => state.payload.payload.data);
  const [loading, setLoading] = useState(true);
  const [openy, setOpeny] = React.useState(false);
  const [userDoc, setUserDoc] = useState();
  const handleOpeny = () => {
    setOpeny(true);
  };
  const handleClosey = () => {
    setOpeny(false);
  };
  const getUserInfo = async () => {
    try {
      const res = await Axios.get(`applicant/${params.id}/`);
      setUserDoc(res.data);
      setLoading((loading) => !loading);
    } catch (error) {}
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  const [addDescription, setAddDescription] = useState("");
  const [openx, setOpenx] = React.useState(false);
  const handleOpenx = () => {
    setOpenx(true);
  };
  const handleClosex = () => {
    setOpenx(false);
  };
  const params = useParams();
  const [users, setUsers] = useState();
  const [userInfo, setUserInfo] = useState();
  const [whereGoFile, setWhereGoFile] = useState(true);
  const next_step = whereGoFile ? "university" : "manager_reject_notary";

  // const getUsersInfo = async () => {
  //   try {
  //     const res = await Axios.get("/applicant/list/");
  //     const datas = res.data.results;
  //     datas?.map((v) => {
  //       if (params.id == v.id) {
  //         setUserInfo((userInfo) => v);
  //         setLoading((loading) => !loading);
  //       }
  //     });
  //   } catch (error) {}
  // };
  const [file, setFile] = useState();
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
  // const [closeButton, setCloseButton] = useState({
  //   passport_confirmed_btn: false,
  //   diploma_confirmed_btn: false,
  //   birth_cert_confirmed_btn: false,
  //   photo_confirmed_btn: false,
  // });
  const handdleorOrginalFile = (e) => {
    const name = e.target.name;
    setFile((state) => ({ ...state, [name]: "notary_translated" }));
    setO((state) => ({ ...state, [`${name}_O`]: true }));
  };
  const handdleorNotarylFile = (e) => {
    const name = e.target.name;
    setFile((state) => ({ ...state, [name]: "need_to_translate" }));
    setN((state) => ({ ...state, [`${name}_N`]: true }));
  };
  const closeButtons = (e) => {
    const name = e.target.name;
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
  const datas1 = { ...file, next_step };
  const datas2 = {
    ...file,
    next_step,
    manager_comment_for_notary: addDescription,
  };
  const sendUniver = async () => {
    try {
      if (whereGoFile) {
        const res = await Axios.patch(
          `/applicant/manager-check-documents/${params.id}/`,
          datas1
        );
      }
    } catch (error) {}
    history.push("/m-docs_rec");
  };
  const sendNotary = async () => {
    try {
      const res = await Axios.patch(
        `/applicant/manager-check-documents/${params.id}/`,
        datas2
      );
    } catch (error) {}
    history.push("/m-docs_rec");
  };
  const getUser = async () => {
    try {
      const res = await Axios.get(
        "applicant/list/?status=manager_checking_notary"
      );
      setUsers(res.data.results);
    } catch (error) {}
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <React.Fragment>
      <ManegerSidebar />
      <div>
        <div className="up_nav n_up">
          <div className="single_h1">
            <h1 className="link_h1">Документы </h1>
            <h3>
              {" > "}
              {userDoc?.first_name.toUpperCase()}
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

        <div className="doc_box">
          {loading ? (
            <Loader
              className="spinner2"
              type="spinner-circle"
              bgColor={"#FFFFFF"}
              color={"#FFFFFF"}
              size={80}
            />
          ) : (
            <div className="doc_perevodi">
              <div className="doc_1">
                <h1>Оригинал документов:</h1>
                <a
                  href={
                    (`${userDoc?.passport_confirmed}` == `original_confirmed` &&
                      `${userDoc?.passport}`) ||
                    `${userDoc?.passport_translate}`
                  }
                  target="_blank"
                  className="form_doc"
                  style={{
                    display: (userDoc?.passport == null && "none") || "flex",
                  }}
                >
                  <img src={pdf} alt="" />
                  <p> Паспорт </p>
                  <img src={down_doc} alt="" />
                </a>
                <a
                  href={
                    (`${userDoc?.diploma_confirmed}` == `original_confirmed` &&
                      `${userDoc?.diploma}`) ||
                    `${userDoc?.diploma_translate}`
                  }
                  target="_blank"
                  className="form_doc"
                  style={{
                    display: (userDoc?.diploma == null && "none") || "flex",
                  }}
                >
                  <img src={pdf} alt="" />
                  <p> Диплом/Аттестат </p>
                  <img src={down_doc} alt="" />
                </a>
                <a
                  href={
                    (`${userDoc?.birth_cert_confirmed}` ==
                      `original_confirmed` &&
                      `${userDoc?.birth_cert}`) ||
                    `${userDoc?.birth_cert_translate}`
                  }
                  target="_blank"
                  className="form_doc"
                  style={{
                    display: (userDoc?.birth_cert == null && "none") || "flex",
                  }}
                >
                  <img src={pdf} alt="" />
                  <p> Свидет. о рождении </p>
                  <img src={down_doc} alt="" />
                </a>
                <a
                  href={
                    (`${userDoc?.photo_confirmed}` == `original_confirmed` &&
                      `${userDoc?.photo}`) ||
                    `${userDoc?.photo_translate}`
                  }
                  className="form_doc"
                  style={{
                    display: (userDoc?.photo == null && "none") || "flex",
                  }}
                  target="_blank"
                >
                  <img src={pdf} alt="" />
                  <p> 3х4 фото 8шт. </p>
                  <img src={down_doc} alt="" />
                </a>
                <a
                  href={
                    (`${userDoc?.passport_mother_confirmed}` ==
                      `original_confirmed` &&
                      `${userDoc?.passport_mother}`) ||
                    `${userDoc?.passport_mother_translate}`
                  }
                  target="_blank"
                  className="form_doc"
                  style={{
                    display:
                      (userDoc?.passport_mother == null && "none") || "flex",
                  }}
                >
                  <img src={pdf} alt="" />
                  <p> Паспорт матери </p>
                  <img src={down_doc} alt="" />
                </a>
                <a
                  href={
                    (`${userDoc?.marriage_cert_confirmed}` ==
                      `original_confirmed` &&
                      `${userDoc?.marriage_cert}`) ||
                    `${userDoc?.marriage_cert_translate}`
                  }
                  target="_blank"
                  className="form_doc"
                  style={{
                    display:
                      (userDoc?.marriage_cert == null && "none") || "flex",
                  }}
                >
                  <img src={pdf} alt="" />
                  <p> Свид. о браке </p>
                  <img src={down_doc} alt="" />
                </a>

                <a
                  href={
                    (`${userDoc?.med_063_cert_confirmed}` ==
                      `original_confirmed` &&
                      `${userDoc?.med_063_cert}`) ||
                    `${userDoc?.med_063_cert_translate}`
                  }
                  target="_blank"
                  className="form_doc"
                  style={{
                    display:
                      (userDoc?.med_063_cert == null && "none") || "flex",
                  }}
                >
                  <img src={pdf} alt="" />
                  <p> 063 мед. справка </p>
                  <img src={down_doc} alt="" />
                </a>
                <a
                  href={
                    (`${userDoc?.med_086_cert_confirmed}` ==
                      `original_confirmed` &&
                      `${userDoc?.med_086_cert}`) ||
                    `${userDoc?.med_086_cert_translate}`
                  }
                  target="_blank"
                  className="form_doc"
                  style={{
                    display:
                      (userDoc?.med_086_cert == null && "none") || "flex",
                  }}
                >
                  <img src={pdf} alt="" />
                  <p> 086 мед. справка </p>
                  <img src={down_doc} alt="" />
                </a>
                <a
                  href={
                    (`${userDoc?.hiv_cert_confirmed}` == `original_confirmed` &&
                      `${userDoc?.hiv_cert}`) ||
                    `${userDoc?.hiv_certt_translate}`
                  }
                  target="_blank"
                  className="form_doc"
                  style={{
                    display: (userDoc?.hiv_cert == null && "none") || "flex",
                  }}
                >
                  <img src={pdf} alt="" />
                  <p> Справка о ВИЧ </p>
                  <img src={down_doc} alt="" />
                </a>
              </div>
              <div className="doc_1">
                <h1>Перевод документов:</h1>
                {/*passport */}
                {userDoc?.passport_confirmed == "original_confirmed" ||
                userDoc?.passport_confirmed == "notary_translated" ||
                file?.passport_confirmed == "notary_translated" ||
                file?.passport_confirmed == "need_to_translate" ? (
                  <>
                    <div
                      className="form_doc"
                      style={{
                        display:
                          userDoc?.passport_confirmed == "original_confirmed" ||
                          userDoc?.passport_confirmed == "notary_translated" ||
                          (file?.passport_confirmed == "notary_translated" &&
                            "flex") ||
                          "none",
                      }}
                    >
                      <img src={pdf} alt="" /> <p> Паспорт </p>
                      <img src={check} alt="" />
                    </div>
                    <div
                      className="form_doc"
                      style={{
                        display:
                          (file?.passport_confirmed == "need_to_translate" &&
                            "flex") ||
                          "none",
                      }}
                    >
                      <img src={sms} alt="" />
                      <p> Паспорт отправлен нотариусу </p>
                      <img src={check} alt="" />
                    </div>
                  </>
                ) : (
                  <div
                    className={`form_doc_btn`}
                    style={{
                      display: (userDoc?.passport == null && "none") || "flex",
                    }}
                  >
                    <button
                      name="passport_confirmed"
                      onClick={(e) => handdleorNotarylFile(e)}
                      className={`white-btn`}
                      style={{
                        color: "red",
                        backgroundColor: "#FDF2F2",
                        padding: "8px",
                        border: "none",
                        outline: "none",
                      }}
                    >
                      Отказать перевод
                    </button>
                    <button
                      className={`green-btn`}
                      name="passport_confirmed"
                      onClick={(e) => handdleorOrginalFile(e)}
                    >
                      Потвердить перевод
                    </button>
                  </div>
                )}
                {/* end passport */}

                {/* diplom */}
                {userDoc?.diploma_confirmed == "original_confirmed" ||
                file?.diploma_confirmed == "notary_translated" ||
                file?.diploma_confirmed == "need_to_translate" ? (
                  <>
                    {" "}
                    <div
                      className="form_doc"
                      style={{
                        display:
                          userDoc?.diploma_confirmed == "original_confirmed" ||
                          (file?.diploma_confirmed == "notary_translated" &&
                            "flex") ||
                          "none",
                      }}
                    >
                      <img src={pdf} alt="" /> <p> Диплом/Аттестат </p>
                      <img src={check} alt="" />
                    </div>
                    <div
                      className="form_doc"
                      style={{
                        display:
                          (file?.diploma_confirmed == "need_to_translate" &&
                            "flex") ||
                          "none",
                      }}
                    >
                      <img src={sms} alt="" />
                      <p> Паспорт отправлен нотариусу </p>
                      <img src={check} alt="" />
                    </div>
                  </>
                ) : (
                  <div
                    className="form_doc form_doc_btn"
                    style={{
                      display:
                        (userDoc?.diploma_translate == null && "none") ||
                        "flex",
                    }}
                  >
                    <button
                      name="diploma_confirmed"
                      onClick={(e) => handdleorNotarylFile(e)}
                      className="m_otkaz"
                      style={{
                        color: "red",
                        backgroundColor: "#FDF2F2",
                        padding: "8px",
                        border: "none",
                        outline: "none",
                      }}
                    >
                      Отказать перевод
                    </button>
                    <button
                      name="diploma_confirmed"
                      onClick={(e) => handdleorOrginalFile(e)}
                      style={{
                        backgroundColor: "#5EC98B",
                        color: "white",
                        padding: "8px",
                        border: "none",
                        outline: "none",
                      }}
                    >
                      Потвердить перевод
                    </button>
                  </div>
                )}

                {userDoc?.photo_confirmed == "original_confirmed" ||
                file?.photo_confirmed == "notary_translated" ||
                file?.photo_confirmed == "need_to_translate" ? (
                  <>
                    {" "}
                    <div
                      className="form_doc"
                      style={{
                        display:
                          userDoc?.photo_confirmed == "original_confirmed" ||
                          (file?.photo_confirmed == "notary_translated" &&
                            "flex") ||
                          "none",
                      }}
                    >
                      <img src={pdf} alt="" /> <p> 3х4 фото 8шт.</p>
                      <img src={check} alt="" />
                    </div>
                    <div
                      className="form_doc"
                      style={{
                        display:
                          (file?.photo_confirmed == "need_to_translate" &&
                            "flex") ||
                          "none",
                      }}
                    >
                      <img src={sms} alt="" />
                      <p> Паспорт отправлен нотариусу </p>
                      <img src={check} alt="" />
                    </div>
                  </>
                ) : (
                  <div
                    className="form_doc form_doc_btn"
                    style={{
                      display:
                        (userDoc?.photo_translate == null && "none") || "flex",
                    }}
                  >
                    <button
                      name="photo_confirmed"
                      onClick={(e) => handdleorNotarylFile(e)}
                      className="m_otkaz"
                      style={{
                        color: "red",
                        backgroundColor: "#FDF2F2",
                        padding: "8px",
                        border: "none",
                        outline: "none",
                      }}
                    >
                      Отказать перевод
                    </button>
                    <button
                      name="photo_confirmed"
                      onClick={(e) => handdleorOrginalFile(e)}
                      style={{
                        backgroundColor: "#5EC98B",
                        color: "white",
                        padding: "8px",
                        border: "none",
                        outline: "none",
                      }}
                    >
                      Потвердить перевод
                    </button>
                  </div>
                )}
                {/* end diplom */}
                {/*  guvohnoma */}
                {userDoc?.birth_cert_confirmed == "original_confirmed" ||
                file?.birth_cert_confirmed == "notary_translated" ||
                file?.birth_cert_confirmed == "need_to_translate" ? (
                  <>
                    {" "}
                    <div
                      className="form_doc"
                      style={{
                        display:
                          userDoc?.birth_cert_confirmed ==
                            "original_confirmed" ||
                          (file?.birth_cert_confirmed == "notary_translated" &&
                            "flex") ||
                          "none",
                      }}
                    >
                      <img src={pdf} alt="" /> <p> Свидет. о рождении </p>
                      <img src={check} alt="" />
                    </div>
                    <div
                      className="form_doc"
                      style={{
                        display:
                          (file?.birth_cert_confirmed == "need_to_translate" &&
                            "flex") ||
                          "none",
                      }}
                    >
                      <img src={sms} alt="" />
                      <p> Свидет. о рождении отправлен нотариусу </p>
                      <img src={check} alt="" />
                    </div>
                  </>
                ) : (
                  <div
                    className="form_doc form_doc_btn"
                    style={{
                      display:
                        (userDoc?.birth_cert_translate == null && "none") ||
                        "flex",
                    }}
                  >
                    <button
                      name="birth_cert_confirmed"
                      onClick={(e) => handdleorNotarylFile(e)}
                      className="m_otkaz"
                      style={{
                        color: "red",
                        backgroundColor: "#FDF2F2",
                        padding: "8px",
                        border: "none",
                        outline: "none",
                      }}
                    >
                      Отказать перевод
                    </button>
                    <button
                      name="birth_cert_confirmed"
                      onClick={(e) => handdleorOrginalFile(e)}
                      style={{
                        backgroundColor: "#5EC98B",
                        color: "white",
                        padding: "8px",
                        border: "none",
                        outline: "none",
                      }}
                    >
                      Потвердить оригинал
                    </button>
                  </div>
                )}
                {/* end guvohnoma */}
                {/* passport_mother_confirmed */}
                {userDoc?.passport_mother_confirmed == "original_confirmed" ||
                file?.passport_mother_confirmed == "notary_translated" ||
                file?.passport_mother_confirmed == "need_to_translate" ? (
                  <>
                    {" "}
                    <div
                      className="form_doc"
                      style={{
                        display:
                          userDoc?.passport_mother_confirmed ==
                            "original_confirmed" ||
                          (file?.passport_mother_confirmed ==
                            "notary_translated" &&
                            "flex") ||
                          "none",
                      }}
                    >
                      <img src={pdf} alt="" /> <p> Паспорт матери </p>
                      <img src={check} alt="" />
                    </div>
                    <div
                      className="form_doc"
                      style={{
                        display:
                          (file?.passport_mother_confirmed ==
                            "need_to_translate" &&
                            "flex") ||
                          "none",
                      }}
                    >
                      <img src={sms} alt="" />
                      <p> Паспорт матери отправлен нотариусу </p>
                      <img src={check} alt="" />
                    </div>
                  </>
                ) : (
                  <div
                    className="form_doc form_doc_btn"
                    style={{
                      display:
                        (userDoc?.passport_mother_translate == null &&
                          "none") ||
                        "flex",
                    }}
                  >
                    <button
                      name="passport_mother_confirmed"
                      onClick={(e) => handdleorNotarylFile(e)}
                      className="m_otkaz"
                      style={{
                        color: "red",
                        backgroundColor: "#FDF2F2",
                        padding: "8px",
                        border: "none",
                        outline: "none",
                      }}
                    >
                      Отказать перевод
                    </button>
                    <button
                      name="passport_mother_confirmed"
                      onClick={(e) => handdleorOrginalFile(e)}
                      style={{
                        backgroundColor: "#5EC98B",
                        color: "white",
                        padding: "8px",
                        border: "none",
                        outline: "none",
                      }}
                    >
                      Потвердить оригинал
                    </button>
                  </div>
                )}
                {/* end passport_mother_confirmed */}

                {userDoc?.marriage_cert_confirmed == "original_confirmed" ||
                file?.marriage_cert_confirmed == "notary_translated" ||
                file?.marriage_cert_confirmed == "need_to_translate" ? (
                  <>
                    {" "}
                    <div
                      className="form_doc"
                      style={{
                        display:
                          userDoc?.marriage_cert_confirmed ==
                            "original_confirmed" ||
                          (file?.marriage_cert_confirmed ==
                            "notary_translated" &&
                            "flex") ||
                          "none",
                      }}
                    >
                      <img src={pdf} alt="" /> <p> Свид. о браке </p>
                      <img src={check} alt="" />
                    </div>{" "}
                    <div
                      className="form_doc"
                      style={{
                        display:
                          (file?.marriage_cert_confirmed ==
                            "need_to_translate" &&
                            "flex") ||
                          "none",
                      }}
                    >
                      <img src={sms} alt="" />
                      <p> Паспорт матери отправлен нотариусу </p>
                      <img src={check} alt="" />
                    </div>
                  </>
                ) : (
                  <div
                    className="form_doc form_doc_btn"
                    style={{
                      display:
                        (userDoc?.marriage_cert_translate == null && "none") ||
                        "flex",
                    }}
                  >
                    <button
                      name="marriage_cert_confirmed"
                      onClick={(e) => handdleorNotarylFile(e)}
                      className="m_otkaz"
                      style={{
                        color: "red",
                        backgroundColor: "#FDF2F2",
                        padding: "8px",
                        border: "none",
                        outline: "none",
                      }}
                    >
                      Отказать перевод
                    </button>
                    <button
                      name="marriage_cert_confirmed"
                      onClick={(e) => handdleorOrginalFile(e)}
                      style={{
                        backgroundColor: "#5EC98B",
                        color: "white",
                        padding: "8px",
                        border: "none",
                        outline: "none",
                      }}
                    >
                      Потвердить оригинал
                    </button>
                  </div>
                )}

                {userDoc?.med_063_cert_confirmed == "original_confirmed" ||
                file?.med_063_cert_confirmed == "notary_translated" ||
                file?.med_063_cert_confirmed == "need_to_translate" ? (
                  <>
                    {" "}
                    <div
                      className="form_doc"
                      style={{
                        display:
                          userDoc?.med_063_cert_confirmed ==
                            "original_confirmed" ||
                          (file?.med_063_cert_confirmed ==
                            "notary_translated" &&
                            "flex") ||
                          "none",
                      }}
                    >
                      <img src={pdf} alt="" /> <p>063 мед. справка </p>
                      <img src={check} alt="" />
                    </div>
                    <div
                      className="form_doc"
                      style={{
                        display:
                          (file?.med_063_cert_confirmed ==
                            "need_to_translate" &&
                            "flex") ||
                          "none",
                      }}
                    >
                      <img src={sms} alt="" />
                      <p> Паспорт матери отправлен нотариусу </p>
                      <img src={check} alt="" />
                    </div>
                  </>
                ) : (
                  <div
                    className="form_doc form_doc_btn"
                    style={{
                      display:
                        (userDoc?.med_063_cert_translate == null && "none") ||
                        "flex",
                    }}
                  >
                    <button
                      name="med_063_cert_confirmed"
                      onClick={(e) => handdleorNotarylFile(e)}
                      className="m_otkaz"
                      style={{
                        color: "red",
                        backgroundColor: "#FDF2F2",
                        padding: "8px",
                        border: "none",
                        outline: "none",
                      }}
                    >
                      Отказать перевод
                    </button>
                    <button
                      name="med_063_cert_confirmed"
                      onClick={(e) => handdleorOrginalFile(e)}
                      style={{
                        backgroundColor: "#5EC98B",
                        color: "white",
                        padding: "8px",
                        border: "none",
                        outline: "none",
                      }}
                    >
                      Потвердить оригинал
                    </button>
                  </div>
                )}
                {userDoc?.med_086_cert_confirmed == "original_confirmed" ||
                file?.med_086_cert_confirmed == "notary_translated" ||
                file?.med_086_cert_confirmed == "need_to_translate" ? (
                  <>
                    <div
                      className="form_doc"
                      style={{
                        display:
                          userDoc?.med_086_cert_confirmed ==
                            "original_confirmed" ||
                          (file?.med_086_cert_confirmed ==
                            "notary_translated" &&
                            "flex") ||
                          "none",
                      }}
                    >
                      <img src={pdf} alt="" /> <p> 086 мед. справка </p>
                      <img src={check} alt="" />
                    </div>
                    <div
                      className="form_doc"
                      style={{
                        display:
                          (file?.med_086_cert_confirmed ==
                            "need_to_translate" &&
                            "flex") ||
                          "none",
                      }}
                    >
                      <img src={sms} alt="" />
                      <p> Паспорт матери отправлен нотариусу </p>
                      <img src={check} alt="" />
                    </div>
                  </>
                ) : (
                  <div
                    className="form_doc form_doc_btn"
                    style={{
                      display:
                        (userDoc?.med_086_cert_translate == null && "none") ||
                        "flex",
                    }}
                  >
                    <button
                      name="med_086_cert_confirmed"
                      onClick={(e) => handdleorNotarylFile(e)}
                      className="m_otkaz btn btn-outline-danger"
                      style={{
                        color: "red",
                        backgroundColor: "#FDF2F2",
                        padding: "8px",
                        border: "none",
                        outline: "none",
                      }}
                    >
                      Отказать перевод
                    </button>
                    <button
                      name="med_086_cert_confirmed"
                      onClick={(e) => handdleorOrginalFile(e)}
                      className="btn btn-success "
                      style={{
                        backgroundColor: "#5EC98B",
                        color: "white",
                        padding: "8px",
                        border: "none",
                        outline: "none",
                      }}
                    >
                      Потвердить оригинал
                    </button>
                  </div>
                )}
                {userDoc?.hiv_cert_confirmed == "original_confirmed" ||
                file?.hiv_cert_confirmed == "notary_translated" ||
                file?.hiv_cert_confirmed == "need_to_translate" ? (
                  <>
                    {" "}
                    <div
                      className="form_doc"
                      style={{
                        display:
                          userDoc?.hiv_cert_confirmed == "original_confirmed" ||
                          (file?.hiv_cert_confirmed == "notary_translated" &&
                            "flex") ||
                          "none",
                      }}
                    >
                      <img src={pdf} alt="" /> <p>Справка о ВИЧ </p>
                      <img src={check} alt="" />
                    </div>
                    <div
                      className="form_doc"
                      style={{
                        display:
                          (file?.hiv_cert_confirmed == "need_to_translate" &&
                            "flex") ||
                          "none",
                      }}
                    >
                      <img src={sms} alt="" />
                      <p> Паспорт матери отправлен нотариусу </p>
                      <img src={check} alt="" />
                    </div>
                  </>
                ) : (
                  <div
                    className="form_doc form_doc_btn"
                    style={{
                      display:
                        (userDoc?.hiv_cert_translate == null && "none") ||
                        "flex",
                    }}
                  >
                    <button
                      name="hiv_cert_confirmed"
                      onClick={(e) => handdleorNotarylFile(e)}
                      className="m_otkaz"
                      style={{
                        color: "red",
                        backgroundColor: "#FDF2F2",
                        padding: "8px",
                        border: "none",
                        outline: "none",
                      }}
                    >
                      Отказать перевод
                    </button>
                    <button
                      name="hiv_cert_confirmed"
                      onClick={(e) => handdleorOrginalFile(e)}
                      style={{
                        backgroundColor: "#5EC98B",
                        color: "white",
                        padding: "8px",
                        border: "none",
                        outline: "none",
                      }}
                    >
                      Потвердить оригинал
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {whereGoFile ? (
            <div className="doc_btn">
              <button onClick={sendUniver}>Отправить университету</button>
            </div>
          ) : (
            <div className="doc_btn">
              <button onClick={handleOpenx}>Отправить нотариусу</button>
            </div>
          )}
        </div>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className="class_modal"
          open={openx}
          onClose={handleClosex}
          closeAfterTransition
          BackdropComponent={Backdrop}
          onChange={(e) => setAddDescription(e.target.value)}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openx}>
            <div className="modal">
              <div className="close_btn">
                <img onClick={handleClosex} src={close} alt="" />
              </div>

              <img src={idea} alt="" />
              <h1>Причина отказа:</h1>
              <input type="text" placeholder="Напишите причину отказа" />
              <div className="modal_btn">
                <button onClick={handleClosex}>Отменить</button>
                <button onClick={sendNotary}>Отправить</button>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default M_doc_rec_send;
