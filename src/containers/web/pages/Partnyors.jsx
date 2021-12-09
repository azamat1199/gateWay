import React, { Component, useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import "../../../style/css/partnyors.css";
import normal from "../../../assets/icon/normal.svg";
import Navbar from "./Navbar";
import Swal from "sweetalert2";
import Axios from "../../../utils/axios";
import { useHistory } from "react-router";
function Partnyors() {
  const history = useHistory();
  const [partnerData, setPartnerData] = useState({
    phone_number: "",
    email: "",
    partnership_type: "",
    request_content: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPartnerData((state) => ({ ...state, [name]: value }));
  };
  const onSubmit = async () => {
    try {
      const res = await Axios.post(
        "/partner/partnership-request/",
        partnerData
      );
      const { status } = res;
      if (status === 201) {
        Swal.fire({
          icon: "success",
          text: "Сообщение успешно отправлено",
        }).then(() => history.push("/"));
      }
      console.log(res);
    } catch (error) {
      console.log(error.response);
      const { status, data } = error?.response;
      if (status == 400) {
      }
    }
  };
  console.log(partnerData);
  return (
    <React.Fragment>
      <div className="navPart">
        <Navbar />
      </div>
      <div className="partnyor">
        <h1>Стать партнёром</h1>
        <div className="partnyor_main ">
          <div className="partnyor_left">
            <h1>Почему с нами работать выгодно?</h1>
            <div className="partnyor_list">
              <img src={normal} alt="" />
              <p>Гарантированный и стабильный доход</p>
            </div>
            <div className="partnyor_list">
              <img src={normal} alt="" />
              <p>Быстрый и маленький вклад</p>
            </div>
            <div className="partnyor_list">
              <img src={normal} alt="" />
              <p>Быстрый и маленький вклад</p>
            </div>
            <div className="partnyor_list">
              <img src={normal} alt="" />
              <p>Гарантированный и стабильный доход</p>
            </div>
            <div className="partnyor_list">
              <img src={normal} alt="" />
              <p>Быстрый и маленький вклад</p>
            </div>
            <div className="partnyor_list">
              <img src={normal} alt="" />
              <p>Быстрый и маленький вклад</p>
            </div>
            <div className="partnyor_list">
              <img src={normal} alt="" />
              <p>Гарантированный и стабильный доход</p>
            </div>
          </div>
          <div className="partnyor_right">
            <h1>Напишите нам</h1>
            <div className="partnyor_input">
              <p>Ваш телефон номера</p>
              <input
                onChange={handleInputChange}
                required
                type="tel"
                name="phone_number"
              />
            </div>
            <div className="partnyor_input">
              <p>Ваш e-mail адрес (необязательно)</p>
              <input
                onChange={handleInputChange}
                required
                type="email"
                name="email"
              />
            </div>
            <div className="partnyor_radio">
              <p>Кем вы являетесь?</p>
              <FormControl component="fieldset">
                <RadioGroup
                  onChange={handleInputChange}
                  row
                  aria-label="position"
                  name="partnership_type"
                  defaultValue="1"
                >
                  <FormControlLabel
                    value="university"
                    control={<Radio color="primary" />}
                    label="Университет"
                  />
                  <FormControlLabel
                    value="partner"
                    control={<Radio color="primary" />}
                    label="Партнер"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="partnyor_input">
              <p>Ваше предложение</p>
              <textarea
                required
                onChange={handleInputChange}
                name="request_content"
                id=""
                cols="51"
                rows="6"
              ></textarea>
            </div>
            <a onClick={onSubmit} href="#">
              Написать
            </a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Partnyors;
