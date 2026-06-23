"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type Item = {
  id: number;
  title: string;
  price: number;
  image?: string;
  quantity: number;
};

type CartType = {
  cart: Item[];
  addToCart: (
    item: Omit<Item, "quantity">
  ) => void;
  increaseQuantity: (
    id: number
  ) => void;
  decreaseQuantity: (
    id: number
  ) => void;
  removeFromCart: (
    id: number
  ) => void;
  clearCart: () => void;
};

const CartContext =
  createContext<CartType | null>(
    null
  );

export function CartProvider({

  children,
}: {
  children: ReactNode;
}) {
  const [cart, setCart] = useState<
    Item[]
  >([]);

  useEffect(() => {
    const savedCart =
      localStorage.getItem("cart");

    if (savedCart) {
      setCart(
        JSON.parse(savedCart)
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  function addToCart(
    item: Omit<Item, "quantity">
  ) {
    setCart((prev) => {
      const existing =
        prev.find(
          (p) => p.id === item.id
        );

      if (existing) {
        return prev.map((p) =>
          p.id === item.id
            ? {
                ...p,
                quantity:
                  p.quantity + 1,
              }
            : p
        );
      }

      return [
        ...prev,
        {
          ...item,
          quantity: 1,
        },
      ];
    });
  }

  function increaseQuantity(
    id: number
  ) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )
    );
  }

  function clearCart() {
  setCart([]);
  localStorage.removeItem("cart");
}

  function decreaseQuantity(
    id: number
  ) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) =>
            item.quantity > 0
        )
    );
  }

  function removeFromCart(
    id: number
  ) {
    setCart((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx =
    useContext(CartContext);

  if (!ctx) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return ctx;
}