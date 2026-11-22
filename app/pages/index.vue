<script setup lang="ts">
import type { CourseCardView } from "~/types/course";
import { defaultMeta, getCourseMeta, sortCoursesByMock } from "~/data/courseMeta";
import { useCourses } from "~/composables/useCourses";
import { useAuth } from "~/composables/useAuth";

useHead({
  title: 'Онлайн-тренировки для занятий дома ',
})


const { fetchCourses, addCourse } = useCourses();
const { user } = useAuth();

const isLoginModalOpen = ref(false);
const pendingCourseId = ref<string | null>(null);

const { data: courses, error: coursesError } = await useAsyncData(
  "courses",
  async () => {
    const data = await fetchCourses();
    return sortCoursesByMock(data).map((c) => {
      const meta = getCourseMeta(c.nameEN);
      return {
        ...c,
        id: c._id,
        image: meta.image ?? defaultMeta.image,
        bg: meta.bg ?? defaultMeta.bg,
        duration: meta.duration ?? defaultMeta.duration,
        perDay: meta.perDay ?? defaultMeta.perDay,
        complexity: meta.complexity ?? defaultMeta.complexity,
      };
    });
  },
  { default: () => [] as CourseCardView[] },
);

function onNeedAuth(courseId: string) {
  pendingCourseId.value = courseId;
  isLoginModalOpen.value = true;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function isCourseAdded(courseId: string) {
  return (user.value?.selectedCourses ?? []).includes(courseId);
}

async function saveCourse(courseId: string) {
  const currentUser = user.value;
  if (!currentUser) return;

  try {
    await addCourse(courseId);
    
  } catch (e) {
    console.error(
      e instanceof Error ? e.message : "Ошибка при добавлении курса"
    );
  }
}

function onLoginModalClose() {
  isLoginModalOpen.value = false;

  const courseId = pendingCourseId.value;
  pendingCourseId.value = null;

  if (courseId && user.value && !isCourseAdded(courseId)) {
    saveCourse(courseId);
  }
}
</script>


<template>
  <div>
    <TheHeader show-subtitle />

    <main class="page">
      <section class="hero container">
        <h1 class="hero__title">
          Начните заниматься спортом и улучшите качество жизни
        </h1>
        <div class="hero__note">Измени своё<br >тело за полгода!</div>
      </section>

      <section class="workouts container">
        <template v-if="coursesError">
          <p class="workouts__error">Не удалось загрузить курсы</p>
        </template>
        <WorkoutsCard
          v-for="course in courses"
          :key="course.id"
          :course="course"
          @need-auth="onNeedAuth"
        />
      </section>

      <ModalLogin
        v-if="isLoginModalOpen"
        @close="onLoginModalClose"
      />

      <section class="up container">
        <button class="up__button" type="button" @click="scrollToTop">
          Наверх
          <span class="up__arrow">↑</span>
        </button>
      </section>
    </main>
  </div>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: start;
  column-gap: 20px;
  padding: 10px 0 50px;
}

.hero__title {
  font-size: 60px;
  font-weight: 500;
  line-height: 1;
}

.hero__note {
  padding: 16px 20px;
  background: var(--color-accent);
  border-radius: 5px;
  font-size: 32px;
  font-weight: 400;
  line-height: 1.1;
  position: relative;
}

.hero__note::after {
  content: "";
  position: absolute;
  top: 88%;
  left: 117px;
  width: 30px;
  height: 35px;
  background: url("/img/note-tail.svg") no-repeat center / contain;
}

.workouts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  padding-bottom: 34px;
}

.up {
  display: flex;
  justify-content: center;
  padding-bottom: 81px;
}

.up__button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px 26px;
  border: 1px solid var(--color-accent);
  border-radius: 46px;
  background: var(--color-accent);
  color: var(--color-text);
  font-family: "Roboto";
  font-size: 18px;
  font-weight: 400;
  line-height: 1.1;
  cursor: pointer;
}

.up__arrow {
  display: inline-block;
  transform: translateY(-2px);
}

@media (max-width: 767px) {
  .hero {
    padding: 0 0 34px;
  }

  .hero__title {
    font-size: 32px;
    line-height: 1.1;
  }

  .hero__note {
    display: none;
  }

  .workouts {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 0 0 24px;
  }

  .up {
    justify-content: flex-end;
  }

  .up__button {
    position: fixed;
    right: 16px;
    bottom: 16px;
    z-index: 10;
  }
}
</style>
