<template>
    <div v-if="isAuth">
        <section class="admin-section">
            <div class="admin-header">
                <h1 class="admin-title font-h2">Заказы</h1>
                <button class="logout-button btn font-text_extra-large" @click="handleLogout">Выйти</button>
            </div>
            
            <div v-if="orders.length === 0" class="no-orders">
                <p class="font-text_large">Нет активных заказов</p>
            </div>
            
            <div v-else class="orders-container">
                <div v-for="(order, index) in orders" :key="index" class="order-card">
                    <div class="order-header">
                        <h2 class="font-h4">Заказ #{{ order.id }}</h2>
                        <p class="font-text_medium">Дата: {{ order.formattedDate }}</p>
                        <p class="font-text_medium">Время: {{ order.time }}</p>
                    </div>
                    
                    <div class="order-customer">
                        <h3 class="font-text_large">Клиент:</h3>
                        <p class="font-text_medium">{{ order.contactInfo.name }}</p>
                        <p class="font-text_medium">Телефон: {{ order.contactInfo.phone }}</p>
                        <p v-if="order.contactInfo.comments" class="font-text_medium">
                            Комментарий: {{ order.contactInfo.comments }}
                        </p>
                    </div>
                    
                    <div class="order-services">
                        <h3 class="font-text_large">Услуги:</h3>
                        <ul class="services-list">
                            <li v-for="(service, serviceIndex) in order.services" :key="serviceIndex" class="font-text_medium">
                                {{ service.name }} ({{ service.masterName }}) - {{ service.price }} ₽
                            </li>
                        </ul>
                        <h3 class="font-text_large">Итого: {{ order.totalPrice }} ₽</h3>
                    </div>
                    
                    <div class="order-actions">
                        <button class="complete-button btn font-text_extra-large" @click="openConfirmDialog(order.id)">
                            Выполнено
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Модальное окно подтверждения -->
            <div v-if="showConfirmDialog" class="confirm-dialog-overlay" @click="closeConfirmDialog">
                <div class="confirm-dialog" @click.stop>
                    <h2 class="font-h4">Подтверждение</h2>
                    <p class="font-text_medium">Вы уверены, что хотите отметить заказ как выполненный?</p>
                    <div class="confirm-actions">
                        <button class="confirm-button btn" @click="completeOrder">Подтвердить</button>
                        <button class="cancel-button btn" @click="closeConfirmDialog">Отмена</button>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <div v-else class="loading-screen">
        <!-- Показываем пустой экран во время проверки аутентификации -->
    </div>
</template>

<script setup>
const router = useRouter();
const orders = ref([]);
const showConfirmDialog = ref(false);
const orderToComplete = ref(null);
const isAuth = ref(false); // Флаг для контроля отображения содержимого

// Функция для проверки аутентификации
const isAuthenticated = () => {
    if (process.client) {
        const cookies = document.cookie.split(';').map(cookie => cookie.trim());
        return cookies.some(cookie => cookie.startsWith('adminAuthenticated=true'));
    }
    return false;
};

// Немедленная проверка аутентификации при загрузке компонента
if (process.client) {
    // Проверяем аутентификацию и перенаправляем если не авторизован
    if (!isAuthenticated()) {
        router.push('/admin/login');
    } else {
        // Устанавливаем флаг только если пользователь авторизован
        isAuth.value = true;
    }
}

// Загрузка заказов из cookie
const loadOrders = () => {
    // Загружаем заказы только если пользователь авторизован
    if (!isAuth.value) return;
    
    try {
        const ordersCookie = getCookie('orders');
        if (ordersCookie) {
            orders.value = JSON.parse(ordersCookie);
        }
    } catch (error) {
        console.error('Ошибка при загрузке заказов:', error);
    }
};

// Получение значения cookie по имени
const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

// Сохранение заказов в cookie
const saveOrders = () => {
    document.cookie = `orders=${JSON.stringify(orders.value)}; path=/; max-age=2592000`; // 30 дней
};

// Открытие диалога подтверждения
const openConfirmDialog = (orderId) => {
    orderToComplete.value = orderId;
    showConfirmDialog.value = true;
};

// Закрытие диалога подтверждения
const closeConfirmDialog = () => {
    showConfirmDialog.value = false;
    orderToComplete.value = null;
};

// Выполнение заказа (удаление карточки)
const completeOrder = () => {
    if (orderToComplete.value !== null) {
        orders.value = orders.value.filter(order => order.id !== orderToComplete.value);
        saveOrders();
        closeConfirmDialog();
    }
};

// Выход из аккаунта
const handleLogout = () => {
    // Удаляем куки авторизации
    document.cookie = "adminAuthenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    
    // Скрываем содержимое страницы
    isAuth.value = false;
    
    // Редирект на страницу входа
    router.push('/admin/login');
};

onMounted(() => {
    // Загружаем заказы только если пользователь авторизован
    if (isAuth.value) {
        loadOrders();
    }
});
</script>
<style lang="sass" scoped>
@import '@color'
@import '@mixin'
@import '@global'

.loading-screen
    height: 100vh
    background: $white

.admin-section
    margin-top: 30px

.admin-header
    display: flex
    align-items: center
    justify-content: space-between
    margin-bottom: 30px
    background: $main-color
    padding: 20px
    border-radius: $radius

.admin-title
    text-align: start
    background: $white
    padding: 10px 20px
    border-radius: $radius

.logout-button
    background: $black
    color: $white
    padding: 10px 20px
    border-radius: $radius
    
    &:hover
        background: #333

.no-orders
    background: $white
    padding: 50px
    border-radius: $radius
    text-align: center
    margin-top: 30px

.orders-container
    display: grid
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr))
    gap: 20px
    margin-top: 20px

.order-card
    padding: 20px
    background: $main-color
    border-radius: $radius
    overflow: hidden
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1)
    gap: 10px
    display: flex
    flex-direction: column

.order-header
    background: $white
    padding: 20px
    border-radius: $radius
    
    h2
        margin-top: 0
        margin-bottom: 10px
    
    p
        margin: 5px 0

.order-customer, .order-services
    background: $white
    padding: 20px
    border-radius: $radius
    border-bottom: 1px solid #eee
    display: flex
    flex-direction: column
    gap: 10px
    
    h3
        margin-top: 0
        font-weight: 600

.services-list
    height: 150px
    overflow-y: auto
    margin: 10px 0
    
    li
        margin-bottom: 5px

.order-actions
    padding: 15px
    margin-top: auto

.complete-button
    width: 100%
    font-weight: 500
    

// Стили для модального окна подтверждения
.confirm-dialog-overlay
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: rgba(0, 0, 0, 0.5)
    display: flex
    justify-content: center
    align-items: center
    z-index: 1000

.confirm-dialog
    background: $white
    border-radius: $radius
    padding: 20px
    max-width: 400px
    width: 100%
    
    h2
        margin-top: 0
        margin-bottom: 15px
    
    p
        margin-bottom: 20px

.confirm-actions
    display: flex
    justify-content: flex-end
    gap: 10px

.cancel-button
    background: #cb1c1c
    color: $white
    
    &:hover
        background: darken(#cb1c1c, 10%)

.confirm-button
    background: #4CAF50
    color: $white
    
    &:hover
        background: darken(#4CAF50, 10%)

@include mobile
    .admin-header
        flex-direction: column
        gap: 15px
        text-align: center
        > *
            width: 100%
    
    .orders-container
        grid-template-columns: 1fr
    
    .confirm-dialog
        margin: 20px
        max-width: calc(100% - 40px)
</style> 