export function useModalEsc(onClose: () => void) {
  function onKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") onClose();
  }

  onMounted(() => window.addEventListener("keydown", onKeydown));
  onUnmounted(() => window.removeEventListener("keydown", onKeydown));
}
