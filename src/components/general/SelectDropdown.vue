<template>
  <div class="dropdown">
    <IconChevron
      class="dropdown-arrow"
      :class="{ 'dropdown-arrow_up': show_dropdown_results }"
      @click="toggleDropdown(!show_dropdown_results)"
    />
    <div class="dropdown-content">
      <TextInput
        v-model="dropdownInput"
        :placeholder="placeholder"
        @focusInput="toggleDropdown(true)"
        @update:modelValue="searchInDropdown"
      />
      <SearchResults
        v-if="show_dropdown_results"
        :list="results"
        @selectItem="onSelect"
        @closeOverlay="toggleDropdown(false)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LIST_ITEM } from '@/models/LIST_ITEM'
import type { PropType } from 'vue'
import { toRefs, ref, watch } from 'vue'
import IconChevron from '@/components/icons/IconChevron.vue'
import TextInput from '@/components/general/TextInput.vue'
import SearchResults from '@/components/general/SearchResults.vue'

const props = defineProps({
  options: {
    type: Array as PropType<LIST_ITEM[]>,
    required: true
  },
  placeholder: {
    type: String,
    required: true
  }
})
const emits = defineEmits<{
  (e: 'selectOption', option: LIST_ITEM): void
}>()

const { options, placeholder } = toRefs(props)
const results = ref<LIST_ITEM[]>(options.value)
const show_dropdown_results = ref<boolean>(false)
const dropdownInput = ref<string>('')

function onSelect(option: LIST_ITEM) {
  emits('selectOption', option)
  toggleDropdown(false)
}

function toggleDropdown(show: boolean) {
  show_dropdown_results.value = show
  if (show) results.value = options.value
  dropdownInput.value = ''
}
function searchInDropdown(searchString: string) {
  if (searchString.length >= 2) {
    const newResult = options.value.filter((option) => {
      return option.title.toLowerCase().includes(searchString.toLowerCase())
    })
    results.value = newResult
  } else results.value = options.value
}

watch(
  options,
  (array) => {
    results.value = array
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
@use '@/style/variables.scss';

.dropdown {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0;
  width: 100%;

  &-arrow {
    cursor: pointer;
    margin-right: variables.$margin-medium;
    position: absolute;
    z-index: 1;
    right: 0;
    bottom: 40%;
    transition: all 0.3s;

    &_up {
      transform: rotateX(180deg);
      bottom: 40%;
    }
  }
  &-content {
    height: 100%;
    position: relative;
  }
}
</style>
