<template>
    <section class="services-section section">
        <h1 class="services-title font-h2">Запись на услуги</h1>

        <form class="booking-form" @submit.prevent="submitBooking">
            <!-- Step 1: Select Master -->
            <div class="form-step">
                <div class="form-step-header">
                    <h2 class="step-title font-h3">Выберите мастеров</h2>
                    <p class="step-description font-text_medium">Нажмите на карточки мастеров, чтобы выбрать специалистов (можно выбрать несколько)</p>
                </div>
                <div class="masters-list">
                    <div 
                        v-for="(master, index) in masters" 
                        :key="index"
                        class="master-item"
                        :class="{ 'master-item--selected': selectedMasters.includes(index) }"
                        @click="toggleMaster(index)"
                    >
                        <h3 class="master-name font-h4">{{ master.master }}</h3>
                        <p class="master-description font-text_medium">Специализация: {{ getMasterSpecialization(master) }}</p>
                    </div>
                </div>
            </div>

            <!-- Step 2: Select Services -->
            <div v-if="selectedMasters.length > 0" class="form-step">
                <div class="form-step-header">
                    <h2 class="step-title font-h3">Выберите услуги</h2>
                    <p class="step-description font-text_medium">Нажмите на услуги, которые хотите добавить в заказ</p>
                </div>

                <div v-for="masterId in selectedMasters" :key="masterId" class="master-services-section">
                    <h3 class="master-services-title font-h4">{{ masters[masterId].master }}</h3>
                    
                    <div class="services-list">
                        <div 
                            v-for="(service, serviceId) in masters[masterId].services" 
                            :key="`${masterId}-${serviceId}`"
                            class="service-item"
                            :class="{ 'service-item--selected': isServiceSelected(masterId, serviceId) }"
                            @click="toggleService(masterId, serviceId)"
                        >
                            <img :src="service.photo || logoImage" alt="" class="service-image" />
                            <div class="service-info">
                                <h3 class="service-name font-text_large">{{ service.service }}</h3>
                                <div class="service-meta">
                                    <p class="service-details font-text_medium">
                                        <span class="service-price">{{ service.price }} ₽</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="selectedServices.length > 0" class="selected-summary">
                    <h4 class="font-h4">
                        Выбрано услуг: {{ selectedServices.length }}
                    </h4>
                    <h4 class="font-h4">
                        Общая стоимость: {{ totalPrice }} ₽
                    </h4>
                </div>
            </div>

            <!-- Step 3: Select Date and Time -->
            <div v-if="selectedMasters.length > 0 && selectedServices.length > 0" class="form-step">
                <div class="form-step-header">
                    <h2 class="step-title font-h3">Выберите дату и время</h2>
                    <p class="step-description font-text_medium">Выберите удобную дату и время для записи</p>
                </div>

                <div class="date-picker-container">
                    <VDatePicker 
                        v-model="selectedDate" 
                        :min-date="new Date()"
                        :max-date="maxDate"
                        :attributes="calendarAttributes"
                        is-required
                        mode="single"
                        @dayclick="handleDateClick"
                        class="custom-datepicker"
                        color="pink"
                        multi-calendars
                        :columns="isDesktop ? 2 : 1"
                    />
                </div>

                <div v-if="selectedDate && selectedDateObj && selectedDateObj.isAvailable" class="time-selection">
                    <div class="time-title-container">
                        <h3 class="time-title font-text_medium">Доступное время:</h3>
                    </div>
                    <div class="time-slots">
                        <button
                            v-for="timeSlot in selectedDateObj.timeSlots"
                            :key="timeSlot"
                            type="button"
                            class="time-slot btn font-text_large"
                            :class="{ 'time-slot--selected': selectedTime === timeSlot }"
                            @click="selectTime(timeSlot)"
                        >
                            {{ timeSlot }}
                        </button>
                    </div>
                </div>
                
                <div v-else-if="selectedDate && selectedDateObj && !selectedDateObj.isAvailable" class="time-selection time-selection--unavailable">
                    <div class="time-title-container">
                        <h3 class="time-title font-text_medium">Выбранная дата недоступна для записи</h3>
                        <p class="font-text_medium">Пожалуйста, выберите другую дату</p>
                    </div>
                </div>
            </div>
            <!-- Booking Summary -->
            <div v-if="selectedMasters.length > 0 && selectedServices.length > 0 && selectedDate && selectedTime" class="booking-summary">
                <h2 class="summary-title font-h3">Ваша запись</h2>
                <div class="summary-content">
                    <p class="font-text_medium"><strong>Выбранные мастера:</strong></p>
                    <ul class="summary-masters">
                        <li v-for="masterId in selectedMasters" :key="masterId" class="font-text_medium">
                            {{ masters[masterId].master }}
                        </li>
                    </ul>

                    <p class="font-text_medium"><strong>Выбранные услуги:</strong></p>
                    <ul class="summary-services">
                        <li v-for="(service, index) in selectedServices" :key="index" class="font-text_medium">
                            {{ service.serviceName }} ({{ masters[service.masterId].master }}) - {{ service.price }} ₽
                        </li>
                    </ul>
                    <p class="font-text_medium"><strong>Дата:</strong> {{ getFormattedDate(selectedDate) }}</p>
                    <p class="font-text_medium"><strong>Время:</strong> {{ selectedTime }}</p>
                    <p class="font-text_medium"><strong>Итого:</strong> {{ totalPrice }} ₽</p>
                </div>
                <div v-if="selectedServices.length > 0" class="selected-summary">
                    <h4 class="font-h4">
                        Выбрано услуг: {{ selectedServices.length }}
                    </h4>
                    <h4 class="font-h4">
                        Общая стоимость: {{ totalPrice }} ₽
                    </h4>
                </div>
            </div>
            <!-- Step 4: Contact Information -->
            <div v-if="selectedMasters.length > 0 && selectedServices.length > 0 && selectedDate && selectedTime" class="form-step">
                <div class="form-step-header">
                    <h2 class="step-title font-h3">Ваши контактные данные</h2>
                    <p class="step-description font-text_medium">Заполните форму, чтобы мы могли связаться с вами</p>
                </div>

                <div class="form-group">
                    <label for="name" class="form-label font-text_small">Имя</label>
                    <input 
                        type="text" 
                        id="name" 
                        v-model="contactInfo.name" 
                        class="inp form-input font-text_medium" 
                        required
                        placeholder="Введите ваше имя"
                    />
                </div>

                <div class="form-group">
                    <label for="phone" class="form-label font-text_small">Номер телефона</label>
                    <input 
                        type="tel" 
                        id="phone" 
                        v-model="contactInfo.phone" 
                        class="inp form-input font-text_medium" 
                        required
                        placeholder="+7 (___) ___-__-__"
                    />
                </div>

                <div class="form-group">
                    <label for="comments" class="form-label font-text_small">Дополнительная информация</label>
                    <textarea 
                        id="comments" 
                        v-model="contactInfo.comments" 
                        class="textarea inp form-input font-text_medium" 
                        placeholder="Здесь вы можете указать любые дополнительные пожелания или вопросы"
                    ></textarea>
                </div>

                <button type="submit" class="submit-button btn font-text_large">Записаться на процедуру</button>
            </div>
        </form>
    </section>
