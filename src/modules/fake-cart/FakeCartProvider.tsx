import { FC, ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import useStorage from '../../hooks/useStorage';
import '.';

const ShoppingCartModal = dynamic(() => import('./ShoppingCartModal').then(com => com), {
  ssr: false,
});

type FakeCart = Record<string, CommerceTypes.FakeCartItem>;

interface FakeCartContextProps {
  cart: FakeCart;
  cartAmount: number;
  totalFakeCartItemsCount: number;
  isModalFakeCartOpen: boolean;
  setIsModalFakeCartOpen: (isOpen: boolean) => void;
  addItemToFakeCart: (item: CommerceTypes.FakeCartItem) => void;
  updateItemQuantity: (productId: string, quantity: number) => void;
  removeItemFromFakeCart: (productId: string) => void;
}

export const FakeCartContext = createContext<FakeCartContextProps>({
  cart: {},
  cartAmount: 0,
  totalFakeCartItemsCount: 0,
  isModalFakeCartOpen: false,
  setIsModalFakeCartOpen: () => null,
  addItemToFakeCart: () => null,
  updateItemQuantity: () => null,
  removeItemFromFakeCart: () => null,
});

interface Props {
  children: ReactNode;
}

const FakeCartContextProvider: FC<Props> = ({ children }) => {
  const [cart, setFakeCart] = useStorage<FakeCart>('user-cart', {});
  const [isModalFakeCartOpen, setIsModalFakeCartOpen] = useState<boolean>(false);

  const addItemToFakeCart = useCallback(
    (item: CommerceTypes.FakeCartItem) => {
      console.log('addItemToFakeCart');
      const cartItem = cart[item.product.id];

      if (cartItem) {
        setFakeCart({
          [item.product.id]: {
            ...cartItem,
            quantity: cartItem.quantity + item.quantity,
          },
        });
      } else {
        setFakeCart({ [item.product.id]: item });
      }

      setIsModalFakeCartOpen(true);
    },
    [cart, setFakeCart]
  );

  const removeItemFromFakeCart = useCallback(
    (productId: string) => {
      const updatedFakeCart = Object.entries(cart).reduce<FakeCart>((acc, [key, value]) => {
        if (key !== productId) acc[key] = value;
        return acc;
      }, {});
      if (!Object.keys(updatedFakeCart).length) setIsModalFakeCartOpen(false);
      setFakeCart(updatedFakeCart, { force: true });
    },
    [cart, setFakeCart]
  );

  const updateItemQuantity = useCallback(
    (productId: string, quantity: number) => {
      const cartItem = cart[productId];
      if (!cartItem) return;
      setFakeCart({ [productId]: { ...cartItem, quantity } });
    },
    [cart, setFakeCart]
  );

  const totalFakeCartItemsCount = useMemo(
    () => Object.values(cart).reduce((acc, cartItem) => acc + cartItem.quantity, 0),
    [cart]
  );

  const cartAmount = useMemo(
    () => Object.values(cart).reduce((acc, cartItem) => acc + cartItem.quantity * (cartItem.product.price || 0), 0),
    [cart]
  );

  const value = useMemo(
    () => ({
      cart,
      cartAmount,
      totalFakeCartItemsCount,
      isModalFakeCartOpen,
      setIsModalFakeCartOpen,
      addItemToFakeCart,
      updateItemQuantity,
      removeItemFromFakeCart,
    }),
    [
      cart,
      cartAmount,
      totalFakeCartItemsCount,
      isModalFakeCartOpen,
      setIsModalFakeCartOpen,
      addItemToFakeCart,
      updateItemQuantity,
      removeItemFromFakeCart,
    ]
  );

  return (
    <FakeCartContext.Provider value={value}>
      {children}
      <ShoppingCartModal />
    </FakeCartContext.Provider>
  );
};

export default FakeCartContextProvider;

export const useFakeCartContext = () => useContext(FakeCartContext);
