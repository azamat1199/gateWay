import React, { useState, useEffect } from "react";
import ManegerSidebar from "../ManagerSidebar";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import Axios from "../../../utils/axios";
import userpic from "../../../assets/icon/userpic.svg";
import filter from "../../../assets/icon/Filter.svg";
import search from "../../../assets/icon/Search2.svg";
import close from "../../../assets/icon/close.svg";
import { useSelector } from "react-redux";
import Loader from "react-js-loader";
import { Pagination } from "@material-ui/lab";
import TablePagination from "@material-ui/core/TablePagination";
import DatePicker from "react-datepicker";
const M_prayslist = () => {
  const history = useHistory();
  const selector = useSelector((state) => state.payload.payload.data);
  const [filterCountry, setFilterCountry] = useState([]);
  const [loading, setLoading] = useState(true);
  const [universities, setUniversities] = useState([]);
  const [universitiesName, setUniversitiesName] = useState();
  const [universitiesId, setUniversitiesId] = useState();
  const [degreeId, setDegreeId] = useState();
  const [degreeName, setDegreeName] = useState();
  const [facultyName, setFacultyName] = useState();
  const [faculty, setFaculty] = useState([]);
  const [degree, setDegree] = useState();
  const [datas, setDatas] = useState();
  const [filters, setfilters] = useState(false);
  const [searchName,setSearchName]=useState('')
  const [key, setkey] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };
  const handelFilter = () => {
    setfilters(!filters);
  };

  const getDatas = async () => {
    setLoading(true);
    const sd=startDate?.getDate()
    const sm=startDate?.getMonth()+1
    const sy=startDate?.getFullYear()
    const ed=endDate?.getDate()
    const em=endDate?.getMonth()+1
    const ey=endDate?.getFullYear()
    try {
      const res = await Axios.get(`/company/set-service-price/?date-from=${
        startDate ?`${sd}.${sm}.${sy}`:""
      }&date-to=${
        endDate ? `${ed}.${em}.${ey}`: ""
      }&search=${
        searchName ? searchName : " "
      }`);
      
      setDatas(res.data.results);
      setLoading(false);
 
    } catch (error) {}
    setfilters(false)
  };

  useEffect(() => {
    getDatas();
  }, []);

 useEffect(()=>{
  getDatas();
 },[searchName])

  return (
    <>
      <ManegerSidebar />
      <div>
        <div className="up_nav n_up">
          <div>
            <h1 className="link_h1">Прайслист</h1>
          </div>
          <div className="user_info">
            <img src={userpic} alt="" />
            <div>
              <h1>
                {selector.first_name} {selector.last_name}
              </h1>
              <h2>{selector.role}</h2>
            </div>
          </div>
        </div>
        <div className="invoys n_documents m_prayslist">
          <div className="ab_1">
            <div className="search">
              <div className="input">
                <button>
                  <img src={search} alt="" />
                </button>
                <input type="text" onChange={(e)=>setSearchName(e.target.value)} />
              </div>
              <div className="filtr_btn">
                <button onClick={handelFilter}>
                  <img src={filter} alt="" />
                </button>
              </div>
            </div>
            <div className="table">
              <table>
                <thead>
                  <th style={{textAlign:'left'}}>Университет</th>
                  <th style={{textAlign:'left'}}>Степень</th>
                  <th style={{textAlign:'left'}}>Факультет</th>
                  <th style={{textAlign:'left'}}>Цена за услуги</th>
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
                    datas
                      ?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((v, i) => {
                        return (
                          <tr >
                            <th style={{textAlign:'left'}}>{v?.university.name}</th>
                            <th style={{textAlign:'left'}}>{v?.degree}</th>
                            <th style={{textAlign:'left'}}>{v?.name}</th>
                            <th style={{textAlign:'left'}}>{v?.service_price}</th>
                          </tr>
                        );
                      })
                  )}
                </tbody>
              </table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15, 20, 30]}
                component="table"
                count={datas?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          </div>
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
                  placeholderText=""
                />
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  dateFormat="dd MMM yyyy"
                  minDate={startDate}
                  placeholderText=""
                />
              </div>
            </div>
      
            <div className="form_ab">
              <button className="form_button" onClick={getDatas}>
                Применить
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default M_prayslist;
