// src/components/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active =
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={[
        "rounded-xl px-3 py-2 text-sm font-semibold transition",
        active
          ? "bg-gray-900 text-white shadow-sm"
          : "text-gray-700 hover:bg-gray-50",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-pink-500 to-orange-400 text-white shadow-sm">
            <span className="text-sm font-extrabold">GM</span>
          </div>
          <div className="leading-tight">
            <p className="text-sm font-extrabold text-gray-900">YouthZone</p>
            <p className="text-[11px] font-semibold text-gray-500">
              광명시 청년동
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 sm:flex">
          <NavLink href="/" label="홈" />
          <NavLink href="/programs" label="프로그램" />
          <NavLink href="/mypage" label="마이페이지" />
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/mypage"
            className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-gray-100 hover:bg-gray-50"
          >
            대관 예약
          </Link>
          <Link
            href="/programs"
            className="rounded-xl bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
          >
            신청하러 가기
          </Link>
        </div>
      </div>

      <div className="border-t border-gray-100 sm:hidden">
        <div className="mx-auto grid max-w-5xl grid-cols-3 gap-1 px-4 py-2">
          <NavLink href="/" label="홈" />
          <NavLink href="/programs" label="프로그램" />
          <NavLink href="/mypage" label="마이페이지" />
        </div>
      </div>
    </header>
  );
}
