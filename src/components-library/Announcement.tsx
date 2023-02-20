import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { BaseContainer } from '@/components-library/Container';

const Announcement: React.FC = () => {
  const [isOpened, setIsOpened] = useState(true);

  const handleCloseButtonClick = useCallback(() => setIsOpened(false), [setIsOpened]);

  if (!isOpened) return null;
  return (
    <div className="bg-black animate-pop-in-announcement sticky top-0 py-3.5 z-50">
      <BaseContainer>
        <div className="relative">
          <p className="text-white text-sm flex items-center md:justify-center w-full pr-16 md:pr-0">
            <span className="truncate hidden sm:block mr-2">Continue building your project.</span>
            <Link
              className="text-teal-400 shrink-0 underline hover:no-underline cursor-pointer"
              href="https://docs.uniform.app/getting-started/starters#commerce---javadrip"
              target="_blank"
            >
              Learn about what do next with this Starter
            </Link>
          </p>
          <button
            aria-label="Dismiss announcement"
            onClick={handleCloseButtonClick}
            className="group cursor-pointer flex flex-row gap-2 items-center absolute right-0 top-1/2 -translate-y-1/2"
          >
            <p className="text-white group-hover:text-teal-400">Dismiss</p>
          </button>
        </div>
      </BaseContainer>
    </div>
  );
};

export default Announcement;
