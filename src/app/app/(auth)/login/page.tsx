import LoginButton from './LoginButton';

const LoginPage = () => {
  return (
    <div className='mx-4 w-full max-w-sm space-y-4 overflow-hidden rounded-lg border border-gray-light text-center shadow-md'>
      <div className='space-y-4 px-8 pt-8'>
        <h1 className='text-3xl font-bold'>t1ny.kr</h1>
        <p className='text-sm text-default'>Free URL Shortener</p>
      </div>
      <div className='space-y-4 bg-gray-light p-8'>
        <LoginButton />
      </div>
    </div>
  );
};

export default LoginPage;
