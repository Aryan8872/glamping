import { RESOLVED_API_BASE_URL } from "../config";

export type HttpError = {
  status: number;
  message: string;
  body?: unknown;
};

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function httpGet(path: string, opts?: { headers?: Record<string, string>; timeoutMs?: number; retries?: number; cache?: RequestCache; next?: { revalidate?: number; tags?: string[] } }) {
  const url = path.startsWith("http") ? path : `${RESOLVED_API_BASE_URL}${path}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), opts?.timeoutMs ?? 10000);
  const maxRetries = Math.min(opts?.retries ?? 1, 3);
  let attempt = 0;
  let lastErr: any;
  while (attempt <= maxRetries) {
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: { Accept: "application/json", ...(opts?.headers || {}) },
        cache: opts?.cache,
        next: opts?.next,
        signal: controller.signal,
      });
      clearTimeout(timeout);
      const isJson = res.headers.get("content-type")?.includes("application/json");
      const data = isJson ? await res.json() : await res.text();
      if (!res.ok) {
        const err: HttpError = { status: res.status, message: (data as any)?.message || res.statusText || "Request failed", body: data };
        throw err;
      }
      return data;
    } catch (e) {
      lastErr = e;
      attempt += 1;
      if (attempt > maxRetries) break;
      await delay(200 * attempt);
    }
  }   
  if (lastErr && typeof lastErr === "object" && "status" in lastErr) throw lastErr as HttpError;
  throw { status: 0, message: lastErr?.message || "Network error" } satisfies HttpError;
}
