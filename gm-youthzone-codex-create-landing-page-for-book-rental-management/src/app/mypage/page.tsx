// src/app/mypage/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type BadgeTone = "green" | "blue" | "yellow" | "gray" | "red" | "purple";

function Badge({ label, tone = "gray" }: { label: string; tone?: BadgeTone }) {
  const className = useMemo(() => {
    const base =
      "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset";
    const tones: Record<BadgeTone, string> = {
      green: "bg-green-50 text-green-700 ring-green-200",
      blue: "bg-blue-50 text-blue-700 ring-blue-200",
      yellow: "bg-yellow-50 text-yellow-800 ring-yellow-200",
      gray: "bg-gray-50 text-gray-700 ring-gray-200",
      red: "bg-red-50 text-red-700 ring-red-200",
      purple: "bg-purple-50 text-purple-700 ring-purple-200",
    };
    return `${base} ${tones[tone]}`;
  }, [tone]);

  return <span className={className}>{label}</span>;
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-2xl border border-gray-100 bg-white/80 shadow-sm backdrop-blur",
        "hover:shadow-md transition-shadow",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function SectionTitle({
  title,
  right,
}: {
  title: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="text-base font-semibold text-gray-900">{title}</h2>
      {right}
    </div>
  );
}

function EmptyState({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-6 text-center">
      <p className="font-semibold text-gray-900">{title}</p>
      <p className="mt-1 text-sm text-gray-600">{desc}</p>
    </div>
  );
}

type ProgramStatus = "신청완료" | "선정" | "대기" | "마감" | "수료" | "불참";
type RentalStatus = "검토중" | "승인" | "보류" | "반려" | "취소" | "이용완료";

const programTone: Record<ProgramStatus, BadgeTone> = {
  신청완료: "blue",
  선정: "green",
  대기: "yellow",
  마감: "gray",
  수료: "purple",
  불참: "red",
};

const rentalTone: Record<RentalStatus, BadgeTone> = {
  검토중: "blue",
  승인: "green",
  보류: "yellow",
  반려: "red",
  취소: "gray",
  이용완료: "purple",
};

type ProgramItem = {
  id: string;
  title: string;
  date: string;
  status: ProgramStatus;
};

type RentalItem = {
  id: string;
  room: string;
  dateTime: string;
  status: RentalStatus;
};

type Notice = {
  id: string;
  title: string;
  createdAt: string;
};

type HostProgram = {
  id: string;
  title: string;
  date: string;
  status: ProgramStatus;
  applicants: number;
};

type HostApplicant = {
  id: string;
  programId: string;
  name: string;
  status: "신청" | "선정" | "대기" | "반려";
};

const applicantTone: Record<HostApplicant["status"], BadgeTone> = {
  신청: "blue",
  선정: "green",
  대기: "yellow",
  반려: "red",
};

const mock = {
  user: {
    name: "필구",
    statusMessage: "오늘도 청년동에서 한 걸음 💪",
  },
  participant: {
    programApplications: [
      {
        id: "p1",
        title: "청년 커리어 클리닉",
        date: "2026-01-22(목) 19:00",
        status: "신청완료" as ProgramStatus,
      },
      {
        id: "p2",
        title: "아카펠라 원데이 클래스",
        date: "2026-01-25(일) 14:00",
        status: "선정" as ProgramStatus,
      },
      {
        id: "p3",
        title: "모닝 스트레칭 루틴",
        date: "2026-01-10(토) 10:00",
        status: "수료" as ProgramStatus,
      },
    ] as ProgramItem[],
    rentals: [
      {
        id: "r1",
        room: "소강당",
        dateTime: "2026-01-18(일) 15:00-17:00",
        status: "검토중" as RentalStatus,
      },
      {
        id: "r2",
        room: "다목적실 1",
        dateTime: "2026-01-08(목) 10:00-12:00",
        status: "이용완료" as RentalStatus,
      },
    ] as RentalItem[],
    notices: [
      { id: "n1", title: "1월 프로그램 신청 오픈 안내", createdAt: "2026-01-12" },
      { id: "n2", title: "대관 이용 수칙(필독)", createdAt: "2026-01-07" },
      { id: "n3", title: "설 연휴 운영시간 공지", createdAt: "2026-01-05" },
    ] as Notice[],
  },
  host: {
    myPrograms: [
      {
        id: "hp1",
        title: "청년 네트워킹 데이",
        date: "2026-02-02(월) 19:00",
        status: "신청완료" as ProgramStatus,
        applicants: 18,
      },
      {
        id: "hp2",
        title: "취업서류 클리닉(소그룹)",
        date: "2026-01-28(수) 20:00",
        status: "대기" as ProgramStatus,
        applicants: 9,
      },
    ] as HostProgram[],
    applicants: [
      { id: "a1", programId: "hp1", name: "김민지", status: "신청" },
      { id: "a2", programId: "hp1", name: "이준호", status: "선정" },
      { id: "a3", programId: "hp2", name: "박서연", status: "대기" },
      { id: "a4", programId: "hp2", name: "최유진", status: "신청" },
    ] as HostApplicant[],
    rentalRequests: [
      {
        id: "hr1",
        room: "소강당",
        dateTime: "2026-01-20(화) 18:00-20:00",
        status: "승인" as RentalStatus,
      },
      {
        id: "hr2",
        room: "회의실 A",
        dateTime: "2026-01-21(수) 14:00-16:00",
        status: "보류" as RentalStatus,
      },
    ] as RentalItem[],
  },
};

function Tabs({
  value,
  onChange,
}: {
  value: "participant" | "host";
  onChange: (v: "participant" | "host") => void;
}) {
  const common =
    "flex-1 rounded-xl px-4 py-2 text-sm font-semibold transition-all";
  return (
    <div className="grid grid-cols-2 gap-2 rounded-2xl bg-white/70 p-2 shadow-sm ring-1 ring-gray-100 backdrop-blur">
      <button
        type="button"
        onClick={() => onChange("participant")}
        className={[
          common,
          value === "participant"
            ? "bg-gradient-to-r from-pink-500 to-orange-400 text-white shadow"
            : "text-gray-700 hover:bg-white",
        ].join(" ")}
      >
        모임 참여자
      </button>
      <button
        type="button"
        onClick={() => onChange("host")}
        className={[
          common,
          value === "host"
            ? "bg-gradient-to-r from-indigo-500 to-sky-400 text-white shadow"
            : "text-gray-700 hover:bg-white",
        ].join(" ")}
      >
        모임 호스트
      </button>
    </div>
  );
}
<div className="mt-3 flex gap-2">
  <Link
    href="/mypage?role=participant"
    className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-gray-100 hover:bg-gray-50"
  >
    참여자 모드 링크
  </Link>
  <Link
    href="/mypage?role=host"
    className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-gray-100 hover:bg-gray-50"
  >
    호스트 모드 링크
  </Link>
</div>

export default function MyPage() {
const searchParams = useSearchParams();
const roleParam = searchParams.get("role");
const initialRole =
  roleParam === "host" ? "host" : "participant";

const [tab, setTab] = useState<"participant" | "host">(initialRole);
  // ✅ 프로그램 상세에서 신청하기 누른 내역(브라우저 저장) 불러오기
  const [storedApps, setStoredApps] = useState<
    { id: string; title: string; date: string; status: "신청완료" }[]
  >([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("gm_applications_v1");
      const list = raw ? JSON.parse(raw) : [];
      // 화면용으로 필요한 필드만
      const normalized = Array.isArray(list)
        ? list.map((x) => ({
            id: String(x.id),
            title: String(x.title),
            date: String(x.date),
            status: "신청완료" as const,
          }))
        : [];
      setStoredApps(normalized);
    } catch {
      setStoredApps([]);
    }
  }, []);
  // ✅ 신청 취소(브라우저 저장값에서 삭제)
  function cancelApplication(programId: string) {
    try {
      const raw = localStorage.getItem("gm_applications_v1");
      const prev = raw ? JSON.parse(raw) : [];
      const next = Array.isArray(prev)
        ? prev.filter((x) => String(x.id) !== String(programId))
        : [];
      localStorage.setItem("gm_applications_v1", JSON.stringify(next));

      // 화면에서도 바로 사라지게
      setStoredApps((cur) => cur.filter((x) => x.id !== programId));
      alert("신청을 취소했어요 ✅");
    } catch {
      alert("취소 중 오류가 발생했어요. 새로고침 후 다시 시도해 주세요.");
    }
  }


  const [applicants, setApplicants] = useState<HostApplicant[]>(
    mock.host.applicants
  );

  function updateApplicantStatus(applicantId: string, status: HostApplicant["status"]) {
    setApplicants((prev) =>
      prev.map((a) => (a.id === applicantId ? { ...a, status } : a))
    );
  }

  const participant = mock.participant;
const mergedApplications = useMemo(() => {
  const all = [...storedApps, ...participant.programApplications];
  const map = new Map<string, (typeof all)[number]>();
  // 같은 id가 있으면 storedApps(실제 신청)가 우선이 되도록 앞에서부터 채움
  for (const item of all) {
    if (!map.has(item.id)) map.set(item.id, item);
  }
  return Array.from(map.values());
}, [storedApps, participant.programApplications]);

  const host = mock.host;

  return (
<main
  className={[
    "min-h-screen",
    tab === "host"
      ? "bg-gradient-to-b from-indigo-50 via-white to-sky-50"
      : "bg-gradient-to-b from-orange-50 via-white to-sky-50",
  ].join(" ")}
>
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-500">마이페이지</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
              {mock.user.name}님, 반가워요 👋
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/programs"
              className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-gray-100 hover:bg-gray-50"
            >
              프로그램 →
            </Link>
            <button
              type="button"
              className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
              onClick={() => alert("나중에 로그아웃 연결 예정")}
            >
              로그아웃
            </button>
          </div>
        </div>

        {/* Profile */}
        <Card className="p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-pink-500 to-orange-400 text-white shadow-sm">
                <span className="text-lg font-extrabold">
                  {mock.user.name.slice(0, 1)}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-bold text-gray-900">{mock.user.name}</p>
                  <Badge
                    label={tab === "participant" ? "참여자" : "호스트"}
                    tone={tab === "participant" ? "blue" : "purple"}
                  />
                </div>
                <p className="mt-1 text-sm text-gray-600">{mock.user.statusMessage}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-gray-100 hover:bg-gray-50"
                onClick={() => alert("나중에 프로필 편집 연결 예정")}
              >
                개인정보 수정
              </button>
              <button
                type="button"
                className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-gray-100 hover:bg-gray-50"
                onClick={() => alert("나중에 알림 설정 연결 예정")}
              >
                알림 설정
              </button>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <div className="mt-6">
          <Tabs value={tab} onChange={setTab} />
        </div>

        {/* PARTICIPANT TAB */}
        {tab === "participant" ? (
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <Card className="p-5 sm:p-6">
              <SectionTitle
                title="내 신청 프로그램"
                right={
                  <Link
                    href="/programs"
                    className="text-sm font-semibold text-gray-700 hover:text-gray-900"
                  >
                    전체보기 →
                  </Link>
                }
              />
              <div className="mt-4 space-y-3">
                {mergedApplications.length === 0 ? (
                  <EmptyState
                    title="아직 신청한 프로그램이 없어요"
                    desc="프로그램 페이지에서 관심 있는 활동을 신청해보세요!"
                  />
                ) : (
                  mergedApplications.map((p) => (
                    <div
  key={p.id}
  className="rounded-2xl border border-gray-100 bg-white p-4 hover:border-gray-200"
>
  <div className="flex items-start justify-between gap-3">
    <div>
      <p className="font-semibold text-gray-900">{p.title}</p>
      <p className="mt-1 text-sm text-gray-600">{p.date}</p>
    </div>
    {/* p.status가 "신청완료"일 수도 있어서 안전하게 처리 */}
    <Badge
      label={p.status}
      tone={
        (p.status in programTone
          ? programTone[p.status as keyof typeof programTone]
          : "blue") as any
      }
    />
  </div>

  <div className="mt-3 flex flex-wrap gap-2">
    <Link
      href={`/programs/${p.id}`}
      className="rounded-xl bg-gray-900 px-3 py-2 text-xs font-semibold text-white hover:bg-gray-800"
    >
      상세 보기
    </Link>

    {/* ✅ storedApps(브라우저 저장 내역)에서 온 항목만 취소 가능 */}
    {storedApps.some((x) => x.id === p.id) ? (
      <button
        type="button"
        className="rounded-xl bg-white px-3 py-2 text-xs font-semibold text-red-700 ring-1 ring-red-100 hover:bg-red-50"
        onClick={() => cancelApplication(p.id)}
      >
        신청 취소
      </button>
    ) : (
      <span className="rounded-xl bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-500 ring-1 ring-gray-100">
        (데모 고정 항목)
      </span>
    )}
  </div>
</div>

                  ))
                )}
              </div>
            </Card>
            

            <Card className="p-5 sm:p-6">
              <SectionTitle title="내 대관 예약" />
              <div className="mt-4 space-y-3">
                {participant.rentals.length === 0 ? (
                  <EmptyState
                    title="대관 예약 내역이 없어요"
                    desc="공간이 필요하면 대관 예약을 신청해보세요!"
                  />
                ) : (
                  participant.rentals.map((r) => (
                    <div key={r.id} className="rounded-2xl border border-gray-100 bg-white p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-gray-900">{r.room}</p>
                          <p className="mt-1 text-sm text-gray-600">{r.dateTime}</p>
                        </div>
                        <Badge label={r.status} tone={rentalTone[r.status]} />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>

            <Card className="p-5 sm:p-6 lg:col-span-2">
              <SectionTitle title="알림 · 공지" />
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {participant.notices.map((n) => (
                  <div key={n.id} className="rounded-2xl border border-gray-100 bg-white p-4">
                    <p className="font-semibold text-gray-900">{n.title}</p>
                    <p className="mt-2 text-xs text-gray-500">{n.createdAt}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        ) : (
          /* HOST TAB */
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <Card className="p-5 sm:p-6">
              <SectionTitle title="내가 만든 모임 · 프로그램" />
              <div className="mt-4 space-y-3">
                {host.myPrograms.length === 0 ? (
                  <EmptyState title="아직 만든 프로그램이 없어요" desc="호스트로 프로그램을 개설해보세요!" />
                ) : (
                  host.myPrograms.map((p) => (
                    <div key={p.id} className="rounded-2xl border border-gray-100 bg-white p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-gray-900">{p.title}</p>
                          <p className="mt-1 text-sm text-gray-600">{p.date}</p>
                          <p className="mt-1 text-sm text-gray-600">
                            신청자 <span className="font-semibold text-gray-900">{p.applicants}</span>명
                          </p>
                        </div>
                        <Badge label={p.status} tone={programTone[p.status]} />
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          type="button"
                          className="rounded-xl bg-gray-900 px-3 py-2 text-xs font-semibold text-white hover:bg-gray-800"
                          onClick={() => alert("나중에 '참가자 관리' 상세 페이지로 연결 예정")}
                        >
                          참가자 관리
                        </button>
                        <button
                          type="button"
                          className="rounded-xl bg-white px-3 py-2 text-xs font-semibold text-gray-700 ring-1 ring-gray-100 hover:bg-gray-50"
                          onClick={() => alert("나중에 '프로그램 수정' 연결 예정")}
                        >
                          수정
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>

            <Card className="p-5 sm:p-6">
              <SectionTitle title="신청자 관리(데모)" />
              <p className="mt-2 text-sm text-gray-600">
                버튼을 누르면 상태가 바뀌는 것처럼 보여요. (DB 없이 데모 가능)
              </p>

              <div className="mt-4 space-y-3">
                {applicants.length === 0 ? (
                  <EmptyState title="신청자가 없어요" desc="신청이 들어오면 여기서 선정/대기를 처리해요." />
                ) : (
                  applicants.map((a) => (
                    <div key={a.id} className="rounded-2xl border border-gray-100 bg-white p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-gray-900">{a.name}</p>
                          <p className="mt-1 text-sm text-gray-600">대상 프로그램: {a.programId}</p>
                        </div>
                        <Badge label={a.status} tone={applicantTone[a.status]} />
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          type="button"
                          className="rounded-xl bg-gradient-to-r from-indigo-500 to-sky-400 px-3 py-2 text-xs font-semibold text-white hover:opacity-90"
                          onClick={() => updateApplicantStatus(a.id, "선정")}
                        >
                          선정
                        </button>
                        <button
                          type="button"
                          className="rounded-xl bg-white px-3 py-2 text-xs font-semibold text-gray-700 ring-1 ring-gray-100 hover:bg-gray-50"
                          onClick={() => updateApplicantStatus(a.id, "대기")}
                        >
                          대기
                        </button>
                        <button
                          type="button"
                          className="rounded-xl bg-white px-3 py-2 text-xs font-semibold text-red-700 ring-1 ring-red-100 hover:bg-red-50"
                          onClick={() => updateApplicantStatus(a.id, "반려")}
                        >
                          반려
                        </button>
                        <button
                          type="button"
                          className="rounded-xl bg-white px-3 py-2 text-xs font-semibold text-gray-700 ring-1 ring-gray-100 hover:bg-gray-50"
                          onClick={() => updateApplicantStatus(a.id, "신청")}
                        >
                          되돌리기
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>

            <Card className="p-5 sm:p-6 lg:col-span-2">
              <SectionTitle title="대관 신청 관리" />
              <div className="mt-4 space-y-3">
                {host.rentalRequests.length === 0 ? (
                  <EmptyState title="관리할 대관 신청이 없어요" desc="대관 신청이 들어오면 여기에서 승인/보류 처리해요." />
                ) : (
                  host.rentalRequests.map((r) => (
                    <div key={r.id} className="rounded-2xl border border-gray-100 bg-white p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-gray-900">{r.room}</p>
                          <p className="mt-1 text-sm text-gray-600">{r.dateTime}</p>
                        </div>
                        <Badge label={r.status} tone={rentalTone[r.status]} />
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          type="button"
                          className="rounded-xl bg-gradient-to-r from-indigo-500 to-sky-400 px-3 py-2 text-xs font-semibold text-white hover:opacity-90"
                          onClick={() => alert("승인 처리(나중에 DB 연결)")}
                        >
                          승인
                        </button>
                        <button
                          type="button"
                          className="rounded-xl bg-white px-3 py-2 text-xs font-semibold text-gray-700 ring-1 ring-gray-100 hover:bg-gray-50"
                          onClick={() => alert("보류 처리(추가서류 요청)")}
                        >
                          보류
                        </button>
                        <button
                          type="button"
                          className="rounded-xl bg-white px-3 py-2 text-xs font-semibold text-red-700 ring-1 ring-red-100 hover:bg-red-50"
                          onClick={() => alert("반려 처리")}
                        >
                          반려
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        )}

        <p className="mt-8 text-center text-xs text-gray-500">
          GM YouthZone · MyPage (Participant / Host)
        </p>
      </div>
    </main>
  );
}
