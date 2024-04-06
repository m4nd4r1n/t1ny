import Image from 'next/image';

const HeroImage = () => {
  return (
    <div className='relative mt-8 flex rounded-lg bg-gradient-to-b from-default-100 to-default-200 p-4 shadow-xl shadow-black/10 max-sm:hidden'>
      <div className='w-full rounded'>
        <Image
          className='h-auto w-full rounded'
          src='/dashboard.webp'
          alt='hero image'
          width={840}
          height={582}
          sizes='100vw'
          priority
          placeholder='blur'
          blurDataURL='/dashboard.webp'
        />
      </div>
      <div className='z-3 absolute inset-4 rounded shadow-hero-inner'></div>
    </div>
  );
};

export default HeroImage;
