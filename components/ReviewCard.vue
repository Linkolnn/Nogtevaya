<template>
  <article class="review-card">
    <img v-if="review.photo" :src="review.photo" alt="" class="review-photo" />
    <h3 class="reviewer-name font-h4">{{ review.name }}</h3>
    <p class="review-text font-text_medium">{{ review.text }}</p>
  </article>
</template>
<script setup>
defineProps(['review']);
</script>
<style lang="sass">
@import '@color'
@import '@mixin'
@import '@global'

.review-card
  border: 1px solid $main-color
  border-radius: $radius
  padding: 20px
  margin: 10px
  text-align: center
  background: $white
  max-width: 500px
  width: 100%
  height: 100%
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  min-width: 350px

.review-photo
  width: 120px
  height: 120px
  border-radius: 50%
  object-fit: cover
  margin-bottom: 16px
  border: 3px solid $main-color

.reviewer-name
  margin-bottom: 10px
  color: $black
  width: 100%
  word-wrap: break-word

.review-text
  color: #555
  margin-bottom: 10px
  width: 100%
  overflow-wrap: break-word
  word-break: break-word

@include mobile
  .review-card
    padding: 15px
    min-width: 140px
    
  .review-photo
    width: 80px
    height: 80px
</style> 