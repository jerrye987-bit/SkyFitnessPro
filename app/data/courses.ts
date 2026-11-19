export interface Course {
  id: string;
  trainings: Training[];
}

export interface Exercise {
  name: string;
  progress: number; // %, считается из reps/target
  reps: number;     // сколько раз сделал пользователь
  target: number;   // сколько раз нужно сделать
}

export interface Training {
  id: string;
  title: string;
  subtitle: string;
  done: boolean;
  video?: string;
  exercises?: Exercise[];
}

export const courses: Course[] = [
  {
    id: "yoga",
    trainings: [
      {
        id: "1",
        title: "Утренняя практика",
        subtitle: "Йога на каждый день / 1 день",
        done: true,
        video: "https://rutube.ru/play/embed/22cc459d330c0e8c12f81db539e22e1e",
        exercises: [
          { name: "Наклоны вперед", progress: 0, reps: 0, target: 20 },
          { name: "Наклоны назад", progress: 0, reps: 0, target: 20 },
          { name: "Поднятие ног, согнутых в коленях", progress: 0, reps: 0, target: 20 },
          { name: "Наклоны вперед", progress: 0, reps: 0, target: 20 },
          { name: "Наклоны назад", progress: 0, reps: 0, target: 20 },
          { name: "Поднятие ног, согнутых в коленях", progress: 0, reps: 0, target: 20 },
          { name: "Наклоны вперед", progress: 0, reps: 0, target: 20 },
          { name: "Наклоны назад", progress: 0, reps: 0, target: 20 },
          { name: "Поднятие ног, согнутых в коленях", progress: 0, reps: 0, target: 20 },
        ],
      },
      {
        id: "2",
        title: "Красота и здоровье",
        subtitle: "Йога на каждый день / 2 день",
        done: true,
        video: "https://rutube.ru/play/embed/22cc459d330c0e8c12f81db539e22e1e",
        exercises: [
          { name: "Наклоны вперед", progress: 0, reps: 0, target: 20 },
          { name: "Наклоны назад", progress: 0, reps: 0, target: 20 },
          { name: "Поднятие ног, согнутых в коленях", progress: 0, reps: 0, target: 20 },
          { name: "Наклоны вперед", progress: 0, reps: 0, target: 20 },
          { name: "Наклоны назад", progress: 0, reps: 0, target: 20 },
          { name: "Поднятие ног, согнутых в коленях", progress: 0, reps: 0, target: 20 },
          { name: "Наклоны вперед", progress: 0, reps: 0, target: 20 },
          { name: "Наклоны назад", progress: 0, reps: 0, target: 20 },
          { name: "Поднятие ног, согнутых в коленях", progress: 0, reps: 0, target: 20 },
        ],
      },
      {
        id: "3",
        title: "Асаны стоя",
        subtitle: "Йога на каждый день / 3 день",
        done: false,
        video: "https://rutube.ru/play/embed/22cc459d330c0e8c12f81db539e22e1e",
        exercises: [
          { name: "Наклоны вперед", progress: 0, reps: 0, target: 20 },
          { name: "Наклоны назад", progress: 0, reps: 0, target: 20 },
          { name: "Поднятие ног, согнутых в коленях", progress: 0, reps: 0, target: 20 },
          { name: "Наклоны вперед", progress: 0, reps: 0, target: 20 },
          { name: "Наклоны назад", progress: 0, reps: 0, target: 20 },
          { name: "Поднятие ног, согнутых в коленях", progress: 0, reps: 0, target: 20 },
          { name: "Наклоны вперед", progress: 0, reps: 0, target: 20 },
          { name: "Наклоны назад", progress: 0, reps: 0, target: 20 },
          { name: "Поднятие ног, согнутых в коленях", progress: 0, reps: 0, target: 20 },
        ],
      },
      {
        id: "4",
        title: "Растягиваем мышцы бедра",
        subtitle: "Йога на каждый день / 4 день",
        done: false,
        video: "https://rutube.ru/play/embed/22cc459d330c0e8c12f81db539e22e1e",
        exercises: [
          { name: "Наклоны вперед", progress: 0, reps: 0, target: 20 },
          { name: "Наклоны назад", progress: 0, reps: 0, target: 20 },
          { name: "Поднятие ног, согнутых в коленях", progress: 0, reps: 0, target: 20 },
          { name: "Наклоны вперед", progress: 0, reps: 0, target: 20 },
          { name: "Наклоны назад", progress: 0, reps: 0, target: 20 },
          { name: "Поднятие ног, согнутых в коленях", progress: 0, reps: 0, target: 20 },
          { name: "Наклоны вперед", progress: 0, reps: 0, target: 20 },
          { name: "Наклоны назад", progress: 0, reps: 0, target: 20 },
          { name: "Поднятие ног, согнутых в коленях", progress: 0, reps: 0, target: 20 },
        ],
      },
      {
        id: "5",
        title: "Гибкость спины",
        subtitle: "Йога на каждый день / 5 день",
        done: false,
        video: "https://rutube.ru/play/embed/22cc459d330c0e8c12f81db539e22e1e",
        exercises: [
          { name: "Наклоны вперед", progress: 0, reps: 0, target: 20 },
          { name: "Наклоны назад", progress: 0, reps: 0, target: 20 },
          { name: "Поднятие ног, согнутых в коленях", progress: 0, reps: 0, target: 20 },
          { name: "Наклоны вперед", progress: 0, reps: 0, target: 20 },
          { name: "Наклоны назад", progress: 0, reps: 0, target: 20 },
          { name: "Поднятие ног, согнутых в коленях", progress: 0, reps: 0, target: 20 },
          { name: "Наклоны вперед", progress: 0, reps: 0, target: 20 },
          { name: "Наклоны назад", progress: 0, reps: 0, target: 20 },
          { name: "Поднятие ног, согнутых в коленях", progress: 0, reps: 0, target: 20 },
        ],
      },
    ],
  },
]
 
export function getCurrentTrainingId(course: Course): string | undefined {
  return course.trainings.find((t) => !t.done)?.id;
}
