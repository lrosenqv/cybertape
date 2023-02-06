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
  background-color: transparent;
  border-radius: variables.$border-radius-x-small;
  border: 1px solid variables.$color__green;
  color: variables.$color__green;
  font-weight: 400;
  text-transform: uppercase;
  overflow: hidden;
  padding: variables.$padding-x-small variables.$padding-medium;
  position: relative;

  @include variables.font-size-paragraph;

  &:active {
    transform: translateY(3px);
  }
  &:hover {
    border-color: transparent;
    color: variables.$color-neutral__dark;
    &::after {
      opacity: 1;
      transform: scale(1, 1);
    }
  }

  &::after {
    aspect-ratio: 1 / 1;
    content: '';
    position: absolute;
    top: -200%;
    left: -50%;
    right: -50%;
    background-color: variables.$color__green-light;
    border-color: transparent;
    border-radius: 50%;
    transform: scale(0, 0);
    opacity: 0;
    z-index: -1;
    transition: all 0.6s;
  }
}
</style>
