<script setup>
import { ref, computed, onMounted, watch } from "vue";

const props = defineProps({
  id: String,
  modelValue: [String, Number],
  label: String,
  error: String,
  disabled: { type: Boolean, default: false },
  options: { type: Array, default: () => [] },
});

const emit = defineEmits(["update:modelValue", "ordenar"]);

const selectId = ref(props.id || null);
const focused = ref(false);
const internalValue = ref(props.modelValue);

onMounted(() => {
  if (!selectId.value) {
    selectId.value = `select-${Math.random().toString(36).substr(2, 9)}`;
  }
});

watch(internalValue, (val) => {
  emit("update:modelValue", val);
  emit("ordenar", val);
});

const hasValue = computed(
  () => internalValue.value !== "" && internalValue.value != null
);
</script>

<template>
  <div class="custom-input">
    <select
      :id="selectId"
      v-model="internalValue"
      :disabled="props.disabled"
      @focus="focused = true"
      @blur="focused = false"
    >
      <option value="" disabled hidden></option>
      <option
        v-for="option in props.options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <label :for="selectId" :class="{ active: focused || hasValue }">
      {{ props.label }}
    </label>
    <span v-if="props.error" class="error">{{ props.error }}</span>
  </div>
</template>

<style scoped src="./style.css"></style>
