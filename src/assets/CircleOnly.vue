<template>
  <svg viewBox="0 0 100 100" width="75%" height="75%" spacing="auto">
    <defs>
      <path
        id="circle"
        d="
        M 50, 50
        m -37, 0
        a 37,37 0 1,1 74,0
        a 37,37 0 1,1 -74,0"
        spacing="auto"
      />
    </defs>
    <text font-size="10" textLength="227" word-spacing="4" lengthAdjust="spacing">
      <textPath xlink:href="#circle">only - only - only - only - only - only -</textPath>
    </text>
  </svg>
</template>

<style lang="scss" scoped>
@use '@/style/variables.scss';

svg {
  top: 15%;
  // animation: rotate 17s reverse linear infinite;
}

textPath {
  display: flex;
}
</style>
