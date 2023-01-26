<template>
  <div class="stripes-container">
    <div class="stripe stripe__one"></div>
    <div class="stripe stripe__two"></div>
    <div class="stripe stripe__three"></div>
    <div class="stripe stripe__four"></div>
    <div class="stripe stripe__five"></div>
    <div class="stripe stripe__six"></div>
    <div class="stripe stripe__seven"></div>
  </div>
</template>

<style lang="scss" scoped>
.stripes-container {
  bottom: 0;
  display: flex;
  flex-direction: column;
  height: 50vh;
  justify-content: space-between;
  position: absolute;
  width: 100vw;

  .stripe {
    background-color: #252525;
    width: 100%;

    &__one {
      height: 12px;
      margin-bottom: 24px;
    }
    &__two {
      height: 18px;
      margin-bottom: 20px;
    }
    &__three {
      height: 24px;
      margin-bottom: 16px;
    }
    &__four {
      height: 30px;
      margin-bottom: 12px;
    }
    &__five {
      height: 36px;
      margin-bottom: 8px;
    }
    &__six {
      height: 42px;
      margin-bottom: 4px;
    }
    &__seven {
      height: 157px;
    }
  }
}
</style>
