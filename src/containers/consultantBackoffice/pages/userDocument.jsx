import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useDispatch, useSelector } from 'react-redux';
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
import pdf from '../../../assets/icon/pdf.svg';
import download from '../../../assets/icon/download.svg';
import check from '../../../assets/icon/check.svg';
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
  const id = useSelector((state) => state);
  const handleInputChange = (e) => {
    console.log(e);
    const { name, files } = e.target;
  };
  const fethcStudents = async () => {
    try {
      const res = await Axios.get(`enroll/enroll-profile`);
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
          <div className="univerList" id="scroll_bar">
            <div className="row d-flex justify-content-between px-5 ">
              <div className="col-5 mt-4">
                <div className="fw-bold fs-3">Оригинал документов:</div>
              </div>

              <div className="col-5 mt-4">
                {' '}
                <div className="fw-bold fs-3">Оригинал документов:</div>
              </div>
              <div className="col-5 mt-4">
                <div
                  className="w-100 fw-bold fs-5  rounded d-flex justify-content-between  p-3"
                  style={{ backgroundColor: '#EAF5FA' }}
                >
                  {' '}
                  <img src={pdf} alt="" />
                  Паспорт
                  <img src={download} alt="" />
                </div>
              </div>
              <div className="col-5 mt-4">
                <div className="w-100 fw-bold fs-5  rounded d-flex justify-content-between   p-3">
                  <button className="btn btn-outline-success fw-bold">
                    Передать нотариусу
                  </button>
                  <button className="btn btn-outline-success fw-bold">
                    Потвердить оригинал
                  </button>
                </div>
              </div>
              <div className="col-5 mt-4">
                <div
                  className="w-100 fw-bold fs-5  rounded d-flex justify-content-between  p-3"
                  style={{ backgroundColor: '#EAF5FA' }}
                >
                  {' '}
                  <img src={pdf} alt="" />
                  Паспорт
                  <img src={download} alt="" />
                </div>
              </div>
              <div className="col-5 mt-4">
                <div className="w-100 fw-bold fs-5  rounded d-flex justify-content-between   p-3">
                  <button className="btn btn-outline-success fw-bold">
                    Передать нотариусу
                  </button>
                  <button className="btn btn-outline-success fw-bold">
                    Потвердить оригинал
                  </button>
                </div>
              </div>
              <div className="col-5 mt-4">
                <div
                  className="w-100 fw-bold fs-5  rounded d-flex justify-content-between  p-3"
                  style={{ backgroundColor: '#EAF5FA' }}
                >
                  {' '}
                  <img src={pdf} alt="" />
                  Паспорт
                  <img src={download} alt="" />
                </div>
              </div>
              <div className="col-5 mt-4">
                <div className="w-100 fw-bold fs-5  rounded d-flex justify-content-between   p-3">
                  <button className="btn btn-outline-success fw-bold">
                    Передать нотариусу
                  </button>
                  <button className="btn btn-outline-success fw-bold">
                    Потвердить оригинал
                  </button>
                </div>
              </div>
              <div className="col-5 mt-4">
                <div
                  className="w-100 fw-bold fs-5  rounded d-flex justify-content-between  p-3"
                  style={{ backgroundColor: '#EAF5FA' }}
                >
                  {' '}
                  <img src={pdf} alt="" />
                  Паспорт
                  <img src={download} alt="" />
                </div>
              </div>
              <div className="col-5 mt-4">
                <div className="w-100 fw-bold fs-5  rounded d-flex justify-content-between   p-3">
                  <button className="btn btn-outline-success fw-bold">
                    Передать нотариусу
                  </button>
                  <button className="btn btn-outline-success fw-bold">
                    Потвердить оригинал
                  </button>
                </div>
              </div>
              <div className="col-5 mt-4">
                <div
                  className="w-100 fw-bold fs-5  rounded d-flex justify-content-between  p-3"
                  style={{ backgroundColor: '#EAF5FA' }}
                >
                  {' '}
                  <img src={pdf} alt="" />
                  Паспорт
                  <img src={download} alt="" />
                </div>
              </div>
              <div className="col-5 mt-4">
                <div className="w-100 fw-bold fs-5  rounded d-flex justify-content-between   p-3">
                  <button className="btn btn-outline-success fw-bold">
                    Передать нотариусу
                  </button>
                  <button className="btn btn-outline-success fw-bold">
                    Потвердить оригинал
                  </button>
                </div>
              </div>
              <div className="col-5 mt-4">
                <div
                  className="w-100 fw-bold fs-5  rounded d-flex justify-content-between  p-3"
                  style={{ backgroundColor: '#EAF5FA' }}
                >
                  {' '}
                  <img src={pdf} alt="" />
                  Паспорт
                  <img src={download} alt="" />
                </div>
              </div>
              <div className="col-5 mt-4">
                <div className="w-100 fw-bold fs-5  rounded d-flex justify-content-between   p-3">
                  <button className="btn btn-outline-success fw-bold">
                    Передать нотариусу
                  </button>
                  <button className="btn btn-outline-success fw-bold">
                    Потвердить оригинал
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default Document;
