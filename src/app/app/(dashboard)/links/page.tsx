import type { Metadata } from 'next';

import CreateNewLink from './_components/CreateNewLink';
import LimitsText from './_components/LimitsText';
import LinkList from './_components/LinkList';

const LinksPage = () => {
  return (
    <>
      <div className='flex w-full justify-between'>
        <h1 className='text-3xl font-bold'>All links</h1>
        <CreateNewLink limitsElement={<LimitsText />} />
      </div>
      <LinkList />
    </>
  );
};

export const metadata: Metadata = {
  title: 't1ny | Links',
};

export default LinksPage;
