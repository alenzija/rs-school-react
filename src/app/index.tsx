import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

import { IFormData } from '../types';

import './app.scss';

export const App = () => {
  const data = useSelector((state: RootState) => state.dataForm.currentData);

  return (
    <div>
      <h3>Your data:</h3>
      {data ? <View data={data} /> : <div>No information</div>}
    </div>
  );
};

const View: React.FC<{ data: IFormData }> = ({ data }) => {
  return (
    <div className="data">
      <div className="data__item">
        <span>Name:</span>
        {data.name}
      </div>
      <div className="data__item">
        <span>Age:</span>
        {data.age}
      </div>
      <div className="data__item">
        <span>Email:</span>
        {data.email}
      </div>
      <div className="data__item">
        <span>Gender:</span>
        {data.gender}
      </div>
      <div className="data__item">
        <span>Password:</span>
        {data.firstPassword}
      </div>
    </div>
  );
};
