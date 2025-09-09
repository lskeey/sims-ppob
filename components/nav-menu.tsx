"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavMenuProps {
  className?: string;
}

interface MenuItem {
  name: string;
  href: string;
}

const menuItems: MenuItem[] = [
  { name: "Top Up", href: "/topup" },
  { name: "Transactions", href: "/transactions" },
  { name: "Profile", href: "/profile" },
];

export default function NavMenu({ className }: NavMenuProps) {
  const pathname = usePathname();
  return (
    <nav>
      <ul className={cn("gap-6", className)}>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`hover:text-red-600 cursor-pointer ${
              pathname === item.href ? "text-red-500" : ""
            }`}
          >
            <Link href={item.href}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
