import Image from 'next/image';
import Link from 'next/link';

import errorImg from '../assets/image/error.png';

const Page404 = () => {
  return (
    <div style={{ flexBasis: '100%' }} role="page404">
      <Image
        style={{
          display: 'block',
          margin: '20px auto',
          width: '50%',
          textAlign: 'center',
        }}
        src={errorImg}
        alt="404 not found"
      />
      <Link
        style={{
          display: 'block',
          margin: '20px auto',
          width: '50%',
          textAlign: 'center',
        }}
        href="/?page=1"
      >
        Go home
      </Link>
    </div>
  );
};

export default Page404;
