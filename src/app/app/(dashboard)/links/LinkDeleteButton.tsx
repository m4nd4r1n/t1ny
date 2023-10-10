'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { FaTrashCan } from 'react-icons/fa6';
import { toast } from 'sonner';

import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { deleteLink } from '@/libs/api';

interface LinkDeleteButtonProps {
  urlId: string;
}

const LinkDeleteButton: React.FC<LinkDeleteButtonProps> = ({ urlId }) => {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);

  const open = () => {
    setOpen(true);
  };
  const close = () => {
    setOpen(false);
  };
  const onDeleteClick = async () => {
    try {
      const res = await deleteLink(urlId);
      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message ?? 'Failed to delete link');
      }
      toast.success('Link deleted');
      close();
      router.refresh();
    } catch (e) {
      if (e instanceof Error) toast.error(e.message);
    }
  };

  return (
    <>
      <Button onClick={open} color='danger' size='small'>
        <FaTrashCan />
        Delete
      </Button>
      <Modal isOpen={isOpen} onClose={close}>
        <h2 className='mb-8 text-2xl'>Delete link?</h2>
        <p className='text-default-500'>
          This will permanently delete the link.
        </p>
        <p className='text-default-500'>This action cannot be undone.</p>
        <div className='ml-auto mt-8 flex gap-3'>
          <Button
            className='bg-default-400 shadow-default-400/50'
            onClick={close}
          >
            Cancel
          </Button>
          <Button onClick={onDeleteClick} color='danger'>
            Delete link
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default LinkDeleteButton;
