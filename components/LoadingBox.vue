<template>
  <div class="loading-box">
    <div
      class="Icon-wrapper"
      v-if="isLoading"
    >
      <LoadingIcon
        :color
        :width
        :height
      />
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    color?: string;
    isLoading?: boolean;
    width?: string;
    height?: string;
  }>(),
  {
    color: '#006eff',
    isLoading: false,
    width: '100%',
    height: '100%'
  }
);
const { color, isLoading, width, height } = toRefs(props);
</script>

<style lang="scss" scoped>
.loading-box {
  position: relative;
  width: v-bind(width);
  height: v-bind(height);
  .Icon-wrapper {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
}
</style>
