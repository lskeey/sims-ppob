"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, TriangleAlert, Wallet } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { z } from "zod";
import { Alert, AlertDescription } from "../ui/alert";
import { useAuthStore } from "@/stores/authStore";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [submitError, setSubmitError] = useState<string>("");
  const { login, loading } = useAuthStore();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");

    try {
      await login(formData);
      router.push("/");
      setFormData({ email: "", password: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { email?: string; password?: string } = {};
        error.issues.forEach((err) => {
          if (err.path[0] === "email") {
            fieldErrors.email = err.message;
          } else if (err.path[0] === "password") {
            fieldErrors.password = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred. Please try again.";

        setSubmitError(errorMessage);
      }
    }
  };

  return (
    <form className="p-6 md:p-8" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-center gap-2">
          <div className="w-fit p-1.5 bg-red-500 rounded-full">
            <Wallet size={18} color="white" />
          </div>
          <span className="font-medium text-xl">SIMS PPOB</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">Welcome back!</h1>
          <p className="text-muted-foreground text-balance">
            Login to your account
          </p>
        </div>
        <div className="space-y-1">
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="johndoe@example.com"
              className={`rounded-xs ${errors.email ? "border-red-500" : ""}`}
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
        </div>
        <div className="space-y-1">
          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                className={`rounded-xs pr-10 ${
                  errors.password ? "border-red-500" : ""
                }`}
                value={formData.password}
                onChange={handleInputChange}
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
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password}</p>
          )}
        </div>
        {submitError && (
          <Alert
            variant="destructive"
            className="flex items-center bg-destructive/10 border-destructive rounded-sm"
          >
            <TriangleAlert size={12} />
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        )}
        <Button
          type="submit"
          className="w-full rounded-sm bg-red-500 hover:bg-red-600 cursor-pointer"
          disabled={loading}
        >
          {loading ? <ClipLoader size={16} color="#fff" /> : "Login"}
        </Button>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="text-red-500 hover:text-red-600 hover:underline underline-offset-4"
          >
            Sign up
          </Link>
        </div>
      </div>
    </form>
  );
}
