import { FC } from 'react';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import Container, { BackgroundTypes } from '@/components/Container';
import Carousel from '@/components/Carousel';
import ProductItem from '@/components/ProductItem';

type Props = ComponentProps<{
  title: string;
  relatedProducts: Type.Product[];
}>;

const RelatedProducts: FC<Props> = ({ title, relatedProducts }) => {
  if (!relatedProducts?.length) return null;

  return (
    <Container backgroundType={BackgroundTypes.LightGray}>
      <span className="w-fit dark:border-b-gray-800 h-10 font-bold text-2xl text-center">{title}</span>
      <div className="mt-6" />
      <Carousel itemClass="px-2" containerClass="-mx-2">
        {relatedProducts.map(item => (
          <ProductItem key={item.id} product={item} />
        ))}
      </Carousel>
    </Container>
  );
};

registerUniformComponent({
  type: 'relatedProducts',
  component: RelatedProducts,
});

export default RelatedProducts;
