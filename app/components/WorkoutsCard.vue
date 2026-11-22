<script setup lang="ts">
import type { CourseCardView } from "~/types/course";
import { useCourses } from "~/composables/useCourses";
import { useAuth } from "~/composables/useAuth";

const props = defineProps<{ course: CourseCardView }>();
const { addCourse } = useCourses();
const { user } = useAuth();

const isPending = ref(false);

const isAdded = computed(() =>
  user.value?.selectedCourses?.includes(props.course.id) ?? false,
);

const emit = defineEmits<{ needAuth: [courseId: string] }>();

async function handleAddCourse() {
  if (isPending.value || isAdded.value) return;

  if (!user.value) {
    emit("needAuth", props.course.id);
    return;
  }

  isPending.value = true;
  try {
    await addCourse(props.course.id);
  } catch (e) {
    console.error(e instanceof Error ? e.message : "Ошибка при добавлении курса");
  } finally {
    isPending.value = false;
  }
}
</script>


<template>
  <article class="card">
    <NuxtLink
      :to="`/courses/${course.id}`"
      class="card__link"
      :aria-label="`Перейти к курсу ${course.nameRU}`"
    >
      <div class="card__media" :style="{ background: course.bg }">
        <NuxtImg :src="course.image" :alt="course.nameRU" class="card__img" />
      </div>
      <div class="card__body">
        <h2 class="card__title">{{ course.nameRU }}</h2>
        <ul class="card__tags">
          <li class="card__tag">
            <img src="/img/day.svg" alt="" class="card__tag-icon">
            {{ course.duration }}
          </li>
          <li class="card__tag">
            <img src="/img/time.svg" alt="" class="card__tag-icon">
            {{ course.perDay }}
          </li>
          <li class="card__tag">
            <img src="/img/complexity.svg" alt="" class="card__tag-icon">
            {{ course.complexity }}
          </li>
        </ul>
      </div>
    </NuxtLink>

    <ClientOnly>
      <button 
        class="card__plus" 
        type="button" 
        :disabled="isAdded || isPending"
        :aria-label="isAdded ? 'Курс добавлен' : 'Добавить курс'"
        @click="handleAddCourse"
        >
        <svg
          v-if="isAdded"
          width="26" height="26" viewBox="0 0 26 26"
          fill="none" xmlns="http://www.w3.org/2000/svg"
        >
          <mask :id="`check-hole-${course.id}`">
          <rect width="26" height="26" fill="white" />
          <path
            d="M6.5 13.5L11 18L19.5 8.5"
            stroke="black"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          </mask>
          <circle cx="13" cy="13" r="13" fill="white" :mask="`url(#check-hole-${course.id})`" />
        </svg>
        <img v-else src="/img/plus.svg" alt="" class="card__plus-icon">
      </button>
    </ClientOnly>
  </article>
</template>



<style scoped>
.card {
  position: relative;
  background: #fff;
  border-radius: 30px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 67px -12px #00000021;

}

.card__link {
  display: block;
  color: inherit;
  text-decoration: none;
}

.card__media {
  position: relative;
  height: 325px; 
  border-radius: 30px;
  overflow: hidden;
}

.card__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card__plus {
  position: absolute;
  top: 23px;
  right: 23px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  cursor: pointer;
}

.card__plus-icon {
  width: 26px;
  height: 26px;
  display: block;
}

.card__body {
  padding: 24px 30px 15px;
}

.card__title {
  margin: 0 0 20px;
  font-size: 32px;
  font-weight: 700;
  line-height: 1.1;
  color: var(--color-text);
}

.card__tags {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.card__tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 12px;
  border-radius: 50px;
  background: #F7F7F7;
  font-size: 16px;
  line-height: 1.1;
  font-weight: 400;
  color: var(--color-text);
}

.card__tag-icon {
  width: 18px;
  height: 18px;
  display: block;
}

@media (max-width: 767px) {
  .card__body {
    padding: 24px 21.5px 15px;
  }

  .card__title {
    font-size: 24px;
    font-weight: 500;
  }

  .card__tag {
    padding: 10px;
  }
}
</style>
