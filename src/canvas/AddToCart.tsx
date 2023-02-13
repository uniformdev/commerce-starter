import { FC, useCallback, useEffect, useState } from 'react';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import Container, { PaddingSize } from '@/components/Container';
import ProductQuantityItem from '@/components/ProductQuantityItem';
import ProductAddToCartButton from '@/components/ProductAddToCartButton';

type Props = ComponentProps<{
  product: Type.Product;
}>;

const AddToCart: FC<Props> = ({ product }) => {
  const [quantity, setQuantity] = useState<number>(1);

  // FixMe.
  useEffect(() => setQuantity(1), [product?.id]);

  const increaseQuantity = useCallback(() => setQuantity(quantity + 1), [quantity]);
  const decreaseQuantity = useCallback(() => setQuantity(quantity - 1), [quantity]);

  return (
    <Container paddingTop={PaddingSize.None} paddingBottom={PaddingSize.None}>
      <div className="flex flex-col lg:flex-row justify-between items-center border-b-2 py-6">
        <div className="flex items-center justify-between w-full lg:w-auto">
          <div className="inline font-bold mr-12">QUANTITY:</div>
          <ProductQuantityItem
            onClickIncrement={increaseQuantity}
            onClickDecrement={decreaseQuantity}
            quantity={quantity}
          />
        </div>
        <ProductAddToCartButton product={product} quantity={quantity} className="w-full mt-6 lg:w-1/3 lg:mt-0" />
      </div>
    </Container>
  );
};

registerUniformComponent({
  type: 'addToCart',
  component: AddToCart,
});

export default AddToCart;
