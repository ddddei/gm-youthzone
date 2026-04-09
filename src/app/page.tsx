"use client";

import { useEffect, useMemo, useState } from "react";

type BookStatus = "available" | "borrowed" | "overdue";

type Book = {
  id: number;
  title: string;
  author: string;
  borrower: string;
  borrowedAt: string;
  dueDate: string;
};

function Badge({
  children,
  tone = "emerald",
}: {
  children: React.ReactNode;
  tone?: "emerald" | "gray" | "rose" | "sky" | "amber";
}) {
  const styles = {
    emerald: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
    gray: "bg-gray-100 text-gray-700 ring-1 ring-gray-200",
    rose: "bg-rose-50 text-rose-700 ring-1 ring-rose-100",
    sky: "bg-sky-50 text-sky-700 ring-1 ring-sky-100",
    amber: "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles[tone]}`}
    >
      {children}
    </span>
  );
}

function StatCard({
  label,
  value,
  help,
}: {
  label: string;
  value: string | number;
  help: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-gray-500">{label}</p>
      <p className="mt-2 text-2xl font-extrabold text-gray-900">{value}</p>
      <p className="mt-2 text-sm text-gray-600">{help}</p>
    </div>
  );
}

function SectionTitle({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      <p className="mt-1 text-sm text-gray-600">{desc}</p>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  min,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  min?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </span>
      <input
        type={type}
        min={min}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
      />
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function formatDate(value: string) {
  if (!value) return "-";
  return value;
}

function getTodayString() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60 * 1000);
  return local.toISOString().split("T")[0];
}

function getBookStatus(book: Book): BookStatus {
  if (!book.borrower || !book.dueDate) return "available";

  const today = getTodayString();
  if (book.dueDate < today) return "overdue";

  return "borrowed";
}

function getStatusLabel(status: BookStatus) {
  switch (status) {
    case "available":
      return "대여 가능";
    case "borrowed":
      return "대여 중";
    case "overdue":
      return "연체";
    default:
      return "-";
  }
}

