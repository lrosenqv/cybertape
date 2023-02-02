<template>
  <div id="mixer-settings">
    <div id="mixer-settings__knobs">
      <RotationKnob
        v-for="(knob, index) in knobs"
        :key="index"
        :title="knob.title"
        :description="knob.description"
      />
    </div>
    <div id="mixer-settings__sliders">
      <RangeSlider
        v-for="(slider, index) in sliders"
        :key="index"
        :title="slider.title"
        :description="slider.description"
      />
    </div>
    <div id="mixer-settings__toggles">
      <RangeSlider
        v-for="(toggle, index) in toggles"
        :key="index"
        :title="toggle.title"
        :description="toggle.description"
      />
    </div>
    <div id="buttons">
      <MixerButton text="reset" size="_small" color="_red" @emit-click="resetSelection" />
      <MixerButton text="Mix" @emit-click="onMixBtnClick" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
import type { PropType } from 'vue'
import RotationKnob from '@/components/atoms/RotationKnob.vue'
import RangeSlider from '@/components/atoms/RangeSlider.vue'
import MixerButton from '@/components/atoms/MixerButton.vue'

interface SETTING_ITEM {
  title: string
  description: string
  min?: number
  max?: number
  steps?: number
  step_labels?: string[]
}
// Props
const props = defineProps({
  knobs: {
    type: Array as PropType<SETTING_ITEM[]>,
    required: true
  },
  sliders: {
    type: Array as PropType<SETTING_ITEM[]>,
    required: true
  },
  toggles: {
    type: Array as PropType<SETTING_ITEM[]>,
    required: true
  }
})
const { knobs, sliders, toggles } = toRefs(props)
// Emits
const emits = defineEmits<{}>()
// Composables

// Functions
function onMixBtnClick() {
  // console.log('clicked!')
}
function resetSelection() {
  // console.log('clicked!')
}

// Watchers
</script>

<style lang="scss" scoped>
@use '@/style/variables.scss';
</style>
