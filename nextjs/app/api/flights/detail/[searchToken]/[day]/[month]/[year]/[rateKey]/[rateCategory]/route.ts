import { NextRequest, NextResponse } from "next/server";
import { proxyFlightRequest } from "@/lib/flight-api";

type Params = {
  searchToken: string;
  day: string;
  month: string;
  year: string;
  rateKey: string;
  rateCategory: string;
};

export async function GET(
  request: NextRequest,
  context: { params: Promise<Params> },
) {
  try {
    const { searchToken, day, month, year, rateKey, rateCategory } =
      await context.params;

    const result = await proxyFlightRequest({
      requestHeaders: request.headers,
      endpoint: [
        "flight",
        "detail",
        searchToken,
        day,
        month,
        year,
        rateKey,
        rateCategory,
      ].join("/"),
      method: "GET",
      override: {
        bearer: request.nextUrl.searchParams.get("bearer") || undefined,
        lang: request.nextUrl.searchParams.get("lang") || undefined,
        currencyPaid:
          request.nextUrl.searchParams.get("currencyPaid") || undefined,
        sessionToken:
          request.nextUrl.searchParams.get("sessionToken") || undefined,
      },
    });

    return NextResponse.json(result.data, { status: result.status });
  } catch {
    return NextResponse.json(
      { status: false, message: "flight detail request failed" },
      { status: 500 },
    );
  }
}
