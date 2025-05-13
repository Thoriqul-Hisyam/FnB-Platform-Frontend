"use client";

import { useState } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", { email, password });
      const accessToken = res.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      document.cookie = `accessToken=${accessToken}; path=/; secure; samesite=strict`;
      router.push("/dashboard");
    } catch (err) {
      setError("Login gagal. Periksa email dan password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md border border-gray-200 shadow-md rounded-2xl">
        <CardHeader className="pb-0">
          <CardTitle className="text-center text-3xl font-semibold text-violet-700">
            Welcome Back
          </CardTitle>
          <p className="text-center text-gray-500 text-sm mt-1">
            Login to access your dashboard
          </p>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <Button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-xl"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
