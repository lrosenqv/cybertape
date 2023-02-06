<template>
  <div ref="usercard" class="user-card">
    <img :src="userImg" />
    <div class="user-card-text">
      <a :href="userLink">{{ username }}</a>
      <ButtonPrimary text="Logout" @click="emits('logout')" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import ButtonPrimary from './ButtonPrimary.vue'
const store = useStore()

const emits = defineEmits<{
  (e: 'closeCard'): void
  (e: 'logout'): void
}>()

const userImg = store.state.currentUserImg
const username = store.state.currentUser
const userLink = store.state.currentUserLink
const usercard = ref<HTMLDivElement>()

onMounted(() => {
  document.body.addEventListener('click', (e) => {
    if (e.target !== usercard.value) emits('closeCard')
  })
})
</script>

<style lang="scss" scoped>
@use '@/style/variables.scss';

.user-card {
  align-items: center;
  background-color: variables.$color-neutral__dark;
  border-radius: variables.$border-radius-medium;
  display: flex;
  gap: 10px;
  padding: 0;
  img {
    border-radius: 50%;
    height: 50px;
    width: 50px;
  }
  &-text {
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: left;
    a {
      color: variables.$color-neutral__light;
      font-weight: 600;
      @include variables.font-size-label;
    }
    button {
      border-color: variables.$color__yellow-light;
      color: variables.$color__yellow-light;
      padding: variables.$padding-x-small;
      text-transform: lowercase;
      @include variables.font-size-paragraph;
    }
  }

  @media screen and (min-width: 1024px) {
    gap: 30px;
    padding: variables.$padding-large variables.$padding-x-large;
    img {
      height: 70px;
      width: 70px;
    }
  }
}
</style>
