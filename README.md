# Ногтевая

Проект **Ногтевая** создан с использованием фреймворка **Nuxt 3** и представляет собой современный веб-сайт для салона ногтевого сервиса. Основная цель проекта — создание привлекательного, интуитивно понятного интерфейса для клиентов салона, обеспечение удобного доступа к информации об услугах, контактах и возможность оставлять отзывы.

## Описание компонента `app.vue`

Компонент `app.vue` является корневым компонентом приложения **Ногтевая**. Он задает основную структуру страницы, включая заголовок (`Header`), основное содержимое (`NuxtPage`) и подвал (`Footer`). Компонент отвечает за глобальную компоновку и рендеринг контента в зависимости от текущего маршрута.

### Объяснение кода в `app.vue`

- `<Header/>` — компонент заголовка, содержащий логотип, контактную информацию и навигационное меню.
- `<main class="main">` — основная область страницы, где отображается содержимое текущего маршрута через компонент `NuxtPage`.
- `<Footer/>` — компонент подвала с контактной информацией, графиком работы и ссылками на социальные сети.
- Стили определены с использованием препроцессора SASS, включая импорт глобальных стилей, цветов, шрифтов и миксинов. Адаптивные стили обеспечивают корректное отображение на устройствах с разными размерами экрана.

```vue
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
```

## Описание компонента `Header.vue`

Компонент `Header.vue` представляет собой верхнюю часть сайта, которая содержит логотип, контактную информацию и навигационное меню. Этот компонент является ключевым элементом пользовательского интерфейса, обеспечивающим доступ к основным разделам сайта.

### Объяснение кода в `Header.vue`

- `<header class="header">` — контейнер для всего содержимого заголовка.
- `<div class="header__content">` — блок, содержащий контактную информацию и логотип.
- `<NuxtLink to="tel:+7 (950) 505-56-81" class="header__logo-link header__logo-link--contact">` — ссылка на телефонный номер с соответствующим стилем.
- `<NuxtLink to="/" class="header__logo-link">` — ссылка на главную страницу с логотипом.
- `<NavMenu />` — компонент навигационного меню, который интегрирован в заголовок.
- Стили включают адаптивный дизайн, который меняет расположение элементов в зависимости от размера экрана, обеспечивая оптимальное отображение на мобильных устройствах.

```vue
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
```

## Описание компонента `Footer.vue`

Компонент `Footer.vue` представляет собой нижнюю часть сайта, которая содержит контактную информацию, адрес, график работы, ссылки на мессенджеры и социальные сети. Этот компонент обеспечивает доступ к важной информации о салоне и способам связи.

### Объяснение кода в `Footer.vue`

- `<footer class="footer">` — основной контейнер для всего содержимого подвала.
- `<div class="footer__container">` — контейнер, разделяющий подвал на три колонки.
- Первая колонка (`<div class="footer__column">`) содержит адрес и график работы салона.
- Вторая колонка содержит контактный номер и ссылки на мессенджеры (WhatsApp, Viber, Telegram).
- Третья колонка содержит ссылки на социальные сети (ВКонтакте и другие).
- Стили обеспечивают адаптивное отображение на различных устройствах, с изменением расположения колонок на мобильных устройствах.

```vue
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
                    <p class="font-text_medium">Суббота: с 11:00 до 17:00</p>
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
                    <NuxtLink to="#" class="footer__messenger-link footer__messenger-link--tg">
                        <IconTelegram class="footer__messenger-icon" filled/>
                    </NuxtLink>
                </div>
            </div>
            
            <div class="footer__column">
                <div class="footer__social">
                    <h3 class="font-text_medium footer__subtitle">Наши соц. сети</h3>
                    <div class="footer__social-icons">
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

        &--tg
            path
                fill: $black
        
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
```

## Описание компонента `NavMenu.vue`

Компонент `NavMenu.vue` реализует навигационное меню сайта, которое обеспечивает переход между различными страницами. Меню адаптивно и трансформируется в мобильное меню-бургер на устройствах с маленьким экраном.

### Объяснение кода в `NavMenu.vue`

- Компонент использует скрипт setup для определения логики работы меню, включая отслеживание текущего маршрута и состояния видимости меню на мобильных устройствах.
- `toggleNavMenu()` — функция для переключения видимости меню на мобильных устройствах с анимацией.
- `checkIsMobile()` — функция для определения типа устройства по ширине экрана.
- `isActiveLink(url)` — функция для определения активной ссылки на основе текущего маршрута.
- В шаблоне используется компонент `<transition>` для анимации появления/исчезновения оверлея меню.
- Меню содержит список ссылок (`<ul class="header__list">`) на основные разделы сайта.
- На мобильных устройствах добавляются кнопки для открытия и закрытия меню с соответствующими иконками.

