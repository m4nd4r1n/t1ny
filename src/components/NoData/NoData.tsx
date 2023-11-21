import { noData } from './NoData.styles';

const NoData = () => {
  const slots = noData();
  return (
    <div className={slots.wrapper()}>
      <p className={slots.text()}>No data to display</p>
    </div>
  );
};

export default NoData;
