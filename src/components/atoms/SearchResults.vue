<template>
  <div class="search-results-wrapper">
    <div class="overlay" @click="emits('closeOverlay')"></div>
    <ul class="search-results">
      <li
        v-for="(item, index) in list"
        :key="item.id ? item.id : index"
        class="search-results__item"
        @click.stop="emits('selectItem', item)"
      >
        <p>{{ item.title }}</p>
        <span v-if="item.subtitle">{{ item.subtitle }}</span>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import type { LIST_ITEM } from '@/models/LIST_ITEM'
import { toRefs } from 'vue'

const props = defineProps({
  list: {
    type: Array as PropType<LIST_ITEM[]>,
    required: true
  },
  showSubtitles: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits<{
  (e: 'selectItem', item: LIST_ITEM): void
  (e: 'closeOverlay'): void
}>()

const { list } = toRefs(props)
</script>

<style lang="scss" scoped>
@use '@/style/variables.scss';

.search-results {
  height: 270px;
  margin: 0;
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  scrollbar-width: thin;
  width: 100%;

  &::-webkit-scrollbar {
    appearance: none;
    border-radius: variables.$border-radius-large;
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: variables.$color-neutral__greige;
    border-radius: variables.$border-radius-large;
    width: 3px;
  }
  &__item {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    padding-block: variables.$padding-x-small;
    padding-inline: variables.$padding-large;
    width: 100%;

    &:hover {
      background-color: variables.$color__green;
    }
    p {
      font-size: variables.$font-size-paragraph__small;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      white-space: nowrap;
    }
    span {
      font-style: italic;
      font-size: variables.$font-size-caption;
    }
  }
  &-wrapper {
    background-color: variables.$color-neutral__light;
    border-radius: variables.$border-radius-small;
    box-shadow: variables.$shadow-2;
    height: 300px;
    margin-top: 4px;
    padding-top: variables.$padding-large;
    position: absolute;
    z-index: 2;
    width: 100%;
  }
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
}
</style>
