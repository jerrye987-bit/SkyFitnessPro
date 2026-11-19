import type {
  CourseShort,
  CourseFull,
  WorkoutShort,
  WorkoutFull,
  CourseProgress,
} from "~/types/course";

export function useCourses() {
  async function fetchCourses(): Promise<CourseShort[]> {
    return request("/courses");
  }

  async function fetchCourse(courseId: string): Promise<CourseFull> {
    return request(`/courses/${courseId}`);
  }

  async function addCourse(courseId: string) {
    return request("/users/me/courses", {
      method: "POST",
      body: { courseId },
    });
  }

  async function removeCourse(courseId: string) {
    return request(`/users/me/courses/${courseId}`, { method: "DELETE" });
  }

  async function fetchCourseWorkouts(courseId: string): Promise<WorkoutShort[]> {
    return request(`/courses/${courseId}/workouts`);
  }

  async function fetchWorkout(workoutId: string): Promise<WorkoutFull> {
    return request(`/workouts/${workoutId}`);
  }

  async function fetchProgress(courseId: string): Promise<CourseProgress>;
  async function fetchProgress(courseId: string, workoutId: string): Promise<WorkoutProgress>;
  async function fetchProgress(courseId: string, workoutId?: string) {
    const query = workoutId
      ? `?courseId=${courseId}&workoutId=${workoutId}`
      : `?courseId=${courseId}`;
    return request(`/users/me/progress${query}`);
  }

  async function saveProgress(courseId: string, workoutId: string, progressData: number[]) {
    return request(`/courses/${courseId}/workouts/${workoutId}`, {
      method: "PATCH",
      body: { progressData },
    });
  }

  async function resetWorkoutProgress(courseId: string, workoutId: string) {
  return request(`/courses/${courseId}/workouts/${workoutId}/reset`, {
    method: "PATCH",
  });
}


  return {
    fetchCourses,
    fetchCourse,
    addCourse,
    removeCourse,
    fetchCourseWorkouts,
    fetchWorkout,
    fetchProgress,
    saveProgress,
    resetWorkoutProgress,
  };
}
