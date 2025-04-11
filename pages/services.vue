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
                            <img v-if="service.photo" :src="service.photo" alt="" class="service-image" />
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

                <div class="date-selection">
                    <div 
                        v-for="dateOption in availableDates" 
                        :key="dateOption.date"
                        class="date-option"
                        :class="{ 'date-option--selected': selectedDate === dateOption.date }"
                        @click="selectDate(dateOption.date)"
                    >
                        <p class="date-text font-text_medium">{{ dateOption.formattedDate }}</p>
                    </div>
                </div>

                <div v-if="selectedDate" class="time-selection">
                    <div class="time-title-container">
                        <h3 class="time-title font-text_medium">Доступное время:</h3>
                    </div>
                    <div class="time-slots">
                        <button
                            v-for="timeSlot in availableTimeSlots"
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
import { ref, computed } from 'vue';
import data from '@/services/data.js';

// Get data from services
const masters = data.priceList();
const availableDates = data.availableDates();

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

const availableTimeSlots = computed(() => {
    if (!selectedDate.value) return [];
    const dateObj = availableDates.find(d => d.date === selectedDate.value);
    return dateObj ? dateObj.timeSlots : [];
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

const selectDate = (date) => {
    selectedDate.value = date;
    selectedTime.value = ''; // Reset time when date changes
};

const selectTime = (time) => {
    selectedTime.value = time;
};

const getFormattedDate = (dateString) => {
    if (!dateString) return '';
    const date = availableDates.find(d => d.date === dateString);
    return date ? date.formattedDate : dateString;
};

const submitBooking = () => {
    // Prepare booking data
    const bookingData = {
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
        date: selectedDate.value,
        formattedDate: getFormattedDate(selectedDate.value),
        time: selectedTime.value,
        totalPrice: totalPrice.value,
        contactInfo: {...contactInfo.value}
    };
    
    // Here you would typically send this data to a server
    console.log('Booking submitted:', bookingData);
    
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
.date-selection
    display: flex
    flex-wrap: wrap
    gap: 10px
    margin-bottom: 20px

.date-option
    background: $white
    border-radius: $radius
    padding: 10px 15px
    cursor: pointer
    transition: all 0.3s ease
    border: 2px solid transparent
    flex: 1
    display: flex
    justify-content: center
    align-items: center
    min-width: 150px
    max-width: calc(25% - 10px)
    text-align: center
    
    &:hover
        transform: translateY(-3px)
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1)
    
    &--selected
        border-color: $black
        background: rgba(255, 255, 255, 0.9)

.time-title-container
    background: $white
    padding: 15px
    border-radius: $radius
    margin-bottom: 15px

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
    
    &--selected
        background: $black !important
        color: $white !important

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
    border: 1px solid $black
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
        padding: 20px
        
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
</style>