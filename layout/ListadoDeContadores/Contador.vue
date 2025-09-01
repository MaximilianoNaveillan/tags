<template>
  <div class="contador">
    <div class="contador-title">
      <h4>{{ contador.nombre }}</h4>
    </div>
    <div class="contador-action">
      <button class="btn" @click="restar" :disabled="contador.valor <= 0">
        -
      </button>
      <span>{{ contador.valor }}</span>
      <button class="btn" @click="sumar" :disabled="contador.valor >= 20">
        +
      </button>
      <button class="btn" @click="eliminar">Eliminar</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ contador: Object });
const emit = defineEmits(["actualizar", "eliminar"]);

function sumar() {
  emit("actualizar", {
    id: props.contador.id,
    valor: props.contador.valor + 1,
  });
}
function restar() {
  emit("actualizar", {
    id: props.contador.id,
    valor: props.contador.valor - 1,
  });
}
function eliminar() {
  emit("eliminar", props.contador.id);
}
</script>
<style scoped>
.contador {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  background-color: var(--secondary);
  width: 100%;
  border-radius: 0.5rem;
}
.contador-action {
  margin-right: 0.5rem;
}
.contador-title {
  color: var(--surface);
  padding: 1rem;
}

.contador-action button {
  font-size: 12px;
  padding: 0.65rem;
}
</style>
