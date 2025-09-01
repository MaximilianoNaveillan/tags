<template>
  <CustomSelect
    v-model="orden"
    label="Ordenar por"
    :options="[
      { value: 'nombre-asc', label: 'Nombre ↑' },
      { value: 'nombre-desc', label: 'Nombre ↓' },
      { value: 'valor-asc', label: 'Valor ↑' },
      { value: 'valor-desc', label: 'Valor ↓' },
    ]"
    @ordenar="cambiarOrden"
  />
</template>

<script setup>
import { ref } from "vue";
import { useContadoresStore } from "../../stores/contadores";
import CustomSelect from "../../components/CustomSelect.vue";

const store = useContadoresStore();
const orden = ref("nombre-asc");

function cambiarOrden(valor) {
  const [prop, dir] = valor.split("-");
  store.ordenar(prop, dir);
}
</script>
