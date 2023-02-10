<template>
  <button
    class="button-border"
    :class="secondary ? 'button-border__secondary' : 'button-border__primary'"
    @click="emits('onClick')"
  >
    {{ text }}
  </button>
</template>
<script setup lang="ts">
import { toRefs } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  secondary: {
    type: Boolean,
    default: false
  }
})
const { text } = toRefs(props)
const emits = defineEmits<{
  (e: 'onClick'): void
}>()
</script>
<style lang="scss">
@use '@/style/variables.scss';

.button-border {
  background-color: transparent;
  border-radius: variables.$border-radius-small;
  border: 1px solid;
  line-height: 1;
  text-align: center;
  overflow: hidden;
  width: fit-content;
  @include variables.font-size-paragraph;

  &__primary {
    color: variables.$color__green;
    font-weight: 500;
    padding: variables.$padding-small variables.$padding-medium;
    text-transform: uppercase;
    &::after {
      background-color: variables.$color__green-light;
    }
  }
  &__secondary {
    color: variables.$color__yellow-light;
    font-weight: 400;
    padding: variables.$padding-x-small variables.$padding-small;
    text-transform: lowercase;
    &::after {
      background-color: variables.$color__yellow-light;
    }
  }
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
    border-color: transparent;
    border-radius: 50%;
    transform: scale(0, 0);
    opacity: 0;
    z-index: -1;
    transition: all 0.6s;
  }
}
</style>
