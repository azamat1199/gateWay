import React, { useState ,useEffect} from 'react';
import {useSelector} from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import { NavLink, useHistory } from 'react-router-dom';
import arrowright from '../../../../assets/icon/arrowright.svg';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Slider from '@material-ui/core/Slider';
import NumberFormat from 'react-number-format';
import Navbar from '../Navbar';
import Axios from '../../../../utils/axios'
const data = require('../../json/data.json');
const marks = [
  {
    value: 0,
    label: '$0',
  },
  {
    value: 200,
    label: '$200',
  },
  {
    value: 500,
    label: '$500',
  },
  {
    value: 800,
    label: '$800',
  },
  {
    value: 1000,
    label: '$1000',
  },
  {
    value: 2000,
    label: '$2000',
  },
  {
    value: 3000,
    label: '$3000+',
  },
];
const SSlider = withStyles({
  root: {
    color: '#00587F',
    height: 15,
  },
  thumb: {
    height: 45,
    width: 45,
    backgroundColor: '#E5F7FF',
    border: '6px solid currentColor',
    marginTop: -17,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% - 3px)',
  },
  track: {
    height: 15,
    borderRadius: 7,
  },
  rail: {
    height: 15,
    borderRadius: 7,
    backgroundColor: '#cdeefce8',
  },
})(Slider);

function Zayavka() {
  console.log(data);
  const selector = useSelector(state=> state)
  console.log(selector)
  const {payload} = selector?.payload
  const {id} = payload.data
  const userId = id
  console.log(id);
  const history = useHistory();
  const [service, setService] = useState();
  const [fetchedService,setFetchedService] = useState([])
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
    setRequisition(state => ({...state,budget:newValue}))
    setValue(newValue);
  };
  const handleUniver = (event, newValue) => {
    if(newValue){
      const { id } = newValue;
      setService(id);
    }
  };
  const finalData = {
    enrollee_user:userId,
    service: service, 
    budget:requisiton.budget,
    comment,
  };
 
  const fetchServiceCompany = async()=>{
    try {
      const res = await Axios.get("/company/company-service/")
      const {status} = res
      const {results} = res.data
      if(status === 200){
           setFetchedService(results)
      }
    } catch (error) {
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const localStr = () => {
    localStorage.setItem('zayavka', JSON.stringify(finalData));
  };
  useEffect(()=>{
    fetchServiceCompany()
  },[])
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
            <p>Услуги Education Gateway</p>
            <Autocomplete
              aria-required
              onChange={handleUniver}
              id="combo-box-demo"
              options={fetchedService}
              getOptionLabel={(option) => option ? option.name:' '}
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
            <p>Комментарии</p>
            <textarea
              required
              value={comment}
              onChange={(e) => setDiscription(e.target.value)}
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Оставьте комментарии или предложения"
            ></textarea>
          </div>
          <div className="line_dash"></div>
          <h4>Ваш бюджет</h4>
          <input
            required
            name="budget"
            onChange={handleInputChange}
            className="input_budjet"
            placeholder="$0"
            value={requisiton.budget}
          />
          <div className="form_div input_range">
            <SSlider
              defaultValue={0}
              value={requisiton.budget}
              max={3000}
              onChange={handleChange}
              step={10}
              marks={marks}
              valueLabelDisplay="on"
              valueLabelFormat={''}
            />
          </div>
          <p className="zayavka_alert">
            *Пожалуйста укажите ваш реальный бюджет
          </p>
          <NavLink onClick={localStr} to="/profile2" className="reg_btn">
            Следующее <img src={arrowright} alt="" />
          </NavLink>
        </form>
      </div>
    </React.Fragment>
  );
}

export default Zayavka;
