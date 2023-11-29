import { Link } from 'react-router-dom';

export const App = () => {
  return (
    <div>
      <Link to="/form">Form with uncontrolled components</Link>
      <Link to="/react-hook-form"> React Hook Form</Link>
    </div>
  );
};
