import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { BaseContainer } from '@/components-library/Container';

const Announcement: React.FC = () => {
  const [isOpened, setIsOpened] = useState(true);

  const handleCloseButtonClick = useCallback(() => setIsOpened(false), [setIsOpened]);

  if (!isOpened) return null;
  return (
    <div className="bg-black animate-pop-in-announcement sticky top-0 py-3.5 z-50">
      <BaseContainer className="!px-4 md:!px-8">
        <div className="relative">
          <p className="text-white flex items-center lg:justify-center w-full pr-12 lg:px-32 text-sm lg:text-base">
            <span className="truncate block">
              Uniform starter to reduce the time it takes to create digital experiences.
            </span>
            <Link
              className="text-teal-400 ml-2 shrink-0 underline hover:no-underline cursor-pointer"
              href="https://docs.uniform.app/getting-started/starters"
            >
              Read docs
            </Link>
          </p>
          <button
            aria-label="Dismiss announcement"
            onClick={handleCloseButtonClick}
            className="group cursor-pointer flex flex-row gap-2 items-center absolute right-0 top-1/2 -translate-y-1/2"
          >
            <p className="hidden lg:block text-white group-hover:text-teal-400">Dismiss</p>
          </button>
        </div>
      </BaseContainer>
    </div>
  );
};

export default Announcement;
