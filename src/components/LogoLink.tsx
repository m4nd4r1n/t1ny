import { Link } from './Link';

interface LogoLinkProps {
  className?: string;
}
const LogoLink: React.FC<LogoLinkProps> = ({ className }) => {
  return (
    <Link href='/' color='default' isBlock className={className}>
      <span className='font-icon text-4xl antialiased after:h-6 after:w-6 after:content-logo'></span>
    </Link>
  );
};

export default LogoLink;
