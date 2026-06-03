"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { supabase } from "../lib/supabase";

export default function Navbar() {
  const { cart } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);
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

  async function logout() {
    await supabase.auth.signOut();
    window.location.reload();
  }

  return (
    <nav
      className="
      w-full
      flex
      justify-between
      items-center
      px-6
      md:px-12
      py-6
      bg-black
      relative
      "
    >
      <div className="flex items-center gap-4">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="
          text-[#D4AF37]
          text-4xl
          font-bold
          "
        >
          ☰
        </button>

        <Link href="/">
          <h1
            className="
            text-[#D4AF37]
            text-2xl
            md:text-5xl
            font-bold
            "
          >
            ModernFurniture
          </h1>
        </Link>
      </div>

      <Link href="/cart">
        <button
          className="
          bg-[#D4AF37]
          text-black
          px-6
          py-3
          rounded-2xl
          font-semibold
          "
        >
          Cart ({cart.length})
        </button>
      </Link>

      {menuOpen && (
        <div
          className="
          absolute
          top-24
          left-6
          bg-neutral-900
          border
          border-[#D4AF37]
          rounded-2xl
          p-6
          min-w-[250px]
          z-50
          "
        >
          {!user ? (
            <>
              <Link href="/userlogin">
                <p className="text-white mb-4 cursor-pointer">
                  Login
                </p>
              </Link>

              <Link href="/signup">
                <p className="text-white mb-4 cursor-pointer">
                  Sign Up
                </p>
              </Link>
            </>
          ) : (
            <>
              <p className="text-[#D4AF37] font-bold mb-2">
  Profile
</p>

<p className="text-white font-semibold">
  {user.user_metadata?.first_name || ""}
  {" "}
  {user.user_metadata?.last_name || ""}
</p>

<p className="text-gray-400 mb-4 break-words">
  {user.email}
</p>

<Link href="/orders">
  <p className="text-white mb-4 cursor-pointer">
    My Orders
  </p>
</Link>

              <button
                onClick={logout}
                className="
                bg-red-600
                text-white
                px-4
                py-2
                rounded-xl
                "
              >
                Logout
              </button>
            </>
          )}

          <Link href="/shop">
            <p className="text-white mt-4 cursor-pointer">
              Shop
            </p>
          </Link>
        </div>
      )}
    </nav>
  );
}