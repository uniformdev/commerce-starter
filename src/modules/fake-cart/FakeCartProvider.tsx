import { FC, ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import useStorage from '../../hooks/useStorage';
import normalizeProduct from './normalizeProduct';

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
  addItemToFakeCart: (item: CommerceTypes.FakeCartAddItem) => void;
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

type Styles = {
  modal?: {
    container?: string;
  };
};

export type FakeCartContextProviderProps = {
  children: ReactNode;
  styles?: Styles;
};

const FakeCartContextProvider: FC<FakeCartContextProviderProps> = ({ styles, children }) => {
  const [cart, setFakeCart] = useStorage<FakeCart>('user-cart', {});
  const [isModalFakeCartOpen, setIsModalFakeCartOpen] = useState<boolean>(false);

  const addItemToFakeCart = useCallback(
    (item: CommerceTypes.FakeCartAddItem) => {
      //TODO: think how to improve normalize process
      const normalizedProduct = normalizeProduct(item.product);

      const cartItem = cart[normalizedProduct.id];

      if (cartItem) {
        setFakeCart({
          [normalizedProduct.id]: {
            ...cartItem,
            quantity: cartItem.quantity + item.quantity,
          },
        });
      } else {
        setFakeCart({
          [normalizedProduct.id]: {
            quantity: item.quantity,
            product: normalizedProduct,
          },
        });
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
    () =>
      Object.values(cart).reduce(
        (acc, cartItem) => acc + cartItem.quantity * ((cartItem.product.price as number) || 0),
        0
      ),
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
      <ShoppingCartModal styles={styles?.modal} />
    </FakeCartContext.Provider>
  );
};

export default FakeCartContextProvider;

export const useFakeCartContext = () => useContext(FakeCartContext);