</template>

<script setup>
import data from '@/services/data.js';
const logoImage = new URL('../assets/img/logo.png', import.meta.url).href
// Window width tracking
const windowWidth = ref(0);
const isDesktop = ref(false);

// Update window width on client side
onMounted(() => {
  // Set initial values
  windowWidth.value = window.innerWidth;
  updateIsDesktop();
  
  // Add resize listener
  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth;
    updateIsDesktop();
  });
});

// Update desktop status based on media query
function updateIsDesktop() {
  if (process.client) {
    isDesktop.value = window.matchMedia('(min-width: 859px)').matches;
  }
}

// Get data from services
const masters = data.priceList();
const availableDates = data.availableDates();

// Current month and year
const currentDate = new Date();

// Next month and year
const nextMonthDate = new Date(currentDate);
nextMonthDate.setMonth(currentDate.getMonth() + 1);

// User selections
const selectedMasters = ref([]);
const selectedServices = ref([]);
const selectedDate = ref('');
const selectedTime = ref('');
const contactInfo = ref({
    name: '',
    phone: '',
    comments: ''
});

// Computed properties
const totalPrice = computed(() => {
    return selectedServices.value.reduce((total, service) => {
        return total + service.price;
    }, 0);
});

// Set max date to 30 days from now
const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 30);

