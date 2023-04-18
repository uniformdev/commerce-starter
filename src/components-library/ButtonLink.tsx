import { FC, HTMLProps } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

interface Props {
  href: string;
  text: React.ReactNode;
  styleType?: 'primary' | 'secondary' | 'static';
  target?: string;
  rel?: string;
  disabled?: boolean;
  areaLabel?: string;
}

const ButtonLink: FC<HTMLProps<HTMLButtonElement> & Props> = ({
  href,
  text,
  styleType = 'primary',
  target = '_blank',
  rel = 'noopener noreferrer',
  disabled,
  areaLabel,
  className,
}) => {
  const classes = {
    common:
      'block w-max border-2 uppercase font-bold text-md cursor-pointer font-acumin text-center px-8 py-2.5 leading-7',
    disabled: 'pointer-events-none opacity-60',
    primary: 'bg-white border-black text-black hover:border-white hover:text-white hover:bg-black',
    secondary: 'bg-black border-white text-white hover:border-black hover:text-black hover:bg-white',
    static: 'bg-white text-black hover:border-white hover:text-white hover:bg-black',
  };

  if (!href) return null;

  return href.startsWith('http') ? (
    <a
      href={href}
      target={target}
      className={classNames(classes.common, classes[styleType], { [classes.disabled]: disabled }, className)}
      rel={rel}
      aria-label={areaLabel}
    >
      <span>{text}</span>
    </a>
  ) : (
    <Link
      className={classNames(classes.common, classes[styleType], { [classes.disabled]: disabled }, className)}
      href={href}
      aria-label={areaLabel}
    >
      <span>{text}</span>
    </Link>
  );
};

export default ButtonLink;
