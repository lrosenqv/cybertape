<template>
  <button class="button-primary" @click="emits('onClick')">{{ text }}</button>
</template>
<script setup lang="ts">
import { toRefs } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  }
})
const { text } = toRefs(props)
const emits = defineEmits<{
  (e: 'onClick'): void
}>()
</script>
<style lang="scss" scoped>
@use '@/style/variables.scss';

button {
  color: variables.$color__green;
  background-color: transparent;
  border-radius: variables.$border-radius-small;
  border: 2px solid variables.$color__green;
  font-size: variables.$font-size-paragraph;
  font-weight: 600;
  padding: variables.$padding-x-small variables.$padding-small;
}
</style>
