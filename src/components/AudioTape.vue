<template>
  <li class="audio-tape" @click="emits('onClick')">
    <div class="audio-tape-label" @mouseenter.stop="(e) => scrollText(e)">
      <p ref="tapeLabel">{{ item.name }}</p>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { ICategory } from '@/models/ICategory'
import type { PropType } from 'vue'
import { toRefs, ref } from 'vue'

const props = defineProps({
  item: {
    type: Object as PropType<ICategory>,
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
    const textWidth = tapeLabel.value.scrollWidth

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
  border-radius: 2px;
  border-right: 1px solid variables.$color-neutral__dark;
  border-bottom: 1px solid variables.$color-neutral__dark;
  box-shadow: 2px 2px 2px #bcbcbc;
  color: variables.$color-neutral__light;
  cursor: pointer;
  list-style-type: none;
  padding: variables.$padding-small variables.$padding-x-small;
  transition: all 0.25s linear;
  text-overflow: clip;
  width: 100%;
  z-index: 1;

  &-label {
    align-items: center;
    background-color: variables.$color-neutral__light;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    border-radius: 3px;
    display: flex;
    height: 100%;
    overflow: hidden;
    width: 100%;
    p {
      @include variables.font-size-paragraph;
      color: variables.$color-neutral__dark;
      margin: 0 auto;
      max-width: 100%;
      overflow: hidden;
      padding-inline: 20px;
      text-overflow: ellipsis;

      width: fit-content;
      white-space: nowrap;
    }
  }
  @media screen and (min-width: 768px) {
    padding: variables.$padding-x-small variables.$padding-medium;
  }
  @media screen and (min-width: 1024px) {
    border-radius: 0;
    padding: variables.$padding-x-small variables.$padding-small;
    &-label {
      height: initial;
    }
    &:hover {
      background: variables.$color__green;
      border-color: variables.$color__green;
      color: variables.$color-neutral__dark;
      transform: translate(-0.4em, -0.4em);
      transition: all 0.25s linear;
      p {
        overflow: visible;
      }

      &:before,
      &:after {
        transition: all 0.25s linear;
      }

      &:before {
        right: -0.8em;
        top: 0.4em;
        width: 12px;
      }

      &:after {
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
      background-color: darken(variables.$color-neutral__dark, 50%);
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
