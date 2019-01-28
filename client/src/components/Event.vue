<template>
    <div>
        <img v-bind:src="icon" />
        <p v-if="dateTime">{{ $d(dateTime, 'time') }}</p>
        <p>{{ $t(name) }}</p>



        <iframe v-if="mapUrl" v-bind:src="mapUrl" width="280" height="280" frameborder="0" style="border:0" allowfullscreen></iframe>
    </div>
</template>

<script>
export default {
    name: 'event',
    props: {
        name: String,
        icon: String,
        dateTime: Object,
        durarion: Object,
        location: String,
        mapUrl: String,
    }
}
</script>
