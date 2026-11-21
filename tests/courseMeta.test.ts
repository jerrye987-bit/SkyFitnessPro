import { describe, it, expect } from "vitest";
import { getCourseMeta, sortCoursesByMock, courseMeta, COURSE_ORDER } from "~/data/courseMeta";

describe("getCourseMeta", () => {
  it("возвращает мету известного курса", () => {
    expect(getCourseMeta("yoga")).toMatchObject({
      bg: "#FFC700",
      complexity: 2,
      duration: "25 дней",
    });
  });

  it.each([
    ["Yoga", "yoga"],
    ["  yoga  ", "yoga"],
    ["STRETCHING", "stretching"],
    ["Step Airobic", "stepairobic"],
    ["step-airobic", "stepairobic"],
  ])("нормализует %s так же, как ключ %s", (input, key) => {
    expect(getCourseMeta(input)).toEqual(getCourseMeta(key));
  });

  it("неизвестному курсу отдаёт пустую мету — вызывающий код уходит на defaultMeta", () => {
    expect(getCourseMeta("совершенно новый курс")).toEqual({});
  });
});

describe("sortCoursesByMock", () => {
  it("сортирует курсы в порядке макета", () => {
    const shuffled = [...COURSE_ORDER].reverse().map((nameEN) => ({ nameEN }));
    expect(sortCoursesByMock(shuffled).map((c) => c.nameEN)).toEqual(COURSE_ORDER);
  });

  it("не мутирует исходный массив", () => {
    const original = [{ nameEN: "BodyFlex" }, { nameEN: "Yoga" }];
    const snapshot = original.map((c) => c.nameEN);

    sortCoursesByMock(original);

    expect(original.map((c) => c.nameEN)).toEqual(snapshot);
  });

  it("курс вне COURSE_ORDER уходит в конец и не роняет сортировку", () => {
    const input = [{ nameEN: "Бонус" }, { nameEN: "Yoga" }];
    const result = sortCoursesByMock(input);
    expect(result.map((c) => c.nameEN)).toEqual(["Yoga", "Бонус"]);
  });

  it("COURSE_ORDER покрывает все известные курсы из courseMeta", () => {
    const covered = Object.keys(courseMeta).every((key) =>
      COURSE_ORDER.some((name) => name.toLowerCase() === key),
    );
    expect(covered).toBe(true);
  });
});
