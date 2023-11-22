import { useRouter } from 'next/router';

const LeftSidePanel = () => {
  const { query } = useRouter();

  return <div>{query.name}</div>;
};

export default LeftSidePanel;
