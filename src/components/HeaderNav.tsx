"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {href: "/", label: "Home"},
  {href: "/countries", label: "Countries"},
  {href: "/currencies", label: "Currencies"},
  {href: "/capitals", label: "Capitals"},
  {href: "/languages", label: "Languages"},
  {href: "/continents", label: "Continents"},
  {href: "/report", label: "Report"},
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium">
      {navItems.map((item) => {
        const active = isActive(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={
              active
                ? "px-2 py-1 text-indigo-900 underline underline-offset-8 decoration-3 decoration-indigo-200"
                : "px-2 py-1 text-zinc-600 hover:text-indigo-900 hover:underline underline-offset-8 decoration-3 decoration-indigo-200"
            }
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}