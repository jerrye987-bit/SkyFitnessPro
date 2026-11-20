type Me = {
    email: string;
    selectedCourses: string[];
  };

export function useAuth() {
  const user = useState<Me | null>("authUser", () => null);
  const authToken = useState<string | null>("authToken", () => null);
  const isLoggedIn = computed(() => !!user.value);

  const saveToken = (value: string) => {
    authToken.value = value;
    const token = useCookie<string | null>("fitnessToken", {
      maxAge: 60 * 60 * 24 * 7,
    });
    token.value = value;
  };

  const logout = () => {
    authToken.value = null;
    user.value = null;
    const token = useCookie<string | null>("fitnessToken");
    token.value = null;

    if (import.meta.client) {
      document.cookie = "fitnessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    }
  };

  async function register(email: string, password: string) {
    await request("/auth/register", { method: "POST", body: { email, password } });
  }

  async function login(email: string, password: string) {
    const data = await request("/auth/login", {
      method: "POST",
      body: { email, password },
    });
    const t = data?.token ?? data?.user?.token;
    if (t) saveToken(t);
    await fetchMe();
    return data;
  }

  async function fetchMe(): Promise<Me | undefined> {
    const authToken = useState<string | null>("authToken");
    const cookieToken = useCookie<string | null>("fitnessToken");

    if (!authToken.value && !cookieToken.value) return undefined; // гость — без запроса

    const data = await request("/users/me");
    const me = (data?.user ?? data) as Me;
    user.value = me;
    return me;
  }

  return { register, login, fetchMe, logout, saveToken, user, isLoggedIn };
}