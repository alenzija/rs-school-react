import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const App = () => {
  const forms = useSelector((state: RootState) => state.dataForm);
  return (
    <>
      <div>
        <Link to="/form">Form with uncontrolled components</Link>
        <Link to="/react-hook-form"> React Hook Form</Link>
      </div>
      <div>Datas:</div>
      {forms.currentData ? (
        <div>{forms.currentData?.name}</div>
      ) : (
        <div>No data</div>
      )}
    </>
  );
};
