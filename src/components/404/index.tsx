import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import errorImg from './error.png';

import './404.scss';

const Page404 = (): ReactNode => {
  return (
    <div className="not-found-page">
      <img src={errorImg} alt="404 not found" />
      <Link to="/?page=1">Go home</Link>
    </div>
  );
};

export default Page404;
