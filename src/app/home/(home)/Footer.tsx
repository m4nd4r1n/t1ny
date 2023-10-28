import { Link } from '@/components/Link';

const Footer = () => {
  return (
    <footer className='bg-gray-light'>
      <div className='mx-auto flex w-full max-w-screen-lg flex-col-reverse items-center justify-between gap-2 p-6 px-11 sm:flex-row sm:gap-10'>
        <div className='text-gray-500 flex flex-col items-center sm:items-start sm:gap-3'>
          <Link href='/' color='default' isBlock>
            <span className='font-icon text-3xl antialiased after:content-logo'></span>
            <span className='ml-1 text-lg font-medium'>t1ny</span>
          </Link>
          <span className='text-xs sm:pl-2'>© 2023 t1ny</span>
        </div>
        <div className='flex flex-wrap gap-4'>
          {links.map(({ href, text }) => (
            <Link
              key={href}
              href={href}
              color='default'
              className='text-sm'
              isExternal={href?.includes('http')}
            >
              {text}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

const links = [
  {
    href: process.env.NEXT_PUBLIC_TERMS_OF_SERVICE,
    text: 'Terms of Service',
  },
  {
    href: process.env.NEXT_PUBLIC_PRIVACY_POLICY,
    text: 'Privacy Policy',
  },
  {
    href: 'mailto:admin@t1ny.kr',
    text: 'Contact Us',
  },
];

export default Footer;
