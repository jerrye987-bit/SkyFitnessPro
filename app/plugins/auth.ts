export default defineNuxtPlugin(async () => {
  const token = useCookie<string | null>("fitnessToken");
  if (!token.value) return;

  const { fetchMe, logout } = useAuth();
  const { error } = await useAsyncData("me", fetchMe);
  if (error.value) {
    logout();
  }
});