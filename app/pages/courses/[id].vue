<script setup>
// позже здесь будет загрузка курса из API по id из роута
// const route = useRoute()
// const course = useCourse(route.params.id)

const benefits = [
  'Давно хотели попробовать йогу, но не решались начать',
  'Хотите укрепить позвоночник, избавиться от болей в спине и суставах',
  'Ищете активность, полезную для тела и души',
]

const directions = [
  'Йога для новичков', 'Кундалини-йога', 'Хатха-йога',
  'Классическая йога', 'Йогатерапия', 'Аштанга-йога',
]

const advantages = [
    'проработка всех групп мышц', 'тренировка суставов', 'улучшение циркуляции крови', 'упражнения заряжают бодростью', 'помогают противостоять стрессам'
]
</script>

<template>
  <div class="course-page">
    <section class="course-page__banner">
        <h1 class="course-page__title">Йога</h1>
    </section>

    <section class="course-page__benefits">
      <h2 class="course-page__subtitle">Подойдет для вас, если:</h2>
      <ul class="benefits-list">
        <li v-for="(benefit, index) in benefits" :key="benefit" class="benefits-item">
          <span class="benefits-item__number">{{ index + 1 }}</span>
          <p class="benefits-item__text">{{ benefit }}</p>
        </li>
      </ul>
    </section>

    <section class="course-page__directions">
      <h2 class="course-page__subtitle">Направления</h2>
      <div class="directions">
        <p v-for="direction in directions" :key="direction" class="directions__item">
          <svg class="directions__star" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.21373 1.11751C9.3702 0.454433 9.44843 0.122896 9.57424 0.0482295C9.68259 -0.0160765 9.81741 -0.0160765 9.92576 0.0482295C10.0516 0.122896 10.1298 0.454434 10.2863 1.11751L11.0497 4.35302C11.3337 5.55636 11.4757 6.15803 11.7843 6.64596C12.0571 7.07744 12.4226 7.44285 12.854 7.71574C13.342 8.02432 13.9436 8.1663 15.147 8.45025L18.3825 9.21373C19.0456 9.3702 19.3771 9.44843 19.4518 9.57424C19.5161 9.68259 19.5161 9.81741 19.4518 9.92576C19.3771 10.0516 19.0456 10.1298 18.3825 10.2863L15.147 11.0497C13.9436 11.3337 13.342 11.4757 12.854 11.7843C12.4226 12.0571 12.0571 12.4226 11.7843 12.854C11.4757 13.342 11.3337 13.9436 11.0497 15.147L10.2863 18.3825C10.1298 19.0456 10.0516 19.3771 9.92576 19.4518C9.81741 19.5161 9.68259 19.5161 9.57424 19.4518C9.44843 19.3771 9.3702 19.0456 9.21373 18.3825L8.45025 15.147C8.1663 13.9436 8.02432 13.342 7.71574 12.854C7.44285 12.4226 7.07744 12.0571 6.64596 11.7843C6.15803 11.4757 5.55636 11.3337 4.35301 11.0497L1.11751 10.2863C0.454433 10.1298 0.122896 10.0516 0.0482295 9.92576C-0.0160765 9.81741 -0.0160765 9.68259 0.0482295 9.57424C0.122896 9.44843 0.454434 9.3702 1.11751 9.21373L4.35302 8.45025C5.55636 8.1663 6.15803 8.02432 6.64596 7.71574C7.07744 7.44285 7.44285 7.07744 7.71574 6.64596C8.02432 6.15803 8.1663 5.55636 8.45025 4.35301L9.21373 1.11751Z" fill="black"/>
          </svg>
          {{ direction }}
        </p>
      </div>
    </section>

    <section class="course-page__cta">
  <div class="course-page__cta-info">
    <h2 class="course-page__cta-subtitle">Начните путь к новому телу</h2>
    <ul class="course-page__cta-list">
      <li v-for="item in advantages" :key="item">{{ item }}</li>
    </ul>
    <button class="course-page__btn">Войдите, чтобы добавить курс</button>
  </div>

  <div class="course-page__squiggle">
    <svg class="course-page__squiggle-one" width="54" height="47" viewBox="0 0 54 47" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.82886 45.2712C5.82886 36.7712 20.0289 16.3712 52.8289 2.77124" stroke-width="6" stroke="black"/>
    </svg>
    <svg class="course-page__squiggle-two" width="629" height="424" viewBox="0 0 629 424" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M499.782 388.795C943.782 -230.705 47.9024 39.5475 24.1395 237.96C18.5256 284.834 82.2022 298.666 177.705 277.697C273.208 256.727 -131.258 411.113 54.5178 439.481" stroke-width="10.1395" stroke="#C6FF00"/>
    </svg>
  </div>

  <img src="/img/athlete.png" alt="" class="course-page__cta-img">
