import React, { useEffect, useState } from "react";
// import "../../../../style/css/invoisModal.css"
import folder_icon from "../../../../assets/icon/folder_icon.svg";
import Message from "../../../../assets/icon/Message2.svg";
import Axios from "../../../../utils/axios";
const InvoisModal = (props) => {
  const [file, setFile] = useState();
  const formData = new FormData();
  formData.append("university_invoice_upload", file);

  const setInvois = async () => {
    try {
      const res = await Axios.patch(
        `applicant/university-check-documents/${props.id}/`,
        formData
      );
    } catch (error) {}
    props.onClose()
  };
  return (
    <div className="invoisModal"    >
          <div   className="invoisCenter">
            <div className="type_file">
              <label htmlFor="chFile">
                <img src={folder_icon} alt="" />
                Drop your files here or a
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  id="chFile"
                />
                {/* <img src={Message} alt="" /> */}
                <label htmlFor="chFile">choose file</label>
              </label>
            </div>
            <div className="button">
              <button
                className="cancel"
                onClick={props.onClose}
              >
                cancel
              </button>
              <button className="send" onClick={setInvois}>
                Send
              </button>
            </div>
          </div>
        </div>
  );
};
export default InvoisModal;
