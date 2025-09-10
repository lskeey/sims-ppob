"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { getInitials } from "@/lib/utils";
import { useProfileStore } from "@/stores/profileStore";
import { useEffect } from "react";

export default function ProfileCard() {
  const { profile, fetchProfile } = useProfileStore();
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <div className="flex gap-2 lg:flex-col lg:gap-4 h-full lg:justify-between">
      <div className="flex-none">
        {!profile ? (
          <Skeleton className="size-12 bg-black/10 rounded-full" />
        ) : (
          <Avatar className="size-12">
            <AvatarFallback className="bg-red-500 text-background">
              {getInitials(profile.first_name, profile.last_name)}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
      <div className="flex flex-1 items-center lg:block">
        {!profile ? (
          <div className="lg:space-y-2">
            <Skeleton className="hidden lg:block w-20 h-4 bg-black/10 rounded-full" />
            <Skeleton className="w-56 h-6 bg-black/10 rounded-full" />
          </div>
        ) : (
          <>
            <span className="hidden lg:inline">Welcome,</span>
            <h2 className="text-lg font-medium text-nowrap lg:text-2xl">
              {profile.first_name + " " + profile.last_name}
            </h2>
          </>
        )}
      </div>
    </div>
  );
}
