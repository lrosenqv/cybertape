<template>
  <div id="mixer-settings">
    <div id="mixer-settings__knobs">
      <RotationKnob
        v-for="(knob, index) in knobs"
        v-model="settings.knobSettings[index].value"
        :key="index"
        :title="knob.title"
        :description="knob.description"
        @update:model-value="updateSettings"
      />
    </div>
    <div id="mixer-settings__sliders">
      <RangeSlider
        v-for="(slider, index) in sliders"
        v-model="settings.sliderSettings[index].value"
        :key="index"
        :title="slider.title"
        :description="slider.description"
        @update:model-value="updateSettings"
      />
    </div>
    <div id="mixer-settings__toggles">
      <ToggleSlider
        v-for="(toggle, i) in toggles"
        v-model="settings.toggleSettings[i].value"
        :name="`target_${toggle.title}`"
        :key="i"
        :title="toggle.title"
        :description="toggle.description"
        :min="i === 0 ? 10 : 0"
        :max="i === 0 ? 20 : 1"
        :steps="i === 0 ? 5 : 1"
        :step-labels="toggle.step_labels"
        @update:model-value="updateSettings"
      />
    </div>
    <div id="mixer-settings__buttons">
      <MixerButton text="reset" size="_small" color="_red" @emit-click="resetSettings" />
      <MixerButton text="Mix" @emit-click="onMixBtnClick" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SETTING_ITEM, SETTING_ITEM_TOGGLE } from '@/models/LIST_ITEM'
import type { PropType } from 'vue'
import { toRefs, computed } from 'vue'
import RotationKnob from '@/components/atoms/RotationKnob.vue'
import RangeSlider from '@/components/atoms/RangeSlider.vue'
import MixerButton from '@/components/atoms/MixerButton.vue'
import ToggleSlider from '../atoms/ToggleSlider.vue'

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
    type: Array as PropType<SETTING_ITEM_TOGGLE[]>,
    required: true
  }
})
// Emits
const emits = defineEmits<{
  (e: 'emitSettings', settings: String[]): void
  (e: 'createMix'): void
}>()

// Composables
const { knobs, sliders, toggles } = toRefs(props)
// To catch changes through v-model
const settings = computed(() => {
  const knobSettings = knobs.value.map((knob) => {
    return {
      name: knob.title,
      value: ''
    }
  })
  const sliderSettings = sliders.value.map((slider) => {
    return {
      name: slider.title,
      value: ''
    }
  })
  const toggleSettings = toggles.value.map((toggle, i) => {
    return {
      name: toggle.title,
      value: i === 0 ? '15' : ''
    }
  })
  return { knobSettings, sliderSettings, toggleSettings }
})

function updateSettings() {
  let settingsArr: Array<string> = []
  settings.value.knobSettings.forEach((knob) => {
    if (knob.value !== '') settingsArr.push(`${knob.name}=${knob.value}`)
  })
  settings.value.sliderSettings.forEach((slider) => {
    if (slider.value !== '') settingsArr.push(`${slider.name}=${slider.value}`)
  })
  settings.value.toggleSettings.forEach((toggle) => {
    if (toggle.value !== '') settingsArr.push(`${toggle.name}=${toggle.value}`)
  })
  emits('emitSettings', settingsArr)
}
// Functions
function onMixBtnClick() {
  emits('createMix')
}
function resetSettings() {
  // reset elements to default position
  document.querySelectorAll('input').forEach((input) => (input.value = ''))
  document.querySelectorAll('.knob').forEach((knob) => {
    const knob_pointer = knob.children[0].lastElementChild as HTMLElement
    knob_pointer.style.transform = 'rotate(0)'
  })
  // reset models to default values
  settings.value.knobSettings.forEach((knob) => (knob.value = ''))
  settings.value.sliderSettings.forEach((slider) => (slider.value = ''))
  settings.value.toggleSettings.forEach((toggle) => (toggle.value = ''))
}
</script>

<style lang="scss" scoped>
@use '@/style/variables.scss';
#mixer-settings {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  row-gap: 10px;
  width: 100%;
  &__knobs {
    display: flex;
    justify-content: space-between;
  }
  &__sliders {
    display: flex;
    justify-content: space-between;
  }
  &__toggles {
    display: flex;
    padding-left: variables.$padding-small;
    gap: 10px;
  }
  &__buttons {
    align-items: flex-end;
    align-self: flex-end;
    display: flex;
    gap: 24px;
    justify-self: flex-end;
    padding: 0 variables.$padding-medium variables.$padding-medium;
  }
  @media screen and (min-width: 595px) {
    align-items: stretch;
    display: grid;
    grid-template-columns: 66% 33%;
    grid-template-rows: repeat(3, 1fr);
    row-gap: 20px;
    &__knobs {
      column-gap: 10px;
      grid-area: 1 / 1 / 2 / 2;
    }
    &__sliders {
      grid-row: 2 / 4;
      grid-column: 1 / 2;
    }
    &__toggles {
      display: flex;
      flex-direction: column;
      justify-self: flex-end;
      grid-row: 1 / 3;
      grid-column: 2;
      padding-left: variables.$padding-x-small;
    }
    &__buttons {
      align-items: flex-end;
      align-self: flex-start;
      grid-row: 3;
      grid-column: 2;
      padding-top: 0;
    }
  }
}
</style>
