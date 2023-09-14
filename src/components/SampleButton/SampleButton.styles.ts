import { tv } from 'tailwind-variants';

export const sampleButton = tv({
  base: 'inline-block cursor-pointer rounded-[3em] border-0 font-sans font-bold leading-none',
  variants: {
    primary: {
      true: 'bg-[#1ea7fd] text-white',
      false:
        'bg-transparent text-[#333] shadow-[rgba(0,0,0,0.15)_0px_0px_0px_1px_inset]',
    },
    size: {
      small: 'px-4 py-2.5 text-xs',
      medium: 'px-5 py-2.5 text-sm',
      large: 'px-6 py-3 text-base',
    },
  },
});
