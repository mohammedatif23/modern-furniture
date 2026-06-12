"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import Image from "next/image";

export default function Navbar() {
  const { cart } = useCart();
  const [profileOpen, setProfileOpen] =
  useState(false);

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

        <Link href="/cart">
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
        </Link>

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

  <div className="p-10">

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
      placeholder="Email Address"
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

    <a
      href="/forgot-password"
      className="
      text-black
      underline
      text-sm
      "
    >
      Forgot Password?
    </a>

    <button
      className="
      mt-6
      w-full
      bg-black
      text-white
      py-4
      rounded-xl
      "
    >
      Login
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

  </div>

</div>


    </nav>
  );
}