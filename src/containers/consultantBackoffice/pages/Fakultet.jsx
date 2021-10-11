import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// UI modal
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

// import img
import search_icon from '../../../assets/icon/search.svg';
import settings from '../../../assets/icon/settings.svg';
import close_modal from '../../../assets/icon/close_modal.svg';
import folder_icon from '../../../assets/icon/folder_icon.svg';

// import css
import '../../../style/css/SidebarUniverstitet.css';
import '../../../style/css/fakultet.css';
import Sidebar from './SidebarConsult';
import Axios from '../../../utils/axios';
import arrow1 from '../../../assets/icon/arrow1.svg';

const Fakultet = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [name, setName] = useState('');
  const [universtitetName, setUniverstitetName] = useState('');
  const [kvota, setKvota] = useState(null);
  const [description, setDescription] = useState('');
  const date = new Date();
  const [nowDate, setNowDate] = useState(date);
  const [status, setStatus] = useState('');
  const [price, setPrice] = useState(null);
  const [fixEnd, setFix] = useState(false);

  // modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const submitFaculty = async (e) => {
    try {
      const res = await Axios.post('/', {
        name: name,
        universtitetName: universtitetName,
        kvota: kvota,
        description: description,
        nowDate: nowDate,
        status: status,
        price: price,
      });
    } catch (error) {
      console.log(error);
    }
    console.log({
      name: name,
      universtitetName: universtitetName,
      kvota: kvota,
      description: description,
      nowDate: nowDate,
      status: status,
      price: price,
    });
    handleClose();
  };
  return (
    <Sidebar>
      <div className="asos">
        <div className="Up_navbar">
          <h4>Факультеты</h4>
          <div>
            <img src="https://picsum.photos/70" alt="" />
            <div>
              <h5>Nargiza Akhmedova</h5>
              <p>IT Specialist</p>
            </div>
          </div>
        </div>
        <div className="SidebarUniverstitet">
          <button onClick={handleOpen}>Добавить факультет</button>
          <div className="settSearch">
            <div className="searchUniv">
              <img src={search_icon} alt="" />
              <input type="text" placeholder="Поиск университетов" />
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
          <div className="univerList fakultet" id="scroll_bar">
            <table>
              <thead>
                <tr>
                  <th className="firstTD">Название</th>
                  <th>ВУЗ</th>
                  <th>Квоты</th>
                  <th>Статус</th>
                  <th>Сумма контракта</th>
                  <th>Тип учёбы</th>
                  <th>Цена за услуги</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="firstTD">Экономика и международный бизнес</td>
                  <td>
                    Южно Казахтанский Государственный Педогогиский Университет
                  </td>
                  <td>1,500</td>
                  <td className="priDoc">Прием документов</td>
                  <td>$34,500</td>
                  <td>Очный</td>
                  <td>$450</td>
                </tr>
                <tr>
                  <td className="firstTD">
                    Business Management and Hotel Management
                  </td>
                  <td>Sakarya University</td>
                  <td>1,500</td>
                  <td className="priZak">Прием закрыт</td>
                  <td>$34,500</td>
                  <td>Заочный</td>
                  <td>$450</td>
                </tr>
                <tr>
                  <td className="firstTD">Экономика и международный бизнес</td>
                  <td>
                    Южно Казахтанский Государственный Педогогиский Университет
                  </td>
                  <td>1,500</td>
                  <td className="priDoc">Прием документов</td>
                  <td>$34,500</td>
                  <td>Очный</td>
                  <td>$450</td>
                </tr>
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
                        onChange={(date) => setStartDate(date)}
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

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className="class1"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className="addNewUniverModalUniver talaba_modal">
                <img onClick={handleClose} src={close_modal} alt="" />
                <div className="modalContainer">
                  <h5>Добавить новый университет</h5>
                  <div>
                    <label>Название факультет</label>
                    <input
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Университет</label>
                    <select
                      onChange={(e) => setUniverstitetName(e.target.value)}
                    >
                      <option>Выбрать страну</option>
                      <option>страну</option>
                      <option>страну</option>
                    </select>
                  </div>
                  <div>
                    <label>Квота</label>
                    <input
                      type="text"
                      onChange={(e) => setKvota(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Описание</label>
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="5"
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="modalDataPick">
                    <label>Прием документов заканчивается</label>
                    <DatePicker
                      selected={nowDate}
                      onChange={(e) => setNowDate(e)}
                      placeholderText="sana"
                    />
                  </div>
                  <div>
                    <label>Статус</label>
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option>Выбрать страну</option>
                      <option>страну</option>
                      <option>страну</option>
                    </select>
                  </div>
                  <div>
                    <label>Цена</label>
                    <input
                      type="text"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>

                  <button
                    onClick={(e) => {
                      submitFaculty(e);
                    }}
                  >
                    Добавить
                  </button>
                  <button onClick={handleClose} className="back_btn">
                    <img src={arrow1} alt="" /> Вернуться
                  </button>
                </div>
              </div>
            </Fade>
          </Modal>
          {/* end Filter */}
        </div>
      </div>
    </Sidebar>
    // end SidebarUniverstitet
  );
};

export default Fakultet;
