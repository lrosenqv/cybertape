<template>
  <div class="toggle-slider">
    <label>{{ title.replace('target_', '') }}</label>
    <div class="toggle-wrapper">
      <div class="toggle-indicator">
        <div class="toggle-indicator__labels">
          <span v-for="label in stepLabels" :key="label">{{ label }}</span>
        </div>
        <div v-if="stepLabels.length === 3" class="toggle-indicator__graphics">
          <svg viewBox="0 0 100 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="37" cy="5" r="1" fill="#EDE8E3" />
            <circle cx="51" cy="5" r="1" fill="#EDE8E3" />
            <circle cx="65" cy="5" r="1" fill="#EDE8E3" />
            <g stroke="#EDE8E3" stroke-width="1">
              <line x1="18.5" x2="18.5" y1="2" y2="5" />
              <line x1="18" x2="30" y1="5" y2="5" />
              <line x1="70" x2="82" y1="5" y2="5" />
              <line x1="81.5" x2="81.5" y1="2" y2="5" />
            </g>
          </svg>
        </div>
      </div>
      <input
        class="toggle"
        :value="modelValue"
        type="range"
        :min="min"
        :max="max"
        :step="steps"
        @change="toggleSelection"
      />
    </div>
    <InfoTooltip v-if="description.length" :text="description" />
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import type { PropType } from 'vue'
import InfoTooltip from '@/components/atoms/InfoTooltip.vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  stepLabels: {
    type: Array as PropType<string[]>,
    default: () => [],
    required: true
  },
  min: {
    type: Number,
    required: true
  },
  max: {
    type: Number,
    required: true
  },
  steps: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: false,
    default: ''
  }
})
const emits = defineEmits<{
  (e: 'update:modelValue', value: String): void
}>()
const { title, stepLabels, min, max, steps, modelValue } = toRefs(props)

function toggleSelection(e: Event) {
  const toggle = e.target as HTMLInputElement
  emits('update:modelValue', toggle.value)
}
</script>
<style lang="scss" scoped>
@use '@/style/variables.scss';

.toggle {
  appearance: none;
  background: #0f0f0f;
  border-radius: 4px;
  height: 33px;
  outline: none;
  position: relative;
  z-index: 2;
  padding-inline: 6px;
  width: 75px;

  &::-webkit-slider-thumb {
    appearance: none;
    background: variables.$color-neutral__greige-light;
    background-image: url('@/assets/SliderPusher.svg');
    background-position: center center;
    background-repeat: no-repeat;
    border-radius: 4px;
    cursor: pointer;
    filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.29));
    height: 35px;
    width: 29px;
    transform: rotate(90deg);
    -webkit-appearance: none;
  }

  &::-moz-range-thumb {
    background: variables.$color-neutral__greige-light;
    border-radius: 4px;
    cursor: pointer;
    height: 35px;
    width: 27px;
  }

  &-slider {
    column-gap: 5px;
    display: grid;
    grid-auto-rows: auto;
    grid-template-columns: 1fr auto;
    row-gap: 10px;
    height: fit-content;
    width: fit-content;

    .infobox {
      align-self: flex-end;
      grid-column: 2;
      grid-row: 2;
    }
  }

  &-indicator {
    height: 35%;
    width: 100%;
    &__labels {
      display: flex;
      font-size: 0.8rem;
      color: variables.$color-neutral__greige-light;
      height: 45%;
      justify-content: space-around;
      margin: 0 auto;
      width: 95%;
    }
    &__graphics {
      height: 50%;
      width: 100%;
    }
    @media screen and (min-width: 769px) {
      height: 40%;
      width: 100%;
      &__labels {
        font-size: 0.9rem;
        height: 50%;
      }
    }
  }
  &-wrapper {
    grid-column: 1;
    grid-row: 2;
    align-items: center;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 2px;
    height: 70px;
    width: 120px;
    @include variables.backdrop-gradient;
    @media screen and (min-width: 769px) {
      padding: variables.$padding-small variables.$padding-x-small;
      width: 130px;
    }
  }
}
label {
  color: variables.$color-neutral__greige-light;
  height: fit-content;
  text-transform: capitalize;
  @include variables.font-size-paragraph__small;
}
</style>
