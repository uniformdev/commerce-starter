import { FC } from 'react';
import dynamic from 'next/dynamic';
import { NavigationHeader, NavigationLink } from '@/components-library';
import { AppNavigation, AppPages } from '@/constants';

// local storage based fake cart functionality loaded only on the client side
const ShoppingCartIcon = dynamic(() => import('@/components-library').then(com => com.ShoppingCartIcon), {
  ssr: false,
});

const Header: FC = () => (
  <NavigationHeader cartIcon={<ShoppingCartIcon cartUrl={AppPages.Cart} />}>
    {AppNavigation.map(({ title, link }) => (
      <NavigationLink key={title} title={title} link={link} />
    ))}
  </NavigationHeader>
);

export default Header;
