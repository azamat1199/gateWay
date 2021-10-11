import React, { useRef, useState,useEffect } from 'react';
// SWIPPER
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import SwiperCore, {
    Pagination,Navigation
  } from 'swiper/core';
  import search_icon from '../../../assets/icon/search.svg';
  import settings from '../../../assets/icon/Filter.svg';

// import css
import "../../../style/css/universitet.css"  
import StudentSidebar from './SidebarStudent';
import { Empty ,Button, Spin} from 'antd';
import EmptyPic from '../../../assets/icon/empty.svg'
import { useHistory } from 'react-router';
import Axios from '../../../utils/axios'
SwiperCore.use([Pagination]);

const dataCard = require("../json/card.json")

const Universitet = () => {
const [universities,setUniversities] = useState([])
const history = useHistory()    
const [countries,setCountries] = useState([])
const [loading,setLoading] = useState(false)
const [degree,setDegree] = useState([])
const [major,setMajor] = useState([])
const univerId = localStorage.getItem('univerId')
const [fixEnd, setFix] = useState(false);
const [searchedData,setSearchedData] = useState({
  country:'',
  degree:'',
  major:''
})
const [filteredData,setFilteredData] = useState([])

console.log(univerId);

const fetchSelectedUniver = async ()=>{
    try {
        const res = await Axios.get('enroll/enroll-user-favorite-university/')
        console.log(res);
        const {status} = res
        const {results} = res.data
        console.log(results);
        if(status === 200) {
            
            const newData = []
            for (let x=0; x < results.length; x++) {
            newData.push(results[x].university)
            console.log(results[x].university);
           }
           setUniversities(newData)
            console.log(newData);
        }
    } catch (error) {
        console.log(error.response);     
    }
}


const fetchCountry = async()=>{
  try {
      const res = await Axios.get("/common/country/")
      const {status} = res
      const {results}  = res.data
      console.log(results);
      if(status === 200){
        setCountries(results)
      }
      console.log(res);
  } catch (error) {
      console.log(error);
  }
}


const fetchDegree = async ()=>{
  try {
      const res = await Axios.get("/university/degree/")
      const {status} = res
      const {results} = res.data
      if(status === 200){
        setDegree(results)
      }
      console.log(results);
  } catch (error) {
    console.log(error);
  }
}


const fetchMajor = async()=>{
  try {
    const res = await Axios.get("/university/major/")
    console.log(res);
    const{status} = res
    const {results} = res.data
    if(status === 200){
      setMajor(results)
    }
  } catch (error) {
    console.log(error);
  }
}

const handleSelect = (e)=>{
console.log(e.target.value);
const {name,value} = e.target
setSearchedData(state=>({...state,[name]:value}))
}

const onSubmit = async(e)=>{
  e.preventDefault()
  setLoading(true)
  try {
     const res = await Axios.get(`/university/university/?country_id=${searchedData.country}&degree_id=${searchedData.degree}&major_id=${searchedData.major}`)
     console.log(res);
     const {status} = res
     const {results} = res.data
     if(status === 200){
       setFilteredData(results)
     }
     setLoading(false)
     setFix(!fixEnd)
  } catch (error) {
    console.log(error);
    setLoading(false)
  }
}
useEffect(()=>{
  fetchCountry()
},[])
useEffect(()=>{
    fetchSelectedUniver()
    fetchCountry()
    fetchDegree()
    fetchMajor()
},[])
console.log(searchedData);
console.log(filteredData);
    return ( 
        <>
        <StudentSidebar/>
        <div className="unniversitetBlock ">
            <div className="top">
                <h1>Ваши университеты</h1>
                <div>
                    <a src="https://picsum.photos/70" alt="" />
                    <h2>Nargiza Akhmedova <span>IT Specialist</span></h2>
                </div>
            </div>
         <div className="bottom">
          <div className="settSearch">
            <div className="searchUniv">
              <img src={search_icon} alt="" />
              <input type="text" placeholder="Поиск университетов" />
            </div>
            <button
              onClick={() => {
                setFix(!fixEnd);
              }}
              className="settingsUniver"
            >
              <img src={settings} alt="" />
            </button>
          </div>
          {
            fixEnd === true ? (
              <div className="FilterFix">
                <div
                  className="fixLeft"
                  onClick={() => {
                    setFix(!fixEnd);
                  }}
                ></div>
                <div className="FilterUniver">
                  <h4>Фильтры</h4>
                  <p>Выберите страну</p>
                  <div className="selectCountry">
                    <select onChange={handleSelect} name="country">
                       {countries.map(item => {
                         const {name,id} = item
                         return(
                           <option key={id} value={id}>{name}</option>
                         )
                       })}
                    </select>
                  </div>
                  <p>Выберите степень</p>
                  <div className="selectCountry">
                    <select onChange={handleSelect} name="degree">
                      {degree.map(item=>{
                        const {id,title} = item
                        return(
                          <option key={id} value={id}>{title}</option>
                        )
                      })}
                    </select>
                  </div>
                  <p>Выберите направление</p>
                  <div className="selectCountry">
                    <select onChange={handleSelect} name="major" >
                     {major.map(item=>{
                       const {id,name} = item;
                       return(
                         <option key={id} value={id}>{name}</option>
                       )
                     })}
                    </select>
                  </div>
                  <button  style={
              loading ? { background: '#8cb4c5' } : { background: '#00587F' }
            } onClick={(e)=>onSubmit(e)}>
                  {loading ? (
              <>
                <Spin size="middle" spinning={loading} />
              </>
            ) : (
              'Применить'
            )}
                    </button>
                </div>
                {/* end FilterUniver */}
              </div>
            ) : null
          }
             
                <h1 className="result" style={filteredData.length > 0 ?{display:'block'}:{display:"none"}}>Результаты поиска  ({filteredData.length}-университетов найдено )</h1>
                <div className="cardSwipperBlock">
                  
                    <Swiper 
                        
                        slidesPerView={3.3} 
                        spaceBetween={20} 
                        slidesPerGroup={1} 
                        className="mySwiper"
                        breakpoints={{
                            "10": {
                            "slidesPerView": 1,
                            "spaceBetween": 10
                            },
                            "320": {
                            "slidesPerView": 1,
                            "spaceBetween": 10
                            },
                            "375": {
                            "slidesPerView": 1,
                            "spaceBetween": 10
                            },
                            "390": {
                            "slidesPerView": 1,
                            "spaceBetween": 20
                            },
                            "425": {
                            "slidesPerView": 1.2,
                            "spaceBetween": 20
                            },
                            "500": {
                            "slidesPerView": 1.4,
                            "spaceBetween": 20
                            },
                            "768": {
                            "slidesPerView": 2.2,
                            "spaceBetween": 20
                            },
                            "1024": {
                            "slidesPerView": 2.2,
                            "spaceBetween": 20
                            },
                            "1100": {
                            "slidesPerView": 2,
                            "spaceBetween": 5
                            },
                            "1200": {
                            "slidesPerView": 2.18,
                            "spaceBetween": 5
                            },
                            "1280": {
                            "slidesPerView": 2.3,
                            "spaceBetween": 10
                            },
                            "1400": {
                            "slidesPerView": 2.5,
                            "spaceBetween": 10
                            },
                            "1500": {
                            "slidesPerView": 2.5,
                            "spaceBetween": 10
                            },
                            "1600": {
                            "slidesPerView": 3.2,
                            "spaceBetween": 30
                            }
                        }}
                        >
                           {filteredData.length > 0 ?  
                // <div className="cardSwipperBlock">
                    filteredData.map( (x) => {
                                console.log(x);
                                const  {name,description,id} = x
                                return(
                                    <SwiperSlide>
                                    <div onClick={()=>history.push(`/university/${id}`)} className="card">
                                        <img src="https://universegroup.uz/wp-content/uploads/2020/02/harvard.jpg" alt="" />
                                        <h1>{name}</h1>
                                        <p>{description.length > 170 ? description.slice(0,170) + '...  Read More': description}</p>
                                        <div className="buttonContainer">
                                           <button onClick={()=> history.push('/requisition')}>Подать заявку</button>
                                        </div>
                                    </div>
                                    </SwiperSlide>
                                )
                            } )
                          
                         : <Empty 
                 image={EmptyPic}
                 imageStyle={{
                    height: 309,
                  }}
                 description={
                    <span style={{fontWeight:"600",fontSize:"26px"}}>
                     У вас пока не имеется выбранных университетов
                    </span>
                  }
                 
                >
                {/* <Button  style={{height:"64px",width:"600px",background:"#00587F",color:"#fff",borderRadius:"10px",fontSize:"20px"}} onClick={()=> history.push('/')}>Найти университет</Button> */}
                </Empty> }
                        {/* {
                            universities.map( (x) => {
                                console.log(x);
                                const  {name,description,rating,location,living_price_per_annum,bachelor_degree_fee_per_annum} = x
                                return(
                                    <SwiperSlide>
                                    <div className="card">
                                        <img src="https://universegroup.uz/wp-content/uploads/2020/02/harvard.jpg" alt="" />
                                        <h1>{name}</h1>
                                        <p>{description}</p>
                                        <h3>Рейтинг: <span>{rating} место  ({location} Ratings)</span></h3>
                                        <h4>Качество обучения:</h4>
                                        <h5>Цена за один год: <span>{bachelor_degree_fee_per_annum}</span></h5>
                                    </div>
                                    </SwiperSlide>
                                )
                            } )
                        } */}
                        
                    </Swiper>
                </div>
                <div className="document">
                    {/* <h1>Куда вы подали документы</h1> */}
                    {/* {
                        dataCard.slice(0, 1).map( (x) => {
                            return(
                                <div className="card">
                                    <img src={x.img} alt="" />
                                    <h1>{x.title1}</h1>
                                    <p>{x.title2}</p>
                                    <h3>Рейтинг: <span>{x.rating} место  ({x.ratingCountry} Ratings)</span></h3>
                                    <h4>Качество обучения:</h4>
                                    <h5>Цена за один год: <span>{x.price}</span></h5>
                                </div>
                            )
                        } )
                    } */}
                </div>
            </div>
        </div>
        </>
     );
}
 
export default Universitet;