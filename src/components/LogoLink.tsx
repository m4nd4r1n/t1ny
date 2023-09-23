import { Link } from './Link';

const LogoLink = () => {
  return (
    <Link href='/' color='default' isBlock>
      <span className='font-icon text-4xl antialiased after:h-6 after:w-6 after:content-logo'></span>
    </Link>
  );
};

export default LogoLink;
