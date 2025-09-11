"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getInitials } from "@/lib/utils";
import { UpdateProfileRequest } from "@/services/profile/types";
import { useAuthStore } from "@/stores/authStore";
import { useProfileStore } from "@/stores/profileStore";
import { Label } from "@radix-ui/react-label";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { IoIosWarning } from "react-icons/io";
import { SyncLoader } from "react-spinners";
import { toast } from "sonner";
import z from "zod";

export default function ProfileForm() {
  const router = useRouter();
  const { profile, fetchProfile, updateProfile, loading, error } =
    useProfileStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState<UpdateProfileRequest>({
    first_name: "",
    last_name: "",
  });
  const [errors, setErrors] = useState<Partial<UpdateProfileRequest>>({});
  const { logout } = useAuthStore();

  const handleEditToggle = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setIsEditing((prev) => !prev);
      if (isEditing && profile) {
        setFormValues({
          first_name: profile.first_name,
          last_name: profile.last_name,
        });
        setErrors({});
      }
    },
    [isEditing, profile]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFormValues((prev) => ({ ...prev, [id]: value }));
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    },
    []
  );

  const hasChanges = useCallback(() => {
    if (!profile) return false;
    return (
      formValues.first_name !== profile.first_name ||
      formValues.last_name !== profile.last_name
    );
  }, [formValues, profile]);

  const handleSubmit = useCallback(async () => {
    setErrors({});

    try {
      await updateProfile(formValues);
      toast("Profile has been updated.", {
        style: {
          backgroundColor: "#00bc7d",
          color: "#fff",
        },
      });
      setIsEditing(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { first_name?: string; last_name?: string } = {};
        error.issues.forEach((err) => {
          if (err.path[0] === "first_name") {
            fieldErrors.first_name = err.message;
          } else if (err.path[0] === "last_name") {
            fieldErrors.last_name = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        const errorMessage =
          error instanceof Error
            ? error.message.includes("401")
              ? "Unauthorized access. Please log in again."
              : error.message
            : "An unexpected error occurred. Please try again.";
        console.log(errorMessage);
      }
    }
  }, [formValues, hasChanges, updateProfile, logout, router]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (profile) {
      setFormValues({
        first_name: profile.first_name,
        last_name: profile.last_name,
      });
    }
  }, [profile]);

  const handleLogout = useCallback(() => {
    logout();
    router.push("/auth/login");
  }, [logout, router]);

  if (loading || !profile) {
    return (
      <div
        className="flex justify-center items-center"
        style={{ height: "calc(100vh - 12rem)" }}
      >
        <SyncLoader size={16} color="#fb2c36" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center px-8 py-6 text-center space-y-6">
        <div className="w-64">
          <Image
            src="/images/warning-pana.svg"
            alt="Warning Illustration"
            width={500}
            height={500}
          />
        </div>
        <p className="text-md">
          Something went wrong. Couldn't load the profile.
        </p>
        <button className="flex items-center gap-2 bg-red-500 text-background px-2 py-1 rounded-sm cursor-pointer hover:bg-red-600">
          Retry
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-12">
      <div className="flex flex-col items-center gap-3">
        <Avatar className="size-24">
          <AvatarFallback className="text-4xl text-background bg-red-500">
            {getInitials(profile.first_name, profile.last_name)}
          </AvatarFallback>
        </Avatar>
        <div className="font-medium lg:text-2xl">
          {profile.first_name + " " + profile.last_name}
        </div>
      </div>
      <div className="flex flex-col gap-6 text-sm lg:text-md">
        <div className="grid gap-1.5">
          <Label className="font-medium" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder={profile.email}
            defaultValue={profile.email}
            disabled
            className="text-sm lg:text-md rounded-xs"
            required
          />
        </div>
        <div className="grid gap-1.5">
          <Label className="font-medium" htmlFor="first_name">
            First Name
          </Label>
          <Input
            id="first_name"
            name="first_name"
            type="text"
            placeholder={profile.first_name}
            value={formValues.first_name}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="text-sm lg:text-md rounded-xs capitalize"
            required
          />
          {errors.first_name && (
            <p className="text-red-500 text-xs">{errors.first_name}</p>
          )}
        </div>
        <div className="grid gap-1.5">
          <Label className="font-medium" htmlFor="last_name">
            Last Name
          </Label>
          <Input
            id="last_name"
            name="last_name"
            type="text"
            placeholder={profile.last_name}
            value={formValues.last_name}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="text-sm lg:text-md rounded-xs capitalize"
            required
          />
          {errors.last_name && (
            <p className="text-red-500 text-xs">{errors.last_name}</p>
          )}
        </div>
        {isEditing ? (
          <>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="text-background bg-red-500 hover:bg-red-600"
                  disabled={!hasChanges()}
                >
                  Save
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-sm space-y-6">
                <AlertDialogHeader>
                  <IoIosWarning className="self-center size-24 text-yellow-500 mb-4" />
                  <AlertDialogTitle className="text-center">
                    Are You Sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-center">
                    This action will apply permanent changes that can't be
                    undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <div className="w-full flex gap-6">
                    <AlertDialogCancel className="flex-1 cursor-pointer">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleSubmit}
                      className="flex-1 bg-red-500 hover:bg-red-600 cursor-pointer"
                    >
                      Confirm
                    </AlertDialogAction>
                  </div>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button
              type="button"
              className="bg-background border border-red-500 text-red-500 hover:bg-red-50"
              onClick={handleEditToggle}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            type="button"
            className="bg-red-500 hover:bg-red-600 text-background"
            onClick={handleEditToggle}
          >
            Edit
          </Button>
        )}
        {!isEditing && (
          <Button
            type="button"
            className="w-full rounded-sm text-red-500 border border-red-500 bg-background hover:bg-red-50 "
            onClick={handleLogout}
          >
            <span>
              <LogOut />
            </span>
            Log Out
          </Button>
        )}
      </div>
    </form>
  );
}
