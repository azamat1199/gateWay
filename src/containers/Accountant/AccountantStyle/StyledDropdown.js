import styled from "styled-components";

const StyledDropdown = styled.div`
  .tableForm {
    /* color: #27ae60; */
    select {
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
    }
  }
  .tableForm :active {
    color: #27ae60;
  }
`;

export { StyledDropdown };
