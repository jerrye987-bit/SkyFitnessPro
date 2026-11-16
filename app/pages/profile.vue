<script setup lang="ts">
import type { Course } from "~/data/courses";
import { courses, getCurrentTrainingId } from "~/data/courses";

// позже здесь будет профиль и курсы из API
// const user = useProfile()

const user = {
  name: "Сергей",
  login: "sergey.petrov96",
};

// Что пользователь взял и насколько продвинулся.
// Позже это приедет из API вместе с профилем.
const myCourses: { id: string; progress: number }[] = [
  { id: "yoga", progress: 40 },
  { id: "stretch", progress: 0 },
  { id: "fitness", progress: 100 },
];

// Склеиваем: данные курса + личный прогресс
const myCoursesFull = myCourses
  .map((my) => {
    const course = courses.find((c) => c.id === my.id);
    if (!course) return null;
    return { ...course, progress: my.progress };
  })
  .filter((c): c is Course & { progress: number } => c !== null);

function buttonLabel(progress: number) {
  if (progress === 0) return "Начать тренировки";
  if (progress === 100) return "Начать заново";
  return "Продолжить";
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const isModalOpen = ref(false);
const activeCourse = ref<Course | null>(null);

const isDesktop = ref(true);
let desktopQuery: MediaQueryList | null = null;

function onQueryChange(event: MediaQueryListEvent) {
  isDesktop.value = event.matches;
}

onMounted(() => {
  desktopQuery = window.matchMedia("(min-width: 768px)");
  isDesktop.value = desktopQuery.matches;
  desktopQuery.addEventListener("change", onQueryChange);
});

onUnmounted(() => {
  desktopQuery?.removeEventListener("change", onQueryChange);
});

function openWorkouts(course: Course & { progress: number }) {
  if (!isDesktop.value) {
    const currentId = getCurrentTrainingId(course);
    if (currentId) {
      navigateTo(`/course/${course.id}/workout/${currentId}`);
    }
    return;
  }
  activeCourse.value = course;
  isModalOpen.value = true;
}

function startTraining(trainingId: string) {
  isModalOpen.value = false;
  navigateTo(`/course/${activeCourse.value?.id}/workout/${trainingId}`);
}

function removeCourse(course: Course & { progress: number }) {
  myCoursesFull.splice(
    myCoursesFull.findIndex((c) => c.id === course.id),
    1,
  );
}
</script>

<template>
    <div>
        <TheHeader />

        <main class="profile-page">
            <h1 class="profile-page__title">Профиль</h1>

            <!-- карточка профиля -->
            <section class="profile-card">
            <div class="profile-card__avatar">
                <img src="/img/avatar.svg" alt="" class="profile-card__avatar-img" >
            </div>
            <div class="profile-card__info">
                <h2 class="profile-card__name">{{ user.name }}</h2>
                <p class="profile-card__login">Логин: {{ user.login }}</p>
                <button class="profile-card__btn">Выйти</button>
            </div>
            </section>

            <!-- мои курсы -->
            <section class="my-courses">
            <h2 class="my-courses__title">Мои курсы</h2>
            <ul class="courses-grid">
                <li 
                    v-for="course in myCoursesFull" 
                    :key="course.id" 
                    class="course-card"
                  >
                <!-- цветная часть с фото -->
                <div
                    class="course-card__image"
                    :style="{ 
                        backgroundColor: course.bg,
                        backgroundImage: `url(${course.image})`,
                    }"
                >
                    <button 
                      class="course-card__remove"  
                      aria-label="Удалить курс"
                      @click.stop="removeCourse(course)"
                    >
                    <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.3333 26.6667C20.6971 26.6667 26.6667 20.6971 26.6667 13.3333C26.6667 5.96954 20.6971 0 13.3333 0C5.96954 0 0 5.96954 0 13.3333C0 20.6971 5.96954 26.6667 13.3333 26.6667ZM6.66667 12V14.6667H20V12H6.66667Z" fill-rule="evenodd" clip-rule="evenodd" fill="white"/>
                    </svg>
                    </button>
                </div>

                <!-- белая часть -->
                <div class="course-card__body">
                    <h3 class="course-card__title">{{ course.name }}</h3>

                    <ul class="course-card__pills">
                    <li class="course-card__pill">
                        <img src="/img/day.svg" alt="">
                        {{ course.duration }}
                    </li>
                    <li class="course-card__pill">
                        <img src="/img/time.svg" alt="">
                        {{ course.perDay }}
                    </li>
                    <li class="course-card__pill">
                        <img src="/img/complexity.svg" alt="">
                        Сложность
                        <span class="course-card__dots">
                        <span
                            v-for="i in 5"
                            :key="i"
                            class="course-card__dot"
                            :class="{ 'course-card__dot--active': i <= course.complexity }"
                        />
                        </span>
                    </li>
                    </ul>

                    <p class="course-card__progress-label">
                    Прогресс {{ course.progress }}%
                    </p>
                    <div class="course-card__progress">
                    <div
                        class="course-card__progress-bar"
                        :style="{ width: course.progress + '%' }"
                    />
                    </div>

                    <button 
                      class="course-card__btn"
                      type="button"
                      @click="openWorkouts(course)"
                      >
                    {{ buttonLabel(course.progress) }}
                    </button>
                </div>
                </li>
            </ul>
            </section>
        </main>

        <button class="up-btn" type="button" @click="scrollToTop">
            Наверх&nbsp;↑
        </button>

        <ModalSelectWorkout
          v-if="isModalOpen && activeCourse"
          :trainings="activeCourse.trainings"
          @close="isModalOpen = false"
          @start="startTraining"
        />

    </div>
