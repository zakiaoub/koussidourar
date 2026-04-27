import { NextRequest, NextResponse } from "next/server";
import { proxyFlightRequest } from "@/lib/flight-api";

export async function GET(request: NextRequest) {
  try {
    const q = request.nextUrl.searchParams.get("q") || "";
    const result = await proxyFlightRequest({
      requestHeaders: request.headers,
      endpoint: `autocomplete/airports?q=${encodeURIComponent(q)}`,
      method: "GET",
      override: {
        lang: request.nextUrl.searchParams.get("lang") || undefined,
        sessionToken: request.nextUrl.searchParams.get("sessionToken") || undefined,
      },
    });

    return NextResponse.json(result.data, { status: result.status });
  } catch {
    return NextResponse.json(
      { status: false, message: "autocomplete request failed" },
      { status: 500 },
    );
  }
}
