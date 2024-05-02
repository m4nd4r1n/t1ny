import LinkUsage from './LinkUsage';
import TotalLinkClicks from './TotalLinkClicks';
import TrendingLinks from './TrendingLinks';

const AppPage = () => {
  return (
    <>
      <h1 className='text-3xl font-bold'>Dashboard</h1>
      <TotalLinkClicks />
      <div className='flex flex-col gap-8 lg:grid lg:grid-cols-2'>
        <LinkUsage />
        <TrendingLinks />
      </div>
    </>
  );
};

export default AppPage;
