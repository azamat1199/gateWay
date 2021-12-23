import React, { useState, useEffect, useRef } from "react";
import NotariusSidebar from "../NotariusSidebar";
import userpic from "../../../assets/icon/userpic.svg";
import pdf from "../../../assets/icons/pdf.svg";
import down_doc from "../../../assets/icons/down_doc.svg";
import check from "../../../assets/icons/check.svg";
import folder from "../../../assets/icons/folder.svg";
import checked from "../../../assets/icon/checked.svg";
import Axios from "../../../utils/axios";
import Loader from "react-js-loader";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import Swal from "sweetalert2";

const N_doc_single = () => {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const history = useHistory();
  const [data, setData] = useState({
    passport_confirmed: "",
    diploma_confirmed: "",
    birth_cert_confirmed: "",
    photo_confirmed: "",
    hiv_cert_confirmed: "",
    passport_mother_confirmed: "",
    med_063_cert_confirmed: "",
    marriage_cert_confirmed: "",
    med_086_cert_confirmed: "",
  });
  const [applicantDoc, setApplicantDoc] = useState({
    passport: "",
    birth_cert: "",
    diploma: "",
    marriage_cert: "",
    hiv_cert: "",
    hiv_cert: "",
    med_063_cert: "",
    med_086_cert: "",
    passport_mother: "",
    med_086_cert: "",
    photo: "",
    birth_cert_confirmed: "",
    diploma_confirmed: "",
    hiv_cert_confirmed: "",
    marriage_cert_confirmed: "",
    med_063_cert_confirmed: "",
    med_086_cert_confirmed: "",
    passport_confirmed: "",
    passport_mother_confirmed: "",
    photo_confirmed: "",
    first_name: "",
    last_name: "",
  });

  const inputEl1 = useRef(null);
  const inputEl2 = useRef(null);
  const inputEl3 = useRef(null);
  const inputEl4 = useRef(null);
  const inputEl5 = useRef(null);
  const inputEl6 = useRef(null);
  const inputEl7 = useRef(null);
  const inputEl8 = useRef(null);
  const inputEl9 = useRef(null);

  const currentParams = params.id.replace(":", "");
  console.log(params.id.replace(":", ""));

  const handleInputChange = (e) => {
    const { name, files } = e.target;
    setData((state) => ({ ...state, [name]: files[0] }));
  };
  const fetchUserDoc = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(`/applicant/${currentParams}/`);
      const { status, data } = res;
      if (status == 200) {
        setApplicantDoc(data);
      }
      setLoading(false);
      console.log(res);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (inputEl1.current?.files[0]) {
      formData.append("passport_translate", inputEl1.current.files[0]);
    }
    if (inputEl2.current?.files[0]) {
      formData.append("diploma_translate", inputEl2.current.files[0]);
    }
    if (inputEl3.current?.files[0]) {
      formData.append("birth_cert_translate", inputEl3.current.files[0]);
    }
    if (inputEl5.current?.files[0]) {
      formData.append("passport_mother_translate", inputEl5.current.files[0]);
    }
    if (inputEl6.current?.files[0]) {
      formData.append("marriage_cert_translate", inputEl6.current.files[0]);
    }
    if (inputEl7.current?.files[0]) {
      formData.append("med_063_cert_translate", inputEl7.current.files[0]);
    }
    if (inputEl8.current?.files[0]) {
      formData.append("med_086_cert_translate", inputEl8.current.files[0]);
    }
    if (inputEl9.current?.files[0]) {
      formData.append("hiv_cert_translate", inputEl9.current.files[0]);
    }
    console.log(formData);
    setLoading(true);
    try {
      const res = await Axios.patch(`/applicant/${currentParams}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { status } = res;
      if (status == 200) {
        Swal.fire({
          icon: "success",
          text: "Успешно отправлено менеджеру",
        }).then(() => history.push("/n-document"));
      }
      setLoading(false);
      console.log(res);
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "Пожалуйста, попробуйте еще раз",
      });
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserDoc();
  }, []);
  console.log(applicantDoc.passport_confirmed);
  return (
    <React.Fragment>
      <NotariusSidebar />
      <div>
        <div className="up_nav n_up">
          <div className="single_h1">
            <h1 className="link_h1">Документы </h1>{" "}
            <h3>
              {" "}
              {" > "}
              {applicantDoc.first_name} {applicantDoc.last_name}
            </h3>
          </div>
          <div className="user_info">
            <img src={userpic} alt="" />
            <div>
              <h1>Sevara Ibragimova</h1>
              <h2>Нотариус</h2>
            </div>
          </div>
        </div>
        <div className="doc_box">
          <div className="doc_perevodi">
            <div className="doc_1">
              <h1>Оригинал документов:</h1>
              <a
                target="_blank"
                style={
                  applicantDoc.passport_confirmed === "need_to_translate"
                    ? { display: "flex" }
                    : { display: "none" }
                }
                href={applicantDoc.passport}
                download
                className="form_doc"
              >
                <img src={pdf} alt="" />
                <p> Паспорт </p>
                <img src={down_doc} alt="" />
              </a>
              <a
                target="_blank"
                style={
                  applicantDoc.diploma_confirmed === "need_to_translate"
                    ? { display: "flex" }
                    : { display: "none" }
                }
                href={applicantDoc.diploma}
                download
                className="form_doc"
              >
                <img src={pdf} alt="" />
                <p> Диплом/Аттестат </p>
                <img src={down_doc} alt="" />
              </a>
              <a
                target="_blank"
                style={
                  applicantDoc.birth_cert_confirmed === "need_to_translate"
                    ? { display: "flex" }
                    : { display: "none" }
                }
                href={applicantDoc.birth_cert}
                download
                className="form_doc"
              >
                <img src={pdf} alt="" />
                <p> Свидет. о рождении </p>
                <img src={down_doc} alt="" />
              </a>
              <a
                target="_blank"
                style={
                  applicantDoc.photo_confirmed === "need_to_translate"
                    ? { display: "flex" }
                    : { display: "none" }
                }
                href={applicantDoc.photo}
                download
                className="form_doc"
              >
                <img src={pdf} alt="" />
                <p> 3х4 фото 8шт. </p>
                <img src={down_doc} alt="" />
              </a>
              <a
                target="_blank"
                style={
                  applicantDoc.passport_mother_confirmed === "need_to_translate"
                    ? { display: "flex" }
                    : { display: "none" }
                }
                href={applicantDoc.passport_mother}
                download
                className="form_doc"
              >
                <img src={pdf} alt="" />
                <p> Паспорт матери </p>
                <img src={down_doc} alt="" />
              </a>
              <a
                target="_blank"
                style={
                  applicantDoc.marriage_cert_confirmed === "need_to_translate"
                    ? { display: "flex" }
                    : { display: "none" }
                }
                href={applicantDoc.marriage_cert}
                download
                className="form_doc"
              >
                <img src={pdf} alt="" />
                <p> Свид. о браке </p>
                <img src={down_doc} alt="" />
              </a>
              <a
                target="_blank"
                style={
                  applicantDoc.med_063_cert_confirmed === "need_to_translate"
                    ? { display: "flex" }
                    : { display: "none" }
                }
                href={applicantDoc.med_063_cert}
                download
                className="form_doc"
              >
                <img src={pdf} alt="" />
                <p> 063 мед. справка </p>
                <img src={down_doc} alt="" />
              </a>
              <a
                target="_blank"
                style={
                  applicantDoc.med_086_cert_confirmed === "need_to_translate"
                    ? { display: "flex" }
                    : { display: "none" }
                }
                href={applicantDoc.med_086_cert}
                download
                className="form_doc"
              >
                <img src={pdf} alt="" />
                <p> 086 мед. справка </p>
                <img src={down_doc} alt="" />
              </a>
              <a
                target="_blank"
                style={
                  applicantDoc.hiv_cert_confirmed === "need_to_translate"
                    ? { display: "flex" }
                    : { display: "none" }
                }
                href={applicantDoc.hiv_cert}
                download
                className="form_doc"
              >
                <img src={pdf} alt="" />
                <p> Справка о ВИЧ </p>
                <img src={down_doc} alt="" />
              </a>
            </div>
            <div className="doc_1">
              <h1>Перевод документов:</h1>
              {applicantDoc.passport_confirmed === "need_to_translate" ? (
                <>
                  <label htmlFor="drop2" className="form_down">
                    <img src={folder} alt="" />
                    <input
                      ref={inputEl1}
                      onChange={handleInputChange}
                      type="file"
                      name="passport_confirmed"
                      id="drop2"
                    />
                    <p>
                      Drop your files here or <span>choose file</span>
                    </p>
                    <p className="checkIcon">
                      {data.passport_confirmed ? (
                        <img
                          style={{ height: "20px" }}
                          src={checked}
                          alt="success"
                        />
                      ) : (
                        ""
                      )}
                    </p>
                  </label>
                </>
              ) : (
                ""
              )}
              {applicantDoc.diploma_confirmed === "need_to_translate" ? (
                <label htmlFor="drop1" className="form_down">
                  <img src={folder} alt="" />
                  <input
                    ref={inputEl2}
                    type="file"
                    onChange={handleInputChange}
                    name="diploma_confirmed"
                    id="drop1"
                  />
                  <p>
                    Drop your files here or <span>choose file</span>
                  </p>
                  <p className="checkIcon">
                    {data.diploma_confirmed ? (
                      <img
                        style={{ height: "20px" }}
                        src={checked}
                        alt="success"
                      />
                    ) : (
                      ""
                    )}
                  </p>
                </label>
              ) : (
                ""
              )}
              {applicantDoc.birth_cert_confirmed === "need_to_translate" ? (
                <label htmlFor="drop3" className="form_down">
                  <img src={folder} alt="" />
                  <input
                    ref={inputEl3}
                    type="file"
                    onChange={handleInputChange}
                    name="birth_cert_confirmed"
                    id="drop3"
                  />
                  <p>
                    Drop your files here or <span>choose file</span>
                  </p>
                  <p className="checkIcon">
                    {data.birth_cert_confirmed ? (
                      <img
                        style={{ height: "20px" }}
                        src={checked}
                        alt="success"
                      />
                    ) : (
                      ""
                    )}
                  </p>
                </label>
              ) : (
                ""
              )}
              {applicantDoc.photo_confirmed === "need_to_translate" ? (
                <label htmlFor="drop4" className="form_down">
                  <img src={folder} alt="" />
                  <input
                    ref={inputEl4}
                    type="file"
                    onChange={handleInputChange}
                    name="photo_confirmed"
                    id="drop4"
                  />
                  <p>
                    Drop your files here or <span>choose file</span>
                  </p>
                  <p className="checkIcon">
                    {data.photo_confirmed ? (
                      <img
                        style={{ height: "20px" }}
                        src={checked}
                        alt="success"
                      />
                    ) : (
                      ""
                    )}
                  </p>
                </label>
              ) : (
                ""
              )}
              {applicantDoc.passport_mother_confirmed ===
              "need_to_translate" ? (
                <label htmlFor="drop5" className="form_down">
                  <img src={folder} alt="" />
                  <input
                    ref={inputEl5}
                    type="file"
                    onChange={handleInputChange}
                    name="passport_mother_confirmed"
                    id="drop5"
                  />
                  <p>
                    Drop your files here or <span>choose file</span>
                  </p>
                  <p className="checkIcon">
                    {data.passport_mother_confirmed ? (
                      <img
                        style={{ height: "20px" }}
                        src={checked}
                        alt="success"
                      />
                    ) : (
                      ""
                    )}
                  </p>
                </label>
              ) : (
                ""
              )}
              {applicantDoc.marriage_cert_confirmed === "need_to_translate" ? (
                <label htmlFor="drop6" className="form_down">
                  <img src={folder} alt="" />
                  <input
                    ref={inputEl6}
                    type="file"
                    onChange={handleInputChange}
                    name="marriage_cert_confirmed"
                    id="drop6"
                  />
                  <p>
                    Drop your files here or <span>choose file</span>
                  </p>
                  <p className="checkIcon">
                    {data.marriage_cert_confirmed ? (
                      <img
                        style={{ height: "20px" }}
                        src={checked}
                        alt="success"
                      />
                    ) : (
                      ""
                    )}
                  </p>
                </label>
              ) : (
                ""
              )}
              {applicantDoc.med_063_cert_confirmed === "need_to_translate" ? (
                <label htmlFor="drop7" className="form_down">
                  <img src={folder} alt="" />
                  <input
                    ref={inputEl7}
                    type="file"
                    onChange={handleInputChange}
                    name="med_063_cert_confirmed"
                    id="drop7"
                  />
                  <p>
                    Drop your files here or <span>choose file</span>
                  </p>
                  <p className="checkIcon">
                    {data.med_063_cert_confirmed ? (
                      <img
                        style={{ height: "20px" }}
                        src={checked}
                        alt="success"
                      />
                    ) : (
                      ""
                    )}
                  </p>
                </label>
              ) : (
                ""
              )}
              {applicantDoc.med_086_cert_confirmed === "need_to_translate" ? (
                <label htmlFor="drop8" className="form_down">
                  <img src={folder} alt="" />
                  <input
                    ref={inputEl8}
                    type="file"
                    onChange={handleInputChange}
                    name="med_086_cert_confirmed"
                    id="drop8"
                  />
                  <p>
                    Drop your files here or <span>choose file</span>
                  </p>
                  <p className="checkIcon">
                    {data.med_086_cert_confirmed ? (
                      <img
                        style={{ height: "20px" }}
                        src={checked}
                        alt="success"
                      />
                    ) : (
                      ""
                    )}
                  </p>
                </label>
              ) : (
                ""
              )}
              {applicantDoc.hiv_cert_confirmed === "need_to_translate" ? (
                <label htmlFor="drop9" className="form_down">
                  <img src={folder} alt="" />
                  <input
                    ref={inputEl9}
                    type="file"
                    onChange={handleInputChange}
                    name="hiv_cert_confirmed"
                    id="drop9"
                  />
                  <p>
                    Drop your files here or <span>choose file</span>
                  </p>
                  <p className="checkIcon">
                    {data.hiv_cert_confirmed ? (
                      <img
                        style={{ height: "20px" }}
                        src={checked}
                        alt="success"
                      />
                    ) : (
                      ""
                    )}
                  </p>
                </label>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="doc_btn">
            <button onClick={submitHandler}>
              {" "}
              {loading ? (
                <Loader
                  type="spinner-circle"
                  bgColor={"#fff"}
                  color={"#fff"}
                  size={70}
                />
              ) : (
                " Отправить менеджеру "
              )}{" "}
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default N_doc_single;
