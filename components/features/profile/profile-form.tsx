"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { user } from "@/data/profile";
import { getInitials } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { LogOut } from "lucide-react";
import { FormEvent, useState } from "react";

export default function ProfileForm() {
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
  });
  const handleEditToggle = (e: FormEvent) => {
    e.preventDefault();
    setIsEditing(!isEditing);
    if (isEditing) {
      setFormValues({
        first_name: user.first_name,
        last_name: user.last_name,
      });
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };
  const hasChanges = () =>
    formValues.first_name !== user.first_name ||
    formValues.last_name !== user.last_name;
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!hasChanges()) {
      setIsEditing(false);
      return;
    }
    const formData = new FormData(e.currentTarget);
    const first_name = formData.get("first_name") as string;
    const last_name = formData.get("last_name") as string;
    console.log("Form Submission:", { first_name, last_name });
    // Add logic for saving form data here
    setIsEditing(false);
  };
  return (
    <form className="space-y-12" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-3">
        <Avatar className="size-24">
          <AvatarFallback className="text-4xl text-background bg-red-500">
            {getInitials(user.first_name, user.last_name)}
          </AvatarFallback>
        </Avatar>
        <div className="font-medium lg:text-2xl">
          {user.first_name + " " + user.last_name}
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
            placeholder={user.email}
            defaultValue={user.email}
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
            placeholder={user.first_name}
            value={formValues.first_name}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="text-sm lg:text-md rounded-xs capitalize"
            required
          />
        </div>
        <div className="grid gap-1.5">
          <Label className="font-medium" htmlFor="last_name">
            Last Name
          </Label>
          <Input
            id="last_name"
            name="last_name"
            type="text"
            placeholder={user.last_name}
            value={formValues.last_name}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="text-sm lg:text-md rounded-xs capitalize"
            required
          />
        </div>
        <Button
          type={isEditing ? "submit" : "button"}
          onClick={isEditing ? undefined : handleEditToggle}
          className="w-full rounded-sm bg-red-500 hover:bg-red-600 cursor-pointer"
        >
          {isEditing ? (hasChanges() ? "Save" : "Back") : "Edit"}
        </Button>
        {!isEditing && (
          <Button className="w-full rounded-sm text-red-500 hover:text-background border border-red-500 bg-background hover:bg-red-600 cursor-pointer">
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
