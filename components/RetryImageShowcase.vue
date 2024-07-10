<template>
  <div class="retry-image-showcase">
    <button @click="retryMissingPath">リトライ開始-失敗(存在しないパスに変更して戻す)</button>
    <button @click="retryRename">(prod向け)リトライ開始(サーバーの画像名を変更して更新)</button>
    <button @click="restoreRename">(prod向け)リトライ成功(変更した画像名を戻す)</button>
    <div class="status">
      <span class="label">src: </span>{{ currentSrc }}
    </div>
    <div class="image">
      <LoadingBox
        :isLoading="isRetrying"
        width="200px"
        height="200px"
      >
        <AppAssetsImage
          :src="srcImage"
          v-model:srcEdit="currentSrc"
          v-model:attempts="attempts"
          v-model:isRetrying="isRetrying"
        />
      </LoadingBox>
    </div>
  </div>
</template>

<script setup lang="ts">
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
const { srcImage, currentSrc, retryMissingPath, retryRename, restoreRename, isRetrying, attempts } = useRetry(props.src);
</script>
<style lang="scss" scoped>
.retry-image-showcase {
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  button {
    cursor: pointer;
  }
  .status {
    width: 100%;
    text-align: left;
    font-size: 13px;
    .label {
      font-size: 15px;

      font-weight: bold;
    }
  }
  .image {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgb(170, 170, 170);
  }
}
</style>
