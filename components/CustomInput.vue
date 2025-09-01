<script setup>
import { ref, computed, onMounted } from "vue";

const props = defineProps({
  id: String,
  modelValue: [String, Number],
  label: String,
  placeholder: String,
  type: { type: String, default: "text" },
  error: String,
  disabled: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue"]);

const inputId = ref(props.id || null);
const focused = ref(false);

onMounted(() => {
  if (!inputId.value) {
    inputId.value = `input-${Math.random().toString(36).substr(2, 9)}`;
  }
});

const hasValue = computed(() => {
  return (
    props.modelValue !== "" &&
    props.modelValue !== null &&
    props.modelValue !== undefined
  );
});

function updateValue(event) {
  emit("update:modelValue", event.target.value);
}
</script>

<template>
  <div class="custom-input">
    <input
      :id="inputId"
      :type="props.type"
      :placeholder="props.placeholder || ' '"
      :value="props.modelValue"
      :disabled="props.disabled"
      @input="updateValue"
      @focus="focused = true"
      @blur="focused = false"
      maxlength="20"
    />
    <label :for="inputId" :class="{ active: focused || hasValue }">
      {{ props.label }}
    </label>
    <span v-if="props.error" class="error">{{ props.error }}</span>
  </div>
</template>

<style scoped src="./style.css"></style>
