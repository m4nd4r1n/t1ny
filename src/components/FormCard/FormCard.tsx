'use client';

import { useRouter } from 'next/navigation';

import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';

import { Button } from '@/components/Button';
import CardWithTitle from '@/components/CardWithTitle';
import { Input } from '@/components/Input';

import { formCard } from './FormCard.styles';

interface FormCardProps {
  className?: string;
  title: string;
  description: string;
  helpText: string;
  handleSubmit: (formData: FormData) => Promise<void>;
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
  successMessage?: string;
}

const FormCard: React.FC<FormCardProps> = ({
  className,
  handleSubmit,
  helpText,
  description,
  title,
  buttonText = 'Save changes',
  inputAttrs,
  isDanger = false,
  successMessage = 'Successfully updated.',
}) => {
  const router = useRouter();
  const slots = formCard({ isDanger });

  return (
    <form
      className={className}
      action={async (data) => {
        if (inputAttrs.defaultValue === data.get(inputAttrs.name)) return;
        try {
          await handleSubmit(data);
          router.refresh();
          toast.success(successMessage);
        } catch (err) {
          if (err instanceof Error) toast.error(err.message);
        }
      }}
    >
      <CardWithTitle className={slots.card()} title={title}>
        <span className={slots.description()}>{description}</span>
        <Input isRequired size='sm' {...inputAttrs} />
      </CardWithTitle>
      <div className={slots.footer()}>
        <span className={slots.helpText()}>{helpText}</span>
        <FormButton isDanger={isDanger}>{buttonText}</FormButton>
      </div>
    </form>
  );
};

interface FormButtonProps extends React.PropsWithChildren {
  isDanger: boolean;
}

const FormButton: React.FC<FormButtonProps> = ({ isDanger, children }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      color={isDanger ? 'danger' : 'default'}
      isLoading={pending}
    >
      {children}
    </Button>
  );
};

export default FormCard;
