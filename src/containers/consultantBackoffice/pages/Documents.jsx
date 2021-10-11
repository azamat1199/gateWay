import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
// import img
import search_icon from '../../../assets/icon/search.svg';
import settings from '../../../assets/icon/settings.svg';
import close_modal from '../../../assets/icon/close_modal.svg';
import folder_icon from '../../../assets/icon/folder_icon.svg';
import pencil from '../../../assets/icon/pencil.svg';
import doc from '../../../assets/icon/doc.svg';
import delet from '../../../assets/icon/delet1.svg';
import arrow1 from '../../../assets/icon/arrow1.svg';
import exel from '../../../assets/icon/excel.svg';
// import css
import '../../../style/css/SidebarUniverstitet.css';
import '../../../style/css/fakultet.css';
import 'react-datepicker/dist/react-datepicker.css';
import Sidebar from './SidebarConsult';
import Axios from '../../../utils/axios';
import Item from 'antd/lib/list/Item';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router';
import { SET_DOC } from '../../../store/actionTypes';
import { dispatch } from '../../../store';
import { Pagination } from '@material-ui/lab';
const Document = () => {
  const history = useHistory();
  const [students, setStudents] = useState([]);
  const [studentGetById, setStudentGetById] = useState({});
  const [studentPostById, setStudentPostById] = useState({});
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [phone, setPhone] = useState('');
  const [universtitetName, setUniverstitetName] = useState('');
  const [nameFaculties, setNameFaculties] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  // modal
  const [open_change, setOpen_change] = React.useState(false);
  const [fixEnd, setFix] = useState(false);
  const fethcStudents = async () => {
    try {
      const res = await Axios.get('/enroll/enroll-user');
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
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen_change = () => {
    setOpen_change(true);
  };
  const handleClose_change = () => {
    setOpen_change(false);
  };
  useEffect(() => {
    fethcStudents();
  }, []);

  const setStudent = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.post('enroll/enroll-user/', {
        first_name: name,
        last_name: lastName,
        middle_name: middleName,
        phone_number: parseInt(phone),
        email: null,
        city: null,
        password_1: password,
        password_2: password,
        registration_ref: null,
      });

      Swal.fire({
        icon: 'success',
        text: 'Успешно зарегистрирован',
        showCancelButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: 'На этот номер все готовы зарегистрироваться, выберите другой или войдите',
        showCancelButton: true,
      });
      console.log(error);
    }
    handleClose();
    fethcStudents();
  };
  const getDoc = (id) => {
    localStorage.setItem('docId', id);
    history.push('documents/user');
  };

  // modal
  return (
    <Sidebar>
      <div className="asos">
        <div className="Up_navbar">
          <h4>Документы</h4>
          <div>
            <img src="https://picsum.photos/70" alt="" />
            <div>
              <h5>Nargiza Akhmedova</h5>
              <p>IT Specialist</p>
            </div>
          </div>
        </div>

        <div className="SidebarUniverstitet">
          <button onClick={handleOpen}>
            <img src={exel} alt="" /> Excel
          </button>
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
          <div className="univerList " id="scroll_bar">
            <h4 className="fw-bold mb-5">Список документов</h4>
            <table>
              <thead>
                <tr>
                  <th className="px-3">N</th>
                  <th className="firstTD">ФИО</th>
                  <th>Загруженные документы</th>
                  <th>Статус</th>
                </tr>
              </thead>
              <tbody>
                {students.reverse().map((item, i) => {
                  const { id, first_name, last_name, phone_number } = item;
                  return (
                    <tr
                      key={id}
                      onClick={() => getDoc(id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td className="px-3">{i + 1}</td>
                      <td className="firstTD">
                        {first_name} - {last_name}
                      </td>
                      <td>8</td>
                      <td style={{ color: 'red' }}>Не потверждён</td>
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
    // end SidebarUniverstitet
  );
};

export default Document;
