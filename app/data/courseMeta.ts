export const courseImages: Record<string, string> = {
  Yoga: "/img/yoga.png",
  Stretching: "/img/stretch.png",
  Fitness: "/img/fitness.png",
  Step: "/img/step.png",
  Bodyflex: "/img/bodyflex.png",
};

interface CourseMeta {
  image?: string;
  bg?: string;
  duration?: string;
  perDay?: string;
  complexity?: number;
}

export const courseMeta: Record<string, CourseMeta> = {
  yoga: {
    image: courseImages.Yoga,
    bg: "#FFC700",
    duration: "25 дней",
    perDay: "20-50 мин/день",
    complexity: 2,
  },
  stretching: {
    image: courseImages.Stretching,
    bg: "#2491D2",
    duration: "25 дней",
    perDay: "20-50 мин/день",
    complexity: 2,
  },
  fitness: {
    image: courseImages.Fitness,
    bg: "#F7A012",
    duration: "25 дней",
    perDay: "20-50 мин/день",
    complexity: 3,
  },
  stepairobic: {
    image: courseImages.Step,
    bg: "#FF7E65",
    duration: "25 дней",
    perDay: "20-50 мин/день",
    complexity: 3,
  },
  bodyflex: {
    image: courseImages.Bodyflex,
    bg: "#7D458C",
    duration: "25 дней",
    perDay: "20-50 мин/день",
    complexity: 2,
  },
};

export const defaultMeta: Required<CourseMeta> = {
  image: "/img/default.png",
  bg: "#F7F7F7",
  duration: "",
  perDay: "",
  complexity: 0,
};

function normalizeKey(key: string): string {
  return key.trim().toLowerCase().replace(/[\s-]/g, "");
}


export function getCourseMeta(nameEN: string): CourseMeta {
  return courseMeta[normalizeKey(nameEN)] ?? {};
}