'use client';

import { FiCopy } from 'react-icons/fi';
import { toast } from 'sonner';

import { Button } from '@/components/Button';

interface LinkCopyButtonProps {
  shortenUrl: string;
}

const LinkCopyButton: React.FC<LinkCopyButtonProps> = ({ shortenUrl }) => {
  const onCopyClick = () => {
    navigator.clipboard
      ?.writeText(shortenUrl)
      .then(() => toast.success('Copied to clipboard'));
  };
  return (
    <Button
      onClick={onCopyClick}
      className='bg-default-400 shadow-default-400/50'
      size='small'
    >
      <FiCopy />
      Copy
    </Button>
  );
};

export default LinkCopyButton;
