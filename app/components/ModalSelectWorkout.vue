<script setup lang="ts">
import type { Training } from "~/data/courses";

const props = defineProps<{ trainings: Training[] }>();
const emit = defineEmits<{
  close: [];
  start: [trainingId: string];
}>();

const selectedId = ref<string | null>(null);

function pick(id: string) {
  selectedId.value = id;
}

function onStart() {
  if (selectedId.value !== null) {
    emit("start", selectedId.value);
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    emit("close");
  }
}

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown);
});
</script>

<template>
  <div class="modal-overlay" @click.self="emit('close')">
    <div class="select-workout">
      <h2 class="select-workout__title">Выберите тренировку</h2>

      <ul class="select-workout__list">
        <li
          v-for="training in props.trainings"
          :key="training.id"
          class="select-workout__item"
        >
          <button
            class="select-workout__row"
            type="button"
            @click="pick(training.id)"
          >
            <span
              class="select-workout__mark"
              :class="{
                'select-workout__mark--done': training.done,
                'select-workout__mark--selected': selectedId === training.id,
              }"
            >
              <!-- галочка для пройденных -->
              <svg v-if="training.done" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM9.91339 14.1459L15.4134 7.64594L13.8866 6.35406L9.1373 11.9669L6.40258 8.8415L4.89742 10.1585L8.39742 14.1585C8.58922 14.3777 8.86704 14.5024 9.15829 14.5C9.44953 14.4976 9.72525 14.3683 9.91339 14.1459Z" fill-rule="evenodd" clip-rule="evenodd" fill="#BCEC30"/>
              </svg>

              <!-- пустой кружок для непройденных -->
              <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9.5" stroke="black"/>
              </svg>

            </span>
            <span class="select-workout__text">
              <span class="select-workout__name">{{ training.title }}</span>
              <span class="select-workout__subtitle">{{ training.subtitle }}</span>
            </span>
          </button>
        </li>
      </ul>

      <button
        class="select-workout__start"
        type="button"
        :disabled="selectedId === null"
        @click="onStart"
      >
        Начать
      </button>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0; /* top/right/bottom/left: 0 — на весь экран */
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
}

.select-workout {
  display: flex;
  flex-direction: column;
  width: 460px;
  max-height: 50vh;
  padding: 40px;
  border-radius: 30px;
  background: #fff;
}

.select-workout__title {
  padding-bottom: 38px;
  font-size: 32px;
  font-weight: 400;
  line-height: 1.1;
  text-align: center;
  color: var(--color-text);
}

.select-workout__list {
  list-style: none;
  overflow-y: auto;
}

.select-workout__row {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 0;
  border: none;
  border-bottom: 1px solid #C4C4C4;
  background: transparent;
  text-align: left;
  cursor: pointer;
}

.select-workout__text {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.select-workout__name {
  font-size: 24px;
  font-weight: 400;
  line-height: 1.1;
  color: var(--color-text);
  font-family: 'Roboto';
}

.select-workout__subtitle {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.1;
  color: var(--color-text);
  font-family: 'Roboto';
}

.select-workout__start {
  margin-top: 34px;
  padding: 16px;
  border: none;
  border-radius: 46px;
  background: var(--color-accent);
  font-size: 18px;
  line-height: 1.1;
  color: var(--color-text);
  cursor: pointer;
}

.select-workout__start:disabled {
  opacity: 0.5;
  cursor: default;
}

.select-workout__list::-webkit-scrollbar {
  width: 6px;
}

.select-workout__list::-webkit-scrollbar-track {
  background: #F7F7F7;
}

.select-workout__list::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #000000;
}

.select-workout__list::-webkit-scrollbar-button {
  display: none;
}

@supports not selector(::-webkit-scrollbar) {
  .select-workout__list {
    scrollbar-width: thin;
  }
}
.select-workout__mark {
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
}

.select-workout__mark--selected::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-text);
  transform: translate(-50%, -50%);
}

</style>
