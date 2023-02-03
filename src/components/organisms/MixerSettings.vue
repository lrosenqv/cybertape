<template>
  <div id="mixer-settings">
    <div id="mixer-settings__knobs">
      <RotationKnob
        v-for="(knob, index) in knobs"
        :key="index"
        :title="knob.title"
        :description="knob.description"
        @knob-value="setKnobValues"
      />
    </div>
    <div id="mixer-settings__sliders">
      <RangeSlider
        v-for="(slider, index) in sliders"
        :key="index"
        :title="slider.title"
        :description="slider.description"
        @range-value="setRangeValues"
      />
    </div>
    <div id="mixer-settings__toggles">
      <ToggleSlider
        v-for="(toggle, index) in toggles"
        :name="`target_${toggle.title}`"
        :key="index"
        :title="toggle.title"
        :description="toggle.description"
        :min="toggle.min"
        :max="toggle.max"
        :steps="toggle.steps"
        :step-labels="toggle.step_labels"
        @toggle-value="setToggleValue"
      />
    </div>
    <div id="mixer-settings__buttons">
      <MixerButton text="reset" size="_small" color="_red" @emit-click="resetSelection" />
      <MixerButton text="Mix" @emit-click="onMixBtnClick" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { ref, toRefs, watch } from 'vue'
import RotationKnob from '@/components/atoms/RotationKnob.vue'
import RangeSlider from '@/components/atoms/RangeSlider.vue'
import MixerButton from '@/components/atoms/MixerButton.vue'
import ToggleSlider from '../atoms/ToggleSlider.vue'

interface SETTING_ITEM {
  title: string
  description: string
}
interface SETTING_ITEM_TOGGLE {
  title: string
  description: string
  min: number
  max: number
  steps: number
  step_labels: string[]
}
// Props
const props = defineProps({
  settingsModel: {
    type: Object
  },
  knobs: {
    type: Array as PropType<SETTING_ITEM[]>,
    required: true
  },
  sliders: {
    type: Array as PropType<SETTING_ITEM[]>,
    required: true
  },
  toggles: {
    type: Array as PropType<SETTING_ITEM_TOGGLE[]>,
    required: true
  }
})
// Emits
const emits = defineEmits<{
  (e: 'emitSetting', name: string, value: number | number): void
  (e: 'update:settingsModel'): void
}>()

// Composables
const { knobs, sliders, toggles, settingsModel } = toRefs(props)
// Functions
function onMixBtnClick() {
  // console.log('clicked!')
}
function resetSelection() {
  // console.log('clicked!')
}

function setKnobValues(value: string, title: string) {
  emits('emitSetting', `target_${title.toLowerCase()}`, Number(value))
}
function setRangeValues(value: number, title: string) {
  const roundedValue = Math.round(value * 10)
  const newVal = roundedValue / 10
  emits('emitSetting', `target_${title.toLowerCase()}`, newVal)
}
function setToggleValue(value: number, title: string) {
  if (title === '# of tracks') {
    emits('emitSetting', 'limit', value)
  } else {
    emits('emitSetting', `target_${title.toLowerCase()}`, value)
  }
}

// Watchers
</script>

<style lang="scss" scoped>
@use '@/style/variables.scss';
#mixer-settings {
  display: grid;
  grid-template-columns: variables.$grid-template-standard;
  grid-template-rows: repeat(6, 1fr);
  column-gap: 25px;
  &__knobs {
    display: flex;
    justify-content: space-between;
    grid-area: 1 / 1 / 3 / 9;
  }
  &__sliders {
    display: flex;
    justify-content: space-between;
    grid-area: 3 / 1 / 7 / 9;
  }
  &__toggles {
    justify-content: space-between;
    justify-self: end;
    display: flex;
    flex-direction: column;
    grid-area: 1 / 10 / 4 / 13;
  }
  &__buttons {
    align-items: flex-end;
    display: flex;
    gap: 24px;
    grid-area: 5 / 10 / 6 / 13;
  }
}
</style>