</section>
  </div>
</template>

<style scoped>
.course-page {
  padding: 10px 0 50px;
}

.course-page__banner {
  min-height: 310px;
  padding: 40px;  
  border-radius: 30px;
  background: #FFC700 url('/img/skillYoga.png') no-repeat right center / contain;
}

.course-page__title {
  font-size: 60px;
  font-weight: 500;
  line-height: 1.1;
  color: #fff;
}

.course-page__benefits {
    padding-top: 60px;
}

.course-page__subtitle {
    font-size: 40px;
    font-weight: 600;
    line-height: 1.1;
    color: var(--color-text);
}

.benefits-list {
  padding-top: 40px;
  list-style: none;
  display: grid;
  grid-template-columns: 368fr 431fr 327fr;
  gap: 17px;  
}

.benefits-item {
  display: flex;
  align-items: center;
  gap: 25px;
  padding: 20px;
  border-radius: 28px;
  background: linear-gradient(115.81deg, #151720 34.98%, #1E212E 91.5%);
}

.benefits-item__number {
  font-size: 75px;
  font-weight: 500;
  line-height: 1.35;
  color: var(--color-accent);
}

.benefits-item__text {
  font-size: 24px;
  font-weight: 400;
  line-height: 1.1;
  color: #fff;
}

.course-page__directions {
    padding-top: 60px;
}

.directions {
  margin-top: 40px;
  padding: 30px 33px;
  border-radius: 28px;
  background: var(--color-accent);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 34px 124px;
}

.directions__item {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 11px;
  font-size: 24px;
  font-weight: 400;
  line-height: 1.1;
  color: var(--color-text);
}

.directions__star {
  flex-shrink: 0;
}

.course-page__cta {
  position: relative;  
  border-radius: 30px;
  background: #fff;
  box-shadow: 0px 4px 67px -12px #00000021;
  padding: 40px;
  margin: 102px 0 50px;

}

.course-page__cta-info {
  max-width: 437px;
}

.course-page__cta-img {
  position: absolute;
  right: 34px; 
  bottom: 40px;
  width: 480px; 
}

.course-page__squiggle {
    position: absolute;
  inset: 0; 
  overflow: hidden;
  border-radius: 30px;
  pointer-events: none;
}

.course-page__squiggle-one {
    position: absolute;
    pointer-events: none; 
    top: 25px;   
    right: 375px;

}

.course-page__squiggle-two {
    position: absolute;
    pointer-events: none; 
    top: 110px;   
    right: 24px;

}

.course-page__cta-subtitle {
    max-width: 420px;
    padding-bottom: 28px;
    font-size: 60px;
    font-weight: 600;
    line-height: 1;
    letter-spacing: 0px;
    color: var(--color-text);
}

.course-page__cta-list {
    padding-bottom: 28px;
    padding-left: 16px;
    list-style: none;
    display: grid;
    gap: 12px;
    font-size: 24px;
    font-weight: 400;
    line-height: 1.1;
    color: rgba(0, 0, 0, 0.6);
}

.course-page__cta-list li {
    position: relative;
    padding-left: 20px;
}

.course-page__cta-list li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.6);
}

.course-page__btn {
  padding: 16px 26px;
  width: 100%;
  border: none;
  border-radius: 46px;
  background: var(--color-accent);
  font-size: 18px;
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: 0;
  color: var(--color-text);
  cursor: pointer;
  transition: background 0.2s;
}

.course-page__btn:hover {
  background: #a8ef4f;
}
</style>