<template>
  <div class="modal-overlay">
    <div class="modal">
      <h3>Agregar Contador</h3>

      <CustomInput
        id="agregar"
        v-model="nombre"
        label="Nombre del contador"
        type="text"
        ref="inputNombre"
      />
      <div class="modal-action">
        <button class="btn" :disabled="!nombreValido" @click="confirmar">
          Agregar
        </button>
        <button class="btn btn-danger" @click="$emit('cerrar')">
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import { useContadoresStore } from "../stores/contadores";
import CustomInput from "../../components/CustomInput.vue";

const store = useContadoresStore();
const nombre = ref("");
const nombreValido = computed(() => nombre.value.trim() !== "");

// Ref al CustomInput
const inputNombre = ref(null);

onMounted(async () => {
  // Espera a que el DOM esté listo
  await nextTick();
  // Si CustomInput expone un input con .focus()
  if (inputNombre.value?.focus) {
    inputNombre.value.focus();
  } else {
    // Alternativa: buscar input interno
    const el = inputNombre.value?.$el?.querySelector("input");
    if (el) el.focus();
  }
});

const emit = defineEmits(["cerrar"]);

function confirmar() {
  store.agregar({ id: Date.now(), nombre: nombre.value, valor: 0 });
  nombre.value = "";
  emit("cerrar");
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  width: 400px;
}
.modal-action {
  display: flex;
  justify-content: end;
}
h3 {
  margin: 0 0 1.7rem;
  padding: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  color: var(--text);
  line-height: normal; /* evita que el navegador agregue espacio extra */
  font-weight: 700;
  font-size: 1.5rem; /* ajusta según convenga */
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
}
</style>
