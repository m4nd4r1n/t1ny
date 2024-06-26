'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { FaTrashCan } from 'react-icons/fa6';
import { toast } from 'sonner';

import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { deleteLinkAction } from '../actions';

interface LinkDeleteButtonProps {
  urlId: string;
}

const LinkDeleteButton: React.FC<LinkDeleteButtonProps> = ({ urlId }) => {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const open = () => {
    setOpen(true);
  };
  const close = () => {
    setOpen(false);
  };
  const onDeleteClick = () => {
    startTransition(async () => {
      const res = await deleteLinkAction(urlId).catch(() => {
        toast.error('Server error occurred.');
      });
      if (!res) return;
      if (res.ok) {
        toast.success(res.message);
        close();
        router.replace('/links');
        router.refresh();
      }
    });
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
          <Button onClick={onDeleteClick} color='danger' isLoading={isPending}>
            Delete link
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default LinkDeleteButton;
