import { FC, useCallback } from 'react';
import { useCartContext } from '@/context/CartProvider';
import ButtonAction from './ButtonAction';

interface Props {
  product: Type.Product;
  quantity: number;
  className?: string;
  styleType?: 'primary' | 'secondary';
  buttonCopy?: string;
}

const ProductAddToCartButton: FC<Props> = ({
  product,
  quantity,
  className = '',
  styleType = 'primary',
  buttonCopy = 'Add to Cart',
}) => {
  const { addItemToCart } = useCartContext();

  const handleAddToCard = useCallback(
    (): void => addItemToCart({ product, quantity }),
    [addItemToCart, product, quantity]
  );

  return (
    <ButtonAction onClick={handleAddToCard} className={className} styleType={styleType}>
      <span>{buttonCopy}</span>
    </ButtonAction>
  );
};

export default ProductAddToCartButton;
