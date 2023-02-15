import { FC, useState, useCallback } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { ComponentProps, registerUniformComponent } from '@uniformdev/canvas-react';

type Props = ComponentProps<{
  product: Type.Product;
}>;

const MaxCarouselImagesCountToDisplay = 5;

const ProductImageGallery: FC<Props> = ({ product }) => {
  const { images } = product;

  const [selectedImage, setSelectedImage] = useState<Type.ProductImage>(images[0]);

  const handleImageClick = useCallback((image: Type.ProductImage) => () => setSelectedImage(image), [setSelectedImage]);

  if (!images) return null;
  return (
    <div className="grid gap-5 grid-cols-1">
      <div className="border p-2 md:p-6 self-start border-gray-100 md:border-2 w-full">
        <div className="relative w-full pb-[100%]">
          <Image
            src={selectedImage?.url}
            className="object-cover"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            alt=""
          />
        </div>
      </div>
      {images.length > 1 && (
        <div className="grid gap-4 grid-cols-5 w-full">
          {images.slice(0, MaxCarouselImagesCountToDisplay).map((image: Type.ProductImage) => (
            <button
              type="submit"
              aria-label="switch product image"
              key={`image-slide-${image.id}`}
              className={classNames(
                'cursor-pointer w-full outline outline-1 outline-gray-100 p-1.5 hover:p-0.5 ease-out duration-300',
                {
                  'outline-black outline-2 pointer-events-none': selectedImage?.id === image.id,
                }
              )}
              onClick={handleImageClick(image)}
              tabIndex={0}
            >
              <div className="relative w-full pb-[100%]">
                <Image src={image.url} fill sizes="10vw" className="object-cover" alt="" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

registerUniformComponent({
  type: 'productImageGallery',
  component: ProductImageGallery,
});

export default ProductImageGallery;
