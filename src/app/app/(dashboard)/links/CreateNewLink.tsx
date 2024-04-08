'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Modal } from '@/components/Modal';
import { createLink } from '@/libs/actions';
import type { LinkLimits } from '@/types';

const CreateNewLink: React.FC<LinkLimits> = ({ day_limit, total_limit }) => {
  const [isOpen, setOpen] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const open = () => {
    setOpen(true);
    setError('');
  };
  const close = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={open}>Create new link</Button>
      <Modal isOpen={isOpen} onClose={close}>
        <form
          className='space-y-8'
          action={async (data) => {
            try {
              await createLink(data);
              close();
              router.refresh();
              toast.success('Link created successfully!');
            } catch (e) {
              if (e instanceof Error) setError(e.message);
            }
          }}
        >
          <h2 className='text-2xl'>Create a new link</h2>
          <div>
            <Input
              type='url'
              name='destination'
              id='destination'
              label='Destination'
              placeholder='https://example.com/long-url'
              isRequired
              isInvalid={!!error}
              errorMessage={error}
            />
            <div className='mt-1.5 text-sm text-default-500'>
              <div>
                You can create{' '}
                <span className='font-bold text-default'>{day_limit}</span> more
                links today.
              </div>
              <div>
                You can create{' '}
                <span className='font-bold text-default'>{total_limit}</span>{' '}
                more links in total.
              </div>
            </div>
          </div>
          <CreateButton />
        </form>
      </Modal>
    </>
  );
};

const CreateButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type='submit' fullWidth isLoading={pending}>
      Create
    </Button>
  );
};

export default CreateNewLink;
