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
  background-color: rgb(220, 220, 214);
  border-radius: variables.$border-radius-medium;
  display: grid;
  grid-template-columns: repeat(1, 300px);
  grid-template-rows: repeat(46, 50px);
  gap: 7px;
  justify-content: space-around;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  margin-block: variables.$padding-large;
  @include scrollbar-standard;
  &-wrapper {
    background-color: rgb(220, 220, 214);
    border-radius: variables.$border-radius-medium;
    perspective: 100em;
    overflow: hidden;
    height: 100%;
    padding: variables.$padding-large variables.$padding-medium;
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(3, 200px);
    grid-template-rows: repeat(16, 40px);
    overflow: visible;
    height: unset;
    transform: rotateX(15deg) perspective(1000px);
    transform-origin: center 100%;
    transform-style: preserve-3d;
  }

  @media screen and (min-width: 1024px) {
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.36);
    gap: 10px;
    grid-template-columns: repeat(4, 200px);
    grid-template-rows: repeat(12, 45px);
    justify-content: center;
    padding-block: variables.$padding-medium variables.$padding-body;
    padding-inline: variables.$padding-small variables.$padding-x-large;
    transform: rotateX(10deg) rotateY(-20deg) skewX(-5deg) perspective(1000px);
    transform-origin: center 100%;
    transform-style: preserve-3d;
    &-wrapper {
      background-color: transparent;
      margin: 0 auto;
      overflow: unset;
      perspective: 100em;
    }
  }
}
</style>
