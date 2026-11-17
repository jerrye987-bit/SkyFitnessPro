<script setup lang="ts">
import { courses } from "~/data/courses";
import type { Exercise } from "~/data/courses";

const route = useRoute();

const courseId = route.params.id as string;
const trainingId = route.params.trainingId as string;

const courseRaw = courses.find((c) => c.id === courseId);
const trainingRaw = courseRaw?.trainings.find((t) => t.id === trainingId);

if (!courseRaw || !trainingRaw) {
  throw createError({ statusCode: 404, statusMessage: "Тренировка не найдена", fatal: true });
}

const course = reactive(courseRaw);
const training = reactive(trainingRaw);

const isProgressOpen = ref(false);

const hasProgress = computed(() =>
  (training.exercises ?? []).some((e) => (e.reps ?? 0) > 0)
);

const isSuccessOpen = ref(false);

function saveProgress(updated: Exercise[]) {
  training.exercises = updated;
  if (updated.every((e) => e.progress === 100)) {
    training.done = true;
  }
  isProgressOpen.value = false;
  isSuccessOpen.value = true;

  window.setTimeout(() => {
    isSuccessOpen.value = false;
  }, 2000);
}

</script>

<template>
    <div>
        <TheHeader />

        <main class="workout">
            <h1 class="workout__title">{{ course.name }}</h1>

            <div class="workout__video">
            <iframe
                v-if="training.video"
                :src="training.video"
                title="Видео тренировки"
                allow="clipboard-write; autoplay"
                allowfullscreen
            />
            </div>

            <section class="workout__exercises-card">
            <h2 class="workout__exercises-title">Упражнения тренировки {{ trainingId }}</h2>

            <div v-if="training.exercises?.length" class="workout__exercises">
                <div v-for="ex in training.exercises" :key="ex.name" class="exercise">
                <p class="exercise__name">{{ ex.name }} {{ ex.progress }}%</p>
                <div class="exercise__bar">
                    <div
                    class="exercise__fill"
                    :style="{ width: ex.progress + '%' }"
                    />
                </div>
                </div>
            </div>

            <p v-else>Для этой тренировки пока нет упражнений</p>

            <button 
                class="workout__submit" 
                type="button"
                @click="isProgressOpen = true"
            >
                {{ hasProgress ? "Обновить свой прогресс" : "Заполнить свой прогресс" }}
            </button>
            </section>

            <ProgressModal
            v-if="isProgressOpen"
            :exercises="training.exercises ?? []"
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
    </div>
</template>

<style scoped>
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