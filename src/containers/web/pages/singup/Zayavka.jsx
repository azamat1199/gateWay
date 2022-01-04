import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { NavLink, useHistory } from "react-router-dom";
import arrowright from "../../../../assets/icon/arrowright.svg";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Slider from "@material-ui/core/Slider";
import NumberFormat from "react-number-format";
import Navbar from "../Navbar";
import Axios from "../../../../utils/axios";
const data = require("../../json/data.json");
const marks = [
  {
    value: 0,
    label: "$0",
  },
  {
    value: 200,
    label: "$200",
  },
  {
    value: 500,
    label: "$500",
  },
  {
    value: 800,
    label: "$800",
  },
  {
    value: 1000,
    label: "$1000",
  },
  {
    value: 2000,
    label: "$2000",
  },
  {
    value: 3000,
    label: "$3000+",
  },
];
const SSlider = withStyles({
  root: {
    color: "#00587F",
    height: 15,
  },
  thumb: {
    height: 45,
    width: 45,
    backgroundColor: "#E5F7FF",
    border: "6px solid currentColor",
    marginTop: -17,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% - 3px)",
  },
  track: {
    height: 15,
    borderRadius: 7,
  },
  rail: {
    height: 15,
    borderRadius: 7,
    backgroundColor: "#cdeefce8",
  },
})(Slider);

