import { FC } from 'react';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import CurrencyFormatter from '@/components/CurrencyFormatter';

type Props = ComponentProps<{
  product: Type.Product;
}>;

const ProductInfo: FC<Props> = ({ product }) => {
  if (!product) return null;
  return (
    <div className="md:pt-8 pt-4">
      <p className="font-bold text-4xl lg:text-5xl">{product.name}</p>
      <div className="flex flex-row w-28 justify-between mt-8 leading-5 text-2xl">
        <CurrencyFormatter amount={product.price} />
      </div>
      <div className="border-gray-100 border-t-2 my-7" />
    </div>
  );
};

registerUniformComponent({
  type: 'productInfo',
  component: ProductInfo,
});

export default ProductInfo;
