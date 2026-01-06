"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignin = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // ✅ LOGIN STATE
      localStorage.setItem("isLoggedIn", "true");

      alert("Login successful");
      router.push("/dashboard");
    } catch {
      alert("Backend server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

        <input
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-6"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignin}
          disabled={loading}
          className="w-full bg-orange-500 text-white py-3 rounded hover:bg-orange-600"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p className="text-center mt-4 text-sm">
          Don&apos;t have an account?{" "}
          <span
            className="text-orange-500 cursor-pointer"
            onClick={() => router.push("/auth/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
