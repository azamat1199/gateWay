import Sidebar from './Sidebar';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
// import img
import search_icon from '../../../../assets/icon/search.svg';
import settings from '../../../../assets/icon/settings.svg';
import close_modal from '../../../../assets/icon/close_modal.svg';
import folder_icon from '../../../../assets/icon/folder_icon.svg';
import pencil from '../../../../assets/icon/pencil.svg';
import doc from '../../../../assets/icon/doc.svg';
import delet from '../../../../assets/icon/delet1.svg';
import arrow1 from '../../../../assets/icon/arrow1.svg';
// import css
import '../../../../style/css/SidebarUniverstitet.css';
import '../../../../style/css/fakultet.css';
import 'react-datepicker/dist/react-datepicker.css';
import Axios from '../../../../utils/axios';
import Item from 'antd/lib/list/Item';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router';
import { SET_DOC } from '../../../../store/actionTypes';
import { dispatch } from '../../../../store';
import { Pagination } from '@material-ui/lab';
import { signUpAction } from '../../../../store/actions/authActions';
import Progress from './Progress';
//

const Status = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [fixEnd, setFix] = useState(false);
  const [students, setStudents] = useState([]);
  const fethcStudents = async () => {
    try {
      const res = await Axios.get('enrollee/enrollee-user/?page=4');
      console.log(res);
      const { status, data } = res;
      const { results } = data;
      if (status === 200) {
        setStudents(results);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    fethcStudents();
  }, []);
  //   const handleOpen = () => {
  //     setOpen(true);
  //   };
  //   const handleClose = () => {
  //     setOpen(false);
  //   };
  return (
    <Sidebar>
      <div className="asos">
        <div className="Up_navbar">
          <h4>Статус клиентов</h4>
          <div>
            <img src="https://picsum.photos/70" alt="" />
            <div>
              <h5>Nargiza Akhmedova</h5>
              <p>IT Specialist</p>
            </div>
          </div>
        </div>

        <div className="SidebarUniverstitet">
          <div className="settSearch">
            <div className="searchUniv">
              <img src={search_icon} alt="" />
              <input type="text" placeholder="Поиск Студенты" />
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
          {/* end settSearch */}
          <div className="univerList" id="scroll_bar">
            <table>
              <thead>
                <tr>
                  <th className="px-3">N</th>
                  <th className="firstTD">ФИО</th>
                  <th>Статус клиента</th>
                  <th>
                    <th>Время до след. шага</th>
                  </th>
                </tr>
              </thead>
              <tbody>
                {students?.reverse().map((item, i) => {
                  const {
                    id,
                    first_name,
                    last_name,
                    phone_number,
                    documents_filled,
                  } = item;
                  console.log(documents_filled);
                  return (
                    <tr key={id}>
                      <td className="px-3">{i + 1}</td>
                      <td className="firstTD">
                        {first_name} - {last_name}
                      </td>
                      <td className="d-flex justify-content-start align-items-center">
                        <Progress />
                      </td>
                      <td>2 дня</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* end univerList */}
          {/* Filter */}
          {
            // fixEnd ?
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
                  <p>Выберите период</p>
                  <div className="datapickBlock">
                    <div>
                      <DatePicker
                        selected={startDate}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        placeholderText="dan"
                      />
                    </div>
                    <div>
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        placeholderText="gacha"
                      />
                    </div>
                  </div>
                  <p>Выберите страну</p>
                  <div className="selectCountry">
                    <select name="" id="">
                      <option value="">Турция</option>
                      <option value="">Россия</option>
                      <option value="">США</option>
                      <option value="">Узбекистан</option>
                    </select>
                  </div>
                  <p>Выберите город</p>
                  <div className="selectCountry">
                    <select name="" id="">
                      <option value="">Анталия</option>
                      <option value="">Анкара</option>
                      <option value="">Истанбул</option>
                      <option value="">Измир</option>
                    </select>
                  </div>
                  <button>Применить</button>
                </div>
                {/* end FilterUniver */}
              </div>
            ) : null
          }
        </div>
      </div>
    </Sidebar>
  );
};

export default Status;
