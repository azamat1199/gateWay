import React, { useState, useEffect } from "react";
import ManegerSidebar from "../ManagerSidebar";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import Axios from "../../../utils/axios";

import userpic from "../../../assets/icon/userpic.svg";
import filter from "../../../assets/icon/Filter.svg";
import search from "../../../assets/icon/Search2.svg";
import close from "../../../assets/icon/close.svg";
import { useSelector } from "react-redux";
import Loader from "react-js-loader";
const M_status = () => {
  const history = useHistory();

  const [filterCountry, setFilterCountry] = useState([]);

  const [universities, setUniversities] = useState([]);

  const [document, setDocument] = useState([]);

  const [filters, setfilters] = useState(false);

  const [key, setkey] = React.useState("");
  const [loading, setLoading] = useState(true);

  function handleChange(event) {
    setkey(event.target.value);
  }

  const handelFilter = () => {
    setfilters(!filters);
  };

  const univerCountry = async () => {
    try {
      const data2 = await Axios.get("/common/country/");
      const countrys = data2.data.results;
      if (data2.status === 200) {
        setFilterCountry(countrys);
      }
    } catch (err) {
      
    }
  };

  const fetchUniversities = async () => {
    try {
      const data = await Axios.get("/university/");
      const { results } = data.data;
      if (data.status === 200) {
        setUniversities(results);
      }
    } catch (error) {
      
    }
  };

  const [users, setUsers] = useState([]);

  const userList = async () => {
    try {
      const data = await Axios.get("/applicant/list/?status=all");
      const { results } = data.data;
      setLoading((loading) => !loading);
      if (data.status === 200) {
        setDocument(results);
      }
    } catch (error) {
      
    }
  };

  const setFavourite = async (univerId) => {
    try {
      const data = await Axios.post(
        "/enrollee/enrollee-user-favorite-university/",
        {
          university: univerId,
        }
      );
    } catch (error) {
      
    }
  };

  const handler = (userId) => {
    setFavourite(userId).then(() => history.push(`/university/${userId}`));
  };

  useEffect(() => {
    univerCountry();
    userList();
  }, []);
  const selector = useSelector((state) => state.payload.payload.data);

  return (
    <React.Fragment>
      <ManegerSidebar />
      <div>
        <div className="up_nav n_up">
          <div>
            <h1 className="link_h1">Статус клиентов</h1>
          </div>
          <div className="user_info">
            <img src={userpic} alt="" />
            <div>
              <h1>
                {selector.first_name} {selector.last_name}
              </h1>
              <h2>{selector.role}</h2>
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
              <div className="filtr_btn">
                <button onClick={handelFilter}>
                  <img src={filter} alt="" />
                </button>
              </div>
            </div>
            <div className="table">
              <div className="table_up">
                <div>
                  <h1>Список документов</h1>
                </div>
                <div></div>
              </div>
              <table>
                <thead>
                  <th>ФИО</th>
                  <th>Университет</th>
                  <th>Факультет</th>
                  <th>Статус клиента</th>
                </thead>
                {loading ? (
                  <Loader
                    className="spinner2"
                    type="spinner-circle"
                    bgColor={"#FFFFFF"}
                    color={"#FFFFFF"}
                    size={80}
                  />
                ) : (
                  <tbody>
                    {document.map((v) => {
                      if (v.step == "registered" || v.step == "frofile_filled")
                        return (
                          <tr>
                          
                            <th>
                              <Link to={`/m-glavny/${v.id}`}>
                                {v.first_name} {v.last_name}
                              </Link>
                            </th>
                            <th>{v.university}</th>
                            <th>{v.faculty}</th>
                            <th className="steps">
                              <span className={`step`}>
                                1 <p>Заявка</p>
                              </span>
                              <span className="">
                                2 <p>bugalter </p>
                              </span>

                              <span className="">
                                3 <p>Manager </p>
                              </span>

                              <span className="">
                                4 <p>Notary </p>
                              </span>

                              <span className="">
                                5 <p>manager_checking_notary </p>
                              </span>

                              <span className="">
                                6 <p>University </p>
                              </span>

                              <span className="">
                                7 <p>invois University </p>
                              </span>
                            </th>
                           
                          </tr>
                        );
                      if (v.step == "payment_confirmation")
                        return (
                          <tr>
                          
                            <th>
                              <Link to={`/m-glavny/${v.id}`}>
                                {v.first_name} {v.last_name}
                              </Link>
                            </th>
                            <th>{v.university}</th>
                            <th>{v.faculty}</th>
                            <th className="steps">
                              <span className={`step`}>
                                1 <p>Заявка</p>
                              </span>
                              <span className="step">
                                2 <p>bugalter </p>
                              </span>
                              <span className="">
                                3 <p>Manager </p>
                              </span>
                              <span className="">
                                4 <p>Notary </p>
                              </span>
                              <span className="">
                                5 <p>manager_checking_notary </p>
                              </span>
                              <span className="">
                                6 <p>University </p>
                              </span>
                              <span className="">
                                7 <p>invois University </p>
                              </span>
                            </th>
                           
                          </tr>
                        );
                      if (
                        v.step == "payment_confirmed" ||
                        v.step == "manager_checking"
                      )
                        return (
                          <tr>
                          
                            <th>
                              <Link to={`/m-glavny/${v.id}`}>
                                {v.first_name} {v.last_name}
                              </Link>
                            </th>
                            <th>{v.university}</th>
                            <th>{v.faculty}</th>
                            <th className="steps">
                              <span className={`step`}>
                                1 <p>Заявка</p>
                              </span>
                              <span className="step">
                                2 <p>bugalter </p>
                              </span>
                              <span className="step">
                                3 <p>Manager </p>
                              </span>
                              <span className="">
                                4 <p>Notary </p>
                              </span>
                              <span className="">
                                5 <p>manager_checking_notary </p>
                              </span>
                              <span className="">
                                6 <p>University </p>
                              </span>
                              <span className="">
                                7 <p>invois University </p>
                              </span>
                            </th>
                           
                          </tr>
                        );
                      if (
                        v.step == "notary" ||
                        v.step == "manager_reject_notary"
                      )
                        return (
                          <tr>
                            <th>
                              <Link to={`/m-glavny/${v.id}`}>
                                {v.first_name} {v.last_name}
                              </Link>
                            </th>
                            <th>{v.university}</th>
                            <th>{v.faculty}</th>
                          
                            <th className="steps">
                              <span className={`step`}>
                                1 <p>Заявка</p>
                              </span>
                              <span className="step">
                                2 <p>bugalter </p>
                              </span>
                              <span className="step">
                                3 <p>Manager </p>
                              </span>
                              <span className="step">
                                4 <p>Notary </p>
                              </span>
                              <span className="">
                                5 <p>manager_checking_notary </p>
                              </span>
                              <span className="">
                                6 <p>University </p>
                              </span>
                              <span className="">
                                7 <p>invois University </p>
                              </span>
                            </th>
                           
                          </tr>
                        );
                      if (v.step == "manager_checking_notary")
                        return (
                          <tr>
                          
                            <th>
                              <Link to={`/m-glavny/${v.id}`}>
                                {v.first_name} {v.last_name}
                              </Link>
                            </th>
                            <th>{v.university}</th>
                            <th>{v.faculty}</th>
                            <th className="steps">
                              <span className={`step`}>
                                1 <p>Заявка</p>
                              </span>
                              <span className="step">
                                2 <p>bugalter </p>
                              </span>
                              <span className="step">
                                3 <p>Manager </p>
                              </span>
                              <span className="step">
                                4 <p>Notary </p>
                              </span>
                              <span className="step">
                                5 <p>manager_checking_notary </p>
                              </span>
                              <span className="">
                                6 <p>University </p>
                              </span>
                              <span className="">
                                7 <p>invois University </p>
                              </span>
                            </th>
                           
                          </tr>
                        );
                      if (v.step == "university")
                        return (
                          <tr>
                          
                            <th>
                              <Link to={`/m-glavny/${v.id}`}>
                                {v.first_name} {v.last_name}
                              </Link>
                            </th>
                            <th>{v.university}</th>
                            <th>{v.faculty}</th>
                            <th className="steps">
                              <span className={`step`}>
                                1 <p>Заявка</p>
                              </span>
                              <span className="step">
                                2 <p>bugalter </p>
                              </span>
                              <span className="step">
                                3 <p>Manager </p>
                              </span>
                              <span className="step">
                                4 <p>Notary </p>
                              </span>
                              <span className="step">
                                5 <p>manager_checking_notary </p>
                              </span>
                              <span className="step">
                                6 <p>University </p>
                              </span>
                              <span className="">
                                7 <p>invois University </p>
                              </span>
                            </th>
                           
                          </tr>
                        );
                      if (v.step == "completed" || v.step == "cancelled")
                        return (
                          <tr>
                          
                            <th>
                              <Link to={`/m-glavny/${v.id}`}>
                                {v.first_name} {v.last_name}
                              </Link>
                            </th>
                            <th>{v.university}</th>
                            <th>{v.faculty}</th>
                            <th className="steps">
                              <span className={`step`}>
                                1 <p>Заявка</p>
                              </span>
                              <span className="step">
                                2 <p>bugalter </p>
                              </span>
                              <span className="step">
                                3 <p>Manager </p>
                              </span>
                              <span className="step">
                                4 <p>Notary </p>
                              </span>
                              <span className="step">
                                5 <p>manager_checking_notary </p>
                              </span>
                              <span className="step">
                                6 <p>University </p>
                              </span>
                              <span className="step">
                                7 <p>invois University </p>
                              </span>
                            </th>
                           
                          </tr>
                        );
                    })}
                  </tbody>
                )}
              </table>
            </div>
          </div>
          <div className="ab_2" id={filters ? "ra0" : "ra100"}>
            <button onClick={handelFilter} className="ab_2_close">
              <img src={close} alt="" />
            </button>
            <h1>Фильтры</h1>
            <div className="form_ab">
              <h2>Университет</h2>
              <select name="" id="">
                <option value=""></option>
                {universities.map((m) => {
                  return <option value={m.id}>{m.name}</option>;
                })}
              </select>
            </div>
            <div className="form_ab">
              <h2>Степень</h2>
              <select name="" id="">
                <option value=""></option>
                {universities.map((m) => {
                  return <option value={m.id}>{m.name}</option>;
                })}
              </select>
            </div>
            <div className="form_ab">
              <h2>Факультет</h2>
              <select name="" id="">
                <option value=""></option>
                {universities.map((m) => {
                  return <option value={m.id}>{m.name}</option>;
                })}
              </select>
            </div>
            <div className="form_ab">
              <button className="form_button" onClick={handelFilter}>
                Применить
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default M_status;
