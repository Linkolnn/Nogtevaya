import { ref, computed } from 'vue'

export default defineNuxtPlugin(nuxtApp => {
  const width = ref(process.client ? window.innerWidth : 0)
  
  function updateWidth() {
    width.value = window.innerWidth
  }
  
  if (process.client) {
    // Add event listener when plugin is initialized
    window.addEventListener('resize', updateWidth)
    
    // Clean up on app unmount
    nuxtApp.hook('app:unmount', () => {
      window.removeEventListener('resize', updateWidth)
    })
  }
  
  const screen = computed(() => {
    return {
      xs: width.value < 576,
      sm: width.value >= 576 && width.value < 768,
      md: width.value >= 768 && width.value < 992,
      lg: width.value >= 992 && width.value < 1200,
      xl: width.value >= 1200,
      width: width.value
    }
  })
  
  return {
    provide: {
      screen
    }
  }
}) 