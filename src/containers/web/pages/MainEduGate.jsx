import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';
import { Link } from 'react-router-dom';
import Footer from '../footer/footer';
import '../../../style/css/MainEduGate.css';

import chat_icon from '../../../assets/icon/chat.svg';
import univer_icon from '../../../assets/icon/univer.svg';
import country_icon from '../../../assets/icon/country.svg';
import univer_pic from "../../../assets/images/univer.jpg"
import icon1 from '../../../assets/icon/icon1.svg';
import icon2 from '../../../assets/icon/icon2.svg';
import icon3 from '../../../assets/icon/icon3.svg';
import icon4 from '../../../assets/icon/icon4.svg';
import icon5 from '../../../assets/icon/icon5.svg';
import icon6 from '../../../assets/icon/icon6.svg';
import star1 from '../../../assets/icons/star1.svg';
import star2 from '../../../assets/icons/star2.svg';
import star3 from '../../../assets/icons/star3.svg';
import star4 from '../../../assets/icons/star4.svg';
import star5 from '../../../assets/icons/star5.svg';
import Axios from '../../../utils/axios';
import SwiperCore, { Pagination, Navigation } from 'swiper/core';
import Navbar from './Navbar';
import { useHistory } from 'react-router';

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

// import data json
const cardData = require('../json/card.json');
const datafakultet = require('../json/topFakultet.json');
const dataSwipper = require('../json/swipper.json');

