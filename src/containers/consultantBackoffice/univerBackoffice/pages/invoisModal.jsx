import React, { useEffect, useState } from "react";
import "../../../../style/css/invoisModal.css";
import folder_icon from "../../../../assets/icon/folder_icon.svg";
import Message from "../../../../assets/icon/Message2.svg";
import close from "../../../../assets/icon/close.svg";
import Axios from "../../../../utils/axios";
import check from "../../../../assets/icon/check1.svg";
import Swal from "sweetalert2";
const InvoisModal = (props) => {
  const [file, setFile] = useState();
  const formData = new FormData();
  formData.append(`${props?.where}`, file);

  const setInvois = async () => {
    try {
      const res = await Axios.patch(
        `applicant/university-check-documents/${props.id}/`,
        formData
      );
      if(res?.status === 200){
        Swal.fire({
          icon:'success',
          text:'Успешно отправлено'
        })
      }
    } catch (error) {}
    props.onClose();
  };
  return (
    <div className="invoisModal">
      <div className="invoisCenter">
        <img src={close} className="close" alt="" onClick={props.onClose} />
        <div className="type_file">
          <label htmlFor="chFile">
            <img src={folder_icon} alt="" />
           <label htmlFor="chFile" > Drop your files here or a</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              id="chFile"
            />
            <label htmlFor="chFile">choose file</label>
          </label>
        {file &&  <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}><img  style={{width:"20px",marginLeft:'12px'}} src={check} alt="" /></div>||""}
        </div>
        <div className="button">
          <button className="cancel" onClick={props.onClose}>
            Cancel
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
