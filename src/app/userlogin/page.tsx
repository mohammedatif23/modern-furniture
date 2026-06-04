"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Login successful");

    router.push("/");
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md">

        <h1 className="text-[#D4AF37] text-5xl font-bold mb-8 text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 rounded-xl mb-4 bg-white text-black"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 rounded-xl mb-6 bg-white text-black"
        />

        <button
          onClick={login}
          className="w-full bg-[#D4AF37] text-black font-bold p-4 rounded-xl"
        >
          Login
        </button>

        <div className="text-center mt-4">

  <a
    href="/forgot-password"
    className="
    text-[#D4AF37]
    underline
    "
  >
    Forgot Password?
  </a>

</div>

        <div className="mt-6 text-center">

<p className="text-white">

If account does not exist please sign up by clicking{" "}

<Link
href="/signup"
className="
text-[#D4AF37]
font-semibold
underline
"
>
here
</Link>

</p>

</div>

      </div>
    </main>
  );
}