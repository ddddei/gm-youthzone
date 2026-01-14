// src/app/page.tsx
import Link from "next/link";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-gray-100">
      {children}
    </span>
  );
}

function FeatureCard({
  title,
  desc,
  href,
  cta,
}: {
  title: string;
  desc: string;
  href: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-gray-100 bg-white/80 p-5 shadow-sm backdrop-blur hover:shadow-md transition-shadow"
    >
      <p className="text-base font-bold text-gray-900">{title}</p>
      <p className="mt-2 text-sm leading-6 text-gray-600">{desc}</p>
      <p className="mt-4 text-sm font-semibold text-gray-900">{cta} →</p>
    </Link>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-sky-50">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="rounded-3xl border border-gray-100 bg-white/80 p-6 shadow-sm backdrop-blur sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex flex-wrap gap-2">
                <Pill>광명시 청년동</Pill>
                <Pill>프로그램 · 대관 · 커뮤니티</Pill>
                <Pill>청년 감성 UI</Pill>
              </div>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                청년의 하루가 더 편해지는 공간,
                <span className="block bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
                  GM YouthZone
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
                프로그램 신청부터 대관 예약까지 한 번에.  
                가볍고 친근한 화면으로 청년동을 더 쉽게 이용해요.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/programs"
                  className="inline-flex items-center justify-center rounded-2xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
                >
                  프로그램 보러가기
                </Link>
                <Link
                  href="/mypage"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-100 hover:bg-gray-50"
                >
                  마이페이지 열기
                </Link>
              </div>
            </div>

            {/* Right card */}
            <div className="w-full max-w-md rounded-3xl bg-gradient-to-br from-pink-500 to-orange-400 p-1 shadow-sm">
              <div className="rounded-[22px] bg-white p-5">
                <p className="text-sm font-bold text-gray-900">오늘의 추천</p>
                <div className="mt-3 space-y-3">
                  <div className="rounded-2xl border border-gray-100 p-4">
                    <p className="font-semibold text-gray-900">
                      아카펠라 원데이 클래스
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      2026-01-25(일) 14:00 · 소강당
                    </p>
                    <Link
                      href="/programs/p1"
                      className="mt-3 inline-flex text-sm font-semibold text-gray-900"
                    >
                      자세히 보기 →
                    </Link>
                  </div>

                  <div className="rounded-2xl border border-gray-100 p-4">
                    <p className="font-semibold text-gray-900">대관 예약 빠른 안내</p>
                    <p className="mt-1 text-sm text-gray-600">
                      예약 신청 후 검토 → 승인 확정
                    </p>
                    <Link
                      href="/mypage"
                      className="mt-3 inline-flex text-sm font-semibold text-gray-900"
                    >
                      내 예약 확인 →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick actions */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            title="프로그램 신청"
            desc="청년을 위한 강의·모임·클래스. 모집중 프로그램을 확인하고 신청해요."
            href="/programs"
            cta="프로그램 목록"
          />
          <FeatureCard
            title="대관 예약"
            desc="소강당/회의실/다목적실 등 공간을 예약하고, 승인 상태를 확인해요."
            href="/mypage"
            cta="예약 현황"
          />
          <FeatureCard
            title="마이페이지"
            desc="신청 프로그램·대관 예약·공지 알림까지 한 화면에서 관리해요."
            href="/mypage"
            cta="내 정보"
          />
        </section>

        {/* Notice strip */}
        <section className="mt-8 rounded-3xl border border-gray-100 bg-white/80 p-6 shadow-sm backdrop-blur">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold text-gray-900">공지 · 안내</p>
              <p className="mt-1 text-sm text-gray-600">
                운영시간, 대관 수칙, 모집 일정 등 최신 정보를 확인해요.
              </p>
            </div>
            <Link
              href="/mypage"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-100 hover:bg-gray-50"
            >
              공지 확인하러 가기
            </Link>
          </div>
        </section>

        <p className="mt-10 text-center text-xs text-gray-500">
          GM YouthZone · Home (Next.js + Tailwind)
        </p>
      </div>
    </main>
  );
}
