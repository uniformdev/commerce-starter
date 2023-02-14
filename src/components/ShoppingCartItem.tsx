import { FC, useMemo, useCallback } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import { ProductPagesPrefixes } from '@/constants';
import CurrencyFormatter from './CurrencyFormatter';
import ProductQuantityItem from './ProductQuantityItem';

interface Props {
  product: Type.Product;
  quantity: number;
  isInModal?: boolean;
  updateItemQuantity: (productId: string, newQuantity: number) => void;
  removeItemFromCart: (productId: string) => void;
}
const ShoppingCartItem: FC<Props> = ({
  product,
  quantity,
  isInModal = false,
  updateItemQuantity,
  removeItemFromCart,
}) => {
  const { slug, thumbnailId, images, name, price, id } = product;

  const thumbnailImage = useMemo(
    () => images.find(image => image.id === thumbnailId) || images[0],
    [thumbnailId, images]
  );

  const increaseProductQuantity = useCallback(
    async (): Promise<void> => updateItemQuantity(id, quantity + 1),
    [quantity, updateItemQuantity, id]
  );

  const decreaseProductQuantity = useCallback(
    async (): Promise<void> => updateItemQuantity(id, quantity - 1),
    [quantity, updateItemQuantity, id]
  );

  const handleRemoveProductButtonClick = useCallback(() => {
    removeItemFromCart(id);
  }, [id, removeItemFromCart]);

  return (
    <div className={classNames('flex flex-col py-3', { 'md:flex-row border-b': !isInModal })}>
      <div className="basis-3/5">
        <div className={classNames('font-bold block', { 'md:hidden': !isInModal })}>ITEM</div>
        <div className={classNames('flex flex-col py-4 ', { 'md:flex-row lg:py-3': !isInModal })}>
          <div className={classNames('flex justify-between flex-row', { 'md:block': !isInModal })}>
            <div
              className={classNames('border border-slate-300 flex-initial w-28 h-28 hover:shadow-inner duration-300', {
                'lg:w-44 lg:h-44': !isInModal,
              })}
            >
              <div className={classNames('relative m-2  w-24 h-24  cursor-pointer', { 'lg:w-40 lg:h-40': !isInModal })}>
                <Link href={`${ProductPagesPrefixes.ProductDetailsPage}/${slug}`}>
                  <Image fill src={thumbnailImage.url} alt="" />
                </Link>
              </div>
            </div>
            <button
              type="button"
              className={classNames('inline-flex items-center relative h-5', { 'md:hidden': !isInModal })}
              onClick={handleRemoveProductButtonClick}
            >
              <Image
                width={16}
                height={16}
                unoptimized
                src="https://res.cloudinary.com/uniformdev/image/upload/v1675776060/vNext%20Demos/icons/icon-cross-black_c9f098.svg"
                alt="icon-cross"
                className="fill-blue-500 stroke-transparent hover:stroke-blue-500 duration-300 w-4"
              />
            </button>
          </div>
          <div className={classNames('py-4 flex flex-col justify-between', { 'md:px-10 md:py-0': !isInModal })}>
            <Link href={`${ProductPagesPrefixes.ProductDetailsPage}/${slug}`}>
              <div className={classNames('cursor-pointer group', { 'lg:pt-4': !isInModal })}>
                <div className={classNames('max-w-2xl', { 'lg:w-full': !isInModal })}>
                  <span className="lg:text-2xl text-xl group-hover:underline duration-300 font-bold">{name}</span>
                </div>
              </div>
            </Link>
            <button
              type="button"
              className={classNames('items-center mt-8 relative group h-5 hidden', { 'md:inline-flex': !isInModal })}
              onClick={handleRemoveProductButtonClick}
            >
              <Image
                width={16}
                height={16}
                unoptimized
                src="https://res.cloudinary.com/uniformdev/image/upload/v1675776519/vNext%20Demos/icons/icon-cross-blue_qyhkct.svg"
                alt="icon-cross"
                className="fill-blue-500 group-hover:stroke-blue-400 duration-300 stroke-transparent w-3"
              />
              <span className="text-blue-500 group-hover:underline duration-300 text-sm font-bold pl-2">
                &nbsp;REMOVE
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className={classNames('flex flex-row justify-between basis-2/5', { 'md:pt-12 md:pb-8': !isInModal })}>
        <div>
          <div className={classNames('font-bold block pb-2', { 'md:hidden': !isInModal })}>QTY</div>
          <ProductQuantityItem
            onClickIncrement={increaseProductQuantity}
            onClickDecrement={decreaseProductQuantity}
            quantity={quantity}
          />
        </div>
        <div>
          <div className={classNames('font-bold block pb-2', { 'md:hidden': !isInModal })}>Price</div>
          <CurrencyFormatter className="md:text-2xl text-xl" amount={price} />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartItem;
