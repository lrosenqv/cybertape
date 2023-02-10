<template>
  <div class="tape-rack-wrapper">
    <ul class="tape-rack">
      <AudioTape
        v-for="item in list"
        :key="item.id"
        :item="item"
        @on-click="emits('onClicked', item)"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { ICategory } from '@/models/ICategory'
import type { PropType } from 'vue'
import { toRefs } from 'vue'
import AudioTape from './AudioTape.vue'

const props = defineProps({
  list: {
    type: Array as PropType<ICategory[]>,
    required: true
  }
})
const emits = defineEmits<{
  (e: 'onClicked', item: ICategory): void
}>()
const { list } = toRefs(props)
</script>

<style lang="scss" scoped>
@use '@/style/variables.scss';
@import '@/style/variables.scss';

$colors: variables.$color__red-light, variables.$color__blue, variables.$color__green-dark,
  variables.$color__yellow, variables.$color-neutral__greige-dark;

@mixin colorize {
  $bg: darken($bg, 15%);
  background: $bg;
}
.tape-rack {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  height: 100%;
  justify-content: space-evenly;
  padding-right: variables.$padding-large;
  overflow-x: hidden;
  overflow-y: scroll;
  @include scrollbar-standard;
  @for $i from 1 through 40 {
    li:nth-child(#{length($colors)}n + #{$i}) {
      $color: desaturate(
        $color: lighten(nth($colors, random(length($colors))), 5%),
        $amount: 2
      );
      background: $color;
      border-color: $color;
      &::after {
        background: darken($color, 11%);
        border-color: darken($color, 11%);
      }
      &::before {
        background: darken($color, 5%);
        border-color: darken($color, 5%);
      }
    }
  }
  &-wrapper {
    background-color: variables.$color-neutral__greige-light;
    border-radius: variables.$border-radius-medium;
    height: 100%;
    overflow: hidden;
    padding: variables.$padding-medium 0 variables.$padding-small variables.$padding-small;
  }

  @media screen and (min-width: 768px) {
    display: grid;
    justify-items: center;
    background-color: transparent;
    grid-template-columns: repeat(3, 33%);
  }

  @media screen and (min-width: 1024px) {
    background-color: variables.$color-neutral__greige-light;
    border-radius: variables.$border-radius-medium;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.36);
    gap: 8px 9px;
    grid-template-columns: repeat(6, 1fr);
    justify-content: space-around;
    margin-right: auto;
    overflow: initial;
    padding-block: variables.$padding-medium;
    padding-inline: variables.$padding-medium variables.$padding-x-large;
    transform: rotateX(5deg) rotateY(-20deg) skewX(-5deg);
    transform-origin: left center 5em;
    transform-style: preserve-3d;
    width: fit-content;

    &-wrapper {
      background-color: transparent;
      overflow: initial;
      perspective: 1000em;
      padding: 0;
    }
  }
}
</style>
