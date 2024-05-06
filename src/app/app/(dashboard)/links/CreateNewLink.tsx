'use client';

import type { FC } from 'react';
import type { NewLinkForm } from './schema';

import { useRouter } from 'next/navigation';
import { ReactElement, useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { createLinkAction } from '@/app/app/(dashboard)/links/actions';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Modal } from '@/components/Modal';
import { newLinkFormSchema } from './schema';

interface CreateNewLinkProps {
  limitsElement: ReactElement;
}

const CreateNewLink: FC<CreateNewLinkProps> = ({ limitsElement }) => {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewLinkForm>({
    resolver: zodResolver(newLinkFormSchema),
    mode: 'all',
  });
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();

  const open = () => {
    setOpen(true);
  };
  const close = () => {
    setOpen(false);
  };

  const handleFormSubmit = (values: NewLinkForm) => {
    startTransition(async () => {
      const res = await createLinkAction(values).catch(() => {
        toast.error('Server error occurred.');
      });
      if (!res) return;
      if (res.ok) {
        close();
        router.refresh();
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <>
      <Button onClick={open}>Create new link</Button>
      <Modal isOpen={isOpen} onClose={close}>
        <form className='space-y-8' onSubmit={handleSubmit(handleFormSubmit)}>
          <h2 className='text-2xl'>Create a new link</h2>
          <div>
            <Input
              type='url'
              id='destination'
              label='Destination'
              placeholder='https://example.com/long-url'
              isRequired
              errorMessage={errors.destination?.message}
              isInvalid={!!errors.destination}
              {...register('destination')}
            />
            {limitsElement}
          </div>
          <Button type='submit' fullWidth isLoading={isPending}>
            Create
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default CreateNewLink;