```vue
<script setup>
import data from '@services/data';
import { showMenu, hideMenu } from '../animation/animation';

const navMenuItems = data.navMenuItems();
const navMenuVisible = ref(false);
const navMenu = ref(null);
const isMobile = ref(false);
const route = useRoute();

const toggleNavMenu = () => {
  if (!isMobile.value || !navMenu.value) return;
  navMenuVisible.value = !navMenuVisible.value;
  if (navMenuVisible.value) {
    showMenu(navMenu.value);
    document.body.style.overflow = 'hidden';
  } else {
    hideMenu(navMenu.value);
    document.body.style.overflow = 'auto';
  }
};

const checkIsMobile = () => {
  isMobile.value = window.innerWidth <= 859;
};

const isActiveLink = (url) => {
  return route.path === url;
};

onMounted(() => {
  checkIsMobile();
});
</script>
<template>
  <transition name="fade">
    <div 
      v-if="navMenuVisible" 
      @click="toggleNavMenu" 
      class="header__menu-overlay"
    ></div>
  </transition>    
  <nav ref="navMenu" class="header__menu">
      <button @click="toggleNavMenu" class="header_burger-btn header_burger-btn--close">
          <IconX class="header_burger-icon" filled />
      </button>
      <ul class="header__list">
          <li v-for="item in navMenuItems" class="header__list-item">
              <NuxtLink @click="toggleNavMenu" :class="['header__list-link', 'btn', 'font-text_extra-large', { 'header__list-link--active': isActiveLink(item.url) }]" :to="item.url">
                  {{ item.text }}
              </NuxtLink>
          </li>
      </ul>
  </nav>
  <button @click="toggleNavMenu" class="header_burger-btn header_burger-btn--open">
      <IconBurger class="header_burger-icon" filled />
  </button>
</template>
<style lang="sass">
@import '@color'
@import '@mixin'
@import '@global'
  
.header__menu
  display: flex
  padding: 20px 
  background: $white
  border-radius: 40px
  z-index: 1

  .header__list
    width: 100%
    display: flex
    justify-content: space-between
    gap: 10px
    
.header__list-item
    display: flex
    align-items: end
    width: 100%

.header__list-link
    text-decoration: none
    text-align: center
    white-space: nowrap
    color: $black
    background: $white  
    width: 100%
    padding: 10px 10px 
    cursor: pointer
    border-radius: 40px !important
    @include transition
    
    &--active
      background: $black !important
      color: $white !important  

.header_btn
    margin-top: 10px
    display: flex
    justify-self: end

.header_burger-btn
    display: none

.header__menu-overlay
  position: fixed
  top: 0
  bottom: 0
  left: 0
  right: 0
  z-index: 2
  background: $black
  opacity: 0.4
  @include transition

.fade-enter-active,
.fade-leave-active 
  @include transition

.fade-enter-from,
.fade-leave-to 
  opacity: 0;


.fade-enter-to,
.fade-leave-from 
  opacity: 0.4;

@include mobile
    .header__menu
      display: none
      flex-direction: row-reverse
      background: $main-color
      transform: translateX(-100%) 
      position: fixed
      z-index: 3
      top: 15px
      left: 0
      width: calc(100% - 40px) 
      height: max-content
      margin: 0 20px
      gap: 20px

    .header_burger-btn
      position: absolute
      border-radius: 40px 
      width: 40px 
      height: 40px
      background: $white
      align-self: flex-end
      &--close
        align-self: flex-start
        position: relative
        flex-shrink: 0

    .header_burger-icon
        width: 15px
        height: 15px

    .header__list
      width: 100%
      flex-direction: column

    .header__list-item
      .header__list-link
      .font-text_medium
        font-size: 26px !important


    .header_burger-btn
        display: block

</style>
```

## Установка и запуск

Убедитесь, что у вас установлены все зависимости:

```bash
# npm
npm install

# yarn
yarn install

# pnpm
pnpm install
```

Запуск сервера разработки на `http://localhost:3000`:

```bash
# npm
npm run dev

# yarn
yarn dev

# pnpm
pnpm dev
```

Сборка для продакшена:

```bash
# npm
npm run build

# yarn
yarn build

# pnpm
pnpm build
```

Подробнее о деплое можно узнать в [документации Nuxt](https://nuxt.com/docs/getting-started/deployment).
