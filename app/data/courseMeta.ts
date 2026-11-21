export const courseImages: Record<string, string> = {
  Yoga: "/img/yoga.png",
  Stretching: "/img/stretch.png",
  Fitness: "/img/fitness.png",
  Step: "/img/step.png",
  Bodyflex: "/img/bodyflex.png",
};

interface CourseMeta {
  image?: string;
  banner?: string;
  bannerMobile?: string;
  bg?: string;
  duration?: string;
  perDay?: string;
  complexity?: number;
}

export const courseMeta: Record<string, CourseMeta> = {
  yoga: {
    image: courseImages.Yoga,
    banner: "/img/skillYoga.png",
    bannerMobile: "/img/yoga.png",
    bg: "#FFC700",
    duration: "25 дней",
    perDay: "20-50 мин/день",
    complexity: 2,
  },
  stretching: {
    image: courseImages.Stretching,
    banner: "/img/skillStretch.png",
    bannerMobile: "/img/stretch.png",
    bg: "#2491D2",
    duration: "25 дней",
    perDay: "20-50 мин/день",
    complexity: 2,
  },
  fitness: {
    image: courseImages.Fitness,
    banner: "/img/skillFitness.png",
    bannerMobile: "/img/fitness.png",
    bg: "#F7A012",
    duration: "25 дней",
    perDay: "20-50 мин/день",
    complexity: 3,
  },
  stepairobic: {
    image: courseImages.Step,
    banner: "/img/skillStep.png",
    bannerMobile: "/img/step.png",
    bg: "#FF7E65",
    duration: "25 дней",
    perDay: "20-50 мин/день",
    complexity: 3,
  },
  bodyflex: {
    image: courseImages.Bodyflex,
    banner: "/img/skillBody.png",
    bannerMobile: "/img/bodyflex.png",
    bg: "#7D458C",
    duration: "25 дней",
    perDay: "20-50 мин/день",
    complexity: 2,
  },
};

export const defaultMeta: Required<CourseMeta> = {
  image: "/img/default.png",
  banner: "",
  bannerMobile: "",
  bg: "#F7F7F7",
  duration: "",
  perDay: "",
  complexity: 0,
};

// data/courseMeta.ts или рядом
export const COURSE_ORDER = [
  "Yoga",
  "Stretching",
  "Fitness",
  "StepAirobic",
  "BodyFlex",
];

export function sortCoursesByMock<T extends { nameEN: string }>(courses: T[]): T[] {
  const positions = new Map(
    COURSE_ORDER.map((name, i) => [normalizeKey(name), i] as const),
  );
  return [...courses].sort(
    (a, b) =>
      (positions.get(normalizeKey(a.nameEN)) ?? COURSE_ORDER.length) -
      (positions.get(normalizeKey(b.nameEN)) ?? COURSE_ORDER.length),
  );
}



function normalizeKey(key: string): string {
  return key.trim().toLowerCase().replace(/[\s-]/g, "");
}


export function getCourseMeta(nameEN: string): CourseMeta {
  return courseMeta[normalizeKey(nameEN)] ?? {};
}