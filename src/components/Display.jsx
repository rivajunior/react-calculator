import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './Display.css';

const Display = props => {
  return (
    <div className="display">
      <CSSTransition in={props.blink} timeout={200} classNames="display-label">
        <div>{props.value}</div>
      </CSSTransition>
    </div>
  );
};

export default Display;
