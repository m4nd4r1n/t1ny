import type { FC, ReactElement } from 'react';
import type { AuthType } from './types';

import { Link } from '@/components/Link';
import {
  FORGOT_PASSWORD_PATH,
  SIGN_IN_PATH,
  SIGN_UP_PATH,
} from '@/constants/urls';
import Divider from './Divider';
import SocialLoginButtons from './SocialLoginButtons';

interface AuthProps {
  type: AuthType;
  form: ReactElement;
}

const Auth: FC<AuthProps> = ({ type, form }) => {
  return (
    <>
      <div className='my-4'>
        <h1 className='text-3xl font-medium'>{AUTH_MAP[type].TITLE}</h1>
      </div>
      {(type === 'signin' || type === 'signup') && (
        <>
          <SocialLoginButtons />
          <Divider>or</Divider>
        </>
      )}
      {form}
      {type !== 'change' && (
        <div className='space-y-3'>
          {type === 'signin' && (
            <div className='text-center'>
              <Link
                size='small'
                className='underline'
                href={FORGOT_PASSWORD_PATH}
              >
                Forgot Password?
              </Link>
            </div>
          )}
          <div className='text-center text-sm'>
            <span>{AUTH_MAP[type].LINK.DESCRIPTION}</span>{' '}
            <Link
              size='small'
              className='underline'
              href={AUTH_MAP[type].LINK.HREF}
            >
              {AUTH_MAP[type].LINK.LINK_TEXT}
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

interface AuthLinkData {
  HREF: string;
  LINK_TEXT: string;
  DESCRIPTION: string;
}

interface AuthString {
  LINK: AuthLinkData;
  TITLE: string;
}

interface AuthMap {
  signin: AuthString;
  signup: AuthString;
  forgot: AuthString;
  change: { TITLE: string };
}

const AUTH_MAP: AuthMap = {
  signin: {
    LINK: {
      HREF: SIGN_UP_PATH,
      LINK_TEXT: 'Sign Up Now',
      DESCRIPTION: "Don't have an account?",
    },
    TITLE: 'Sign in',
  },
  signup: {
    LINK: {
      HREF: SIGN_IN_PATH,
      LINK_TEXT: 'Sign In',
      DESCRIPTION: 'Already have an account?',
    },
    TITLE: 'Sign up',
  },
  forgot: {
    LINK: {
      HREF: SIGN_IN_PATH,
      LINK_TEXT: 'Sign In',
      DESCRIPTION: 'Already have an account?',
    },
    TITLE: 'Reset your password',
  },
  change: {
    TITLE: 'Change your password',
  },
};

export default Auth;
