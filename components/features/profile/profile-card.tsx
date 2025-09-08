import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function ProfileCard() {
  return (
    <div className="flex gap-2 lg:flex-col lg:gap-4">
      <div className="flex-none">
        <Avatar className="size-12">
          <AvatarFallback className="bg-red-500 text-background">
            CN
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-1 items-center lg:block">
        <span className="hidden lg:inline">Welcome,</span>
        <h2 className="text-lg font-medium text-nowrap lg:text-2xl">
          Catherine Natasha
        </h2>
      </div>
    </div>
  );
}
