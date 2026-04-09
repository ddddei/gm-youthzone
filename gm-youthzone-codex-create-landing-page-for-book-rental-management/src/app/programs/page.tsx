// src/app/programs/page.tsx
import Link from "next/link";

type Status = "모집중" | "마감임박" | "마감";

const tone: Record<Status, string> = {
  모집중: "bg-green-50 text-green-700 ring-green-200",
  마감임박: "bg-yellow-50 text-yellow-800 ring-yellow-200",
  마감: "bg-gray-50 text-gray-700 ring-gray-200",
};

const programs = [
  { id: "p1", title: "아카펠라 원데이 클래스", date: "2026-01-25(일) 14:00", place: "소강당", status: "모집중" as Status },
  { id: "p2", title: "청년 커리어 클리닉", date: "2026-01-22(목) 19:00", place: "세미나실", status: "마감임박" as Status },
  { id: "p3", title: "모닝 스트레칭 루틴", date: "2026-01-10(토) 10:00", place: "다목적실 1", status: "마감" as Status },
];

function Badge({ label }: { label: Status }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset",
        tone[label],
      ].join(" ")}
    >
      {label}
    </span>
  );
}

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-sky-50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-gray-500">프로그램</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
              청년동 프로그램 둘러보기 ✨
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              관심 있는 프로그램을 선택하고 자세한 내용을 확인해보세요.
            </p>
          </div>

          <Link
            href="/mypage"
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-gray-100 hover:bg-gray-50"
          >
            마이페이지 →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((p) => (
            <Link
              key={p.id}
              href={`/programs/${p.id}`}
              className="rounded-2xl border border-gray-100 bg-white/80 p-5 shadow-sm backdrop-blur hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-base font-semibold text-gray-900">{p.title}</p>
                <Badge label={p.status} />
              </div>
              <p className="mt-2 text-sm text-gray-600">{p.date}</p>
              <p className="mt-1 text-sm text-gray-600">{p.place}</p>
              <p className="mt-4 text-sm font-semibold text-gray-800">
                자세히 보기 →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
