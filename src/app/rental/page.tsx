"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type RentalRequest = {
  id: string;
  createdAt: string;
  space: string;
  date: string;
  time: string;
  purpose: string;
  people: string;
  name: string;
  phone: string;
  note: string;
  status: "검토중";
};

const STORAGE_KEY = "gm_rentals_v1";

const SPACE_OPTIONS = ["소강당", "세미나실", "다목적실 1"];

function loadRequests(): RentalRequest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const prev = raw ? JSON.parse(raw) : [];
    return Array.isArray(prev) ? prev : [];
  } catch {
    return [];
  }
}

function saveRequests(next: RentalRequest[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export default function RentalPage() {
  const [space, setSpace] = useState(SPACE_OPTIONS[0]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [purpose, setPurpose] = useState("");
  const [people, setPeople] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");

  const [list, setList] = useState<RentalRequest[]>([]);
  const latest3 = useMemo(() => list.slice(0, 3), [list]);

  useEffect(() => {
    setList(loadRequests());
  }, []);

  const canSubmit =
    !!date && !!time && purpose.trim().length >= 2 && people.trim().length >= 1 && name.trim().length >= 1 && phone.trim().length >= 6;

  function submit() {
    if (!canSubmit) {
      alert("필수 항목을 채워주세요 (날짜/시간/목적/인원/이름/연락처).");
      return;
    }

    const req: RentalRequest = {
      id: `r_${Date.now()}`,
      createdAt: new Date().toISOString(),
      space,
      date,
      time,
      purpose: purpose.trim(),
      people: people.trim(),
      name: name.trim(),
      phone: phone.trim(),
      note: note.trim(),
      status: "검토중",
    };

    const next = [req, ...loadRequests()];
    saveRequests(next);
    setList(next);

    // 폼 리셋(원하면 유지해도 됨)
    setPurpose("");
    setPeople("");
    setName("");
    setPhone("");
    setNote("");

    alert("예약 신청이 접수되었습니다 ✅ (데모: ‘검토중’으로 저장됨)");
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-sky-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-3xl border border-gray-100 bg-white/80 p-8 shadow-sm backdrop-blur">
          <p className="inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700 ring-1 ring-sky-100">
            공간 예약(대관)
          </p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900">
            예약 신청을 남겨주세요
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
            운영진이 확인 후 확정 안내를 드립니다. 현재는 데모 화면으로, 신청 내역이 브라우저에 저장됩니다.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href="/spaces"
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-gray-800 shadow-sm ring-1 ring-gray-100 hover:bg-gray-50"
            >
              공간소개 보기 →
            </Link>
            <Link
              href="/mypage?role=participant"
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-gray-800 shadow-sm ring-1 ring-gray-100 hover:bg-gray-50"
            >
              마이페이지
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {/* 신청 폼 */}
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-extrabold text-gray-900">예약 신청</h2>
            <p className="mt-2 text-sm text-gray-600">필수 항목을 입력하고 신청하기를 눌러주세요.</p>

            <div className="mt-5 grid gap-3">
              <label className="grid gap-1">
                <span className="text-xs font-bold text-gray-600">공간 선택</span>
                <select
                  value={space}
                  onChange={(e) => setSpace(e.target.value)}
                  className="rounded-xl border border-gray-200 px-4 py-2 text-sm"
                >
                  {SPACE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="grid gap-1">
                  <span className="text-xs font-bold text-gray-600">날짜 *</span>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="rounded-xl border border-gray-200 px-4 py-2 text-sm"
                  />
                </label>

                <label className="grid gap-1">
                  <span className="text-xs font-bold text-gray-600">시간 *</span>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="rounded-xl border border-gray-200 px-4 py-2 text-sm"
                  />
                </label>
              </div>

              <label className="grid gap-1">
                <span className="text-xs font-bold text-gray-600">사용 목적 *</span>
                <input
                  type="text"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="예: 스터디 모임 / 취업 준비 모임 / 네트워킹"
                  className="rounded-xl border border-gray-200 px-4 py-2 text-sm"
                />
              </label>

              <label className="grid gap-1">
                <span className="text-xs font-bold text-gray-600">예상 인원 *</span>
                <input
                  type="text"
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                  placeholder="예: 8명"
                  className="rounded-xl border border-gray-200 px-4 py-2 text-sm"
                />
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="grid gap-1">
                  <span className="text-xs font-bold text-gray-600">신청자 이름 *</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-xl border border-gray-200 px-4 py-2 text-sm"
                  />
                </label>
                <label className="grid gap-1">
                  <span className="text-xs font-bold text-gray-600">연락처 *</span>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="예: 01012345678"
                    className="rounded-xl border border-gray-200 px-4 py-2 text-sm"
                  />
                </label>
              </div>

              <label className="grid gap-1">
                <span className="text-xs font-bold text-gray-600">요청사항(선택)</span>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  placeholder="예: 테이블 배치 요청 / 장비 사용 문의 등"
                  className="rounded-xl border border-gray-200 px-4 py-2 text-sm"
                />
              </label>

              <button
                type="button"
                onClick={submit}
                disabled={!canSubmit}
                className={[
                  "rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm transition",
                  canSubmit
                    ? "bg-gradient-to-r from-pink-500 to-orange-400 text-white hover:opacity-95"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed",
                ].join(" ")}
              >
                예약 신청하기
              </button>

              <p className="text-xs text-gray-500">
                * 데모 화면: 신청 내역은 이 브라우저에만 저장됩니다.
              </p>
            </div>
          </div>

          {/* 최근 신청 */}
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-extrabold text-gray-900">최근 예약 신청</h2>
            <p className="mt-2 text-sm text-gray-600">최근 3건만 표시합니다.</p>

            <div className="mt-5 grid gap-3">
              {latest3.length === 0 ? (
                <div className="rounded-2xl bg-gray-50 p-5 ring-1 ring-gray-100">
                  <p className="text-sm font-semibold text-gray-900">아직 신청 내역이 없어요</p>
                  <p className="mt-1 text-sm text-gray-600">왼쪽에서 예약 신청을 해보세요.</p>
                </div>
              ) : (
                latest3.map((r) => (
                  <div key={r.id} className="rounded-2xl border border-gray-100 bg-white p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-extrabold text-gray-900">{r.space}</p>
                        <p className="mt-1 text-sm text-gray-700">
                          {r.date} {r.time} · {r.people}
                        </p>
                        <p className="mt-1 text-sm text-gray-600">{r.purpose}</p>
                      </div>
                      <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-bold text-yellow-800 ring-1 ring-yellow-100">
                        {r.status}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">신청자: {r.name}</p>
                    {r.note ? <p className="mt-2 text-xs text-gray-500">요청: {r.note}</p> : null}
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 rounded-2xl bg-sky-50 p-4 ring-1 ring-sky-100">
              <p className="text-sm font-bold text-sky-800">팁</p>
              <p className="mt-1 text-sm text-sky-700">
                다음 단계로는 ‘마이페이지(호스트)’에서 신청자 관리 화면에 이 예약 리스트를 연결할 수 있어요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
