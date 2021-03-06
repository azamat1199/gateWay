import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Loader from "react-js-loader";
import DatePicker from "react-datepicker";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import TablePagination from "@material-ui/core/TablePagination";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
// import img
import search_icon from "../../../assets/icon/search.svg";
import closeFilter from "../../../assets/icon/close.svg";
// import settings from "../../../assets/icon/settings.svg";
import filterImg from "../../../assets/icon/Filter.svg";
import close_modal from "../../../assets/icon/close_modal.svg";
import folder_icon from "../../../assets/icon/folder_icon.svg";
import pencil from "../../../assets/icon/pencil.svg";
import doc from "../../../assets/icon/doc.svg";
import delet from "../../../assets/icon/delet1.svg";
import arrow1 from "../../../assets/icon/arrow1.svg";
import Vector from "../../../assets/icons/Vector.svg";
import ticketDownload from "../../../assets/images/ticket-download.svg";
import blueStroke from "../../../assets/images/Stroke-blue.svg";
import warning from "../../../assets/images/Warning.svg";
import { useSelector } from "react-redux";
// import css
import "../../../style/css/SidebarUniverstitet.css";
import "../../../style/css/fakultet.css";
import "react-datepicker/dist/react-datepicker.css";
// import Sidebar from "../../consultantBackoffice/pages/SidebarConsult";
import Sidebar from "./SidebarConsult";
import Axios from "../../../utils/axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router";
import { SET_DOC } from "../../../store/actionTypes";
import { dispatch } from "../../../store";
import { Pagination } from "@material-ui/lab";
import TableModal from "../../Accountant/Pages/TableModal";
import logger from "redux-logger";

