<template>
    <footer class="footer">
        <div class="footer__container">
            <div class="footer__column">
                <div class="footer__address">
                    <p class="font-text_medium">г. Урай</p>
                    <p class="font-text_medium">ул. Ленинская, дом 0</p>
                    <NuxtLink to="/contacts#map" class="footer__link font-text_small">Смотреть на карте</NuxtLink>
                </div>
                <div class="footer__work-hours">
                    <h3 class="font-text_medium footer__subtitle">График работы</h3>
                    <p class="font-text_medium">Пн-Пт: с 09:00 до 17:00</p>
                    <p class="font-text_medium">Суббота: с 11:00 до 15:00</p>
                </div>
            </div>
            
            <div class="footer__column">
                <div class="footer__hotline">
                    <h3 class="font-text_medium footer__subtitle">Контактный номер</h3>
                    <NuxtLink to="tel:+7 (950) 505-56-81" class="footer__phone font-text_medium">+7 (950) 505-56-81</NuxtLink>
                </div>
                <div class="footer__messengers">
                    <NuxtLink to="#" class="footer__messenger-link">
                        <IconWhatsapp class="footer__messenger-icon" />
                    </NuxtLink>
                    <NuxtLink to="#" class="footer__messenger-link">
                        <IconViber class="footer__messenger-icon" />
                    </NuxtLink>
                    <NuxtLink to="#" class="footer__messenger-link">
                        <IconTelegram class="footer__messenger-icon" />
                    </NuxtLink>
                </div>
            </div>
            
            <div class="footer__column">
                <div class="footer__social">
                    <h3 class="font-text_medium footer__subtitle">Наши соц. сети</h3>
                    <div class="footer__social-icons">
                        <NuxtLink to="#" class="footer__social-link footer__social-link--odnoklassniki">
                            <IconOdnoklassniki class="footer__social-icon" />
                        </NuxtLink>
                        <NuxtLink to="#" class="footer__social-link footer__social-link--vk">
                            <IconVk class="footer__social-icon" />
                        </NuxtLink>
                        <NuxtLink to="#" class="footer__social-link footer__social-link--more">
                            <IconMore class="footer__social-icon" />
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>
<style lang="sass">
@import '@color'
@import '@mixin'
@import '@global'

.footer
    background: $main-color
    padding: 40px
    border-radius: $radius
    width: 100%
    
    &__container
        display: flex
        justify-content: space-between
        flex-wrap: wrap
        gap: 40px
    
    &__column
        background: $white
        padding: 20px
        border-radius: $radius
        display: flex
        flex-direction: column
        gap: 20px
        flex: 1
        min-width: 200px
    
    &__subtitle
        font-weight: 700
        margin-bottom: 5px
    
    &__link
        color: $black
        text-decoration: underline
        transition: all 0.3s ease
        display: inline-block
        margin-top: 5px
        
        &:hover
            opacity: 0.7
    
    &__phone
        display: block
        color: $black
        font-weight: 600
        margin-bottom: 5px
    
    &__mail-link
        color: $black
        text-decoration: underline
        font-weight: 600
    
    &__messengers
        display: flex
        gap: 15px
        margin-top: 10px
    
    &__messenger-link
        width: 24px
        height: 24px
        display: flex
        align-items: center
        justify-content: center
        opacity: 0.8
        transition: all 0.3s ease
        
        &:hover
            opacity: 1
    
    &__messenger-icon
        width: 24px
        height: 24px
        color: $black
    
    &__social-icons
        display: flex
        gap: 10px
        margin-top: 10px
    
    &__social-link
        width: 40px
        height: 40px
        border-radius: 10px
        display: flex
        align-items: center
        justify-content: center
        transition: all 0.3s ease
        
        &--odnoklassniki
            background: #F97400
        
        &--vk
            background: #0077FF
        
        &--more
            background: $black
        
        &:hover
            transform: translateY(-3px)
            
    &__social-icon
        width: 20px
        height: 20px
        color: #FFFFFF
    
    &__address, &__work-hours, &__hotline, &__office, &__email, &__social
        display: flex
        flex-direction: column
        gap: 5px

@include tablet
    .footer
        &__container
            gap: 30px
        
        &__column
            min-width: 180px

@include mobile
    .footer
        padding: 20px
        
        &__container
            flex-direction: column
            gap: 30px
        
        &__column
            width: 100%
            gap: 20px
            
        &__social-icons
            justify-content: flex-start
</style>