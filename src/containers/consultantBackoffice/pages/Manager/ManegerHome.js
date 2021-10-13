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
import Sidebar from './Sidebar';
import Axios from '../../../../utils/axios';
import Item from 'antd/lib/list/Item';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router';
import { SET_DOC } from '../../../../store/actionTypes';
import { dispatch } from '../../../../store';
import { Pagination } from '@material-ui/lab';
import { signUpAction } from '../../../../store/actions/authActions';
// notarius
// import NotariusSidebar from '../NotariusStudent';
import '../../../../style/css/notarius.css';
const Maneger = () => {
  const [students, setStudents] = useState([]);
  const [studentGetById, setStudentGetById] = useState({});
  const [studentPostById, setStudentPostById] = useState({});
  const [chek, setChek] = useState(false);
  const [univerData, setUniverData] = useState();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [data, setData] = useState(null);
  const [country, setContry] = useState();
  const [facultetId, setFacultetId] = useState();
  const [univerId, setUniverId] = useState();
  const [founding_year, setFoundingYear] = useState();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((state) => ({ ...state, [name]: value }));
  };
  // modal
  const [open_change, setOpen_change] = React.useState(false);
  const [fixEnd, setFix] = useState(false);
  const history = useHistory();
  const year = founding_year?.getFullYear();
  const month = founding_year?.getMonth();
  const day = founding_year?.getDate();
  const date = year + '-' + month + '-' + day;
  const formData = new FormData();
  formData.append('first_name', data?.first_name);
  formData.append('middle_name', data?.middle_name);
  formData.append('last_name', data?.last_name);
  formData.append('phone_number', data?.phone_number);
  formData.append('birthday', date);
  formData.append('passport_number', data?.passport_number);
  formData.append('citizenship', data?.country);
  formData.append('city', data?.country);
  formData.append('address', '65465465446');
  formData.append('ref_code', 5555);
  formData.append('agree_with_agreement', chek);
  formData.append('password_1', data?.password_1);
  formData.append('password_2', data?.password_1);
  const getUniver = async (id) => {
    try {
      const res = await Axios.get(`/university/university/${id}`);
      setUniverData(res.data.name);
    } catch (error) {
      console.log(error);
    }
  };
  const getStudent = async (id) => {
    try {
      const res = await Axios.get(`/enrollee/enrollee-profile/`);
      setStudents(res.data.results);
    } catch (error) {
      console.log(error);
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
    getStudent();
  }, []);
  const userInfo = (id) => {
    localStorage.setItem('userInfoId', JSON.stringify(id));
    history.push('/maneger/userInfo');
  };
  // modal
  return (
    <Sidebar>
      <div className="asos ">
        <div className="Up_navbar">
          <h4>Клиентский ввод</h4>
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
          <div className="univerList " id="scroll_bar">
            <table>
              <thead>
                <tr>
                  <th className="px-3">N</th>
                  <th className="firstTD">ФИО</th>
                  <th>Факультет</th>
                  <th>Университет</th>
                </tr>
              </thead>
              <tbody>
                {students?.map((item, i) => {
                  const { id, enrollee_user, faculty } = item;
                  getUniver(faculty?.university);
                  // const { name, university } = faculty;
                  return (
                    <tr key={id} onClick={() => userInfo(id)}>
                      <td className="px-3">{i + 1}</td>
                      <td className="firstTD">
                        {enrollee_user.first_name} - {enrollee_user.last_name}
                      </td>
                      <td>{faculty?.name}</td>
                      <td>{univerData}</td>
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
        {/* notarius */}
        <div>
          <div className="n_glavny mt-5">
            <h1>Примечания</h1>
            <div className="zametki">
              <div className="paper">
                <h1>Заметка 1</h1>
                <p>Не забудьте выложить каждый документ в базу данных</p>
              </div>
              <div className="paper">
                <h1>Заметка 2</h1>
                <p>
                  Не забудьте выложить каждый документ в базу данных Не забудьте
                  выложить каждый документ в базу данных
                </p>
              </div>
              <div className="paper">
                <h1>Заметка 3</h1>
                <p>Не забудьте выложить каждый документ в базу данных</p>
              </div>
              <div className="paper">
                <h1>Заметка 4</h1>
                <p>Не забудьте выложить каждый документ в базу данных</p>
              </div>
              <div className="paper">
                <h1>Заметка 5</h1>
                <p>Не забудьте выложить каждый документ в базу данных</p>
              </div>
              <div className="paper">
                <h1>Заметка 6</h1>
                <p>Не забудьте выложить каждый документ в базу данных</p>
              </div>
            </div>
          </div>
        </div>
        {/* end notarius */}
      </div>
    </Sidebar>
    // end SidebarUniverstitet
  );
};

export default Maneger;
