<script setup>
import { ref } from "vue";
import { useCounterStore } from "@/stores/counter.js";

const counterStore = useCounterStore();
function deleteOrder(id) {
  counterStore.loading();
  console.log(id);
  counterStore.deleteOrder([id]);
}
</script>
<template>
  <div class="orderList">
    <p class="orderList__title">
      {{ `${counterStore.storeName}-${counterStore.totalMeney}元` }}
    </p>
    <div class="orderList__name-title">姓名</div>
    <div class="orderList__order-data-title">訂單資訊</div>
    <div class="orderList__options-title">選項</div>
    <div
      class="orderList__content"
      v-for="(element, index) in counterStore.orderList"
    >
      <div class="orderList__name">{{ element[0] }}</div>
      <div class="orderList__order-data" v-html="element[1]"></div>
      <div class="orderList__options">
        <button
          @click="deleteOrder(element[2])"
          v-if="element[0] === counterStore.name"
        >
          刪除
        </button>
      </div>
    </div>
  </div>
  <div class="other-list">
    <div class="other-list__type-title">類別</div>
    <div class="other-list__name-title">名字</div>
    <div class="other-list__count-title">數量</div>
    <div
      class="other-list__content"
      v-for="(element, index) in counterStore.otherOrderList[0]"
    >
      <div class="other-list__type">{{ element.split("+-+")[0] }}</div>
      <div class="other-list__name">
        <div v-for="name in counterStore.otherOrderList[1][element]">
          <div class="other-list__name-item">
            {{ name }}
          </div>
        </div>
      </div>
      <div class="other-list__count">
        {{ counterStore.otherOrderList[1][element].length }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.orderList {
  display: grid;
  grid-template-rows: 1fr;
  // grid-template-areas: "a b b c";
  grid-template-columns: 1fr 2fr 1fr;
  text-align: center;
  margin-bottom: 30px;
  &__title {
    font-size: 30px;
    grid-column: 1 / 5;
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
.other-list {
  display: grid;
  grid-template-rows: 1fr;
  // grid-template-areas: "a b b c";
  grid-template-columns: 2fr 3fr 1fr;
  text-align: center;
  &__type {
    display: flex;
    align-items: center;
    justify-content: center;
    &-title {
      background-color: #34495e;
      color: #fff;
      border: 1px solid #fff;
    }
  }
  &__name {
    display: flex;
    flex-wrap: wrap;
    &-title {
      background-color: #34495e;
      color: #fff;
      border: 1px solid #fff;
    }
    &-item {
      margin: 3px;
      padding: 2px;
      background-color: #c46095;
    }
  }
  &__count {
    display: flex;
    align-items: center;
    justify-content: center;
    &-title {
      background-color: #34495e;
      color: #fff;
      border: 1px solid #fff;
    }
  }
  &__content {
    grid-column: 1 / 5;
    display: grid;
    grid-template-columns: 2fr 3fr 1fr;
    background-color: #60c48f;
    color: #fff;

    > * {
      border: 1px solid #fff;
    }
  }
  // &__type {
  // }
}
@media (min-width: 1024px) {
}
</style>