const Talabalar = () => {
  const [students, setStudents] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [currentSum, setCurretsum] = useState(0);
  const [radio, setRadio] = useState({
    payment: "",
  });
  const [paymentConfirm, setPaymentConfirm] = useState(false);
  const [open_change, setOpen_change] = React.useState(false);
  const [fixEnd, setFix] = useState(false);
  const [count, setCount] = useState();
  const [startDate, setStartDate] = useState(null);
  console.log(startDate);
  const [endDate, setEndDate] = useState(null);
  const [data, setData] = useState(null);
  const [filter, setFilter] = useState({
    filter: "",
  });
  const [searchName, setSearchName] = useState("");
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [loading, setLoading] = useState();
  const [next, setNext] = useState("");
  const [amount, setAmount] = useState("");
  const [prev, setPrev] = useState("");
  const container = useRef();
  const selector = useSelector((state) => state);
  const { payload } = selector?.payload;
  const { first_name, last_name } = payload?.data;
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const fethcStudents = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(`applicant/list/`);
      console.log(res);
      const { status, data } = res;
      const { results, count, amount, next } = data;
      if (status === 200) {
        setStudents(results);
        setAmount(amount);
        setCount(count);
        setNext(next);
      }
      setLoading(false);
    } catch (error) {
      console.log(error.response);
      setLoading(false);
    }
  };

  const handleFilter = (e) => {
    const { name, value } = e.target;
    setFilter({ [name]: value });
  };

  const handleRadio = (e) => {
    const { name, value } = e.target;
    setRadio({ [name]: value });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen_change = () => {
    setOpen_change(true);
  };

  const handleClose_change = () => {
    setOpen_change(false);
  };

  const handleClock = async (id) => {
    try {
      const res = await Axios.put(`/applicant/confirm-payment/${id}/`, {
        invoice_confirmed: true,
      });
      setPaymentConfirm(true);
      const { data, status } = res;
      console.log(status);
      console.log(data.invoice_confirmed);
      console.log(res);
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
      console.log(res);
      const { data, status } = res;
      const { results } = data;
      if (status == 200) {
        setStudents(results);
      }

      setFix(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const allSums = () => {
    for (let i = 0; i < students.length; i++) {
      if (students[i]?.service_price) {
        setCurretsum((prev) => prev + parseInt(students[i].service_price));
      }
    }
  };
  const handlePageChange = (e, newPage) => {
    console.log(e.target.value);
    console.log(newPage);
    setPage(newPage);
  };
  const handleChangeRowsPerPage = async (event) => {
    console.log(event.target.value);
    setRowsPerPage(+event.target.value);
    setPage(0);
    if (event.target.value > 20 && next) {
      try {
        const res = await Axios.get(`/applicant/list/?page=2`);
        const { status, data } = res;
        const { results, previous } = data;
        if (status == 200) {
          setStudents((prev) => [...prev, ...results]);
          setPrev(previous);
          setPage(0);
        }
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    } else if (event.target.value == 20 || event.target.value < 20) {
      fethcStudents();
    }
  };
  console.log(currentSum);
  const handleClick = (id) => {
    console.log(id);
    Swal.fire({
      icon: "warning",
      title: "???? ?????????????????????????? ???????????? ???????????????????? ???????? ?????????????",
      showCancelButton: true,
      reverseButtons: true,
      cancelButtonColor: "#F3F5F7",
      cancelButtonText: "????????????????",
      confirmButtonColor: "#00587F",
      confirmButtonText: "????????????????????",
    }).then((result) => {
      if (result.isConfirmed) {
        handleClock(id);
      } else {
        console.log(false);
      }
    });
  };
  useEffect(() => {
    allSums();
  }, []);
  useEffect(() => {
    filterApplicants();
  }, [searchName]);
  useEffect(() => {
    fethcStudents();
  }, [paymentConfirm]);
  console.log(startDate);
  console.log(endDate);
  console.log(currentSum);
  console.log(students);
  console.log(searchName);
  console.log(startDate?.toLocaleDateString());
  return (
    <div className="consultPlatejji">
      <Sidebar>
        <div className="asos" id="top">
          <div className="Up_navbar">
            <div>
              <div className="nav-bugalter">
                <h4>??????????????????</h4>
                <h5>??????????????????</h5>
              </div>
            </div>
            <div>
              <img src="https://picsum.photos/70" alt="" />
              <div>
                <h5>
                  {first_name} {last_name}
                </h5>
                <p>??????????????????</p>
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
                buttonText="Excel"
              />
            </ExcelTable>
            <div className="settSearch">
              <div className="searchUniv">
                <img src={search_icon} alt="" />
                <input
                  onChange={(e) => setSearchName(e.target.value)}
                  type="text"
                  placeholder="?????????? ????????????????"
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
                    <th>??????</th>
                    <th>???????????????? ????????????</th>
                    <th>???????????? ????????????????</th>
                    <th>??????????????</th>
                    <th>??????????????????????</th>
                    <th>????????????????</th>
                    <th>???????????????? ????????????</th>
                    <th>??????????????????</th>
                    <th>C??????????</th>
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
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((item, i) => {
                        const {
                          id,
                          first_name,
                          last_name,
                          university,
                          amount,
                          phone_number,
                          contract_created_at,
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
                            <td>
                              {contract_created_at.slice(
                                0,
                                contract_created_at.indexOf("T")
                              )}
                            </td>
                            <td>{amount}</td>
                            <td>{phone_number}</td>
                            <td>{university}</td>
                            <td>
                              {manager ? (
                                manager.middle_name
                              ) : (
                                <p style={{ color: "#0d5372" }}>
                                  ???????????????? ?????? ???? ????????????????????
                                </p>
                              )}
                            </td>
                            <td>{contract}</td>
                            <td>
                              {invoice_confirmed && invoice === null ? (
                                <p style={{ color: "#219653" }}>
                                  ?????????????? ?????????? payme
                                </p>
                              ) : invoice_confirmed === null ||
                                (invoice_confirmed === false &&
                                  invoice === null) ? (
                                <p style={{ color: "red" }}>???? ??????????????</p>
                              ) : (
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
                                  <img
                                    src={ticketDownload}
                                    alt="downloadButton"
                                  />
                                </a>
                              )}
                            </td>
                            <td>
                              {invoice_confirmed ? (
                                <ConfirmedButton disabled>
                                  ???????????? ????????????????????
                                </ConfirmedButton>
                              ) : invoice_confirmed === null ||
                                (invoice_confirmed === false &&
                                  invoice === null) ? (
                                ""
                              ) : (
                                <ConfirmedButton disabled>
                                  ???????????? ???? ????????????????????
                                </ConfirmedButton>
                              )}
                            </td>
                          </tr>
                        );
                      })
                  ) : (
                    <h1> ???? ?????????? ?????????????? ???????????? ???? ??????????????</h1>
                  )}
                  <tr>
                    <td></td>
                    <td>??????????: {count}</td>
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
                rowsPerPageOptions={[10, 20, 30, 40]}
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
                  <h4>??????????????</h4>
                  <p>???????????????? ????????????</p>
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
                      <label for="all">??????</label>
                    </InputDiv>
                  </div>
                  <div>
                    <InputDiv>
                      <input
                        onChange={(e) => handleFilter(e)}
                        type="radio"
                        id="all"
                        name="filter"
                        value="not-paid"
                      />
                      <label for="not-paid">???? ??????????????</label>
                    </InputDiv>
                    <InputDiv>
                      <input
                        onChange={(e) => handleFilter(e)}
                        type="radio"
                        id="confirmed"
                        name="filter"
                        value="confirmed"
                      />
                      <label for="confirmed">????????????????????????????</label>
                    </InputDiv>
                  </div>
                  <div>
                    <InputDiv>
                      <input
                        onChange={(e) => handleFilter(e)}
                        type="radio"
                        id="all"
                        name="filter"
                        value="not-confirmed"
                      />
                      <label for="not-confirmed">???? ????????????????????????</label>
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
                        <label for="bank">????????</label>
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
                  <button onClick={filterApplicants}>??????????????????</button>
                </div>
                {/* end FilterUniver */}
              </div>
            </div>
          </div>
          <a href="#top" title="Go to top" className="backTop">
            <img src={blueStroke} alt="back to top" />
          </a>
        </div>
      </Sidebar>
    </div>
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
  border: none;
  width: 197px;
  background: #5ec98b !important;
  color: white !important;
  border-radius: 4px !important;
  cursor: pointer !important;
`;
const ConfirmedButton = styled.button`
  color: #219653;
  border: none;
  border-radius: 4px !important;
  font-size: 15px !important;
  height: 40px !important;
  width: 197px;
  cursor: no-drop !important;
  background: rgba(94, 201, 139, 0.25) !important;
`;

const ExcelTable = styled.div`
  button {
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
    &::before {
      content: "";
      display: block;
      background: url(/static/media/excel.3862dae2.svg);
      width: 24px;
      height: 24px;
      transform: translateY(0px) translateX(-10px);
    }
  }
`;
