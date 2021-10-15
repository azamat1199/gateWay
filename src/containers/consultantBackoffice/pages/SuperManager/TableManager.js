import React, { useEffect, useState, useRef } from "react";
import Loader from "react-js-loader";
import DatePicker from "react-datepicker";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

// import TextField from "@mui/material/TextField";
import TextField from "@material-ui/core/TextField";
// import Autocomplete from "@mui/material/Autocomplete";
import { Autocomplete } from "@material-ui/lab";
// import Autocomplete from "@mui/material/Autocomplete";
// import img
import search_icon from "../../../../assets/icon/search.svg";
// import settings from "../../../assets/icon/settings.svg";
import filterImg from "../../../../assets/icon/Filter.svg";
import close_modal from "../../../../assets/icon/close_modal.svg";
import folder_icon from "../../../../assets/icon/folder_icon.svg";
import pencil from "../../../../assets/icon/pencil.svg";
import doc from "../../../../assets/icon/doc.svg";
import delet from "../../../../assets/icon/delet1.svg";
import arrow1 from "../../../../assets/icon/arrow1.svg";
import Vector from "../../../../assets/icons/Vector.svg";
import ticketDownload from "../../../../assets/images/ticket-download.svg";
import blueStroke from "../../../../assets/images/Stroke-blue.svg";
import warning from "../../../../assets/images/Warning.svg";

// import css
import "../../../../style/css/SidebarUniverstitet.css";
import "../../../../style/css/fakultet.css";
import "react-datepicker/dist/react-datepicker.css";
// import Sidebar from "../../consultantBackoffice/pages/SidebarConsult";
// import SidebarAccountant from "./SidebarAccountant";
import SidebarAccountant from "./SuperSidebar";
import Axios from "../../../../utils/axios";
import Item from "antd/lib/list/Item";
import Swal from "sweetalert2";
import { useHistory } from "react-router";
import { SET_DOC } from "../../../../store/actionTypes";
import { dispatch } from "../../../../store";
import { Pagination } from "@material-ui/lab";
import { StyledDropdown } from "../../../Accountant/AccountantStyle/StyledDropdown";
import TableModal from "../../../Accountant/Pages/TableModal";

