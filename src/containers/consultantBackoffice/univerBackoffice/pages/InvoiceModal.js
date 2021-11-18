import React from "react";

const InvoiceModal = (props) => {
  if (!props.show) {
    return null;
  }

  return (
    <div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modal title</h5>
          </div>
          <div className="modal-body">
            <h5>This is modal content</h5>
          </div>
          <div className="modal-footer">
            <button className="modal-btn">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};
