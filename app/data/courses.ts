export interface Course {
  id: string;
  name: string;
  image: string;
  bg: string; // цвет фона блока
  duration: string; // '25 дней'
  perDay: string; // '20-50 мин/день'
  complexity: number; // 1-5, для отрисовки шкалы сложности
  trainings: Training[];
}

export interface Training {
  id: string;
  title: string;
  subtitle: string;
  done: boolean;
  video?: string;
  exercises?: string[];
}

export const courses: Course[] = [
  {
    id: "yoga",
    name: "Йога",
    image: "/img/yoga.png",
    bg: "#FFC700",
    duration: "25 дней",
    perDay: "20-50 мин/день",
    complexity: 2,
    trainings: [
      {
        id: "1",
        title: "Утренняя практика",
        subtitle: "Йога на каждый день / 1 день",
        done: true,
      },
      {
        id: "2",
        title: "Красота и здоровье",
        subtitle: "Йога на каждый день / 2 день",
        done: true,
      },
      {
        id: "3",
        title: "Асаны стоя",
        subtitle: "Йога на каждый день / 3 день",
        done: false,
      },
      {
        id: "4",
        title: "Растягиваем мышцы бедра",
        subtitle: "Йога на каждый день / 4 день",
        done: false,
      },
      {
        id: "5",
        title: "Гибкость спины",
        subtitle: "Йога на каждый день / 5 день",
        done: false,
      },
    ],
  },

  {
    id: "stretch",
    name: "Стретчинг",
    image: "/img/stretch.png",
    bg: "#2491D2",
    duration: "25 дней",
    perDay: "20-50 мин/день",
    complexity: 2,
    trainings: [],
  },
  {
    id: "fitness",
    name: "Фитнес",
    image: "/img/fitness.png",
    bg: "#F7A012",
    duration: "25 дней",
    perDay: "20-50 мин/день",
    complexity: 3,
    trainings: [],
  },
  {
    id: "step",
    name: "Степ-аэробика",
    image: "/img/step.png",
    bg: "#FF7E65",
    duration: "25 дней",
    perDay: "20-50 мин/день",
    complexity: 3,
    trainings: [],
  },
  {
    id: "bodyflex",
    name: "Бодифлекс",
    image: "/img/bodyflex.png",
    bg: "#7D458C",
    duration: "25 дней",
    perDay: "20-50 мин/день",
    complexity: 2,
    trainings: [],
  },
];

export function getCurrentTrainingId(course: Course): string | undefined {
  return course.trainings.find((t) => !t.done)?.id;
}
