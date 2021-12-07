import React, { Component, useEffect, useState } from "react";

// import css
import "../../../style/css/personal.css";

// imort icon
import message_icon from "../../../assets/icon/message.svg";
import call_icon from "../../../assets/icon/call.svg";
import StudentSidebar from "./SidebarStudent";
import { useSelector } from "react-redux";
import Axios from "../../../utils/axios";
import Swal from "sweetalert2";
import Loader from "react-js-loader";
const Personal = () => {
  const [loading, setLoading] = useState(false);
  const selector = useSelector((state) => state);
  const [currentManager, setCurrentManager] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    role: "",
  });
  const { payload } = selector?.payload;
  const userFirstName = payload?.data?.first_name;
  const userLasttName = payload?.data?.last_name;

  const fetchMyMeneger = async () => {
    setLoading(true);
    try {
      const res = await Axios.get("/applicant/me/");
      const { manager } = res.data;
      setCurrentManager(manager);
      if (manager) {
        localStorage.setItem("seen", manager.first_name);
      }
      setLoading(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error?.response,
      });
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMyMeneger();
  }, []);
  return (
    <>
      <StudentSidebar />
      <div className="Personal">
        <div className="top">
          <h1>Персональный менеджер</h1>
          <div>
            <img src="https://picsum.photos/70" alt="" />
            <h2>
              {userFirstName} {userLasttName} <span>Заявитель</span>
            </h2>
          </div>
        </div>
        <div className="bottom">
          {loading ? (
            <Loader
              type="spinner-circle"
              bgColor={"#fff"}
              color={"#fff"}
              size={80}
            />
          ) : currentManager?.first_name ? (
            <div>
              <div className="inf">
                <div>
                  <img src="https://picsum.photos/150" alt="" />
                  <h2>
                    {currentManager.first_name} {currentManager.last_name}
                    <span>{currentManager.role}, Education Gateway</span>
                  </h2>
                </div>
                <div>
                  <img src={message_icon} alt="" />
                  <img src={call_icon} alt="" />
                </div>
              </div>
              <p>
                {currentManager.first_name} {currentManager.last_name} является
                ветераном в деле рекруитинга и подбора университетов. Он вам все
                досколнально объяснит и всему научит.{" "}
                {currentManager.first_name} {currentManager.last_name} является
                ветераном в деле рекруитинга и подбора университетов. Он вам все
                досколнально объяснит и всему научит.
              </p>
              <h5>
                Номер телефона:<span>{currentManager.phone_number}</span>
              </h5>
              <h6>
                Email адрес:<span>educationgateway@gmail.com</span>
              </h6>
            </div>
          ) : (
            <p>У вас еще нет менеджера</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Personal;
