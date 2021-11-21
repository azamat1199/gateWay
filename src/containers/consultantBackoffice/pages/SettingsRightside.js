import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import Loader from "react-js-loader";
import Axios from "../../../utils/axios";
import TableSettings from "../pages/TableSettings";
// import "../../../../../src/style/css/SidebarUniverstitet.css";

import "../../../../src/style/css/SidebarUniverstitet.css";
import "../../../style/css/SidebarUniverstitet.css";

// import "../../../../style/css/fakultet.css";
import "../../../../src/style/css/fakultet.css";
// import "../../../style/css/fakultet.css";
import "react-datepicker/dist/react-datepicker.css";

import "../../../style/css/SidebarUniverstitet.css";
import "../../../style/css/fakultet.css";

import img1 from "../../../assets/icon/img1.svg";
// import staticImg from "../../../assets/images/static.svg";
import StaticImg from "../../../assets/images/StaticIMG.svg";
import blueStroke from "../../../assets/images/Stroke-blue.svg";
import staticEdit from "../../../assets/images/staticEdit.svg";
import plus from "../../../assets/images/plus.svg";
import ticketDownload from "../../../assets/images/ticket-download.svg";

export default function SettingsRightside() {
  const [loading, setLoading] = useState();
  const [students, setStudents] = useState([]);

  const [input, setInput] = useState(false);
  const [paymentConfirm, setPaymentConfirm] = useState(false);
  const [count, setCount] = useState();
  const [select, setSelect] = useState([]);
  const [certainId, setCertainId] = useState("");
  const [selectData, setSelectData] = useState({
    universityName: "",
    degreeName: "",
    facultyName: "",
    priceName: "",
  });
  const [getSelectUniversity, setGetSelectUniversity] = useState([]);
  const [getSelectDegree, setGetSelectDegree] = useState([]);
  const [getSelectBachelor, setGetSelectBachelor] = useState([]);
  const [certainDegree, setCertainDegree] = useState();
  const [univercities, setUnivercities] = useState({
    id: "",
  });

  const [tableData, setTableData] = useState();

  const [allFaculties, setAllFaculties] = useState([]);
  const [bachelorList, setBachelorList] = useState([]);
  const [selectedDegree, setSelectedDegree] = useState();
  const [selectedMajor, setSelectedMajor] = useState();
  const [selectedEdcuation, setSelectedEducation] = useState();
  const [faculties, setFaculties] = useState([]);
  const [selectedFaculty, setSelectFaculty] = useState([]);

  const handleClick = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Вы действительно хотите потвердить этот платеж?",
      showCancelButton: true,
      reverseButtons: true,
      cancelButtonColor: "#F3F5F7",
      cancelButtonText: "Отменить",
      confirmButtonColor: "#00587F",
      confirmButtonText: "Потвердить",
    }).then((result) => {
      if (result.isConfirmed) {
        handleClock(id);
      } else {
      }
    });
  };

  const handleClock = async (id) => {
    try {
      const res = await Axios.put(`/applicant/confirm-payment/${id}/`, {
        invoice_confirmed: true,
      });
      setPaymentConfirm(true);
      const { data, status } = res;
    } catch (error) {}
  };

  // function settingClick(e) {
  //
  // }

  const [inputValue, setInputValue] = useState();

  const [allValues, setAllValues] = useState();

  // const handleChange = (e) => {
  //
  //   setSearchItem(e.target.value);

  const handleSubmit = async (e) => {
    setLoading(true);
    try {
      const res = await Axios.post("/company/set-service-price/", {
        ...inputValue,
      });

      const { status, data } = res;
      const { results } = data;
      if (status) {
        setAllValues(results);
      }

      if (status) {
        Swal.fire({
          icon: "success",
          text: "Успешно добавить?",
          showCancelButton: false,
          reverseButtons: true,
          cancelButtonColor: "#F3F5F7",
          cancelButtonText: "Отменить",
          confirmButtonColor: "#00587F",
          confirmButtonText: "Потвердить",
          preConfirm: function (result) {
            return new Promise(function (resolve, reject) {
              if (result) {
                const res = Axios.get(`/company/set-service-price/`);
                const { status } = res;
                const { results } = data;
                if (status === 200) {
                  setSelectFaculty(results);
                }
                Swal.fire("Saved!", "", "success")
                  .then(function (response) {
                    resolve();
                  })
                  .catch(function (error) {
                    error("Error ");
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: "Something went wrong!",
                    });

                    reject();
                  });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Something went wrong!",
                });
              }
            });
          },
        });
        setLoading(false);
      }

      // if (status == 200) {
      //   Swal.fire({
      //     icon: "success",
      //     text: "Успешно добавлен",
      //     showCancelButton: false,
      //     reverseButtons: true,
      //     cancelButtonColor: "#F3F5F7",
      //     cancelButtonText: "Отменить",
      //     confirmButtonColor: "#00587F",
      //     confirmButtonText: "Потвердить",
      //   })
      //     .then(() => {
      //       Axios.get(`/company/set-service-price/`);
      //       // const res = await Axios.get(`/company/set-service-price/`);
      //       //
      //     })
      //     .then((res) => {
      //       setStudents(res.data.results);
      //     });
      // }
      // if (status == 200) {
      //   dispatch(signUpAction({ data: data }));
      //   localStorage.setItem("profile", JSON.stringify(data));
      //   localStorage.setItem("enrolle_user", data?.id);
      //   Swal.fire({
      //     icon: "success",
      //     text: "Успешно зарегистрирован",
      //     showCancelButton: false,
      //   }).then(() => {
      //     Axios.post("/common/token/obtain", {
      //       phone_number: `${finalData.phone_number}`,
      //       password: `${finalData.password_1}`,
      //     })
      //       .then((res) => {
      //         const { refresh, access } = res.data;
      //         localStorage.setItem("acces", access);
      //         localStorage.setItem("refresh", refresh);
      //       })
      //       .then(() => history.push("/my-account"));
      //   });
      // }
    } catch (error) {
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops...",
      //   text: "Something went wrong!",
      // });

      setLoading(false);
    }
  };

  // const handleSubmitGet = async (e) => {
  //   try {
  //     const res = await Axios.get("/company/set-service-price/");
  //
  //     const { status } = res;
  //     const { data } = res;
  //     const { results } = data;
  //     setStudents(results);
  //

  //     // if (status == 200) {
  //     //   Swal.fire({
  //     //     icon: "success",
  //     //     text: "Успешно добавлен",
  //     //     showCancelButton: false,
  //     //     reverseButtons: true,
  //     //     cancelButtonColor: "#F3F5F7",
  //     //     cancelButtonText: "Отменить",
  //     //     confirmButtonColor: "#00587F",
  //     //     confirmButtonText: "Потвердить",
  //     //   })
  //     //     .then(() => {
  //     //       Axios.get(`/company/set-service-price/`);
  //     //       // const res = await Axios.get(`/company/set-service-price/`);
  //     //       //
  //     //     })
  //     //     .then((res) => {
  //     //       setStudents(res.data.results);
  //     //     });
  //     // }
  //     // if (status == 200) {
  //     //   dispatch(signUpAction({ data: data }));
  //     //   localStorage.setItem("profile", JSON.stringify(data));
  //     //   localStorage.setItem("enrolle_user", data?.id);
  //     //   Swal.fire({
  //     //     icon: "success",
  //     //     text: "Успешно зарегистрирован",
  //     //     showCancelButton: false,
  //     //   }).then(() => {
  //     //     Axios.post("/common/token/obtain", {
  //     //       phone_number: `${finalData.phone_number}`,
  //     //       password: `${finalData.password_1}`,
  //     //     })
  //     //       .then((res) => {
  //     //         const { refresh, access } = res.data;
  //     //         localStorage.setItem("acces", access);
  //     //         localStorage.setItem("refresh", refresh);
  //     //       })
  //     //       .then(() => history.push("/my-account"));
  //     //   });
  //     // }
  //   } catch (error) {
  //
  //   }
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue((state) => ({ ...state, [name]: value }));
  };

  const handleFormSumbit = (e) => {
    const { name, value } = e.target;
    setInputValue((state) => ({ ...state, [name]: value }));
  };

  const fetchUniversityList = async () => {
    try {
      const res = await Axios.post("/university/");
      const { status, data } = res;
      const { results } = data;
      if (status === 200) {
        setUnivercities(results);
      }
    } catch (error) {}
  };

  const filterUniversitiy = async (e) => {
    //const { value } = e?.target;
    //setSelectData((state) => ({ ...state, [name]: value }));
    //
    //   `/university/faculty/?university_id=${univercities.id}&degree=${selectedDegree}&education_type=${selectedEdcuation}`
    // );
    //
    // try {
    //   const res = await Axios.get(
    //     `/university/faculty/?university_id=${selectData.university.id}&degree=${selectedDegree}&education_type=${selectedEdcuation}`
    //   );
    //   const { status, data } = res;
    //   const { results } = data;
    //
    //   if (status == 200) {
    //     setUnivercities(results);
    //   }
    //
    // } catch (error) {
    //
    // }
  };

  const getCertainId = async () => {
    try {
      const res = await Axios.get(
        `/university/degree/?university_id=${certainId}`
      );

      const { status, data } = res;
      const { results } = data;

      if (status === 200) {
        setGetSelectBachelor(results);
      }
    } catch (error) {}
  };

  const getSelectedFaculty = async () => {
    try {
      const res = await Axios.get(
        `/university/faculty/?university_id=${certainId}&degree=${certainDegree}`
      );

      const { status, data } = res;
      const { results } = data;

      if (status === 200) {
        setSelectFaculty(results);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getCertainId();
  }, [certainId]);
  useEffect(() => {
    getSelectedFaculty();
  }, [certainDegree]);

  const fetchSelectUniversity = async () => {
    try {
      const res = await Axios.get(`/university/`);

      const { status, data } = res;
      const { results, count } = data;

      if (status === 200) {
        setSelect(results);
      }
    } catch (error) {}
  };

  const fetchSelectUniversityDegree = async () => {
    try {
      const res = await Axios.get(`/university/degree/`);

      const { status, data } = res;
      const { results } = data;

      if (status === 200) {
        setGetSelectDegree(results);
      }
    } catch (error) {}
  };

  const fetchSelectUniversityBachelor = async () => {
    try {
      const res = await Axios.get(`/university/faculty/`);

      const { status, data } = res;
      const { results } = data;
      if (status === 200) {
        setGetSelectBachelor(results);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchSelectUniversity();
    fetchSelectUniversityDegree();
    fetchSelectUniversityBachelor();
    filterUniversitiy();
    handleSubmit();
  }, []);

  const selector = useSelector((state) => state?.payload.payload.data);

  const [open1, setOpen1] = useState(false);
  const [selected1, setSelected1] = useState("");
  const inputClick1 = () => {
    setOpen1(true);
    setOpen2(false);
    setOpen3(false);
  };
  const itemClick1 = (e) => {
    setSelected1(e.target.textContent);
    setOpen1(false);
  };

  const [open2, setOpen2] = useState(false);
  const [selected2, setSelected2] = useState("");
  const inputClick2 = () => {
    setOpen1(false);
    setOpen2(true);
    setOpen3(false);
  };
  const itemClick2 = (e) => {
    setSelected2(e.target.textContent);
    setOpen2(false);
  };

  const [open3, setOpen3] = useState(false);
  const [selected3, setSelected3] = useState("");
  const inputClick3 = () => {
    setOpen1(false);
    setOpen2(false);
    setOpen3(true);
  };
  const itemClick3 = (e) => {
    setSelected3(e.target.textContent);
    setOpen3(false);
  };

  const [change1, setChange1] = useState("");
  const [change2, setChange2] = useState("");
  const [change3, setChange3] = useState("");

  const closeAll = () => {
    if (open1 === true) {
      setOpen1(false);
    } else {
      if (open2 === true) {
        setOpen2(false);
      }
      if (open3 === true) {
        setOpen3(false);
      }
    }
  };

  return (
    <div>
      <div className="" id="top">
        <div className="staticImg">
          <div className="editIcon">
            <img src={staticEdit} alt="static edit" />
          </div>
          <div className="staticPerson">
            <img src={StaticImg} alt="head img" />
            <h4>
              {selector?.first_name} {selector?.last_name}
            </h4>
            <h5>{selector?.role}</h5>
          </div>
        </div>
        <div className="setting-select">
          <h5 className="priceFor">Цены за услуги компании</h5>
          <form onSubmit={(e) => handleFormSumbit(e)} className="staticSelect">
            <div onClick={closeAll} className="mainEduGate ">
              <div className="header1">
                <div className="filter">
                  <div className="dropDwn">
                    <input
                      className="input"
                      type="text"
                      value={selected1}
                      onClick={inputClick1}
                      placeholder="Университет"
                    />
                    <div
                      className={
                        open1 === true ? "options height_a" : "options"
                      }
                    >
                      <div className="opt-list" name="university">
                        {select.map((item) => {
                          const { name, id } = item;
                          return (
                            <label htmlFor={id}>
                              <input
                                name="university"
                                type="checkbox"
                                onChange={(event) =>
                                  setCertainId(event.target.value)
                                }
                                value={id}
                                id={id}
                              />
                              <p onClick={itemClick1} className="result">
                                {name}
                              </p>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="dropDwn">
                    <input
                      className="input"
                      type="text"
                      value={selected2}
                      onClick={inputClick2}
                      placeholder="Бакалавр"
                    />
                    <div
                      className={
                        open2 === true ? "options height_a" : "options"
                      }
                    >
                      <div className="opt-list" name="degree">
                        {getSelectBachelor.map((item) => {
                          const { title, id } = item;

                          return (
                            <label htmlFor={id}>
                              <input
                                name="degree"
                                type="checkbox"
                                onChange={(event) =>
                                  setCertainDegree(event.target.value)
                                }
                                value={id}
                                id={id}
                              />
                              <p onClick={itemClick2} className="result">
                                {title}
                              </p>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="dropDwn">
                    <input
                      className="input"
                      type="text"
                      value={selected3}
                      onClick={inputClick3}
                      placeholder="Направление"
                    />
                    <div
                      className={
                        open3 === true ? "options height_a" : "options"
                      }
                    >
                      <div className="opt-list" name="faculty_id">
                        {selectedFaculty.map((item) => {
                          const { name, id } = item;
                          return (
                            <label htmlFor={id}>
                              <input
                                name="faculty_id"
                                onChange={(e) => handleInputChange(e)}
                                type="checkbox"
                                // onChange={(event) =>
                                //   setChange3(event.target.value)
                                // }
                                value={id}
                                id={id}
                              />
                              <p onClick={itemClick3} className="result">
                                {name}
                              </p>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <input
                    className="price-inp"
                    name="service_price"
                    onChange={(e) => handleInputChange(e)}
                    placeholder="$"
                  ></input>
                </div>
              </div>
            </div>

            {/* <select
              name="university"
              onChange={(e) => {
                
                setCertainId(e.target.value);
              }}
            >
              {select.map((item) => {
                const { name, id } = item;
                
                return <option value={id}>{name}</option>;
              })}
            </select> */}

            {/* <select
              name="degree"
              onChange={(e) => setCertainDegree(e.target.value)}
            >
              {getSelectBachelor.map((item) => {
                const { id, title } = item;
                return <option value={id}>{title}</option>;
              })}
            </select> */}

            {/* <select
              className="name"
              name="faculty_id"
              onChange={(e) => handleInputChange(e)}
            >
              {selectedFaculty.map((item) => {
                const { id, name } = item;
                return <option value={id}>{name}</option>;
              })}
            </select> */}
          </form>
          <div className="plus-btn">
            <button onClick={handleSubmit}>Добавить</button>
          </div>
        </div>
        {/* TABLE */}
        <div className="asos">
          <div className="SidebarUniverstitet">
            <div className="univerList talabalar" id="scroll_bar">
              <table>
                <thead>
                  <tr className="table-line">
                    <th className="px-3">N</th>
                    <th>Университет</th>
                    <th>Степень</th>

                    <th>Факультет</th>
                    <th>Цена</th>
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
                    selectedFaculty.map((item, i) => {
                      const {
                        id,
                        degree_name,
                        name,
                        university_name,
                        education_fee,
                      } = item;
                      return (
                        <tr key={id}>
                          <td className="px-3">{i + 1}</td>
                          <td className="firstTD invoice-row">
                            {university_name}
                          </td>
                          <td className="invoice-row">{degree_name}</td>
                          <td className="invoice-row">{name}</td>
                          <td className="inovice-row">${education_fee}</td>

                          {/* <td>
                            {invoice_confirmed == null ? (
                              "не оплачен"
                            ) : (
                              <button
                                style={
                                  invoice_confirmed
                                    ? { backgroundColor: "#5EC98B" }
                                    : {
                                        backgroundColor: "#fff",
                                        border: "1px solid #5EC98B ",
                                        color: "#5EC98B",
                                      }
                                }
                                onClick={() => handleClick(item.id)}
                              >
                                {invoice_confirmed
                                  ? "Платеж потвержден"
                                  : "Потвердить платеж"}
                              </button>
                            )}
                          </td> */}
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <a href="#top" title="Go to top" className="backTop">
          <img src={blueStroke} alt="back to top" />
        </a>
      </div>
    </div>
  );
}
