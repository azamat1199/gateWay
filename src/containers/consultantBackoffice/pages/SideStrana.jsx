import React, { Component, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "react-js-loader";
import { Autocomplete } from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";
import TablePagination from "@material-ui/core/TablePagination";

// import img
import russiaFlag from "../../../assets/icon/russiaFlag.png";
import usaFlag from "../../../assets/icon/usaFlag.png";
import blueStroke from "../../../assets/images/Stroke-blue.svg";
import check from "../../../assets/icon/check1.svg";
// import css
import "../../../style/css/SideStrana.css";
import Sidebar from "./SidebarConsult";
import Axios from "../../../utils/axios";
import close_modal from "../../../assets/icon/close_modal.svg";
import axios from "axios";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import arrow1 from "../../../assets/icon/arrow1.svg";
import delete2 from "../../../assets/icon/delet2.svg";
import edit from "../../../assets/icon/edit.svg";
import close from "../../../assets/icon/close-red.svg";

function SideStrana() {
  const [countryList, setCountryList] = useState([]);
  const [loading, setLoading] = useState();
  const [country, setCountry] = useState("");
  const [page, setPage] = useState(0);
  const [countryId, setCountryId] = useState("");
  const [city, setCity] = useState("");
  const [open_change, setOpen_change] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [open_change2, setOpen_change2] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count,setCount] = useState()
  const [cityAll, setCityAll] = useState([]);
  const [countries, setCountries] = useState([]);
  const [documents_standard, setDocumentsStandard] = useState("");
  const [open3, setOpen3] = useState({name1: false});
  const [editName, setEditName] = useState("");
  const handleOpen_change = () => {
    setOpen_change(true);
  };
  const handleClose_change = () => {
    setOpen_change(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const getCountry = async () => {
    setLoading(true);
    try {
      const res = await Axios.get("/company/country/?limit=1000");
      setCountryList(res.data.results);
     
      setLoading(false);
    } catch (error) {
      setLoading(true);
    }
  };
  const handlePageChange = async(e, newPage) => {
    setPage(newPage);
    setLoading(true)
     try {
        const res = await Axios.get(`/company/city/?limit=${rowsPerPage}&offset=${newPage*rowsPerPage}`);
        const { status, data } = res;
        const { results } = data;
        if (status == 200) {
          setCityAll(results);
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
 
  const getCity = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(`/company/city/?limit=${rowsPerPage}`);
      setCityAll(res.data.results);
      setCount(res.data.count)
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const fetchCountries = async () => {
    try {
      const res = await Axios.get("/common/country/all/");
      const { status, data } = res;
      const { results } = res?.data;
      console.log(results);
      if (status === 200) {
        setCountries(data);
        console.log(results);
      }
    } catch (error) {
      console.log(error?.response);
    }
  };
  const selector = useSelector((state) => state.payload.payload.data);
  const createCountry = async () => {
    try {
      const res = await Axios.post("/company/country/", {
        id: countryId,
        documents_standard: documents_standard,
      });
    } catch (e) {}
    getCity();
    getCountry();
    handleClose();
  };
  const createCity = async () => {
    try {
      const res = await Axios.post("/company/city/", {
        country: countryId,
        name: city,
      });
    } catch (error) {}
    getCity();
    handleClose2();
  };


  const handleCountry = (event, newValue) => {
    console.log(newValue);
    setCountryId(newValue.id);
  };
  const openInput = async (e,id) => {
    const {name}=e.target;
    setOpen3((state) => ({...state, [name]: true }));
    try {
      const res=await Axios.get(`/company/city/${id}/`)
      setEditName(res.data.name)
    } catch (error) {
      
    }
  };
  
  console.log(editName,'dadsada')
  const closeInput = (e) => {
    const { name, value } = e.target;
    setOpen3((state) => ({ ...state,[name]: false }));
  };

  const editCity = (e, id) => {
    try {
      const res = Axios.patch(`/company/city/${id}/`, { name: editName });
      closeInput(e);
       getCity();
    } catch (error) {}
  };

  const deletCity = async (id) => {
    try {
      const res = await Axios.delete(`/company/city/${id}`);
    } catch (error) {
      console.log(error);
    }
    getCity();
  };
 useEffect(()=>{
  getCity();
 },[rowsPerPage])
  useEffect(() => {
    getCountry();
    getCity();
    fetchCountries();
  }, []);
  return (
    <div className="ConsultSideStrana">
      <Sidebar>
        <div className="asos" id="top">
          <div className="Up_navbar">
            <h4>Cтраны</h4>
            <div>
              <img src="https://picsum.photos/70" alt="" />
              <div>
                <h5>
                  {selector.first_name} {selector.last_name}
                </h5>
                <h5>
                  {(selector.role == "branch_director" && "директор филиала") ||
                    selector.role}
                </h5>
              </div>
            </div>
          </div>
          <div className="SideStrana">
            <div className="addNote">
              <input type="text" placeholder="Добавьте заметку сотруднику" />
            </div>
            {(selector.role == "branch_director" && <span></span>) || (
              <>
                <button style={{ marginRight: "30px" }} onClick={handleOpen}>
                  Добавить страну
                </button>
                <button onClick={handleOpen2}>Добавить город</button>
              </>
            )}
            <div className="blockCountry">
              <h4>Список стран</h4>
              <div className="listCountry">
                {countryList?.map((x) => (
                  <div>
                    {/*image yoqligi sabab , xozircha image static*/}
                    <div className="image-strana-div">
                      <img src={x.image} alt="" />
                    </div>
                    <div>
                      <p>{x.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="SidebarUniverstitet">
              <div className="univerList fakultet" id="scroll_bar">
                <table>
                  <thead>
                    <tr>
                      <th>Н</th>
                      <th>стран</th>
                      <th className="">Город</th>
                      <th>редактировать</th>
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
                      cityAll?.map((x, i) => {
                        return (
                          <tr>
                            <td>{i + 1}</td>
                            <td>{x.country.name}</td>
                            {
                              open3[`name${x.id}`] ?(     <td style={{display:'flex',alignItems:'center'}}>
                                <input
                                  style={{
                                    border: "0.5px solid grey",
                                    outline: "none",
                                    borderRadius: "5px",
                                  }}
                                  type="text"
                                  value={editName}
                                  onChange={(e) =>
                                    setEditName(e.target.value)
                                  }
                                />
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <img
                                    onClick={(e) => editCity(e,x.id)}
                                    style={{
                                      width: "23px",
                                      cursor: "pointer",
                                      marginLeft: "15px",
                                    }}
                                    name={`name${x.id}`}
                                    src={check}
                                    alt=""
                                  />
                                  <img
                                    style={{
                                      width: "20px",
                                      cursor: "pointer",
                                      marginLeft: "15px",
                                      padding:"10px 0",
                                      fontWeight:'bold'
                                    }}
                                    name={`name${x.id}`}
                                    onClick={(e) => closeInput(e)}
                                    src={close}
                                    alt=""
                                  />
                                </div>
                              </td>):( <td className="firstTD">{x?.name}</td>) 
                            }
                            <td>
                              <img
                                onClick={(e) => openInput(e,x.id)}
                                style={{ width: "23px", cursor: "pointer" }}
                                src={edit}
                                name={`name${x.id}`}
                                alt=""
                              />
                              <img
                                src={delete2}
                                onClick={() => deletCity(x.id)}
                                style={{
                                  width: "23px",
                                  cursor: "pointer",
                                  marginLeft: "10px",
                                }}
                                name={"diploma_confirmed"}
                                alt=""
                              />
                            </td>
                          </tr>
                        );
                      })
                    )}
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
              <div className="addNewUniverModalUniver talaba_modal">
                <img onClick={handleClose} src={close_modal} alt="" />
                <div className="modalContainer">
                  <h5>Добавить новый Страна</h5>

                  <div className="form_div">
                    <p style={{ marginBottom: "30px" }}>Название Страна</p>
                    <Autocomplete
                      aria-required
                      onChange={handleCountry}
                      id="profayl_input"
                      options={countries}
                      getOptionLabel={(option) => (option ? option.name : "")}
                      style={{ width: 500 }}
                      renderInput={(params) => (
                        <TextField {...params} label="" variant="outlined" />
                      )}
                    />
                  </div>
                  <div style={{ marginTop: "30px" }}>
                    <label>Название Документы</label>
                    <input
                      type="text"
                      name="documents_standard"
                      onChange={(e) => setDocumentsStandard(e.target.value)}
                    />
                  </div>
                  <button onClick={() => createCountry()}>Добавить</button>
                  <button onClick={handleClose} className="back_btn">
                    <img src={arrow1} alt="" /> Вернуться
                  </button>
                </div>
              </div>
            </Fade>
          </Modal>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className="class1"
            open={open2}
            onClose={handleClose2}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open2}>
              <div className="addNewUniverModalUniver talaba_modal">
                <img onClick={handleClose2} src={close_modal} alt="" />
                <div className="modalContainer">
                  <h5>Добавить новый Город</h5>

                  <div>
                    <label>Страна</label>
                    <select onChange={(e) => setCountryId(e.target.value)}>
                      {countryList?.map((value) => {
                        const { name, id } = value;
                        return (
                          <option key={id} value={id}>
                            {name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div>
                    <label>Название Город</label>
                    <input
                      type="text"
                      name="name"
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <button onClick={() => createCity()}>Добавить</button>
                  <button onClick={handleClose2} className="back_btn">
                    <img src={arrow1} alt="" /> Вернуться
                  </button>
                </div>
              </div>
            </Fade>
          </Modal>
          <a href="#top" title="Go to top" className="backTop">
            <img src={blueStroke} alt="back to top" />
          </a>
        </div>
      </Sidebar>
    </div>
  );
}

export default SideStrana;
