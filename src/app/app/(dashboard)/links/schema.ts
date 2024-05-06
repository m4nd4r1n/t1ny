import * as z from 'zod';

const destinationUrlSchema = z
  .string()
  .min(1, 'URL is required')
  .url('Must be a valid URL');

export const newLinkFormSchema = z.object({
  destination: destinationUrlSchema,
});

export type NewLinkForm = z.infer<typeof newLinkFormSchema>;
