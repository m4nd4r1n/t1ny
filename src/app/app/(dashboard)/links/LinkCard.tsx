import { BsArrowReturnRight } from 'react-icons/bs';
import { FaRegCalendar } from 'react-icons/fa6';

import Card from '@/components/Card';
import ImageWithFallback from '@/components/ImageWithFallback';
import { Link } from '@/components/Link';
import { FALLBACK_IMAGE_URL, ROOT_URL } from '@/libs/constants';
import type { Link as LinkType } from '@/libs/types';
import { formatDate } from '@/libs/utils';

import LinkCopyButton from './LinkCopyButton';
import LinkDeleteButton from './LinkDeleteButton';

interface LinkListItemProps {
  link: LinkType;
  isTitleLink?: boolean;
}

const LinkCard: React.FC<LinkListItemProps> = ({
  link: {
    id: urlId,
    target_url: targetUrl,
    created_at: createdAt,
    target_favicon: targetFavicon,
    target_title: targetTitle,
  },
  isTitleLink = true,
}) => {
  const shortenUrl = `${ROOT_URL}/${urlId}`;

  return (
    <Card className='flex flex-col gap-4 lg:flex-row'>
      <div className='flex gap-2'>
        <div className='flex h-12 w-12 items-center justify-center'>
          <ImageWithFallback
            key={urlId}
            src={targetFavicon}
            fallbackSrc={FALLBACK_IMAGE_URL}
            width={32}
            height={32}
            alt={`Favicon for ${new URL(targetUrl).hostname}`}
          />
        </div>
        <div className='flex flex-1 flex-col gap-2'>
          <h3 className='ellipsis text-lg font-medium'>
            {isTitleLink ? (
              <Link
                className='ellipsis text-lg font-medium underline underline-offset-2'
                href={`/links/detail/${urlId}`}
                color='default'
              >
                {targetTitle}
              </Link>
            ) : (
              targetTitle
            )}
          </h3>
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
    </Card>
  );
};

export default LinkCard;
