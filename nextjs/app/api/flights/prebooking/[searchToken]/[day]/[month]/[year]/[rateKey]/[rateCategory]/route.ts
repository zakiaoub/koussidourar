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

export async function POST(
  request: NextRequest,
  context: { params: Promise<Params> },
) {
  try {
    const body = await request.json();
    const { searchToken, day, month, year, rateKey, rateCategory } =
      await context.params;

    const result = await proxyFlightRequest({
      requestHeaders: request.headers,
      endpoint: [
        "flight",
        "prebooking",
        searchToken,
        day,
        month,
        year,
        rateKey,
        rateCategory,
      ].join("/"),
      method: "POST",
      body: body?.payload || body,
      override: {
        bearer: body?.bearer,
        lang: body?.lang,
        currencyPaid: body?.currencyPaid,
        sessionToken: body?.sessionToken,
      },
    });

    return NextResponse.json(result.data, { status: result.status });
  } catch {
    return NextResponse.json(
      { status: false, message: "flight prebooking request failed" },
      { status: 500 },
    );
  }
}
