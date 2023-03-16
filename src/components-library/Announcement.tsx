import React, { useCallback, useState, useEffect } from 'react';
import Link from 'next/link';
import { IN_CONTEXT_EDITOR_QUERY_STRING_PARAM } from '@uniformdev/canvas';
import { BaseContainer } from '@/components-library/Container';

const Announcement: React.FC = () => {
  const [isAnnouncementOpened, setIsAnnouncementOpened] = useState(true);
  const [isDeployedBannerShown, setDeployedBannerShown] = useState(false);

  const handleCloseButtonClick = useCallback(() => setIsAnnouncementOpened(false), [setIsAnnouncementOpened]);

  const isOpenedByInContextEditor =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).has(IN_CONTEXT_EDITOR_QUERY_STRING_PARAM);

  // useEffect is necessary here to avoid hydration error caused by different
  // render output based on typeof window
  useEffect(() => {
    if (isOpenedByInContextEditor) {
      setDeployedBannerShown(Boolean(isOpenedByInContextEditor && process.env.NEXT_PUBLIC_SHOW_DEPLOYED_BANNER));
    }
  }, []);

  if (!isAnnouncementOpened && !isDeployedBannerShown) return null;

  return (
    <>
      {isDeployedBannerShown && (
        <div className="bg-red-700 animate-pop-in-announcement sticky top-0 py-3.5 z-50">
          <BaseContainer>
            <div className="relative">
              <p className="text-white text-sm flex items-center md:justify-center w-full pr-16 md:pr-0">
                This preview is powered by a pre-deployed site. Click&nbsp;
                <Link
                  className="text-teal-400 shrink-0 underline hover:no-underline cursor-pointer"
                  data-is-rendered-by-uniform
                  href="https://docs.uniform.app/getting-started/starters"
                  target="_blank"
                >
                  here
                </Link>
                &nbsp;to learn how to set up your own.
              </p>
            </div>
          </BaseContainer>
        </div>
      )}
      {isAnnouncementOpened && (
        <div className="bg-black animate-pop-in-announcement sticky top-0 py-3.5 z-50">
          <BaseContainer>
            <div className="relative">
              <p className="text-white text-sm flex items-center md:justify-center w-full pr-16 md:pr-0">
                <span className="truncate hidden sm:block mr-2">Continue building your project.</span>
                <Link
                  className="text-teal-400 shrink-0 underline hover:no-underline cursor-pointer"
                  href="https://docs.uniform.app/getting-started/starters#javadrip"
                  target="_blank"
                >
                  Learn about what to do next with this Starter
                </Link>
              </p>
              <button
                type="button"
                aria-label="Dismiss announcement"
                onClick={handleCloseButtonClick}
                className="group cursor-pointer flex flex-row gap-2 items-center absolute right-0 top-1/2 -translate-y-1/2"
              >
                <p className="text-white group-hover:text-teal-400">Dismiss</p>
              </button>
            </div>
          </BaseContainer>
        </div>
      )}
    </>
  );
};

export default Announcement;
