'use server';

import { createHash } from 'crypto';
import type {
  ChangePasswordForm,
  ForgotPasswordForm,
  SignInForm,
  SignUpForm,
} from './schema';
import type { OAuthProvider } from './types';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { createServerActionClient } from '@/libs/supabase/server';
import {
  failureResponse,
  successResponse,
} from '@/utils/server-action-response';
import {
  authSchemaMap,
  changePasswordFormSchema,
  forgotPasswordFormSchema,
} from './schema';

const auth =
  (type: 'signin' | 'signup') => async (values: SignInForm | SignUpForm) => {
    const result = authSchemaMap[type].safeParse(values);
    if (!result.success) {
      return failureResponse(result.error.message);
    }

    const cookieStore = cookies();
    const supabase = createServerActionClient(cookieStore);

    const { signUp, signInWithPassword } = supabase.auth;
    const { email, password } = values;

    const authFnMap = {
      signin: signInWithPassword.bind(supabase.auth),
      signup: signUp.bind(supabase.auth),
    };

    const emailHash = createHash('md5')
      .update(email)
      .digest('hex')
      .trim()
      .toLowerCase();

    const { error } = await authFnMap[type]({
      email,
      password,
      options: {
        data: {
          avatar_url: `https://gravatar.com/avatar/${emailHash}`,
        },
      },
    });

    if (error) {
      console.error(error);
      return failureResponse(error.message);
    }

    return successResponse();
  };

export const emailSignin = auth('signin');

export const emailSignup = auth('signup');

export const forgotPassword = async (values: ForgotPasswordForm) => {
  const result = forgotPasswordFormSchema.safeParse(values);
  if (!result.success) {
    return failureResponse(result.error.message);
  }

  const cookieStore = cookies();
  const supabase = createServerActionClient(cookieStore);

  const { email } = values;

  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    console.error(error);
    return failureResponse(error.message);
  }

  return successResponse();
};

export const oauthLogin = async (provider: OAuthProvider) => {
  const origin = headers().get('origin');
  const cookieStore = cookies();
  const supabase = createServerActionClient(cookieStore);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${origin}/api/auth/callback`,
    },
  });

  if (error) {
    console.error(error);
    return failureResponse('Could not authenticate user');
  }

  redirect(data.url);
};

export const changePassword = async (values: ChangePasswordForm) => {
  const result = changePasswordFormSchema.safeParse(values);
  if (!result.success) {
    return failureResponse(result.error.message);
  }
  const { password } = values;
  const cookieStore = cookies();
  const supabase = createServerActionClient(cookieStore);

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    console.error(error);
    return failureResponse(error.message);
  }

  return successResponse('Your Password has been reset successfully. Sign in.');
};
