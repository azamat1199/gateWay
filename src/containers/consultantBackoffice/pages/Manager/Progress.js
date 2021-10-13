import React from 'react';
import './progress.css';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
const Progress = (props) => {
  return (
    <div>
      <div className="stepper-wrapper">
        <div className="stepper-item me-5 completed">
          <div className="step-counter">1</div>
          <div className="step-name">Заявка</div>
        </div>
        <div className="stepper-item me-5 completed">
          <div className="step-counter">2</div>
          <div className="step-name">Second</div>
        </div>
        <div className="stepper-item me-5 active">
          <div className="step-counter">3</div>
          <div className="step-name">Third</div>
        </div>
        <div className="stepper-item me-5">
          <div className="step-counter">4</div>
          <div className="step-name">Forth</div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
