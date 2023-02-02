<template>
  <div class="input-wrapper">
    <input
      v-model="stringInput"
      class="input"
      type="text"
      :placeholder="placeholder"
      @focus="emits('focusInput')"
      @blur="blurInput"
      @input="emits('stringInput', stringInput)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'

const stringInput = ref<string>('')
const props = defineProps({
  placeholder: {
    type: String,
    required: true
  }
})
const { placeholder } = toRefs(props)
const emits = defineEmits<{
  (e: 'stringInput', string: string): void
  (e: 'focusInput'): void
  (e: 'blurInput'): void
}>()

function blurInput() {
  stringInput.value = ''
  emits('blurInput')
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
  width: 250px;

  &::placeholder {
    color: variables.$color-neutral__greige;
    font-style: italic;
  }
}
</style>
