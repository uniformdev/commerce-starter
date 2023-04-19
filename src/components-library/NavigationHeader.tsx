import { ReactElement, FC, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { AppPages } from '@/constants';
import { togglePageScroll } from '@/utilities';
import { BaseContainer } from './Container';

interface Props {
  children: ReactElement[];
  cartIcon?: ReactElement;
}

const AppLogo = () => (
  <Link href={AppPages.Home} className="cursor-pointer" passHref aria-label="Home">
    <Image
      unoptimized
      width={196}
      height={47}
      src="https://res.cloudinary.com/uniformdev/image/upload/v1675765515/vNext%20Demos/icons/icon-header-logo_vjm8yy.svg"
      alt="header logo"
      priority
      data-test-id="logo-image"
    />
  </Link>
);

const NavigationHeader: FC<Props> = ({ children, cartIcon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleRouteChangeStart = useCallback(() => {
    setIsOpen(false);
    togglePageScroll(true);
  }, []);

  const toggleIsOpen = useCallback(() => {
    setIsOpen(isOpen => !isOpen);
    togglePageScroll();
  }, []);

  useEffect(() => {
    router?.events.on('routeChangeStart', handleRouteChangeStart);
    return () => router?.events.off('routeChangeStart', handleRouteChangeStart);
  }, [router?.events, handleRouteChangeStart]);

  return (
    <header className="relative border-b" role="navigation" aria-label="main-navigation" data-test-id="header">
      <BaseContainer className="w-full hidden lg:flex lg:flex-row lg:items-center lg:place-content-between lg:py-4">
        <div className={classNames('flex justify-between', { 'w-full': Boolean(cartIcon) })}>
          <div className="min-w-[400px]">
            <AppLogo />
          </div>

          <div className="flex lg:flex-row flex-col lg:items-center justify-center lg:pl-50 pb-10 lg:pb-0">
            {children}
          </div>
          {cartIcon && <div className="flex min-w-[40px]">{cartIcon}</div>}
        </div>
      </BaseContainer>
      <div className="w-full lg:hidden flex h-20 flex-row items-center px-8 justify-between">
        <div className="basis-3/6">
          <AppLogo />
        </div>
        <div className="flex flex-row justify-between items-center">
          {cartIcon && <div className="flex min-w-[40px] mr-5">{cartIcon}</div>}
          <button
            type="button"
            aria-label="mobile navigation"
            className="w-6 h-6 inline-flex focus:outline-none relative"
            onClick={toggleIsOpen}
          >
            {isOpen ? (
              <Image
                unoptimized
                fill
                alt="arrow icon"
                src="https://res.cloudinary.com/uniformdev/image/upload/v1675764370/vNext%20Demos/icons/icon-arrow-black_cqgain.svg"
              />
            ) : (
              <Image
                unoptimized
                fill
                alt="hamburger icon"
                src="https://res.cloudinary.com/uniformdev/image/upload/v1675765515/vNext%20Demos/icons/icon-hamburger_mlhxen.svg"
              />
            )}
          </button>
        </div>
      </div>
      <div className="lg:hidden">
        {isOpen && (
          <div className="absolute bg-white flex flex-col items-center w-full h-screen z-[999] pt-16">
            <div className="flex lg:flex-row flex-col lg:items-center justify-center lg:pl-5 pb-10 lg:pb-0">
              {children}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavigationHeader;
