<template>
  <div class="suma">
    <strong>Suma total de contadores: {{ total }}</strong>
  </div>
</template>

<script setup>
defineProps({ total: Number });
</script>

<style scoped>
.suma {
  font-size: 1.2rem;
}
</style>