// Calendar attributes for highlighting available dates
const calendarAttributes = computed(() => {
    return [
        // Highlight available dates in green
        {
            key: 'available',
            dates: availableDates.filter(date => date.isAvailable && new Date(date.date).getDay() !== 6).map(date => date.date),
            highlight: {
                backgroundColor: '#4CAF50',
                opacity: 0.3
            },
            popover: {
                label: 'Доступно для записи'
            }
        },
        // Highlight Saturdays in a special color
        {
            key: 'saturday',
            dates: availableDates.filter(date => date.isAvailable && new Date(date.date).getDay() === 6).map(date => date.date),
            highlight: {
                backgroundColor: '#FF9800', // Orange color for Saturday
                opacity: 0.3
            },
            popover: {
                label: 'Суббота: доступна запись с 11:00 до 17:00'
            }
        },
        // Highlight unavailable dates in red
        {
            key: 'unavailable',
            dates: availableDates.filter(date => !date.isAvailable).map(date => date.date),
            highlight: {
                backgroundColor: '#FF5252',
                opacity: 0.3
            },
            popover: {
                label: 'Недоступно для записи'
            }
        }
    ];
});

// The selected date object from availableDates
const selectedDateObj = computed(() => {
    if (!selectedDate.value) return null;
    
    // Convert VDatePicker date object to YYYY-MM-DD format
    let dateString;
    if (typeof selectedDate.value === 'string') {
        dateString = selectedDate.value;
    } else if (selectedDate.value instanceof Date) {
        const date = new Date(selectedDate.value);
        // Ensure we're using local date
        dateString = date.getFullYear() + '-' + 
            String(date.getMonth() + 1).padStart(2, '0') + '-' + 
            String(date.getDate()).padStart(2, '0');
    } else {
        return null;
    }
    
    // Find the matching date in availableDates
    const matchingDate = availableDates.find(d => d.date === dateString);
    return matchingDate;
});

// Methods
const getMasterSpecialization = (master) => {
    // Determine specialization based on services
    if (master.services.some(s => s.service.toLowerCase().includes('маникюр'))) {
        return 'Маникюр';
    } else if (master.services.some(s => s.service.toLowerCase().includes('педикюр'))) {
        return 'Педикюр';
    } else {
        return 'Ногтевой сервис';
    }
};

const toggleMaster = (masterId) => {
    const index = selectedMasters.value.indexOf(masterId);
    if (index === -1) {
        selectedMasters.value.push(masterId);
    } else {
        selectedMasters.value.splice(index, 1);
        
        // Remove any selected services from this master
        selectedServices.value = selectedServices.value.filter(
            service => service.masterId !== masterId
        );
    }
};

const isServiceSelected = (masterId, serviceId) => {
    return selectedServices.value.some(
        service => service.masterId === masterId && service.serviceId === serviceId
    );
};

