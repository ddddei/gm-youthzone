"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "홈" },
  { href: "/programs", label: "프로그램" },
  { href: "/spaces", label: "공간" },
  { href: "/rental", label: "공간대관" },
  { href: "/mypage", label: "마이페이지" },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-pink-500 to-orange-400" />
          <div className="leading-tight">
            <p className="text-sm font-extrabold text-gray-900">광명시 청년동</p>
            <p className="text-xs text-gray-500">GM YouthZone</p>
          </div>
        </Link>

        <nav className="flex gap-1">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "rounded-xl px-3 py-2 text-sm font-semibold transition",
                  active
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/mypage"
          className="rounded-xl bg-gradient-to-r from-pink-500 to-orange-400 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95"
        >
          내 활동
        </Link>
      </div>
    </header>
  );
}
