<script setup lang="ts">
import type { WorkoutFull } from "~/types/course";
import { useCourses } from "~/composables/useCourses";

const route = useRoute();
const courseId = route.params.id as string;
const workoutId = route.params.trainingId as string;

const { fetchWorkout, fetchProgress, saveProgress: saveProgressApi, resetWorkoutProgress } = useCourses();

const workout = ref<WorkoutFull | null>(null);
const progressData = ref<number[]>([]);
const isLoading = ref(true);

const loadError = ref("");

onMounted(async () => {
  try {
    workout.value = await fetchWorkout(workoutId);
    const progress = await fetchProgress(courseId, workoutId).catch(() => null);
    progressData.value = progress?.progressData ?? [];
  } catch {
    loadError.value = "Тренировка не найдена";
  } finally {
    isLoading.value = false;
  }
});


const isProgressOpen = ref(false);
const isSuccessOpen = ref(false);

const hasProgress = computed(() => progressData.value.some((v) => v > 0));

// Процент упражнения = сделанные повторения / плановые
function exerciseProgress(index: number, quantity: number) {
  const value = progressData.value[index] ?? 0;
  return Math.min(100, Math.round((value / (quantity || 1)) * 100));
}

const modalItems = computed(() =>
  (workout.value?.exercises ?? []).map((ex, i) => ({
    name: ex.name,
    quantity: ex.quantity,
    current: progressData.value[i] ?? 0,
  })),
);


const workoutCompleted = computed(() =>
  progressData.value.length > 0 &&
  progressData.value.every((v, i) => (workout.value?.exercises[i]?.quantity ?? 1) === v),
);

const isResetting = ref(false);

async function handleProgressButton() {
  if (workoutCompleted.value && !isResetting.value) {
    isResetting.value = true;
    try {
      await resetWorkoutProgress(courseId, workoutId);
      progressData.value = progressData.value.map(() => 0);
    } catch (e) {
      console.error(e instanceof Error ? e.message : "Не удалось сбросить прогресс");
    } finally {
      isResetting.value = false;
    }
    return;
  }
  isProgressOpen.value = true;
}


async function saveProgress(updated: { name: string; progress: number }[]) {
  if (!workout.value) return;

  const merged = workout.value.exercises.map((ex, i) => {
    const existing = progressData.value[i] ?? 0;
    const incoming = Math.round(((updated[i]?.progress ?? 0) / 100) * (ex.quantity || 1));
    return Math.max(existing, incoming);
  });

  try {
    await saveProgressApi(courseId, workoutId, merged);
    progressData.value = merged;
    isProgressOpen.value = false;
    isSuccessOpen.value = true;
    window.setTimeout(() => (isSuccessOpen.value = false), 2000);
  } catch (e) {
    console.error(e instanceof Error ? e.message : "Не удалось сохранить прогресс");
  }
}
</script>


