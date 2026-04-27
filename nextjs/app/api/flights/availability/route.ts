import { NextRequest, NextResponse } from "next/server";
import { proxyFlightRequest } from "@/lib/flight-api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await proxyFlightRequest({
      requestHeaders: request.headers,
      endpoint: "flight/availability",
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
      { status: false, message: "flight availability request failed" },
      { status: 500 },
    );
  }
}
