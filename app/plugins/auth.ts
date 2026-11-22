export default defineNuxtPlugin(async () => {
  const { fetchMe, logout, user } = useAuth();

  if (import.meta.server) {
    const token = useCookie<string | null>("fitnessToken");
    if (!token.value) return;
    const { data, error } = await useAsyncData("me", fetchMe);
    if (error.value) return;
    if (data.value) user.value = data.value;
    return;
  }

  if (!getAuthToken()) return;
  try {
    await fetchMe();
  } catch {
    logout();
  }
});
