<template>
  <div class="toggle-slider">
    <label>{{ title }}</label>
    <div class="toggle-wrapper">
      <div class="toggle-indicator">
        <div class="toggle-indicator__numbers">
          <span v-for="label in stepLabels" :key="label">{{ label }}</span>
        </div>
        <div v-if="stepLabels.length === 3" class="toggle-indicator__graphics">
          <svg viewBox="0 0 100 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="37" cy="5" r="1" fill="white" />
            <circle cx="51" cy="5" r="1" fill="white" />
            <circle cx="65" cy="5" r="1" fill="white" />
            <g stroke="white" stroke-width="1">
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
        v-model="toggleSlider"
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
import { ref, toRefs } from 'vue'
import type { PropType } from 'vue'
import InfoTooltip from '@/components/atoms/InfoTooltip.vue'

const props = defineProps({
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
  (e: 'toggleValue', value: number, title: string): void
}>()
const toggleSlider = ref<number>(10)
const { title, stepLabels, min, max, steps } = toRefs(props)

function toggleSelection() {
  emits('toggleValue', toggleSlider.value, title.value)
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
    background-image: url('@/assets/Slider.svg');
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
    grid-template-columns: 1fr auto;
    row-gap: 10px;
    width: fit-content;

    .infobox {
      align-self: flex-end;
      grid-column: 2;
      grid-row: 2;
    }
  }

  &-indicator {
    height: 40%;
    width: 100%;
    &__numbers {
      display: flex;
      font-size: variables.$font-size-caption;
      height: 50%;
      justify-content: space-around;
      margin: 0 auto;
      width: 95%;
    }
    &__graphics {
      height: 50%;
      width: 100%;
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
    padding: variables.$padding-small variables.$padding-x-small;
    width: 130px;
    @include variables.backdrop-gradient;
  }
}
label {
  color: variables.$color-neutral__greige-light;
  font-size: variables.$font-size-paragraph__small;
}
</style>
