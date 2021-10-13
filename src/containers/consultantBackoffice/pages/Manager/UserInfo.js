import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Axios from "../../../../utils/axios";
import pdf from "../../../../assets/icon/pdf.svg";
import download from "../../../../assets/icon/download.svg";
// css
import "../../../../style/css/SidebarUniverstitet.css";
import "../../../../style/css/fakultet.css";
import "react-datepicker/dist/react-datepicker.css";
import "../../../../style/css/SidebarUniverstitet.css";
import { Table } from "reactstrap";
// img
// import download from '../../../assets/icon/download.svg';
const UserInfo = () => {
  const [data, setData] = useState();

  //   console.log(id);

  const getUser = async () => {
    const id = JSON.parse(localStorage.getItem("userInfoId"));
    try {
      const res = await Axios.get(`enrollee/enrollee-profile/${id}`);
      console.log(res.data.name);
      setData(res.data);
    } catch (error) {}
  };
  useEffect(() => {
    getUser();
  }, []);
  console.log(data);
  const date = new Date();
  const nowDate = date.getFullYear();

  const year = data?.enrollee_user?.birthday;
  const oldYear = year?.slice(0, 4);
  console.log(data?.enrollee_user?.first_name, year);
  return (
    <Sidebar>
      <div className="container">
        <div className="row py-4">
          <div className="Up_navbar">
            <h4>
              Клиентский ввод <span className="mx-3">{`>`}</span>
              <h5 className="d-inline">Информация</h5>
            </h4>
            <div>
              <img src="https://picsum.photos/70" alt="" />
              <div>
                <h5>Nargiza Akhmedova</h5>
                <p>IT Specialist</p>
              </div>
            </div>
          </div>
          <div
            className="container shadow  py-3"
            style={{ borderRadius: "14px" }}
          >
            <div className="d-flex justify-content-between align-items-center ">
              <div className="d-flex">
                <img
                  src="https://picsum.photos/70"
                  className="rounded-circle"
                  alt=""
                />
                <div className="ms-3 ">
                  <h5 className="fw-bold ">
                    {data?.enrollee_user?.first_name}{" "}
                    {data?.enrollee_user?.last_name}
                  </h5>
                  <p>
                    {parseInt(nowDate) - parseInt(oldYear)} лет, Фергана,
                    Узбекистан
                  </p>
                </div>
              </div>
              <button className="btn  rounded py-2">
                <img src={download} alt="" />
                <span
                  className="mx-4"
                  style={{
                    backgroundColor: "background: #F3F5F7",
                    color: "#00587F",
                  }}
                >
                  Скачать PDF
                </span>
              </button>
            </div>
          </div>
          <div className="shadow mt-5  py-4 " style={{ borderRadius: "14px" }}>
            <h3>Ваши данные</h3>

            <Table striped>
           
              <tbody>
                <tr>
                  <td className='w-25 '>Имя</td>
                  <td className='w-75'>laziz</td>
                </tr>
                <tr>
                  <td className='w-25 '>Фамилия</td>
                  <td className='w-75'>@fat</td>
                </tr>
                <tr>
                  <td className='w-25 '>Отчество</td>
                  <td className='w-75'>@twitter</td>
                </tr>
                <tr>
                  <td className='w-25 '>Университет</td>
                  <td className='w-75'>@twitter</td>
                </tr>
                <tr>
                  <td className='w-25 '>Факультет</td>
                  <td className='w-75'>@twitter</td>
                </tr>
                <tr>
                  <td className='w-25 '>Специальность</td>
                  <td className='w-75'>@twitter</td>
                </tr>
                <tr>
                  <td className='w-25 '>IELTS</td>
                  <td className='w-75'>@twitter</td>
                </tr>
                <tr>
                  <td className='w-25 '>Специальность</td>
                  <td className='w-75'>@twitter</td>
                </tr>
                <tr>
                  <td className='w-25 '>Passport</td>
                  <td className='w-75'> 
                    <div         className="w-50 fw-bold fs-5  rounded d-flex justify-content-between  p-3"
                  style={{ backgroundColor: '#EAF5FA' }}
                >
                  <img src={pdf} alt="" />
                  3х4 фото 8шт.
                  <a href={`${data?.scan_photo}`} target="_blank">
                    <img src={download} alt="" />
                  </a>
                </div> </td>
                </tr>
                <tr>
                  <td className='w-25 '>IELTS Certificate</td>
                  <td className='w-75'>   <div
                  className="w-50 fw-bold fs-5  rounded d-flex justify-content-between  p-3"
                  style={{ backgroundColor: '#EAF5FA' }}
                >
                  <img src={pdf} alt="" />
                  3х4 фото 8шт.
                  <a href={`${data?.scan_photo}`} target="_blank">
                    <img src={download} alt="" />
                  </a>
                </div> </td>
                </tr>
                <tr>
                  <td className='w-25 '>Diploma</td>
                  <td className='w-75'>  
                   <div
                  className="w-50 fw-bold fs-5  rounded d-flex justify-content-between  p-3"
                  style={{ backgroundColor: '#EAF5FA' }}
                >
                  <img src={pdf} alt="" />
                  3х4 фото 8шт.
                  <a href={`${data?.scan_photo}`} target="_blank">
                    <img src={download} alt="" />
                  </a>
                </div> </td>
                </tr>
                <tr>
                  <td className='w-25 '>Отчество</td>
                  <td className='w-75'>   <div
                  className="w-50 fw-bold fs-5  rounded d-flex justify-content-between  p-3"
                  style={{ backgroundColor: '#EAF5FA' }}
                >
                  <img src={pdf} alt="" />
                  3х4 фото 8шт.
                  <a href={`${data?.scan_photo}`} target="_blank">
                    <img src={download} alt="" />
                  </a>
                </div>  </td>
                </tr>
                <tr>
                  <td className='w-25 '>Отчество</td>
                  <td className='w-75'>   <div
                  className="w-50 fw-bold fs-5  rounded d-flex justify-content-between  p-3"
                  style={{ backgroundColor: '#EAF5FA' }}
                >
                  <img src={pdf} alt="" />
                  3х4 фото 8шт.
                  <a href={`${data?.scan_photo}`} target="_blank">
                    <img src={download} alt="" />
                  </a>
                </div> </td>
                </tr>
                <tr>
                  <td className='w-25 '>Отчество</td>
                  <td className='w-75'>  <div
                  className="w-50 fw-bold fs-5  rounded d-flex justify-content-between  p-3"
                  style={{ backgroundColor: '#EAF5FA' }}
                >
                  <img src={pdf} alt="" />
                  3х4 фото 8шт.
                  <a href={`${data?.scan_photo}`} target="_blank">
                    <img src={download} alt="" />
                  </a>
                </div>  </td>
                </tr>
                <tr>
                  <td className='w-25 '>Отчество</td>
                  <td className='w-75'>   <div
                  className="w-50 fw-bold fs-5  rounded d-flex justify-content-between  p-3"
                  style={{ backgroundColor: '#EAF5FA' }}
                >
                  <img src={pdf} alt="" />
                  3х4 фото 8шт.
                  <a href={`${data?.scan_photo}`} target="_blank">
                    <img src={download} alt="" />
                  </a>
                </div> </td>
                </tr>
                <tr>
                  <td className='w-25 '>Отчество</td>
                  <td className='w-75'>   <div
                  className="w-50 fw-bold fs-5  rounded d-flex justify-content-between  p-3"
                  style={{ backgroundColor: '#EAF5FA' }}
                >
                  <img src={pdf} alt="" />
                  3х4 фото 8шт.
                  <a href={`${data?.scan_photo}`} target="_blank">
                    <img src={download} alt="" />
                  </a>
                </div> </td>
                </tr>
                <tr>
                  <td className='w-25 '>Отчество</td>
                  <td className='w-75'>  <div
                  className="w-50 fw-bold fs-5  rounded d-flex justify-content-between  p-3"
                  style={{ backgroundColor: '#EAF5FA' }}
                >
                  <img src={pdf} alt="" />
                  3х4 фото 8шт.
                  <a href={`${data?.scan_photo}`} target="_blank">
                    <img src={download} alt="" />
                  </a>
                </div>  </td>
                </tr>
                <tr>
                  <td className='w-25 '>Отчество</td>
                  <td className='w-75'>   <div
                  className="w-50 fw-bold fs-5  rounded d-flex justify-content-between  p-3"
                  style={{ backgroundColor: '#EAF5FA' }}
                >
                  <img src={pdf} alt="" />
                  3х4 фото 8шт.
                  <a href={`${data?.scan_photo}`} target="_blank">
                    <img src={download} alt="" />
                  </a>
                </div> </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default UserInfo;
