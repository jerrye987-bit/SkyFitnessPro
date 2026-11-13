<script setup lang="ts">
import { courses } from '~/data/courses'

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handleAddCourse(courseId: string) {
  console.log('Добавляем курс:', courseId)
}
</script>

<template>
  <main class="page">
    <section class="hero container">
      <h1 class="hero__title">
        Начните заниматься спортом
        и улучшите качество жизни
      </h1>
      <div class="hero__note">
        Измени своё<br>тело за полгода!
      </div>
    </section>

    <section class="workouts container">
        <WorkoutsCard
        v-for="course in courses"
        :key="course.id"
        :course="course"
        @add-course="handleAddCourse"
        />
    </section>

    <section class="up container">
        <button class="up__button" type="button" @click="scrollToTop">
            Наверх
            <span class="up__arrow">↑</span>
        </button>
    </section>
  </main>
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
  content: '';
  position: absolute;
  top: 88%;
  left: 117px;          
  width: 30px;   
  height: 35px;
  background: url('/img/note-tail.svg') no-repeat center / contain;
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
  font-family: 'Roboto';
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
}
</style>