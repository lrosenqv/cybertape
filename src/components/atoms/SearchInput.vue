<template>
  <div class="input-wrapper">
    <input
      :value="modelValue"
      class="input"
      type="text"
      :placeholder="placeholder"
      @focus="emits('focusInput')"
      @input="(e) => onInput(e)"
      @blur="blurInput"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: true
  }
})
const emits = defineEmits<{
  (e: 'update:modelValue', input: string): void
  (e: 'focusInput'): void
}>()

const stringInput = ref<string>('')
const { placeholder, modelValue } = toRefs(props)
function blurInput() {
  stringInput.value = ''
}
function onInput(e: any) {
  const target = e.target as HTMLInputElement
  emits('update:modelValue', target.value)
}
</script>

<style lang="scss" scoped>
@use '@/style/variables.scss';
.input {
  appearance: none;
  background-color: transparent;
  border-radius: variables.$border-radius-small;
  border: 1.5px solid variables.$color-neutral__greige;
  color: variables.$color-neutral__greige-dark;
  font-size: variables.$font-size-paragraph;
  font-weight: 500;
  outline: none;
  padding: variables.$padding-x-small variables.$padding-medium;
  width: 100%;

  &::placeholder {
    color: variables.$color-neutral__greige;
    font-style: italic;
  }
  &:focus {
    border-color: variables.$color-neutral__greige-dark;
    &::placeholder {
      color: transparent;
    }
  }
}
</style>
