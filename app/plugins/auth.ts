export default defineNuxtPlugin(async () => {
  const token = useCookie<string | null>("fitnessToken");
  if (!token.value) return;

  const { fetchMe, logout, user } = useAuth();
  const { data, error } = await useAsyncData("me", fetchMe);

  if (error.value) {
    if (import.meta.client) logout();
    return;
  }

  if (data.value) {
    user.value = data.value;
  }
});