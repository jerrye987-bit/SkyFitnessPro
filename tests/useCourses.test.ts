import { describe, it, expect, vi, beforeEach } from "vitest";
import { request } from "~/utils/api";
import { useCourses } from "~/composables/useCourses";

vi.mock("~/utils/api", () => ({ request: vi.fn() }));
vi.mock("~/composables/useAuth", () => ({
  useAuth: () => ({ user: userRef }),
}));

const userRef = {
  value: null as { email: string; selectedCourses: string[] } | null,
};

beforeEach(() => {
  vi.mocked(request).mockReset();
  userRef.value = { email: "a@b.c", selectedCourses: [] };
});

describe("useCourses", () => {
  it("fetchCourses возвращает каталог", async () => {
    vi.mocked(request).mockResolvedValue([{ _id: "1", nameRU: "Йога" }]);

    const { fetchCourses } = useCourses();
    await expect(fetchCourses()).resolves.toEqual([{ _id: "1", nameRU: "Йога" }]);
  });

  it("addCourse обновляет selectedCourses из ответа сервера", async () => {
    vi.mocked(request).mockResolvedValue({ selectedCourses: ["1", "2"] });

    const { addCourse } = useCourses();
    await addCourse("2");

    expect(userRef.value?.selectedCourses).toEqual(["1", "2"]);
  });

  it("addCourse при ответе без списка добавляет курс локально без дубликатов", async () => {
    userRef.value = { selectedCourses: ["2"] };
    vi.mocked(request).mockResolvedValue({});

    const { addCourse } = useCourses();
    await addCourse("2");

    expect(userRef.value?.selectedCourses).toEqual(["2"]);
  });

  it("addCourse не глотает ошибку сервера", async () => {
    vi.mocked(request).mockRejectedValue(new Error("Невалидный токен"));

    const { addCourse } = useCourses();
    await expect(addCourse("2")).rejects.toThrow("Невалидный токен");
    expect(userRef.value?.selectedCourses).toEqual([]);
  });

  it("removeCourse делает DELETE по нужному пути", async () => {
    vi.mocked(request).mockResolvedValue(undefined);

    const { removeCourse } = useCourses();
    await removeCourse("7");

    expect(request).toHaveBeenCalledWith("/users/me/courses/7", {
      method: "DELETE",
    });
  });

  it("fetchProgress строит query без workoutId", async () => {
    vi.mocked(request).mockResolvedValue({});

    const { fetchProgress } = useCourses();
    await fetchProgress("c1");

    expect(request).toHaveBeenCalledWith("/users/me/progress?courseId=c1");
  });

  it("fetchProgress строит query с workoutId", async () => {
    vi.mocked(request).mockResolvedValue({});

    const { fetchProgress } = useCourses();
    await fetchProgress("c1", "w2");

    expect(request).toHaveBeenCalledWith(
      "/users/me/progress?courseId=c1&workoutId=w2",
    );
  });

  it("saveProgress отправляет PATCH с progressData", async () => {
    vi.mocked(request).mockResolvedValue({});

    const { saveProgress } = useCourses();
    await saveProgress("c1", "w2", [1, 2, 3]);

    expect(request).toHaveBeenCalledWith("/courses/c1/workouts/w2", {
      method: "PATCH",
      body: { progressData: [1, 2, 3] },
    });
  });

  it("resetWorkoutProgress делает PATCH на reset-путь", async () => {
    vi.mocked(request).mockResolvedValue({});

    const { resetWorkoutProgress } = useCourses();
    await resetWorkoutProgress("c1", "w2");

    expect(request).toHaveBeenCalledWith("/courses/c1/workouts/w2/reset", {
      method: "PATCH",
    });
  });
});
