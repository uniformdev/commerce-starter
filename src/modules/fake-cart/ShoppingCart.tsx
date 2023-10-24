import { FC, useMemo } from 'react';
import Image from '../../components/Image';
import { useFakeCartContext } from './FakeCartProvider';
import Container from '../../components/Container';
import CurrencyFormatter from './CurrencyFormatter';
import InformationContent from '../../components/InformationContent';
import ShoppingCartItem from './ShoppingCartItem';
import ButtonCheckout from './ButtonCheckout';

const ShoppingCart: FC = () => {
  const { cart, cartAmount, updateItemQuantity, removeItemFromFakeCart } = useFakeCartContext();
  const cartItems = useMemo(() => Object.values(cart).map(cartItem => cartItem), [cart]);
  const hasItems = Boolean(cartItems.length);

  return (
    <>
      <Container>
        <div className="md:pt-14 lg:mb-28 text-secondary-content">
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
                removeItemFromCart={removeItemFromFakeCart}
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
                  src="https://res.cloudinary.com/uniform-demos/image/upload/v1692282886/csk-icons/icon-cart_zzou3e_yovtho.svg"
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
                <ButtonCheckout cartItems={cartItems} />
              </div>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default ShoppingCart;
