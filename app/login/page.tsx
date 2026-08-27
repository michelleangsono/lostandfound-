"use client";
import { verifyUser } from "@/db/users";
import { User } from "@/lib/types";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const LoginPage = () => {
  const newUser: User = { id: 0, email: "", fullname: "", password: "" };
  const [user, setUser] = useState<User>(newUser);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!user.email || !user.password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    const isValid = await verifyUser(user);
    if (isValid) {
      redirect("/dashboard");
    } else {
      toast.error("Email or password is wrong");
    }
    setLoading(false);
  };

  return (
    <main className="flex min-h-dvh flex-col bg-zinc-50 px-5 py-10 dark:bg-zinc-950 sm:items-center sm:justify-center sm:p-6">
      <div className="w-full max-w-sm mx-auto space-y-8 sm:space-y-6">
        <div className="space-y-2 text-center sm:space-y-1.5">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 dark:bg-zinc-50 sm:mb-2">
            <svg
              className="h-7 w-7 text-white dark:text-zinc-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Sign in
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Enter your details below to sign in
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <input
            className="h-12 w-full rounded-xl border border-zinc-200 bg-white px-4 text-base text-zinc-900 placeholder-zinc-400 transition-colors focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder-zinc-500 dark:focus:border-zinc-100 dark:focus:ring-zinc-100 sm:h-11 sm:text-sm"
            type="email"
            name="email"
            value={user.email}
            placeholder="Email address"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />

          <input
            className="h-12 w-full rounded-xl border border-zinc-200 bg-white px-4 text-base text-zinc-900 placeholder-zinc-400 transition-colors focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder-zinc-500 dark:focus:border-zinc-100 dark:focus:ring-zinc-100 sm:h-11 sm:text-sm"
            type="password"
            name="password"
            value={user.password!}
            placeholder="Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="h-12 w-full rounded-xl bg-zinc-900 text-base font-medium text-white transition-colors hover:bg-zinc-800 active:bg-zinc-950 disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 sm:h-11 sm:text-sm"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>

        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/"
            className="font-medium text-zinc-900 hover:underline dark:text-zinc-50"
          >
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
