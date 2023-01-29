<template>
  <div class="input-wrapper">
    <input
      v-model="stringInput"
      class="input"
      type="text"
      :placeholder="placeholder"
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
}>()
</script>

<style lang="scss" scoped>
@use '@/style/variables.scss';
.input {
  appearance: none;
  background-color: transparent;
  border-radius: variables.$border-radius-small;
  border: 1px solid variables.$color-neutral__light;
  color: variables.$color-neutral__light;
  font-size: variables.$font-size-paragraph;
  font-weight: 500;
  margin-left: variables.$margin-medium;
  outline: none;
  padding: variables.$padding-x-small variables.$padding-medium;

  &::placeholder {
    color: variables.$color-neutral__greige;
    font-style: italic;
  }
}
</style>
