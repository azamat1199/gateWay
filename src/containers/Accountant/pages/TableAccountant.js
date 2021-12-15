import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Loader from "react-js-loader";
import DatePicker from "react-datepicker";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import TablePagination from "@material-ui/core/TablePagination";
// import img
import search_icon from "../../../assets/icon/search.svg";
import closeFilter from "../../../assets/icon/close.svg";
// import settings from "../../../assets/icon/settings.svg";
import filterImg from "../../../assets/icon/Filter.svg";
import avatar from "../../../assets/icon/Avatar.svg";
import Vector from "../../../assets/icons/Vector.svg";
import ticketDownload from "../../../assets/images/ticket-download.svg";
import blueStroke from "../../../assets/images/Stroke-blue.svg";
import { useSelector } from "react-redux";
// import css
import "../../../style/css/SidebarUniverstitet.css";
import "../../../style/css/fakultet.css";
import "react-datepicker/dist/react-datepicker.css";
// import Sidebar from "../../consultantBackoffice/pages/SidebarConsult";
import SidebarAccountant from "./SidebarAccountant";
import Axios from "../../../utils/axios";

const Talabalar = () => {
  const [students, setStudents] = useState([]);
  const [radio, setRadio] = useState({
    payment: "",
  });
  const [paymentConfirm, setPaymentConfirm] = useState(false);
  const [fixEnd, setFix] = useState(false);
  const [count, setCount] = useState();
  const [startDate, setStartDate] = useState(null);
  console.log(startDate);
  const [endDate, setEndDate] = useState(null);
  const [filter, setFilter] = useState({
    filter: "",
  });
  const [searchName, setSearchName] = useState("");
  const [loading, setLoading] = useState();
  const [amount ,setAmount] = useState('')
  const selector = useSelector((state) => state);
  const { payload } = selector?.payload;
  const { first_name, last_name } = payload?.data;
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleFilter = (e) => {
    const { name, value } = e.target;
    setFilter({ [name]: value });
  };

  const handleRadio = (e) => {
    const { name, value } = e.target;
    setRadio({ [name]: value });
  };

  const fethcStudents = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(`applicant/list/?limit=${rowsPerPage}`);
      console.log(res);
      const { status, data } = res;
      const { results, count,amount ,next } = data;
      if (status === 200) {
        setStudents(results);
        setAmount(amount)
        setCount(count);
      }
      setLoading(false);
    } catch (error) {
      console.log(error.response);
      setLoading(false);
    }
  };
  const handleClock = async (id) => {
    try {
      const res = await Axios.put(`/applicant/confirm-payment/${id}/`, {
        invoice_confirmed: true,
      });
      setPaymentConfirm(true);
    } catch (error) {
      console.log(error.response);
    }
  };

  const filterApplicants = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `/applicant/list/?date-from=${
          startDate ? startDate.toLocaleDateString() : ""
        }&date-to=${
          endDate ? endDate.toLocaleDateString() : ""
        }&payment-status=${filter.filter}&search=${
          searchName ? searchName : ""
        }&payment-type=${radio.payment}`
      );
      const { data, status } = res;
      const { results } = data;
      if (status == 200) {
        setStudents(results);
      }
      setLoading(false);
      setFix(false);
    } catch (error) {
      setLoading(false);
    }
  };
 
  const handlePageChange = async(e, newPage) => {
    setPage(newPage);
    setLoading(true)
     try {
        const res = await Axios.get(`/applicant/list/?limit=${rowsPerPage}&offset=${newPage*rowsPerPage}`);
        const { status, data } = res;
        const { results } = data;
        if (status == 200) {
          setStudents(results);
        }
        console.log(res);
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
  };

  const handleChangeRowsPerPage = async (event) => {
    console.log(rowsPerPage);
    console.log(event.target.value);
    setRowsPerPage(+event.target.value);
    setPage(0);
    }

  useEffect(() => {
    fethcStudents();
  }, [paymentConfirm,rowsPerPage]);
  useEffect(()=>{
    filterApplicants()
  },[searchName])
  return (
    <SidebarAccountant>
      <div className="asos" id="top">
        <div className="Up_navbar">
          <div>
            <div className="nav-bugalter">
              <h4>Бухгалтер</h4>
              <h5>Квитанции</h5>
            </div>
          </div>
          <div>
            <img src={avatar} alt="" />
            <div>
              <h5>
                {first_name} {last_name}
              </h5>
              <p>Бухгалтер</p>
            </div>
          </div>
        </div>
        <div className="SidebarUniverstitet">
           <ExcelTable>
              <img src={Vector} className="vector" alt="Vector img" />
              <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button"
                table="table_excel"
                filename="tablexls"
                sheet="tablexls"
                buttonText="Excel"/>
           </ExcelTable>
          <div className="settSearch">
            <div className="searchUniv">
              <img src={search_icon} alt="" />
              <input
                onChange={(e) => setSearchName(e.target.value)}
                type="text"
                placeholder="Поиск Студенты"
              />
            </div>
            <button
              onClick={() => {
                setFix(!fixEnd);
              }}
              className="settingsUniver"
            >
              <img src={filterImg} className="" alt="" />
            </button>
          </div>

          <div className="univerList talabalar" id="scroll_bar">
            <table id="table_excel">
              <thead>
                <tr className="table-line">
                  <th className="px-3">N</th>
                  <th>ФИО</th>
                  <th>Шартнома санаси</th>
                  <th>Услуги компании</th>
                  <th>Телефон</th>
                  <th>Университет</th>
                  <th>Менеджер</th>
                  <th>Шартнома раками</th>
                  <th>Квитанция</th>
                  <th>Cтатус</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <Loader
                    type="spinner-circle"
                    bgColor={"#FFFFFF"}
                    color={"#FFFFFF"}
                    size={80}
                  />
                ) : students?.length > 0 ? (
                  students
                    .map((item, i) => {
                      const {
                        id,
                        first_name,
                        last_name,
                        university,
                        service_price,
                        phone_number,
                        contract_created_date,
                        invoice,
                        manager,
                        contract,
                        invoice_confirmed,
                      } = item;

                      return (
                        <tr key={id} className="accTickTableTr">
                          <td className="px-3">{i + 1}</td>
                          <td>
                            {first_name} {last_name}
                          </td>
                          <td>{contract_created_date}</td>
                          <td>{service_price}</td>
                          <td>{phone_number}</td>
                          <td>{university}</td>
                          <td>
                            {manager ? (
                              manager
                            ) : (
                              <p style={{ color: "#0d5372" }}>
                                Менеджер еще не прикреплен
                              </p>
                            )}
                          </td>
                          <td>{contract}</td>
                          <td>
                            {invoice_confirmed && invoice === null ? 
                              <p style={{color:'#219653'}}>Оплачен через payme</p>  
                          : invoice_confirmed === null || invoice_confirmed === false && invoice === null ?
                           <p style={{color:'red'}}>Не оплачен</p>
                           :
                            <a
                              style={
                                invoice
                                  ? { display: "block" }
                                  : { display: "none" }
                              }
                              href={invoice}
                              target="_blank"
                              download
                            >
                              <img src={ticketDownload} alt='downloadButton'/>
                            </a>
                    }
                          </td>
                          <td>
                            
                              {invoice_confirmed ?
                                <ConfirmedButton disabled>Платеж потвержден</ConfirmedButton>
                                : invoice_confirmed === null || invoice_confirmed === false && invoice === null ? '':
                                <ConfirmButton onClick={()=>handleClock(id)}>Потвердить платеж</ConfirmButton>
                                }
                          </td>
                        </tr>
                      );
                    })
                ) : (
                  <h1> По этому запросу данных не найдено</h1>
                )}
                <tr>
                  <td></td>
                  <td>Итого: {count}</td>
                  <td></td>
                  <td>{amount}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <TablePagination
              rowsPerPageOptions={[20,40,60]}
              component="table"
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>

          {/* end Filter */}

          <div
            className="abitFilBox"
            style={
              fixEnd
                ? { width: "100%" }
                : { width: "0", transition: "0.5s step-end" }
            }
          >
            <div className="abitFilCl" onClick={() => setFix(!fixEnd)}></div>
            <div
              className="FilterFix"
              style={
                fixEnd
                  ? { transform: "translateX(0)", transition: "0.5s" }
                  : { transform: "translateX(100%)", transition: "0.5s" }
              }
            >
              <div
                className="fixLeft"
                onClick={() => {
                  setFix(!fixEnd);
                }}
              ></div>
              <div className="FilterUniver">
                <button
                  onClick={() => {
                    setFix(!fixEnd);
                  }}
                  className="ab_2_close"
                >
                  <img src={closeFilter} alt="" />
                </button>
                <h4>Фильтры</h4>
                <p>Выберите период</p>
                <div className="datapickBlock">
                  <div>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      selectsStart
                      openTo="year"
                      views={["year", "month", "day"]}
                      startDate={startDate}
                      endDate={endDate}
                      dateFormat="dd MM yyyy"
                      placeholderText="Ot"
                    />
                  </div>
                  <div>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      dateFormat="dd MM yyyy"
                      minDate={startDate}
                      placeholderText="Do"
                    />
                  </div>
                </div>
                <div>
                  <InputDiv>
                  <input
                    onChange={(e) => handleFilter(e)}
                    type="radio"
                    id="all"
                    name="filter"
                    value="all"
                  />
                  <label for="all">Все</label>
                  </InputDiv>
                </div>
                <div>
                <InputDiv>
                  <input
                    onChange={(e) => handleFilter(e)}
                    type="radio"
                    id="not-paid"
                    name="filter"
                    value="not-paid"
                  />
                  <label for="not-paid">Не оплачен</label>
                  </InputDiv>
                  <InputDiv>
                  <input
                    onChange={(e) => handleFilter(e)}
                    type="radio"
                    id="confirmed"
                    name="filter"
                    value="confirmed"
                  />
                  <label for="confirmed">Подтвержденный</label>
                  </InputDiv>
                </div>
                <div>
                <InputDiv>
                  <input
                    onChange={(e) => handleFilter(e)}
                    type="radio"
                    id="not-confirmed"
                    name="filter"
                    value="not-confirmed"
                  />
                  <label for="not-confirmed">Не подтверждено</label>
                 </InputDiv>

                  <div style={{ display: "flex" }}>
                    <InputDiv>
                      <input
                        onChange={(e) => handleRadio(e)}
                        type="radio"
                        id="bank"
                        name="payment"
                        value="bank"
                      />
                      <label for="bank">банк</label>
                    </InputDiv>
                    <InputDiv style={{ marginLeft: "12px" }}>
                      <input
                        onChange={(e) => handleRadio(e)}
                        type="radio"
                        id="card"
                        name="payment"
                        value="payme"
                      />
                      <label for="card">Payme</label>
                    </InputDiv>
                  </div>
                </div>
                  <button onClick={()=>filterApplicants()}>Применить</button>
              </div>
              {/* end FilterUniver */}
            </div>
          </div>
        </div>
        <a href="#top" title="Go to top" className="backTop">
          <img src={blueStroke} alt="back to top" />
        </a>
      </div>
    </SidebarAccountant>
  );
};

export default Talabalar;

const InputDiv = styled.div`
  margin: 18px 0;
  font-size: 18px;
  display: flex;
  align-items: center;
  input {
    height: 18px;
    width: 18px;
  }
  label {
    margin-left: 15px;
    font-weight: 600;
    cursor: pointer;
  }
`;


const ConfirmButton = styled.button`
  height: 40px;
  border:none;
  width: 197px;
  background: #5EC98B !important;
  color: white !important;
  border-radius: 4px !important;
  cursor:pointer !important;
`
const ConfirmedButton = styled.button`
  color: #219653;
  border:none;
  border-radius: 4px !important;
  font-size: 15px !important;
  height: 40px !important;
  width: 197px;
  cursor: no-drop !important;
  background: rgba(94, 201, 139, 0.25) !important;
`

const ExcelTable = styled.div`
 button{
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none;
    cursor: pointer;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 23px;
    color: #ffffff;
    width: 290px;
    height: 60px;
    background: #00587f;
    border-radius: 10px;
    &::before{
      content: "";
      display: block;
      background: url(/static/media/excel.3862dae2.svg);
      width: 24px;
      height: 24px;
      transform: translateY(0px) translateX(-10px);
    }
 } 

`
