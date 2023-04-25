import { FC } from 'react';
import { ComponentProps, registerUniformComponent, UniformText } from '@uniformdev/canvas-react';
import Container, { BackgroundTypes } from '@/components-library/Container';
import Carousel from '@/components-library/Carousel';
import ButtonLink from '@/components-library/ButtonLink';
import FeaturedProductItem from '@/components-library/FeaturedProductItem';

type FeaturedProductsProps = ComponentProps<{
  title: string;
  subTitle?: string;
  products: Type.Product[];
  buttonCopy: string;
  buttonLink?: string;
  showAddToCart: boolean;
}>;

type ExtendedFeaturedProductsProps = Omit<FeaturedProductsProps, 'buttonLink'> & {
  buttonLink?:
    | {
        path: string;
        nodeId: string;
        projectMapId: string;
      }
    | string;
};

const FeaturedProducts: FC<FeaturedProductsProps> = ({ products, buttonLink, showAddToCart, component }) => {
  const isDark = component.variant === BackgroundTypes.Dark.toLowerCase();
  return (
    <Container backgroundType={isDark ? BackgroundTypes.Dark : BackgroundTypes.LightGray}>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-10">
        <div className="mb-6 md:mb-0 basis-2/3 xl:basis-auto">
          <UniformText as="p" parameterId="title" className="font-acumin font-extrabold text-3xl" />
          <UniformText as="p" parameterId="subTitle" className="sm:pr-8" />
        </div>
        {buttonLink && (
          <ButtonLink
            href={buttonLink}
            text={<UniformText parameterId="buttonCopy" />}
            styleType={isDark ? 'secondary' : 'primary'}
          />
        )}
      </div>
      {products ? (
        <Carousel isDark={isDark} itemClass="px-2.5 my-px" containerClass="-mx-2.5">
          {Array.isArray(products) &&
            products?.map(item => (
              <FeaturedProductItem key={`featured-product-${item.id}`} product={item} showAddToCart={showAddToCart} />
            ))}
        </Carousel>
      ) : null}
    </Container>
  );
};

const transformData = (BaseComponent: FC<FeaturedProductsProps>): FC<FeaturedProductsProps> =>
  function wrapper({ buttonLink, ...props }: ExtendedFeaturedProductsProps) {
    const transformedProps: FeaturedProductsProps = {
      ...props,
      buttonLink: typeof buttonLink === 'string' ? buttonLink : buttonLink?.path,
    };
    return <BaseComponent {...transformedProps} />;
  };

registerUniformComponent({
  type: 'featuredProducts',
  component: transformData(FeaturedProducts),
});

export default FeaturedProducts;
