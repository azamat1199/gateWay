import React, { Component, useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import GoogleMapReact from "google-map-react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper/core";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import Universitet_pic from "../../../assets/images/universitet_pic.jpg";
import closeFicG from "../../../assets/icon/close.svg";
import "../../../style/css/singlepage.css";
import { useHistory, useParams } from "react-router";
import Axios from "../../../utils/axios";
import { useSelector } from "react-redux";
import Navbar from "../pages/Navbar";
import { Link } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

SwiperCore.use([Pagination]);

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const dataT = require("../json/data_univer.json");

function SinglePage(props) {
  const [openy, setOpeny] = React.useState(false);
  const [galId, setGalId] = React.useState(0);
  const [m_img, setM_img] = React.useState(null);

  const handleClosey = () => {
    setOpeny(false);
  };
  const handleOpeny = (index) => {
    setM_img(univer.images[index].image);
    setTimeout(() => {
      setOpeny(true);
    }, 500);
  };
  const selector = useSelector((state) => state);
  const history = useHistory();
  const [data, setData] = useState(dataT);
  const params = useParams();
  const [univer, setUniver] = useState({
    id: "",
    name: "",
    location: "",
    description: "",
    founding_year: "",
    city: {
      id: "",
      name: "",
      country: {
        id: "",
        name: "",
      },
    },
    motto: "",
    rating: "",
    rating_source: "",
    education_quality: [],
    bachelor_degree_fee_per_annum: "",
    masters_degree_fee_per_annum: "",
    living_price_per_annum: "",
    faculties: [],
    images: [],
  });

  const {
    name,
    city,
    rating,
    living_price_per_annum,
    images,
    location,
    description,
    faculties,
    masters_degree_fee_per_annum,
    bachelor_degree_fee_per_annum,
  } = univer;

  const lat = 41.31082388091818;
  const lng = 69.796142578125;
  // const lat = location.split(",")[0]
  // const lng = location.split(",")[1]

  console.log(location.split(",")[1]);
  props = {
    center: {
      lat: location.split(",")[0],
      lng: location.split(",")[1],
      // lat: 41.31082388091818,
      // lng: 69.796142578125
    },
    zoom: 11,
  };

  const fetchUniversityById = async () => {
    try {
      const { data } = await Axios.get(`/university/${params.id}/`);
      localStorage.setItem("univerId", params.id);
      setUniver(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUniversityById();
  }, []);
  return (
    <React.Fragment>
      <Navbar />
      <div className="single_page">
        <div className="sp_up">
          <div className="sp_img">
            <img
              src={
                images.length === 0
                  ? Universitet_pic
                  : images[0].image.toString()
              }
              alt=""
              className={images.length === 0 ? "" : "u_img"}
              width="100%"
            />
          </div>
          <div className="sp_title">
            <div>
              <h1>{name}</h1>
            </div>
            <div>
              <button
                onClick={() =>
                  selector.payload.payload
                    ? history.push("/requisition")
                    : history.push("/login")
                }
              >
                Подать
              </button>
            </div>
          </div>
        </div>
        <div className="sp_navbar">
          <a href="#opisaniya">Описание</a>
          <a href="#lokatsya">Локация</a>
          <a href="#postupleniya">Поступление</a>
          <a href="#galereya">Галерея</a>
        </div>
        <div className="sp_main">
          <div className="sp_main1 sp1">
            <div className="sp_main_left">
              <div className="sp_table">
                <table>
                  <tr>
                    <td>Рейтинг</td>
                    <td>{rating}</td>
                  </tr>
                  <tr>
                    <td>Страна</td>
                    <td>{city.country.name}</td>
                  </tr>
                  <tr>
                    <td>Город</td>
                    <td>{city.name}</td>
                  </tr>
                  <tr>
                    <td>Бакалавриат</td>
                    <td>${bachelor_degree_fee_per_annum}/год</td>
                  </tr>
                  <tr>
                    <td>Магистратура</td>
                    <td>${masters_degree_fee_per_annum}/год</td>
                  </tr>
                  <tr>
                    <td>Цена прожив -ния</td>
                    <td>${living_price_per_annum}/год</td>
                  </tr>
                </table>
              </div>
              <div className="sp_map" id="lokatsya">
                {/* <GoogleMapReact
                  // bootstrapURLKeys={{ key: "AIzaSyCIuhJElVEhGVPYptJbkrWxEy4lKzEoOA8" }}
                  defaultCenter={props.center}
                  defaultZoom={props.zoom}
                >
                  <AnyReactComponent
                    // lat={45.46016}
                    // lng={9.19457}
                    lat={lat}
                    lng={lng}
                    text=""
                  />
                </GoogleMapReact> */}
              </div>
            </div>
            <div className="sp_main1_right" id="opisaniya">
              <h1>{description}</h1>
            </div>
          </div>
          <div className="sp_main1 sp3">
            <div className="sp_main_left">
              <p>Мировой рейтинг</p>
              <ResponsiveContainer width="80%" height={300}>
                <AreaChart
                  data={data}
                  margin={{ top: 30, right: 0, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="kirish" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00587F" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#00587F" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <Tooltip />
                  <CartesianGrid vertical="" strokeDasharray="10 10" />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#00587F"
                    strokeWidth="3"
                    fillOpacity={1}
                    fill="url(#kirish)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="sp_main2_right" id="postupleniya">
              <h1>Процесс поступления</h1>
              <h2>
                Полное курирование поступления — от 789 USD Поступление в
                университет – важный и ответственный шаг в жизни каждого.
                Позвольте профессионалам быть рядом на каждом этапе поступления.
              </h2>
            </div>
          </div>

          {/* <<<<<<< HEAD */}
          <div className="sp_main1 sp4">
            <div></div>
            <div className="sp_main2_right">
              <h1>Специалисты образовательного агентства Gateway Education:</h1>
              <ul>
                <li>
                  Проконсультируют вас по вопросам образования за рубежом;
                </li>
                <li>Подберут университеты под ваш профайл и бюджет;</li>
                <li>Подготовят необходимый комплект документов;</li>
                <li>Отправят заявки в учебные заведения;</li>
                <li>Подадут документы на внутренние стипендии вузов;</li>
                <li>Помогут оформить студенческую визу.</li>
                <li>
                  Мы организуем Ваше поступление за границу: для этого заполните
                  заявку, и мы свяжемся с Вами в ближайшее время.
                </li>
              </ul>
            </div>
          </div>
          {/* =======
                </div>
              </div>
              <div className="sp_main1_right" id="opisaniya">
                <h1>
                {description}
                </h1>
              </div>
            </div>
            <div className="sp_main1 sp3">
              <div className="sp_main_left">
                <p>Мировой рейтинг</p>
              <ResponsiveContainer width="80%" height={300}>
                <AreaChart data={data}
                margin={{ top: 30, right: 0, left: 0, bottom: 0 }} >
                <defs>
                <linearGradient id="kirish" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00587F" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#00587F" stopOpacity={0} />
                </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <Tooltip />
                <CartesianGrid vertical="" strokeDasharray="10 10"/>
                <Area type="monotone" dataKey="value"
                stroke="#00587F" strokeWidth="3" fillOpacity={1} fill="url(#kirish)"
                />
                </AreaChart>
              </ResponsiveContainer>
              </div>
              <div className="sp_main2_right" id="postupleniya">
                <h1>Процесс поступления</h1>
                <h2>
                  Полное курирование поступления — от {bachelor_degree_fee_per_annum} USD
                  Поступление в университет – важный и ответственный шаг в жизни каждого. Позвольте профессионалам быть рядом на каждом этапе поступления.
                  </h2>
              </div>
            </div>
            
            <div className="sp_main1 sp4">
              <div></div>
              <div className="sp_main2_right">
                <h1>Специалисты образовательного агентства Gateway Education:</h1>
                <ul>
                  <li>Проконсультируют вас по вопросам образования за рубежом;</li>
                  <li>Подберут университеты под ваш профайл и бюджет;</li>
                  <li>Подготовят необходимый комплект документов;</li>
                  <li>Отправят заявки в учебные заведения;</li>
                  <li>Подадут документы на внутренние стипендии вузов;</li>
                  <li>Помогут оформить студенческую визу.</li>
                  <li>Мы организуем Ваше поступление за границу: для этого заполните заявку, и мы свяжемся с Вами в ближайшее время.</li>
                </ul>
              </div>
            </div>
>>>>>>> 629f2c554f256a3ad25abc707e3a5ba3ad99ffec */}

          <div className="sp_main2 sp2">
            <div></div>
            <div>
              <h1>Факультеты</h1>
              <div className="sp_table sp2_table">
                <table>
                  <thead>
                    <tr>
                      <th>Факультет</th>
                      <th>Квоты</th>
                      <th>Бюджет</th>
                      <th>Тип обучения</th>
                      <th>Стоимость услуги</th>
                      <th>Принятие</th>
                    </tr>
                  </thead>
                  <tbody>
                    {faculties.map((f) => {
                      return (
                        <tr>
                          <td>{f.name}</td>
                          <td>{f.quota} </td>
                          <td>{f.education_fee}</td>
                          <td>
                            {f.education_type === "full_time"
                              ? "Полный занятость"
                              : null}
                            {f.education_type === "part_time"
                              ? "Неполная занятость"
                              : null}
                          </td>
                          <td>{f.service_price} $</td>
                          <td>
                            {f.status === "open" ? "Открыть" : null}
                            {f.status === "close" ? "Закрыто" : null}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="sp_main1 sp5">
            <div className="sp_main_left"></div>
            <div className="sp_main3_right">
              <button
                onClick={() =>
                  selector.payload.payload
                    ? history.push("/requisition")
                    : history.push("/login")
                }
              >
                Подать документы
              </button>
              <Link to="/konsultatsya">Консультация</Link>
            </div>
          </div>
          <div className="sp_swiper" id="galereya">
            <Swiper
              slidesPerView={3.5}
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                10: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                375: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                425: {
                  slidesPerView: 1.5,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2.5,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 3.5,
                  spaceBetween: 30,
                },
                1440: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
              }}
              className="mySwiper"
            >
              {images.map((i) => {
                return (
                  <SwiperSlide>
                    <img
                      src={i.image}
                      width="100%"
                      onClick={() => {
                        setM_img(i.image);
                        setTimeout(() => {
                          setOpeny(true);
                        }, 500);
                      }}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          {/*  */}
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className="class_modal"
            open={openy}
            onClose={handleClosey}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
            // onChange={(e) => setAddDescription(e.target.value)}
          >
            <Fade in={openy}>
              <div className="PubModSinPage">
                <div className="close_btn">
                  <img onClick={handleClosey} src={closeFicG} alt="" />
                </div>
                <div className="univerImgGal">
                  <img src={m_img ? m_img : null} alt="" />
                </div>
              </div>
            </Fade>
          </Modal>
          {/*  */}
        </div>
      </div>
    </React.Fragment>
  );
}

export default SinglePage;
