// src/app/programs/[id]/page.tsx
"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";

type Program = {
  id: string;
  title: string;
  date: string;
  place: string;
  status: "모집중" | "마감임박" | "마감";
  target: string;
  fee: string;
  description: string;
};

const programs: Program[] = [
  {
    id: "p1",
    title: "아카펠라 원데이 클래스",
    date: "2026-01-25(일) 14:00",
    place: "소강당",
    status: "모집중",
    target: "20~39세 청년 누구나",
    fee: "무료",
    description:
      "목 풀기부터 하모니 맞추기까지! 초보도 가능한 원데이 아카펠라 클래스예요. 함께 노래하고, 가볍게 녹음도 해봐요.",
  },
  {
    id: "p2",
    title: "청년 커리어 클리닉",
    date: "2026-01-22(목) 19:00",
    place: "세미나실",
    status: "마감임박",
    target: "취업 준비/이직 준비 청년",
    fee: "무료",
    description:
      "이력서/자기소개서/면접 대비를 1:1 피드백 중심으로 점검해요. 실전 팁과 방향성을 함께 잡아봅니다.",
  },
  {
    id: "p3",
    title: "모닝 스트레칭 루틴",
    date: "2026-01-10(토) 10:00",
    place: "다목적실 1",
    status: "마감",
    target: "가볍게 몸풀고 싶은 청년",
    fee: "무료",
    description:
      "하루를 가볍게 시작하는 30분 스트레칭! 기초 루틴으로 무리 없이 진행해요. 편한 복장으로 오면 돼요.",
  },
];

type StoredApplication = {
  id: string;
  title: string;
  date: string;
  status: "신청완료";
  appliedAt: string; // 기록용
};

const STORAGE_KEY = "gm_applications_v1";

function isAlreadyApplied(programId: string) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const prev: { id: string }[] = raw ? JSON.parse(raw) : [];
    return Array.isArray(prev) && prev.some((x) => x.id === programId);
  } catch {
    return false;
  }
}
function saveApplication(p: Program) {
  const item: StoredApplication = {
    id: p.id,
    title: p.title,
    date: p.date,
    status: "신청완료",
    appliedAt: new Date().toISOString(),
  };

  const raw = localStorage.getItem(STORAGE_KEY);
  const prev: StoredApplication[] = raw ? JSON.parse(raw) : [];

  // 중복 신청 방지(같은 id 있으면 추가 안 함)
  const exists = prev.some((x) => x.id === item.id);
  const next = exists ? prev : [item, ...prev];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return { exists };
}

function Badge({ label }: { label: Program["status"] }) {
  const tone =
    label === "모집중"
      ? "bg-green-50 text-green-700 ring-green-200"
      : label === "마감임박"
      ? "bg-yellow-50 text-yellow-800 ring-yellow-200"
      : "bg-gray-50 text-gray-700 ring-gray-200";

  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset",
        tone,
      ].join(" ")}
    >
      {label}
    </span>
  );
}

export default function ProgramDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const program = programs.find((p) => p.id === id);

  if (!program) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-sky-50">
        <div className="mx-auto max-w-3xl px-4 py-10">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <p className="text-lg font-bold text-gray-900">
              프로그램을 찾을 수 없어요 😥
            </p>
            <p className="mt-2 text-sm text-gray-600">
              목록으로 돌아가서 다시 선택해 주세요.
            </p>
            <Link
              href="/programs"
              className="mt-4 inline-flex rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
            >
              프로그램 목록으로
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const isClosed = program.status === "마감";

    const [already, setAlready] = useState(false);

useEffect(() => {
  setAlready(isAlreadyApplied(program.id));
}, [program.id]);


  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-sky-50">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/programs"
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-gray-100 hover:bg-gray-50"
          >
            ← 목록으로
          </Link>
          <Link
            href="/mypage"
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-gray-100 hover:bg-gray-50"
          >
            마이페이지 →
          </Link>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm backdrop-blur">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-gray-500">프로그램 상세</p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
                {program.title}
              </h1>
            </div>
            <Badge label={program.status} />
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-100 bg-white p-4">
              <p className="text-xs font-semibold text-gray-500">일정</p>
              <p className="mt-1 font-semibold text-gray-900">{program.date}</p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-4">
              <p className="text-xs font-semibold text-gray-500">장소</p>
              <p className="mt-1 font-semibold text-gray-900">{program.place}</p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-4">
              <p className="text-xs font-semibold text-gray-500">대상</p>
              <p className="mt-1 font-semibold text-gray-900">{program.target}</p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-4">
              <p className="text-xs font-semibold text-gray-500">참가비</p>
              <p className="mt-1 font-semibold text-gray-900">{program.fee}</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-5">
            <p className="text-sm font-semibold text-gray-900">소개</p>
            <p className="mt-2 text-sm leading-6 text-gray-700">
              {program.description}
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-600">
              신청 상태에 따라 버튼이 달라질 수 있어요.
            </p>

            <button
              type="button"
              disabled={isClosed || already}
              onClick={() => {const latestAlready = isAlreadyApplied(program.id);
if (latestAlready) {
  alert("이미 신청한 프로그램이에요! 마이페이지에서 확인해보세요 ✅");
  setAlready(true);
  return;
}

                if (isClosed) {
                  alert("이미 마감된 프로그램이에요.");
                  return;
                }
                const { exists } = saveApplication(program);
                alert(exists ? "이미 신청한 프로그램이에요!" : "신청 완료! 마이페이지에서 확인해보세요 ✅");
              }}
              className={[
                "rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm transition",
                isClosed
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-pink-500 to-orange-400 text-white hover:opacity-95",
              ].join(" ")}
            >
              {isClosed ? "마감됨" : "신청하기"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
export function generateStaticParams() {
  return [{ id: "p1" }, { id: "p2" }, { id: "p3" }];
}
