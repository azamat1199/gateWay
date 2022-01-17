import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

// import img
import userpic from "../../../assets/icon/userpic.svg";
import search_icon from "../../../assets/icon/search.svg";
import info_icon from "../../../assets/icon/info_icon.svg";
import close_modal from "../../../assets/icon/close_modal.svg";
import TablePagination from "@material-ui/core/TablePagination";
import folder_icon from "../../../assets/icon/folder_icon.svg";
import Loader from "react-js-loader";
import { useSelector } from "react-redux";
import Axios from '../../../utils/axios'
// import css
import "../../../style/css/SidebarFilial.css";
import Sidebar from "./SidebarConsult";
import Swal from "sweetalert2";

const SidebarFilial = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const selector = useSelector((state) => state.payload.payload.data);
  const [branch,setBranch]=useState()
  const [count,setCount] = useState()
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState();
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
const [dateInput,setDataInput]=useState({is_partner:false})

const getBranch=async ()=>{
  setLoading(true)
  try {
    const res=await Axios.get(`company/branch-user/?limit=${rowsPerPage}`)
    setBranch(res?.data?.results)
    setCount(res.data.count)
    setLoading(false)
  } catch (error) {
    setLoading(false)
  }
  }
  const handlePageChange = async(e, newPage) => {
    setPage(newPage);
    setLoading(true)
     try {
        const res = await Axios.get(`company/branch-user/?limit=${rowsPerPage}&offset=${newPage*rowsPerPage}`);
        const { status, data } = res;
        const { results } = data;
        if (status == 200) {
          setBranch(results);
        }
        console.log(res);
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
  };
  const handleChangeRowsPerPage = async (event) => {
    console.log(rowsPerPage);
    console.log(event.target.value);
    setRowsPerPage(+event.target.value);
    setPage(0);
    }
 const changeInput=(e)=>{
const {name,value}=e.target;
setDataInput(state=>({...state,[name]:value}))
 }
 const errorPassword=()=>{
  Swal.fire({
    icon:'error',
   text:'password error'
   })
}
const errorMassage=(props)=>{
  Swal.fire({
    icon:'error',
   text:`${props} error`
   })
}
const postBranch=async()=>{
  if(dateInput?.password_1==dateInput?.password_2){
  try {
    const res=await Axios.post(`/company/branch-user/`,dateInput)
  } catch (error) {
    
    errorMassage(error)
  }
  getBranch()
  closeModal()
}
  else{
    errorPassword()
  }
}
useEffect(()=>{
  getBranch()
},[rowsPerPage])
useEffect(()=>{
  getBranch()
},[])

  return (
    <div className="consultSidebarFiliial">
      <Sidebar>
        <div className="asos">
          <div className="Up_navbar">
            <h4>Филиалы</h4>
            <div className="user_info">
              <img src={userpic} alt="" />
              <div>
                <p>
                  {selector.first_name} {selector.last_name}
                </p>
                <h5>{selector.role=='branch_director'&& <span>директор филиала</span>  ||selector.role}</h5>
              </div>
            </div>
          </div>
          <div className="SidebarFilial">
            <button onClick={openModal}>Добавить филиал</button>
            <div className="settSearch">
              <div className="searchUniv">
                <img src={search_icon} alt="" />
                <input type="text" placeholder="Поиск университетов" />
              </div>
            </div>
            {/* end settSearch */}
            <div className="univerList">
              <table>
                <thead>
                  <tr>
                    <th>Название</th>
                    <th>ифо</th>
                    <th>Адрес</th>
                    <th>Телефон</th>
                  
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
                  branch?.map((v)=>{
                    return <tr>
                    <td>{v?.branch?.name}</td>
                    <td>  {v?.first_name}   {v?.last_name}</td>
                    <td>{v?.branch?.address}</td>
                    <td>{v?.branch?.phone_number}</td>
                  </tr>
                  }))}
              
                </tbody>
              </table>
              <TablePagination
                rowsPerPageOptions={[20,40,60]}
                component="table"
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </div>
            {/* end univerList */}
            {/* Modal */}
            {modalIsOpen ? (
              <div className="modalAddFilial">
                <div onClick={closeModal} className="backModal"></div>
                <div className="frontModal">
                  <img onClick={closeModal} src={close_modal} alt="" />
                  <h1>Добавить новый филиал</h1>
                  <div>
                    <label>Название филиала</label>
                    <input onChange={(e)=>{changeInput(e)}} name='name' type="text" />
                  </div>
                  <div>
                    <label>имя директора</label>
                    <input type="text" name='first_name' onChange={(e)=>{changeInput(e)}} />
                  </div>
                  <div>
                    <label>Отчество директора</label>
                    <input type="text" name='middle_name' onChange={(e)=>{changeInput(e)}} />
                  </div>  <div>
                    <label>фамилия директора</label>
                    <input type="text" name='last_name' onChange={(e)=>{changeInput(e)}} />
                  </div>
                  <div>
                    <label>Полный адрес филиала</label>
                    <input type="text"  name='address' onChange={(e)=>{changeInput(e)}}/>
                  </div>
                  <div>
                    <label>Телефон номер филиала</label>
                    <input
                    onChange={(e)=>{changeInput(e)}}
                      type="text"
                      placeholder="+998 (9х) ххх - хх - хх"
                      name='branch_phone_number'
                    />
                  </div>
                  <div>
                    <label>Номер телефона филиала (использовать проект)</label>
                    <input type="text" onChange={(e)=>{changeInput(e)}} name='phone_number'/>
                  </div>
                  <div>
                    <label>Пароль филиала</label>
                    <input type="password" onChange={(e)=>{changeInput(e)}}  name='password_1'/>
                  </div>
                  <div>
                    <label>Пароль филиала</label>
                    <input type="password" onChange={(e)=>{changeInput(e)}}  name='password_2' />
                  </div>
                  <button onClick={postBranch} >Добавить</button>
                </div>
              </div>
            ) : null}

            {/* end Modal */}
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default SidebarFilial;
