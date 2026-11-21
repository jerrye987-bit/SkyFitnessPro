<script setup lang="ts">
defineProps<{ showSubtitle?: boolean }>();

const isModalOpen = ref(false);
const isDropdownOpen = ref(false);

const { user, isLoggedIn, logout } = useAuth();

function userName(me: { email: string }) {
  return me.email.split("@")[0];
}

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

function onLogout() {
  isDropdownOpen.value = false;
  logout();
  navigateTo("/");
}
</script>

<template>
  <header class="header">
    <div class="container header__inner">
      <NuxtLink to="/" class="header__logo">
        <NuxtImg src="/img/logo.svg" alt="Skillfit — на главную" class="header__logo-img" />
      </NuxtLink>
      <p v-if="showSubtitle" class="header__subtitle">Онлайн-тренировки для занятий дома</p>

      <!-- НЕ залогинен: кнопка Войти -->
      <button
        v-if="!isLoggedIn" 
        class="header__btn" 
        type="button" 
        @click="isModalOpen = true"
      >
        Войти
      </button>

      <!-- Залогинен: имя + стрелка + дропдаун -->
      <div v-else class="header__user">
        <button
          class="header__user-btn"
          type="button"
          @click="toggleDropdown"
        >
          <NuxtImg src="/img/avatarIcon.svg" alt="" class="header__user-avatar" />
          <span class="header__user-name">{{ user && userName(user) }}</span>
          <svg
            class="header__user-arrow"
            :class="{ 'header__user-arrow--open': isDropdownOpen }"
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
          >
            <path d="M1 1l4 4 4-4" stroke="black" stroke-width="1.5" />
          </svg>
        </button>

        <div v-show="isDropdownOpen" class="header__dropdown">
          <p class="header__dropdown-name">{{ user && userName(user) }}</p>
          <p class="header__dropdown-email">{{ user?.email }}</p>
          <NuxtLink v-slot="{ navigate }" to="/profile" custom >
            <button class="header__dropdown-profile" type="button" @click="navigate">
              Мой профиль
            </button>
          </NuxtLink>
          <button class="header__dropdown-logout" type="button" @click="onLogout">Выйти</button>
        </div>
      </div>

      <ModalLogin v-if="isModalOpen" @close="isModalOpen = false" />
    </div>
  </header>
</template>

<style scoped>
.header {
  padding: 50px 0;
  background: var(--color-bg);
}

.header__inner {
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-areas:
    'logo . btn'
    'sub . btn';
  column-gap: 16px;
}

.header__logo {
  grid-area: logo;
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 6px;
}

.header__logo-img {
  flex-shrink: 0;
  width: 220px;
  height: 35px;
}

.header__subtitle {
  grid-area: sub;
  padding-top: 15px;
  margin: 0;
  font-size: 18px;
  line-height: 1.1;
  color: var(--color-muted);
}

.header__btn {
  grid-area: btn;
  align-self: center;
  padding: 16px 26px;
  border: none;
  border-radius: 46px;
  background: var(--color-accent);
  font-size: 18px;
  font-weight: 400;
  font-family: 'Roboto';
  line-height: 1.1;
  letter-spacing: 0;
  color: var(--color-text);
  cursor: pointer;
  transition: background 0.2s;
}

.header__btn:hover {
  background: #a8ef4f;
}

.header__user {
  position: relative;
  justify-self: end;
  align-self: center;
}

.header__user-btn {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0;
  border: none;
  background: transparent;
  font-size: 24px;
  line-height: 1.1;
  color: var(--color-text);
  cursor: pointer;
}

.header__user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.header__user-arrow {
  transition: transform 0.2s;
}

.header__user-arrow--open {
  transform: rotate(180deg);
}

.header__dropdown {
  position: absolute;
  top: calc(100% + 16px);
  right: 0;
  z-index: 10;
  width: 266px;
  padding: 30px;
  border-radius: 30px;
  background: #fff;
  box-shadow: 0 4px 40px rgba(0, 0, 0, 0.12);
  text-align: center;
}

.header__dropdown-name {
  margin: 0;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.1;
  color: var(--color-text);
}

.header__dropdown-email {
  margin: 10px 0 34px;
  font-size: 18px;
  line-height: 1.1;
  color: #999999;
}

.header__dropdown-profile {
  width: 100%;
  padding: 16px;
  margin-bottom: 10px;
  border: none;
  border-radius: 46px;
  background: var(--color-accent);
  cursor: pointer;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.1;
  color: var(--color-text);
}

.header__dropdown-logout {
  width: 100%;
  padding: 15px;
  border: 1px solid var(--color-text);
  border-radius: 46px;
  background: transparent;
  cursor: pointer;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.1;
  color: var(--color-text);
}


@media (max-width: 767px) {
  .header {
    padding: 39px 0;
  }
  .header__inner {
    column-gap: 8px;
    padding: 0;
  }

  .header__subtitle {
    display: none;
  }

  .header__btn {
    padding: 8px 16px;
    border: 1px solid var(--color-accent);
    border-radius: 46px;
  }

  .header__user-name {
    display: none;
  }

  .header__user-avatar {
    height: 30px;
    width: 30px;
  }
}
</style>
