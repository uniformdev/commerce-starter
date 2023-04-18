import { FC } from 'react';
import { ComponentProps, registerUniformComponent, UniformText } from '@uniformdev/canvas-react';
import Container, { BackgroundTypes } from '@/components-library/Container';
import Carousel from '@/components-library/Carousel';
import ProductItem from '@/components-library/ProductItem';

type Props = ComponentProps<{
  title: string;
  relatedProducts: Type.Product[];
}>;

const RelatedProducts: FC<Props> = ({ relatedProducts }) => {
  if (!relatedProducts?.length) return null;

  return (
    <Container backgroundType={BackgroundTypes.LightGray}>
      <UniformText parameterId="title" className="w-fit dark:border-b-gray-800 h-10 font-bold text-2xl text-center" />
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
