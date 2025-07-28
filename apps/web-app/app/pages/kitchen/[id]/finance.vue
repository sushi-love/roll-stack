<template>
  <Content>
    <div>{{ data }}</div>
  </Content>
</template>

<script setup lang="ts">
const { params } = useRoute('kitchen-id')
const { data } = useFetch(`/api/kitchen/id/${params.id}/revenue`)
</script>
