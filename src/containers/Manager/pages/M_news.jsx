import React, { Component } from "react";
import ManegerSidebar from "../ManagerSidebar";
import userpic from "../../../assets/icon/userpic.svg";
import { useSelector } from "react-redux";

const M_news = () => {
  const selector = useSelector((state) => state.payload.payload.data);
  return (
    <React.Fragment>
      <ManegerSidebar />
      <div>
        <div className="up_nav n_up">
          <div>
            <h1 className="link_h1">Новости</h1>
          </div>
          <div className="user_info">
            <img src={userpic} alt="" />
            <div>
              <h1>
                {selector.first_name} {selector.last_name}
              </h1>
              <h2>{selector.role}</h2>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default M_news;
