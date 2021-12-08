import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "../../../utils/axios";
import { useTranslation } from "react-i18next";

// import css
import "../../../style/css/footer.css";

const Footer = () => {
  const { t, i18n } = useTranslation();
  console.log(t);
  const [phone, setPhone] = useState("");

  const [write, setWrite] = useState(false);

  const handlecheck = () => {
    setWrite(!write);
  };
  const callMe = async () => {
    try {
      const data = await Axios.post("/company/call-me-request/", {
        phone_number: phone,
        write_to_telegram: write,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="footer">
      <p>{t("part30")}</p>
      <div className="top">
        <h1>{t("part31")}</h1>
        <div>
          <div>
            <input
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+998 9x xxx xx xx"
            />
          </div>
          <label className="custom-checkbox">
            <input type="checkbox" onClick={handlecheck} name="" id="" />
            <span></span>
            <p>{t("part44")}</p>
          </label>
          <button onClick={callMe}>{t("part32")}</button>
        </div>
      </div>
      <div className="down">
        {/* left */}
        <div className="left">
          <h1>Education Gateway</h1>
          <p>{t("part33")}:</p>
          <h2>Muqumiy ko’chasi, 54a uy, Toshkent, Uzbekistan</h2>
          <p>{t("part34")}:</p>
          <h2>Education_gateway@gmail.com</h2>
          <p>{t("part35")}:</p>
          <h2>+998 55 503 1010</h2>
          <p>{t("part36")}:</p>
          <h2>
            {t("part46")} 9:00 {t("part51")} 18:00
          </h2>
        </div>
        {/* end left */}
        {/* center */}
        <div className="center">
          <h1>{t("part24")}</h1>
          <p>{t("part45")}</p>
        </div>
        {/* end center */}
        {/* right */}
        <div className="right">
          <h1>{t("part47")}</h1>
          <p> {t("part48")}</p>
          <div className="email">
            <input type="text" placeholder="Ваш e-mail адрес" />
          </div>
          <button>{t("part49")}</button>
          <h4>{t("part50")}</h4>
          <div className="social">
            {/* facebook icon */}
            <svg
              id="facebook"
              width="21"
              height="35"
              viewBox="0 0 21 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.8648 34.9316H7.24893C6.3109 34.9316 5.54784 34.1701 5.54784 33.2339V20.5917H2.2714C1.33337 20.5917 0.570312 19.8298 0.570312 18.8939V13.4767C0.570312 12.5405 1.33337 11.7789 2.2714 11.7789H5.54784V9.06616C5.54784 6.37638 6.3941 4.08794 7.99486 2.44865C9.60285 0.801888 11.85 -0.0683594 14.4934 -0.0683594L18.7764 -0.0614167C19.7128 -0.0598145 20.4745 0.701752 20.4745 1.63635V6.66611C20.4745 7.60231 19.7117 8.36388 18.774 8.36388L15.8903 8.36495C15.0109 8.36495 14.7869 8.54092 14.739 8.59486C14.6601 8.68431 14.5662 8.93719 14.5662 9.63547V11.7786H18.5573C18.8577 11.7786 19.1488 11.8526 19.399 11.992C19.9386 12.2929 20.2741 12.862 20.2741 13.4769L20.272 18.8942C20.272 19.8298 19.5089 20.5914 18.5709 20.5914H14.5662V33.2339C14.5662 34.1701 13.8029 34.9316 12.8648 34.9316ZM7.6037 32.8798H12.5101V19.6731C12.5101 19.048 13.0197 18.5395 13.6458 18.5395H18.2161L18.218 13.8308H13.6455C13.0195 13.8308 12.5101 13.3223 12.5101 12.6972V9.63547C12.5101 8.83385 12.5917 7.92221 13.1979 7.23702C13.9305 6.40869 15.085 6.3131 15.8898 6.3131L18.4187 6.31203V1.9899L14.4918 1.98349C10.2436 1.98349 7.6037 4.69757 7.6037 9.06616V12.6972C7.6037 13.3221 7.09429 13.8308 6.46822 13.8308H2.62618V18.5395H6.46822C7.09429 18.5395 7.6037 19.048 7.6037 19.6731V32.8798ZM18.7724 1.99043H18.7726H18.7724Z"
                fill="white"
              />
            </svg>
            {/* facebook icon */}

            {/* telegramm icon */}
            <svg
              id="telegram"
              width="35"
              height="31"
              viewBox="0 0 35 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M34.4596 1.47672C34.0321 0.953873 33.3917 0.666016 32.6563 0.666016C32.2566 0.666016 31.8331 0.75013 31.3978 0.916489L1.77099 12.226C0.198724 12.826 -0.0130295 13.7264 0.00058899 14.2097C0.0142074 14.693 0.276697 15.5801 1.88047 16.0904C1.89008 16.0933 1.8997 16.0963 1.90931 16.0989L8.05471 17.8576L11.3782 27.3612C11.8313 28.6568 12.8484 29.4616 14.033 29.4616C14.7798 29.4616 15.5144 29.1486 16.1574 28.5569L19.9586 25.057L25.4719 29.4963C25.4725 29.4969 25.4733 29.4971 25.4738 29.4977L25.5261 29.5398C25.5309 29.5436 25.536 29.5476 25.5408 29.5513C26.1537 30.0266 26.8226 30.2776 27.476 30.2779H27.4762C28.7529 30.2779 29.7695 29.3329 30.0656 27.8706L34.9199 3.90107C35.1149 2.93897 34.9515 2.07806 34.4596 1.47672ZM10.1106 17.5235L21.9669 11.4665L14.5844 19.311C14.4634 19.4395 14.3777 19.5968 14.3355 19.7679L12.912 25.5341L10.1106 17.5235ZM14.7681 27.0482C14.719 27.0933 14.6695 27.1336 14.6201 27.1708L15.9409 21.8216L18.3433 23.7563L14.7681 27.0482ZM32.91 3.49385L28.0557 27.4637C28.009 27.6931 27.8597 28.2269 27.476 28.2269C27.2864 28.2269 27.0482 28.1235 26.8044 27.9358L20.557 22.9055C20.5562 22.9047 20.5551 22.9039 20.5541 22.9034L16.8368 19.91L27.5128 8.5658C27.8546 8.20264 27.8856 7.64642 27.5863 7.24748C27.2867 6.84853 26.7438 6.72303 26.2997 6.95001L8.74044 15.9206L2.51146 14.1384L32.1292 2.83242C32.3794 2.73682 32.5541 2.7168 32.6563 2.7168C32.7191 2.7168 32.8307 2.72427 32.8721 2.77528C32.9266 2.84177 32.996 3.06847 32.91 3.49385Z"
                fill="white"
              />
            </svg>
            {/* telegramm icon */}

            <h6 id="copyrightFooter">
              &copy; 2021 All rights reserved by{" "}
              <Link style={{ color: "white" }} to="http://algorithmgateway.uz/">
                Algorithm Gateway
              </Link>
            </h6>
          </div>
          {/* end right */}
        </div>
        {/* <h6 id="copyrightFooter">&copy; 2021 All rights reserved</h6> */}
      </div>
    </div>
  );
};

export default Footer;
