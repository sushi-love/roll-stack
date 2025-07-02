<template>
  <div class="block">
    <input v-model="state.search" class="input">

    <div>
      <div v-for="item in data" :key="item.id">
        {{ item.streetName }} {{ item.streetType }} {{ item.houseNumber }} {{ item.houseId }}

        <a :href="`https://2gis.ru/kaliningrad/search/${item.streetName}, ${item.houseNumber}`" target="_blank">
          Показать
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const state = reactive({
  search: '',
  parentId: '634949',
})

const { data } = useFetch('/api/address', {
  method: 'post',
  body: state,
})
</script>

<style scoped>
.block {
  max-width: 420px;
  margin: 0 auto;
}

.input {
  margin-top: 32px;
  width: 100%;
  margin-bottom: 16px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 32px;
}
</style>
