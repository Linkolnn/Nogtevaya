<template>
  <Header/>
  <main class="main">
    <NuxtPage/>
  </main>
  <Footer/>
</template>
<style lang="sass">
@import @color
@import @global
@import @mixin
@import @fonts

.main
  display: flex
  flex-direction: column
  gap: 20px
  margin-bottom: 40px

.section 
  border-radius: $radius
  background: $white
  min-height: 60vh

@include mobile
  .section
    border-radius: 40px

</style>