const MainEduGate = () => {
  const selector = useSelector((state) => state);
  const [userId, setUserId] = useState();
  //console.log(selector);

  const history = useHistory();
  const [change1, setChange1] = useState('');
  const [change2, setChange2] = useState('');
  const [change3, setChange3] = useState('');
  const [serach, setSearch] = useState(false);
  const [universities, setUniversities] = useState([]);
  const [dataFilter, setdataFilter] = useState([]);
  const [filterMajors, setFilterMajors] = useState([]);
  const [filterCountry, setFilterCountry] = useState([]);
  const [filterDegree, setFilterDegree] = useState([]);

  const fetchUniversities = async () => {
    try {
      const data = await Axios.get('/university/university/');
      const { results } = data.data;
      //console.log(results);
      if (data.status === 200) {
        setUniversities(results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const univerMajor = async () => {
    try{
      const data1 = await Axios.get('/university/major/');
      const majors = data1.data.results;
      if (data1.status === 200) {
        setFilterMajors(majors)
      }
    } catch(err){
      console.log(err)
    }
  }
  const univerCountry = async () => {
    try{
      const data2 = await Axios.get('/common/country/');
      const countrys = data2.data.results;
      if (data2.status === 200) {
        setFilterCountry(countrys)
      }
    } catch(err){
      console.log(err)
    }
  }
  const univerDegree = async () => {
    try{
      const data3 = await Axios.get('/university/degree/');
      const degrees = data3.data.results;
      if (data3.status === 200) {
        setFilterDegree(degrees)
      }
    } catch(err){
      console.log(err)
    }
  }
  
  const filterUniver = async () => {
    try {
      const data = await Axios.get(`/university/university/?country_id=${change1}&degree_id=${change2}&major_id=${change3}`);
      const { results } = data.data;
      if (data.status === 200) {
        setdataFilter(results);
        setSearch(true);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const setFavourite = async (univerId) => {
    try {
      const data = await Axios.post(
        '/enrollee/enrollee-user-favorite-university/',
        {
          university: univerId,
          enrollee_user: userId,
        }
      );
      //console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  const handler = (univerId) => {
    //console.log(univerId);
    setFavourite(univerId).then(() => history.push(`/university/${univerId}`));
  };

  const [star, setStar] = useState(false)

  const handlestar = () =>{
    setStar(!star)
  }

  useEffect(() => {
    fetchUniversities();
    if (selector.payload.payload) {
      const { payload } = selector?.payload;
      const  userId = payload?.data?.id;
      setUserId(userId);
    }
  }, []);

  useEffect(()=>{
    univerMajor();
    univerDegree();
    univerCountry();
  }, [])

  return (
    <>
      <div className="n1">
        <Navbar />
      </div>

      <div className="mainEduGate" id="main">
        <div className="header" id="heaer">
          <h2>Выберите свой университет вместе с Education Gateway</h2>
          <h3>
            Education Gateway помогает абитуриентам найти свое направление в
            выборе профессии и поступить в престижные ВУЗы на территории СНГ
          </h3>
          <div className="listLvl">
            <p>
              <div className="circleList"></div> Бакалаврият
            </p>
            <p>
              <div className="circleList"></div> Магистратура
            </p>
            <p>
              <div className="circleList"></div> Аспирантура
            </p>
            <p>
              <div className="circleList"></div> Докторантура
            </p>
          </div>
          <Link to="/konsultatsya" className="freeConsult">Бесплатная косультация</Link>
          <div className="chat">
            <h4>Найти Университет</h4>
            <img src={chat_icon} alt="" />
          </div>
          <div className="filter">
            <div className="dropDwn">
              <select onChange={(event) => setChange1(event.target.value)}>
                <option value="">Страна</option>
                {filterCountry.map((m) =>{
                  return(
                    <option value={m.id}>{m.name}</option>
                  )
                })}
              </select>
            </div>
            <div className="dropDwn">
              <select onChange={(event) => setChange2(event.target.value)}>
              <option value="">Степень</option>
                {filterDegree.map((m) =>{
                  return(
                    <option value={m.id}>{m.title}</option>
                  )
                })}
              </select>
            </div>
            <div className="dropDwn">
              <select onChange={(event) => setChange3(event.target.value)}>
                <option value="">Направления</option>
                {filterMajors.map((m) =>{
                  return(
                    <option value={m.id}>{m.name}</option>
                  )
                })}
              </select>
            </div>

            <div className="dropSearch" onClick={filterUniver}>
              <svg
                width="28"
                height="29"
                viewBox="0 0 28 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="13.6879"
                  cy="13.6311"
                  rx="11.9847"
                  ry="11.9407"
                  stroke="#5C7C8A"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M22.0234 22.5566L26.7221 27.2259"
                  stroke="#5C7C8A"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          {/* end filter */}
        </div>
        {/* end header */}

        {/* resultBlock */}
        {serach === true ? dataFilter.length === 0 
          ? 
          <div className="resultBlock">
            <h5>Результаты поиска 0</h5>
          </div> 
          :
          <div className="resultBlock">
            <h5>Результаты поиска {dataFilter.length}</h5>
            <div className="result">
              {/* card */}
              {dataFilter.map((x) => {
                  return (
                    <div className="card">
                      <img onClick={() => handler(x.id)} src={x.images.length === 0 ? univer_pic : x.images[0].image.toString() } alt="" />
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M11.1043 2.17701L12.9317 5.82776C13.1108 6.18616 13.4565 6.43467 13.8573 6.49218L17.9453 7.08062C18.9554 7.22644 19.3573 8.45055 18.6263 9.15194L15.6702 11.9924C15.3797 12.2718 15.2474 12.6733 15.3162 13.0676L16.0138 17.0778C16.1856 18.0698 15.1298 18.8267 14.227 18.3574L10.5732 16.4627C10.215 16.2768 9.78602 16.2768 9.42679 16.4627L5.773 18.3574C4.87023 18.8267 3.81439 18.0698 3.98724 17.0778L4.68385 13.0676C4.75257 12.6733 4.62033 12.2718 4.32982 11.9924L1.37368 9.15194C0.642715 8.45055 1.04464 7.22644 2.05466 7.08062L6.14265 6.49218C6.54354 6.43467 6.89028 6.18616 7.06937 5.82776L8.89574 2.17701C9.34765 1.27433 10.6523 1.27433 11.1043 2.17701Z"
                          stroke="#F2F2F2"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <h1 onClick={() => handler(x.id)}>{x.name}</h1>
                      {
                        x.description.length > 100 ?
                            <p onClick={() => handler(x.id)}>{x.description.substring(0, 100)}...</p>
                          :
                            <p onClick={() => handler(x.id)}>{x.description}</p>
                      }
                      <h2 onClick={() => handler(x.id)}>
                        Рейтинг:{' '}
                        <span>
                          {x.rating} место {/* // ! {x.ratingCountry} */}
                        </span>
                      </h2>
                      <h3 onClick={() => handler(x.id)}>Качество обучения: 
                        <img src={
                            x.education_quality === 1 ? star1 
                            : x.education_quality === 2 ? star2 
                            : x.education_quality === 3 ? star3
                            : x.education_quality === 4 ? star4
                            : star5 
                        } alt="" />
                      </h3>
                      <h4 onClick={() => handler(x.id)}>
                        Цена за один год: <span>${x.living_price_per_annum}</span>
                      </h4>
                    </div>
                  );
              })}
              {/* end card */}
            </div>
            {/* end result */}
          </div>
         : 
          ''
        }
        {/* end resultBlock */}

        {/* workBlock */}
        <div id="howItWork" className="workBlock">
          <h4>Как мы работаем</h4>
          <div className="weareWork">
            {/* card */}
            <div className="card">
              <div className="cardBack">
                <div>
                  <img src={icon1} alt="" />
                </div>
                <p>Ищите программу и университет</p>
              </div>
            </div>
            {/* card */}
            <div className="card">
              <div className="cardBack">
                <div>
                  <img src={icon2} alt="" />
                </div>
                <p>Регистрируетесь на нашем сайте</p>
              </div>
            </div>
            {/* card */}
            <div className="card">
              <div className="cardBack">
                <div>
                  <img src={icon3} alt="" />
                </div>
                <p>Заполняете анкету и подаете документы</p>
              </div>
            </div>
            {/* card */}
            <div className="card">
              <div className="cardBack">
                <div>
                  <img src={icon4} alt="" />
                </div>
                <p>Получаете ответ от Университета</p>
              </div>
            </div>
            {/* card */}
            <div className="card">
              <div className="cardBack">
                <div>
                  <img src={icon5} alt="" />
                </div>
                <p>Мы отправляем ваши документы</p>
              </div>
            </div>
            {/* card */}
            <div className="card">
              <div className="cardBack">
                <div>
                  <img src={icon6} alt="" />
                </div>
                <p>Оплачиваете за наши услуги</p>
              </div>
            </div>
          </div>
        </div>
        {/* end workBlock */}

        {/* resultBlock */}
        <div className="resultBlock" id="university">
          <h5>Самые популярные Университетыа</h5>
          <div className="result">
            {/* card */}
            {universities.map((item) => {
              console.log(item);
              const {
                id,
                name,
                description,
                education_quality,
                rating,
                living_price_per_annum,
                city,
              } = item;
              return (
                <div className="card">
                  <img onClick={() => handler(id)} src={item.images.length === 0 ? univer_pic : item.images[0].image.toString() } alt="" />
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    //onClick={handlestar}
                  >
                    <path
                      //fill={star === true ? "yellow" : ""}
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.1043 2.17701L12.9317 5.82776C13.1108 6.18616 13.4565 6.43467 13.8573 6.49218L17.9453 7.08062C18.9554 7.22644 19.3573 8.45055 18.6263 9.15194L15.6702 11.9924C15.3797 12.2718 15.2474 12.6733 15.3162 13.0676L16.0138 17.0778C16.1856 18.0698 15.1298 18.8267 14.227 18.3574L10.5732 16.4627C10.215 16.2768 9.78602 16.2768 9.42679 16.4627L5.773 18.3574C4.87023 18.8267 3.81439 18.0698 3.98724 17.0778L4.68385 13.0676C4.75257 12.6733 4.62033 12.2718 4.32982 11.9924L1.37368 9.15194C0.642715 8.45055 1.04464 7.22644 2.05466 7.08062L6.14265 6.49218C6.54354 6.43467 6.89028 6.18616 7.06937 5.82776L8.89574 2.17701C9.34765 1.27433 10.6523 1.27433 11.1043 2.17701Z"
                      stroke="#F2F2F2"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <h1 onClick={() => handler(id)}>{name}</h1>
                  {
                    description.length > 100 ?
                        <p onClick={() => handler(id)}>{description.substring(0, 100)}...</p>
                      :
                        <p onClick={() => handler(id)}>{description}</p>
                  }


                  <h2 onClick={() => handler(id)}>
                    Рейтинг:{' '}
                    <span>
                      {rating} место {city.name}
                    </span>
                  </h2>
                  <h3 onClick={() => handler(id)}>Качество обучения: 
                    <img className="star_image" src={
                        education_quality === 1 ? star1 
                        : education_quality === 2 ? star2 
                        : education_quality === 3 ? star3
                        : education_quality === 4 ? star4
                        : star5 
                    } alt="" />
                  </h3>
                  <h4 onClick={() => handler(id)}>
                    Цена за один год: <span>${living_price_per_annum}</span>
                  </h4>
                </div>
              );
            })}
            {/* end card */}
          </div>
          {/* end result */}
        </div>
        {/* end resultBlock */}

        {/* top fakultet */}
        <div className="topFacultetBlock">
          <h4>Самые популярные факультеты</h4>
          <div className="topFacultet">
            {datafakultet.map((a) => {
              return (
                <div className="card">
                  <img src={a.img} alt="" />
                  <span></span>
                  <p>{a.name}</p>
                </div>
              );
            })}
          </div>
        </div>
        {/* end top fakultet */}

        {/* about block */}
        <div className="aboutBlock">
          <h5>О нас</h5>
          <div className="aboutUs">
            {/*  */}
            <div className="cardAbout">
              <h1>250+</h1>
              <h4>Филиали</h4>
              <p>
                Education Gateway сотрудничает с более 250 филиали с
                разных уголков мира{' '}
              </p>
            </div>
            {/*  */}
            {/*  */}
            <div className="cardAbout">
              <h1>{filterCountry.length} +</h1>
              <h4>Страны партнёры</h4>
              <p>
                Education Gateway сотрудничает с более {filterCountry.length} странами с
                разных уголков мира{' '}
              </p>
            </div>
            {/*  */}
            {/*  */}
            <div className="cardAbout">
              <h1>{universities.length} +</h1>
              <h4>Университеты партнёры</h4>
              <p>
                Education Gateway сотрудничает с более {universities.length} университетами с
                разных уголков мира{' '}
              </p>
            </div>
            {/*  */}
          </div>
        </div>
        {/* end about block */}

        {/* swipper block */}
        <div className="swipperBlock">
          <h4>Что говорят наши студенты?</h4>
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            slidesPerGroup={1}
            navigation={true}
            className="mySwiper"
            pagination={{
              clickable: true,
            }}
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
              425: {
                slidesPerView: 1.2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
          >
            <div>
              {dataSwipper.map((w) => {
                return (
                  <SwiperSlide>
                    <div className="card">
                      <div className="top">
                        <img src={w.img} alt="" />
                        <div>
                          <h1>{w.fullName}</h1>
                          <h2>
                            {w.lvl} по {w.facultet}
                          </h2>
                          <h3>{w.universtiy}</h3>
                        </div>
                      </div>
                      <p>{w.title}</p>
                    </div>
                  </SwiperSlide>
                );
              })}
            </div>
          </Swiper>
        </div>
        {/* end swipper block */}

        {/* footer */}
        <Footer />
        {/* footer */}
      </div>
    </>
  );
};

export default MainEduGate
