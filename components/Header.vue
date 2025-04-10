<template>
    <header class="header">
        <div class="header__content">
            <NuxtLink to="tel:+7 (950) 505-56-81" class="header__logo-link header__logo-link--contact font-text_medium">
                <b>Контактный номер:</b>
                <p>
                    <b>+7 (950) 505-56-81</b>
                </p>
            </NuxtLink>
            <NuxtLink to="/" class="header__logo-link">
                <IconLogo class="header__logo-img" filled />
                <p class="header__logo-text font-text_small">
                    <b>НОГТЕВАЯ</b>
                </p>
            </NuxtLink>
        </div>
        <NavMenu />
    </header>
</template>
<style lang="sass">
@import '@color'
@import '@mixin'
@import '@global'

.header
    background: $main-color
    border-radius: $radius
    position: relative
    padding: 20px
    gap: 20px
    display: flex
    flex-direction: column
    &__content
        position: relative
        display: flex
        flex-direction: row-reverse
        justify-content: space-between


.header__logo
    &-link
        min-width: 105px
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        width: max-content
        background: $white
        padding: 10px 20px
        border-radius: 40px
        color: $black
        &--contact
            border-radius: 30px
    
    &-img
        width: 60px
        height: 60px
        border-radius: 40%
        border: 4px solid $white
        background: $white

    &-text
        text-align: center
        color: grey
        font-size: 12px !important

@include mobile
    .header
        border-radius: 40px
        gap: 10px
        &__content
            flex-direction: column-reverse
            align-items: center

    .header__logo
        &-img
            width: 100px
            height: 100px

    .header__logo
        &-link
            &--contact
                margin-top: 10px

</style>