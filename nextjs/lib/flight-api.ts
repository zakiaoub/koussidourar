import { cookies } from "next/headers";

const FLIGHT_SESSION_COOKIE = "flight_session_token";
const SESSION_TTL_SECONDS = 20 * 60;
const DEFAULT_API_URL = "https://api.b2c.groupidh.com/api/v1";

export async function resolveFlightHeaders(
  requestHeaders: Headers,
  override?: {
    lang?: string;
    currencyPaid?: string;
    bearer?: string;
    sessionToken?: string;
  },
) {
  const cookieStore = await cookies();
  const current = cookieStore.get(FLIGHT_SESSION_COOKIE)?.value;
  const sessionToken =
    override?.sessionToken || current || crypto.randomUUID();

  cookieStore.set(FLIGHT_SESSION_COOKIE, sessionToken, {
    maxAge: SESSION_TTL_SECONDS,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  const bearerFromHeader = requestHeaders
    .get("authorization")
    ?.replace(/^Bearer\s+/i, "")
    .trim();

  const bearer =
    override?.bearer || requestHeaders.get("x-bearer-token") || bearerFromHeader;
  const lang =
    override?.lang || requestHeaders.get("x-lang") || process.env.FLIGHT_API_LANG || "en";
  const currencyPaid =
    override?.currencyPaid ||
    requestHeaders.get("x-currency-paid") ||
    process.env.FLIGHT_API_CURRENCY ||
    "USD";

  return {
    sessionToken,
    lang,
    currencyPaid,
    bearer,
  };
}

export function getFlightApiBaseUrl() {
  return process.env.FLIGHT_API_URL || DEFAULT_API_URL;
}

export async function proxyFlightRequest(input: {
  requestHeaders: Headers;
  endpoint: string;
  method?: "GET" | "POST";
  body?: unknown;
  override?: {
    lang?: string;
    currencyPaid?: string;
    bearer?: string;
    sessionToken?: string;
  };
}) {
  const method = input.method || "GET";
  const baseUrl = getFlightApiBaseUrl();
  const headersConfig = await resolveFlightHeaders(
    input.requestHeaders,
    input.override,
  );

  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
    sessionToken: headersConfig.sessionToken,
    lang: headersConfig.lang,
    currencyPaid: headersConfig.currencyPaid,
  };

  if (headersConfig.bearer) {
    headers.Authorization = `Bearer ${headersConfig.bearer}`;
  }

  const response = await fetch(`${baseUrl}/${input.endpoint}`, {
    method,
    headers,
    body: method === "POST" ? JSON.stringify(input.body || {}) : undefined,
    cache: "no-store",
  });

  const data = await response.json().catch(() => ({}));
  return { status: response.status, ok: response.ok, data };
}
