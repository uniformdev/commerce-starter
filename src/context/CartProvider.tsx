import React, { FC, createContext, useCallback, useContext, useMemo, useState } from 'react';
import useStorage from '@/hooks/useStorage';

interface CartItem {
  product: Type.Product;
  quantity: number;
}

type Cart = Record<string, CartItem>;

interface CartContextProps {
  cart: Cart;
  cartAmount: number;
  totalCartItemsCount: number;
  isModalCartOpen: boolean;
  setIsModalCartOpen: (isOpen: boolean) => void;
  addItemToCart: (item: CartItem) => void;
  updateItemQuantity: (productId: string, quantity: number) => void;
  removeItemFromCart: (productId: string) => void;
}

export const CartContext = createContext<CartContextProps>({
  cart: {},
  cartAmount: 0,
  totalCartItemsCount: 0,
  isModalCartOpen: false,
  setIsModalCartOpen: () => null,
  addItemToCart: () => null,
  updateItemQuantity: () => null,
  removeItemFromCart: () => null,
});

interface Props {
  children: React.ReactNode;
}

const CartContextProvider: FC<Props> = ({ children }) => {
  const [cart, setCart] = useStorage<Cart>('user-cart', {});
  const [isModalCartOpen, setIsModalCartOpen] = useState<boolean>(false);

  const addItemToCart = useCallback(
    (item: CartItem) => {
      const cartItem = cart[item.product.id];

      if (cartItem) {
        setCart({
          [item.product.id]: {
            ...cartItem,
            quantity: cartItem.quantity + item.quantity,
          },
        });
      } else {
        setCart({ [item.product.id]: item });
      }

      setIsModalCartOpen(true);
    },
    [cart, setCart]
  );

  const removeItemFromCart = useCallback(
    (productId: string) => {
      const updatedCart = Object.entries(cart).reduce<Cart>((acc, [key, value]) => {
        if (key !== productId) acc[key] = value;
        return acc;
      }, {});
      if (!Object.keys(updatedCart).length) setIsModalCartOpen(false);
      setCart(updatedCart, { force: true });
    },
    [cart, setCart]
  );

  const updateItemQuantity = useCallback(
    (productId: string, quantity: number) => {
      const cartItem = cart[productId];
      if (!cartItem) return;
      setCart({ [productId]: { ...cartItem, quantity } });
    },
    [cart, setCart]
  );

  const totalCartItemsCount = useMemo(
    () => Object.values(cart).reduce((acc, cartItem) => acc + cartItem.quantity, 0),
    [cart]
  );

  const cartAmount = useMemo(
    () => Object.values(cart).reduce((acc, cartItem) => acc + cartItem.quantity * cartItem.product.price, 0),
    [cart]
  );

  const value = useMemo(
    () => ({
      cart,
      cartAmount,
      totalCartItemsCount,
      isModalCartOpen,
      setIsModalCartOpen,
      addItemToCart,
      updateItemQuantity,
      removeItemFromCart,
    }),
    [
      cart,
      cartAmount,
      totalCartItemsCount,
      isModalCartOpen,
      setIsModalCartOpen,
      addItemToCart,
      updateItemQuantity,
      removeItemFromCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContextProvider;

export const useCartContext = () => useContext(CartContext);
