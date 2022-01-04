import React, { Component, useEffect, useState } from "react";
import NotariusSidebar from "../NotariusSidebar";

import most from "../../../assets/images/most.png";
import { colors } from "@material-ui/core";
import { useParams } from "react-router";
import Axios from "../../../utils/axios";
import Loader from "react-js-loader";

const N_info_id = () => {
  const text = {
    t1: "Напишите здесь стандарты документов",
  };
  const [loading, setLoading] = useState(false);
  const [content1, setContent1] = useState();
  const [content2, setContent2] = useState(text.t2);
  const [content3, setContent3] = useState(text.t3);
  const [countryDetail, setCountryDetail] = useState({
    documents_standard: "",
  });
  const [inp, setInp] = useState(false);
  const params = useParams();
  const handleon = (e) => {
    setInp(!inp);
  };
  console.log(content1);
  const fetchCountryById = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(`/company/country/${params.id}/`);
      const { status, data } = res;
      if (status === 200) {
        setCountryDetail(data);
      }
      console.log(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const reSend = async () => {
    try {
      const res = await Axios.patch(`/company/country/${params.id}/`, {
        documents_standard: content1,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCountryById();
  }, []);

  return (
    <React.Fragment>
      <NotariusSidebar />
      <div>
        <div className="n_info">
          <div className="up_nav n_up up_info">
            <div>
              <h1 className="link_h1">Личный кабинет</h1>
              <img src={most} alt="" />
            </div>
            <div className="">
              {loading ? (
                <Loader
                  type="spinner-circle"
                  bgColor={"#FFFFFF"}
                  color={"#FFFFFF"}
                  size={80}
                />
              ) : (
                <>
                  <img src={countryDetail?.image} alt="" />
                  <h1>{countryDetail?.name}</h1>
                </>
              )}
            </div>
          </div>
          <div className="n_down">
            <div>
              <h1>Правила перевода и апостила</h1>
              {inp === false ? (
                <button onClick={handleon}>Изменить</button>
              ) : (
                <button onClick={reSend}>Подтверждать</button>
              )}
            </div>
            <h1>Формат документов</h1>
            <div>
              {inp === false ? (
                countryDetail.documents_standard ? (
                  countryDetail.documents_standard
                ) : (
                  <p>{text.t1}</p>
                )
              ) : (
                <textarea
                  onChange={(e) => {
                    setContent1(e.target.value);
                  }}
                  name=""
                  id=""
                  cols="100"
                  rows="5"
                ></textarea>
              )}
            </div>
            {/* <h1>Требование университетов</h1>
                        <div>
                            {
                                inp === false 
                                ? <p>{text.t2}</p> 
                                : <textarea onChange={(e) =>{setContent2(e.target.value)}} name="" id="" value={content2} cols="100" rows="5"></textarea>
                            }
                        </div>
                        <h1>Требование университетов</h1>
                        <div>
                            {
                                inp === false 
                                ? <p>{text.t3}</p> 
                                : <textarea onChange={(e) =>{setContent3(e.target.value)}} name="" id="" value={content3} cols="100" rows="5"></textarea>
                            }
                        </div> */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default N_info_id;
