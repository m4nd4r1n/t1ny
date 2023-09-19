import LoginButton from './LoginButton';

const LoginPage = () => {
  return (
    <div className='rounded-lg border border-gray p-8 text-center shadow-md'>
      <h1 className='text-3xl font-bold'>t1ny.kr</h1>
      <p className='my-4 text-sm text-default'>Free URL Shortener</p>
      <LoginButton />
    </div>
  );
};

export default LoginPage;
