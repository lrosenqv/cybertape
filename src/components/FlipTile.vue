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
  height: 130px;
  perspective: 1000px;
  width: 220px;

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
    padding: variables.$padding-large variables.$padding-large;
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
      color: variables.$color__green;
      text-decoration: underline;
      font-weight: 700;
      @include variables.font-size-paragraph;
      &:hover {
        color: variables.$color__green-dark;
      }
    }
    &.invert-style-back {
      color: white;
      background-color: variables.$color__blue-dark;
      a {
        color: variables.$color__green;
        &:hover {
          color: variables.$color__green-light;
        }
      }
    }
  }
  @media screen and (min-width: 768px) {
    height: 170px;
    width: 320px;
  }
}
</style>
