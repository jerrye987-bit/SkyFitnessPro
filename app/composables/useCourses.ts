import { request } from "~/utils/api";
import { useAuth } from "~/composables/useAuth";

import type {
  CourseShort,
  CourseFull,
  WorkoutShort,
  WorkoutFull,
  CourseProgress,
  WorkoutProgress,
} from "~/types/course";

export function useCourses() {
  const { user } = useAuth();

  async function fetchCourses(): Promise<CourseShort[]> {
    return request<CourseShort[]>("/courses");
  }

  async function fetchCourse(courseId: string): Promise<CourseFull> {
    return request<CourseFull>(`/courses/${courseId}`);
  }

  async function addCourse(courseId: string) {
    const updated = await request<{ selectedCourses?: string[] }>(
      "/users/me/courses",
      { method: "POST", body: { courseId } },
    );

    if (user.value) {
      const next =
        Array.isArray(updated?.selectedCourses) && updated.selectedCourses.length
          ? updated.selectedCourses
          : [...(user.value.selectedCourses ?? []), courseId];
      user.value.selectedCourses = next;
    }
  }

  async function removeCourse(courseId: string): Promise<void> {
    await request<unknown>(`/users/me/courses/${courseId}`, {
      method: "DELETE",
    });
  }

  async function fetchCourseWorkouts(courseId: string): Promise<WorkoutShort[]> {
    return request<WorkoutShort[]>(`/courses/${courseId}/workouts`);
  }

  async function fetchWorkout(workoutId: string): Promise<WorkoutFull> {
    return request<WorkoutFull>(`/workouts/${workoutId}`);
  }

  async function fetchProgress(courseId: string): Promise<CourseProgress>;
  async function fetchProgress(courseId: string, workoutId: string): Promise<WorkoutProgress>;
  async function fetchProgress(courseId: string, workoutId?: string) {
    const query = workoutId
      ? `?courseId=${courseId}&workoutId=${workoutId}`
      : `?courseId=${courseId}`;
    return request<CourseProgress | WorkoutProgress>(`/users/me/progress${query}`);
  }

  async function saveProgress(courseId: string, workoutId: string, progressData: number[]) {
    return request<unknown>(`/courses/${courseId}/workouts/${workoutId}`, {
      method: "PATCH",
      body: { progressData },
    });
  }

  async function resetWorkoutProgress(courseId: string, workoutId: string) {
    return request<unknown>(`/courses/${courseId}/workouts/${workoutId}/reset`, {
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
