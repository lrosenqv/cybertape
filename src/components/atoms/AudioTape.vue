<template>
  <div class="audio-tape">
    <div class="audio-tape-front">{{ item.name }}</div>
  </div>
</template>

<script setup lang="ts">
import type { ICategoryItem } from '@/models/ICategory'
import type { PropType } from 'vue'
import { toRefs } from 'vue'

const props = defineProps({
  item: {
    type: Object as PropType<ICategoryItem>,
    required: true
  }
})
const { item } = toRefs(props)
</script>

<style lang="scss" scoped>
@use '@/style/variables.scss';

.audio-tape {
  background: variables.$color-neutral__dark;
  border-right: 1px solid variables.$color-neutral__dark;
  border-bottom: 1px solid variables.$color-neutral__dark;
  color: variables.$color-neutral__light;
  cursor: pointer;
  display: block;
  height: fit-content;
  line-height: 2.5em;
  outline: none;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: all 0.25s linear;
  width: 100%;
  z-index: 1;

  &:hover {
    background: variables.$color__green;
    border-color: variables.$color__green;
    color: variables.$color-neutral__dark;
    transform: translate(-0.45em, -0.45em);
    transition: all 0.25s linear;

    &:before,
    &:after {
      transition: all 0.25s linear;
    }

    &:before {
      background: variables.$color__green-dark;
      border-color: variables.$color__green-dark;
      right: -1.05em;
      top: 0.49em;
      width: 1em;
    }

    &:after {
      background: darken(variables.$color__green-dark, 10%);
      border-color: darken(variables.$color__green-dark, 10%);
      height: 1em;
      bottom: -1.04em;
      right: -0.6em;
    }
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    transition: all 0.25s linear;
    border: 1px solid;
  }

  &:after {
    height: 10px;
    background: darken(variables.$color-neutral__dark, 50%);
    border-color: darken(variables.$color-neutral__dark, 50%);
    bottom: -0.65em;
    right: -0.4em;
    width: 101%;
    transform: skew(45deg);
    z-index: 2;
  }

  &:before {
    background: darken(variables.$color-neutral__dark, 5%);
    border-color: darken(variables.$color-neutral__dark, 5%);
    height: 102%;
    right: -0.67em;
    width: 10px;
    top: 0.3em;
    transform: skewY(45deg);
    z-index: 3;
  }
}
</style>
