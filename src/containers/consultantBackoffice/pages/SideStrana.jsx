import React, { Component, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "react-js-loader";

// import img
import russiaFlag from "../../../assets/icon/russiaFlag.png";
import usaFlag from "../../../assets/icon/usaFlag.png";
import blueStroke from "../../../assets/images/Stroke-blue.svg";

// import css
import "../../../style/css/SideStrana.css";
import Sidebar from "./SidebarConsult";
import Axios from "../../../utils/axios";
import axios from "axios";

function SideStrana() {
  const [countryList, setCountryList] = useState([]);
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);
    let mounted = true;
    Axios.get("common/country/list/").then((res) => {
      if (mounted) {
        setCountryList(res.data.results);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
      setLoading(false);
    };
  }, []);

  const selector = useSelector((state) => state.payload.payload.data);

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
                  {" "}
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
              <button>Добавить страну</button>
            )}
            <div className="blockCountry">
              <h4>Список стран</h4>
              <div className="listCountry">
                {loading ? (
                  <Loader
                    type="spinner-circle"
                    bgColor={"#FFFFFF"}
                    color={"#FFFFFF"}
                    size={80}
                  />
                ) : (
                  countryList.map((x) => (
                    <div>
                      {/*image yoqligi sabab , xozircha image static*/}
                      <div className="image-strana-div">
                        <img src={x.image} alt="" />
                      </div>
                      <div>
                        <p>{x.name}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          <a href="#top" title="Go to top" className="backTop">
            <img src={blueStroke} alt="back to top" />
          </a>
        </div>
      </Sidebar>
    </div>
  );
}

export default SideStrana;
