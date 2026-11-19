export interface CourseShort {
  _id: string;
  nameRU: string;
  nameEN: string;
  description: string;
  directions: string[];
  fitting: string[];
  workouts: string[];
}

export interface CourseFull extends CourseShort {
  difficulty: string;
  durationInDays: number;
  dailyDurationInMinutes: {
    from: number;
    to: number;
  };
}

export interface CourseUser {
  email: string;
  selectedCourses: string[];
}

export interface CourseCardView extends CourseShort {
  id: string;
  image: string;
  bg: string;
  duration: string;
  perDay: string;
  complexity: number;
}

export type WorkoutShort = { _id: string; name: string; video?: string };

export type WorkoutFull = {
  _id: string;
  name: string;
  video: string;
  exercises: { _id: string; name: string; quantity: number }[];
};

export type CourseProgress = {
  courseId: string;
  courseCompleted: boolean;
  workoutsProgress: {
    workoutId: string;
    workoutCompleted: boolean;
    progressData: number[];
  }[];
};

export type WorkoutProgress = {
  workoutId: string;
  workoutCompleted: boolean;
  progressData: number[];
};