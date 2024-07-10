<template>
  <img
    :src="srcEdit"
    @error="handleError"
    @load="handleLoad"
  />
</template>

<script setup lang="ts">
import type { ModelRef } from 'vue';

const props = withDefaults(
  defineProps<{
    src: string;
    height?: string;
    width?: string;
  }>(),
  {
    height: undefined,
    width: undefined
  }
);
const srcEdit: ModelRef<string, string> = defineModel<string>('srcEdit', { default: '' });

watch(
  () => props.src,
  () => (srcEdit.value = props.src),
  { immediate: true }
);

const MAX_ATTEMPTS_COUNT = 7;
const MAX_RETRY_DELAY = 20000;
const DELAY_BASE = 100;

const isRetrying: ModelRef<boolean, string> = defineModel<boolean>('isRetrying', { default: false });
const attempts: ModelRef<number, string> = defineModel<number>('attempts', { default: 1 });

const handleError = () => {
  isRetrying.value = true;
  if (attempts.value <= MAX_ATTEMPTS_COUNT) {
    const delay = Math.floor(Math.min(MAX_RETRY_DELAY, Math.random() * 2 ** attempts.value * DELAY_BASE));
    setTimeout(() => {
      srcEdit.value = `${props.src}?retry=${attempts.value}`;
      attempts.value++;
    }, delay);
  } else {
    isRetrying.value = false;
  }
};
const handleLoad = () => (isRetrying.value = false);
</script>
<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;
}
</style>