<template>
    <div>
        <TheHeader />

        <p v-if="loadError" class="workout__error">{{ loadError }}</p>

        <main v-else-if="workout" class="workout">
            <h1 class="workout__title">{{ workout.name }}</h1>

            <div class="workout__video">
            <iframe
              v-if="workout.video"
              :src="workout.video"
              title="Видео тренировки"
              allow="clipboard-write; autoplay"
              allowfullscreen
            />
            </div>

            <section v-if="workout.exercises?.length" class="workout__exercises-card">
            <h2 class="workout__exercises-title">Упражнения тренировки {{ workout.name }}</h2>

            <div class="workout__exercises">
              <div
                v-for="(ex, i) in workout.exercises"
                :key="ex._id"
                class="exercise"
              >
                <p class="exercise__name">{{ ex.name }} {{ exerciseProgress(i, ex.quantity) }}%</p>
                <div class="exercise__bar">
                  <div class="exercise__fill" :style="{ width: exerciseProgress(i, ex.quantity) + '%' }"/>
                </div>
              </div>
            </div>

            <button 
                class="workout__submit" 
                type="button"
                :disabled="isResetting"
                @click="handleProgressButton"
            >
                {{ workoutCompleted ? "Начать заново" : hasProgress ? "Обновить свой прогресс" : "Заполнить свой прогресс" }}
            </button>
            </section>

            <ProgressModal
              v-if="isProgressOpen"
              :exercises="modalItems"
              @close="isProgressOpen = false"
              @save="saveProgress"
            />

            <Transition name="fade">
              <div v-if="isSuccessOpen" class="success" @click="isSuccessOpen = false">
                <div class="success__card" role="status">
                  <p class="success__title">Ваш прогресс<br>засчитан!</p>
                  <div class="success__icon">
                    <svg width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M28.3333 56.6667C43.9814 56.6667 56.6667 43.9814 56.6667 28.3333C56.6667 12.6853 43.9814 0 28.3333 0C12.6853 0 0 12.6853 0 28.3333C0 43.9814 12.6853 56.6667 28.3333 56.6667ZM28.0879 40.0802L43.6713 21.6635L39.3454 18.0032L25.889 33.9062L18.1406 25.0509L13.876 28.7824L23.7927 40.1158C24.3361 40.7368 25.1233 41.0901 25.9485 41.0832C26.7737 41.0764 27.5549 40.7101 28.0879 40.0802Z" fill-rule="evenodd" clip-rule="evenodd" fill="#BCEC30"/>
                    </svg>
                  </div>
                </div>
              </div>
            </Transition>
        </main>

        <p v-else-if="isLoading">Загрузка…</p>
    </div>
</template>

<style scoped>
.workout__error {
  padding: 60px 0;
  font-size: 24px;
  color: var(--color-text);
}

.workout__title {
    font-size: 60px;
    font-weight: 500;
    line-height: 1;
    color: var(--color-text);
}

.workout__video {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 30px;
  overflow: hidden;
  margin: 40px 0;
}

.workout__video iframe {
  width: 100%;
  height: 100%;
  border: 0;
}

.workout__exercises-card {
    padding: 40px;
    background-color: #fff;
    border-radius: 30px;
    box-shadow: 0px 4px 67px -12px #00000021;
    margin-bottom: 260px;
}

.workout__exercises-title {
    padding-bottom: 20px;
    font-size: 32px;
    font-weight: 400;
    line-height: 1.1;
    color: var(--color-text);
}

.workout__exercises {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, auto);
  grid-auto-flow: column;
  gap: 20px 60px;
}

.exercise__name {
    padding-bottom: 10px;
    font-size: 18px;
    font-weight: 400;
    line-height: 1.1;
    color: var(--color-text);
}

.exercise__bar {
  height: 6px;
  border-radius: 50px;
  background: #f7f7f7;
}

.exercise__fill {
  height: 100%;
  border-radius: 50px;
  background: #00C1FF;
}

.workout__submit {
    padding: 16px 26px;
    border-radius: 46px;
    background-color: var(--color-accent);
    border: 1px solid var(--color-accent);
    margin-top: 40px;
    font-size: 18px;
    font-weight: 400;
    line-height: 1.1;
}

.success {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.success__card {
  display: grid;
  justify-items: center;
  gap: 34px;
  padding: 40px;
  border-radius: 30px;
  background: #fff;
  box-shadow: 0px 4px 67px -12px #00000021;
}

.success__title {
  font-size: 40px;
  font-weight: 600;
  line-height: 1.1;
  text-align: center;
  color: var(--color-text);
}

.success__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


@media (max-width: 767px) {
  .workout__title {
    font-size: 24px;
  }

  .workout__video {
    border-radius: 9px;
    margin: 24px 0;
  }

  .workout__exercises-card {
    padding: 30px;
    margin-bottom: 40px;
}

  .workout__exercises {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-auto-flow: row;
    gap: 24px;
  }

  .workout__submit {
    width: 100%;
  }
}
</style>