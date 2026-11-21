<script setup lang="ts">
type ModalExercise = { name: string; quantity: number; current: number };

const props = defineProps<{ exercises: ModalExercise[] }>();
const emit = defineEmits<{
  close: [];
  save: [{ name: string; progress: number }[]];
}>();

// локальная копия: user вводит сделанные повторения, current — уже сохранённые
const draft = ref(props.exercises.map((e) => ({ ...e, reps: e.current })));

function submit() {
  const updated = props.exercises.map((e, i) => {
    const reps = Math.max(0, draft.value[i]?.reps ?? 0);
    return {
      name: e.name,
      progress: Math.min(100, Math.round((reps / (e.quantity || 1)) * 100)),
    };
  });
  emit("save", updated);
}

useModalEsc(() => emit("close"));
</script>

<template>
  <div class="modal-overlay" @click.self="emit('close')">
    <div class="progress-modal__window" role="dialog" aria-modal="true">
      <h2 class="progress-modal__title">Мой прогресс</h2>

      <form class="progress-modal__form" novalidate @submit.prevent="submit">
        <div class="progress-modal__list">
          <label
            v-for="ex in draft"
            :key="ex.name"
            class="progress-modal__row"
          >
            <span class="progress-modal__name">
              Сколько раз вы сделали {{ ex.name.toLowerCase() }}?
            </span>
            <input
              v-model.number="ex.reps"
              class="progress-modal__input"
              type="number"
              min="0"
            >
          </label>
        </div>

        <button class="progress-modal__save" type="submit">Сохранить</button>
      </form>

    </div>
  </div>
</template>


<style scoped>
.progress-modal__window {
  width: 100%;
  max-width: 426px;
  max-height: calc(53vh - 40px);
  display: flex;
  flex-direction: column;
  padding: 40px;
  border-radius: 30px;
  background: #fff;
  box-shadow: 0px 4px 67px -12px #00000021;
}

.progress-modal__title {
  font-size: 32px;
  font-weight: 400;
  line-height: 1.1;
  padding-bottom: 48px;
}

.progress-modal__form {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.progress-modal__list {
  max-height: 347px;
  overflow-y: auto;
  padding-right: 20px;
  display: grid;
  gap: 20px;

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #000000;
    border-radius: 10px;
  }
}

.progress-modal__list::-webkit-scrollbar {
  width: 6px;
}

.progress-modal__input::-webkit-outer-spin-button,
.progress-modal__input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.progress-modal__row {
  display: grid;
  gap: 10px;
}

.progress-modal__name {
  font-size: 18px;
  line-height: 1.1;
  font-weight: 400;
  color: var(--color-text);
}

.progress-modal__input {
  width: 100%;
  padding: 16px 18px;
  border: 1px solid #D0CECE;
  border-radius: 8px;
  font: inherit;
  -moz-appearance: textfield;
  appearance: textfield;
}

.progress-modal__input::placeholder {
  color: #D0CECE;
}

.progress-modal__save {
  margin-top: 34px;
  padding: 16px 26px;
  border: none;
  border-radius: 46px;
  background: var(--color-accent);
  font-size: 18px;
  line-height: 1.1;
  cursor: pointer;
  transition: background 0.2s;
}

.progress-modal__save:hover {
  background: #a8ef4f;
}

@media (max-width: 767px) {
  .progress-modal__window {
  max-width: 343px;
  max-height: calc(63vh - 40px);
}

  .progress-modal__title {
    padding-bottom: 34px;
  }

  .progress-modal__name {
    font-size: 16px;
  }
}
</style>
