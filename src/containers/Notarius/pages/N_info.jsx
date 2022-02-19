import React, { useEffect, useState } from "react";
import NotariusSidebar from "../NotariusSidebar";
import Axios from "../../../utils/axios";
import userpic from "../../../assets/icon/LogoAsia.jpg";
import search from "../../../assets/icon/Search2.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "react-js-loader";
import avatar from "../../../assets/icon/Avatar.svg";

const N_info = () => {
  const [key, setkey] = useState("");
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const selector = useSelector((state) => state);
  const { payload } = selector?.payload;
  const { first_name, last_name } = payload?.data;

  function handleChange(event) {
    setkey(event.target.value);
  }
  const fetchCountries = async () => {
    setLoading(true);
    try {
      const res = await Axios.get("/company/country/?limit=1000");
      const { status, data } = res;
      if (status === 200) {
        const { results } = data;
        setCountries(results);
      }
      console.log(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCountries();
  }, []);
  return (
    <>
      <NotariusSidebar />
      <div>
        <div className="up_nav n_up">
          <div>
            <h1 className="link_h1">Информация по требованием государств</h1>
          </div>
          <div className="user_info">
            <img src={userpic} alt="" />
            <div>
              <h1>
                {first_name} {last_name}
              </h1>
              <h2>Нотариус</h2>
            </div>
          </div>
        </div>
        <div className="invoys n_documents">
          <div className="ab_1">
            <div className="search">
              <div className="input">
                <button>
                  <img src={search} alt="" />
                </button>
                <input type="text" onChange={handleChange} />
              </div>
            </div>
            <div className="table">
              <div className="table_up">
                <div>
                  <h1>Выберите страну для подробной информации</h1>
                </div>
                <div></div>
              </div>
              <div className="n_strani">
                {loading ? (
                  <Loader
                    type="spinner-circle"
                    bgColor={"#FFFFFF"}
                    color={"#FFFFFF"}
                    size={80}
                  />
                ) : (
                  countries.map((dat) => {
                    if (key === "") {
                      return (
                        <Link to={`/n-info/${dat.id}`}>
                          <img src={dat.image} alt="" />
                          <p>{dat.name}</p>
                        </Link>
                      );
                    } else {
                      if (dat.name.toUpperCase().includes(key.toUpperCase())) {
                        return (
                          <Link to={`/n-info/${dat.id}`}>
                            <img src={dat.image} alt="" />
                            <p>{dat.name}</p>
                          </Link>
                        );
                      }
                    }
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default N_info;
