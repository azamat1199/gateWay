import React, { Component, useEffect, useState } from "react";
import ManegerSidebar from "../ManagerSidebar";
import userpic from "../../../assets/icon/userpic.svg";
import download from "../../../assets/icon/download.svg";
import img from "../../../assets/icon/img.svg";
import Axios from "../../../utils/axios";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import Loader from "react-js-loader";
const M_glavny_id = () => {
  const [users, setUsers] = useState();
  const [faculty, setFaculty] = useState();
  const selector = useSelector((state) => state.payload.payload.data);
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const userList = async () => {
    try {
      const data = await Axios.get("applicant/list/");
      //   const { results } = data.data;
      setLoading((loading) => !loading);
      if (data.status === 200) {
        setUsers(data.data.results);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const nowDate = new Date();
  const yearNow=nowDate.getFullYear();
  const getFacultetId = async (id) => {
    try {
      const res = await Axios.get(`/university/university-faculty/${id}`);
      setFaculty(res.data.name);
    } catch (error) {}
  };
  useEffect(() => {
    userList();
  }, []);
  return (
    <React.Fragment>
      <ManegerSidebar />
      <div className="asos">
        <div className="up_nav n_up">
          <div className="single_h1">
            <h1 className="link_h1">Клиентский ввод </h1>{" "}
            <h3> {" > "}Информация</h3>
          </div>
          <div className="user_info">
            <img src={userpic} alt="" />
            <div>
              <h1>{selector.first_name} {selector.last_name}</h1>
              <h2>{selector.role}</h2>
            </div>
          </div>
        </div>
        <div className="singlepage">
          <div className="single_up">
            {users?.map((v, i) => {
              if (params.id == v.id) {
                return (
                  <div>
                    <div className="single_1">
                      <img src={img} alt="" />
                    </div>
                    <div className="single_2">
                      <h1>{v?.first_name}</h1>
                      <h2>{yearNow-v.birthday.slice(0,4)} лет, {v.city}, {v.citizenship}</h2>
                    </div>
                  </div>
                );
              }
            })}

            {/* <div>
              <div className="single_1">
                <img src={img} alt="" />
              </div>
              <div className="single_2">
        
              <h1>Наргиза Ахмедова</h1>
              <h2>22 лет, Фергана, Узбекистан</h2>
          
              </div>
            </div> */}
            <div>
              <a href="#">
                <img src={download} alt="" />
                Скачать PDF
              </a>
            </div>
          </div>
          {users?.map((v, i) => {
            if (params.id == v.id) {
              console.log(v, "userId");
              getFacultetId(v.major.faculty);
              return (
                loading ? (
                  <Loader
                    className="spinner2"
                    type="spinner-circle"
                    bgColor={"#FFFFFF"}
                    color={"#FFFFFF"}
                    size={80}
                  />
                ) :  (  <div className="single_down">
                  <h1>Ваши данные</h1>
                  <div className="single_info">
                    <div className="info_1">
                      <div>
                        <h1>Имя</h1>
                      </div>
                      <div>
                        <p>{v.first_name}</p>
                      </div>
                    </div>
                    <div className="info_1">
                      <div>
                        <h1>Фамилия</h1>
                      </div>
                      <div>
                        <p>{v.last_name}</p>
                      </div>
                    </div>
                    <div className="info_1">
                      <div>
                        <h1>Отчество</h1>
                      </div>
                      <div>
                        <p>{v.middle_name}</p>
                      </div>
                    </div>
                    <div className="info_1">
                      <div>
                        <h1>Университет</h1>
                      </div>
                      <div>
                        <p>{v.university}</p>
                      </div>
                    </div>
                    <div className="info_1">
                      <div>
                        <h1>Факультет</h1>
                      </div>
                      <div>
                        <p>{v.faculty}</p>
                      </div>
                    </div>
                    <div className="info_1">
                      <div>
                        <h1>Специальность</h1>
                      </div>
                      <div>
                        <p>{v?.sport_achievements}</p>
                      </div>
                    </div>
                    {/* <div className="info_1">
                      <div>
                        <h1>IELTS</h1>
                      </div>
                      <div>
                        <p>
                          {v?.english_level_type ? v.english_level_value : "no"}
                        </p>
                      </div>
                    </div> */}
                  </div>
                </div>)
              );
            }
            // else{
            // 	return <p>salom</p>
            // }
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default M_glavny_id;
