import React, { Component, useEffect, useState } from "react";
import NotariusSidebar from "../NotariusSidebar";

import most from "../../../assets/images/most.png";
import { colors } from "@material-ui/core";
import { useParams } from "react-router";
import Axios from "../../../utils/axios";
import Loader from "react-js-loader";

const N_info_id = () => {
  const text = {
    t1: "Гарвардский университет (Гарвард) (англ. Harvard University) — один из самых известных университетов США и всего мира, старейший вуз США. Находится в городе Кембридж (входит в состав Бостонской городской агломерации), штат Массачусетс.",
    t2: "Гарвардский университет (Гарвард) (англ. Harvard University) — один из самых известных университетов США и всего мира, старейший вуз США. Находится в городе Кембридж (входит в состав Бостонской городской агломерации), штат Массачусетс.",
    t3: "Гарвардский университет (Гарвард) (англ. Harvard University) — один из самых известных университетов США и всего мира, старейший вуз США. Находится в городе Кембридж (входит в состав Бостонской городской агломерации), штат Массачусетс.",
  };
  const [loading, setLoading] = useState(false);
  const [content1, setContent1] = useState(text.t1);
  const [content2, setContent2] = useState(text.t2);
  const [content3, setContent3] = useState(text.t3);
  const [countryDetail, setCountryDetail] = useState("");
  const [inp, setInp] = useState(false);
  const params = useParams();
  const handleon = (e) => {
    setInp(!inp);
  };
  console.log(content1);
  const fetchCountryById = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(`/common/country/${params.id}/detail/`);
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
                <button onClick={handleon}>Подтверждать</button>
              )}
            </div>
            <h1>Формат документов</h1>
            <div>
              {inp === false ? (
                <p>{text.t1}</p>
              ) : (
                <textarea
                  onChange={(e) => {
                    setContent1(e.target.value);
                  }}
                  name=""
                  id=""
                  value={content1}
                  cols="100"
                  rows="5"
                ></textarea>
              )}
            </div>
            <h1>Требование университетов</h1>
            <div>
              {inp === false ? (
                <p>{text.t2}</p>
              ) : (
                <textarea
                  onChange={(e) => {
                    setContent2(e.target.value);
                  }}
                  name=""
                  id=""
                  value={content2}
                  cols="100"
                  rows="5"
                ></textarea>
              )}
            </div>
            <h1>Требование университетов</h1>
            <div>
              {inp === false ? (
                <p>{text.t3}</p>
              ) : (
                <textarea
                  onChange={(e) => {
                    setContent3(e.target.value);
                  }}
                  name=""
                  id=""
                  value={content3}
                  cols="100"
                  rows="5"
                ></textarea>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default N_info_id;
