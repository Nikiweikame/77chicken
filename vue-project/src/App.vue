<script setup>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import Header from "./components/Header.vue";
import { useCounterStore } from "@/stores/counter.js";
import { onMounted } from "vue";
const counterStore = useCounterStore();
</script>

<template>
  <Header />
  <main class="container">
    <RouterView />
  </main>
  <div class="load loading">
    <p>資料傳送中</p>
  </div>
</template>

<style scoped lang="scss">
.container {
  padding-top: 30px;
  padding-bottom: 30px;
}
.load {
  position: absolute;
  inset: 0 0 100% 0;
  // inset: 0;
  background-color: #60c48f;
  transition: all 1s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-size: 40px;
    color: transparent;
  }
}
.loading {
  inset: 0;
  p {
    color: #fff;
  }
}
</style>
