import { Link } from '@/components/Link';
import { LINKS_PATH } from '@/constants/urls';
import {
  getBrowsersById,
  getCountriesById,
  getDevicesById,
  getOSsById,
} from '@/libs/supabase/queries';
import AnalyticsDonutChartCard from './_components/AnalyticsDonutChartCard';
import DetailLinkCard from './_components/DetailLinkCard';
import LinkClickChartCard from './_components/LinkClickChartCard';

interface LinkDetailPageProps {
  params: { id: string };
}

const LinkDetailPage = ({ params: { id } }: LinkDetailPageProps) => {
  return (
    <>
      <Link className='w-fit' href={LINKS_PATH}>
        &larr; Back to links
      </Link>
      <h1 className='text-3xl font-bold'>Link Details</h1>
      <DetailLinkCard id={id} />
      <LinkClickChartCard id={id} />
      <div className='flex flex-col gap-8 pb-8 lg:grid lg:grid-cols-2'>
        <AnalyticsDonutChartCard
          urlId={id}
          getData={getCountriesById}
          title='Countries'
          label='Country'
          index='country'
          category='count'
        />
        <AnalyticsDonutChartCard
          urlId={id}
          getData={getDevicesById}
          title='Devices'
          label='Device'
          index='device'
          category='count'
        />
        <AnalyticsDonutChartCard
          urlId={id}
          getData={getBrowsersById}
          title='Browsers'
          label='Browser'
          index='browser'
          category='count'
        />
        <AnalyticsDonutChartCard
          urlId={id}
          getData={getOSsById}
          title='OSs'
          label='OS'
          index='os'
          category='count'
        />
      </div>
    </>
  );
};

export default LinkDetailPage;
