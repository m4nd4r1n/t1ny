'use client';

import type { ImageProps } from 'next/image';

import Image from 'next/image';
import { useState } from 'react';

interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc,
  alt,
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      onError={() => setImgSrc(fallbackSrc)}
      alt={alt}
      {...rest}
    />
  );
};

export default ImageWithFallback;
