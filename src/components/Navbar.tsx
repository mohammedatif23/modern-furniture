"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "../lib/supabase";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const {
  cart,
  increaseQuantity,
  decreaseQuantity,
} = useCart();
  const [profileOpen, setProfileOpen] =
  useState(false);
  const [cartOpen, setCartOpen] =
  useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  

    useEffect(() => {
  checkUser();
}, []);

async function checkUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    setUser(session.user);
  }
}

async function handleLogin() {
  setLoading(true);

  const { error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  setLoading(false);

  if (error) {
    alert(error.message);
    return;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  setUser(user);
}

async function logout() {
  await supabase.auth.signOut();
  setUser(null);
  setProfileOpen(false);
}

  return (
    <nav
      className="
      sticky
      top-0
      z-50
      bg-white
      border-b
      border-gray-200
      shadow-sm
      "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        py-4
        flex
        items-center
        justify-between
        "
      >
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo"
            width={80}
            height={80}
            priority
          />
        </Link>

        <div
          className="
          flex
          gap-10
          font-semibold
          text-black
          "
        >
          <Link href="/">HOME</Link>
          <Link href="/shop">SHOP</Link>
          <Link href="/contact">CONTACT</Link>
          <Link href="/orders">ORDERS</Link>
        </div>

        {/* <Link href="/cart">
          <button
            className="
            bg-black
            text-white
            px-6
            py-3
            rounded-full
            "
          >
            Cart ({cart.length})
          </button>
        </Link> */}
        <div className="flex items-center gap-4">

        <button
          onClick={() =>
            setProfileOpen(!profileOpen)
          }
          className="
          w-12
          h-12
          rounded-full
          border
          border-black
          flex
          items-center
          justify-center
          text-xl
          "
        >
          👤
        </button>

                <button
          onClick={() => setCartOpen(true)}
          className="
          bg-black
          text-white
          px-6
          py-3
          rounded-full
          "
        >
          {/* Cart ({cart.length}) */}Cart (
{
  cart.reduce(
    (sum, item) =>
      sum + item.quantity,
    0
  )
}
)
        </button>

      </div>  
      </div>

      {
profileOpen && (

<div
  onClick={() =>
    setProfileOpen(false)
  }
  className="
  fixed
  inset-0
  bg-black/30
  z-50
  "
/>

)
}

      <div
  className={`
  fixed
  top-0
  right-0
  h-full
  w-[25%]
  min-w-[350px]
  bg-white
  shadow-2xl
  z-[100]
  transform
  transition-transform
  duration-500
  ease-in-out

  ${
    profileOpen
      ? "translate-x-0"
      : "translate-x-full"
  }
  `}
>

  <div className="p-10 h-full flex flex-col">

  <button
    onClick={() =>
      setProfileOpen(false)
    }
    className="
    text-3xl
    mb-10
    text-black
    "
  >
    ×
  </button>

  {!user ? (

    <>
      <h2
        className="
        text-3xl
        font-bold
        text-black
        mb-8
        "
      >
        Login
      </h2>

      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        className="
        w-full
        border
        border-gray-300
        rounded-xl
        p-4
        mb-4
        text-black
        "
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        className="
        w-full
        border
        border-gray-300
        rounded-xl
        p-4
        mb-4
        text-black
        "
      />

      <Link
        href="/forgot-password"
        className="
        text-black
        underline
        text-sm
        "
      >
        Forgot Password?
      </Link>

      <button
        onClick={handleLogin}
        disabled={loading}
        className="
        mt-6
        w-full
        bg-black
        text-white
        py-4
        rounded-xl
        "
      >
        {loading
          ? "Logging in..."
          : "Login"}
      </button>

      <Link href="/signup">
        <button
          className="
          mt-4
          w-full
          border
          border-black
          text-black
          py-4
          rounded-xl
          "
        >
          Create Account
        </button>
      </Link>
    </>

  ) : (

    <>
      <h2
        className="
        text-3xl
        font-bold
        text-black
        mb-8
        "
      >
        Profile
      </h2>

      <div className="mb-6">

        <p
          className="
          text-xl
          font-semibold
          text-black
          "
        >
          {user.email?.split("@")[0]}
        </p>

        <p className="text-gray-500">
          {user.email}
        </p>

      </div>

      <Link href="/orders">
        <button
          className="
          w-full
          border
          border-black
          py-4
          rounded-xl
          text-black
          "
        >
          My Orders
        </button>
      </Link>

      <div className="flex-1" />

      <button
        onClick={logout}
        className="
        w-full
        bg-red-600
        text-white
        py-4
        rounded-xl
        "
      >
        Logout
      </button>
    </>

  )}

</div>

  {cartOpen && (
  <div
    onClick={() => setCartOpen(false)}
    className="
    fixed
    inset-0
    bg-black/30
    z-40
    "
  />
)}

</div>

  {/* Cart Overlay */}
{cartOpen && (
  <div
    onClick={() => setCartOpen(false)}
    className="
    fixed
    inset-0
    bg-black/30
    z-40
    "
  />
)}

{/* Cart Drawer */}
<div
  className={`
  fixed
  top-0
  right-0
  h-full
  w-full
  md:w-[420px]
  bg-white
  shadow-2xl
  z-50
  transform
  transition-transform
  duration-500
  ease-in-out

  ${
    cartOpen
      ? "translate-x-0"
      : "translate-x-full"
  }
  `}
>
  <div className="p-8 h-full flex flex-col">

    <div className="flex justify-between items-center mb-8">
      <h2
        className="
        text-3xl
        font-bold
        text-black
        "
      >
        Shopping Cart
      </h2>

      <button
        onClick={() => setCartOpen(false)}
        className="
        text-3xl
        text-black
        "
      >
        ×
      </button>


    </div>

    <div className="flex-1 overflow-y-auto">

      {cart.length === 0 ? (

        <p className="text-gray-500">
          Cart is empty
        </p>

      ) : (

        cart.map((item: any) => (

  <div
    key={item.id}
    className="
    flex
    gap-4
    mb-6
    border-b
    pb-4
    "
  >

    <img
      src={item.image}
      alt={item.title}
      className="
      w-24
      h-24
      object-cover
      rounded-xl
      "
    />

    <div className="flex-1">

      <h3
        className="
        text-black
        font-semibold
        "
      >
        {item.title}
      </h3>

      <p className="text-gray-500">
        ${item.price}
      </p>

      <div
        className="
        flex
        items-center
        gap-3
        mt-3
        "
      >

        <button
          onClick={() =>
            decreaseQuantity(item.id)
          }
          className="
          w-8
          h-8
          rounded-full
          border
          border-black
          text-black
          "
        >
          -
        </button>

        <span
          className="
          text-black
          font-bold
          "
        >
          {item.quantity}
        </span>

        <button
          onClick={() =>
            increaseQuantity(item.id)
          }
          className="
          w-8
          h-8
          rounded-full
          border
          border-black
          text-black
          "
        >
          +
        </button>

      </div>

      <p
        className="
        text-black
        font-semibold
        mt-3
        "
      >
        Subtotal: $
        {item.price * item.quantity}
      </p>

    </div>

  </div>

))

      )}

    </div>

    <div className="border-t pt-6">

      <h3
        className="
        text-2xl
        font-bold
        text-black
        mb-4
        "
      >
        {/* Total: $
        {cart.reduce(
          (sum: number, item: any) =>
            sum + item.price,
          0
        )} */}

        Total: $
{
  cart.reduce(
    (sum, item) =>
      sum +
      item.price *
      item.quantity,
    0
  )
}
      </h3>

      <Link href="/checkout">
        <button
          className="
          w-full
          bg-black
          text-white
          py-4
          rounded-xl
          "
        >
          Checkout
        </button>
      </Link>

    </div>

  </div>
</div>

    </nav>
  );
}