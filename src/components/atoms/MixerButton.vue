<template>
  <button
    class="mixer-button"
    :class="size === '_small' ? 'mixer-button_small' : 'mixer-button_medium'"
    @click="emits('emitClick')"
  >
    {{ props.text }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: true
  },
  size: {
    type: String as () => '_small' | '_medium',
    default: '_medium'
  }
})
const emits = defineEmits<{
  (e: 'emitClick'): void
}>()
</script>

<style lang="scss" scoped>
@use '@/style/variables.scss';

.mixer-button {
  aspect-ratio: 1 / 1;
  background: radial-gradient(circle at top right, rgba(200, 200, 200, 0.355) 1%, #1313139e 70%),
    url('@/assets/TextureDarkLarge.jpg');
  border: 2px solid rgb(15, 15, 15);
  border-radius: 50%;
  color: white;
  font-weight: 500;
  padding: variables.$padding-large;
  position: relative;
  width: 70px;
  @include variables.font-size-paragraph;

  &::after {
    border-radius: 50%;
    border: 2px solid variables.$color-neutral__greige;
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

  &_small {
    padding: variables.$padding-x-small;
    width: 55px;
    @include variables.font-size-paragraph__small;
    &::after {
      display: none;
    }
    &:hover {
      text-shadow: variables.$color__red 0 0 4px;
    }
    &:focus-visible {
      outline: 2px solid variables.$color__red-light;
      text-shadow: variables.$color__red 0 0 4px;
    }
  }
}
</style>
