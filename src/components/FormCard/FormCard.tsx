'use client';

import type { Response } from '@/utils/server-action-response';
import type { FC, FormEventHandler } from 'react';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/Button';
import CardWithTitle from '@/components/CardWithTitle';
import { Input } from '@/components/Input';
import { formCard } from './FormCard.styles';

export interface FormCardProps {
  className?: string;
  title: string;
  description: string;
  helpText: string;
  submit?: (values: string) => Promise<Response>;
  buttonText?: string;
  isDanger?: boolean;
  inputAttrs: {
    name: string;
    type: string;
    defaultValue?: string;
    placeholder?: string;
    maxLength?: number;
    pattern?: string;
  };
  isDisabled?: boolean;
}

const FormCard: FC<FormCardProps> = ({
  className,
  submit,
  helpText,
  description,
  title,
  buttonText = 'Save changes',
  inputAttrs,
  isDanger = false,
  isDisabled,
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const slots = formCard({ isDanger });

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!submit) return;
    const value = new FormData(e.currentTarget).get(inputAttrs.name) as string;
    if (inputAttrs.defaultValue === value) return;

    startTransition(async () => {
      const res = await submit(value).catch((e) => {
        toast.error(e.message);
      });
      if (!res) return;
      if (res.ok) {
        res.message && toast.success(res.message);
        router.refresh();
      }
    });
  };

  return (
    <form className={className} onSubmit={handleFormSubmit}>
      <CardWithTitle className={slots.card()} title={title}>
        <span className={slots.description()}>{description}</span>
        <Input isRequired size='sm' isDisabled={isDisabled} {...inputAttrs} />
      </CardWithTitle>
      <div className={slots.footer()}>
        <span className={slots.helpText()}>{helpText}</span>
        <Button
          type='submit'
          color={isDanger ? 'danger' : 'default'}
          isLoading={isPending}
          disabled={isDisabled}
        >
          {buttonText}
        </Button>
      </div>
    </form>
  );
};

export default FormCard;
