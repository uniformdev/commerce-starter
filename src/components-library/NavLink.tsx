import { FC } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

interface Props {
  title: string;
  href: string;
  className?: string;
  isActive?: boolean;
}

const NavLink: FC<Props> = ({ title, href, className = '', isActive = false }) => (
  <Link
    className={classNames(
      'hover:opacity-40 px-6 py-0 font-acumin font-bold text-center',
      isActive ? 'opacity-40' : 'opacity-100',
      className
    )}
    href={href}
  >
    {title}
  </Link>
);

export default NavLink;
