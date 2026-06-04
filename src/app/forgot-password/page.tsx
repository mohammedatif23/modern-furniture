"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  async function resetPassword() {
    const { error } =
      await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo:
            window.location.origin +
            "/reset-password",
        }
      );

    if (error) {
      alert(error.message);
      return;
    }

    alert(
      "Password reset email sent"
    );
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md">

        <h1 className="text-[#D4AF37] text-5xl font-bold mb-8 text-center">
          Forgot Password
        </h1>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="
          w-full
          p-4
          rounded-xl
          mb-6
          bg-white
          text-black
          "
        />

        <button
          onClick={resetPassword}
          className="
          w-full
          bg-[#D4AF37]
          text-black
          font-bold
          p-4
          rounded-xl
          "
        >
          Send Reset Link
        </button>

      </div>
    </main>
  );
}