import { getAuthToken } from "~/utils/api.ts"; 

type Me = {
    email: string;
    selectedCourses: string[];
  };

const COOKIE_NAME = "fitnessToken";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

function setTokenCookie(value: string) {
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(value)}; max-age=${COOKIE_MAX_AGE}; path=/`;
}

function clearTokenCookie() {
  document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

export function useAuth() {
  const user = useState<Me | null>("authUser", () => null);
  const isLoggedIn = computed(() => !!user.value);

  const saveToken = (value: string) => {
    if (import.meta.client) {
      setTokenCookie(value);
    }
  };

  const logout = () => {
    user.value = null;
    if (import.meta.client) {
      clearTokenCookie();
      navigateTo("/");
    }
  };

  async function register(email: string, password: string) {
    await request("/auth/register", {
      method: "POST",
      body: { email, password },
    });
  }

  async function login(email: string, password: string) {
    const data = await request<{ token: string }>("/auth/login", {
      method: "POST",
      body: { email, password },
    });
    if (data?.token) saveToken(data.token);
    await fetchMe();
    return data;
  }

  async function fetchMe(): Promise<Me | undefined> {
    if (!getAuthToken()) return undefined;

    const data = await request<{ user: Me }>("/users/me");
    user.value = data.user;
    return data.user;
  }

  return { register, login, fetchMe, logout, saveToken, user, isLoggedIn };
}
