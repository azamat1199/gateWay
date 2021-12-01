import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// UI modal
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Loader from "react-js-loader";
import userpic from "../../../../assets/icon/userpic.svg";

// import img
import search_icon from "../../../../assets/icon/search.svg";
import settings from "../../../../assets/icon/settings.svg";
import close_modal from "../../../../assets/icon/close_modal.svg";
import folder_icon from "../../../../assets/icon/folder_icon.svg";
import closeFilter from "../../../../assets/icon/close.svg";
import { Pagination } from "@material-ui/lab";
import TablePagination from "@material-ui/core/TablePagination";
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
  const [loading, setLoading] = useState();
  const [filter, setFilter] = useState("");
  const [searchName, setSearchName] = useState("");
  const [name, setName] = useState();

  const [year, setYear] = useState("");
  const [universtitetName, setUniverstitetName] = useState("");
  const [faculty, setFaculty] = useState();
  const [description, setDescription] = useState("");
  const date = new Date();
  const [nowDate, setNowDate] = useState(date);
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState(null);
  const [fixEnd, setFix] = useState(false);
  const [degree, setDegree] = useState();
  const [dataFaculty, setDataFaculty] = useState();
  const [change, setChange] = useState(1);
  const [datas, setDatas] = useState();
  const [major, setMajor] = useState();
  // modal
  const [open, setOpen] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getDegree = async () => {
    try {
      const res = await Axios.get("/university/degree/");
      setDegree(res.data.results);
    } catch (error) {}
  };

  const inputChange = (e) => {
    const { name, value } = e.target;
    setDatas((state) => ({ ...state, [name]: value }));
  };

  const submitMajor = async (e) => {
    try {
      const res = await Axios.post("/university/major/", datas);
      setChange((change) => change + 1);
    } catch (error) {
      
    }
    handleClose();
  };

  const getMajor = async () => {
    setLoading(true);
    try {
      const res = await Axios.get("/university/own-major/");
      const { status, data } = res;
      const { results } = data;
      if (status === 200) {
        setMajor(res.data.results);
      }
    } catch (error) {}
  };

  const filterApplicants = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `/university/own-major/?search/?date-from=${
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
        setMajor(results);
      }
      setLoading(false);
    } catch (error) {
      
      setLoading(false);
    }
  };

  const getFaculty = async () => {
    try {
      const res = await Axios.get("/university/own-faculty/");
      setDataFaculty(res.data.results);
    } catch (error) {}
  };

  useEffect(() => {
    getMajor();
    getFaculty();
  }, []);

  useEffect(() => {
    getMajor();
  }, [change]);

  const selector = useSelector((state) => state?.payload?.payload.data);
  return (
    <UniversitetBackoffice>
      <div className="napravFakultet">
        <div className="Up_navbar1">
          <h4>Направления</h4>
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
          <button onClick={handleOpen}>Добавить степень</button>
          <div className="settSearch">
            <div className="searchUniv">
              <img src={search_icon} alt="" />
              <input
                type="text"
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Поиск степень"
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
            <table>
              <thead>
                <tr>
                  <th className="firstTD">Название</th>
                  <th className="firstTD">факультет</th>
                  <th className="firstTD">Тип обученияе</th>
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
                  major
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((v) => {
                      return (
                        <tr>
                          <td className="firstTD">{v?.name}</td>
                          <td className="firstTD">{v?.faculty_name}</td>
                          <td>
                            {(v?.education_type == "full_time" && "Очный") ||
                              "Заочный"}
                          </td>
                        </tr>
                      );
                    })
                )}
              </tbody>
            </table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15, 20, 30]}
              component="table"
              count={major?.length}
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
                      startDate={startDate}
                      endDate={endDate}
                      placeholderText="dan"
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
                      placeholderText="gacha"
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
                  <h5>Добавить новый степень</h5>

                  <div>
                    <label>Название факультет</label>
                    <select onChange={(e) => inputChange(e)} name="faculty">
                      {dataFaculty?.map((v) => {
                        return <option value={`${v.id}`}>{v.name}</option>;
                      })}
                    </select>
                  </div>
                  <div>
                    <label>Название степень</label>
                    <input
                      name="name"
                      type="text"
                      onChange={(e) => inputChange(e)}
                    />
                  </div>

                  <div>
                    <label>Тип обученияе</label>
                    <select
                      onChange={(e) => inputChange(e)}
                      name="education_type"
                    >
                      <option value="full_time">Очный</option>
                      <option value="distance">Заочный</option>
                    </select>
                  </div>

                  <button
                    onClick={(e) => {
                      submitMajor(e);
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
