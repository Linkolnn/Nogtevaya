<template>
    <div id="map" class="map">
        <div ref="mapContainer" class="map__container"></div>
    </div>
</template>

<script setup>
const props = defineProps(['center', 'zoom', 'title', 'address'])

const mapContainer = ref(null);
let map = null;

onMounted(() => {
    // Make sure that Yandex Maps API is loaded
    if (window.ymaps) {
        initMap();
    } else {
        // If the API is not loaded yet, add an event listener for when it loads
        window.addEventListener('load', initMap);
    }
});

function initMap() {
    if (!window.ymaps) {
        console.error('Yandex Maps API not loaded');
        return;
    }

    window.ymaps.ready(() => {
        if (!mapContainer.value) return;
        
        // Create the map
        map = new window.ymaps.Map(mapContainer.value, {
            center: props.center,
            zoom: props.zoom,
            controls: ['zoomControl', 'fullscreenControl']
        });
        
        // Create a placemark
        const placemark = new window.ymaps.Placemark(props.center, {
            hintContent: props.title,
            balloonContent: `
                <div class="map-balloon">
                    <h3>${props.title}</h3>
                    <p>${props.address}</p>
                </div>
            `
        }, {
            preset: 'islands#pinkDotIcon' // Use pink color to match the site's theme
        });
        
        // Add the placemark to the map
        map.geoObjects.add(placemark);
    });
}
</script>

<style lang="sass">
@import '@color'
@import '@mixin'
@import '@global'

.map
    width: 100%
    height: 100%
    position: relative
    display: flex
    
    &__container
        width: 100%
        height: 100%
        min-height: 600px
        border-radius: 20px
        overflow: hidden

@include mobile

    .map-balloon
        padding: 10px
        h3
            font-weight: bold
            margin-bottom: 5px
        p
            margin: 0
</style> 