import { FC, useCallback } from 'react';
import { registerUniformComponent, ComponentProps } from '@uniformdev/canvas-react';
import BaseAddToCart from '../../components/BaseAddToCart';
import { useFakeCartContext } from './FakeCartProvider';

export type Props = ComponentProps<{
  buttonCopy?: string;
  buttonStyle: Types.ButtonStyles;
  product: CommerceTypes.Product;
}>;

const AddToCart: FC<Props> = ({ buttonStyle, buttonCopy, product }) => {
  const { addItemToFakeCart } = useFakeCartContext();
  const handleButtonClick = useCallback(
    (quantity: number) => {
      addItemToFakeCart({
        product,
        quantity,
      });

      window.dispatchEvent(
        new CustomEvent('Add to cart', {
          detail: {
            product,
            quantity,
          },
        })
      );
    },
    [product, addItemToFakeCart]
  );

  return <BaseAddToCart buttonStyle={buttonStyle} buttonCopy={buttonCopy} onClick={handleButtonClick} />;
};

registerUniformComponent({
  type: 'addToCart',
  component: AddToCart,
});

export default AddToCart;
