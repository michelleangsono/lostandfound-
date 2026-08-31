"use client";
import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { Input } from "@/components/Input";
import { verifyUser } from "@/db/users";
import { User } from "@/lib/types";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const newUser: User = { id: 0, email: "", fullname: "", password: "" };
  const [user, setUser] = useState<User>(newUser);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.email || !user.password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (!user.email.endsWith("@bsj.sch.id")) {
      toast.error("Only @bsj.sch.id emails are allowed");
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

  const handleChange =
    (field: keyof User) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setUser({ ...user, [field]: e.target.value });
    };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-sm bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl flex flex-col">
        <Header />

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          <Input
            id="email"
            type="email"
            label="School email"
            placeholder="name@bsj.sch.id"
            value={user.email}
            onChange={handleChange("email")}
          />

          <div className="flex flex-col gap-1">
            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              value={user.password ?? ""}
              onChange={handleChange("password")}
              rightElement={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              }
            />
          </div>

          <div className="mt-2">
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </div>

          <p className="text-center text-[#777] text-xs mt-4 mb-2">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-[#3b82f6] hover:text-blue-400 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
