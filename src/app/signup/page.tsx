"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signUp() {
    if (!firstName || !lastName || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Account created successfully. Please check your email.");

    router.push("/userlogin");
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="text-[#D4AF37] text-5xl font-bold mb-8 text-center">
          Sign Up
        </h1>

        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full p-4 rounded-xl mb-4 bg-white text-black placeholder-gray-500"
        />

        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full p-4 rounded-xl mb-4 bg-white text-black placeholder-gray-500"
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 rounded-xl mb-4 bg-white text-black placeholder-gray-500"
        />

        <input
          type="password"
          placeholder="Password (minimum 8 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 rounded-xl mb-6 bg-white text-black placeholder-gray-500"
        />

        <button
          onClick={signUp}
          className="
            w-full
            bg-[#D4AF37]
            text-black
            font-bold
            p-4
            rounded-xl
            hover:opacity-90
            transition
          "
        >
          Create Account
        </button>

        <p className="text-white text-center mt-6">
Already have an account?{" "}
<a
  href="/userlogin"
  className="text-[#D4AF37] underline font-semibold"
>
  Login here
</a>
</p>

      </div>
    </main>
  );
}