const toggleService = (masterId, serviceId) => {
    const serviceIndex = selectedServices.value.findIndex(
        service => service.masterId === masterId && service.serviceId === serviceId
    );
    
    if (serviceIndex === -1) {
        // Add the service
        const masterService = masters[masterId].services[serviceId];
        selectedServices.value.push({
            masterId,
            serviceId,
            serviceName: masterService.service,
            price: masterService.price,
            photo: masterService.photo
        });
    } else {
        // Remove the service
        selectedServices.value.splice(serviceIndex, 1);
    }
};

const handleDateClick = (day) => {
    // Reset time when date changes
    selectedTime.value = '';
};

const selectTime = (time) => {
    selectedTime.value = time;
};

const getFormattedDate = (dateString) => {
    if (!dateString) return '';
    
    // Handle Date object from VDatePicker
    if (dateString instanceof Date) {
        dateString = dateString.toISOString().split('T')[0];
    }
    
    const date = availableDates.find(d => d.date === dateString);
    return date ? date.formattedDate : dateString;
};

const submitBooking = () => {
    // Convert date to string format if it's a Date object
    let dateString = selectedDate.value;
    if (selectedDate.value instanceof Date) {
        dateString = selectedDate.value.toISOString().split('T')[0];
    }
    
    // Prepare booking data
    const bookingData = {
        id: Date.now(), // Unique ID for the order based on timestamp
        masters: selectedMasters.value.map(masterId => {
            return {
                id: masterId,
                name: masters[masterId].master
            };
        }),
        services: selectedServices.value.map(service => {
            return {
                masterId: service.masterId,
                masterName: masters[service.masterId].master,
                name: service.serviceName,
                price: service.price
            };
        }),
        date: dateString,
        formattedDate: getFormattedDate(selectedDate.value),
        time: selectedTime.value,
        totalPrice: totalPrice.value,
        contactInfo: {...contactInfo.value},
        createdAt: new Date().toISOString() // Add creation timestamp
    };
    
    // Save order to cookie
    saveOrderToCookie(bookingData);
    
    // Here you would typically send this data to a
    
    // Show success message
    alert('Запись успешно оформлена! Мы свяжемся с вами в ближайшее время.');
    
    // Reset form
    selectedMasters.value = [];
    selectedServices.value = [];
    selectedDate.value = '';
    selectedTime.value = '';
    contactInfo.value = {
        name: '',
        phone: '',
        comments: ''
    };
};

// Function to save order to cookie
const saveOrderToCookie = (order) => {
    try {
        // Get existing orders from cookie
        let orders = [];
        const ordersCookie = getCookie('orders');
        
        if (ordersCookie) {
            orders = JSON.parse(ordersCookie);
        }
        
        // Add new order
        orders.push(order);
        
        // Save updated orders to cookie
        document.cookie = `orders=${JSON.stringify(orders)}; path=/; max-age=2592000`; // 30 days
    } catch (error) {
        console.error('Error saving order to cookie:', error);
    }
};

// Function to get cookie value by name
const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};
</script>

<style lang="sass">
@import '@color'
@import '@mixin'
@import '@global'

    
.services-title
    margin: 20px 0px

.booking-form
    display: flex
    flex-direction: column
    gap: 20px

.form-step
    background: $main-color
    padding: 30px
    border-radius: $radius
    display: flex
    flex-direction: column
    gap: 20px

.form-step-header
    display: flex
    flex-direction: column
    gap: 10px
    background: $white
    padding: 20px
    border-radius: $radius

.step-description
    color: $black

.service-price
    text-align: center
    width: 100%
    background: $black
    color: $white
    padding: 10px
    border-radius: $radius

// Master selection
.masters-list
    display: flex
    flex-wrap: wrap
    gap: 15px

.master-item
    background: $white
    border-radius: $radius
    padding: 20px
    cursor: pointer
    transition: all 0.3s ease
    flex: 1 0 calc(33.333% - 15px)
    border: 2px solid transparent
    text-align: center
    
    &:hover
        transform: translateY(-5px)
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1)
    
    &--selected
        border-color: $black
        background: rgba(255, 255, 255, 0.9)
        transform: translateY(-5px)
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1)

