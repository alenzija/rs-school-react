import { useParams } from 'next/navigation';

const LeftSidePanel = () => {
  const params = useParams();

  return <div>{params.name}</div>;
};

export default LeftSidePanel;
