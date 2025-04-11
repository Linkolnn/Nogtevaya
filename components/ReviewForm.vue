<template>
  <div class="review-form-container">
    <h3 class="review-modal-title font-h3">Оставьте ваш отзыв</h3>
    
    <form @submit.prevent="submitForm" class="review-form">
      <div class="form-group">
        <label for="reviewName" class="font-text_small">Ваше имя</label>
        <input 
          type="text" 
          id="reviewName" 
          v-model="formData.name" 
          class="inp font-text_medium" 
          required
        />
      </div>
      
      <div class="form-group">
        <label class="font-text_small">Ваша оценка</label>
        <div class="rating-selector">
          <div 
            v-for="star in 5" 
            :key="star" 
            class="star" 
            :class="{ 'active': star <= formData.rating }"
            @click="setRating(star)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
          </div>
        </div>
      </div>
      
      <div class="form-group">
        <label for="reviewText" class="font-text_small">Ваш отзыв</label>
        <textarea 
          id="reviewText" 
          v-model="formData.text" 
          class="textarea inp font-text_medium" 
          required
        ></textarea>
      </div>

      <div v-if="photoPreview" class="photo-preview">
        <div class="photo-preview__header">
          <h4 class="font-text_medium">Загруженное фото</h4>
          <button type="button" @click="removePhoto" class="photo-delete-btn">
            <span class="photo-delete-icon">×</span>
          </button>
        </div>
        <img :src="photoPreview" alt="Preview" class="preview-image" />
      </div>
      
      <div class="form-group">
        <label for="reviewPhoto" class="btn">Выбрать фото (по желанию)</label>
        <input 
          type="file" 
          id="reviewPhoto" 
          @change="handlePhotoUpload" 
          accept="image/*" 
          class="inp--file"
        />
      </div>
      
      <button type="submit" class="review-submit btn font-text_medium">Отправить</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['submit']);

const formData = ref({
  name: '',
  text: '',
  photo: '',
  rating: 5 // Default rating set to 5
});

const photoPreview = ref(null);

const handlePhotoUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      photoPreview.value = e.target.result;
      formData.value.photo = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const setRating = (rating) => {
  formData.value.rating = rating;
};

const removePhoto = () => {
  photoPreview.value = null;
  formData.value.photo = '';
  // Reset the file input
  const fileInput = document.getElementById('reviewPhoto');
  if (fileInput) fileInput.value = '';
};

const submitForm = () => {
  emit('submit', {...formData.value});
  resetForm();
};

const resetForm = () => {
  formData.value = {
    name: '',
    text: '',
    photo: '',
    rating: 5
  };
  photoPreview.value = null;
};
</script>

<style lang="sass">
@import '@color'
@import '@mixin'
@import '@global'

.review-form-container
  background: $main-color  
  padding: 30px
  border-radius: $radius
  width: 100%
  max-width: 80vh

.review-modal-title
  background: $white
  padding: 10px
  border-radius: $radius
  margin: 20px 0px

.review-form
  display: flex
  overflow-y: scroll
  max-height: 70vh
  flex-direction: column
  gap: 20px
  
.form-group
  display: flex
  background: $white
  padding: 10px
  border-radius: $radius
  flex-direction: column
  gap: 5px

  .inp
    &--file
        display: none
  
  label.btn
    padding: 5px 0px
    text-align: center

.rating-selector
  display: flex
  justify-content: center
  margin: 10px 0

.star
  cursor: pointer
  color: #D1D1D1
  margin: 0 5px
  transition: all 0.2s ease
  
  &:hover, &.active
    color: #FFD700
    transform: scale(1.2)

.photo-preview
  text-align: center
  margin: 10px 0
  background: $white
  padding: 10px
  border-radius: $radius
  
  &__header
    display: flex
    justify-content: space-between
    align-items: center
    margin-bottom: 10px
  
  .preview-image
    max-width: 100%
    border-radius: $radius
    border: 2px solid $main-color

.photo-delete-btn
  background: $black
  color: $white
  border-radius: 50%
  width: 24px
  height: 24px
  display: flex
  align-items: center
  justify-content: center
  cursor: pointer
  transition: all 0.3s ease
  border: none
  
  &:hover
    background: darken($black, 10%)
    transform: scale(1.1)

.photo-delete-icon
  font-size: 18px
  line-height: 1

.review-submit
  background: $main-color
  padding: 12px 24px
  border-radius: 40px
  align-self: center
  font-weight: 500
  margin-top: 10px
  width: 100%
@include mobile
  .review-form-container
    padding: 20px
    
  .review-button, .review-submit
    padding: 10px 20px
</style> 