function getStatusTone(status: BookStatus): "emerald" | "sky" | "rose" {
  switch (status) {
    case "available":
      return "emerald";
    case "borrowed":
      return "sky";
    case "overdue":
      return "rose";
    default:
      return "emerald";
  }
}

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | BookStatus>("all");

  const [selectedBookId, setSelectedBookId] = useState("");
  const [borrower, setBorrower] = useState("");
  const [borrowedAt, setBorrowedAt] = useState(getTodayString());
  const [dueDate, setDueDate] = useState("");

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function fetchBooks() {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await fetch("/api/books", {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "도서 목록을 불러오지 못했습니다.");
      }

      setBooks(data.books ?? []);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "도서 목록을 불러오지 못했습니다."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  const enrichedBooks = useMemo(() => {
    return books.map((book) => ({
      ...book,
      status: getBookStatus(book),
    }));
  }, [books]);

  const filteredBooks = useMemo(() => {
    return enrichedBooks.filter((book) => {
      const lowerQuery = query.toLowerCase();

      const matchesQuery =
        book.title.toLowerCase().includes(lowerQuery) ||
        book.author.toLowerCase().includes(lowerQuery) ||
        book.borrower.toLowerCase().includes(lowerQuery);

      const matchesFilter =
        filter === "all" ? true : book.status === filter;

      return matchesQuery && matchesFilter;
    });
  }, [enrichedBooks, query, filter]);

  const stats = useMemo(() => {
    const total = enrichedBooks.length;
    const available = enrichedBooks.filter(
      (book) => book.status === "available"
    ).length;
    const borrowed = enrichedBooks.filter(
      (book) => book.status === "borrowed"
    ).length;
    const overdue = enrichedBooks.filter(
      (book) => book.status === "overdue"
    ).length;
    const dueToday = enrichedBooks.filter(
      (book) =>
        (book.status === "borrowed" || book.status === "overdue") &&
        book.dueDate === getTodayString()
    ).length;

    return { total, available, borrowed, overdue, dueToday };
  }, [enrichedBooks]);

  const availableBooks = enrichedBooks.filter(
    (book) => book.status === "available"
  );

  function resetBorrowForm() {
    setSelectedBookId("");
    setBorrower("");
    setBorrowedAt(getTodayString());
    setDueDate("");
  }

  async function handleBorrowSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setErrorMessage("");

    if (!selectedBookId) {
      setErrorMessage("대여할 도서를 선택해주세요.");
      return;
    }

    if (!borrower.trim()) {
      setErrorMessage("대여자 이름을 입력해주세요.");
      return;
    }

    if (!borrowedAt) {
      setErrorMessage("대여일을 입력해주세요.");
      return;
    }

    if (!dueDate) {
      setErrorMessage("반납예정일을 입력해주세요.");
      return;
    }

    if (dueDate < borrowedAt) {
      setErrorMessage("반납예정일은 대여일보다 빠를 수 없습니다.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: Number(selectedBookId),
          borrower: borrower.trim(),
          borrowedAt,
          dueDate,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "대여 등록에 실패했습니다.");
      }

      await fetchBooks();
      resetBorrowForm();
      setMessage("대여 등록이 완료되었습니다.");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "대여 등록에 실패했습니다."
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleReturn(bookId: number) {
    try {
      setSubmitting(true);
      setMessage("");
      setErrorMessage("");

      const response = await fetch("/api/books", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: bookId,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "반납 처리에 실패했습니다.");
      }

      await fetchBooks();
      setMessage("반납 처리가 완료되었습니다.");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "반납 처리에 실패했습니다."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-sky-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-gray-100 bg-white/90 p-6 shadow-sm backdrop-blur sm:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap gap-2">
                <Badge>도서 대여 관리</Badge>
                <Badge tone="sky">구글 시트 연동</Badge>
                <Badge tone="amber">실시간 현황 확인</Badge>
              </div>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                도서 대여를 한 화면에서
                <span className="block bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent">
                  등록하고, 조회하고, 반납 처리하세요
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
                이제 더미 데이터가 아니라 구글 시트와 연결된 도서 대여 관리 화면입니다.
                대여 등록과 반납 처리를 하면 시트 데이터도 함께 갱신됩니다.
              </p>
            </div>

            <div className="w-full max-w-md rounded-3xl bg-gradient-to-br from-emerald-500 to-sky-500 p-1 shadow-sm">
              <div className="rounded-[22px] bg-white p-5">
                <p className="text-sm font-bold text-gray-900">운영 상태</p>
                <div className="mt-4 space-y-3 text-sm text-gray-700">
                  <div className="rounded-2xl border border-gray-100 p-4">
                    <p className="font-semibold text-gray-900">현재 연결 방식</p>
                    <p className="mt-2">
                      Next.js API → Apps Script 웹앱 → Google Sheets
                    </p>
                  </div>
                  <div className="rounded-2xl border border-gray-100 p-4">
                    <p className="font-semibold text-gray-900">다음 단계</p>
                    <p className="mt-2">
                      관리자 인증, 알림 기능, 배포까지 이어서 확장할 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <StatCard label="전체 도서" value={stats.total} help="등록된 전체 도서 수" />
          <StatCard label="대여 가능" value={stats.available} help="즉시 대여 가능한 도서" />
          <StatCard label="대여 중" value={stats.borrowed} help="현재 이용 중인 도서" />
          <StatCard label="연체" value={stats.overdue} help="반납 예정일이 지난 도서" />
          <StatCard label="오늘 반납 예정" value={stats.dueToday} help="오늘 반납 예정 도서" />
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[380px_minmax(0,1fr)]">
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <SectionTitle
              title="대여 등록"
              desc="대여 가능한 도서를 선택하고 대여 정보를 입력하세요."
            />

            <form className="mt-6 space-y-4" onSubmit={handleBorrowSubmit}>
              <Select
                label="도서 선택"
                value={selectedBookId}
                onChange={setSelectedBookId}
                options={[
                  { label: "대여할 도서를 선택하세요", value: "" },
                  ...availableBooks.map((book) => ({
                    label: `${book.title} · ${book.author}`,
                    value: String(book.id),
                  })),
                ]}
              />

              <Input
                label="대여자 이름"
                value={borrower}
                onChange={setBorrower}
                placeholder="이름을 입력하세요"
              />

              <Input
                label="대여일"
                type="date"
                value={borrowedAt}
                onChange={setBorrowedAt}
              />

              <Input
                label="반납예정일"
                type="date"
                value={dueDate}
                onChange={setDueDate}
                min={borrowedAt || undefined}
              />

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex flex-1 items-center justify-center rounded-2xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "처리 중..." : "대여 등록"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    resetBorrowForm();
                    setMessage("입력값을 초기화했습니다.");
                    setErrorMessage("");
                  }}
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-200 transition hover:bg-gray-50"
                >
                  초기화
                </button>
              </div>
            </form>

            <div className="mt-4 min-h-12">
              {message ? (
                <p className="text-sm font-medium text-emerald-700">{message}</p>
              ) : null}
              {errorMessage ? (
                <p className="mt-2 text-sm font-medium text-rose-700">
                  {errorMessage}
                </p>
              ) : null}
            </div>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <SectionTitle
                title="도서 목록"
                desc="검색과 필터를 이용해 현재 대여 현황을 빠르게 확인하세요."
              />

              <div className="grid gap-3 sm:grid-cols-2 lg:w-[440px]">
                <Input
                  label="검색"
                  value={query}
                  onChange={setQuery}
                  placeholder="도서명, 저자, 대여자 검색"
                />
                <Select
                  label="상태 필터"
                  value={filter}
                  onChange={(value) => setFilter(value as "all" | BookStatus)}
                  options={[
                    { label: "전체", value: "all" },
                    { label: "대여 가능", value: "available" },
                    { label: "대여 중", value: "borrowed" },
                    { label: "연체", value: "overdue" },
                  ]}
                />
              </div>
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={fetchBooks}
                className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-200 transition hover:bg-gray-50"
              >
                새로고침
              </button>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-gray-100">
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                        도서명
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                        저자
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                        상태
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                        대여자
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                        대여일
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                        반납예정일
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                        처리
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {loading ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-4 py-10 text-center text-sm text-gray-500"
                        >
                          데이터를 불러오는 중입니다...
                        </td>
                      </tr>
                    ) : filteredBooks.length === 0 ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-4 py-10 text-center text-sm text-gray-500"
                        >
                          조건에 맞는 도서가 없습니다.
                        </td>
                      </tr>
                    ) : (
                      filteredBooks.map((book) => (
                        <tr
                          key={book.id}
                          className="border-t border-gray-100 align-top"
                        >
                          <td className="px-4 py-4">
                            <p className="font-semibold text-gray-900">
                              {book.title}
                            </p>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-700">
                            {book.author}
                          </td>
                          <td className="px-4 py-4">
                            <Badge tone={getStatusTone(book.status)}>
                              {getStatusLabel(book.status)}
                            </Badge>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-700">
                            {book.borrower || "-"}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-700">
                            {formatDate(book.borrowedAt)}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-700">
                            {formatDate(book.dueDate)}
                          </td>
                          <td className="px-4 py-4">
                            {book.status === "available" ? (
                              <span className="text-sm text-gray-400">
                                대여 가능
                              </span>
                            ) : (
                              <button
                                type="button"
                                disabled={submitting}
                                onClick={() => handleReturn(book.id)}
                                className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-200 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                              >
                                반납 처리
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge tone="gray">검색 가능</Badge>
              <Badge tone="emerald">대여 가능 도서 확인</Badge>
              <Badge tone="sky">대여 중 목록 확인</Badge>
              <Badge tone="rose">연체 도서 즉시 확인</Badge>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}