<template>
  <div class="loadingBox">
    <div
      class="loadingIconx"
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
    width: '20px',
    height: '20px'
  }
);
const { color, isLoading, width, height } = toRefs(props);
</script>

<style lang="scss" scoped>
.loadingBox {
  position: relative;
  width:v-bind(width);
  height:v-bind(height);
  .loadingIconx {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
