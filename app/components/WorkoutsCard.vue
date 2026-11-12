<script setup lang="ts">
import type { Course } from '~/data/courses'

defineProps<{ course: Course }>()
</script>

<template>
  <article class="card">
    <div class="card__media" :style="{ background: course.bg }">
      <img :src="course.image" :alt="course.name" class="card__img">
      <button class="card__plus" type="button" aria-label="Подробнее">
        <img src="/img/plus.svg" alt="" class="card__plus-icon">
      </button>
    </div>
    <div class="card__body">
      <h2 class="card__title">{{ course.name }}</h2>
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
            Сложность</li>
      </ul>
    </div>
  </article>
</template>


<style scoped>
.card {
  background: #fff;
  border-radius: 30px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 67px -12px #00000021;

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
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
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
