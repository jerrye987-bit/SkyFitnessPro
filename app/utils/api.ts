const BASE_URL = "https://wedev-api.sky.pro/api/fitness";

interface RequestOptions {
  method?: "GET" | "POST" | "DELETE" | "PATCH";
  body?: unknown;
}

export function getAuthToken(): string | null {
  if (import.meta.client) {
    const match = document.cookie.match(/(?:^|;\s*)fitnessToken=([^;]*)/);
    const value = match?.[1];
    return value ? decodeURIComponent(value) : null;
  }
  return useCookie<string | null>("fitnessToken").value ?? null;
}

export async function request<T = unknown>(path: string, options: RequestOptions = {}): Promise<T> {
  const stored = useState<string | null>("authToken", () => null).value;
  const token = stored ?? getAuthToken();

  const res = await fetch(`${BASE_URL}${path}`, {
    method: options.method ?? "GET",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(
      data?.message ?? data?.error ?? "Что-то пошло не так, попробуйте ещё раз",
    );
  }
  return data;
}

