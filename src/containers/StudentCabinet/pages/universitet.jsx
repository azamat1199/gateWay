import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useSelector } from "react-redux";
import { Autocomplete } from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";
// SWIPPER
import closeImg from "../../../assets/icon/close2.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import SwiperCore, { Pagination, Navigation } from "swiper/core";
import search_icon from "../../../assets/icon/search.svg";
import settings from "../../../assets/icon/Filter.svg";
import Loader from "react-js-loader";
import avatar from "../../../assets/icon/Avatar.svg";
// import css
import "../../../style/css/universitet.css";
import StudentSidebar from "./SidebarStudent";
import EmptyPic from "../../../assets/icon/empty.svg";
import { useHistory } from "react-router";
import Axios from "../../../utils/axios";
SwiperCore.use([Pagination]);

const Universitet = () => {
  const selector = useSelector((state) => state);
  const { payload } = selector?.payload;
  const { data } = payload;
  const [favourites, setFavourites] = useState({
    id: "",
    description: "",
    images: [],
    name: "",
  });
  const { first_name, last_name } = data;
  const [universities, setUniversities] = useState([]);
  const history = useHistory();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [degree, setDegree] = useState([]);
  const [major, setMajor] = useState([]);
  const [univerId, setUniverId] = useState();
  const [fixEnd, setFix] = useState(false);
  const [searchedData, setSearchedData] = useState({
    country: "",
    degree: "",
    major: "",
  });

  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await Axios.get(
        `/university/?country=${searchedData.country}&degree=${searchedData.degree}&major=${searchedData.major}`
      );
      console.log(res);
      const { status } = res;
      const { results } = res.data;
      if (status === 200) {
        setFilteredData(results);
      }
      setLoading(false);
      setFix(!fixEnd);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  console.log(searchedData?.major?.toString());

  const fetchCountry = async () => {
    try {
      const res = await Axios.get("/company/country/?limit=1000");
      const { status, data } = res;
      console.log(res);
      if (status === 200) {
        const { results } = data;
        setCountries(results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDegree = async () => {
    try {
      const res = await Axios.get("/university/degree/");
      const { status } = res;
      const { results } = res.data;
      if (status === 200) {
        setDegree(results);
      }
      console.log(results);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMajor = async () => {
    try {
      const res = await Axios.get("/university/major/");
      console.log(res);
      const { status } = res;
      const { results } = res.data;
      if (status === 200) {
        setMajor(results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegion = (event, newValue) => {
    console.log(newValue);
    if (newValue?.id) {
      setSearchedData((state) => ({ ...state, country: newValue.id }));
    }
  };

  const handleMajor = (event, newValue) => {
    console.log(newValue);
    if (newValue?.id) {
      setSearchedData((state) => ({ ...state, major: newValue.id }));
      localStorage.setItem("majorId", newValue.id);
    }
  };

  const handleSelect = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setSearchedData((state) => ({ ...state, [name]: value }));
  };

  const handleDegree = (event, newValue) => {
    console.log(newValue);
    if (newValue?.id) {
      setSearchedData((state) => ({ ...state, degree: newValue.id }));
    }
  };

  const handleSearch = async (e) => {
    console.log(e.target.value);
    const { value } = e.target;
    if (value.length > 2) {
      setLoading(true);
      try {
        const res = await Axios.get(`/university/?search=${value} `);
        const { status } = res;
        const { results } = res.data;
        setFilteredData(results);
        console.log(res, "salom");
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };
  const fetchUserFavourite = async () => {
    setLoading(true);
    try {
      const res = await Axios.get("/applicant/chosen-university/");
      const { status, data } = res;
      if (status === 200) {
        const { results } = data;
        setLoading(true);
        try {
          const res = await Axios.get(
            `/university/${results[0]?.major?.faculty?.university?.id}`
          );
          const { status, data } = res;
          if (status === 200) {
            setFavourites(data);
          }
          console.log(res);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      }
      console.log(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const fetchUserUniver = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(`/university/${univerId}`);
      const { status, data } = res;
      if (status === 200) {
        const { results } = data;
        setUniverId(results);
      }
      console.log(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountry();
    fetchDegree();
    fetchMajor();
    fetchUserFavourite();
  }, []);
  useEffect(() => {
    fetchUserUniver();
  }, [univerId]);
  console.log(searchedData);
  console.log(favourites);
  return (
    <>
      <StudentSidebar />
      <div className="unniversitetBlock DNT_studentUniversitet">
        <div className="top">
          <h1>Ваши университеты</h1>
          <div>
            <img src={avatar} alt="userImage" />
            <h2>
              {first_name} {last_name} <span>Заявитель</span>
            </h2>
          </div>
        </div>
        <div className="bottom">
          <div className="settSearch">
            <div className="searchUniv">
              <img onClick={handleSearch} src={search_icon} alt="" />
              <input
                onKeyPress={() => setLoading(true)}
                onChange={(e) => handleSearch(e)}
                type="text"
                placeholder="Поиск университетов"
              />
            </div>
            <button
              onClick={() => {
                setFix(!fixEnd);
              }}
              className="settingsUniver"
            >
              {loading ? (
                <Loader
                  type="spinner-circle"
                  bgColor={"#FFFFFF"}
                  color={"#FFFFFF"}
                  size={60}
                />
              ) : (
                ""
              )}
              <img src={settings} alt="" />
            </button>
          </div>
          {/* // ! coment */}
          {/* // ! coment */}

          <div
            className="FilterFix"
            style={
              fixEnd
                ? { width: "100%" }
                : { width: "0", transition: "0.5s step-end" }
            }
          >
            <div
              className="fixLeft"
              onClick={() => {
                setFix(!fixEnd);
              }}
            ></div>
            <div
              className="FilterUniver"
              style={
                fixEnd
                  ? { transform: "translateX(0)", transition: "0.5s" }
                  : { transform: "translateX(100%)", transition: "0.5s" }
              }
            >
              <img
                src={closeImg}
                className="closeFilImg"
                onClick={() => {
                  setFix(!fixEnd);
                }}
                alt=""
              />
              <h4>Фильтры</h4>
              <div className="filterContainer">
                <div className="selectCountry">
                  <p>Выберите страну</p>
                  <Autocomplete
                    aria-required
                    onChange={handleRegion}
                    id="profayl_input"
                    options={countries}
                    getOptionLabel={(option) => (option ? option.name : "")}
                    style={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        placeholder="Выберите страну"
                        variant="outlined"
                      />
                    )}
                  />
                </div>
                <div className="selectCountry">
                  <p>Выберите степень</p>
                  <Autocomplete
                    aria-required
                    onChange={handleDegree}
                    id="profayl_input"
                    options={degree}
                    getOptionLabel={(option) => (option ? option.title : "")}
                    style={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        placeholder="Выберите степень"
                        variant="outlined"
                      />
                    )}
                  />
                </div>
                <div className="selectCountry">
                  <p>Выберите направление</p>
                  <Autocomplete
                    aria-required
                    onChange={handleMajor}
                    id="profayl_input"
                    options={major}
                    getOptionLabel={(option) => (option ? option.name : "")}
                    style={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        placeholder="Выберите направление"
                        variant="outlined"
                      />
                    )}
                  />
                </div>
              </div>
              <button
                className="filterButton"
                style={
                  loading
                    ? { background: "#8cb4c5" }
                    : { background: "#00587F" }
                }
                onClick={(e) => onSubmit(e)}
              >
                {loading ? (
                  <>
                    <Loader
                      type="spinner-circle"
                      bgColor={"#FFFFFF"}
                      color={"#FFFFFF"}
                      size={60}
                    />
                  </>
                ) : (
                  "Применить"
                )}
              </button>
            </div>
          </div>
          <h1
            className="result"
            style={
              filteredData.length > 0
                ? { display: "block" }
                : { display: "none" }
            }
          >
            Результаты поиска ({filteredData.length}-университетов найдено )
          </h1>

          <div className="cardSwipperBlock">
            <Swiper
              slidesPerView={3.3}
              spaceBetween={20}
              slidesPerGroup={1}
              className="mySwiper"
              breakpoints={{
                10: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                320: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                375: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                390: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                425: {
                  slidesPerView: 1.2,
                  spaceBetween: 20,
                },
                500: {
                  slidesPerView: 1.4,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2.2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 2.2,
                  spaceBetween: 20,
                },
                1100: {
                  slidesPerView: 2,
                  spaceBetween: 5,
                },
                1200: {
                  slidesPerView: 2.18,
                  spaceBetween: 5,
                },
                1280: {
                  slidesPerView: 2.3,
                  spaceBetween: 10,
                },
                1400: {
                  slidesPerView: 2.5,
                  spaceBetween: 10,
                },
                1500: {
                  slidesPerView: 2.5,
                  spaceBetween: 10,
                },
                1600: {
                  slidesPerView: 3.2,
                  spaceBetween: 30,
                },
              }}
            >
              {filteredData.length > 0 ? (
                // <div className="cardSwipperBlock">
                filteredData.map((x) => {
                  console.log(x);
                  const { name, description, id, images } = x;
                  return (
                    <SwiperSlide>
                      <div
                        onClick={() => history.push(`/university/${id}`)}
                        className="card"
                      >
                        <img
                          src={
                            images[0]?.image
                              ? images[0].image
                              : "https://www.princeton.edu//sites/default/files/images/2017/06/20060425_NassauHall_JJ_IMG_5973.jpg"
                          }
                          alt=""
                        />
                        <h1>{name}</h1>
                        <p>
                          {description.length > 100
                            ? description.slice(0, 100) + "...  Read More"
                            : description}
                        </p>
                        <div className="buttonContainer">
                          <button onClick={() => history.push("/requisition")}>
                            Подать заявку
                          </button>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })
              ) : favourites.id ? (
                <div
                  style={{ padding: "0 10px", marginTop: "0" }}
                  className="document"
                >
                  <h1 style={{ marginBottom: "0" }}>Куда вы подали документ</h1>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <div
                      // onClick={() =>
                      //   history.push(`/university/${favourites?.id}`)
                      // }
                      style={{ marginTop: "15px", cursor: "pointer" }}
                      className="card"
                    >
                      <img
                        src={
                          favourites?.images[0]?.image
                            ? favourites?.images[0].image
                            : "https://www.princeton.edu//sites/default/files/images/2017/06/20060425_NassauHall_JJ_IMG_5973.jpg"
                        }
                        alt=""
                      />
                      <h1>{favourites?.name}</h1>
                      <p>
                        {favourites?.description.length > 100
                          ? favourites?.description.slice(0, 100) + "..."
                          : favourites?.description}
                      </p>
                      <h4>Качество обучения:</h4>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column ",
                    alignItems: "center",
                  }}
                  className="emptyImgContainer"
                >
                  <img src={EmptyPic} style={{ height: "309px" }} />
                  <p style={{ fontSize: "22px", fontWeight: "600" }}>
                    У вас пока не имеется выбранных университетов
                  </p>
                </div>
              )}
            </Swiper>
          </div>
          {/* {favourites.id ? 
          <div style={{padding:'0 10px',marginTop:'0'}} className="document">
            <h1 style={{marginBottom:'0'}}>Куда вы подали документ</h1>
            <div style={{display:"flex",flexWrap:'wrap'}}>
                                <div
                                // onClick={() =>
                                //   history.push(`/university/${favourites?.id}`)
                                // }
                                 style={{marginTop:'15px',cursor:'pointer'}}
                                 className="card">
                                   <img
                                      src={
                                        favourites?.images[0]?.image
                                          ? favourites?.images[0].image
                                          : "https://www.princeton.edu//sites/default/files/images/2017/06/20060425_NassauHall_JJ_IMG_5973.jpg"
                                      }
                                      alt=""
                                    />
                                    <h1>{favourites?.name}</h1>
                                    <p>{favourites?.description.length > 100 ? favourites?.description.slice(0,100) + '...': favourites?.description}</p>
                                    <h4>Качество обучения:</h4>
                                </div>
            </div>
          </div>
          :
          ''
          } */}
        </div>
      </div>
    </>
  );
};

export default Universitet;
