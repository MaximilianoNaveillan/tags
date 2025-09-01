<template>
  <!-- Header principal con controles -->
  <Header @ordenar="ordenarContadores" @filtrar="filtrarContadores" />

  <main>
    <div class="main-container">
      <div class="main-container-action">
        <div class="main-container-action-search">
          <CustomInput
            id="buscar"
            v-model="store.busqueda"
            label="Buscar contador..."
            type="text"
          />
        </div>
        <div>
          <button
            class="btn"
            @click="modalVisible = true"
            :disabled="store.contadores.length >= 20"
          >
            Agregar Contador
          </button>
        </div>
      </div>
      <ListadorDeContadores
        :contadores="store.contadoresFiltrados"
        @actualizar="actualizarContador"
        @eliminar="eliminarContador"
      />
    </div>
  </main>

  <!-- Footer -->
  <Footer :total="store.sumaTotal" />

  <!-- Modal agregar contador -->
  <ModalAgregarContador
    v-if="modalVisible"
    @agregar="agregarContador"
    @cerrar="modalVisible = false"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useContadoresStore } from "../stores/contadores";

import Header from "./Header";
import Footer from "./Footer";
import ListadorDeContadores from "./ListadoDeContadores";
import ModalAgregarContador from "./ModalAgregarContador.vue";
import CustomInput from "../components/CustomInput.vue";

const store = useContadoresStore();
const modalVisible = ref(false);

onMounted(() => {
  store.cargarDesdeStorage();
});

// Funciones para acciones
function agregarContador(contador) {
  store.agregar(contador);
}

function eliminarContador(id) {
  store.eliminar(id);
}

function actualizarContador({ id, valor }) {
  store.actualizar(id, valor);
}

function filtrarContadores(filtros) {
  store.setFiltros(filtros);
}

function ordenarContadores(value) {
  const [prop, dir] = value.split("-");
  store.ordenar(prop, dir);
}
</script>

<style scoped>
.main-container {
  min-width: 800px;
  max-width: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  box-sizing: border-box;
}

.main-container-action {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end; /* mueve el botón a la derecha */
  width: 100%;
  border-bottom: 1px solid var(--text-light);
  padding: 1rem;
}

.main-container-action-search {
  padding: 0.27rem 0 0;
}

@media (max-width: 800px) {
  .main-container {
    min-width: 100%;
    padding: 0.5rem;
  }
  .main-container-action {
    display: flex;

    justify-content: flex-end; /* mueve el botón a la derecha */
    width: 100%;
    border-bottom: 1px solid var(--text-light);
    padding: 1rem 0;
  }
  .main-container-action button {
    font-size: 14px;
    padding: 0.75rem;
  }
}

@media (max-width: 400px) {
  .main-container-action {
    display: flex;
    justify-content: center; /* mueve el botón a la derecha */
    width: 100%;
    border-bottom: 1px solid var(--text-light);
    padding: 1rem 0;
  }
  .main-container-action button {
    font-size: 14px;
    padding: 0.75rem;
  }
}
</style>
