import * as z from 'zod';

const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Must be a valid email');

const passwordSchema = z.string().min(1, 'Password is required');

const passwordDetailSchema = z
  .string()
  .min(1, 'Password is required')
  .min(8, 'Password must be at least 8 characters')
  .superRefine((password, ctx) => {
    if (!/[A-Z]/.test(password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password must contain at least 1 uppercase letter',
      });
      return z.NEVER;
    }
    if (!/[a-z]/.test(password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password must contain at least 1 lowercase letter',
      });
      return z.NEVER;
    }
    if (!/[0-9]/.test(password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password must contain at least 1 number',
      });
      return z.NEVER;
    }
    if (!/[!@#$%^&*()_+\-=[\]{};':"|<>?,./`~]/.test(password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password must contain at least 1 symbol',
      });
    }
  });

export const signInFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpFormSchema = z.object({
  email: emailSchema,
  password: passwordDetailSchema,
});

export const forgotPasswordFormSchema = z.object({
  email: emailSchema,
});

export const changePasswordFormSchema = z.object({
  password: passwordDetailSchema,
});

export type SignInForm = z.infer<typeof signInFormSchema>;
export type SignUpForm = z.infer<typeof signUpFormSchema>;
export type ForgotPasswordForm = z.infer<typeof forgotPasswordFormSchema>;
export type ChangePasswordForm = z.infer<typeof changePasswordFormSchema>;

export const authSchemaMap = {
  signin: signInFormSchema,
  signup: signUpFormSchema,
};

export type AuthForm = SignUpForm | SignInForm;
