import { FC, useMemo } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { AppPages } from '@/constants';
import NavLink from './NavLink';

interface Props {
  link: string;
  title: string;
  styleType?: 'default' | 'menu';
}

const NavigationLink: FC<Props> = ({ link, title, styleType }) => {
  const router = useRouter();

  const isCurrentRoute = useMemo(() => {
    const { asPath } = router;
    const [pathWithoutQuery] = asPath.split('?');

    if (link === AppPages.Home) {
      return asPath === link;
    }

    return pathWithoutQuery.includes(link);
  }, [router, link]);

  return (
    <NavLink
      href={link}
      title={title}
      isActive={isCurrentRoute}
      className={classNames('block lg:m-0 m-3', { 'pl-3 pb-4 text-left': styleType === 'menu' })}
    />
  );
};

export default NavigationLink;
