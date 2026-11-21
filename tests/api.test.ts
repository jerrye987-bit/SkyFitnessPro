import { describe, it, expect, vi, beforeEach } from "vitest";
import { request, getAuthToken } from "~/utils/api";

const fetchMock = vi.fn();
vi.stubGlobal("fetch", fetchMock);

// Мок useState: ведёт себя как нукстовский стор
const stateMock = { value: null as string | null };
vi.stubGlobal("useState", (_key: string, init: () => string | null) => {
  if (stateMock.value === null) stateMock.value = init();
  return stateMock;
});

beforeEach(() => {
  fetchMock.mockReset();
  // чистим куку, чтобы тесты не влияли друг на друга
  document.cookie = "fitnessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  stateMock.value = null;
});

describe("request", () => {
  it("возвращает распарсенные данные при успешном ответе", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([{ _id: "1", name: "Йога" }]),
    });

    await expect(request("/courses")).resolves.toEqual([{ _id: "1", name: "Йога" }]);
  });

  it("бросает ошибку с message от сервера", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ message: "Невалидный токен" }),
    });

    await expect(request("/users/me")).rejects.toThrow("Невалидный токен");
  });

  it("бросает дефолтное сообщение, если тело не JSON", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      json: () => Promise.reject(new Error("not json")),
    });

    await expect(request("/users/me")).rejects.toThrow(
      "Что-то пошло не так, попробуйте ещё раз",
    );
  });

  it("отправляет Authorization с токеном из куки", async () => {
    document.cookie = "fitnessToken=abc123; path=/";
    fetchMock.mockResolvedValue({ ok: true, json: () => Promise.resolve({}) });

    await request("/users/me");

    const [, options] = fetchMock.mock.calls[0] ?? [];
    expect(options).toMatchObject({
      method: "GET",
      headers: { Authorization: "Bearer abc123" },
    });
  });


  it("предпочитает токен из стора куки", async () => {
    document.cookie = "fitnessToken=cookieToken; path=/";
    stateMock.value = "storeToken";
    fetchMock.mockResolvedValue({ ok: true, json: () => Promise.resolve({}) });

    await request("/users/me");

    expect(fetchMock.mock.calls[0]![1].headers!.Authorization).toBe(
      "Bearer storeToken",
    );
  });

  it("упаковывает body в JSON и умеет POST", async () => {
    fetchMock.mockResolvedValue({ ok: true, json: () => Promise.resolve({ ok: true }) });

    await request("/auth/login", {
      method: "POST",
      body: { email: "a@b.c", password: "123" },
    });

    const [path, options] = fetchMock.mock.calls[0] ?? [];
    expect(path).toContain("/auth/login");
    expect(options).toMatchObject({
      method: "POST",
      body: JSON.stringify({ email: "a@b.c", password: "123" }),
    });
  });
});

describe("getAuthToken", () => {
  it("читает токен из куки", () => {
    document.cookie = "fitnessToken=abc123; path=/";
    expect(getAuthToken()).toBe("abc123");
  });

  it("декодирует значение куки", () => {
    document.cookie = `fitnessToken=${encodeURIComponent("токен с пробелом")}; path=/`;
    expect(getAuthToken()).toBe("токен с пробелом");
  });

  it("возвращает null без куки", () => {
    expect(getAuthToken()).toBeNull();
  });
});
