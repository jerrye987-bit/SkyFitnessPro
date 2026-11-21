<script setup lang="ts">
const emit = defineEmits(["close"]);

const { login, register } = useAuth();

function getErrorMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  return "Что-то пошло не так, попробуйте ещё раз";
}

const showError = (msg: string) => {
  isError.value = true;
  errorText.value = msg;
};

function onOverlayClick(e: MouseEvent) {
  if (e.target === e.currentTarget) emit("close");
}

const isRegister = ref(false);

const email = ref("");
const password = ref("");
const passwordRepeat = ref("");

const isError = ref(false);
const errorText = ref("");

const isSubmitting = ref(false);

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

watch([email, password, passwordRepeat], () => {
  isError.value = false;
  errorText.value = "";
});

function toggleMode() {
  isRegister.value = !isRegister.value;
  isError.value = false;
  errorText.value = "";
}

function validatePassword(value: string): string | null {
  if (value.length < 6) return "Пароль должен содержать не менее 6 символов";
  const specialChars = value.match(/[^A-Za-zА-Яа-я0-9]/g) ?? [];
  if (specialChars.length < 2)
    return "Пароль должен содержать не менее 2 спецсимволов";
  if (!/[A-ZА-Я]/.test(value))
    return "Пароль должен содержать как минимум одну заглавную букву";
  return null;
}

async function submit() {
  errorText.value = "";

  const emailValue = email.value.trim();
  const passwordValue = password.value;

  if (!isValidEmail(emailValue)) {
    showError("Введите корректный email");
    return;
  }

  if (isRegister.value) {
    const passwordError = validatePassword(passwordValue);
    if (passwordError) {
      showError(passwordError);
      return;
    }

    if (passwordValue !== passwordRepeat.value) {
      showError("Пароли не совпадают");
      return;
    }

    try {
      isSubmitting.value = true;
      await register(emailValue, passwordValue);
    } catch (e) {
      showError(getErrorMessage(e));
      return;
    } finally {
      isSubmitting.value = false;
    }
  }

  try {
    isSubmitting.value = true;
    await login(emailValue, passwordValue);
    emit("close");
  } catch (e) {
    showError(getErrorMessage(e));
  } finally {
    isSubmitting.value = false;
  }
}

useModalEsc(() => emit("close"));
</script>

<template>
  <div class="modal-overlay" @click="onOverlayClick">
    <div class="modal__card">
      <div class="modal__logo">
        <img class="modal__logo-img" src="/img/logoAuth.svg" alt="Sky Fitness Pro" width="220" height="35" >
      </div>

      <form 
        class="modal__form" 
        novalidate
        @submit.prevent="submit" 
      >
        <div class="modal__group-input">
          <input
            class="modal__username"
            type="text"
            name="username"
            autocomplete="username"
          >
          <input
            ref="emailInput"
            v-model="email"
            class="modal__input"
            type="email"
            placeholder="Эл. почта"
            autocomplete="email"
            name="email"
          >
          <input
            ref="passwordInput"
            v-model="password"
            class="modal__input"
            type="password"
            placeholder="Пароль"
            :class="{ modal__input_error: isError }"
            :autocomplete="isRegister ? 'new-password' : 'current-password'"
            name="password"
          >
          <input
            v-if="isRegister"
            v-model="passwordRepeat"
            class="modal__input"
            type="password"
            placeholder="Повторите пароль"
            autocomplete="new-password"
          >
          <p v-if="isError" class="modal__error-text">
            {{ errorText }}
          </p>
        </div>

        <div class="modal__group-button">
          <button class="modal__button" type="submit" :disabled="isSubmitting">
            {{ isRegister ? "Зарегистрироваться" : "Войти" }}
          </button>
          <button
            class="modal__button modal__button_secondary"
            type="button"
            @click="toggleMode"
          >
            {{ isRegister ? "Войти" : "Зарегистрироваться" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal__card {
  width: min(360px, calc(100% - 32px));
  background-color: #fff;
  border-radius: 30px;
  padding: 40px;
}

.modal__logo {
  display: flex;
  justify-content: center;
  padding-bottom: 48px;
}

.modal__form {
  display: flex;
  flex-direction: column;
  gap: 34px;
}

.modal__username {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}

.modal__group-input {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.modal__input {
  width: 100%;
  border: 1px solid #d0cece;
  border-radius: 8px;
  padding: 15px 18px;
  font-size: 18px;
  line-height: 1.1;
  font-weight: 400;
}

.modal__input::placeholder {
  color: #d0cece;
}

.modal__group-button {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.modal__button {
  border-radius: 46px;
  border: 1px solid transparent;
  background-color: var(--color-accent);
  width: 100%;
  padding: 15px 0;
  font-size: 18px;
  line-height: 1.1;
  transition:
    background-color 0.2s,
    color 0.2s;
}

.modal__button_secondary {
  background-color: var(--color-bg);
  border: 1px solid var(--color-text);
}

.modal__button:hover {
  background-color: #c6ff00;
}

.modal__button:active {
  background-color: #000;
  color: #fff;
}

.modal__button_secondary:hover {
  background-color: #f7f7f7;
}

.modal__button_secondary:active {
  background-color: #e9eced;
  color: #000;
}

.modal__button:disabled {
  background-color: #f7f7f7;
  color: #999999;
  cursor: not-allowed;
}

.modal__button_secondary:disabled {
  background-color: #ffffff;
  border-color: #999999;
  color: #999999;
  cursor: not-allowed;
}

.modal__input_error {
  border-color: #db0030;
}

.modal__error-text {
  margin: 0;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.1;
  color: #db0030;
  text-align: center;
}

@media (max-width: 767px) {
  .modal__card {
    padding: 40px 31.5px;
  }
}
</style>
