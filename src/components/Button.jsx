import React from 'react';
import './Button.css';

export default function Button(props) {
  let classes = 'button ';

  classes += props.double ? 'button-double' : '';
  classes += props.triple ? 'button-triple' : '';
  classes += props.operation ? 'button-operation' : '';

  return (
    <button
      className={classes}
      onClick={event => props.click && props.click(props.label)}
    >
      {props.label}
    </button>
  );
}
