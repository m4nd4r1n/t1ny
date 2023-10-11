import { BsArrowReturnRight } from 'react-icons/bs';
import { FaRegCalendar } from 'react-icons/fa6';

import ImageWithFallback from '@/components/ImageWithFallback';
import { Link } from '@/components/Link';
import { httpScheme } from '@/libs/constants';
import { formatDate } from '@/libs/utils';

import LinkCopyButton from './LinkCopyButton';
import LinkDeleteButton from './LinkDeleteButton';
import type { Link as LinkType } from './types';

interface LinkListItemProps {
  link: LinkType;
}

const LinkListItem: React.FC<LinkListItemProps> = ({
  link: {
    id: urlId,
    target_url: targetUrl,
    created_at: createdAt,
    target_favicon: targetFavicon,
    target_title: targetTitle,
  },
}) => {
  const shortenUrl = `${httpScheme}://${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/${urlId}`;

  return (
    <div className='flex flex-col gap-4 rounded-lg border border-default-200 bg-white p-4 shadow-sm lg:flex-row'>
      <div className='flex gap-2'>
        <div className='flex h-12 w-12 items-center justify-center'>
          <ImageWithFallback
            src={targetFavicon}
            fallbackSrc='https://www.notion.so/icons/globe_gray.svg'
            width={32}
            height={32}
            alt={`Favicon for ${new URL(targetUrl).hostname}`}
          />
        </div>
        <div className='flex flex-1 flex-col gap-2'>
          <h3 className='ellipsis text-lg font-medium'>{targetTitle}</h3>
          <Link
            className='ellipsis font-medium'
            isExternal
            href={shortenUrl}
            justify='start'
          >
            {shortenUrl}
          </Link>
          <div className='flex text-sm text-default-500'>
            <BsArrowReturnRight className='mr-1 h-4 min-w-[16px]' />
            <Link
              isExternal
              href={targetUrl}
              className='ellipsis'
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
      </div>
      <div className='flex w-full justify-end gap-2 border-t border-default-200 pt-4 lg:ml-auto lg:w-auto lg:border-none lg:pt-0'>
        <LinkCopyButton shortenUrl={shortenUrl} />
        <LinkDeleteButton urlId={urlId} />
      </div>
    </div>
  );
};

export default LinkListItem;
