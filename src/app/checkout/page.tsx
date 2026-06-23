"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/lib/supabase";
import { loadStripe } from "@stripe/stripe-js";

export default function CheckoutPage() {
  const { cart } = useCart();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.push("/userlogin");
      return;
    }

    setEmail(session.user.email || "");
  }

  

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  async function handlePayment() {
    if (!name || !email) {
      alert("Please fill all fields");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    setLoading(true);

    try {
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
      );

      const response = await fetch("/api/create-checkout-session", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    cart,
    customerName: name,
    customerEmail: email,
  }),
});

const data = await response.json();

console.log("Stripe Response:", data);

if (!response.ok) {
  alert(data.error || "Stripe error");
  return;
}

if (!data.url) {
  alert("No checkout URL returned");
  return;
}

window.location.href = data.url;
    } catch (error) {
      console.error(error);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  }


  return (
    <main className="max-w-6xl mx-auto px-8 py-20 text-white">
      <h1 className="text-6xl font-bold mb-14">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-5">
          <input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white text-black border border-gray-300 p-5 rounded-2xl"
          />

          <input
            placeholder="Email"
            value={email}
            readOnly
            className="w-full bg-gray-200 text-black border border-gray-300 p-5 rounded-2xl cursor-not-allowed"
          />
        </div>

        <div className="bg-neutral-900 border border-gray-700 rounded-3xl p-8">
          <h2 className="text-3xl font-bold mb-8">Order Summary</h2>

          {cart.map((item, index) => (
            <div key={index} className="flex justify-between mb-4">
              <p>{item.title}</p>
              <p>${item.price}</p>
            </div>
          ))}

          <hr className="my-8 border-gray-700" />

          <h2 className="text-4xl font-bold">Total: ${total}</h2>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="mt-10 w-full bg-gradient-to-r from-[#7A5800] via-[#D4AF37] to-[#7A5800] text-black font-bold text-xl py-5 rounded-2xl"
          >
            {loading ? "Processing..." : "Pay Securely"}
          </button>
        </div>
      </div>
    </main>
  );
}
