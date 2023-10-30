import { ReactNode } from 'react';
import './error-message.scss';

import error from './error.jpg';

const ErrorMessage = (): ReactNode => {
  return <img src={error} alt="error" className="error-message" />;
};

export default ErrorMessage;
