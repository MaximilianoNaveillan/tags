<template>
  <CustomInput
    id="mayor"
    v-model.number="mayor"
    label="Mayor que"
    type="number"
  />
  <CustomInput
    id="menor"
    v-model.number="menor"
    label="Menor que"
    type="number"
  />

  <!-- Solo mostrar botón limpiar si hay algún filtro -->
  <button
    v-if="filtrando"
    class="btn btn-danger"
    @click="limpiarFiltro"
    title="Limpiar"
  >
    <!-- ícono de basurero -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  </button>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useContadoresStore } from "../../stores/contadores";
import CustomInput from "../../components/CustomInput.vue";

const store = useContadoresStore();
const mayor = ref(null);
const menor = ref(null);

// Computed: true si hay algún filtro activo
const filtrando = computed(() => mayor.value !== null || menor.value !== null);

// Watchers para filtrar automáticamente al cambiar los valores
watch([mayor, menor], ([nuevoMayor, nuevoMenor]) => {
  if (nuevoMayor !== null) {
    store.setFiltros({ tipo: "mayor", valor: nuevoMayor });
  } else if (nuevoMenor !== null) {
    store.setFiltros({ tipo: "menor", valor: nuevoMenor });
  } else {
    store.setFiltros({ tipo: null, valor: null });
  }
});

function limpiarFiltro() {
  mayor.value = null;
  menor.value = null;
  store.setFiltros({ tipo: null, valor: null });
}
</script>

<style scoped>
button {
  margin-top: -5px;
  line-height: 1rem;
  padding: 0.5rem 1rem;
}
</style>
