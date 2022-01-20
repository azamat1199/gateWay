import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "react-js-loader";
// UI modal
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import userpic from "../../../../assets/icon/userpic.svg";

import { Pagination } from "@material-ui/lab";
import TablePagination from "@material-ui/core/TablePagination";
// import img
import search_icon from "../../../../assets/icon/search.svg";
import settings from "../../../../assets/icon/settings.svg";
import close_modal from "../../../../assets/icon/close_modal.svg";
import folder_icon from "../../../../assets/icon/folder_icon.svg";
import closeFilter from "../../../../assets/icon/close.svg";

// import css
// import '../../../../style/css/SidebarUniverstitet.css';
import "../../../../style/css/napravFakultet.css";
import UniversitetBackoffice from "../universitetBackoffice";
import Axios from "../../../../utils/axios";
import arrow1 from "../../../../assets/icon/arrow1.svg";
import { useSelector } from "react-redux";

const NapravFakultet = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [filter, setFilter] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState();

  const [name, setName] = useState(0);
  const [universtitetName, setUniverstitetName] = useState(0);
  const [kvota, setKvota] = useState(null);
  const [description, setDescription] = useState("");
  const date = new Date();
  const [nowDate, setNowDate] = useState(date);
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState(null);
  const [fixEnd, setFix] = useState(false);
  const [degree, setDegree] = useState();
  const [dataFaculty, setDataFaculty] = useState();
  const [change, setChange] = useState(1);
  const [type, setType] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);

  const handlePageChange = async (e, newPage) => {
    setPage(newPage);
    setLoading(true);
    try {
      const res = await Axios.get(
        `/university/own-faculty/?limit=${rowsPerPage}&offset=${
          newPage * rowsPerPage
        }`
      );
      const { status, data } = res;
      const { results } = data;
      if (status == 200) {
        setDataFaculty(results);
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

  // modal
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getDegree = async () => {
    try {
      const res = await Axios.get("/university/degree/?limit=1000");
      setDegree(res.data.results);
    } catch (error) {}
  };

  const getFaculty = async () => {
    try {
      const res = await Axios.get("/university/own-faculty/?limit=1000");
      const { status, data } = res;
      const { results } = data;
      if (status === 200) {
        setDataFaculty(res.data.results);
        setCount(res.data.count);
      }
    } catch (error) {}
  };

  const filterApplicants = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `/university/own-faculty/?search/?date-from=${
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
        setDataFaculty(results);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const submitFaculty = async (e) => {
    const year = nowDate.getFullYear();
    const month = nowDate.getMonth() + 1;
    const day = nowDate.getDate();

    try {
      const res = await Axios.post("/university/own-faculty/", {
        name: name,
        universtitetName: universtitetName,
        quota: kvota,
        description: description,
        deadline: year + "-" + month + "-" + day,
        status: status,
        education_fee: price,
        education_type: type,
        degree_id: universtitetName,
      });
      setLoading(false);
      setChange((change) => change + 1);
    } catch (error) {}

    handleClose();
  };

  useEffect(() => {
    getDegree();
  }, []);

  useEffect(() => {
    getFaculty();
  }, [change]);

  useEffect(() => {
    filterApplicants();
  }, [searchName]);
  useEffect(() => {
    getFaculty();
  }, [rowsPerPage]);
  const selector = useSelector((state) => state.payload.payload.data);
  return (
    <UniversitetBackoffice>
      <div className="napravFakultet">
        <div className="Up_navbar1">
          <h4>факультеты</h4>
          <div className="user_info">
            <img src={userpic} alt="" />
            <div>
              <p>{selector?.name} </p>
              <p>
                {selector?.city?.name}, {selector?.city?.country.name}
              </p>
            </div>
          </div>
        </div>
        <div className="SidebarUniverstitet">
          <button onClick={handleOpen}>Добавить факультеты</button>
          <div className="settSearch">
            <div className="searchUniv">
              <img src={search_icon} alt="" />
              <input
                type="text"
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Поиск факультетов "
              />
            </div>
            {/* <button
              onClick={() => {
                setFix(!fixEnd);
              }}
              className="settingsUniver"
            >
              <img src={settings} alt="" />
            </button> */}
          </div>
          {/* end settSearch */}
          <div className="univerList fakultet" id="scroll_bar">
            <table className="univerOfficeNapravfakultetTable">
              <thead>
                <tr>
                  <th className="firstTD" style={{ textAlign: "start" }}>
                    Название
                  </th>
                  <th>Степень</th>
                  <th>Квота</th>
                  <th>Сумма контракта</th>
                  <th>Дедлайн</th>
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
                ) : (
                  dataFaculty
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((v) => {
                      return (
                        <tr>
                          <td
                            className="firstTD"
                            style={{ textAlign: "start" }}
                          >
                            {v.name}
                          </td>
                          <td>{v.degree.title}</td>
                          <td className="priDoc">{v.quota}</td>
                          <td>{v.education_fee} $</td>
                          <td>{v.deadline}</td>
                        </tr>
                      );
                    })
                )}
              </tbody>
            </table>
            <TablePagination
              rowsPerPageOptions={[20, 40, 60]}
              component="table"
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
          {/* end univerList */}
          {/* Filter */}
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
                      views={["year", "month", "day"]}
                      startDate={startDate}
                      endDate={endDate}
                      placeholderText="От"
                    />
                  </div>
                  <div>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
                      placeholderText="До"
                    />
                  </div>
                </div>
                <p>Выберите страну</p>
                <div className="selectCountry">
                  <select name="" id="">
                    <option value="">Турция</option>
                    <option value="">Россия</option>
                    <option value="">США</option>
                    <option value="">Узбекистан</option>
                  </select>
                </div>
                <p>Выберите город</p>
                <div className="selectCountry">
                  <select name="" id="">
                    <option value="">Анталия</option>
                    <option value="">Анкара</option>
                    <option value="">Истанбул</option>
                    <option value="">Измир</option>
                  </select>
                </div>
                <button>Применить</button>
              </div>
              {/* end FilterUniver */}
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
              <div className="addNewUniverModalUniver talaba_modal napravMoodal1">
                <img onClick={handleClose} src={close_modal} alt="" />
                <div className="modalContainer">
                  <h5>Добавить новый факультет</h5>
                  <div>
                    <label>Название факультета</label>
                    <input
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Выберите степень</label>
                    <select
                      onChange={(e) => setUniverstitetName(e.target.value)}
                    >
                      {degree?.map((v) => {
                        //
                        return <option value={v.id}>{v.title}</option>;
                      })}
                    </select>
                  </div>

                  <div>
                    <label>квота</label>
                    <input
                      type="text"
                      onChange={(e) => setKvota(e.target.value)}
                    />
                  </div>

                  <div className="modalDataPick">
                    <label>Прием документов заканчивается</label>
                    <DatePicker
                      selected={nowDate}
                      onChange={(e) => setNowDate(e)}
                      placeholderText="sana"
                    />
                  </div>
                  <div>
                    <label>Цена</label>
                    <input
                      type="text"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>

                  <button
                    onClick={(e) => {
                      submitFaculty(e);
                    }}
                  >
                    Добавить
                  </button>
                  <button onClick={handleClose} className="back_btn">
                    <img src={arrow1} alt="" /> Вернуться
                  </button>
                </div>
              </div>
            </Fade>
          </Modal>
          {/* end Filter */}
        </div>
      </div>
    </UniversitetBackoffice>
  );
};

export default NapravFakultet;
