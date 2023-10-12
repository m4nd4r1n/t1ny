import Image from 'next/image';
import { redirect } from 'next/navigation';

import { getPageSession } from '@/libs/lucia';

const Profile = async () => {
  const session = await getPageSession();
  if (!session) redirect('/login');

  return (
    <div className='flex w-full flex-1 items-center gap-2 rounded-lg px-2 py-1.5'>
      {session.user.image && (
        <Image
          src={session.user.image}
          width={40}
          height={40}
          alt={session.user.name}
          className='h-6 w-6 rounded-full'
        />
      )}
      <span className='truncate text-sm font-medium'>{session.user.name}</span>
    </div>
  );
};

export default Profile;
