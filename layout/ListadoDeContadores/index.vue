<template>
  <Contador
    v-for="c in contadores"
    :key="c.id"
    :contador="c"
    @actualizar="$emit('actualizar', $event)"
    @eliminar="$emit('eliminar', $event)"
  />
</template>

<script setup>
import Contador from "./Contador.vue";

defineProps({
  contadores: Array,
});

const emit = defineEmits(["actualizar", "eliminar"]);
</script>
