import React, {
  Component,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import axios from 'axios';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { NavLink, useHistory } from 'react-router-dom';
import google from '../../../../assets/icon/google.svg';
import facebook from '../../../../assets/icon/facebookreg.svg';
import view from '../../../../assets/icon/view.svg';
import check from '../../../../assets/icon/checked.svg';
import '../../../../style/css/singup.css';
import Navbar from '../Navbar';
import InputErrorMsg from './inputErrorMsg';
import Axios from '../../../../utils/axios';
import { Progress } from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';
import Loader from 'react-js-loader';
import { Spin, message } from 'antd';
import { useDispatch } from 'react-redux';
import { signUpAction } from '../../../../store/actions/authActions';
import Swal from 'sweetalert2';
import { Autocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';

function SingUp() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [region, setRegion] = useState();
  const inputRef = useRef();
  const buttonRef = useRef();
  const statsuRef = useRef();
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(true);
  const [error, setError] = useState('');
  const [countries, setCountry] = useState();
  const [countriess, setSountry] = useState();
  const [citiess, setCities] = useState([]);
  const [length, setLength] = useState();
  const [status, setStatus] = useState("");
  const [phone ,setPhone] = useState()
  const [loginData, setLoginData] = useState({
    first_name: "",
    last_name: "",
    middle_name:"",
    password_1: "",
    passport_number:'',
    password_2: "",
    birthday:'',
    address:'',
    ref_code:"",
    agree_with_agreement:true,
  });

  const handleInputChange = useCallback(
    (e) => {
      console.log(e);
      const { name, value } = e.target;
      setLoginData((state) => ({ ...state, [name]: value }));
      if(name === 'phone_number'){
        if(value.startsWith('+')){
          const finalValue = value.slice(1)
          console.log(finalValue);
          setPhone(finalValue)
        }
        else{
          setPhone(value)
        }
      }
      if (name === "password_1" && !value.length) {
        setStatus("error");
        setLength(0);
      } else if (name === 'password_1' && value.length < 2) {
        setStatus('error');
        setLength(12.5);
      } else if (name === 'password_1' && value.length < 3) {
        setStatus('error');
        setLength(25);
      } else if (name === 'password_1' && value.length < 4) {
        setStatus('error');
        setLength(37.5);
      } else if (name === 'password_1' && value.length < 5) {
        setStatus('error');
        setLength(50);
      } else if (name === 'password_1' && value.length < 6) {
        setStatus('error');
        setLength(62.5);
      } else if (name === 'password_1' && value.length < 8) {
        const { current } = inputRef;
        current.style = 'background:red';
        setStatus('error');
        setLength(75);
      } else if (name === 'password_1' && value.length === 8) {
        setStatus('success');
        setLength(100);
      }
    },
    [loginData]
  );
  const onSuccess = (res) => {
    console.log('Successfull', res);
  };
  const onFailure = (res) => {
    console.log('Failure', res);
  };

  const fetchCountries = async () => {
    try {
      const data = await Axios.get('/common/country/');
      console.log(data);
      const { status } = data;
      const { results } = data?.data;
      console.log(results);

      if (status === 200) {
        setSountry(results);
        console.log(results);
        const newData = [];
        for (let x = 0; x < results.length; x++) {
          newData.push(results[x].cities[0]);
        }
        setCities(newData);
        console.log(newData)
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleRegion = (event, newValue) => {
    setRegion(newValue);
  };
  const handleCountry = (event, newValue) => {
    setCountry(newValue);
  };
  const id1 = countries?.id;
  const id2 = region?.id;
  const finalData = {
    first_name: loginData.first_name,
    last_name: loginData.last_name,
    middle_name: loginData.middle_name,
    birthday:loginData.birthday,
    agree_with_agreement:loginData.agree_with_agreement,
    address:loginData.address,
    citizenship: id1,
    phone_number: phone,
    passport_number:loginData.passport_number,
    city: id2,
    password_1: loginData.password_1,
    password_2: loginData.password_2,
    ref_code:loginData.ref_code
  };
  console.log(finalData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await Axios.post('/enroll/enroll-user/', finalData);
      console.log(res);
      const { status } = res;
      const { data } = res;
      console.log(data);
      if (status == 201) {
        dispatch(signUpAction({ data: data }));
        localStorage.setItem('profile', JSON.stringify(data));
        localStorage.setItem('enrolle_user', data?.id);
        Swal.fire({
          icon: 'success',
          text: 'Успешно зарегистрирован',
          showCancelButton: false,
        }).then(()=>{
          Axios.post('/common/token/obtain',{
            username:`enrollee_${finalData.phone_number}`,
            password:`${finalData.password_1}`
          })
          .then((res) => {
            const {refresh,access} = res.data
            localStorage.setItem('acces',access)
            localStorage.setItem('refresh',refresh)
          }).then(() => history.push('/my-account'))
        })
      }
      console.log(data);
      setLoading(false);
    } catch (err) {
      console.log(err.response);
      Swal.fire({
        icon: 'error',
        text: 'На этот номер все готовы зарегистрироваться, выберите другой или войдите',
        showCancelButton: true,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);
  return (
    <React.Fragment>
      <div className="navRegist">
        <Navbar />
      </div>
      <div className="singup_asos container">
        <form onSubmit={handleSubmit} className="main_singup">
          <h1>Регистрация</h1>
          <div className="form_div">
            <p>Ваша имя </p>
            <input
              onChange={handleInputChange}
              type="text"
              name="first_name"
              placeholder="имя"
              required
            />
            <InputErrorMsg type="first_name" errorObj={error} />
          </div>
          <div className="form_div">
            <p>Ваша фамилия</p>
            <input
              onChange={handleInputChange}
              type="text"
              name="last_name"
              placeholder="фамилия"
              required
            />
            <InputErrorMsg type="last_name" errorObj={error} />
          </div>
          <div className="form_div">
            <p>Отчество</p>
            <input
              onChange={handleInputChange}
              type="text"
              name="middle_name"
              placeholder="фамилия"
              required
            />
            <InputErrorMsg type="last_name" errorObj={error} />
          </div>
          <div className="form_div">
            <p>Пасспорт намбер анд серия</p>
            <input
              onChange={handleInputChange}
              type="text"
              name="passport_number"
              placeholder="AA0000"
              required
            />
            <InputErrorMsg type="passport_number" errorObj={error} />
          </div>
          <div className="form_div">
            <p>день рождения</p>
            <input
              onChange={handleInputChange}
              type="date"
              name="birthday"
              placeholder="24.06.2002"
              required
            />
            <InputErrorMsg type="last_name" errorObj={error} />
          </div>

          <div className="form_div">
							<p>Гражданство</p>
							<Autocomplete
							aria-required
							onChange = {handleCountry}
							id="profayl_input"
							options={countriess}
							getOptionLabel={(option) => option ? option.name :''}
							style={{ width: 575 }}
							renderInput={(params) => <TextField {...params} label="" variant="outlined"/>}
							/>
						</div>
          <div className="form_div">
            <p>Город</p>
            <Autocomplete
              aria-required
              onChange={handleRegion}
              id="profayl_input"
              options={citiess}
              getOptionLabel={(option) =>option ? option.name : ''}
              style={{ width: 575 }}
              renderInput={(params) => (
                <TextField {...params} label="" variant="outlined" />
              )}
            />
          </div>
          <div className="form_div">
            <p>Адрес</p>
            <input
              type="text"
              onChange={handleInputChange}
              name="address"
              placeholder="address"
              required
            />
          </div>
          <div className="form_div">
            <p>Ваш телефон номера</p>
            <input
              type="phone"
              onChange={handleInputChange}
              name="phone_number"
              placeholder="+998 90 123 45 67"
              required
            />
          </div>
          <div className="form_div">
            <p>Выберите пароль</p>

            <div className="password">
              <input
                onChange={handleInputChange}
                name="password_1"
                required
                placeholder="пароль"
                ref={inputRef}
                type={type ? 'password' : 'text'}
              />
              <img onClick={() => setType(() => !type)} src={view} alt="" />
            </div>
            <div
              style={
                loginData.password_1.length > 0
                  ? { display: 'flex' }
                  : { display: 'none' }
              }
              ref={statsuRef}
              className="status-bar"
            >
              <Progress ref={inputRef} percent={length} status={status} />
              {loginData.password_1.length < 8 ? (
                <div style={{ marginLeft: '20px' }} className="statusPercent">
                  <div>
                    {' '}
                    <span style={{ color: 'red' }}>
                      {loginData.password_1.length}/
                    </span>
                    <span
                      style={{
                        fontSize: '20px',
                        fontWeight: '500',
                        color: 'red',
                      }}
                    >
                      8
                    </span>{' '}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="form_div">
            <p>Повторите пароль</p>
            <div className="password">
              <input
                placeholder="подтвердить пароль"
                onClick={() =>
                  loginData.password_1.length >= 8 > 0
                    ? (statsuRef.current.style = 'display:none;')
                    : ''
                }
                onChange={handleInputChange}
                type="password"
                name="password_2"
                required
              />
              {loginData.password_1 == loginData.password_2 &&
              loginData.password_2 != '' ? (
                <img src={check} alt="" />
              ) : loginData.password_2.length > 0 ? (
                <Loader type="box-up" bgColor={'black'} size={40} />
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="form_div">
            <p>Реферальный код</p>
            <input
              type="text"
              onChange={handleInputChange}
              name="ref_code"
              required
            />
          </div>
          <div className="">
               <input onChange={handleInputChange} type="checkbox" name="agree_with_agreement" value='true' />
                                <p>
                                Соглашаюсь с <NavLink to='text-agreement'> правилами публичной оферты</NavLink> и конфедициальности
                                </p>
            </div>
         
          <p style={{ color: 'red', marginBottom: '8px', fontWeight: '600' }}>
            {' '}
            {error}
          </p>
          <button
            ref={buttonRef}
            style={
              loading ? { background: '#8cb4c5' } : { background: '#00587F' }
            }
            className="reg_btn"
          >
            {loading ? (
              <>
                <Spin size="middle" spinning={loading} />
              </>
            ) : (
              'Зарегистрироваться'
            )}
          </button>
          <h2>или</h2>
          <h2>Войдите через</h2>
          <a className="reg_link" href="#">
            <GoogleLogin
              clientId="971142751474-u0fttn4so4e7melu9jlruprvsplget6r.apps.googleusercontent.com"
              buttonText="Google"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
            />
          </a>
          <a className="reg_link" href="#">
            <img src={facebook} alt="" /> Facebook
          </a>
          <h3>
            Уже есть аккаунт? <NavLink to="/login">Войдите</NavLink>
          </h3>
        </form>
      </div>
    </React.Fragment>
  );
}

export default SingUp;
// 111
