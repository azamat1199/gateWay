import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import warning from "../../../assets/images/Warning.svg";

const TableModal = (props) => {
  const [modal, setModal] = useState(false);
  const [show, setShow] = useState(true);

  const toggle = () => setModal(!modal);
  if (!props.show) {
    return null;
  }

  console.log(show);
  return (
    <>
      <div className="modal" onClick={props.onClose}>
        <div
          className="modal-content"
          style={{ borderRadius: "20px" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header" style={{ borderRadius: "20px" }}>
            <img src={warning} alt="warning modal" />
            {/* <h4 className="modal-title">Modal Title</h4> */}
          </div>
          <div className="modal-body">
            <p>Вы действительно хотите потвердить этот платеж?</p>
          </div>
          <div className="modal-footer">
            <div className="tableBtn">
              <button className="button cancel-btn" onClick={props.onClose}>
                Close
              </button>
              <button className="confirm-btn">Потвердить</button>
            </div>
          </div>
        </div>
      </div>
      <div className=""></div>
    </>
  );
};

export default TableModal;
