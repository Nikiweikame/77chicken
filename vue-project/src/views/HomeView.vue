<script setup>
import { ref, watch } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useCounterStore } from "@/stores/counter.js";

const counterStore = useCounterStore();
const startbtn = ref(true);
function newStart() {
  counterStore.setname(counterStore.name);
  startbtn.value = !startbtn.value;
}
const newSet = ref(true);
const selected = ref("");
function updateMenu(menu) {
  counterStore.chooses = menu;
  counterStore.setMenu(menu);
  counterStore.deleteId = counterStore.chooseArrayDeleteId[menu];
}
function deleteMenu(id) {
  counterStore.loading();
  selected.value = "";
  counterStore.deleteMenu(id);
}

const data = ref("");
const time = ref("");
function setDeadline(data, time) {
  counterStore.loading();
  const dataArray = [...data.split("-"), ...time.split(":")];
  // console.log(data, time, dataArray);
  const content = {
    年: Number(dataArray[0]),
    月: Number(dataArray[1]),
    日: Number(dataArray[2]),
    時: Number(dataArray[3]),
    分: Number(dataArray[4]),
  };
  counterStore.setdeadline(content);
}
function nowTime() {
  // 取得今天的日期
  const now = new Date();

  // 將預設日期設定為今天的日期
  const today = now.toISOString().split("T")[0];
  const hours = String(now.getHours() + 1).padStart(2, "0");
  data.value = today;
  time.value = `${hours}:00`;
}
function startOrder(selected, type, Object, data, time) {
  counterStore.loading();
  setDeadline(data, time);
  makeOrderstartOrder(selected, type, Object);
}
function makeOrderstartOrder(selected, type, Object) {
  counterStore.loading();
  const content = { Name: selected };
  let count;
  // console.log(selected, type, Object, data, time);
  for (let i of type) {
    count = count === undefined ? 0 : ++count;
    // console.log(count,i)
    content[count] = `--${i}--`;
    for (let j of Object[i]) {
      count++;
      content[count] = `${j[0]}+-+${j[1]}`;
    }
  }
  counterStore.startOrder(content);
  // startbtn.value = true;
  newSet.value = true;
}
watch(selected, nowTime);
</script>

<template>
  <div class="start">
    <form @submit.prevent="newStart" class="start-login" v-if="startbtn">
      <input
        type="text"
        class="mb-3"
        v-model="counterStore.name"
        placeholder="請輸入暱稱"
        required
      />
      <button type="submit">登入</button>
      <div class="start__btn-group"></div>
    </form>
    <div v-if="!startbtn" class="p-3">
      <div class="start__btn-group row gy-3" v-if="newSet">
        <p class="start__title col-12">{{ `歡迎，${counterStore.name}` }}</p>
        <p
          class="start__new-set col-12 col-lg-2"
          @click="newSet = !newSet"
          v-if="counterStore.countdown === '訂購時間已截止'"
        >
          團購發起
        </p>
        <RouterLink v-if="counterStore.countdown !== '訂購時間已截止'"
          type="submit"
          class="col-5 col-lg-2"
          :to="'/order/' + counterStore.menuTypeArray[0]"
          >加入團購</RouterLink
        >
        <RouterLink type="submit" class="col-5 col-lg-2" to="/delete"
          >查看訂單</RouterLink
        >
      </div>
      <div v-if="!newSet" class="row gy-3 gx-0 justify-content-center">
        <div class="start__select-title col-6 col-lg-3">請選擇菜單:</div>
        <select class="start__select col-6 col-lg-3" v-model="selected">
          <option disabled value="">請選擇菜單</option>
          <option v-for="element in counterStore.chooseArray">
            {{ element }}
          </option>
        </select>
        <div v-if="selected !== ''">
          <div v-for="element in counterStore.optionObject[selected][0]">
            <p class="start__type-title">
              {{ element }}
            </p>
            <div
              class="start__type-container"
              v-for="e in counterStore?.optionObject[selected][1][element]"
            >
              <div>{{ e[0] }}</div>
              <div>{{ e[1] }}</div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <form
            @submit.prevent="
              startOrder(
                selected,
                counterStore.optionObject[selected][0],
                counterStore?.optionObject[selected][1],
                data,
                time
              )
            "
          >
            <div class="row g-3 start__setMenu justify-content-center">
              <div class="start__set-date py-1 col-12" v-if="selected !== ''">
                <input
                  class="start__date"
                  type="date"
                  v-model="data"
                  required
                />
                <input
                  class="start__time"
                  type="time"
                  v-model="time"
                  required
                />
              </div>
              <div class="col-6 col-lg-3">
                <RouterLink
                  class="start__setMenu-btn"
                  @click="updateMenu('')"
                  to="/update"
                  >新增菜單</RouterLink
                >
              </div>
              <div class="col-6 col-lg-3" v-if="selected !== ''">
                <RouterLink
                  class="start__setMenu-btn"
                  @click="updateMenu(selected)"
                  to="/update"
                  >修改菜單</RouterLink
                >
              </div>
              <div class="col-6 col-lg-3" v-if="selected !== ''">
                <span
                  class="start__setMenu-btn"
                  @click="
                    deleteMenu(counterStore.chooseArrayDeleteId[selected])
                  "
                  >刪除菜單</span
                >
              </div>
              <div class="col-6 col-lg-3" v-if="selected !== ''">
                <button class="start__setMenu-btn start__setMenu-btn--color">
                  決定菜單
                </button>
              </div>
            </div>
            <!-- <button>設定期限</button> -->
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.start {
  text-align: center;
  &__title {
    text-align: center;
    font-size: 30px;
  }
  &__btn-group {
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    a {
      color: #fff;
      background-color: #60c48f;
      padding: 10px;
      text-decoration: none;
    }
  }
  &__new-set {
    font-size: 20px;
    color: #fff;
    background-color: #60c48f;
    padding: 10px;
    margin-bottom: 0;
  }
  &__type {
    &-title {
      font-size: 20px;
      border: 1px solid #000;
      margin: 0;
    }
    &-container {
      display: grid;
      grid-template-columns: 3fr 1fr;
      font-size: 18px;
      > div {
        border: 1px solid #000;
      }
    }
  }
  &__select {
    &-title {
      text-align-last: justify;
      padding: 0 16px;
    }
  }
  &__setMenu {
    &-btn {
      display: block;
      font-size: 16px;
      padding: 10px;
      color: #fff;
      background-color: #60c48f;
      text-decoration: none;
      &--color {
        background-color: red;
        border: 0;
        width: 100%;
      }
    }
  }
  &__date {
    font-size: 18px;
    padding: 10px;
    margin: 5px;
  }
  &__time {
    font-size: 18px;
    padding: 10px;
    margin: 5px;
  }
}

@media (min-width: 1024px) {
  .start {
    &__btn-group {
      justify-content: space-around;
    }

    &__select {
      font-size: 24px;
      &-title {
        font-size: 24px;
      }
    }
  }
}
</style>
