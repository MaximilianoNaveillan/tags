<template>
  <div class="container">
    <OrdenarContadores @ordenar="ordenar" />
    <FiltrarContadores @filtrar="filtrar" />
    <button @click="mostrarModal = true" :disabled="maxContadores">
      Agregar Contador
    </button>

    <ListadorDeContadores
      :contadores="contadores"
      @actualizar="actualizarContador"
      @eliminar="eliminarContador"
    />

    <SumaDeContadores :total="sumaTotal" />

    <ModalAgregarContador
      v-if="mostrarModal"
      @agregar="agregarContador"
      @cerrar="mostrarModal = false"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";

import OrdenarContadores from "~/components/OrdenarContadores.vue";
import FiltrarContadores from "~/components/FiltrarContadores.vue";
import ListadorDeContadores from "~/components/ListadorDeContadores.vue";
import ModalAgregarContador from "~/components/ModalAgregarContador.vue";
import SumaDeContadores from "~/components/SumaDeContadores.vue";

const store = useStore();
const mostrarModal = ref(false);

const contadores = computed(() => store.getters.contadoresFiltrados);
const sumaTotal = computed(() => store.getters.sumaTotal);
const maxContadores = computed(() => store.state.contadores.length >= 20);

function agregarContador(contador) {
  store.commit("agregarContador", contador);
}

function eliminarContador(id) {
  store.commit("eliminarContador", id);
}

function actualizarContador({ id, valor }) {
  store.commit("actualizarContador", { id, valor });
}

function ordenar(criterio) {
  // Implementa lógica de ordenamiento por nombre o valor
}

function filtrar(filtro) {
  store.commit("setFiltros", filtro);
}
</script>