function Zayavka() {
  console.log(data);
  const selector = useSelector((state) => state);
  console.log(selector);
  const { payload } = selector?.payload;
  const { id } = payload.data;
  const userId = id;
  console.log(id);
  const history = useHistory();
  const [service, setService] = useState();
  const [fetchedService, setFetchedService] = useState([]);
  const [comment, setDiscription] = useState();
  const [value, setValue] = useState();
  const [requisiton, setRequisition] = useState({
    budget: 0,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRequisition((state) => ({ ...state, [name]: +value.trim() }));
  };
  const handleChange = (event, newValue) => {
    setRequisition((state) => ({ ...state, budget: newValue }));
    setValue(newValue);
  };
  const handleUniver = (event, newValue) => {
    if (newValue) {
      const { id } = newValue;
      setService(id);
    }
  };
  const finalData = {
    enrollee_user: userId,
    service: service,
    budget: requisiton.budget,
    comment,
  };

  const handleMajor = (event, newValue) => {
    if (newValue) {
      const { id } = newValue;
      setSelectedMajor(id);
    }
  };

  const handleEducation = (event, newValue) => {
    console.log(newValue);
    if (newValue) {
      setSelectedEducation(newValue);
    }
  };

  const handleFaculty = (event, newValue) => {
    if (newValue) {
      const { id } = newValue;
      setSelectedFaculty(id);
    }
  };

  const fetchUnivercities = async () => {
    try {
      const res = await Axios.get("/university/");
      const { status, data } = res;
      const { results } = data;
      if (status === 200) {
        setUnivercities(results);
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDegreeList = async () => {
    try {
      const res = await Axios.get(
        `/university/degree/?university_id=${service || univerId}`
      );
      console.log(res);
      const { status, data } = res;
      const { results } = data;
      if (status == 200) {
        setDegreeList(results);
      }
    } catch (error) {}
  };

  const fetchServiceCompany = async () => {
    try {
      const res = await Axios.get("/company/company-service/");
      const { status } = res;
      const { results } = res.data;
      if (status === 200) {
        setFetchedService(results);
      }
    } catch (error) {}
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const localStr = () => {
    localStorage.setItem("zayavka", JSON.stringify(finalData));
  };
  useEffect(() => {
    fetchServiceCompany();
  }, []);
  return (
    <React.Fragment>
      <div className="navRegist">
        <Navbar />
      </div>
      <div className="singup_asos container">
        <div className="nav_name">
          <h1>Процесс поступления</h1>
        </div>
        <div className="up_nav">
          <h2 className="singup_pass">Регистрация/Войти</h2>
          <svg
            id="svg_pass"
            width="82"
            height="10"
            viewBox="0 0 82 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M82 5L74.5 0.669873V9.33013L82 5ZM0 5.75H5.125V4.25H0V5.75ZM15.375 5.75H25.625V4.25H15.375V5.75ZM35.875 5.75H46.125V4.25H35.875V5.75ZM56.3755.75H66.625V4.25H56.375V5.75Z"
              fill="#5C7C8A"
            />
          </svg>
          <h2>Профайл</h2>
          <svg
            width="82"
            height="10"
            viewBox="0 0 82 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M82 5L74.5 0.669873V9.33013L82 5ZM0 5.75H5.125V4.25H0V5.75ZM15.375 5.75H25.625V4.25H15.375V5.75ZM35.875 5.75H46.125V4.25H35.875V5.75ZM56.375 5.75H66.625V4.25H56.375V5.75Z"
              fill="#5C7C8A"
            />
          </svg>
          <h2>Файлы</h2>
          <svg
            width="82"
            height="10"
            viewBox="0 0 82 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M82 5L74.5 0.669873V9.33013L82 5ZM0 5.75H5.125V4.25H0V5.75ZM15.375 5.75H25.625V4.25H15.375V5.75ZM35.875 5.75H46.125V4.25H35.875V5.75ZM56.375 5.75H66.625V4.25H56.375V5.75Z"
              fill="#5C7C8A"
            />
          </svg>
          <h2>Оплата</h2>
        </div>

        <form onSubmit={handleSubmit} className="main_singup">
          <h1>Заявка</h1>
          <div className="form_div">
            <p>
              {" "}
              <span
                style={{
                  color: "red",
                  fontSize: "40px",
                  position: "relative",
                  top: "14px",
                }}
              >
                *
              </span>{" "}
              Университет{" "}
            </p>
            <input
              style={{ width: "600px" }}
              onChange={handleUniver}
              defaultValue={userUniversity.name}
              list="europe-countries"
              placeholder="Поиск академических программ"
            ></input>
            <datalist id="europe-countries">
              {univercities.map((item) => {
                const { id, name } = item;
                return <option value={id}> {name}</option>;
              })}
            </datalist>
          </div>
          <div className="form_div">
            <p>
              {" "}
              <span
                style={{
                  color: "red",
                  fontSize: "40px",
                  position: "relative",
                  top: "14px",
                }}
              >
                *
              </span>{" "}
              Степень
            </p>
            <Autocomplete
              aria-required
              onChange={handleDegree}
              id="combo-box-demo"
              options={degreeList}
              getOptionLabel={(option) =>
                option ? option.title : "Нет данных"
              }
              style={{ width: 600 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label=""
                  variant="outlined"
                  placeholder="Поиск академических программ"
                />
              )}
            />
          </div>
          <div className="form_div">
            <p>
              <span
                style={{
                  color: "red",
                  fontSize: "40px",
                  position: "relative",
                  top: "14px",
                }}
              >
                *
              </span>{" "}
              Тип обучения
            </p>
            <Autocomplete
              aria-required
              onChange={handleEducation}
              id="combo-box-demo"
              options={educationType}
              getOptionLabel={(option) =>
                option
                  ? option === "full_time"
                    ? "Очное обучение "
                    : option === "part_time"
                    ? "Заочное обучение "
                    : option === "distance"
                    ? "Дистанционное обучение"
                    : "Нет данных"
                  : "Нет данных"
              }
              style={{ width: 600 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label=""
                  variant="outlined"
                  placeholder="Поиск академических программ"
                />
              )}
            />
          </div>
          <div className="form_div">
            <p>
              <span
                style={{
                  color: "red",
                  fontSize: "40px",
                  position: "relative",
                  top: "14px",
                }}
              >
                *
              </span>{" "}
              Факультет
            </p>
            <Autocomplete
              aria-required
              onChange={handleFaculty}
              id="combo-box-demo"
              options={faculties.length > 0 ? faculties : allFaculties}
              getOptionLabel={(option) => (option ? option.name : " ")}
              style={{ width: 600 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label=""
                  variant="outlined"
                  placeholder="Поиск академических программ"
                />
              )}
            />
          </div>
          <div className="form_div">
            <p>
              {" "}
              <span
                style={{
                  color: "red",
                  fontSize: "40px",
                  position: "relative",
                  top: "14px",
                }}
              >
                *
              </span>{" "}
              Направление
            </p>
            <Autocomplete
              aria-required
              onChange={handleMajor}
              id="combo-box-demo"
              options={major}
              getOptionLabel={(option) => (option ? option.name : "Нет данных")}
              style={{ width: 600 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label=""
                  variant="outlined"
                  placeholder="Поиск академических программ"
                />
              )}
            />
          </div>
          {/* <p>Услуга за поступление: $450</p> */}
          <button onClick={postUniversity} className="reg_btn">
            Следующее <img src={arrowright} alt="" />
          </button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default Zayavka;
