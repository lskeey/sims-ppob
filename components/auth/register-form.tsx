"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Wallet } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="p-6 md:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-center gap-2">
          <div className="w-fit p-1.5 bg-red-500 rounded-full">
            <Wallet size={18} color="white" />
          </div>
          <span className="font-medium text-xl">SIMS PPOB</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">Welcome!</h1>
          <p className="text-muted-foreground text-balance">
            Create your account
          </p>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="johndoe@example.com"
            className="rounded-xs"
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            type="text"
            placeholder="John"
            className="rounded-xs capitalize"
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Doe"
            className="rounded-xs capitalize"
            required
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              className="rounded-xs pr-10"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showPassword ? (
                <Eye
                  className="h-5 w-5 text-gray-400 cursor-pointer"
                  strokeWidth={1}
                />
              ) : (
                <EyeOff
                  className="h-5 w-5 text-gray-400 cursor-pointer"
                  strokeWidth={1}
                />
              )}
            </button>
          </div>
        </div>
        <Button
          type="submit"
          className="w-full rounded-sm bg-red-500 hover:bg-red-600 cursor-pointer"
        >
          Register
        </Button>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-red-500 hover:text-red-600 hover:underline underline-offset-4"
          >
            Sign in
          </Link>
        </div>
      </div>
    </form>
  );
}
