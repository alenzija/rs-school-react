import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const App = () => {
  const forms = useSelector((state: RootState) => state.dataForm);
  return (
    <>
      <div>Datas:</div>
      {forms.currentData ? (
        <div>{forms.currentData?.name}</div>
      ) : (
        <div>No data</div>
      )}
    </>
  );
};
