<template>
  <div class="dropdown">
    <IconChevron
      class="dropdown-arrow"
      :class="{ 'dropdown-arrow_up': show_dropdown_results }"
      @click="toggleDropdown(!show_dropdown_results)"
    />
    <div class="dropdown-content">
      <SearchInput
        :placeholder="placeholder"
        @focusInput="toggleDropdown(true)"
        @stringInput="searchInDropdown"
      />
      <SearchResults
        class="dropdown-content-list"
        v-if="show_dropdown_results"
        :list="results"
        @selectItem="onSelect"
        @closeOverlay="toggleDropdown(false)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs, ref, watch } from 'vue'
import type { PropType } from 'vue'
import IconChevron from '@/components/icons/IconChevron.vue'
import SearchInput from '@/components/atoms/SearchInput.vue'
import SearchResults from '@/components/atoms/SearchResults.vue'
import type { LIST_ITEM } from '@/models/LIST_ITEM'

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

function onSelect(option: LIST_ITEM) {
  emits('selectOption', option)
  toggleDropdown(false)
}

function toggleDropdown(show: boolean) {
  show_dropdown_results.value = show
  if (show) results.value = options.value
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
  height: 35px;
  margin: 0;
  width: 100%;

  &-arrow {
    cursor: pointer;
    margin-right: variables.$margin-medium;
    position: absolute;
    z-index: 2;
    right: 0;
    bottom: 35%;
    transition: all 0.3s;

    &_up {
      transform: rotateX(180deg);
      bottom: 40%;
    }
  }
  &-content {
    position: relative;

    input {
      position: relative;
    }
    &-list {
      position: relative;
    }
  }
}
</style>
