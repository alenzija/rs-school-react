import { Link } from 'react-router-dom';

import errorImg from './error.png';

import './404.scss';

export const Page404 = () => {
  return (
    <div className="not-found-page" role="page404">
      <img src={errorImg} alt="404 not found" />
      <Link to="/?page=1">Go home</Link>
    </div>
  );
};
