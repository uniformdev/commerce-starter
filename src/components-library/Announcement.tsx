import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BaseContainer } from '@/components-library/Container';

const Announcement: React.FC<Type.AnnouncementProps> = ({ title, link, linkText }) => {
  const { push } = useRouter();
  const [announcementShown, setAnnouncementShown] = useState(false);

  const handleScroll = useCallback(() => setAnnouncementShown(true), [setAnnouncementShown]);

  useEffect(() => {
    if (!announcementShown || !title) return;
    // clear listener when scroll handled
    window.removeEventListener('scroll', handleScroll);
  }, [announcementShown, title, handleScroll]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    // clear listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleCloseButtonClick = useCallback(() => {
    setAnnouncementShown(false);
  }, [setAnnouncementShown]);

  const handleLinkButtonClick = useCallback(() => {
    if (!link) return;
    handleCloseButtonClick();
    push(link);
  }, [link, handleCloseButtonClick, push]);

  if (!announcementShown || !title) return null;
  return (
    <div className="bg-black animate-pop-in-announcement sticky top-0 py-3.5 z-50">
      <BaseContainer className="!px-4 md:!px-8">
        <div className="relative">
          <p className="text-white flex items-center lg:justify-center w-full pr-12 lg:px-32 text-sm lg:text-base">
            <span className="truncate block">{title}</span>
            <Link
              className="text-teal-400 ml-2 shrink-0 underline hover:no-underline cursor-pointer"
              onClick={handleLinkButtonClick}
              href={link}
            >
              {linkText}
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
