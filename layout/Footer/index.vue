<template>
  <footer>
    <SumaDeContadores :total="total" />
  </footer>
</template>

<script setup>
import { computed } from "vue";
import { useContadoresStore } from "../../stores/contadores";
import SumaDeContadores from "./SumaDeContadores.vue";

const store = useContadoresStore();
const total = computed(() => store.sumaTotal);
</script>
