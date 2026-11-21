export default defineNuxtRouteMiddleware(() => {
  const token = useCookie<string | null>("fitnessToken");

  if (!token.value) {
    return navigateTo("/");
  }
});
