import { nextTick } from "vue";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { flushPromises } from "@vue/test-utils";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import WorkoutsCard from "../app/components/WorkoutsCard.vue";
import type { CourseCardView } from "../app/types/course";

const { addCourseMock } = vi.hoisted(() => ({ addCourseMock: vi.fn() }));

const { userRef } = await vi.hoisted(async () => {
  const { ref } = await import("vue");
  return {
    userRef: ref<{ email: string; selectedCourses: string[] } | null>(null),
  };
});

vi.mock("~/composables/useCourses", () => ({
  useCourses: () => ({ addCourse: addCourseMock }),
}));
vi.mock("~/composables/useAuth", () => ({
  useAuth: () => ({ user: userRef }),
}));

const course: CourseCardView = {
  _id: "1",
  id: "1",
  nameRU: "Йога",
  nameEN: "Yoga",
  description: "Курс классической йоги для начинающих",
  directions: ["йога"],
  fitting: ["коврик"],
  workouts: ["w1", "w2"],
  image: "/img/yoga.png",
  bg: "#FFC700",
  duration: "25 дней",
  perDay: "20-50 мин/день",
  complexity: 2,
};

beforeEach(() => {
  addCourseMock.mockReset();
  userRef.value = null;
});

describe("WorkoutsCard", () => {
  it("показывает название и три тега курса", async () => {
    const wrapper = await mountSuspended(WorkoutsCard, { props: { course } });

    expect(wrapper.find(".card__title").text()).toBe("Йога");
    const tags = wrapper.findAll(".card__tag");
    expect(tags).toHaveLength(3);
    expect(tags[0]?.text()).toContain("25 дней");
  });

  it("гость кликает плюс — родитель получает needAuth, сеть не трогается", async () => {
    const wrapper = await mountSuspended(WorkoutsCard, { props: { course } });

    await wrapper.find(".card__plus").trigger("click");
    await flushPromises();

    expect(wrapper.emitted("needAuth")).toEqual([[course.id]]);
    expect(addCourseMock).not.toHaveBeenCalled();
  });

  it("залогиненный пользователь добавляет курс — кнопка превращается в галочку", async () => {
    userRef.value = { email: "a@b.c", selectedCourses: [] };
    // имитируем поведение настоящего addCourse: сервер вернул обновлённый список
    addCourseMock.mockImplementation(async () => {
      userRef.value = { email: "a@b.c", selectedCourses: ["1"] };
      return { selectedCourses: ["1"] };
    });

    const wrapper = await mountSuspended(WorkoutsCard, { props: { course } });
    const button = wrapper.find(".card__plus");

    await button.trigger("click");
    await flushPromises();
    await nextTick();

    expect(addCourseMock).toHaveBeenCalledWith(course.id);
    expect(button.attributes("disabled")).toBeDefined();
  });

  it("повторный клик по добавленному курсу не дёргает сеть", async () => {
    userRef.value = { email: "a@b.c", selectedCourses: ["1"] };

    const wrapper = await mountSuspended(WorkoutsCard, { props: { course } });

    await wrapper.find(".card__plus").trigger("click");
    await flushPromises();

    expect(addCourseMock).not.toHaveBeenCalled();
  });
});
