import React from "react";
// import SettingBg from "../../../assets/images/SettingBack.svg";
import img1 from "../../../assets/images/img1.svg";
import staticImg from "../../../assets/images/static.svg";
import StaticImg from "../../../assets/images/StaticIMG.svg";
import staticEdit from "../../../assets/images/staticEdit.svg";
import plus from "../../../assets/images/plus.svg";

export default function SettingsRightside() {
  return (
    <div>
      <div className="">
        <div className="staticImg">
          <div className="editIcon">
            <img src={staticEdit} alt="static edit" />
          </div>
          <div className="staticPerson">
            <img src={StaticImg} alt="head img" />
            <h4>Nargiza Akhmedova</h4>
            <h5>IT Specialist</h5>
          </div>
        </div>
        <div className="setting-select">
          <h5>Цены за услуги компании</h5>
          <div className="staticSelect">
            <select>
              <option value="">Университет</option>
            </select>
            <select>
              <option value="">Бакалавр</option>
            </select>
            <select>
              <option value="">Направление </option>
            </select>
            <select>
              <option value="">IT </option>
            </select>
            <input></input>
          </div>
          <div className="plus-btn">
            <button>
              <img src={plus} alt="plus btn" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
