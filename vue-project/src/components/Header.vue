<script setup>
import { ref } from "vue";
import { useCounterStore } from "@/stores/counter.js";
import { RouterLink, RouterView } from "vue-router";

const counterStore = useCounterStore();
const countdown = ref(20);
</script>
<template>
  <header class="header">
    <div class="header__container">
      <p class="header__title">好想吃午餐</p>
      <div class="countdown">
        <span>{{ counterStore.countdown }}</span>
      </div>
      <ul class="nav">
        <li class="nav-item">
          <a class="nav-link" href="">團購發起</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="">新增菜單</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="">訂購頁面</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="">訂單查訊/修改</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="">付款清點</a>
        </li>
      </ul>
    </div>
  </header>
  <nav></nav>
</template>

<style scoped lang="scss">
.header {
  background-color: #60c48f;
  padding: 10px;
  color: #fff;
  text-align: center;
  &__title {
    font-size: 32px;
    margin-bottom: 16px;
  }
}
.nav{
  justify-content: center;
  &-link{
    color: #fff;
  }
}
@media (min-width: 1024px) {
}
</style>
