import { FC, HTMLProps } from 'react';
import NextLink from 'next/link';
import classNames from 'classnames';

const classes = {
  common:
    'inline-block border-2 cursor-pointer font-bold leading-7 overflow-hidden px-8 py-2.5 relative text-center text-md uppercase',
  primary: 'bg-white border-black text-black hover:invert',
  secondary: 'bg-black border-white text-white hover:invert',
  navLink: 'border-none hover:opacity-40 px-6 py-0 normal-case',
  arrow: '!px-0 !py-0 w-12 h-12 hover:invert',
  disabled: 'pointer-events-none opacity-60',
  loading: 'pointer-events-none',
  active: 'opacity-40',
};

interface ActionProps {
  styleType?: 'primary' | 'secondary' | 'arrow';
  type?: 'submit' | 'reset' | 'button';
  ariaLabel?: string;
  disabled?: boolean;
  isLoading?: boolean;
}
const Action: FC<HTMLProps<HTMLButtonElement> & ActionProps> = ({
  styleType = 'secondary',
  type = 'button',
  ariaLabel,
  disabled = false,
  isLoading = false,
  className,
  onClick,
  children,
}) => (
  <button
    type={type}
    aria-label={ariaLabel}
    disabled={disabled || isLoading}
    className={classNames(
      classes.common,
      classes[styleType],
      { [classes.disabled]: disabled, [classes.loading]: isLoading },
      className
    )}
    onClick={onClick}
  >
    <div className="flex items-center justify-center">
      {children}
      {isLoading && (
        <>
          <span className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-black to-white animate-one" />
          <span className="absolute top-0 right-0 animation-delay-500 h-full w-0.5 bg-gradient-to-b from-black to-white animate-two" />
          <span className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-black to-white animate-three" />
          <span className="absolute top-0 left-0 h-full w-0.5 animation-delay-500 bg-white bg-gradient-to-t from-black to-white animate-four" />
        </>
      )}
    </div>
  </button>
);

interface LinkProps {
  href: string;
  styleType?: 'primary' | 'secondary' | 'navLink';
  target?: string;
  rel?: string;
  ariaLabel?: string;
  disabled?: boolean;
  isActive?: boolean;
}
const Link: FC<HTMLProps<HTMLButtonElement> & LinkProps> = ({
  href,
  styleType = 'primary',
  target,
  rel,
  ariaLabel,
  disabled = false,
  isActive = false,
  className,
  children,
}) => {
  const linkProps = {
    className: classNames(
      classes.common,
      classes[styleType],
      { [classes.disabled]: disabled, [classes.active]: isActive },
      className
    ),
    href,
    target,
    rel,
    'aria-label': ariaLabel,
  };
  return href.startsWith('http') ? <a {...linkProps}>{children}</a> : <NextLink {...linkProps}>{children}</NextLink>;
};

const Button = { Action, Link };
export default Button;
