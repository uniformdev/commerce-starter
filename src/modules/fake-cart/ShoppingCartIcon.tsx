import { FC } from 'react';
import dynamic from 'next/dynamic';
import { registerUniformComponent } from '@uniformdev/canvas-react';
import { Props as CartIconProps } from './CartIcon';

const CartIcon = dynamic(() => import('./CartIcon').then(mod => mod.default), { ssr: false });

const ShoppingCartIcon: FC<CartIconProps> = props => <CartIcon {...props} />;

registerUniformComponent({
  type: 'shoppingCartIcon',
  component: ShoppingCartIcon,
});

export default ShoppingCartIcon;
