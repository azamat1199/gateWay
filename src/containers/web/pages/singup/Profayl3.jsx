import React, { Component, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Navbar from '../Navbar';
import Axios from '../../../../utils/axios';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

const dataT = require('../../json/data.json');

function Profayl3() {
  const selector = useSelector(state=> state)
  const {data} = selector?.payload?.payload
  const {id} = data
  const history = useHistory();
  const [dataSet, setData] = useState(dataT);
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem('profileData'))
  );
  const [profile2, setProfile2] = useState(
    JSON.parse(localStorage.getItem('profile2Data'))
  );
  const [active_activity, setActivity] = useState();
  const data1 = JSON.parse(localStorage.getItem('profile'));
  const data2 = JSON.parse(localStorage.getItem('profile2'));
  const data3 = JSON.parse(localStorage.getItem('zayavka'));
  const [profileData, setProfileData] = useState({
    sport_achievements: '',
    visas: '',
    education_purpose: '',
  });
  const handleActivity = (event, newValue) => {
    setActivity(newValue?.hobbi);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((state) => ({ ...state, [name]: value }));
  };
  const finalData = {
    sport_achievements: profileData.sport_achievements,
    visas: profileData.visas,
    education_purpose: profileData.education_purpose,
    active_activity,
    service: 1,
    ...data1,
    ...data2,
    ...data3,
    enrollee_user: id,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem('files', JSON.stringify(finalData));
    history.push('/files');
  };
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
              d="M82 5L74.5 0.669873V9.33013L82 5ZM0 5.75H5.125V4.25H0V5.75ZM15.375 5.75H25.625V4.25H15.375V5.75ZM35.875 5.75H46.125V4.25H35.875V5.75ZM56.375 5.75H66.625V4.25H56.375V5.75Z"
              fill="#5C7C8A"
            />
          </svg>

          <h2 className="singup_active3">Профайл</h2>
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
          <h1>Профайл</h1>
          <div className="pagination">
            <a className="page page_a"></a>
            <div className="page page_a"></div>
          </div>
          <div className="form_div">
            <p>Спортивные достижения</p>
            <input
              type="text"
              onChange={handleChange}
              name="sport_achievements"
            />
          </div>
          <div className="form_div">
            <p>Активная деятельность</p>
            <Autocomplete
              id="profayl_input"
              onChange={handleActivity}
              options={dataSet}
              getOptionLabel={(option) => option?.hobbi}
              style={{ width: 575 }}
              renderInput={(params) => (
                <TextField {...params} label="" variant="outlined" />
              )}
            />
          </div>
          <div className="form_div">
            <p>Визы</p>
            <input type="text" onChange={handleChange} name="visas" />
          </div>
          <div className="form_div">
            <p>Цель получения образования</p>
            <input
              type="text"
              onChange={handleChange}
              name="education_purpose"
            />
          </div>
          <div className="btn_div">
            <button type="submit" className="reg_btn">
              Завершить
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default Profayl3;
