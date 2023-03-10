import React from 'react';
import { NextPage } from 'next';
import { UniformContext } from '@uniformdev/context-react';
import { UniformAppProps } from '@uniformdev/context-next';
import createUniformContext from '@/context/createUniformContext';
import CartContextProvider from '@/context/CartProvider';
import { Header, NavigationFooter, ShoppingCartModal, Announcement } from '@/components-library';
import '@/components-canvas';

import '@/styles/globals.scss';
import 'tailwindcss/tailwind.css';

const clientContext = createUniformContext();

export const App: NextPage<UniformAppProps> = ({ Component, pageProps }) => (
  <UniformContext context={clientContext}>
    <CartContextProvider>
      <Announcement />
      <Header />
      <Component {...pageProps} />
      <ShoppingCartModal />
      <NavigationFooter />
    </CartContextProvider>
  </UniformContext>
);

export default App;