.master-name
    margin-bottom: 10px

    
.master-services-title
    background: $white
    padding: 15px
    border-radius: $radius
    margin-bottom: 15px
    text-align: center

// Services list
.services-list
    display: flex
    flex-wrap: wrap
    gap: 15px

.service-item
    background: $white
    border-radius: $radius
    padding: 15px
    cursor: pointer
    transition: all 0.3s ease
    flex: 1 0 calc(33.333% - 15px)
    // min-width: 280px
    border: 2px solid transparent
    display: flex
    flex-direction: column
    overflow: hidden
    
    &:hover
        transform: translateY(-5px)
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1)
    
    &--selected
        border-color: $black
        background: rgba(255, 255, 255, 0.9)
        transform: translateY(-5px)
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1)

.service-image
    width: 100%
    height: 35vh
    object-fit: cover
    border-radius: $radius
    margin-bottom: 10px

.service-info
    display: flex
    flex-direction: column
    gap: 10px
    flex-grow: 1

.service-name
    font-weight: 700
    margin-bottom: 5px

.service-meta
    display: flex
    flex-direction: column
    gap: 5px
    margin-top: auto

.service-master
    color: #555
    font-style: italic

.service-details
    display: flex
    justify-content: flex-end
    font-weight: 700
    
.selected-summary
    background: $white
    padding: 15px
    border-radius: $radius
    display: flex
    justify-content: space-between

// Date and time selection
.date-picker-container
    display: flex
    justify-content: center
    width: 100%
    
    .custom-datepicker
        width: 100%
        
        // Custom styles for v-calendar
        :deep(.vc-container)
            border: none
            border-radius: $radius
            background: $white
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05)
            min-width: 0
            width: 100%
            padding: 15px
            
        :deep(.vc-header)
            padding: 20px 15px
            
        :deep(.vc-arrow)
            padding: 12px
            border-radius: 50%
            background: $main-color
            
        :deep(.vc-arrow-icon)
            width: 26px
            height: 26px
            
        // Desktop styles (default)
        :deep(.vc-day-content)
            font-weight: 500
            height: 65px
            width: 65px
            border-radius: $radius
            font-size: 24px
            display: flex
            align-items: center
            justify-content: center
            
        :deep(.vc-day)
            padding: 6px
            
        :deep(.vc-weekday)
            font-size: 20px
            padding: 8px 0
            font-weight: 600
        
        :deep(.vc-title)
            font-size: 26px
            font-weight: 600
            padding: 10px 0
        
        :deep(.vc-highlight-content-solid)
            width: 65px
            height: 65px
            
        :deep(.vc-highlight-content-outline)
            width: 65px
            height: 65px
            
        :deep(.vc-popover-content)
            font-size: 18px
            padding: 12px 15px
            border-radius: $radius
            
        :deep(.vc-popover-content-wrapper)
            margin-top: 10px
        
        // Saturday style
        :deep(.vc-day[data-date].vc-day-box-center-center .vc-highlight-content-solid[style*="background-color: rgb(255, 152, 0)"])
            opacity: 0.6 !important
            
        :deep(.vc-day[data-date].vc-day-box-center-center .vc-highlight-content-solid[style*="background-color: rgb(255, 152, 0)"] + .vc-day-content)
            font-weight: bold
            
        :deep(.vc-day:hover .vc-day-content), :deep(.vc-day:active .vc-day-content), :deep(.vc-day:focus .vc-day-content)
            background-color: $main-color
            opacity: 0.5
            
        :deep(.vc-day.is-selected .vc-day-content)
            background-color: $main-color
            color: $black
            font-weight: bold
            
        :deep(.vc-highlight-bg-solid)
            opacity: 0.2
            
        :deep(.vc-highlight-bg-light)
            background-color: $main-color
            opacity: 0.7
            
        :deep(.vc-day-box-center-center)
            font-weight: 600
            
        :deep(.is-today)
            font-weight: 800
            
        :deep(.vc-day-popover)
            background: $white
            border: 1px solid $main-color
            font-weight: 500
            border-radius: $radius
            
        :deep(.vc-popover-caret)
            border-color: $main-color !important
            
        :deep(.vc-nav-item:hover), :deep(.vc-nav-item:active), :deep(.vc-nav-item:focus)
            background-color: $main-color
            
        :deep(.vc-nav-item.is-active)
            background-color: $main-color
            color: $black
            
        :deep(.vc-btn)
            background-color: $main-color
            color: $black
            border-radius: $radius
            
            &:hover
                background-color: darken($main-color, 10%)
                
        :deep(.vc-weeks)
            min-width: 0
            width: 100%
            
        :deep(.vc-weekday)
            min-width: 0
            width: 14.28%
            
        :deep(.vc-day)
            min-width: 0
            width: 14.28%
            
            // Keep popover active on mobile touch (using active pseudo-class)
            &:active
                .vc-day-popover-content
                    visibility: visible
                    opacity: 1
                    transform: translateY(0)
            
        :deep(.vc-pane)
            min-width: 0
            width: 100%
            
        :deep(.vc-nav-container)
            width: 100%
            min-width: 0

