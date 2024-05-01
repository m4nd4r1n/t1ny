import type { InputProps } from '@/components/Input';

export type AuthType = 'signin' | 'signup' | 'forgot' | 'change';

export type FormType = 'signin' | 'signup';

export type OAuthProvider = 'github' | 'google';

export interface FormInputProps
  extends Omit<
    InputProps,
    'size' | 'id' | 'type' | 'label' | 'isRequired' | 'placeholder'
  > {}
