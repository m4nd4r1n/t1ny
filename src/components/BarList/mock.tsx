import { FaGithub, FaReddit, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';

import { random } from '@/libs/utils';

const names = ['X', 'Google', 'GitHub', 'Reddit', 'Youtube'];
const icons = [
  <FaXTwitter key='x' className='h-5 w-5 fill-default' />,
  <FcGoogle key='google' className='h-5 w-5' />,
  <FaGithub key='github' className='h-5 w-5 fill-default' />,
  <FaReddit key='reddit' className='h-5 w-5 fill-orange' />,
  <FaYoutube key='youtube' className='h-5 w-5 fill-red' />,
];

const base = names.map((name) => ({
  name,
  value: random(1000, 4000),
}));

export const mockData = base.sort((a, b) => b.value - a.value);

export const mockDataWithIcon = base
  .map((item, index) => ({
    ...item,
    icon: () => icons[index],
  }))
  .sort((a, b) => b.value - a.value);
