<template>
  <div id="start">
    <div id="start-text">
      <h1>Ready for some new mixes?</h1>
      <p>Log in to your Spotify account to try it out!</p>
      <ButtonPrimary text="Log in" @on-click="authRequest" />
    </div>
    <div class="start-stripes">
      <div class="start-stripes-wrapper start-stripes-wrapper__1">
        <span v-for="stripe of 25" :key="stripe"></span>
      </div>
      <div class="start-stripes-wrapper start-stripes-wrapper__2">
        <span v-for="stripe of 25" :key="stripe"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonPrimary from '@/components/atoms/ButtonPrimary.vue'
import { authRequest, getAccessToken } from '@/services/authorization'
import { onBeforeMount } from 'vue'

const params = new URLSearchParams(window.location.search)
const codeQuery = params.get('code')

onBeforeMount(() => {
  if (codeQuery) {
    getAccessToken(codeQuery)
  }
})
</script>

<style lang="scss" scoped>
@use '@/style/variables.scss';
#start {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
  padding-block: variables.$padding-body;

  &-text {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-inline: variables.$padding-body;

    h1 {
      font-weight: 600;
      @include variables.font-size-h2;
    }
    p {
      font-weight: 500;
    }

    button {
      width: fit-content;
    }
  }

  .start-stripes {
    display: flex;
    flex-direction: column;
    height: 30vh;
    justify-content: space-between;
    margin-bottom: 40px;
    width: 100vw;

    @media screen and (min-width: 769px) {
      height: 35vh;
      margin-bottom: 100px;
    }

    &-wrapper {
      display: flex;
      justify-content: space-between;

      &__2 {
        transform: rotate(180deg);
      }
      span {
        animation: animate 1.7s ease-in-out infinite;
        background-color: variables.$color-neutral__greige-light;
        height: 18vh;
        transform-origin: bottom;
        width: 2px;
      }
      @for $i from 1 through 30 {
        span:nth-child(#{$i}n) {
          animation-delay: #{$i * 0.1}s;
        }
      }
    }
  }
}

@keyframes animate {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.3);
  }
}
</style>
