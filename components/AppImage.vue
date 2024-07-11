<template>
  <LoadingBox
    :isLoading="isRetrying"
    :width
    :height
  >
    <img
      v-show="!isRetrying"
      :src="srcEdit"
      :alt
      @error="handleError"
      @load="handleLoad"
      :crossorigin
    />
  </LoadingBox>
</template>

<script setup lang="ts">
// 表面的に使用するコンポーネントは1つだけにしたい
// 現状はあまり複雑にはならないのでsrcによる振り分け等は無しでBase64画像でもリトライ機能を備える (imgタグに対する設定も一箇所にしたい)
// 柔軟性を上げるため、AppImageのサイズは基本的に親要素と同じサイズにする
// (親コンポーネント側で親要素を用意してサイズも親側でコントロールする propsのみでの指定だとブレイクポイント等で複雑になるため)
// imgはv-ifで非表示にすると読み込みが行われなくなるためv-showを使用
const props = withDefaults(
  defineProps<{
    src: string;
    alt?: string;
    height?: string;
    width?: string;
    // S3用
    crossorigin?: 'anonymous' | 'use-credentials';
  }>(),
  {
    height: '100%',
    width: '100%'
  }
);
const { alt, width, height, crossorigin } = toRefs(props);
// リトライはTSで完結しているのでcomposableにする
const { srcEdit, isRetrying, handleError, handleLoad } = useRetryLogic(() => props.src);
</script>
<style lang="scss" scoped>
img {
  width: v-bind(width);
  height: v-bind(height);
  max-width: 100%;
  max-height: 100%;
}
</style>
