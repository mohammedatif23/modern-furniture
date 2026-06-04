"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");

  async function updatePassword() {
    if (password.length < 8) {
      alert(
        "Password must be at least 8 characters"
      );
      return;
    }

    const { error } =
      await supabase.auth.updateUser({
        password,
      });

    if (error) {
      alert(error.message);
      return;
    }

    alert(
      "Password updated successfully"
    );

    router.push("/userlogin");
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md">

        <h1 className="text-[#D4AF37] text-5xl font-bold mb-8 text-center">
          Reset Password
        </h1>

        <input
          type="password"
          placeholder="New Password (minimum 8 characters)"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
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
          onClick={updatePassword}
          className="
          w-full
          bg-[#D4AF37]
          text-black
          font-bold
          p-4
          rounded-xl
          "
        >
          Update Password
        </button>

      </div>
    </main>
  );
}