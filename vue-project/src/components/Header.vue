<script setup>
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useCounterStore } from "@/stores/counter.js";

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
          <RouterLink to="/" class="nav-link">團購發起</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/update" class="nav-link">新增菜單</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/delete" class="nav-link">訂單查訊/刪除</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/check" class="nav-link">付款清點</RouterLink>
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
.nav {
  justify-content: center;
  &-link {
    color: #fff;
  }
}
@media (min-width: 1024px) {
}
</style>
