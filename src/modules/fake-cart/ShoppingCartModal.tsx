import { FC, useEffect, useCallback, useMemo, useRef } from 'react';
import Image from 'next/image';
import { useFakeCartContext } from './FakeCartProvider';
import ModalLayoutRight from './ModalLayoutRight';
import CurrencyFormatter from './CurrencyFormatter';
import ShoppingCartItem from './ShoppingCartItem';
import ButtonCheckout from './ButtonCheckout';

interface Props {
  onCloseModal: () => void;
}

const togglePageScroll = (isHiddenManual?: boolean): void => {
  const html = document.querySelector('html');
  if (!html) return;
  const isHidden = isHiddenManual ?? html.style.overflow === 'hidden';
  html.style.overflow = isHidden ? 'auto' : 'hidden';
};

const CartContent: FC<Props> = ({ onCloseModal }) => {
  const { cart, cartAmount, updateItemQuantity, removeItemFromFakeCart, isModalFakeCartOpen } = useFakeCartContext();

  const productsContainerRef = useRef<HTMLDivElement>(null);

  const cartItems = useMemo(() => Object.values(cart).map(cartItem => cartItem), [cart]);

  useEffect(() => {
    togglePageScroll(!isModalFakeCartOpen);
    if (!isModalFakeCartOpen) return;
    // scroll modal to the bottom
    productsContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [isModalFakeCartOpen]);

  useEffect(() => {
    // close modal on last product removed
    if (!cartItems.length) onCloseModal();
  }, [onCloseModal, cartItems.length]);

  return (
    <div className="flex relative h-full flex-col">
      <div className="border-b fixed top-0 w-full flex justify-between items-center bg-white z-10 lg:py-0 py-2 px-4 sm:px-14">
        <button className="w-24 h-16 flex group items-center" type="submit" onClick={onCloseModal}>
          <Image
            unoptimized
            width={16}
            height={16}
            alt="icon-cross"
            src="https://res.cloudinary.com/uniformdev/image/upload/v1675776060/vNext%20Demos/icons/icon-cross-black_c9f098.svg"
            className="fill-black group-hover:stroke-black duration-300 stroke-transparent w-3"
          />
          <p className="pl-2 uppercase text-sm group-hover:underline duration-300  font-bold">Close</p>
        </button>
        <div className="flex justify-around text-xl font-extrabold items-center">
          <p className="uppercase mr-2">My Cart</p>
          <div className="mr-4">
            <CurrencyFormatter amount={cartAmount} />
          </div>
          <Image
            unoptimized
            alt="icon-cart"
            width={30}
            height={30}
            src="https://res.cloudinary.com/uniformdev/image/upload/v1675775007/vNext%20Demos/icons/icon-cart_zzou3e.svg"
          />
        </div>
      </div>
      <div ref={productsContainerRef} className="flex box-border flex-col mt-16">
        <div>
          {cartItems.map(item => (
            <div key={item.product.id} className="p-4 sm:px-14 border-b">
              <ShoppingCartItem
                updateItemQuantity={updateItemQuantity}
                removeItemFromCart={removeItemFromFakeCart}
                product={item.product}
                quantity={item.quantity}
                isInModal
              />
            </div>
          ))}
        </div>
        <div className="pt-11 pr-4 sm:pr-14">
          <div className="flex flex-row justify-end font-bold text-2xl">
            <span className="pr-4">Subtotal:</span>
            <CurrencyFormatter amount={cartAmount} />
          </div>
          <div className="flex flex-row justify-end">
            <ButtonCheckout cartItems={cartItems} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ShoppingCartModal: FC = () => {
  const { isModalFakeCartOpen, setIsModalFakeCartOpen } = useFakeCartContext();

  const onCloseModal = useCallback((): void => setIsModalFakeCartOpen(false), [setIsModalFakeCartOpen]);

  return (
    <ModalLayoutRight isOpen={isModalFakeCartOpen} onCloseModal={onCloseModal}>
      <CartContent onCloseModal={onCloseModal} />
    </ModalLayoutRight>
  );
};

export default ShoppingCartModal;
