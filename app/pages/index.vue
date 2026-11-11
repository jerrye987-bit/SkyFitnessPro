<script setup lang="ts">
import { courses } from '~/data/courses'
</script>

<template>
  <main class="page">
    <section class="hero container">
      <h1 class="hero__title">
        Начните заниматься спортом<br>
        и улучшите качество жизни
      </h1>
      <div class="hero__note">
        Измени своё<br>тело за полгода!
      </div>
    </section>

    <section class="courses">
      <CourseCard v-for="course in courses" :key="course.id" :course="course" />
    </section>
  </main>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: start;
  column-gap: 20px; 
  padding: 10px 0 64px;
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

/* хвостик */
.hero__note::after {
  content: '';
  position: absolute;
  top: 88%;
  left: 117px;          
  width: 30px;   
  height: 35px;
  background: url('/img/note-tail.svg') no-repeat center / contain;
}
</style>