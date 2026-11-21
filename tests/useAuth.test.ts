import { describe, it, expect, vi, beforeEach } from "vitest";
import { request, getAuthToken } from "~/utils/api";
import { useAuth } from "~/composables/useAuth";

vi.mock("~/utils/api", async (importOriginal) => {
  const actual = await importOriginal<typeof import("~/utils/api")>();
  return { ...actual, request: vi.fn() };
});

let stateMock: Record<string, { value: unknown }> = {};
vi.stubGlobal("useState", (key: string, init: () => unknown) => {
  stateMock[key] ??= { value: init() };
  return stateMock[key];
});

vi.stubGlobal("computed", (fn: () => unknown) => ({
  get value() {
    return fn();
  },
}));

const navigateToMock = vi.fn();
vi.stubGlobal("navigateTo", navigateToMock);


beforeEach(() => {
  vi.mocked(request).mockReset();
  navigateToMock.mockReset();
  stateMock = {};
  document.cookie = "fitnessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
});


describe("useAuth", () => {
  it("fetchMe не ходит в сеть без токена и возвращает undefined", async () => {
    const { fetchMe } = useAuth();

    await expect(fetchMe()).resolves.toBeUndefined();
    expect(request).not.toHaveBeenCalled();
  });

  it("fetchMe загружает пользователя и кладёт в стор", async () => {
    document.cookie = "fitnessToken=abc123; path=/";
    vi.mocked(request).mockResolvedValue({
      user: { email: "a@b.c", selectedCourses: ["1"] },
    });

    const { fetchMe, user } = useAuth();
    const me = await fetchMe();

    expect(me).toEqual({ email: "a@b.c", selectedCourses: ["1"] });
    expect(user.value).toEqual({ email: "a@b.c", selectedCourses: ["1"] });
  });

  it("fetchMe не глотает ошибку сервера", async () => {
    document.cookie = "fitnessToken=abc123; path=/";
    vi.mocked(request).mockRejectedValue(new Error("Невалидный токен"));

    const { fetchMe } = useAuth();
    await expect(fetchMe()).rejects.toThrow("Невалидный токен");
  });

  it("login сохраняет токен в куку и подгружает профиль", async () => {
    vi.mocked(request)
      .mockResolvedValueOnce({ token: "tok123" })
      .mockResolvedValueOnce({ user: { email: "a@b.c", selectedCourses: [] } });

    const { login, user } = useAuth();
    await login("a@b.c", "123");

    expect(request).toHaveBeenNthCalledWith(1, "/auth/login", {
      method: "POST",
      body: { email: "a@b.c", password: "123" },
    });
    expect(document.cookie).toContain("fitnessToken=tok123");
    expect(user.value).toEqual({ email: "a@b.c", selectedCourses: [] });
  });

  it("logout сбрасывает пользователя, куку и ведёт на главную", () => {
    document.cookie = "fitnessToken=abc123; path=/";
    stateMock["authUser"] = { value: { email: "a@b.c", selectedCourses: [] } };

    const { logout, user, isLoggedIn } = useAuth();
    logout();

    expect(user.value).toBeNull();
    expect(isLoggedIn.value).toBe(false);
    expect(getAuthToken()).toBeNull();
    expect(navigateToMock).toHaveBeenCalledWith("/");
  });

  it("register отправляет POST на /auth/register", async () => {
    vi.mocked(request).mockResolvedValue({});

    const { register } = useAuth();
    await register("a@b.c", "123");

    expect(request).toHaveBeenCalledWith("/auth/register", {
      method: "POST",
      body: { email: "a@b.c", password: "123" },
    });
  });

  it("isLoggedIn отражает наличие пользователя", () => {
    const { isLoggedIn, user } = useAuth();

    expect(isLoggedIn.value).toBe(false);
    user.value = { email: "a@b.c", selectedCourses: [] };
    expect(isLoggedIn.value).toBe(true);
  });
});
