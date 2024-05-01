import type { FC, PropsWithChildren } from 'react';

interface DividerProps extends PropsWithChildren {}

const Divider: FC<DividerProps> = ({ children }) => {
  return (
    <div className='relative'>
      <div className='absolute inset-0 flex items-center'>
        <div className='w-full border-t border-default-300' />
      </div>
      <div className='relative flex justify-center text-sm'>
        <span className='bg-white px-2 text-sm text-default'>{children}</span>
      </div>
    </div>
  );
};

export default Divider;
