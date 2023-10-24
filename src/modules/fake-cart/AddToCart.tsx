import { FC, useCallback } from 'react';
import { registerUniformComponent, ComponentProps } from '@uniformdev/canvas-react';
import BaseAddToCart, { BaseAddToCartProps } from '../../components/BaseAddToCart';
import { useFakeCartContext } from './FakeCartProvider';

export type Props = ComponentProps<
  {
    product: CommerceTypes.AddToCartItem;
  } & BaseAddToCartProps
>;

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
