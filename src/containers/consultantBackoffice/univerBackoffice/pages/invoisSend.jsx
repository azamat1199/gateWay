import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Switch from "@material-ui/core/Switch";
import { Link } from "react-router-dom";
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
