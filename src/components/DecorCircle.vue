<template>
  <svg viewBox="0 0 100 100">
    <defs>
      <path
        id="circle"
        d="
        M 50, 50
        m -37, 0
        a 37,37 0 1,1 74,0
        a 37,37 0 1,1 -74,0"
      />
    </defs>
    <text textLength="233">
      <textPath xlink:href="#circle">{{ props.text }}</textPath>
    </text>
  </svg>
</template>
<script lang="ts" setup>
const props = defineProps({
  text: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped>
svg {
  height: 100%;
  width: 100%;
}
</style>
