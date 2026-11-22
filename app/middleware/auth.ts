import { getAuthToken } from "~/utils/api";

export default defineNuxtRouteMiddleware(() => {
  if (import.meta.server) {
    const token = useCookie<string | null>("fitnessToken");
    if (!token.value) return navigateTo("/");
    return;
  }

  if (!getAuthToken()) return navigateTo("/");
});
