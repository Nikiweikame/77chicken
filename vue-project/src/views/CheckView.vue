<script setup>
import { ref, onMounted } from "vue";
import { useCounterStore } from "@/stores/counter.js";

const counterStore = useCounterStore();
const checkStatus = ref([]);
</script>
<template>
  <div class="check">
    <div>
      <p class="check__title">未付款名單</p>
      <div class="check__name-title">姓名</div>
      <div class="check__order-data-title">訂單資訊</div>
      <div class="check__options-title">選項</div>
      <div
        class="check__content"
        v-for="(element, index) in counterStore.orderList"
      >
        <div class="check__name" v-if="element[3]">{{ element[0] }}</div>
        <div
          class="check__order-data"
          v-html="element[1]"
          v-if="element[3]"
        ></div>
        <div class="check__options" v-if="element[3]">
          <button @click="deleteOrder((element[3] = false))">
            付款
          </button>
        </div>
      </div>
    </div>
    <div>
      <p class="check__title">已付款名單</p>
      <div class="check__name-title">姓名</div>
      <div class="check__order-data-title">訂單資訊</div>
      <div class="check__options-title">選項</div>
      <div
        class="check__content"
        v-for="(element, index) in counterStore.orderList"
      >
        <div class="check__name" v-if="!element[3]">{{ element[0] }}</div>
        <div class="check__order-data" v-html="element[1]" v-if="!element[3]"></div>
        <div class="check__options" v-if="!element[3]">
          <button @click="deleteOrder((element[3] = true))">未付款</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.check {
  > div {
    display: grid;
    grid-template-rows: 1fr;
    // grid-template-areas: "a b b c";
    grid-template-columns: 1fr 2fr 1fr;
    text-align: center;
    + div{
      margin-top: 30px;
    }
  }
  &__title {
    grid-column: 1 / 5;
    font-size: 32px;
  }
  &__name-title {
    background-color: #34495e;
    color: #fff;
    border: 1px solid #fff;
    // grid-area: a;
  }
  &__order-data-title {
    background-color: #34495e;
    color: #fff;
    border: 1px solid #fff;
    // grid-area: b;
  }
  &__options-title {
    background-color: #34495e;
    color: #fff;
    border: 1px solid #fff;
    // grid-area: c;
  }
  &__content {
    grid-column: 1 / 5;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    background-color: #60c48f;
    color: #fff;
    > * {
      border: 1px solid #fff;
    }
  }
  &__name {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
@media (min-width: 1024px) {
}
</style>
