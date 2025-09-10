"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { useProfileStore } from "@/stores/profileStore";
import { useEffect } from "react";

export default function ProfileCard() {
  const { profile, fetchProfile } = useProfileStore();
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (!profile) {
    return null;
  }

  return (
    <div className="flex gap-2 lg:flex-col lg:gap-4">
      <div className="flex-none">
        <Avatar className="size-12">
          <AvatarFallback className="bg-red-500 text-background">
            {getInitials(profile.first_name, profile.last_name)}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-1 items-center lg:block">
        <span className="hidden lg:inline">Welcome,</span>
        <h2 className="text-lg font-medium text-nowrap lg:text-2xl">
          {profile.first_name + " " + profile.last_name}
        </h2>
      </div>
    </div>
  );
}
