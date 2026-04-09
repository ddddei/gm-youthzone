import { NextRequest, NextResponse } from "next/server";

const APPS_SCRIPT_WEB_APP_URL = process.env.APPS_SCRIPT_WEB_APP_URL;

type AppsScriptResponse<T = unknown> = {
  ok: boolean;
  error?: string;
  books?: T;
  book?: T;
};

async function callAppsScript<T>(
  method: "GET" | "POST",
  payload?: Record<string, unknown>
): Promise<AppsScriptResponse<T>> {
  if (!APPS_SCRIPT_WEB_APP_URL) {
    throw new Error("APPS_SCRIPT_WEB_APP_URL 환경변수가 설정되지 않았습니다.");
  }

  let response: Response;

  if (method === "GET") {
    const url = new URL(APPS_SCRIPT_WEB_APP_URL);
    url.searchParams.set("action", "list");

    response = await fetch(url.toString(), {
      method: "GET",
      cache: "no-store",
      redirect: "follow",
    });
  } else {
    response = await fetch(APPS_SCRIPT_WEB_APP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload ?? {}),
      cache: "no-store",
      redirect: "follow",
    });
  }

  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Apps Script 호출 실패: ${response.status} / ${text}`);
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error(
      `Apps Script가 JSON이 아닌 응답을 반환했습니다: ${text.slice(0, 300)}`
    );
  }
}

export async function GET() {
  try {
    const data = await callAppsScript("GET");
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "도서 목록을 불러오지 못했습니다.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const data = await callAppsScript("POST", {
      action: "borrow",
      id: body.id,
      borrower: body.borrower,
      borrowedAt: body.borrowedAt,
      dueDate: body.dueDate,
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error ? error.message : "대여 등록에 실패했습니다.",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();

    const data = await callAppsScript("POST", {
      action: "return",
      id: body.id,
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error ? error.message : "반납 처리에 실패했습니다.",
      },
      { status: 500 }
    );
  }
}