<template>
    <section class="review-section section">
        <h2 class="review-section-title font-h2">Отзывы наших клиентов</h2>
        <div class="review-container">
            <swiper 
                :slides-per-view="slidesPerView"
                :centered-slides="true" 
                :space-between="spaceBetween" 
                :pagination="{ clickable: true }"
                :navigation="{ 
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }"
                :modules="swiperModules"
                :auto-height="true"
                :watch-overflow="true"
                :observer="true"
                :observe-parents="true"
                :update-on-window-resize="true"
                @swiper="onSwiperInit"
                @resize="handleResize"
                @breakpoint="handleResize"
            >
                <swiper-slide v-for="(review, index) in reviews" :key="index">
                    <ReviewCard :review="review" />
                </swiper-slide>
                <div class="swiper-button-prev btn"></div>
                <div class="swiper-button-next btn"></div>
            </swiper>
            <div class="review-action">
                <button @click="openReviewModal" class="review-button btn font-text_medium">Оставить отзыв</button>
            </div>
        </div>
        
        <!-- Review Modal -->
        <Modal v-if="isModalOpen" @close="closeReviewModal">
            <ReviewForm @submit="submitReview" />
        </Modal>
    </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ReviewCard from '@/components/ReviewCard.vue';
import Modal from '@/components/Modals/index.vue';
import ReviewForm from '@/components/ReviewForm.vue';
import data from '@/services/data.js';

const swiperModules = [Navigation, Pagination];
const reviews = ref([]);
const isModalOpen = ref(false);
const swiperInstance = ref(null);
const isMobile = ref(false);
const isTablet = ref(false);
const swiperInitialized = ref(false);

// Determine how many slides to show based on screen width
const slidesPerView = computed(() => {
    if (isMobile.value) return 1;
    if (isTablet.value) return 2;
    return 3;
});

// Adjust space between slides based on screen size
const spaceBetween = computed(() => {
    if (isMobile.value) return 10;
    if (isTablet.value) return 20;
    return 30;
});

const handleResize = () => {
    checkScreenSize();
    updateSwiperSize();
};

const updateSwiperSize = () => {
    if (swiperInstance.value && swiperInitialized.value) {
        nextTick(() => {
            try {
                swiperInstance.value.updateSize();
                swiperInstance.value.updateSlides();
                swiperInstance.value.update();
            } catch (error) {
                console.log('Swiper update error:', error);
            }
        });
    }
};

const checkScreenSize = () => {
    const width = window.innerWidth;
    isMobile.value = width < 859;
    isTablet.value = width >= 859 && width < 1200;
};

onMounted(() => {
    reviews.value = data.reviews();
    checkScreenSize();
    window.addEventListener('resize', handleResize);
});

const onSwiperInit = (swiper) => {
    swiperInstance.value = swiper;
    
    // Update swiper size whenever content changes
    swiper.on('slideChange', () => {
        updateSwiperSize();
    });
};

const openReviewModal = () => {
    isModalOpen.value = true;
    document.body.classList.add('no-scroll');
};

const closeReviewModal = () => {
    isModalOpen.value = false;
    document.body.classList.remove('no-scroll');
};

const submitReview = (newReview) => {
    // Here you would typically send the review to a server
    // For demo purposes, we'll just add it to the local array
    // Make sure rating is included and is a number
    const reviewWithRating = {
        ...newReview,
        rating: Number(newReview.rating) || 5 // Default to 5 if not provided or invalid
    };
    
    reviews.value.push(reviewWithRating);
    closeReviewModal();
    
    // Update swiper size after new review is added
    nextTick(() => {
        updateSwiperSize();
    });
};
</script>

<style lang="sass">
@import '@color'
@import '@mixin'
@import '@global'

.review-section
    &-title
        margin: 20px 0px

.review-container
    background: $main-color
    border-radius: $radius
    padding: 40px 40px // Increased padding to make more room for slides
    position: relative
    margin-bottom: 20px
    overflow: hidden

.swiper-pagination
    position: relative !important
    bottom: 0 !important
    margin-top: 15px
    margin-bottom: 10px
    display: flex
    justify-content: center
    align-items: center

.swiper
    width: 100%
    height: auto !important
    display: flex
    flex-direction: column
    position: relative
    overflow: hidden
    
    .swiper-wrapper
        align-items: normal !important // Center items vertically
        height: auto !important
        
    .swiper-pagination-bullet
        background: $white
        opacity: 1
        &-active
            background: $black
            opacity: 1

    .swiper-button-prev, .swiper-button-next
        border-radius: 50%
        width: 60px
        height: 60px
        display: flex
        justify-content: center
        align-items: center
        cursor: pointer
        @include transition
        position: absolute
        top: 50%
        transform: translateY(-50%)
        z-index: 10
        
        &::after
            font-size: 18px
            font-weight: bold
            
    .swiper-button-prev
        left: 10px
        
    .swiper-button-next
        right: 10px
        
    .swiper-slide
        display: flex
        justify-content: center
        align-items: center
        padding: 10px
        height: auto !important
        min-height: 100%
        transition: opacity 0.3s ease, transform 0.3s ease
        opacity: 0.5
        transform: scale(0.9)
        &-active
            opacity: 1
            transform: scale(1)
        > *
            display: flex
            flex-direction: column
            justify-content: center
            align-items: center
            width: 100%

// Review Button Styles
.review-action
    display: flex
    justify-content: center
    margin-top: 10px
    padding: 0px 25px

.review-button
    border-radius: 40px
    font-weight: 500
    width: 100%
    max-width: 350px

@include mobile
    .review-section
        &-title
            font-size: 24px
            margin-bottom: 20px
    
    .review-container
        padding: 20px 10px 
        
    .swiper
        min-height: 0
        overflow: visible
        
        .swiper-pagination
            display: flex
            justify-content: center
            margin: 20px 0px
            padding: 0 50px // Make room for the buttons on the sides
        
        .swiper-button-prev, .swiper-button-next
            width: 40px
            height: 40px
            top: auto
            bottom: 5px
            transform: none
            &::after
                font-size: 16px
        
        .swiper-button-prev
            left: 10%
            
        .swiper-button-next
            right: 10%
    
    .review-button
        padding: 10px 20px
</style>