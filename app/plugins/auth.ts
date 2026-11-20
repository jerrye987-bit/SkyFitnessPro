export default defineNuxtPlugin(async () => {
  const token = useCookie<string | null>("fitnessToken");
  if (!token.value) return;

  const { fetchMe } = useAuth();
  await useAsyncData("me", fetchMe);
});
