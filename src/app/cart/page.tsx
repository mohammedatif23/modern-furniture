"use client";

import { useCart } from "../../context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, addToCart, removeFromCart } = useCart();

  const groupedItems = cart.reduce((acc: any, item) => {
    if (!acc[item.id]) {
      acc[item.id] = {
        ...item,
        quantity: 1,
      };
    } else {
      acc[item.id].quantity += 1;
    }

    return acc;
  }, {});

  const products = Object.values(groupedItems) as any[];

  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (
    <main
      className="
      max-w-7xl
      mx-auto
      px-8
      py-20
      "
    >
      <h1
        className="
        text-6xl
        font-bold
        mb-16
        "
      >
        Cart
      </h1>

      {cart.length === 0 ? (
        <p>Cart Empty</p>
      ) : (
        <>
          {products.map((item) => (
            <div
              key={item.id}
              className="
              border
              p-8
              rounded-xl
              mb-6
              flex
              justify-between
              items-center
              "
            >
              <div>
                <h2 className="text-2xl">
                  {item.title}
                </h2>

                <p>
                  Price: ${item.price}
                </p>

                <p className="font-semibold mt-2">
                  Total: $
                  {item.price * item.quantity}
                </p>
              </div>

              <div className="flex items-center gap-4">

                <button
                  onClick={() =>
                    removeFromCart(
                      cart.findIndex(
                        (cartItem) =>
                          cartItem.id === item.id
                      )
                    )
                  }
                  className="
                  bg-red-500
                  text-white
                  w-12
                  h-12
                  rounded-full
                  text-2xl
                  font-bold
                  "
                >
                  -
                </button>

                <span
                  className="
                  text-2xl
                  font-bold
                  min-w-[40px]
                  text-center
                  "
                >
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    addToCart(item)
                  }
                  className="
                  bg-green-500
                  text-white
                  w-12
                  h-12
                  rounded-full
                  text-2xl
                  font-bold
                  "
                >
                  +
                </button>

              </div>
            </div>
          ))}

          <h2
            className="
            text-4xl
            font-bold
            mt-10
            "
          >
            Total: ${total}
          </h2>

          <Link href="/checkout">
            <button
              className="
              mt-8
              bg-black
              text-white
              px-8
              py-4
              rounded-xl
              "
            >
              Proceed To Checkout
            </button>
          </Link>
        </>
      )}
    </main>
  );
}