import { NavLink, Outlet } from 'react-router-dom';

import './layout.scss';

export const Layout = () => {
  return (
    <div className="container">
      <header className="header">
        <div>
          <NavLink to="/">Home</NavLink>
        </div>
        <div>
          <NavLink to="/form">Form with uncontrolled components</NavLink>
        </div>
        <div>
          <NavLink to="/react-hook-form">React Hook Form</NavLink>
        </div>
      </header>
      <Outlet />
    </div>
  );
};
