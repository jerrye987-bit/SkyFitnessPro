const BASE_URL = "https://wedev-api.sky.pro/api/fitness";

export function useAuth() {
  const saveToken = (value: string) => {
    const token = useCookie<string | null>("fitnessToken", { maxAge: 60 * 60 * 24 * 7 });
    token.value = value;
  };

  const logout = () => {
    const token = useCookie<string | null>("fitnessToken");
    token.value = null;

    if (import.meta.client) {
        document.cookie = "fitnessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    }
  };

  async function request(path: string, body?: string) {
    const token = useCookie<string | null>("fitnessToken").value;

    const res = await fetch(`${BASE_URL}${path}`, {
      method: body ? "POST" : "GET",
      body,
      headers: token
        ? { Authorization: `Bearer ${token}` }
        : undefined,
    });
    const data = await res.json().catch(() => null);

    if (!res.ok) {
      throw new Error(
        data?.message ?? data?.error ?? "Что-то пошло не так, попробуйте ещё раз"
      );
    }
    return data;
  }

  async function register(email: string, password: string) {
    const data = await request("/auth/register", JSON.stringify({ email, password }));
    return data?.user ?? data;
  }

  async function login(email: string, password: string) {
    const res = await request("/auth/login", JSON.stringify({ email, password }));
    const t = res?.token ?? res?.user?.token;
    if (t) saveToken(t);
    return res;
  }

  async function fetchMe() {
    const data = await request("/users/me");
    return data?.user ?? data;
  }

  return { register, login, fetchMe, logout, saveToken };

}
