<template>
    <section class="login-section">
        <div class="login-container">
            <h2 class="login-title font-h2">Вход</h2>
            
            <div v-if="error" class="error-message">
                {{ error }}
            </div>
            
            <form class="login-form" @submit.prevent="handleLogin">
                <div class="form-group">
                    <label for="login" class="form-label font-text_small">Логин</label>
                    <input 
                        type="text" 
                        id="login" 
                        v-model="login" 
                        class="inp form-input font-text_medium" 
                        required
                        placeholder="Введите логин"
                    />
                </div>
                
                <div class="form-group">
                    <label for="password" class="form-label font-text_small">Пароль</label>
                    <input 
                        type="password" 
                        id="password" 
                        v-model="password" 
                        class="inp form-input font-text_medium" 
                        required
                        placeholder="Введите пароль"
                    />
                </div>
                
                <button type="submit" class="submit-button btn font-text_large">Войти</button>
            </form>
        </div>
    </section>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const login = ref('');
const password = ref('');
const error = ref('');

// Проверка, авторизован ли пользователь уже
const isAuthenticated = () => {
    if (process.client) {
        const cookies = document.cookie.split(';').map(cookie => cookie.trim());
        return cookies.some(cookie => cookie.startsWith('adminAuthenticated=true'));
    }
    return false;
};

// Перенаправление, если уже авторизован
if (process.client && isAuthenticated()) {
    router.push('/admin');
}

const handleLogin = () => {
    // Проверяем учетные данные из .env
    const config = useRuntimeConfig();
    const adminLogin = config.public.ADMIN_LOGIN;
    const adminPassword = config.public.ADMIN_PASSWORD;
    
    if (login.value === adminLogin && password.value === adminPassword) {
        // Создаем куки для сессии админа
        document.cookie = "adminAuthenticated=true; path=/; max-age=3600"; // 1 час
        
        // Редирект на главную страницу админа
        router.push('/admin');
    } else {
        error.value = 'Неверный логин или пароль';
    }
};
</script>

<style lang="sass" scoped>
@import '@color'
@import '@mixin'
@import '@global'

.login-section
    display: flex
    justify-content: center
    align-items: center
    min-height: 70vh

.login-container
    max-width: 500px
    width: 100%
    background: $main-color
    padding: 20px
    border-radius: $radius
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1)

.login-title
    margin-bottom: 30px
    padding: 20px
    background: $white
    border-radius: $radius

.login-form
    display: flex
    flex-direction: column
    gap: 20px

.form-group
    background: $white
    padding: 20px
    border-radius: $radius

.form-label
    display: block
    margin-bottom: 8px
    font-weight: 500

.form-input
    width: 100%

.submit-button
    background: $black
    color: $white
    padding: 15px 30px
    border-radius: 40px
    align-self: center
    width: 100%
    font-weight: 500
    margin-top: 10px
    
    &:hover
        background: darken($black, 10%)

.error-message
    background: #FFEBEE
    color: #D32F2F
    padding: 15px
    border-radius: $radius
    margin-bottom: 20px
    text-align: center
    font-weight: 500
</style> 