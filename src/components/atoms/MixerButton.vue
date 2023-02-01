<template>
  <button @click="emits('emitClick')">{{ props.text }}</button>
</template>

<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: true
  }
})
const emits = defineEmits<{
  (e: 'emitClick'): void
}>()
</script>

<style lang="scss" scoped>
@use '@/style/variables.scss';

button {
  aspect-ratio: 1 / 1;
  background: radial-gradient(circle at top right, rgba(200, 200, 200, 0.355) 1%, #1313139e 70%),
    url('@/assets/TextureDarkLarge.jpg');
  border-radius: 50%;

  border: 2px solid rgb(15, 15, 15);
  color: white;
  font-size: variables.$font-size-label;
  font-weight: 500;
  padding: variables.$padding-large;
  position: relative;
  transition: all 0.2s;

  &::after {
    border-radius: 50%;
    border: 2px solid variables.$color-neutral__greige-light;
    content: '';
    display: block;
    height: 120%;
    width: 120%;
    position: absolute;
    top: -10%;
    left: -10%;
  }

  &:active {
    background: radial-gradient(circle at top right, rgba(200, 200, 200, 0.27) 1%, #1313139e 70%),
      url('@/assets/TextureDarkLarge.jpg');
    text-shadow: variables.$color__green 0 0 4px;
  }
  &:hover {
    text-shadow: variables.$color__green 0 0 4px;
  }
  &:focus-visible {
    text-shadow: variables.$color__green 0 0 4px;
    &::after {
      outline: 3px solid variables.$color__green-light;
    }
  }
}
</style>
