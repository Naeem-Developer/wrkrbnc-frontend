'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';

const images = [
  '/videos/carpenter.jpg',
  '/videos/cleaner.jpg',
  '/videos/load cary.jpg',
];

const SequentialVideoPlayer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[100vh] sm:h-screen overflow-hidden bg-primary-dark">
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt="Service background"
            fill
            sizes="100vw"
            className="object-cover"
            priority={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
            quality={60}
          />
        </div>
      ))}

      {/* Progress Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center gap-2 px-4">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white w-8 sm:w-10"
                : "bg-gray-500/70 w-4 sm:w-6"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SequentialVideoPlayer;