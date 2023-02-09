<template>
  <div class="tape-rack-wrapper">
    <div class="tape-rack">
      <AudioTape
        v-for="item in list"
        :key="item.id"
        :item="item"
        @on-click="emits('onClicked', item)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ICategoryItem } from '@/models/ICategory'
import type { PropType } from 'vue'
import { toRefs } from 'vue'
import AudioTape from './AudioTape.vue'

const props = defineProps({
  list: {
    type: Array as PropType<ICategoryItem[]>,
    required: true
  }
})
const emits = defineEmits<{
  (e: 'onClicked', item: ICategoryItem): void
}>()
const { list } = toRefs(props)
</script>

<style lang="scss" scoped>
@use '@/style/variables.scss';
@import '@/style/variables.scss';

.tape-rack {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-auto-rows: 1fr;
  gap: 6px;
  padding-right: variables.$padding-large;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  @include scrollbar-standard;
  &-wrapper {
    background-color: rgb(220, 220, 214);
    border-radius: variables.$border-radius-medium;
    height: 100%;
    overflow: hidden;
    padding: variables.$padding-large 0 variables.$padding-small variables.$padding-large;
  }

  @media screen and (min-width: 768px) {
    background-color: transparent;
    grid-template-columns: repeat(3, 33%);
    margin: 0;
  }

  @media screen and (min-width: 1024px) {
    background-color: rgb(220, 220, 214);
    border-radius: variables.$border-radius-medium;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.36);
    gap: 8px 9px;
    grid-template-columns: repeat(5, 20%);
    justify-content: space-around;
    margin-right: auto;
    overflow: initial;
    padding-block: variables.$padding-medium;
    padding-inline: calc(2 * #{variables.$padding-x-large});
    transform: rotateX(5deg) rotateY(-20deg) skewX(-5deg);
    transform-origin: left center 5em;
    transform-style: preserve-3d;

    &-wrapper {
      background-color: transparent;
      padding: 0;
      overflow: initial;
      perspective: 1000em;
    }
  }
}
</style>
