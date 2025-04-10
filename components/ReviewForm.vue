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
        <label for="reviewText" class="font-text_small">Ваш отзыв</label>
        <textarea 
          id="reviewText" 
          v-model="formData.text" 
          class="textarea inp font-text_medium" 
          required
        ></textarea>
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
      
      <!-- Photo Preview -->
      <div v-if="photoPreview" class="photo-preview">
        <img :src="photoPreview" alt="Preview" class="preview-image" />
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
  photo: ''
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

const submitForm = () => {
  emit('submit', {...formData.value});
  resetForm();
};

const resetForm = () => {
  formData.value = {
    name: '',
    text: '',
    photo: ''
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
  max-width: 500px

.review-modal-title
  background: $white
  padding: 10px
  border-radius: $radius
  margin: 20px 0px

.review-form
  display: flex
  flex-direction: column
  gap: 20px
  
.form-group
  display: flex
  flex-direction: column
  gap: 5px

  .inp
    &--file
        display: none
  
  label.btn
    font-weight: 600
    text-align: center

.photo-preview
  text-align: center
  margin: 10px 0
  
  .preview-image
    max-width: 100%
    max-height: 200px
    border-radius: $radius
    border: 2px solid $main-color
    
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