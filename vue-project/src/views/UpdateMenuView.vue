<script setup>
import { ref } from "vue";
import { useCounterStore } from "@/stores/counter.js";

const counterStore = useCounterStore();
function plusMeals(id) {
  // console.log(id, counterStore.chooseMenu[id]);
  if (counterStore.chooseMenu[id] === undefined) {
    counterStore.chooseMenu[id] = [];
  }
  counterStore.chooseMenu[id][counterStore.chooseMenu[id].length] = ["", ""];
}
function plusType() {
  counterStore.chooseType[counterStore.chooseType.length] = temp.value;
  temp.value = "";
}
function deletleMeal(index, element) {
  counterStore.chooseMenu[element].splice(index, 1);
}
function deletleType(index, element) {
  counterStore.chooseType.splice(index, 1);
}
const temp = ref("");
function save() {
  counterStore.loading();
  const data = { Name: counterStore.chooses };
  let count;
  for (let i = 0; i < counterStore.chooseType.length; i++) {
    if (count === undefined) {
      count = 0;
    } else {
      count++;
    }
    data[count] = `--${counterStore.chooseType[i]}--`;
    // console.log(count, counterStore.chooseType[i]);
    for (
      let j = 0;
      j < counterStore.chooseMenu[counterStore.chooseType[i]].length;
      j++
    ) {
      count++;
      const mealArray = counterStore.chooseMenu[counterStore.chooseType[i]][j];
      // console.log(count, mealArray[0], mealArray[1]);
      data[count] = `${mealArray[0]}+-+${mealArray[1]}`;
    }
  }
  // console.log(data);
  counterStore.updateMenu(data);
  console.log(counterStore.chooses)
}
function newMeal(index, element, meal) {
  console.log(index, element, meal);
}
// const deleteId = counterStore.chooseArrayDeleteId[counterStore.chooses]
console.log();
function deleteMenu() {
  counterStore.loading();
  if (counterStore.deleteId === "") {
    return;
  }
  console.log("delete");
  counterStore.deleteMenu(counterStore.deleteId);
}
</script>
<template>
  <form @submit.prevent="save" class="update-menu">
    <input
      type="text"
      class="mb-3 update-menu__title"
      v-model="counterStore.chooses"
      placeholder="請輸入菜單名稱"
      required
    />
    <div
      v-for="(element, index) in counterStore.chooseType"
      class="row gx-0 mb-3"
    >
      <div class="col-12 col-lg-3">
        <div class="update-menu__type">
          <input type="text" :value="element" required />
          <div class="update-menu__type-btn">
            <button @click="plusMeals(element)" type="button">新增菜單</button>
            <button @click="deletleType(index)" type="button">刪除</button>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-9">
        <div
          class="update-menu__meal"
          v-for="(meal, index) in counterStore.chooseMenu[element]"
        >
          <input type="text" v-model="meal[0]" required placeholder="餐點" />
          <input type="number" v-model="meal[1]" required placeholder="價錢" />
          <button @click="deletleMeal(index, element)" type="button">
            刪除
          </button>
        </div>
      </div>
    </div>
    <div class="col-12 col-lg-3 mb-3">
      <form @submit.prevent="plusType" class="update-menu__add-type">
        <input
          type="text"
          v-model="temp"
          placeholder="請輸入分類項目"
          required
        />
        <button type="submit">新增分類</button>
      </form>
    </div>
    <div class="update-menu__btn-group">
      <button>另存新檔</button>
      <button @click="deleteMenu()">修改上傳</button>
    </div>
  </form>
</template>

<style scoped lang="scss">
.update-menu {
  text-align: center;
  &__title {
    height: 50px;
    font-size: 20px;
  }
  input {
    border-radius: 0;
    border: 1px solid #000;
    text-align: center;
  }
  &__meal {
    display: grid;
    grid-template-columns: 3fr 1fr 1fr;
    width: 100%;
    input {
      min-width: 30px;
      min-width: -webkit-fill-available;
    }
  }
  &__type {
    display: flex;
    flex-direction: column;
    height: 100%;
    input {
      width: 100%;
      min-height: 60px;
      font-size: 20px;
      flex-grow: 1;
    }
    &-btn {
      button {
        display: inline-block;
        width: 50%;
        flex-grow: 1;
        border: 1px solid #000;
      }
    }
  }
  &__add-type {
    // margin: 30px 0;
    input {
      width: 50%;
    }
    button {
      width: 50%;
      border: 1px solid #000;
    }
  }
  &__btn-group {
    display: flex;
    justify-content: space-between;
  }
}

@media (min-width: 992px) {
  .update-menu__add-type {
    display: flex;
    flex-direction: column;
    // width: 100%;
    input {
      width: 100%;
      height: 60px;
    }
    button {
      width: 100%;
      // border: 1px solid #000;
    }
  }
}
</style>