</template>

<style scoped>
.profile-page__title {
    padding-bottom: 40px;
    font-size: 40px;
    font-weight: 600;
    line-height: 1.1;
    color: var(--color-text);
}

.profile-card {
    padding: 30px;
    border-radius: 30px;
    background: #fff;
    box-shadow: 0px 4px 67px -12px #00000021;
    display: grid;
    grid-template-columns: 197px 300px 1fr;
    gap: 33px;
}

.profile-card__name {
    font-size: 32px;
    font-weight: 500;
    line-height: 1.1;
    color: var(--color-text);
}

.profile-card__login {
    padding-top: 30px;
    font-size: 18px;
    font-weight: 400;
    line-height: 1.1;
    color: var(--color-text);
}

.profile-card__btn {
    margin-top: 44px;
    padding: 16px 68px;
    border-radius: 46px;
    border: 1px solid var(--color-text);
    background: #fff;
    font-size: 18px;
    font-weight: 400;
    line-height: 1.1;
    color: var(--color-text);
    cursor: pointer;
    transition: background 0.2s;
}

.profile-card__btn:hover {
    background: #f7f7f7;
}

.my-courses {
    padding: 60px 0 280px;
}

.my-courses__title {
    padding-bottom: 40px;
    font-size: 40px;
    font-weight: 600;
    line-height: 1.1;
    color: var(--color-text);
}

.courses-grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.course-card {
    box-shadow: 0px 4px 67px -12px #00000021;
    border-radius: 30px;
}

.course-card__image {
  position: relative;
  height: 325px;              
  border-radius: 30px; 
  background-color: var(--course-bg, #ffc700);
  background-size: contain;
  background-position: bottom center;
  background-repeat: no-repeat;
}

.course-card__remove {
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

.course-card__body {
    padding: 24px 30px 15px;
}

.course-card__title {
    padding-bottom: 20px;
    font-size: 32px;
    font-weight: 400;
    line-height: 1.1;
    color: var(--color-text);
}

.course-card__pills {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.course-card__pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px;
  border-radius: 50px;
  background: #f7f7f7;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.1;
}

.course-card__progress-label {
    padding: 20px 0 16px;
    font-size: 18px;
    font-weight: 400;
    line-height: 1.1;
    color: var(--color-text);
}

.course-card__progress {
  height: 6px;
  border-radius: 50px;
  background: #f7f7f7;
  overflow: hidden;
}

.course-card__progress-bar {
  height: 100%;
  border-radius: 50px;
  background: #00C1FF; 
}

.course-card__btn {
    margin-top: 40px;
    padding: 16px 8px;
    width: 100%;
    border-radius: 46px;
    border: 1px solid var(--color-accent);
    background: var(--color-accent);
    font-size: 18px;
    font-weight: 400;
    line-height: 1.1;
    color: var(--color-text);
    cursor: pointer;
    transition: background 0.2s;
}

.course-card__btn:hover {
  background: #a8ef4f;
}

.course-card__btn:focus-visible {
  outline: 1px solid var(--color-accent);
  outline-offset: 1px;
}


.up-btn {
  display: none;
}

@media (max-width: 767px) {
  .courses-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .profile-card {
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .profile-page__title {
    font-size: 24px;
    font-weight: 500;
    padding-bottom: 24px;
  }

  .profile-card__avatar {
    justify-self: center;
  }

  .profile-card__avatar-img {
    display: block;
    margin: 0 auto;
    width: 141px;
  }

  .profile-card__name {
    font-size: 24px;
  }

  .profile-card__login {
    padding-top: 20px;
    font-size: 16px;
  }
  .profile-card__btn {
    margin-top: 20px;
    font-size: 16px;
    width: 100%;
  }

  .my-courses {
    padding: 24px 0 116px;
  }

  .my-courses__title {
    font-size: 24px;
    padding-bottom: 24px;
  }

  .course-card__image {
    height: 325px;
  }

  .course-card__body {
    padding: 24px 21px 15px;
  }

  .course-card__title {
    font-size: 24px;
    font-weight: 500;
  }

  .course-card__pills {
    gap: 6px;
  }

  .course-card__progress-label {
    padding: 20px 0 10px;
  }

  .course-card__btn {
    font-size: 16px;
  }

  .up-btn {
    position: fixed;
    right: 16px;
    bottom: 40px;
    z-index: 20;
    display: inline-block;
    padding: 12px 26px;
    border: none;
    border-radius: 46px;
    background: var(--color-accent);
    font-size: 18px;
    font-family: 'Roboto';
    line-height: 1.1;
    color: var(--color-text);
    cursor: pointer;
  }
}
</style>