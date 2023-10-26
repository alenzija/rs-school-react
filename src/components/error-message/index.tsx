import { Component } from 'react';

import './error-message.scss';

import error from './error.jpg';

class ErrorMessage extends Component {
  render() {
    return <img src={error} alt="error" className="error-message" />;
  }
}

export default ErrorMessage;
