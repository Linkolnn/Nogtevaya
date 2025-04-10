<script setup>
import data from '@services/data';
import { showMenu, hideMenu } from '../animation/animation';

const navMenuItems = data.navMenuItems();
const navMenuVisible = ref(false);
const navMenu = ref(null);
const isMobile = ref(false);
const route = useRoute();

const toggleNavMenu = () => {
  if (!isMobile.value || !navMenu.value) return;
  navMenuVisible.value = !navMenuVisible.value;
  if (navMenuVisible.value) {
    showMenu(navMenu.value);
    document.body.style.overflow = 'hidden';
  } else {
    hideMenu(navMenu.value);
    document.body.style.overflow = 'auto';
  }
};

const checkIsMobile = () => {
  isMobile.value = window.innerWidth <= 859;
};

const isActiveLink = (url) => {
  return route.path === url;
};

onMounted(() => {
  checkIsMobile();
});
</script>
<template>
  <transition name="fade">
    <div 
      v-if="navMenuVisible" 
      @click="toggleNavMenu" 
      class="header__menu-overlay"
    ></div>
  </transition>    
  <nav ref="navMenu" class="header__menu">
      <button @click="toggleNavMenu" class="header_burger-btn header_burger-btn--close">
          <IconX class="header_burger-icon" filled />
      </button>
      <ul class="header__list">
          <li v-for="item in navMenuItems" class="header__list-item">
              <NuxtLink @click="toggleNavMenu" :class="['header__list-link', 'btn', 'font-text_extra-large', { 'header__list-link--active': isActiveLink(item.url) }]" :to="item.url">
                  {{ item.text }}
              </NuxtLink>
          </li>
      </ul>
  </nav>
  <button @click="toggleNavMenu" class="header_burger-btn header_burger-btn--open">
      <IconBurger class="header_burger-icon" filled />
  </button>
</template>
<style lang="sass">
@import '@color'
@import '@mixin'
@import '@global'
  
.header__menu
  display: flex
  padding: 20px 
  background: $white
  border-radius: 40px
  z-index: 1

  .header__list
    width: 100%
    display: flex
    justify-content: space-between
    gap: 10px
    
.header__list-item
    display: flex
    align-items: end
    width: 100%

.header__list-link
    text-decoration: none
    text-align: center
    white-space: nowrap
    color: $black
    background: $white  
    width: 100%
    padding: 10px 10px 
    cursor: pointer
    border-radius: 40px !important
    @include transition
    
    &--active
      background: $black !important
      color: $white !important  

.header_btn
    margin-top: 10px
    display: flex
    justify-self: end

.header_burger-btn
    display: none

.header__menu-overlay
  position: fixed
  top: 0
  bottom: 0
  left: 0
  right: 0
  z-index: 2
  background: $black
  opacity: 0.4
  @include transition

.fade-enter-active,
.fade-leave-active 
  @include transition

.fade-enter-from,
.fade-leave-to 
  opacity: 0;


.fade-enter-to,
.fade-leave-from 
  opacity: 0.4;

@include mobile
    .header__menu
      display: none
      flex-direction: row-reverse
      background: $main-color
      transform: translateX(-100%) 
      position: fixed
      z-index: 3
      top: 15px
      left: 0
      width: calc(100% - 40px) 
      height: max-content
      margin: 0 20px
      gap: 20px

    .header_burger-btn
      position: absolute
      border-radius: 40px 
      width: 40px 
      height: 40px
      background: $white
      align-self: flex-end
      &--close
        align-self: flex-start
        position: relative
        flex-shrink: 0

    .header_burger-icon
        width: 15px
        height: 15px

    .header__list
      width: 100%
      flex-direction: column

    .header__list-item
      .header__list-link
      .font-text_medium
        font-size: 26px !important


    .header_burger-btn
        display: block

</style>