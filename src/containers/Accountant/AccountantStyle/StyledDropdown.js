// import styled from "styled-components";
import styled from "styled-components";

const StyledDropdown = styled.div`
  body {
    font-family: "Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", Helvetica, Arial,
      sans-serif;
  }
  .tableConfirm {
    font-family: Raleway;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    width: 197px;
    height: 40px;
    background: #5ec98b;
    border-radius: 4px;
    letter-spacing: 0.02em;
    color: #ffffff;
  }
  .modal {
    position: fixed;
    background-color: black;
    left: 0;
    top: 0;
    right: 0;
    z-index: 5000;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    .modal-content {
      width: 500px;
      background-color: #fff;
    }
    .modal-header,
    .modal-footer {
      text-align: center;
      padding: 10px;
    }
    .modal-title {
      margin: 0;
    }
    .modal-body {
      font-family: Raleway;
      font-style: normal;
      font-weight: 600;
      font-size: 26px;
      line-height: 31px;
      text-align: center;
      letter-spacing: 0.02em;
      color: #00121a;
      text-align: center;
      padding: 10px;
    }
    .modal-footer {
      .tableBtn {
        display: flex;
        justify-content: space-around;
        .cancel-btn {
          font-family: Raleway;
          font-style: normal;
          font-weight: 500;
          font-size: 20px;
          line-height: 23px;
          color: #00587f;
          background: #f3f5f7;
          border-radius: 10px;
          width: 160px;
          outline: none;
          border: none;
        }
        .confirm-btn {
          outline: none;
          border: none;
          font-family: Raleway;
          font-style: normal;
          font-weight: 500;
          font-size: 20px;
          line-height: 23px;
          text-align: center;
          color: #ffffff;
          background: #00587f;
          border-radius: 10px;
          padding: 16px;
        }
      }
    }
  }

  /* color: #27ae60; */
  /* select {
      font-family: Raleway;
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
      border: none;
      outline: none;
      background: none;
      option {
        a:active {
          color: #27ae60;
        }
      }
    } */

  .tableForm :active {
    color: #27ae60;
  }
`;

export { StyledDropdown };
