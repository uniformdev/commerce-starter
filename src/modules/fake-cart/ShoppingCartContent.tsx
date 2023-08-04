import { FC } from 'react';
import dynamic from 'next/dynamic';
import { registerUniformComponent } from '@uniformdev/canvas-react';

const ShoppingCart = dynamic(() => import('./ShoppingCart').then(mod => mod.default), { ssr: false });

const ShoppingCartContent: FC = () => <ShoppingCart />;

registerUniformComponent({
  type: 'shoppingCartContent',
  component: ShoppingCartContent,
});

export default ShoppingCartContent;