.time-selection
    display: flex
    flex-direction: column
    gap: 10px
    &--unavailable
        .time-title-container
            background: #FFEBEE
            border-left: 4px solid #F44336

// Contact form
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
    
    &:hover
        background: darken($black, 10%)

// Booking summary
.booking-summary
    display: flex
    flex-direction: column
    gap: 20px
    background: $main-color
    padding: 20px
    border-radius: $radius

.summary-title
    background: $white
    padding: 20px
    border-radius: $radius

.summary-content
    background: $white
    padding: 20px
    border-radius: $radius
    display: flex
    flex-direction: column
    gap: 10px

.summary-masters, .summary-services
    margin-left: 20px
    margin-bottom: 10px

@include mobile        
    .form-step
        padding: 15px
        
    .master-item, .service-item
        flex: 1 0 100%
        
    .service-image
        height: 200px
        
    .selected-summary
        flex-direction: column
        gap: 10px
        
    .date-option
        flex: 1 0 calc(50% - 10px)
        max-width: none
        
    .time-slot
        flex: 1 0 calc(33.333% - 10px)
        font-size: 14px
        padding: 6px 10px
        
        &:active
            background: $main-color
            border-color: $black
    
    .date-picker-container
        .custom-datepicker
            
            :deep(.vc-day-content)
                height: 28px
                width: 28px
                font-size: 12px
                
            :deep(.vc-header)
                padding: 10px 5px
                
            :deep(.vc-title)
                font-size: 14px
                
            :deep(.vc-weekday)
                font-size: 12px
                padding: 3px 0
                
            :deep(.vc-highlight-content-solid)
                width: 28px
                height: 28px
                
            :deep(.vc-highlight-content-outline)
                width: 28px
                height: 28px
                
            :deep(.vc-popover-content)
                font-size: 12px
                padding: 5px 8px
                
            :deep(.vc-day)
                padding: 2px

.time-title-container
    background: $white
    padding: 15px
    border-radius: $radius

.time-title
    margin: 0
    font-weight: bold

.time-slots
    display: flex
    flex-wrap: wrap
    gap: 10px

.time-slot
    background: $white
    border-radius: $radius
    padding: 8px 15px
    cursor: pointer
    border: 2px solid transparent
    transition: all 0.2s ease
    
    &:hover
        background: lighten($main-color, 5%)
        border-color: $main-color
    
    &--selected
        background: $main-color !important
        color: $black !important
        border-color: $black !important
        font-weight: bold
</style>