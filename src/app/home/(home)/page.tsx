import { Link } from '@/components/Link';

import HeroImage from './HeroImage';
import HeroText from './HeroText';
import { LOGIN_URL } from './constants';

const HomePage = () => {
  return (
    <>
      <HeroText />
      <Link
        className='px-4 py-2 font-medium after:rounded-full after:border after:border-primary/30'
        href={LOGIN_URL}
        isBlock
      >
        Get started
        <span className='ml-2'>&gt;</span>
      </Link>
      <HeroImage />
    </>
  );
};

export default HomePage;
