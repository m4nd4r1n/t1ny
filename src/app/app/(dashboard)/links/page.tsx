import type { Metadata } from 'next';

const LinksPage = async () => {
  return (
    <div className='flex h-full flex-col gap-8'>
      <h1 className='text-3xl font-bold'>All links</h1>
    </div>
  );
};

export const metadata: Metadata = {
  title: 't1ny | Links',
};

export default LinksPage;
