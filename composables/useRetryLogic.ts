export const useRetryLogic = (getOriginalSrc: () => string, maxAttemptsCount: number = 3, maxRetryDelay: number = 20000, delayBase: number = 10000) => {
  const _originalSrc: ComputedRef<string> = computed(() => getOriginalSrc());

  const srcEdit: Ref<string> = ref('');
  watch(_originalSrc, () => (srcEdit.value = _originalSrc.value), { immediate: true });

  const isRetrying: Ref<boolean> = ref(false);

  let _attempts = 1;
  const handleError = () => {
    isRetrying.value = true;
    if (_attempts <= maxAttemptsCount) {
      const delay = Math.floor(Math.min(maxRetryDelay, Math.random() * 2 ** _attempts * delayBase));
      setTimeout(() => {
        if (!isRetrying.value) return;
        srcEdit.value = `${_originalSrc.value}?retry=${_attempts}`;
        _attempts++;
      }, delay);
    } else {
      isRetrying.value = false;
    }
  };
  const handleLoad = () => (isRetrying.value = false);

  return {
    srcEdit,
    isRetrying,
    handleError,
    handleLoad
  };
};
