<template>
  <nav>
    <div class="controls">
      <h1>Contadores</h1>

      <!-- Botón para abrir drawer solo en pantallas pequeñas -->
      <button class="drawer-toggle" @click="drawerOpen = !drawerOpen">☰</button>

      <!-- Overlay solo visible en mobile cuando drawer está abierto -->
      <div
        v-show="drawerOpen"
        class="container-control-items"
        @click="drawerOpen = false"
      ></div>

      <!-- Panel de controles -->
      <div class="controls-items" :class="{ open: drawerOpen }" @click.stop>
        <OrdenarContadores @ordenar="emitOrdenar" />
        <FiltrarContadores />
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import OrdenarContadores from "./OrdenarContadores.vue";
import FiltrarContadores from "./FiltrarContadores.vue";

const drawerOpen = ref(false);
const emit = defineEmits(["ordenar", "filtrar"]);

function emitOrdenar(value) {
  emit("ordenar", value);
}

function emitFiltrar(filtros) {
  emit("filtrar", filtros);
}
</script>

<style scoped>
.controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;
}

/* Título */
.controls h1 {
  flex: 1;
  margin: 0;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  line-height: 2.76rem;
  color: rgba(255, 255, 255, 0.8);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Botón drawer solo mobile */
.drawer-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  font-weight: bold;
}

/* Controles (desktop) */
.controls-items {
  display: flex;
  align-items: center;
  gap: 2rem; /* espacio entre Ordenar y Filtrar */
  transition: transform 0.3s ease, opacity 0.3s ease;
}

/* Media queries para mobile (<1150px) */
@media (max-width: 1150px) {
  .drawer-toggle {
    display: block;
  }

  .container-control-items {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .controls-items {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 250px;
    background-color: var(--primary);
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem 1rem;
    transform: translateX(100%);
    opacity: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .controls-items.open {
    transform: translateX(0);
    opacity: 1;
  }

  .controls-items > * {
    margin-bottom: 1.5rem; /* separación vertical en drawer */
  }
}
</style>
