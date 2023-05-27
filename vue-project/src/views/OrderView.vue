<script setup>
import { RouterLink, RouterView } from "vue-router";
import Cart from "../components/Cart.vue";
import { useCounterStore } from "@/stores/counter.js";

const counterStore = useCounterStore();
</script>
<template>
  <div class="row menu">
    <p class="col-12 menu__title">{{ counterStore.storeName }}</p>
    <p class="col-12 menu__name">{{ `訂購人-${counterStore.name}` }}</p>
    <div class="col-12 col-lg-2">
      <div class="row gx-0">
        <div
          class="col-4 col-lg-12 menu__item"
          v-for="elememt in counterStore.menuTypeArray"
        >
          <RouterLink :to="'/order/' + elememt" class="menu__link">
            {{ elememt }}
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="col-12 col-lg-8">
      <RouterView />
    </div>
    <div class="col-12 col-lg-2">
      <Cart />
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu {
  &__item {
    // padding: 10px;
    text-align: center;
    background-color: #60c48f;
    border: 1px solid white;
  }
  &__link {
    color: white;
    text-decoration: none;
    display: block;
    padding: 10px;
  }
  &__title {
    text-align: center;
    font-size: 32px;
    margin: 0;
  }
  &__name {
    text-align: center;
    font-size: 32px;
    margin-bottom: 30px;
  }
}
@media (min-width: 1024px) {
}
</style>
