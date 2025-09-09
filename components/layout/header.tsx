import { Menu, Wallet } from "lucide-react";
import NavMenu from "../nav-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed flex items-center left-0 top-0 right-0 h-16 bg-background border-b z-50">
      <div className="flex items-center justify-between gap-2 container max-w-2xl lg:max-w-4xl mx-auto px-3">
        <Link
          href="/"
          className="w-auto flex-none flex items-center gap-1.5 select-none cursor-pointer"
        >
          <div className="w-auto p-1.5 bg-red-500 rounded-full">
            <Wallet size={16} color="white" />
          </div>
          <span className="shrink-0 font-medium">SIMS PPOB</span>
        </Link>
        <div className="hidden lg:block">
          <NavMenu className="flex items-center" />
        </div>
        <Sheet>
          <SheetTrigger className="lg:hidden" asChild>
            <Button variant="outline">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="top" className="py-6 lg:hidden">
            <SheetHeader hidden>
              <SheetTitle hidden>Navigation Menu</SheetTitle>
              <SheetDescription hidden>Navigation Menu</SheetDescription>
            </SheetHeader>
            <NavMenu className="grid flex-1 auto-rows-min px-6 text-center" />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
