<template>
  <div class="app">
    <h1>リトライ確認 ({{ env }}環境)</h1>
    <span class="memo">キャッシュから取得されていると画像の名前を変えてもリトライされない dev環境では画像が存在せずにimportに失敗するとエラーになるので動作確認不可 リトライ7回まで</span>

    <div class="showcase-group">
      <div
        v-for="assetsImage in assetsImages"
        :key="assetsImage"
        class="wrapper"
      >
        <RetryImageShowcase :src="assetsImage" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// 元々importしている画像を削除するとviteのエラーになる
import assetsImage1 from '@/assets/images/assets-image1.png';
import publicImage1 from '/public-image1.png';
import assetsImage4kb from '@/assets/images/assets-image-4kb.png';

const assetsImages: string[] = [assetsImage1, publicImage1, assetsImage4kb];
const env: string = import.meta.env.MODE === 'development' ? 'dev' : 'prod';
</script>
<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html {
  height: 100vh;
  background: rgb(235, 235, 235);
}
.app {
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .memo {
    font-size: 11px;
  }

  .showcase-group {
    display: flex;
    gap: 5px;
    .wrapper {
      display: flex;
      min-width: 32vw;
      max-width: 32vw;
      min-height: 400px;
      flex-grow: 1;
      justify-content: center;
      align-items: center;
      border: 1px solid rgb(170, 170, 170);
    }
  }
}
</style>
