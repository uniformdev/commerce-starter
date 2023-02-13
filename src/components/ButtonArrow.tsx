import { FC } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

interface Props {
  direction: 'left' | 'right';
  isDark?: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const DarkImageSrc =
  'https://res.cloudinary.com/uniformdev/image/upload/v1675764370/vNext%20Demos/icons/icon-arrow-white_dhbqim.svg';
const WhiteImageSrc =
  'https://res.cloudinary.com/uniformdev/image/upload/v1675764370/vNext%20Demos/icons/icon-arrow-black_cqgain.svg';

const ButtonArrow: FC<Props> = ({ direction, isDark = false, onClick, disabled }) => (
  <button
    className={classNames(
      'flex items-center group justify-center w-12 h-12 border-2 cursor-pointer disabled:pointer-events-none disabled:opacity-60 hover:opacity-60',
      { 'border-white ': isDark },
      { 'border-black bg-white': !isDark }
    )}
    onClick={onClick}
    disabled={disabled}
    aria-label={`${direction} slide`}
    type="button"
  >
    <Image
      className={classNames({ 'rotate-180': direction === 'left' })}
      width={20}
      height={20}
      src={isDark ? DarkImageSrc : WhiteImageSrc}
      alt={`${direction} arrow`}
      unoptimized
    />
  </button>
);

export default ButtonArrow;
