import { FC, useMemo } from 'react';
import Image from 'next/image';
import { useCartContext } from '@/context/CartProvider';
import Container from './Container';
import CurrencyFormatter from './CurrencyFormatter';
import ButtonAction from './ButtonAction';
import InformationContent from './InformationContent';
import ShoppingCartItem from './ShoppingCartItem';

const ShoppingCart: FC = () => {
  const { cart, cartAmount, updateItemQuantity, removeItemFromCart } = useCartContext();

  const cartItems = useMemo(() => Object.values(cart).map(cartItem => cartItem), [cart]);

  const hasItems = Boolean(cartItems.length);

  return (
    <Container>
      <div className="md:pt-14 lg:mb-28">
        {hasItems && (
          <div className="md:flex flex-row font-bold border-b pb-4 hidden">
            <div className="basis-3/5">ITEM</div>
            <div className="basis-1/5">QTY</div>
            <div className="basis-1/5 text-right">Price</div>
          </div>
        )}
        {hasItems ? (
          cartItems.map(cartItem => (
            <ShoppingCartItem
              updateItemQuantity={updateItemQuantity}
              removeItemFromCart={removeItemFromCart}
              key={cartItem.product.id}
              quantity={cartItem.quantity}
              product={cartItem.product}
            />
          ))
        ) : (
          <InformationContent
            title="Your shopping cart is empty"
            text="Products added to the cart will appear here."
            imageComponent={
              <Image
                src="https://res.cloudinary.com/uniformdev/image/upload/v1675775007/vNext%20Demos/icons/icon-cart_zzou3e.svg"
                width={75}
                height={75}
                alt="cart icon"
                unoptimized
              />
            }
          />
        )}
        {hasItems && (
          <div className="pt-9">
            <div className="flex flex-row justify-end font-bold text-2xl">
              <span className="pr-4">Subtotal:</span>
              <CurrencyFormatter amount={cartAmount} />
            </div>
            <div className="flex flex-row justify-end">
              <ButtonAction
                className="border-2 mt-9 h-12 group lg:mb-32 sm:justify-center sm:mx-0 mx-auto"
                styleType="primary"
                disabled
              >
                <span className="group-hover:text-white text-black font-bold text-sm tracking-wider">
                  Proceed to Checkout
                </span>
              </ButtonAction>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default ShoppingCart;
