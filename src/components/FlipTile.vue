<template>
  <article class="flip-tile">
    <div class="flip-tile-wrapper">
      <header class="flip-tile-front" :class="{ 'invert-style-front': invertStyle }">
        <h3 class="flip-tile-front__title">{{ title }}</h3>
        <p class="flip-tile-front__subtitle">{{ subtitle }}</p>
      </header>
      <div class="flip-tile-back" :class="{ 'invert-style-back': invertStyle }">
        <p class="flip-tile-back__description">{{ text }}</p>
        <RouterLink :to="link">go {{ title }}</RouterLink>
      </div>
    </div>
  </article>
</template>
<script setup lang="ts">
import { toRefs } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: false,
    default: ''
  },
  text: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: false,
    default: ''
  },
  invertStyle: {
    type: Boolean,
    required: false,
    default: false
  }
})

const { title, subtitle, text } = toRefs(props)
</script>

<style lang="scss" scoped>
@use '@/style/variables.scss';

.flip-tile {
  background-color: transparent;
  height: 170px;
  perspective: 1000px;
  width: 320px;

  &-wrapper {
    height: 100%;
    position: relative;
    transition: transform 0.5s;
    transform-style: preserve-3d;
    width: 100%;
  }

  &:hover &-wrapper {
    transform: rotateX(180deg);
  }

  &-front,
  &-back {
    backface-visibility: hidden;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: variables.$padding-x-large variables.$padding-medium;
    position: absolute;
    width: 100%;
    -webkit-backface-visibility: hidden;
  }

  &-front {
    border: 2px solid variables.$color-neutral__light;
    h3 {
      @include variables.font-size-title;
    }
    p {
      @include variables.font-size-label;
    }
    &.invert-style-front {
      color: variables.$color__blue;
      background-color: variables.$color-neutral__light;
    }
  }
  &-back {
    justify-content: space-between;
    background-color: variables.$color-neutral__light;
    color: variables.$color__blue-dark;
    transform: rotateX(180deg);
    a {
      color: variables.$color__green-dark;
      text-decoration: underline;
      &:hover {
        color: variables.$color__green;
      }
    }
    &.invert-style-back {
      color: white;
      background-color: variables.$color__blue-dark;

      a {
        color: variables.$color__green-light;
        &:hover {
          color: variables.$color__green;
        }
      }
    }
  }
}
</style>
