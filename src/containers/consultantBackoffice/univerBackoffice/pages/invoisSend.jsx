import React, { useEffect, useState } from "react";
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

//import img
import img from "../../../../assets/icon/img.svg";
import download from "../../../../assets/icon/download.svg";
import yes from "../../../../assets/icon/yes.svg";
import down_doc from "../../../../assets/icons/down_doc.svg";
import check from "../../../../assets/icons/check.svg";
import pdf from "../../../../assets/icons/pdf.svg";
import { useParams } from "react-router";
import idea from "../../../../assets/icon/idea.svg";
import warning from "../../../../assets/icon/warning.svg";
import close from "../../../../assets/icon/close2.svg";
import filter from "../../../../assets/icon/Filter.svg";
import excel from "../../../../assets/icon/excel.svg";
import search from "../../../../assets/icon/Search2.svg";

import no from "../../../../assets/icon/no.svg";
import userpic from "../../../../assets/icon/userpic.svg";

//import css
import "../../../../style/css/singlepage.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import Axios from "../../../../utils/axios";
import UniversitetBackoffice from "../universitetBackoffice";
function Singlepage() {
  const params = useParams();
  const selector = useSelector((state) => state.payload.payload.data);
  const [userInfo, setUserInfo] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [addDescription, setAddDescription] = useState("");
  const [filters, setfilters] = useState(false);
  const history = useHistory();
  const [key, setkey] = React.useState("");
  const [users, setUsers] = useState();
  function handleChange(event) {
    setkey(event.target.value);
  }
  const [openy, setOpeny] = React.useState(false);
  const handleOpeny = () => {
    setOpeny(true);
  };
  const handleClosey = () => {
    setOpeny(false);
  };

  const [openx, setOpenx] = React.useState(false);
  const handleOpenx = () => {
    setOpenx(true);
  };
  const handleClosex = () => {
    setOpenx(false);
  };
  const datas1 = { next_step: "completed", id: params.id };
  const datas2 = {
    next_step: "cancelled",
    university_rejection_comment: addDescription,
    id: params.id,
  };
  const sendTrue = async () => {
    try {
      const res = await Axios.patch(
        `/applicant/university-check-documents/${params.id}/`,
        datas1
      );
    } catch (error) {}
    handleClosey();
    history.push("/studentsss");
  };
  const sendFalse = async () => {
    try {
      const res = await Axios.patch(
        `/applicant/university-check-documents/${params.id}/`,
        datas2
      );
    } catch (error) {}
    handleClosex();
    history.push("/studentsss");
  };

  const getUserInfo = async () => {
    try {
      const res = await Axios.get(`/applicant/${params.id}`);
      setUserInfo((userInfo) => res.data);
    } catch (error) {}
  };
  useEffect((v) => {
    getUserInfo();
  }, []);
  const nowDate = new Date();
  const yearNow = nowDate.getFullYear();
=======
import check from "../../../../assets/icon/check1.svg";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Axios from "../../../../utils/axios";
//import css
import "react-datepicker/dist/react-datepicker.css";
// import "../../../../style/css/invois.css";
//import img
import filterImg from "../../../../assets/icon/Filter.svg";
import excel from "../../../../assets/icon/excel.svg";
import search from "../../../../assets/icon/Search2.svg";
import Message from "../../../../assets/icon/Message2.svg";
import userpic from "../../../../assets/icon/userpic.svg";
import close from "../../../../assets/icon/close.svg";
import UniversitetBackoffice from "../universitetBackoffice";
import { useSelector } from "react-redux";
import InvoisModal from "./invoisModal";
import Loader from "react-js-loader";
import { Pagination } from "@material-ui/lab";
import TablePagination from "@material-ui/core/TablePagination";
const data_table = require("../json/data_table.json");

const Invoys = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState();
  const [userDataList, setUserDataList] = useState([]);

  const [filters, setfilters] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [images, setImages] = useState();
  const [openImgUniver, setOpenImgUniver] = React.useState(false);
  const [key, setkey] = React.useState("");
  const [icon, setIcon] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function handleChange(event) {
    setkey(event.target.value);
  }

  const getUserInfo = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(
        "applicant/list/confirmed/?invoice_status=false"
      );
      const { status, data } = res;
      const { results } = data;
      if (status === 200) {
        setUserDataList(results);
      }
    } catch (error) {
      
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  const filterApplicants = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `/applicant/list/confirmed/?date-from=${
          startDate ? startDate.toLocaleDateString() : ""
        }&date-to=${
          endDate ? endDate.toLocaleDateString() : ""
        }&payment-status=${filter ? filter.filter : ""}&search=${
          searchName ? searchName : " "
        }`
      );
      
      const { data, status } = res;
      const { results } = data;
      if (status == 200) {
        setUserDataList(results);
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      
      setLoading(false);
    }
  };

  const selector = useSelector((state) => state.payload.payload.data);
  const pnChange = (e) => {
    const { name } = e.target;
    setIsShow((state) => ({ ...state, [name]: true }));
  };

  useEffect(() => {
    filterApplicants();
  }, [searchName]);

  return (
    <UniversitetBackoffice>
      <div className="up_nav">
        <div>

          <h1 className="link_h1">
            Абитуриенты<span> {">"} Информация</span>
          </h1>
        </div>
        <div className="user_info">
          <img src={userpic} alt="" />
          <div style={{ marginRight: "150px" }}>
            <h1>{selector.name} </h1>
            <h2>
              {selector.city.name}, {selector.city.country.name}
            </h2>
          </div>
        </div>
      </div>
      <div className="singlepage">
        <div className="single_up">
          <div>
            <div className="single_1">
              <img src={img} alt="" />
            </div>
            <div className="single_2" style={{ marginRight: "150px" }}>
              <h1>
                {userInfo?.first_name} {userInfo?.last_name}
              </h1>
              <h2>
                {yearNow - userInfo?.birthday?.slice(0, 4)} лет,{" "}
                {userInfo?.address}, Узбекистан
              </h2>
            </div>
          </div>
          <div>
            <a href="#">
              <img src={download} alt="" />
              Скачать PDF
            </a>
          </div>
        </div>

        <div className="single_down" style={{ marginRight: "150px" }}>
          <h1>Ваши данные</h1>
          <div className="single_info">
            <div className="info_1">
              <div style={{ marginRight: "150px" }}>
                <h1>Имя</h1>
              </div>
              <div>
                <p>{userInfo?.first_name}</p>
              </div>
            </div>
            <div className="info_1">
              <div style={{ marginRight: "150px" }}>
                <h1>Фамилия</h1>
              </div>
              <div>
                <p>{userInfo?.last_name}</p>
              </div>
            </div>
            <div className="info_1">
              <div style={{ marginRight: "150px" }}>
                <h1>Отчество</h1>
              </div>
              <div>
                <p>{userInfo?.middle_name}</p>
              </div>
            </div>
            <div className="info_1">
              <div style={{ marginRight: "150px" }}>
                <h1>Специальность</h1>
              </div>
              <div>
                <p>{userInfo?.achievements}</p>
              </div>
            </div>
            <div
              className="info_1 info_a"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ marginRight: "150px" }}>
                <h1>Passport</h1>
              </div>
              <div
                style={{
                  display: (userInfo?.passport == null && "none") || "flex",

                  alignItems: "center",
                }}
              >
                <a
                  href={
                    (`${userInfo?.passport_confirmed}` == "notary_translated" &&
                      `${userInfo?.passport_translate}`) ||
                    `${userInfo?.passport}`
                  }
                  className="form_doc"
                  target="_blank"
                >
                  <img src={pdf} alt="" />
                  <p> Passport </p>
                  <img src={down_doc} alt="" />
                </a>
              </div>
            </div>
            <div
              className="info_1 info_a"
              style={{
                display: (userInfo?.diploma == null && "none") || "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ marginRight: "150px" }}>
                <h1>Диплом/Аттестат</h1>
              </div>
              <div>
                <a
                  href={
                    (`${userInfo?.diploma_confirmed}` == "notary_translated" &&
                      `${userInfo?.diploma_translate}`) ||
                    `${userInfo?.diploma}`
                  }
                  className="form_doc"
                  target="_blank"
                >
                  <img src={pdf} alt="" />
                  <p> Диплом/Аттестат </p>
                  <img src={down_doc} alt="" />
                </a>
              </div>
            </div>
            <div
              className="info_1 info_a"
              style={{
                display: (userInfo?.birth_cert == null && "none") || "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ marginRight: "150px" }}>
                <h1>Свидет. о рождении</h1>
              </div>
              <div>
                <a
                  href={
                    (`${userInfo?.birth_cert_confirmed}` ==
                      "notary_translated" &&
                      `${userInfo?.birth_cert_translate}`) ||
                    `${userInfo?.birth_cert}`
                  }
                  className="form_doc"
                  target="_blank"
                >
                  <img src={pdf} alt="" />
                  <p> Свидет. о рождении </p>
                  <img src={down_doc} alt="" />
                </a>
              </div>
            </div>
            <div
              className="info_1 info_a"
              style={{
                display: (userInfo?.photo == null && "none") || "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ marginRight: "150px" }}>
                <h1>3х4 фото 8шт.</h1>
              </div>
              <div>
                <a
                  href={
                    (`${userInfo?.photo_confirmed}` == "notary_translated" &&
                      `${userInfo?.photo_translate}`) ||
                    `${userInfo?.photo}`
                  }
                  className="form_doc"
                  target="_blank"
                >
                  <img src={pdf} alt="" />
                  <p>3х4 фото 8шт. </p>
                  <img src={down_doc} alt="" />
                </a>
              </div>
            </div>
            <div
              className="info_1 info_a"
              style={{
                display:
                  (userInfo?.passport_mother == null && "none") || "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ marginRight: "150px" }}>
                <h1>Паспорт матери</h1>
              </div>
              <div>
                <a
                  href={
                    (`${userInfo?.passport_mother_confirmed}` ==
                      "notary_translated" &&
                      `${userInfo?.passport_mother_translate}`) ||
                    `${userInfo?.passport}`
                  }
                  className="form_doc"
                  target="_blank"
                >
                  <img src={pdf} alt="" />
                  <p> Паспорт матери </p>
                  <img src={down_doc} alt="" />
                </a>
              </div>
            </div>
            <div
              className="info_1 info_a"
              style={{
                display: (userInfo?.marriage_cert == null && "none") || "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ marginRight: "150px" }}>
                <h1>Свид. о браке</h1>
              </div>
              <div>
                <a
                  href={
                    (`${userInfo?.marriage_cert_confirmed}` ==
                      "notary_translated" &&
                      `${userInfo?.marriage_cert_translate}`) ||
                    `${userInfo?.marriage_cert}`
                  }
                  className="form_doc"
                  target="_blank"
                >
                  <img src={pdf} alt="" />
                  <p> Свид. о браке </p>
                  <img src={down_doc} alt="" />
                </a>
              </div>
            </div>
            <div
              className="info_1 info_a"
              style={{
                display: (userInfo?.med_063_cert == null && "none") || "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ marginRight: "150px" }}>
                <h1>063 мед. справка</h1>
              </div>
              <div>
                <a
                  href={
                    (`${userInfo?.med_063_cert_confirmed}` ==
                      "notary_translated" &&
                      `${userInfo?.med_063_cert_translate}`) ||
                    `${userInfo?.med_063_cert}`
                  }
                  className="form_doc"
                  target="_blank"
                >
                  <img src={pdf} alt="" />
                  <p> 063 мед. справка </p>
                  <img src={down_doc} alt="" />
                </a>
              </div>
            </div>
            <div
              className="info_1 info_a"
              style={{
                display: (userInfo?.med_086_cert == null && "none") || "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ marginRight: "150px" }}>
                <h1>086 мед. справка</h1>
              </div>
              <div>
                <a
                  href={
                    (`${userInfo?.med_086_cert_confirmed}` ==
                      "notary_translated" &&
                      `${userInfo?.med_086_cert_translate}`) ||
                    `${userInfo?.med_086_cert}`
                  }
                  className="form_doc"
                  target="_blank"
                >
                  <img src={pdf} alt="" />
                  <p> 086 мед. справка </p>
                  <img src={down_doc} alt="" />
                </a>
              </div>
            </div>
            <div
              className="info_1 info_a"
              style={{
                display: (userInfo?.hiv_cert == null && "none") || "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ marginRight: "150px" }}>
                <h1>Справка о ВИЧ</h1>
              </div>
              <div
                style={{
                  display: (userInfo?.hiv_cert == null && "none") || "flex",

                  alignItems: "center",
                }}
              >
                <a
                  href={
                    (`${userInfo?.hiv_cert_confirmed}` == "notary_translated" &&
                      `${userInfo?.hiv_cert_translate}`) ||
                    `${userInfo?.hiv_cert}`
                  }
                  className="form_doc"
                  target="_blank"
                >
                  <img src={pdf} alt="" />
                  <p> Справка о ВИЧ </p>
                  <img src={down_doc} alt="" />
                </a>
              </div>
            </div>
          </div>
          <div className="info_btn">
            <button onClick={handleOpenx}>
              <img src={no} alt="" />
              Отклонить
            </button>
            <button>
              <img src={yes} onClick={handleOpeny} alt="" />
              Принять
            </button>
          </div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className="class_modal"
            open={openy}
            onClose={handleClosey}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
            onChange={(e) => setAddDescription(e.target.value)}
          >
            <Fade in={openy}>
              <div className="modal">
                <div className="close_btn" onClick={handleClosey}>
                  <img src={close} alt="" />
                </div>

                <img src={warning} alt="" />
                <h1>
                  Вы действительно хотите принять
                  <span>
                    {userInfo?.first_name} {userInfo?.last_name}
                  </span>
                  на учебу?
                </h1>
                <div className="modal_btn">
                  <button onClick={handleClosey}>Отменить</button>
                  <button onClick={sendTrue}>Принять</button>
                </div>
              </div>
            </Fade>
          </Modal>

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
                  <button onClick={sendFalse}>Отправить</button>
                </div>
              </div>
            </Fade>
          </Modal>
        </div>
      </div>
    </UniversitetBackoffice>
  );
}

export default Singlepage;

          <h4 className="link_h1">Инвойсы {`>`} Отправленные</h4>
        </div>
        <div className="user_info">
          <img src={userpic} alt="" />
          <div>
            <h5>{selector.name}</h5>
            <p>
              {selector.city.name}, {selector.city.country.name}
            </p>
            </div>
        </div>
      </div>
      <div className="invoys">
        <div className="ab_1">
          <div className="excel table_excel_btn">
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="download-table-xls-button"
              table="table_excel"
              filename="tablexls"
              sheet="tablexls"
              buttonText="Excel"
            />
          </div>
          <div className="search">
            <div className="input">
              <button>
                <img src={search} alt="asdasd" />
              </button>
              <input
                type="text"
                placeholder="Поиск Студенты"
                onChange={(e) => setSearchName(e.target.value)}
              />
            </div>
            <div className="filtr_btn">
              <button
                onClick={() => {
                  setfilters(!filters);
                }}
              >
                <img src={filterImg} alt="" />
              </button>
            </div>
          </div>
          <div className="table">
            <div className="table_up">
              <div>
                <h1>Список абитуриентов</h1>
              </div>
              <div>
                <select name="" id="">
                  <option value="">Показать все</option>
                  <option value="">lorem 1</option>
                  <option value="">lorem 2</option>
                </select>
              </div>
            </div>

            <table id="table_excel">
              <thead>
                <th>ФИО</th>
                <th>Факультет</th>
                <th>Степень</th>
                <th>Тип обученияе</th>
                <th>Контракт</th>
                <th>Инвойс</th>
                <th>Менеджер </th>
                <th>Телефон менеджера</th>
                <th>Дата </th>
              </thead>
              <tbody>
                {loading ? (
                  <Loader
                    type="spinner-circle"
                    bgColor={"#FFFFFF"}
                    color={"#FFFFFF"}
                    size={80}
                  />
                ) : (
                  userDataList
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((data) => {
                      return (
                        <tr>
                          <th style={{ textAlign: "left" }}>
                            {data.full_name}
                          </th>
                          <th>{data?.faculty}</th>
                          <th>{data?.degree}</th>
                          {/* <th>{data?.manager}</th> */}
                          <th>
                            {(`${data?.type_education}` == "full_time" &&
                              "Очный") ||
                              "Заочный"}
                          </th>
                          <th
                            style={{
                              color:
                                (data?.university_invoice_confirmed &&
                                  "green") ||
                                "red",
                            }}
                          >
                            $ {data?.education_fee}
                          </th>
                          {/* <th>
                          <img src={Message} name={`name${data?.id}`} onClick={(e)=>pnChange(e)} alt="" />
                           {isShow[`name${data?.id}`]? <InvoisModal onClose={()=>setIsShow(false)} id={data?.id} show={isShow} />:null}
                      </th> */}
                          <th>
                            <img
                              src={check}
                              alt=""
                              style={{
                                width: "25px",
                              }}
                            />
                          </th>

                          <th>
                            {data?.manager?.first_name}{" "}
                            {data?.manager?.last_name}
                          </th>
                          <th>{data?.manager?.phone_number}</th>
                        </tr>
                      );
                    })
                )}
              </tbody>
            </table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15, 20, 30]}
              component="table"
              count={userDataList?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
        {/* // ! */}
        <div
          className="abitFilBox"
          style={
            filters
              ? { width: "100%" }
              : { width: "0", transition: "0.5s step-end" }
          }
        >
          <div className="abitFilCl" onClick={() => setfilters(!filters)}></div>
          <div
            className="ab_2"
            style={
              filters
                ? { transform: "translateX(0)", transition: "0.5s" }
                : { transform: "translateX(100%)", transition: "0.5s" }
            }
          >
            <button
              onClick={() => {
                setfilters(!filters);
              }}
              className="ab_2_close"
            >
              <img src={close} alt="" />
            </button>
            <h1>Фильтры</h1>
            <div className="form_ab">
              <h2>Выберите период</h2>
              <div className="form_div">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  dateFormat="dd MMM yyyy"
                  placeholderText="От"
                />
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  dateFormat="dd MMM yyyy"
                  minDate={startDate}
                  placeholderText="До"
                />
              </div>
            </div>
            {/* <div className="form_ab">
              <h2>Выберите семестр</h2>
              <div className="form_div">
                <select name="" id="">
                  <option value="">Весенний</option>
                  <option value="">Летний</option>
                  <option value="">Осенний</option>
                  <option value="">Зимний</option>
                </select>
              </div>
            </div> */}
            {/* <div className="form_ab">
              <FormControl component="fieldset">
                <FormGroup aria-label="position" className="ab_check" row>
                  <FormControlLabel
                    value="Поступившие"
                    control={<Checkbox color="primary" />}
                    label="Поступившие"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="Непоступившие"
                    control={<Checkbox color="primary" />}
                    label="Непоступившие"
                    labelPlacement="end"
                  />
                </FormGroup>
              </FormControl>
            </div>
            <div className="form_ab">
              <FormControl component="fieldset" className="ab_switch">
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value="show"
                    control={<Switch color="primary" />}
                    label="Показать консультанта"
                    labelPlacement="start"
                  />
                </FormGroup>
              </FormControl>
            </div> */}
            <div className="form_ab">
              <button
                className="form_button"
                // onClick={() => {
                //   setfilters(!filters);
                // }}
                onClick={filterApplicants}
              >
                Применить
              </button>
            </div>
          </div>
        </div>
        {/* // ! */}
      </div>
    </UniversitetBackoffice>
  );
};

export default Invoys;

