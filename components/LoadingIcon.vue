<template>
  <div class="loadingIcon"></div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';

const props = withDefaults(
  defineProps<{
    color?: string;
    width?: string;
    height?: string;
  }>(),
  {
    color: '#006eff',
    width: '32px',
    height: '32px'
  }
);
const { color, width, height } = toRefs(props);
</script>

<style lang="scss" scoped>
.loadingIcon {
  width: calc(v-bind(width) / 2);
  height: calc(v-bind(height) / 2);
  border: 25px #ddd solid;
  border-top: 25px transparent solid;
  border-top-color: v-bind(color);
  border-radius: 50%;
  opacity: 0.7;
  animation: rotate-anime 0.4s infinite linear;
}

@keyframes rotate-anime {
  100% {
    transform: rotate(360deg);
  }
}
</style>
