"use client";
import { Button } from "@/components/Button";
import { HeaderNavigation } from "@/components/HeaderNavigation";
import { Input } from "@/components/Input";
import { createUser } from "@/db/users";
import { User } from "@/lib/types";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function SignupPage() {
  const [user, setUser] = useState<User>({
    id: 0,
    email: "",
    fullname: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleChange =
    (field: keyof User) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setUser({ ...user, [field]: e.target.value });
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.fullname || !user.email || !user.password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (!user.email.endsWith("@bsj.sch.id")) {
      toast.error("Only @bsj.sch.id emails are allowed");
      return;
    }
    if (user.password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!agreed) {
      toast.error("Please agree to terms & conditions");
      return;
    }
    setLoading(true);
    await createUser(user);
    setLoading(false);
    redirect("/");
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-sm bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl flex flex-col">
        <HeaderNavigation label="Create account" />

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          <Input
            id="fullname"
            label="Full name"
            placeholder="Your full name"
            value={user.fullname ?? ""}
            onChange={handleChange("fullname")}
          />

          <Input
            id="email"
            type="email"
            label="School email"
            placeholder="name@bsj.sch.id"
            value={user.email}
            onChange={handleChange("email")}
          />

          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="At least 8 characters"
            value={user.password ?? ""}
            onChange={handleChange("password")}
          />

          <Input
            id="confirmPassword"
            type="password"
            label="Confirm password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={
              confirmPassword && user.password !== confirmPassword
                ? "Passwords do not match"
                : undefined
            }
          />

          <label
            className="flex items-start gap-3 cursor-pointer"
            htmlFor="terms"
          >
            <div className="relative flex items-center justify-center mt-0.5">
              <input
                type="checkbox"
                id="terms"
                className="peer sr-only"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
              />
              <div className="w-5 h-5 rounded border peer-checked:bg-[#114b7d] peer-checked:border-transparent bg-[#161616] border-[#333] flex items-center justify-center transition-colors">
                {agreed && (
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-sm text-[#777] leading-snug">
              I agree that my name and claim times are recorded and visible to
              staff only.
            </span>
          </label>

          <div className="mt-2">
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </div>

          <p className="text-center text-[#777] text-xs mt-4 mb-2">
            Already have an account?{" "}
            <Link
              href="/"
              className="text-[#3b82f6] hover:text-blue-400 transition-colors"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
