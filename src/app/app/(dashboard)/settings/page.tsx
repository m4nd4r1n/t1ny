import type { Metadata } from 'next';

const SettingsPage = () => {
  return (
    <div className='flex flex-col'>
      <h1 className='text-3xl font-bold'>Settings</h1>
    </div>
  );
};

export const metadata: Metadata = {
  title: 't1ny | Settings',
};

export default SettingsPage;
