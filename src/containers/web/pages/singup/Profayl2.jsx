import React, { Component, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import arrowright from '../../../../assets/icon/arrowright.svg';
import { authSaveData } from '../../../../store/actions/authActions';
import Navbar from '../Navbar';

function Profayl2() {
  const selector = useSelector((state) => state);
  const { form } = selector.dataSave;
  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = location;
  const history = useHistory();
  const [profileData, setProfileData] = useState({
    educated_in: '',
    achievements: '',
    gpa: '',
    english_level_type: '',
    english_level_value: 120,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((state) => ({ ...state, [name]: value }));
  };
  console.log(profileData.english_level_type);

  const saveData = () => {
    dispatch(authSaveData(pathname, profileData));
    Swal.fire({
      icon: 'success',
      text: 'Текущие данные сохранены без промедления',
    }).then(() => history.push('/my-account'));
  };
  const localStr = () => {
    localStorage.setItem('profile2', JSON.stringify(profileData));
  };
  console.log(profileData);
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
        <form className="main_singup">
          <h1>Профайл</h1>
          <div className="pagination">
            <div className="page page_a"></div>
            <a className="page"></a>
          </div>
          <div className="form_div">
            <p>Где вы учитесь/учились?</p>
            <input type="text" onChange={handleChange} name="educated_in" />
          </div>
          <div className="form_div">
            <p>Выберите тип сертификата</p>
            <select onChange={handleChange} name="english_level_type">
              <option value="ielts">ielts</option>
              <option value="cefr">cefr</option>
              <option value="sat">sat</option>
              <option value="pearson">pearson</option>
              <option value="other">other</option>
            </select>
          </div>
          <div
            className="form_div"
            style={
              profileData.english_level_type == 'other'
                ? { display: 'block' }
                : { display: 'none' }
            }
          >
            <p>напишите свой тип сертификата</p>
            <input
              onChange={handleChange}
              type="text"
              name="english_level_other"
            />
          </div>
          <div className="form_div">
            <p>оценка вашего сертификата</p>
            <input
              onChange={handleChange}
              type="text"
              name="english_level_value"
            />
          </div>
          <div className="form_div">
            <p>Достижения</p>
            <input onChange={handleChange} type="text" name="achievements" />
          </div>
          <div className="form_div">
            <p>GPA</p>
            <input onChange={handleChange} type="text" name="gpa" />
          </div>
          <div className="btn_div">
            <button type="button" onClick={saveData} className="save_btn">
              Сохранить
            </button>
            <NavLink onClick={localStr} to="/profile3" className="next_btn">
              Следующее <img src={arrowright} alt="" />
            </NavLink>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default Profayl2;
