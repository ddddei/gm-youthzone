import Link from "next/link";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
      {children}
    </span>
  );
}

function ProblemCard({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-rose-100 bg-rose-50/80 p-5">
      <p className="text-sm font-bold text-rose-700">{title}</p>
      <p className="mt-2 text-sm leading-6 text-rose-900/90">{desc}</p>
    </div>
  );
}

function BenefitCard({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <p className="text-base font-bold text-gray-900">{title}</p>
      <p className="mt-2 text-sm leading-6 text-gray-600">{desc}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-sky-50">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-gray-100 bg-white/90 p-6 shadow-sm backdrop-blur sm:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge>도서 대여 관리</Badge>
                <Badge>스프레드시트 자동화</Badge>
                <Badge>청년동/작은도서관 운영</Badge>
              </div>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                번거로운 구글 시트 정리 대신,
                <span className="block bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent">
                  도서 대여를 한 화면에서 관리하세요
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
                대여/반납 등록, 연체 확인, 회원별 이력 조회를 빠르게 처리하는
                전용 랜딩 페이지를 먼저 만들고, 이후 실제 관리 기능까지 단계적으로
                확장할 수 있도록 설계했어요.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="https://docs.google.com/spreadsheets/d/1YN3dqZ0H3wVHVHj4iV19pTtqEQ0nC3Z4HXWiLkoLatw/edit?gid=322047821#gid=322047821"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
                >
                  현재 스프레드시트 보기
                </Link>
                <Link
                  href="/programs"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-100 hover:bg-gray-50"
                >
                  샘플 화면 둘러보기
                </Link>
              </div>
            </div>

            <div className="w-full max-w-md rounded-3xl bg-gradient-to-br from-emerald-500 to-sky-500 p-1 shadow-sm">
              <div className="rounded-[22px] bg-white p-5">
                <p className="text-sm font-bold text-gray-900">예상 관리 대시보드</p>
                <div className="mt-4 space-y-3">
                  <div className="rounded-2xl border border-gray-100 p-4">
                    <p className="text-xs font-semibold text-gray-500">오늘의 현황</p>
                    <p className="mt-2 text-sm font-semibold text-gray-900">
                      대여중 31권 · 연체 4건 · 오늘 반납 예정 7건
                    </p>
                  </div>
                  <div className="rounded-2xl border border-gray-100 p-4">
                    <p className="text-xs font-semibold text-gray-500">빠른 작업</p>
                    <p className="mt-2 text-sm font-semibold text-gray-900">
                      + 대여 등록 / + 반납 처리 / 연체 알림 발송
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          <ProblemCard
            title="문제 1 · 수기 입력 반복"
            desc="도서 상태를 바꿀 때마다 여러 칸을 직접 수정해야 해서 처리 시간이 길어집니다."
          />
          <ProblemCard
            title="문제 2 · 연체 관리 누락"
            desc="대여일/반납예정일 비교가 수동이라 연체 건이 늦게 발견될 수 있어요."
          />
          <ProblemCard
            title="문제 3 · 조회 불편"
            desc="회원 이력/도서 이력을 찾으려면 시트를 넘나들어야 해 즉시 응대가 어렵습니다."
          />
        </section>

        <section className="mt-8 rounded-3xl border border-gray-100 bg-white/90 p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-extrabold text-gray-900">랜딩 페이지 구성안</h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            먼저 소개/가치 전달 중심의 랜딩을 만들고, 이후 실제 기능 화면을 연결해
            운영 도구로 확장하는 흐름을 제안합니다.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <BenefitCard
              title="대여·반납 간편 등록"
              desc="버튼 1~2회로 처리하고, 시트는 백그라운드에서 자동 업데이트합니다."
            />
            <BenefitCard
              title="연체 자동 탐지"
              desc="오늘 기준 연체 리스트를 상단에 자동 노출해 놓치지 않게 합니다."
            />
            <BenefitCard
              title="회원/도서 통합 조회"
              desc="검색창 하나로 회원별 대여 이력과 도서 상태를 바로 확인합니다."
            />
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-emerald-100 bg-emerald-50/70 p-6">
          <h3 className="text-base font-extrabold text-emerald-900">다음 단계 제안</h3>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-6 text-emerald-900/90">
            <li>현재 스프레드시트 컬럼 구조(도서, 회원, 대여이력) 확정</li>
            <li>랜딩 페이지 확정 후 입력 폼/조회 화면 와이어프레임 제작</li>
            <li>Google Sheets API 또는 Apps Script 연동으로 자동화 구현</li>
          </ol>
        </section>
      </div>
    </main>
  );
}
