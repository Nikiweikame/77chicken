<script setup>
import { ref,onMounted } from "vue";
// const now = new Date();
const data = ref("");
const time = ref("");
function setDeadline(data, time) {
  counterStore.loading();
  const dataArray = [...data.split("-"), ...time.split(":")];
  console.log(data, time, dataArray);
}

onMounted(() => {
      // 取得今天的日期
      const now = new Date();

      // 將預設日期設定為今天的日期
      const today = now.toISOString().split("T")[0];
      const hours = String(now.getHours()+1).padStart(2, '0');
      data.value = today;
      time.value=`${hours}:00`
    });
</script>
<template>
  <form @submit.prevent="setDeadline(data, time)">
    <input type="date" v-model="data" />
    <input type="time" v-model="time" />
    <button>設定期限</button>
  </form>
</template>

<style scoped lang="scss">
@media (min-width: 1024px) {
}
</style>
