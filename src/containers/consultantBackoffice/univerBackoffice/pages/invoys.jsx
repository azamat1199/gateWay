import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Loader from "react-js-loader";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { FormLabel } from "@material-ui/core";

import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import Switch from "@material-ui/core/Switch";
import { Link } from "react-router-dom";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Axios from "../../../../utils/axios";
//import css
import check from "../../../../assets/icon/check1.svg";
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
import { Pagination } from "@material-ui/lab";
import TablePagination from "@material-ui/core/TablePagination";
const data_table = require("../json/data_table.json");

const Invoys = () => {
  const [endDate, setEndDate] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [filter, setFilter] = useState("");
  const [radioFilter, setRadioFilter] = useState("");

  const [students, setStudents] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [loading, setLoading] = useState();

  const [filters, setfilters] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [images, setImages] = useState();
  const [openImgUniver, setOpenImgUniver] = React.useState(false);
  const [key, setkey] = React.useState("");
  const [userDataList, setUserDataList] = useState([]);
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

  const handleFilter = (e) => {
    const { name, value } = e.target;
    setRadioFilter({ [name]: value });
  };

  const getUserInfo = async () => {
    setLoading(true);
    try {
      const res = await Axios.get("applicant/list/confirmed/");
      const { status, data } = res;
      const { results } = data;
      if (status === 200) {
        setUserDataList(results);
      }
    } catch (error) {}
  };

  const filterApplicants = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `/applicant/list/confirmed/?date-from=${
          startDate ? startDate.toLocaleDateString() : ""
        }&date-to=${endDate ? endDate.toLocaleDateString() : ""}&invoice_send=${
          radioFilter.filter
        }&search=${searchName ? searchName : " "}`
      );

      const { data, status } = res;
      const { results } = data;
      if (status == 200) {
        setUserDataList(results);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    filterApplicants();
  }, [searchName]);

  const selector = useSelector((state) => state?.payload?.payload.data);
  const pnChange = (e) => {
    const { name } = e.target;
    setIsShow((state) => ({ ...state, [name]: true }));
  };

  return (
    <UniversitetBackoffice>
      <div className="up_nav">
        <div>
          <h4 className="link_h1">Инвойсы {`>`} Все</h4>
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
                <img src={search} alt="" />
              </button>
              <input
                type="text"
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Поиск Студенты"
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
            </div>

            <table id="table_excel">
              <thead>
                <th>ФИО</th>
                <th>Факультет</th>
                <th>Степень</th>
                <th>Тип обученияе</th>
                <th>Менеджер </th>
                <th>Телефон менеджера</th>
                <th>Контракт</th>
                <th>Инвойс</th>
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
                            {data?.manager?.first_name}
                            {data?.manager?.last_name}
                          </th>
                          <th>
                            {(`${data?.type_education}` == "full_time" &&
                              "Очный") ||
                              "Заочный"}
                          </th>
                          <th>{data?.manager?.phone_number}</th>

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
                          {data?.university_invoice_upload == null ? (
                            <th>
                              <img
                                src={Message}
                                name={`name${data?.id}`}
                                onClick={(e) => pnChange(e)}
                                alt=""
                              />
                              {isShow[`name${data?.id}`] ? (
                                <InvoisModal
                                  onClose={() => setIsShow(false)}
                                  id={data?.id}
                                  show={isShow}
                                />
                              ) : null}
                            </th>
                          ) : (
                            <th>
                              <img
                                src={check}
                                alt=""
                                style={{
                                  width: "25px",
                                }}
                              />
                            </th>
                          )}
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
                  views={["year", "month", "day"]}
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
              <div className="radio-true">
                {/* <FormControl component="fieldset">
                    <FormLabel component="legend">Status</FormLabel>

                    <RadioGroup
                      aria-label="gender"
                      name="gender1"
                      value={value}
                      onChange={(e) => handleFilter(e)}
                      // onChange={handleChange}
                    >
                      <FormControlLabel
                        value="true"
                        control={<Radio color="primary" />}
                        label="Инвойс отправлен"
                      />
                      <FormControlLabel
                        value="false"
                        control={<Radio color="primary" />}
                        label="Инвойс не отправлен"
                      />
                    </RadioGroup>
                  </FormControl> */}
                {/* <div className="form_ab">
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Status</FormLabel>
                      <RadioGroup
                        aria-label="gender"
                        name="gender1"
                        value={radioFilter}
                        // onChange={handleChange}
                        onChange={(e) => handleFilter(e)}
                      >
                        <FormControlLabel
                          value="register"
                          control={<Radio color="primary" />}
                          label="Register"
                        />
                        <FormControlLabel
                          value="profile"
                          control={<Radio color="primary" />}
                          label="Profile"
                        />
                        <FormControlLabel
                          value="invois"
                          control={<Radio color="primary" />}
                          label="Invois"
                        />
                        <FormControlLabel
                          value="bugalter"
                          control={<Radio color="primary" />}
                          label="Bugalter"
                        />
                        <FormControlLabel
                          value="Manager"
                          control={<Radio color="primary" />}
                          label="Manager"
                        />
                        <FormControlLabel
                          value="notoray"
                          control={<Radio color="primary" />}
                          label="Notary"
                        />
                        <FormControlLabel
                          value="university"
                          control={<Radio color="primary" />}
                          label="University"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div> */}

                <input
                  onChange={(e) => handleFilter(e)}
                  type="radio"
                  id="all"
                  name="filter"
                  value="true"
                />
                <label className="label-true" for="all">
                  Инвойс отправлен
                </label>
              </div>
              <div className="radio-false">
                <input
                  onChange={(e) => handleFilter(e)}
                  type="radio"
                  id="all"
                  name="filter"
                  value="false"
                />
                <label className="label-false" for="not-paid">
                  Инвойс не отправлен
                </label>
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
            </div> */}
            {/* <div className="form_ab">
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
              <button className="form_button" onClick={filterApplicants}>
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
