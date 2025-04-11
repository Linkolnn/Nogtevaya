<template>
    <section class="welcome__section section">
        <div class="welcome__section-textblock">
            <div class="welcome__section-circle welcome__section-circle--first"></div>
            <div class="welcome__section-circle welcome__section-circle--second"></div>
            <div class="welcome__section-circle welcome__section-circle--third"></div>
            <h1 class="welcome__section-title font-h1">
                Время подарить себе премиальный
                ногтевой сервис
            </h1>
            <p class="welcome__section-text font-text_large">
                Любой вид маникюра и педикюра создаём специально для вас
            </p>
            <NuxtLink to="/services">
                 <button class="welcome__section-btn btn font-text_extra-large">
                    Записаться на процедуру
                 </button>
            </NuxtLink>
        </div>
        <div class="welcome__section-imgblock">
            <img class="welcome__section-img" src="/assets/img/11.webp" alt="">
            <div class="welcome__section-circle welcome__section-circle--first">
                <p class="welcome__section-text font-text_small">
                    Работа по гибкому графику
                </p>
            </div>
        </div>
    </section>
    <section class="price-list__section section">
        <h2 class="price-list__section-title font-h2" id="pricelist">
            Прайс-лист
        </h2>
        <ul class="price-list__items">
            <li class="price-list__item" v-for="(master, masterIndex) in priceListData" :key="masterIndex">
                <h3 class="price-list__master font-h3">{{ master.master }}</h3>
                <ul class="price-list__services">
                    <li v-for="(service, serviceIndex) in master.services" :key="serviceIndex" class="price-list__service-item">
                        <img class="price-list__service-img"  :src="service.photo || logoImage" alt="">
                        <div class="price-list__service-textblock">
                            <h4 class="price-list__service font-h4">{{ service.service }}</h4>
                            <p class="price-list__price .font-text_large">{{ service.price }} ₽</p>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    </section>
</template>
<script setup>
import data from '~/services/data.js'

const priceListData = data.priceList()
const logoImage = '/logo.png'
</script>
<style lang="sass">
@import '@color'
@import '@mixin'
@import '@global'

.welcome__section
    background: $main-color
    padding: 50px 40px 40px
    margin-top: -35px
    border-radius: 0px 0px 20px 20px
    display: flex
    flex-direction: row
    align-items: center
    
    .welcome__section-btn
        border-radius: 40px 
        padding: 20px 40px
        margin-top: 20px
    &-imgblock
        position: relative

    &-circle
        top: 20%
        right: 0
        position: absolute
        border-radius: 50%
        background: $white
        padding: 20px
        text-align: center
        display: flex
        justify-content: center
        align-items: center
        width: 14vw
        aspect-ratio: 1 / 1
        .font-text_small
            font-size: 18px
            font-weight: 700
    
    &-img
        border-radius: 40%
        height: 100%
        width: 100%
        aspect-ratio: 1 / 1
        object-fit: cover
        z-index: 0

    &-textblock
        position: relative
        z-index: 1
        width: 60%
        display: flex
        flex-direction: column
        flex-shrink: 0
        gap: 15px
        .welcome__section-circle
            position: absolute
            z-index: -1
            background: $white
            border-radius: 50%
            
            &--first
                top: -20px
                left: -30px
                width: 180px
                height: 180px
                
            &--second
                bottom: 20px
                right: 40px
                width: 120px
                height: 120px
                
            &--third
                top: 50%
                left: 50%
                transform: translate(-50%, -50%)
                width: 250px
                height: 250px
                opacity: 0.3
                background: $black

.price-list
    padding: 40px 20px

    &__section-title
        margin-bottom: 20px
    &__items
        display: flex
        flex-direction: column
        gap: 40px
        background: $main-color
        border-radius: $radius
        padding: 40px
    
    &__item
        border-radius: $radius
        display: flex
        flex-direction: column
        gap: 15px

    &__services
        display: flex
        flex-direction: row
        flex-wrap: wrap
        gap: 10px
    
    &__service-item
        display: flex
        flex-direction: column
        justify-content: space-between
        align-items: center
        gap: 10px
        background: $white
        padding: 10px
        border-radius: $radius
        min-width: 320px
        flex: 1
    
    &__service
        font-weight: 500
        word-break: break-word
        text-align: center

    &__master
        text-align: center
        background: $white
        border-radius: $radius
        padding: 10px

    &__service-img
        border-radius: $radius
        height: 40vh
        width: 100%
        object-fit: cover
        z-index: 0

    &__service-textblock
        display: flex
        flex-direction: column
        gap: 10px
    
    &__price
        font-weight: 700
        text-align: center
        font-size: 20px 

@include mobile
    .welcome__section
        padding: 40px 20px 20px
        flex-direction: column-reverse
        border-radius: 0px 0px 40px 40px
        &-circle
            padding: 10px
            width: 30vw
            .font-text_small
                font-size: 14px
        &-title
            font-size: 22px
            text-align: center
        &-text
            font-size: 16px
            text-align: center
        
        .welcome__section-btn
            border-radius: 40px
            padding: 15px 25px
            font-size: 18px
        &-textblock
            width: 100%
            align-items: center
            .welcome__section-circle
                &--first
                    top: -40px
                    left: -10px
                    width: 100px
                    height: 100px
                
                &--second
                    bottom: 10px
                    right: 0
                    width: 80px
                    height: 80px
                
                &--third
                    width: 150px
                    height: 150px
                    background: $black
                    opacity: 0.1
        &-img
            width: 100%
            transform: translateY(-5%)
            
    .price-list
        &__services
            justify-content: center

        &__items
            padding: 20px

        &__service-item
            min-width: 200px
        
        &__service-img
            width: 100%
            height: 100%
            max-height: 320px
            object-fit: cover

</style>