'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Modal } from '@/components/Modal';
import { API } from '@/libs/api';
import type { LinkLimits } from '@/libs/types';

const CreateNewLink: React.FC<LinkLimits> = ({ day_limit, total_limit }) => {
  const [isOpen, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const open = () => {
    setOpen(true);
  };
  const close = () => {
    setOpen(false);
    setError('');
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);

    const target = e.target as typeof e.target & {
      destination: { value: string };
    };

    try {
      const destination = new URL(target.destination.value).toString();
      await API.createLink({ destination });
      close();
      router.refresh();
    } catch (e) {
      if (e instanceof Error) setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={open}>Create new link</Button>
      <Modal isOpen={isOpen} onClose={close}>
        <form className='space-y-8' onSubmit={onSubmit}>
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
          <Button type='submit' fullWidth isLoading={loading}>
            Create
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default CreateNewLink;
