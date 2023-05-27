<script setup>
import { useCounterStore } from "@/stores/counter.js";

import { RouterLink, RouterView } from "vue-router";
const counterStore = useCounterStore();
function shootOrder() {
  counterStore.loading();
  const contnet = { Name: counterStore.name };
  counterStore.cartList.forEach((elememt) => {
    const index = elememt.split(" ")[0];
    const count = elememt.split(" ")[2];
    contnet[index] = count;
  });
  counterStore.order(contnet);
  clear() 
}
function clear() {
  counterStore.cartList = [];
}
</script>
<template>
  <div class="cart">
    <div class="cart__title">購物車:</div>
    <div class="cart__content-box">
      <p v-for="element in counterStore.cartList" class="cart__content">
        {{
          element.split(" ")[1] +
          element.split(" ")[2] +
          "份" +
          element.split(" ")[3] +
          "元"
        }}
      </p>
    </div>
    <div class="cart__button">
      <RouterLink to="/delete" class="cart__submit" @click="shootOrder">送出</RouterLink>
      <div class="cart__clear" @click="clear">清除</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cart {
  &__content {
    margin: 0;
    &-box {
      min-height: 50px;
    }
  }
  &__title {
    color: white;
    text-decoration: none;
    display: block;
    padding: 10px;
    text-align: center;
    background-color: #60c48f;
    border: 1px solid white;
  }
  &__button {
    display: flex;
    width: 100%;
    > * {
      text-decoration: none;
      display: block;
      padding: 10px;
      text-align: center;
      // background-color: #60c48f;
      border: 1px solid white;
      cursor: pointer;
      flex-grow: 1;
      color: white;
    }
  }
  &__submit {
    background-color: #3982d7;
  }
  &__clear {
    background-color: #d0021b;
  }
}
@media (min-width: 1024px) {
}
</style>
