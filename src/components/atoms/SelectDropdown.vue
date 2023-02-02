<template>
  <div class="dropdown">
    <IconChevron class="dropdown-arrow" @click="toggleDropdown" />
    <div class="dropdown-content">
      <SearchInput
        :placeholder="placeholder"
        @focusInput="toggleDropdown(true)"
        @stringInput="searchInDropdown"
      />
      <SearchResults v-if="show_dropdown_results" :list="results" @selectItem="onSelect" />
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
function toggleDropdown(val: boolean) {
  show_dropdown_results.value = val
}
function searchInDropdown(searchString: string) {
  const newResult = options.value.filter((option) => {
    return option.title.toLowerCase().includes(searchString.toLowerCase())
  })
  results.value = newResult
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
  display: grid;
  grid-template-areas: 'select';
  height: 35px;
  margin: 0;

  &-arrow {
    cursor: pointer;
    justify-self: end;
    margin-right: variables.$margin-medium;
    position: absolute;
    z-index: 2;
    bottom: 35%;
  }
}
</style>
