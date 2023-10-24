import { FC, useCallback } from 'react';
import { registerUniformComponent, ComponentProps } from '@uniformdev/canvas-react';
import BaseProductInfo, { type Props as BaseProductInfoProps } from '../../components/BaseProductInfo';
import { useFakeCartContext } from './FakeCartProvider';

export type Props = ComponentProps<BaseProductInfoProps & { product: CommerceTypes.Product }>;

const ProductInfo: FC<Props> = ({ product, ...props }) => {
  const { addItemToFakeCart } = useFakeCartContext();
  const handleButtonClick = useCallback(() => {
    addItemToFakeCart({
      product,
      quantity: 1,
    });

    window.dispatchEvent(
      new CustomEvent('Add to cart', {
        detail: {
          product,
          quantity: 1,
        },
      })
    );
  }, [product, addItemToFakeCart]);

  return <BaseProductInfo {...props} onClickPrimaryButton={handleButtonClick} />;
};

registerUniformComponent({
  type: 'productInfo',
  component: ProductInfo,
});

export default ProductInfo;
