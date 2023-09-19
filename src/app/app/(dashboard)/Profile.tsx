import Image from 'next/image';
import { redirect } from 'next/navigation';

import { getSession } from '@/libs/auth';

const Profile = async () => {
  const session = await getSession();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className='flex w-full flex-1 items-center gap-2 rounded-lg px-2 py-1.5'>
      {session.user.image && (
        <Image
          src={session.user.image}
          width={40}
          height={40}
          alt={session.user.name ?? session.user.username}
          className='h-6 w-6 rounded-full'
        />
      )}
      <span className='truncate text-sm font-medium'>
        {session.user.username}
      </span>
    </div>
  );
};

export default Profile;
