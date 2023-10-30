import { headers } from 'next/headers';

import { AreaChart } from '@/components/AreaChart';
import { BarList } from '@/components/BarList';
import CardWithTitle from '@/components/CardWithTitle';
import { Link } from '@/components/Link';
import { API } from '@/libs/api';
import prisma from '@/libs/prisma';

import LinkCard from '../../LinkCard';

interface LinkDetailPageProps {
  params: { id: string };
}

const LinkDetailPage = async ({ params: { id } }: LinkDetailPageProps) => {
  const header = Object.fromEntries(headers());

  const [clicks, link, ...lists] = await Promise.all([
    API.getClicksById(id, header),
    getLink(id),
    API.getCountriesById(id, header),
    API.getDevicesById(id, header),
    API.getBrowsersById(id, header),
    API.getOSsById(id, header),
  ]);

  const cardLists = lists.map((list, index) => ({
    title: TITLES[index],
    tag: TAGS[index],
    data: list,
  }));

  const totalClicks = Intl.NumberFormat().format(
    clicks.reduce((acc, { 'Link clicks': clicks }) => acc + clicks, 0),
  );

  return (
    <>
      <Link className='w-fit' href='/links'>
        &larr; Back to links
      </Link>
      <h1 className='text-3xl font-bold'>Link Details</h1>
      {link && <LinkCard link={link} isTitleLink={false} />}
      <CardWithTitle title='Link clicks'>
        <div className='-mt-2 mb-2 text-3xl font-bold'>{totalClicks}</div>
        <AreaChart
          className='h-80'
          data={clicks}
          categories={['Link clicks']}
          index='date'
        />
      </CardWithTitle>
      <div className='flex flex-col gap-8 pb-8 lg:grid lg:grid-cols-2'>
        {cardLists.map(({ title, tag, data }) => (
          <CardWithTitle key={title} title={title}>
            <div className='mb-2 flex justify-between text-sm font-bold'>
              <span>{tag}</span>
              <span>Clicks</span>
            </div>
            <BarList data={data} />
          </CardWithTitle>
        ))}
      </div>
    </>
  );
};

const getLink = (id: string) =>
  prisma.url.findUnique({
    where: { id },
    select: {
      id: true,
      target_url: true,
      created_at: true,
      target_favicon: true,
      target_title: true,
    },
  });

const TITLES = Object.freeze(['Countries', 'Devices', 'Browsers', 'OSs']);
const TAGS = Object.freeze(['Country', 'Device', 'Browser', 'OS']);

export default LinkDetailPage;
