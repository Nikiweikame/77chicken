<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useCounterStore } from "@/stores/counter.js";

const counterStore = useCounterStore();
const route = useRoute();
const id = computed(() => route.params.id);
// const counterStore.cartList = ref([]);
</script>
<template>
  <div class="row gx-0">
    <div class="col-12 col-lg-10">
      <div v-for="meal in counterStore.menuMeal[id]" class="meal">
        <div class="meal__name">{{ `${meal[1]} ${meal[2]}元` }}</div>
        <div
          class="meal__plus"
          @click="
            () => {
              meal[3]++;
            }
          "
        >
          +
        </div>
        <div class="meal__count">{{ meal[3] }}</div>
        <div
          class="meal__reduce"
          @click="
            () => {
              meal[3]--;
              if (meal[3] < 0) {
                meal[3] = 0;
              }
            }
          "
        >
          -
        </div>
        <!-- <button type="clear">123</button> -->
        <input
          type="checkbox"
          :id="meal[1]"
          :value="`${meal[0]} ${meal[1]} ${meal[3]} ${meal[2] * meal[3]}`"
          v-model="counterStore.cartList"
          class="checkbox"
        />
        <label :for="meal[1]" @click="123">加入 / 移除</label>
      </div>
    </div>
    <!-- <div class="col-12 col-lg-2">
      <div class="meal__cart-title">購物車:</div>
      <div class="meal__cart">
        <p v-for="element in counterStore.cartList" class="meal__cart-content">
          {{
            element.split(" ")[1] +
            element.split(" ")[2] +
            "份" +
            element.split(" ")[3] +
            "元"
          }}
        </p>
      </div>
      <div class="meal__submit" @click="shootOrder">送出</div>
      <div class="meal__submit" @click="clear">清除</div>
    </div> -->
  </div>
</template>

<style scoped lang="scss">
.meal {
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr 2fr;
  border: 1px solid #fff;
  > * {
    padding: 5px;
    text-align: center;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    + * {
      margin-left: 3px;
    }
  }
  .checkbox {
    display: none;
  }
  &__name {
    background-color: #60c48f;
  }
  &__plus {
    background-color: #60e41f;
    cursor: pointer;
  }
  &__reduce {
    background-color: #306248;
    color: #fff;
    cursor: pointer;
  }
  &__count {
    border: 2px solid #000;
  }
  label {
    border-radius: 50%;
    border: 1px #3982d7 solid;
    background-color: #3982d7;
    color: #fff;
  }
}
@media (min-width: 992px) {
  .meal {
    grid-template-columns: 3fr 1fr 1fr 1fr 2fr 1fr;
  }
}
</style>
