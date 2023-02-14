import { FC } from 'react';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';
import Container, { BackgroundTypes } from '@/components/Container';
import Carousel from '@/components/Carousel';
import ButtonLink from '@/components/ButtonLink';
import ProductItem from '@/components/ProductItem';

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

const FeaturedProducts: FC<FeaturedProductsProps> = ({
  title,
  subTitle,
  products,
  buttonCopy,
  buttonLink,
  showAddToCart,
  component,
}) => {
  const isDark = component.variant === BackgroundTypes.Dark.toLowerCase();

  if (!products.length) return null;

  return (
    <Container backgroundType={isDark ? BackgroundTypes.Dark : BackgroundTypes.LightGray}>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-10">
        <div className="mb-6 md:mb-0 basis-2/3 xl:basis-auto">
          <p className="font-acumin font-extrabold text-3xl">{title}</p>
          {subTitle && <p className="sm:pr-8">{subTitle}</p>}
        </div>
        {buttonCopy && buttonLink && (
          <ButtonLink href={buttonLink} text={buttonCopy} styleType={isDark ? 'secondary' : 'primary'} />
        )}
      </div>
      <Carousel isDark={isDark} itemClass="px-2.5 my-px" containerClass="-mx-2.5">
        {products.map(item => (
          <ProductItem key={`featured-product-${item.id}`} product={item} showAddToCart={showAddToCart} />
        ))}
      </Carousel>
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
