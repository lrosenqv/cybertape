<template>
  <div class="audio-tape" @click="emits('onClick')">
    <div class="audio-tape-label" @mouseenter.stop="(e) => scrollText(e)">
      <p ref="tapeLabel">{{ item.name }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ICategoryItem } from '@/models/ICategory'
import type { PropType } from 'vue'
import { toRefs, ref } from 'vue'

const props = defineProps({
  item: {
    type: Object as PropType<ICategoryItem>,
    required: true
  }
})

const emits = defineEmits<{
  (e: 'onClick'): void
}>()
const { item } = toRefs(props)
const tapeLabel = ref<HTMLParagraphElement>()

function scrollText(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement
  const boxWidth = el.clientWidth
  if (tapeLabel.value) {
    const textWidth = tapeLabel.value?.scrollWidth

    if (textWidth > boxWidth) {
      tapeLabel.value.animate(
        [
          {
            transform: `translateX(0)`
          },
          { transform: 'translateX(-100%)' }
        ],
        {
          duration: 2800,
          iterations: 1
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
@use '@/style/variables.scss';

.audio-tape {
  aspect-ratio: 6 / 1;
  background: variables.$color-neutral__dark;
  border-radius: variables.$border-radius-x-small;
  border-right: 1px solid variables.$color-neutral__dark;
  border-bottom: 1px solid variables.$color-neutral__dark;
  color: variables.$color-neutral__light;
  cursor: pointer;
  object-fit: contain;
  padding-inline: variables.$padding-small;
  transition: all 0.25s linear;
  text-overflow: clip;
  width: 100%;
  z-index: 1;
  &-label {
    overflow: hidden;
  }
  p {
    @include variables.font-size-paragraph;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  @media screen and (min-width: 1024px) {
    border-radius: 0;
    &:hover {
      background: variables.$color__green;
      border-color: variables.$color__green;
      color: variables.$color-neutral__dark;
      transform: translate(-0.4em, -0.4em);
      transition: all 0.25s linear;

      p {
        overflow: visible;
        text-overflow: initial;
        white-space: wrap;
        width: 100%;
      }

      &:before,
      &:after {
        transition: all 0.25s linear;
      }

      &:before {
        background: variables.$color__green-dark;
        border-color: variables.$color__green-dark;
        right: -0.8em;
        top: 0.4em;
        width: 12px;
      }

      &:after {
        background: darken(variables.$color__green-dark, 10%);
        border-color: darken(variables.$color__green-dark, 10%);
        height: 12px;
        bottom: -0.8em;
        right: -0.45em;
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
      background: darken(variables.$color-neutral__dark, 50%);
      border-color: darken(variables.$color-neutral__dark, 50%);
      bottom: -0.4em;
      height: 6px;
      right: -0.25em;
      transform: skewX(45deg);
      width: 100%;
    }
    &:before {
      background: darken(variables.$color-neutral__dark, 5%);
      border-color: darken(variables.$color-neutral__dark, 5%);
      height: 101%;
      right: -0.41em;
      width: 6px;
      top: 0.2em;
      transform: skewY(45deg);
    }
  }
}
</style>
