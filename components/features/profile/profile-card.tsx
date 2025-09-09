import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { user } from "@/data/profile";
import { getInitials } from "@/lib/utils";

export default function ProfileCard() {
  return (
    <div className="flex gap-2 lg:flex-col lg:gap-4">
      <div className="flex-none">
        <Avatar className="size-12">
          <AvatarFallback className="bg-red-500 text-background">
            {getInitials(user.first_name, user.last_name)}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-1 items-center lg:block">
        <span className="hidden lg:inline">Welcome,</span>
        <h2 className="text-lg font-medium text-nowrap lg:text-2xl">
          {user.first_name + " " + user.last_name}
        </h2>
      </div>
    </div>
  );
}
