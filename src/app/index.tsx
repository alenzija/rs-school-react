import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

import { IFormData } from '../types';

import './app.scss';

export const App = () => {
  const { currentData, previousData } = useSelector(
    (state: RootState) => state.dataForm
  );

  return (
    <div>
      <h3>Your data:</h3>
      {currentData ? (
        <View currentData={currentData} previousData={previousData} />
      ) : (
        <div>No information</div>
      )}
    </div>
  );
};

const View: React.FC<{
  currentData: IFormData;
  previousData: IFormData | undefined;
}> = ({ currentData, previousData }) => {
  return (
    <div className="data">
      <div
        className={`data__item ${
          previousData && currentData.name !== previousData.name ? 'active' : ''
        }`}
      >
        <span>Name:</span>
        {currentData.name}
      </div>
      <div
        className={`data__item ${
          previousData && currentData.age !== previousData.age ? 'active' : ''
        }`}
      >
        <span>Age:</span>
        {currentData.age}
      </div>
      <div
        className={`data__item ${
          previousData && currentData.email !== previousData.email
            ? 'active'
            : ''
        }`}
      >
        <span>Email:</span>
        {currentData.email}
      </div>
      <div
        className={`data__item ${
          previousData && currentData.gender !== previousData.gender
            ? 'active'
            : ''
        }`}
      >
        <span>Gender:</span>
        {currentData.gender}
      </div>
      <div
        className={`data__item ${
          previousData &&
          currentData.firstPassword !== previousData.firstPassword
            ? 'active'
            : ''
        }`}
      >
        <span>Password:</span>
        {currentData.firstPassword}
      </div>
    </div>
  );
};
