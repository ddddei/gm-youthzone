import Link from "next/link";

type Space = {
  id: string;
  name: string;
  capacity: string;
  features: string[];
  recommend: string;
  note: string;
};

const spaces: Space[] = [
  {
    id: "smallhall",
    name: "소강당",
    capacity: "약 20~30명",
    features: ["빔프로젝터(예정)", "마이크(예정)", "의자/테이블 배치 가능", "강의/토크 적합"],
    recommend: "강연, 커리어 특강, 소규모 발표",
    note: "대관 가능 여부는 일정에 따라 달라질 수 있어요.",
  },
  {
    id: "seminar",
    name: "세미나실",
    capacity: "약 8~12명",
    features: ["화이트보드", "회의 테이블", "집중 작업 적합"],
    recommend: "스터디, 회의, 소규모 워크숍",
    note: "정숙한 이용을 부탁드려요.",
  },
  {
    id: "multi1",
    name: "다목적실 1",
    capacity: "약 10~15명",
    features: ["가변형 공간", "가벼운 활동 가능", "모임/동아리 적합"],
    recommend: "동아리 모임, 취미 활동, 네트워킹",
    note: "소음이 큰 활동은 제한될 수 있어요.",
  },
];

function Chip({ text }: { text: string }) {
  return (
    <span className="rounded-full bg-gray-50 px-3 py-1 text-xs font-bold text-gray-700 ring-1 ring-gray-100">
      {text}
    </span>
  );
}

export default function SpacesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-sky-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-3xl border border-gray-100 bg-white/80 p-8 shadow-sm backdrop-blur">
          <p className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700 ring-1 ring-orange-100">
            공간 소개
          </p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900">
            청년동 공간을 소개해요
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
            청년을 위한 모임·스터디·프로그램 운영에 활용할 수 있는 공간을 안내합니다.
            아래에서 공간 특징을 확인하고, 원하면 바로 대관 예약을 진행할 수 있어요.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href="/rental"
              className="rounded-2xl bg-gradient-to-r from-pink-500 to-orange-400 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-95"
            >
              공간 예약하기 →
            </Link>
            <Link
              href="/mypage?role=participant"
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-gray-800 shadow-sm ring-1 ring-gray-100 hover:bg-gray-50"
            >
              마이페이지
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {spaces.map((s) => (
            <div key={s.id} className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-gray-500">SPACE</p>
                  <h2 className="mt-1 text-lg font-extrabold text-gray-900">{s.name}</h2>
                  <p className="mt-1 text-sm font-semibold text-gray-700">{s.capacity}</p>
                </div>
                <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-sky-500 to-emerald-400" />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {s.features.slice(0, 4).map((f) => (
                  <Chip key={f} text={f} />
                ))}
              </div>

              <div className="mt-4 rounded-2xl bg-gray-50 p-4 ring-1 ring-gray-100">
                <p className="text-sm font-bold text-gray-900">추천 사용</p>
                <p className="mt-1 text-sm text-gray-700">{s.recommend}</p>
              </div>

              <p className="mt-4 text-xs text-gray-500">{s.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-extrabold text-gray-900">이용 안내</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700">
            <li>대관은 예약 신청 후 운영진 확인을 거쳐 확정됩니다. (데모)</li>
            <li>청년 대상 활동/모임을 우선으로 운영됩니다.</li>
            <li>공간 이용 후 정리정돈 및 원상복구를 부탁드려요.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
