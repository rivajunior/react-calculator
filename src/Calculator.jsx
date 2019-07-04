import React, { Component } from 'react';

import Display from './components/Display';
import Button from './components/Button';
import './Calculator.css';

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  valuePosition: 0
};

class Calculator extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
    this.clearMemory = this.clearMemory.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.addDigit = this.addDigit.bind(this);
  }

  clearMemory() {
    this.setState(initialState);
  }

  setOperation(sign) {
    if (this.state.valuePosition === 0 && this.state.values[0] !== 0) {
      this.setState({ operation: sign, valuePosition: 1, clearDisplay: true });
      return;
    }

    const isEqualSign = sign === '=';
    const values = [...this.state.values];

    if (isEqualSign) {
      try {
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`);
      } catch (error) {
        values[0] = this.state.values[0];
      }
    }

    this.setState({
      values: values,
      displayValue: values[0],
      operation: isEqualSign ? this.state.operation : sign,
      valuePosition: 1,
      clearDisplay: true
    });
  }

  addDigit(digit) {
    let clearDisplay;
    let currentValue;
    let displayValue;

    if (digit === '.' && this.state.displayValue.includes('.')) {
      return;
    }

    clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay;
    currentValue = clearDisplay ? '' : this.state.displayValue;
    displayValue = currentValue + '' + digit;

    this.setState({ displayValue, clearDisplay: false });

    if (digit !== '.') {
      const index = this.state.valuePosition;
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];

      values[index] = newValue;

      this.setState({ values });
    }
  }

  render() {
    return (
      <div className="calculator">
        <Display
          value={this.state.displayValue}
          blink={this.state.clearDisplay}
        />
        <Button label="AC" click={this.clearMemory} triple />
        <Button label="/" click={this.setOperation} operation />
        <Button label="7" click={this.addDigit} />
        <Button label="8" click={this.addDigit} />
        <Button label="9" click={this.addDigit} />
        <Button label="*" click={this.setOperation} operation />
        <Button label="4" click={this.addDigit} />
        <Button label="5" click={this.addDigit} />
        <Button label="6" click={this.addDigit} />
        <Button label="-" click={this.setOperation} operation />
        <Button label="1" click={this.addDigit} />
        <Button label="2" click={this.addDigit} />
        <Button label="3" click={this.addDigit} />
        <Button label="+" click={this.setOperation} operation />
        <Button label="0" click={this.addDigit} double />
        <Button label="." click={this.addDigit} />
        <Button label="=" click={this.setOperation} operation />
      </div>
    );
  }
}

export default Calculator;
