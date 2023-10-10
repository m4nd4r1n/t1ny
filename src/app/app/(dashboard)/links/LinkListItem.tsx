import { BsArrowReturnRight } from 'react-icons/bs';
import { FaRegCalendar } from 'react-icons/fa6';

import { Link } from '@/components/Link';
import { httpScheme } from '@/libs/constants';
import { formatDate } from '@/libs/utils';

import LinkCopyButton from './LinkCopyButton';
import LinkDeleteButton from './LinkDeleteButton';

interface LinkListItemProps {
  urlId: string;
  targetUrl: string;
  createdAt: string;
}

const LinkListItem: React.FC<LinkListItemProps> = ({
  urlId,
  targetUrl,
  createdAt,
}) => {
  const shortenUrl = `${httpScheme}://${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/${urlId}`;

  return (
    <div className='flex flex-col gap-2 rounded-lg border border-default-200 bg-white p-4 shadow-sm'>
      <div className='flex justify-between'>
        <Link
          className='truncate font-bold'
          size='large'
          isExternal
          href={shortenUrl}
          justify='start'
        >
          {shortenUrl}
        </Link>
        <div className='flex gap-2'>
          <LinkCopyButton shortenUrl={shortenUrl} />
          <LinkDeleteButton urlId={urlId} />
        </div>
      </div>
      <div className='flex text-sm text-default-500'>
        <BsArrowReturnRight className='mr-1 h-4 w-4' />
        <Link
          isExternal
          href={targetUrl}
          className='truncate'
          size='small'
          color='default'
          justify='start'
        >
          {decodeURIComponent(targetUrl)}
        </Link>
      </div>
      <div className='mt-4 flex items-center gap-1'>
        <FaRegCalendar />
        <span className='text-sm'>{formatDate(new Date(createdAt))}</span>
      </div>
    </div>
  );
};

export default LinkListItem;