const Talabalar = () => {
  const [students, setStudents] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [paymentConfirm, setPaymentConfirm] = useState(false);
  const [open_change, setOpen_change] = React.useState(false);
  const [fixEnd, setFix] = useState(false);
  const [count, setCount] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState();
  const container = useRef();
  const fethcStudents = async () => {
    setLoading(true);
    try {
      const res = await Axios.get("applicant/list/");
      console.log(res);
      const { status, data } = res;
      const { results, count } = data;
      if (status === 200) {
        setStudents(results);
        setCount(count);
      }
      setLoading(false);
    } catch (error) {
      console.log(error.response);
      setLoading(false);
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
  const handleClock = async (id) => {
    try {
      const res = await Axios.put(`/applicant/confirm-payment/${id}/`, {
        invoice_confirmed: true,
      });
      setPaymentConfirm(true);
      const { data, status } = res;
      console.log(status);
      console.log(data.invoice_confirmed);
      console.log(res);
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleClick = (id) => {
    console.log(id);
    Swal.fire({
      icon: "warning",
      title: "Вы действительно хотите потвердить этот платеж?",
      showCancelButton: true,
      reverseButtons: true,
      cancelButtonColor: "#F3F5F7",
      cancelButtonText: "Отменить",
      confirmButtonColor: "#00587F",
      confirmButtonText: "Потвердить",
    }).then((result) => {
      if (result.isConfirmed) {
        handleClock(id);
      } else {
        console.log(false);
      }
    });
  };
  useEffect(() => {
    fethcStudents();
  }, [paymentConfirm]);

  const [input, setInput] = useState(false);

  const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: "Pulp Fiction", year: 1994 },
    {
      label: "The Lord of the Rings: The Return of the King",
      year: 2003,
    },
    { label: "The Good, the Bad and the Ugly", year: 1966 },
    { label: "Fight Club", year: 1999 },
    {
      label: "The Lord of the Rings: The Fellowship of the Ring",
      year: 2001,
    },
    {
      label: "Star Wars: Episode V - The Empire Strikes Back",
      year: 1980,
    },
    { label: "Forrest Gump", year: 1994 },
    { label: "Inception", year: 2010 },
    {
      label: "The Lord of the Rings: The Two Towers",
      year: 2002,
    },
    { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { label: "Goodfellas", year: 1990 },
    { label: "The Matrix", year: 1999 },
    { label: "Seven Samurai", year: 1954 },
    {
      label: "Star Wars: Episode IV - A New Hope",
      year: 1977,
    },
    { label: "City of God", year: 2002 },
    { label: "Se7en", year: 1995 },
    { label: "The Silence of the Lambs", year: 1991 },
    { label: "It's a Wonderful Life", year: 1946 },
    { label: "Life Is Beautiful", year: 1997 },
    { label: "The Usual Suspects", year: 1995 },
    { label: "Léon: The Professional", year: 1994 },
    { label: "Spirited Away", year: 2001 },
    { label: "Saving Private Ryan", year: 1998 },
    { label: "Once Upon a Time in the West", year: 1968 },
    { label: "American History X", year: 1998 },
    { label: "Interstellar", year: 2014 },
    { label: "Casablanca", year: 1942 },
    { label: "City Lights", year: 1931 },
    { label: "Psycho", year: 1960 },
    { label: "The Green Mile", year: 1999 },
    { label: "The Intouchables", year: 2011 },
    { label: "Modern Times", year: 1936 },
    { label: "Raiders of the Lost Ark", year: 1981 },
    { label: "Rear Window", year: 1954 },
    { label: "The Pianist", year: 2002 },
    { label: "The Departed", year: 2006 },
    { label: "Terminator 2: Judgment Day", year: 1991 },
    { label: "Back to the Future", year: 1985 },
    { label: "Whiplash", year: 2014 },
    { label: "Gladiator", year: 2000 },
    { label: "Memento", year: 2000 },
    { label: "The Prestige", year: 2006 },
    { label: "The Lion King", year: 1994 },
    { label: "Apocalypse Now", year: 1979 },
    { label: "Alien", year: 1979 },
    { label: "Sunset Boulevard", year: 1950 },
    {
      label:
        "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
      year: 1964,
    },
    { label: "The Great Dictator", year: 1940 },
    { label: "Cinema Paradiso", year: 1988 },
    { label: "The Lives of Others", year: 2006 },
    { label: "Grave of the Fireflies", year: 1988 },
    { label: "Paths of Glory", year: 1957 },
    { label: "Django Unchained", year: 2012 },
    { label: "The Shining", year: 1980 },
    { label: "WALL·E", year: 2008 },
    { label: "American Beauty", year: 1999 },
    { label: "The Dark Knight Rises", year: 2012 },
    { label: "Princess Mononoke", year: 1997 },
    { label: "Aliens", year: 1986 },
    { label: "Oldboy", year: 2003 },
    { label: "Once Upon a Time in America", year: 1984 },
    { label: "Witness for the Prosecution", year: 1957 },
    { label: "Das Boot", year: 1981 },
    { label: "Citizen Kane", year: 1941 },
    { label: "North by Northwest", year: 1959 },
    { label: "Vertigo", year: 1958 },
    {
      label: "Star Wars: Episode VI - Return of the Jedi",
      year: 1983,
    },
    { label: "Reservoir Dogs", year: 1992 },
    { label: "Braveheart", year: 1995 },
    { label: "M", year: 1931 },
    { label: "Requiem for a Dream", year: 2000 },
    { label: "Amélie", year: 2001 },
    { label: "A Clockwork Orange", year: 1971 },
    { label: "Like Stars on Earth", year: 2007 },
    { label: "Taxi Driver", year: 1976 },
    { label: "Lawrence of Arabia", year: 1962 },
    { label: "Double Indemnity", year: 1944 },
    {
      label: "Eternal Sunshine of the Spotless Mind",
      year: 2004,
    },
    { label: "Amadeus", year: 1984 },
    { label: "To Kill a Mockingbird", year: 1962 },
    { label: "Toy Story 3", year: 2010 },
    { label: "Logan", year: 2017 },
    { label: "Full Metal Jacket", year: 1987 },
    { label: "Dangal", year: 2016 },
    { label: "The Sting", year: 1973 },
    { label: "2001: A Space Odyssey", year: 1968 },
    { label: "Singin' in the Rain", year: 1952 },
    { label: "Toy Story", year: 1995 },
    { label: "Bicycle Thieves", year: 1948 },
    { label: "The Kid", year: 1921 },
    { label: "Inglourious Basterds", year: 2009 },
    { label: "Snatch", year: 2000 },
    { label: "3 Idiots", year: 2009 },
    { label: "Monty Python and the Holy Grail", year: 1975 },
  ];

  return (
    <SidebarAccountant>
      <div className="asos" id="top">
        <div className="Up_navbar">
          <div>
            <div className="nav-bugalter">
              <h4>Бухгалтер</h4>
              <h5>Квитанции</h5>
            </div>
          </div>
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
            <span>
              <img src={Vector} className="vector" alt="Vector img" />
              Excel
            </span>
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
              <img src={filterImg} className="" alt="" />
            </button>
          </div>
          <div className="univerList talabalar" id="scroll_bar">
            <table>
              <thead>
                <tr className="table-line">
                  <th className="firstTD">N</th>
                  <th>ФИО</th>
                  <th>Университет</th>
                  <th>Факультет</th>
                  <th>Телефон</th>
                  <th>Реферальный</th>
                  <th>Менеджер</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <Loader
                    type="spinner-circle"
                    bgColor={"#FFFFFF"}
                    color={"#FFFFFF"}
                    size={80}
                  />
                ) : (
                  students.map((item, i) => {
                    const {
                      id,
                      first_name,
                      last_name,
                      university,
                      service_price,
                      phone_number,
                      contract_created_date,
                      invoice,
                      manager,
                      contract,
                      invoice_confirmed,
                    } = item;
                    return (
                      <tr key={id}>
                        <td className="px-3">{i + 1}</td>
                        <td className="firstTD">
                          {first_name} {last_name}
                        </td>
                        <td>{university}</td>
                        <td>{contract_created_date}</td>
                        {/* <td>${service_price}</td> */}
                        <td>{phone_number}</td>
                        <td>{contract}</td>
                        <td>
                          {input ? (
                            <Autocomplete
                              disablePortal
                              id="combo-box-demo"
                              className="poisk"
                              options={top100Films}
                              sx={{ width: 300 }}
                              renderInput={(params) => (
                                <TextField {...params} label="Movie" />
                              )}
                            />
                          ) : (
                            // <input
                            //   className="poisk"
                            //   type="text"
                            //   placeholder="Поиск"
                            // />
                            <button
                              className="table-manager"
                              onClick={() => setInput((input) => true)}
                            >
                              Выбрать менеджера
                            </button>
                          )}
                        </td>
                        {/* <td>
                          <a href={invoice} download>
                            <img src={ticketDownload} alt="don=wnload" />
                          </a>
                        </td> */}
                        {/* <td>
                          {invoice_confirmed == null ? (
                            "не оплачен"
                          ) : (
                            <button
                              style={
                                invoice_confirmed
                                  ? { backgroundColor: "#5EC98B" }
                                  : {
                                      backgroundColor: "#fff",
                                      border: "1px solid #5EC98B ",
                                      color: "#5EC98B",
                                    }
                              }
                              onClick={() => handleClick(item.id)}
                            >
                              {invoice_confirmed
                                ? "Платеж потвержден"
                                : "Потвердить платеж"}
                            </button>
                          )}
                        </td> */}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* NOTES */}
          <div className="n_glavny">
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
          {/* end Filter */}
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
                        minDate={startDate}
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
        <a href="#top" title="Go to top" className="backTop">
          <img src={blueStroke} alt="back to top" />
        </a>
      </div>
    </SidebarAccountant>
  );
};

export default Talabalar;
