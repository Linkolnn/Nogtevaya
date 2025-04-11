<template>
    <section class="contacts section">
        <h2 class="contacts__title font-h2">Контакты</h2>

        <div class="contacts__content">
            <div class="contacts__info">
                <div class="contacts__block">
                    <h2 class="contacts__subtitle font-h3">Горячая линия</h2>
                    <p class="contacts__text font-text_large">+7 (950) 505-56-81</p>
                </div>

                <div class="contacts__block">
                    <h2 class="contacts__subtitle font-h3">Адрес</h2>
                    <p class="contacts__text font-text_large">г. Урай, ул. Ленинская, дом 0</p>
                </div>

                <div class="contacts__block">
                    <h2 class="contacts__subtitle font-h3">График работы</h2>
                    <p class="contacts__text font-text_medium">Пн-Пт: с 09:00 до 17:00</p>
                    <p class="contacts__text font-text_medium">Сб: с 11:00 до 15:00</p>
                </div>

                <div class="contacts__block">
                    <h2 class="contacts__subtitle font-h3">Email</h2>
                    <p class="contacts__text font-text_large">mail@company.ru</p>
                </div>

                <div class="contacts__block">
                    <h2 class="contacts__subtitle font-h3">Реквизиты</h2>
                    <p class="contacts__text font-text_medium">ИНН 000000000</p>
                    <p class="contacts__text font-text_medium">ОГРН 000000000</p>
                </div>

                <div class="contacts__block">
                    <h2 class="contacts__subtitle font-h3">Мессенджеры</h2>
                    <div class="contacts__messengers">
                        <NuxtLink to="#" class="contacts__messenger-link">
                            <IconWhatsapp class="contacts__messenger-icon" />
                        </NuxtLink>
                        <NuxtLink to="#" class="contacts__messenger-link">
                            <IconViber class="contacts__messenger-icon" />
                        </NuxtLink>
                        <NuxtLink to="#" class="contacts__messenger-link">
                            <IconTelegram class="contacts__messenger-icon" />
                        </NuxtLink>
                    </div>
                </div>

                <div class="contacts__block">
                    <h2 class="contacts__subtitle font-h3">Социальные сети</h2>
                    <div class="contacts__social">
                        <NuxtLink to="#" class="contacts__social-link contacts__social-link--vk">
                            <IconVk class="contacts__social-icon" />
                        </NuxtLink>
                    </div>
                </div>
            </div>
            
            <div class="contacts__map">
                <YandexMap 
                    :center="[61.698653, 76.677369]" 
                    :zoom="16"
                    title="Ногтевой сервис"
                    address="г. Урай, ул. Ленинская, дом 0"
                />
            </div>
        </div>
    </section>
</template>

<script setup>
// The Yandex Maps API is already loaded in nuxt.config.ts
</script>

<style lang="sass">
@import '@color'
@import '@mixin'
@import '@global'

.contacts
    &__title
        margin: 20px 0px
    
    &__content
        display: flex
        gap: 40px
        
    
    &__info
        flex: 1
        display: grid
        grid-template-columns: 1fr 1fr
        gap: 15px
        background: $main-color
        border-radius: $radius
        padding: 20px
    
    &__map
        flex: 1.5
    
    &__block
        padding: 20px
        background: $white
        border-radius: $radius
    
    &__subtitle
        margin-bottom: 10px
    
    &__text
        margin-bottom: 5px
        
        &:last-child
            margin-bottom: 0
    
    &__messengers
        display: flex
        gap: 15px
        margin-top: 10px
    
    &__messenger-link
        width: 40px
        height: 40px
        background: $white
        border-radius: 50%
        display: flex
        align-items: center
        justify-content: center
        transition: all 0.3s ease
        
        &:hover
            transform: translateY(-3px)
    
    &__messenger-icon
        width: 24px
        height: 24px
        color: $black
    
    &__social
        display: flex
        gap: 15px
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
        
        &:hover
            transform: translateY(-3px)
            
    &__social-icon
        width: 20px
        height: 20px
        color: #FFFFFF

@include mobile
    .contacts
        &__content
            flex-direction: column
            gap: 20px
        &__info
            grid-template-columns: 1fr
        
</style>