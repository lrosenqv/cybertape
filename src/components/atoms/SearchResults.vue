<template>
  <div class="search-results-wrapper">
    <ul class="search-results">
      <li
        v-for="item in list"
        :key="item.id"
        class="search-results__item"
        @click="emits('selectItem', item)"
      >
        <p>{{ item.name }}</p>
        <span v-if="showSubtitles">{{ item.artists[0].name }}</span>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import type { IArtist } from '@/models/IArtist'
import type { ITrack } from '@/models/ITrack'
import type { PropType } from 'vue'
import { toRefs } from 'vue'

const props = defineProps({
  list: {
    type: Array as PropType<ITrack[] | IArtist[]>,
    required: true
  },
  showSubtitles: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits<{
  (e: 'selectItem', item: ITrack | IArtist): void
}>()

const { list } = toRefs(props)
</script>

<style lang="scss" scoped>
@use '@/style/variables.scss';

.search-results {
  height: 100%;
  margin: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: variables.$padding-medium;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    appearance: none;
    border-radius: variables.$border-radius-large;
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: variables.$color-neutral__greige;
    border-radius: variables.$border-radius-large;
    width: 4px;
  }
  &__item {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    padding: variables.$padding-x-small variables.$padding-medium;

    &:hover {
      background-color: variables.$color__green;
    }
    p {
      display: inline-block;
      font-size: variables.$font-size-paragraph__small;
      width: 300px;
      overflow: hidden;
      text-overflow: ellipsis;
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
    height: 300px;
    width: 350px;
    padding: variables.$padding-medium variables.$padding-small;
  }
}
</style>
