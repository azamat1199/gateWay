import React, { useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUpAction } from '../../../store/actions/authActions';
import logo_education from '../../../assets/icon/Logo_education.svg';
import eye_login from '../../../assets/icon/eye_login.svg';
import '../../../style/css/Login.css';
import Loader from 'react-js-loader';
import { Spin, message } from 'antd';
import Axios from '../../../utils/axios';
import Swal from 'sweetalert2'
function  Login () {
    
    const dispatch = useDispatch()
    const history = useHistory();
    const [wiew, setWiew] = useState(false);
    const[errorMsg,setErrorMsg] = useState('')
    const [loading, setLoading] = useState(false);
    const [phone,setPhone] = useState()
    const [state,setState] = useState({
        role:'',
    });
    const [loginData,setLoginData] = useState({
        password:''
    });
    const handleChange = useCallback ((e) => { 
        const {name,value} = e.target;
        setState(state=>({...state,[name]:value}))
        if(name === 'phone'){
            if(value.startsWith('+')){
                const  finalValue =  value.slice(1)
                setPhone(finalValue)
            } else{
            setPhone(value)
            }
        }

    } ,[state])  

    const handleValue = useCallback ((e) => {
        const {name,value} = e.target;
        setLoginData(state=>({...state,[name]:value}))
   },[loginData])
   const dataGo = {
    username:`${state.role}_${phone}`,
    password:loginData.password
 }
   
    const submitData = async (e)=>{
        e.preventDefault()
        setLoading(true);
        try {
            const res = await Axios.post('/common/token/obtain',dataGo)
            console.log(res);
            const {access,refresh,role,data} = res.data
            dispatch(signUpAction({access,refresh,role,data:data}))
            if(role.startsWith("u")){
              history.push('/univer-backoffice-page')
            }else if(role.startsWith('e')){
              history.push('/my-account')
            }else if(role.startsWith('n')){
              history.push('/n-glavny')
            }else if(role === 'company'){
              history.push('/home/main')
            }else{
              history.push('/')
            }
          
           setLoading(false);
        } catch (error) {
          console.log(error);
           Swal.fire({
               icon:'error',
               text:'Активная учетная запись с указанными учетными данными не найдена'
           })
         
           setLoading(false);
        }
    }
  
  return (
    <div className="Login">
      <div className="background_login"></div>
            <div className="background_login"></div>
            
            <div className="container">
                <div className="title">
                    <img src={logo_education} alt="" />
                    <h2>Education Gateway</h2>
                </div>
                <div className="block">
                    <form onSubmit={submitData} className="blockBox">
                        <h3>Войти</h3>
                      
                        <div onChange={handleChange} className="radioBlock">
                            <label><input type="radio" name="role" value="enrollee"  />Абитуриент</label>
                            <label><input type="radio" name="role" value="partner"  />Партнер</label>
                            <label><input type="radio" name="role" value="university"  />Университет</label>
                            <label><input type="radio" name="role" value="company" />Админ</label>
                        </div>
                        {/* Login kiritish */}
                        <div className="loginInput">
                            <p>Логин</p>
                         
                            <div>
                                <input  onChange={handleChange}  type="phone" name="phone"  placeholder='' required/>
                            </div>
                        </div>
                        {/* Parol kiritish */}
                        <div className="loginInput">
                            <p>пароль</p>
                            <div>
                                <input onChange={(e)=>handleValue(e)} name="password" type={wiew === false ? "password" : "text"} required />
                                <img src={eye_login} alt="" onClick={ () => {setWiew(!wiew)} }/>
                            </div>
                        </div>
                        {/* eslab qolish */}
                        <div className="loginRemberMe">
                            <label className='custom-checkbox'>
                                <input  type="checkbox" name="rememberMe" value="rememberMe"/>
                                <span></span>
                                <p>
                                    Запомнить меня
                                </p>
              
              </label>
              <p>
                Забыли пароль? <Link to="/loginStaff">Восстановить</Link>
              </p>
            </div>
            {/* kirish */}
            <h4 style={{ color: 'red', margin: 'auto' }}>{errorMsg}</h4>
            <button type="submit">
              {loading ? (
                <>
                  <Spin size="middle" spinning={loading} />
                </>
              ) : (
                'Войти'
              )}
            </button>
            {/* parolni unutdim */}
            <div className="forgetPass">
              <p>
                {' '}
                Нет аккаунта? <Link to="/registration"> Регистрация</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
