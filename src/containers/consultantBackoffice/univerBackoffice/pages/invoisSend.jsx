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
import styled from 'styled-components';
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
  const [next, setNext] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState();
  const [amount ,setAmount] = useState('')
  const [pageChange,setPageChange] = useState()
  const [prev, setPrev] = useState("");

  const handlePageChange = async (e, newPage) => {
    setPage(newPage);
    setLoading(true);
    try {
      const res = await Axios.get(
        `applicant/list/confirmed/?invoice_status=false&limit=${rowsPerPage}&offset=${
          newPage * rowsPerPage
        }`
      );
      const { status, data } = res;
      const { results } = data;
      if (status == 200) {
        setUserDataList(results);
      }
      console.log(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleChangeRowsPerPage = async (event) => {
    console.log(rowsPerPage);
    console.log(event.target.value);
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const getUserInfo = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `applicant/list/confirmed/?invoice_status=false&limit=${rowsPerPage}`
      );
      const { status, data } = res;
      const { results } = data;
      if (status === 200) {
        setUserDataList(results);
        setCount(data.count);
      }
    } catch (error) {
      
    }
  };


  function handleChange(event) {
    setkey(event.target.value);
  }


 

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
  useEffect(() => {
    getUserInfo();
  }, [rowsPerPage]);
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <UniversitetBackoffice>
      <div className="up_nav">
        <div>
          <h4 className="link_h1">?????????????? {`>`} ????????????????????????</h4>
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
        <Responsive>
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
                placeholder="?????????? ????????????????"
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
                <h1>???????????? ????????????????????????</h1>
              </div>
        
            </div>

            <table id="table_excel">
              <thead>
                <th>??????</th>
                <th>??????????????????</th>
                <th>??????????????</th>
                <th>?????? ??????????????????</th>
                <th>????????????????</th>
                <th>????????????</th>
                <th>???????????????? </th>
                <th>?????????????? ??????????????????</th>
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
                               {(data?.education_type == "full_time" &&"??????????") 
                                ||
                                  data?.education_type === "part_time" && "??????????????"
                                ||  
                                data?.education_type === "distance" && "?????????????????????????? ????????????????"
                                ||
                                data?.education_type === "night_time" &&  "???????????????? ????????????????"
                                  }
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
        </Responsive>
       
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
            <h1>??????????????</h1>
            <div className="form_ab">
              <h2>???????????????? ????????????</h2>
              <div className="form_div">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  dateFormat="dd MMM yyyy"
                  placeholderText="????"
                />
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  dateFormat="dd MMM yyyy"
                  minDate={startDate}
                  placeholderText="????"
                />
              </div>
            </div>
           
            <div className="form_ab">
              <button
                className="form_button"
                onClick={filterApplicants}
              >
                ??????????????????
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
const Responsive=styled.div`  
@media (max-width: 768px) {
  overflow-x: hidden;
  .ab_1{
    width:90%;
    .search{
      width:100%
    }
    .table {
      font-size: 12px;
      width: 100%;
      overflow: hidden;
      overflow-x: scroll;
    }
  
  }}
  @media (max-width: 425px) {
    .ab_1 {
      width:90%;
      .search{
        width:135%
      }
       .table {
         font-size: 12px;
       width: 100%;
       overflow: hidden;
       overflow-x: scroll;
     }
    }
  }
  @media (max-width: 320px) {
   .ab_1 {
     width:90%;
     .search{
       width:135%
     }
      .table {
        font-size: 12px;
      width: 100%;
      overflow: hidden;
      overflow-x: scroll;
    }
  `

