import { FC } from 'react';
import dynamic from 'next/dynamic';
import { registerUniformComponent } from '@uniformdev/canvas-react';

interface Props {
  link: Types.ProjectMapLink;
}

const CartIcon = dynamic(() => import('./CartIcon').then(mod => mod.default), { ssr: false });

const ShoppingCartIcon: FC<Props> = props => <CartIcon {...props} />;

registerUniformComponent({
  type: 'shoppingCartIcon',
  component: ShoppingCartIcon,
});

export default ShoppingCartIcon;
