import { cn } from "@/lib/utils";
import Link from "next/link";

interface NavMenuProps {
  className?: string;
}

interface MenuItem {
  name: string;
  href: string;
}

const menuItems: MenuItem[] = [
  { name: "Top Up", href: "#" },
  { name: "Transactions", href: "#" },
  { name: "Profile", href: "#" },
];

export default function NavMenu({ className }: NavMenuProps) {
  return (
    <nav>
      <ul className={cn("gap-6", className)}>
        {menuItems.map((item, index) => (
          <li key={index} className="hover:text-red-600 cursor-pointer">
            <Link href={item.href}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
