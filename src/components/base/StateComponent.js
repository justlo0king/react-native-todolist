import React, { Component } from 'react';

export class StateComponent extends Component {
  componentDidMount() {
    this._mounted = true;
  }
  componentWillUnmount() {
    this._mounted = false;
  }

  updateState(values, callback) {
    if (this._mounted) this.setState((prevState) => (values), callback);
  }
}
